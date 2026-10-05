// Genera el sitio estático en /dist a partir de site.config.mjs.
// Uso: node scripts/build.mjs
import { mkdir, writeFile, copyFile, cp, rm, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

/** Importa módulos sin caché para que el modo `dev` vea los cambios. */
const fresh = (file) => import(`${pathToFileURL(path.join(root, file)).href}?t=${Date.now()}`);

export async function build() {
  const { default: config } = await fresh('site.config.mjs');
  const { renderPage } = await fresh('src/render.mjs');
  const { faviconSvg } = await fresh('src/sections/logo.mjs');

  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  if (existsSync(path.join(root, 'public'))) {
    await cp(path.join(root, 'public'), dist, { recursive: true });
  }

  const url = config.site.url.replace(/\/$/, '');
  await Promise.all([
    writeFile(path.join(dist, 'index.html'), renderPage(config)),
    copyFile(path.join(root, 'src/styles.css'), path.join(dist, 'styles.css')),
    copyFile(path.join(root, 'src/main.js'), path.join(dist, 'main.js')),
    existsSync(path.join(root, 'public/favicon.svg'))
      ? null
      : writeFile(path.join(dist, 'favicon.svg'), faviconSvg(config)),
    writeFile(
      path.join(dist, 'robots.txt'),
      config.demo ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`
    ),
    writeFile(
      path.join(dist, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc></url>\n</urlset>\n`
    ),
  ]);
  return config;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const started = Date.now();
  build()
    .then((config) => {
      console.log(`✔ Sitio generado en dist/ (${Date.now() - started} ms)`);
      if (config.demo) console.log('  Modo demostración activo: avisos visibles, formulario sin envío y noindex.');
    })
    .catch((error) => {
      console.error(`✖ No se pudo generar el sitio: ${error.message}`);
      process.exit(1);
    });
}
