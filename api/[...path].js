import { createServer } from 'node:http';

let serverModule;

async function getServer() {
  if (!serverModule) {
    serverModule = (await import('../dist/server/server.js')).default;
  }
  return serverModule;
}

export default async function handler(req, res) {
  try {
    const server = await getServer();

    const proto = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = `${proto}://${host}${req.url}`;

    // Collect body for non-GET requests
    let body = undefined;
    if (!['GET', 'HEAD'].includes(req.method)) {
      body = await new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks)));
        req.on('error', reject);
      });
    }

    const fetchRequest = new Request(url, {
      method: req.method,
      headers: Object.fromEntries(
        Object.entries(req.headers).filter(([, v]) => v !== undefined)
      ),
      body: body && body.length > 0 ? body : undefined,
    });

    const response = await server.fetch(fetchRequest);

    // Forward response headers
    for (const [name, value] of response.headers.entries()) {
      res.setHeader(name, value);
    }

    res.status(response.status);

    // Stream body
    const arrayBuffer = await response.arrayBuffer();
    res.end(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error('SSR handler error:', error);
    res.status(500).end('Internal Server Error');
  }
}
