import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

let serverModule;

async function getServer() {
  if (!serverModule) {
    try {
      console.log('--- Checking dist/server contents at runtime ---');
      const distServerPath = path.resolve(process.cwd(), 'dist/server');
      if (fs.existsSync(distServerPath)) {
        console.log('Files in dist/server:', fs.readdirSync(distServerPath));
        const assetsPath = path.join(distServerPath, 'assets');
        if (fs.existsSync(assetsPath)) {
          console.log('Files in dist/server/assets:', fs.readdirSync(assetsPath));
        } else {
          console.log('dist/server/assets directory does not exist!');
        }
      } else {
        console.log('dist/server directory does not exist!');
      }
    } catch (e) {
      console.error('Error listing dist/server:', e);
    }

    try {
      serverModule = (await import('../dist/server/server.js')).default;
    } catch (importError) {
      console.error('CRITICAL: Failed to import SSR server module:', importError);
      throw importError;
    }
  }
  return serverModule;
}

export default async function handler(req, res) {
  try {
    const server = await getServer();

    const proto = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    
    // Strip the /api prefix from the URL because Vercel rewrites all requests
    // to /api/[...path], causing the path to start with /api.
    const cleanUrlPath = req.url.replace(/^\/api/, '') || '/';
    const url = `${proto}://${host}${cleanUrlPath}`;

    console.log(`[Vercel SSR Handler] Incoming req.url: "${req.url}" -> Routed to: "${url}"`);

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
