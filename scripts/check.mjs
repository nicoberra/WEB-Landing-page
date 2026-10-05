// Revisión automática antes de publicar. Uso: npm run check
// Errores (✖) cortan la ejecución; avisos (!) son cosas para revisar a mano.
import { readFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { default: config } = await import(pathToFileURL(path.join(root, 'site.config.mjs')).href);
const page = await readFile(path.join(root, 'dist/index.html'), 'utf8');

const errors = [];
const warnings = [];
const ok = [];

// ---------- Contraste de colores (WCAG 2.x) ----------
const luminance = (hex) => {
  const n = hex.replace('#', '');
  const full = n.length === 3 ? [...n].map((c) => c + c).join('') : n;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(full.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
const PAIRS = [
  ['ink', 'bg', 4.5, 'texto sobre fondo'],
  ['muted', 'bg', 4.5, 'texto secundario sobre fondo'],
  ['ink', 'surface', 4.5, 'texto sobre paneles'],
  ['muted', 'surface', 4.5, 'texto secundario sobre paneles'],
  ['muted', 'placeholder', 4.5, 'rótulos de fotos'],
  ['accentInk', 'accent', 4.5, 'texto de botones'],
  ['accent', 'bg', 4.5, 'enlaces y rótulos de color'],
  ['accent', 'surface', 3, 'detalles de color sobre paneles'],
  ['ink', 'accentSoft', 4.5, 'mensajes del formulario'],
];
for (const [mode, palette] of Object.entries(config.colors)) {
  for (const [fg, bg, min, label] of PAIRS) {
    const r = ratio(palette[fg], palette[bg]);
    const line = `Contraste ${mode} · ${label} (${fg}/${bg}): ${r.toFixed(2)}:1`;
    if (r < min) errors.push(`${line}, mínimo ${min}:1`);
    else ok.push(line);
  }
}

// ---------- Estructura y accesibilidad del HTML ----------
const all = (re) => [...page.matchAll(re)];
const h1 = all(/<h1\b/g).length;
if (h1 !== 1) errors.push(`La página debe tener un solo <h1> (tiene ${h1}).`);
else ok.push('Un solo <h1>.');

let last = 1;
for (const [, level] of all(/<h([1-6])\b/g)) {
  const n = Number(level);
  if (n > last + 1) errors.push(`Salto de encabezado: h${last} → h${n}.`);
  last = n;
}
if (!errors.some((e) => e.startsWith('Salto'))) ok.push('Encabezados en orden.');

for (const [tag] of all(/<img\b[^>]*>/g)) {
  if (!/\balt="/.test(tag)) errors.push(`Imagen sin texto alternativo: ${tag}`);
}

const ids = all(/\bid="([^"]+)"/g).map((m) => m[1]);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length) errors.push(`IDs repetidos: ${[...new Set(dupes)].join(', ')}`);

for (const [, target] of all(/href="#([^"]*)"/g)) {
  if (target && !ids.includes(target)) errors.push(`Enlace interno roto: #${target}`);
}
ok.push('Enlaces internos con destino.');

for (const [tag] of all(/<a\b[^>]*target="_blank"[^>]*>/g)) {
  if (!/rel="[^"]*noopener/.test(tag)) errors.push(`Enlace externo sin rel="noopener": ${tag}`);
}

for (const [tag, id] of all(/<(?:input|select|textarea)\b[^>]*\bid="([^"]+)"[^>]*>/g)) {
  if (!page.includes(`for="${id}"`)) errors.push(`Campo sin <label>: ${tag}`);
}

// ---------- Datos que hay que reemplazar antes de publicar ----------
const meta = (name) => page.match(new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`))?.[1];
const description = meta('description') || '';
if (description.length < 70 || description.length > 170)
  warnings.push(`La descripción SEO tiene ${description.length} caracteres (ideal: 70–160).`);
const title = page.match(/<title>([^<]*)<\/title>/)?.[1] || '';
if (title.length > 65) warnings.push(`El título tiene ${title.length} caracteres (ideal: hasta 60).`);

if (config.demo) warnings.push('Modo demostración activo (demo: true): avisos visibles, formulario sin envío y noindex.');
if (/example\.(com|org)/.test(config.site.url)) warnings.push('El dominio (site.url) sigue siendo de ejemplo.');
if (/example\.(com|org)/.test(config.contact.email)) warnings.push('El email de contacto es de ejemplo.');
if (/^\d+0{6,}$/.test(config.contact.whatsapp.number)) warnings.push('El número de WhatsApp es de ejemplo.');
if (!config.person.photo) warnings.push('Falta la foto del profesional (se muestra el bloque de reemplazo).');
const noImage = config.projects.items.filter((p) => !p.image).length;
if (noImage) warnings.push(`${noImage} proyecto(s) sin imagen (se muestran bloques de reemplazo).`);
const rootSocial = config.social.filter((s) => s.url && new URL(s.url).pathname.replace(/\/$/, '') === '');
if (rootSocial.length) warnings.push(`Redes con enlace genérico, sin perfil: ${rootSocial.map((s) => s.label).join(', ')}.`);
if (config.contact.form.enabled && config.contact.form.mode === 'demo' && !config.demo)
  warnings.push('El formulario está en modo "demo" en un sitio real: cambialo a "whatsapp" o "email", o desactivalo.');

// ---------- Resultado ----------
for (const line of ok) console.log(`✔ ${line}`);
for (const line of warnings) console.log(`! ${line}`);
for (const line of errors) console.log(`✖ ${line}`);
console.log(`\n${errors.length} error(es), ${warnings.length} aviso(s).`);
process.exit(errors.length ? 1 : 0);
