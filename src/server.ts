import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, readFileSync } from 'node:fs';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
// Potential paths for prerendering
const prerenderPaths = [
  resolve(process.cwd(), '.angular/prerender-root/browser'),
  browserDistFolder,
  resolve(process.cwd(), 'dist/af2/browser'),
  resolve(process.cwd(), 'src/assets')
];

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Special handling for i18n files to ensure they're available during prerendering
 */
app.get('/assets/i18n/:lang.json', (req, res, next) => {
  const lang = req.params.lang;
  const relativePath = `assets/i18n/${lang}.json`;
  
  // Try to find the file in various possible locations
  for (const basePath of prerenderPaths) {
    const fullPath = join(basePath, relativePath);
    
    if (existsSync(fullPath)) {
      console.log(`Found i18n file at: ${fullPath}`);
      return res.sendFile(fullPath);
    }
  }
  
  // If we get here, we haven't found the file in any of the expected locations
  // As a fallback, we'll try to serve a minimal JSON response for prerendering
  try {
    // Check if we can find the file in src/assets/i18n directly
    const srcPath = resolve(process.cwd(), 'src/assets/i18n', `${lang}.json`);
    
    if (existsSync(srcPath)) {
      console.log(`Using source i18n file: ${srcPath}`);
      const content = readFileSync(srcPath, 'utf8');
      res.type('application/json').send(content);
      return;
    }
    
    // If all else fails, send an empty translation object
    console.warn(`Could not find i18n file for ${lang}, sending empty translation object`);
    res.json({});
  } catch (error) {
    console.error(`Error handling i18n file for ${lang}:`, error);
    next();
  }
});

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
