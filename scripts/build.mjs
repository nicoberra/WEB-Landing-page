// Genera el sitio estático en /dist a partir de un modelo de /modelos.
// Uso: node scripts/build.mjs                       (modelo de modelo-activo.mjs)
//      node scripts/build.mjs --modelo jesica-cuevas (un modelo de /modelos)
import { mkdir, writeFile, copyFile, cp, rm, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { root, modelPaths } from './config-path.mjs';
import path from 'node:path';

const dist = path.join(root, 'dist');

/** Importa módulos sin caché para que el modo `dev` vea los cambios. */
const fresh = (file) => import(`${pathToFileURL(path.join(root, file)).href}?t=${Date.now()}`);

export async function build(model) {
  model = model || (await modelPaths());
  const { default: config } = await import(`${pathToFileURL(model.config).href}?t=${Date.now()}`);
  // En GitHub Pages, mientras el modelo tenga el dominio de ejemplo, se usa la
  // dirección real que pasa el flujo de publicación.
  if (process.env.PAGES_URL && /example\.(com|org)/.test(config.site.url)) config.site.url = process.env.PAGES_URL;
  config.site.url = config.site.url.replace(/\/$/, '');
  const { renderPage } = await fresh('src/render.mjs');
  const { faviconSvg } = await fresh('src/sections/logo.mjs');

  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  // Archivos compartidos (opcional) y luego los del modelo: fotos, logo, etc.
  if (existsSync(path.join(root, 'public'))) {
    await cp(path.join(root, 'public'), dist, { recursive: true });
  }
  if (existsSync(model.assets)) {
    await cp(model.assets, path.join(dist, 'assets'), { recursive: true });
  }

  const url = config.site.url;
  await Promise.all([
    writeFile(path.join(dist, 'index.html'), renderPage(config)),
    copyFile(path.join(root, 'src/styles.css'), path.join(dist, 'styles.css')),
    copyFile(path.join(root, 'src/main.js'), path.join(dist, 'main.js')),
    existsSync(path.join(model.assets, 'favicon.svg')) || existsSync(path.join(root, 'public/favicon.svg'))
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
  return { config, model };
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const started = Date.now();
  build()
    .then(({ config, model }) => {
      console.log(`✔ Modelo "${model.name}" generado en dist/ (${Date.now() - started} ms)`);
      if (config.demo) console.log('  Modo demostración activo: avisos visibles y noindex.');
    })
    .catch((error) => {
      console.error(`✖ No se pudo generar el sitio: ${error.message}`);
      process.exit(1);
    });
}
