// OPCIONAL. Genera public/assets/og-image.png (1200×630), la imagen que se ve
// al compartir el enlace en redes y mensajería. Usa el nombre, la profesión y
// los colores del config. Requiere Playwright, que NO es dependencia del proyecto:
//   npm install --no-save playwright && npx playwright install chromium
//   node scripts/og-image.mjs
// También podés reemplazar ese archivo por una imagen diseñada a mano.
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { default: config } = await import(pathToFileURL(path.join(root, 'site.config.mjs')).href);
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
  body{width:1200px;height:630px;background:${c.bg};color:${c.ink};font-family:${f.body};padding:72px 80px;display:grid;grid-template-rows:auto 1fr auto;position:relative;overflow:hidden}
  .eyebrow{font-family:${f.mono};font-size:22px;letter-spacing:.1em;text-transform:uppercase;color:${c.muted}}
  h1{align-self:end;font-family:${f.display};font-weight:800;font-size:150px;line-height:.88;letter-spacing:-.045em}
  p{margin-top:28px;font-family:${f.display};font-size:40px;font-weight:500;letter-spacing:-.015em;max-width:880px;line-height:1.15}
  em{font-family:${f.accent};font-style:italic;font-weight:400;color:${c.accent}}
  .mark{position:absolute;top:64px;right:72px;width:84px;height:84px;border:3px solid ${c.highlight};border-radius:50%;
    background:linear-gradient(${c.highlight},${c.highlight}) center/3px 100% no-repeat,linear-gradient(${c.highlight},${c.highlight}) center/100% 3px no-repeat}
  .mark::after{content:'';position:absolute;inset:20px;border:3px solid ${c.highlight};border-radius:50%}
  .bar{position:absolute;left:0;right:0;bottom:0;height:18px;background:${c.accent}}
</style></head><body>
  <div class="eyebrow">${esc(config.person.profession)}</div>
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
const out = path.join(root, 'public/assets/og-image.png');
await page.screenshot({ path: out });
await browser.close();
console.log(`✔ Imagen para redes generada en ${path.relative(root, out)}`);
