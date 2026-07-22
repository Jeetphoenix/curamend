import { createServer } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

let serverModule;
let preloadingError = null;

async function getServer() {
  if (!serverModule) {
    try {
      console.error('--- Preloading dist/server/assets at runtime ---');
      const distServerPath = path.resolve(process.cwd(), 'dist/server');
      const assetsPath = path.join(distServerPath, 'assets');
      if (fs.existsSync(assetsPath)) {
        const files = fs.readdirSync(assetsPath);
        console.error('Found chunks for preloading:', files);
        for (const file of files) {
          if (file.endsWith('.js')) {
            try {
              console.error(`Preloading chunk: ${file}`);
              await import(`../dist/server/assets/${file}`);
            } catch (err) {
              console.error(`CRITICAL: Failed to preload ${file}:`, err);
              preloadingError = { file, message: err.message, stack: err.stack };
            }
          }
        }
      } else {
        console.error('dist/server/assets directory does not exist!');
        preloadingError = { file: 'assets-directory', message: 'dist/server/assets does not exist', stack: new Error().stack };
      }
    } catch (e) {
      console.error('Error preloading dist/server:', e);
      preloadingError = { file: 'preloading-logic', message: e.message, stack: e.stack };
    }

    try {
      serverModule = (await import('../dist/server/server.js')).default;
    } catch (importError) {
      console.error('CRITICAL: Failed to import SSR server module:', importError);
      preloadingError = { file: 'server.js', message: importError.message, stack: importError.stack };
      throw importError;
    }
  }
  return serverModule;
}

export default async function handler(req, res) {
  if (preloadingError) {
    res.status(500).setHeader('Content-Type', 'text/html; charset=utf-8').end(`
      <div style="padding: 2rem; font-family: monospace; background: #fff5f5; color: #c53030; border: 1px solid #fed7d7; border-radius: 0.5rem; max-width: 50rem; margin: 2rem auto;">
        <h2 style="margin-top: 0; border-bottom: 2px solid #feb2b2; padding-bottom: 0.5rem;">Preloading Error in ${preloadingError.file}</h2>
        <p><strong>Message:</strong> ${preloadingError.message}</p>
        <pre style="background: #fff; padding: 1rem; border-radius: 0.25rem; border: 1px solid #fee2e2; overflow-x: auto; white-space: pre-wrap; font-size: 0.85rem;">${preloadingError.stack}</pre>
      </div>
    `);
    return;
  }

  try {
    const server = await getServer();

    // Check again if preloading set an error during the getServer call
    if (preloadingError) {
      res.status(500).setHeader('Content-Type', 'text/html; charset=utf-8').end(`
        <div style="padding: 2rem; font-family: monospace; background: #fff5f5; color: #c53030; border: 1px solid #fed7d7; border-radius: 0.5rem; max-width: 50rem; margin: 2rem auto;">
          <h2 style="margin-top: 0; border-bottom: 2px solid #feb2b2; padding-bottom: 0.5rem;">Preloading Error in ${preloadingError.file}</h2>
          <p><strong>Message:</strong> ${preloadingError.message}</p>
          <pre style="background: #fff; padding: 1rem; border-radius: 0.25rem; border: 1px solid #fee2e2; overflow-x: auto; white-space: pre-wrap; font-size: 0.85rem;">${preloadingError.stack}</pre>
        </div>
      `);
      return;
    }

    const proto = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    
    // Strip the /api prefix from the URL because Vercel rewrites all requests
    // to /api/[...path], causing the path to start with /api.
    const cleanUrlPath = req.url.replace(/^\/api/, '') || '/';
    const url = `${proto}://${host}${cleanUrlPath}`;

    console.error(`[Vercel SSR Handler] Incoming req.url: "${req.url}" -> Routed to: "${url}"`);

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
    res.status(500).setHeader('Content-Type', 'text/html; charset=utf-8').end(`
      <div style="padding: 2rem; font-family: monospace; background: #fff5f5; color: #c53030; border: 1px solid #fed7d7; border-radius: 0.5rem; max-width: 50rem; margin: 2rem auto;">
        <h2 style="margin-top: 0; border-bottom: 2px solid #feb2b2; padding-bottom: 0.5rem;">SSR Handler Exception</h2>
        <p><strong>Message:</strong> ${error.message}</p>
        <pre style="background: #fff; padding: 1rem; border-radius: 0.25rem; border: 1px solid #fee2e2; overflow-x: auto; white-space: pre-wrap; font-size: 0.85rem;">${error.stack}</pre>
      </div>
    `);
  }
}
