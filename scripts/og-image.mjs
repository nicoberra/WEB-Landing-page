// OPCIONAL. Genera la imagen de site.ogImage (1200×630, en la carpeta del modelo), la que se ve
// al compartir el enlace en redes y mensajería. Usa el nombre, la profesión y
// los colores del config. Requiere Playwright, que NO es dependencia del proyecto:
//   npm install --no-save playwright && npx playwright install chromium
//   node scripts/og-image.mjs                       (modelo activo)
//   node scripts/og-image.mjs --modelo jesica-cuevas
// También podés reemplazar ese archivo por una imagen diseñada a mano.
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import { root, modelPaths } from './config-path.mjs';

const model = await modelPaths();
const { default: config } = await import(pathToFileURL(model.config).href);
if (!config.site.ogImage) {
  console.error('Definí site.ogImage en el modelo (ej.: assets/og-nombre.png) antes de generar la imagen.');
  process.exit(1);
}
const { esc, rich } = await import(pathToFileURL(path.join(root, 'src/helpers.mjs')).href);

let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Falta Playwright. Instalalo con: npm install --no-save playwright && npx playwright install chromium');
  process.exit(1);
}

const c = config.colors.light;
const f = config.fonts;
const html = `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="${esc(f.googleFontsUrl)}">
<style>
  *{box-sizing:border-box;margin:0}
  body>*:not(.mark):not(.bar){position:relative;z-index:1}
  body{width:1200px;height:630px;background:${c.bg};color:${c.ink};font-family:${f.body};padding:72px 80px;display:grid;grid-template-rows:auto 1fr auto;position:relative;overflow:hidden}
  .eyebrow{font-family:${f.mono};font-size:22px;letter-spacing:.1em;text-transform:uppercase;color:${c.muted}}
  h1{align-self:end;font-family:${f.display};font-weight:${f.displayWeight || 800};font-size:150px;line-height:.88;letter-spacing:-.045em}
  p{margin-top:28px;font-family:${f.display};font-size:44px;font-weight:${f.displayWeight || 500};letter-spacing:-.015em;max-width:880px;line-height:1.15}
  em{font-family:${f.accent};font-style:${f.accentStyle || 'italic'};font-size:${f.accentSize || '1em'};font-weight:400;color:${c.accent}}
  .mark{position:absolute;top:-160px;right:-140px;width:560px;height:560px;border-radius:50%;background:${c.accentSoft}}
  .mark::after{content:'';position:absolute;width:220px;height:220px;left:-60px;bottom:-40px;border-radius:50%;background:${c.highlight};opacity:.55}
  .bar{position:absolute;left:0;right:0;bottom:0;height:18px;background:${c.accent}}
</style></head><body>
  <div class="eyebrow">${esc([config.person.profession, config.person.license].filter(Boolean).join(' · '))}</div>
  <h1>${esc(config.person.name)}</h1>
  <p>${rich(config.hero.tagline)}</p>
  <span class="mark"></span><span class="bar"></span>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
// Fuerza la descarga de cada tipografía antes de la captura.
await page.evaluate(() => Promise.all([...document.fonts].map((font) => font.load().catch(() => null))));
await page.evaluate(() => document.fonts.ready);
const out = path.join(model.dir, config.site.ogImage);
await page.screenshot({ path: out });
await browser.close();
console.log(`✔ Imagen para redes generada en ${path.relative(root, out)}`);
