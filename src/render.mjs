// Arma la página completa a partir de la configuración.
import { esc, plain } from './helpers.mjs';
import header from './sections/header.mjs';
import hero from './sections/hero.mjs';
import about from './sections/about.mjs';
import services from './sections/services.mjs';
import processSection from './sections/process.mjs';
import projects from './sections/projects.mjs';
import faq from './sections/faq.mjs';
import contact from './sections/contact.mjs';
import footer from './sections/footer.mjs';

// Registro de secciones: para agregar una nueva, creá su archivo en
// src/sections/, importalo arriba y sumalo acá y en `sections` del config.
export const SECTIONS = { hero, about, services, process: processSection, projects, faq, contact };

const TOKEN_NAMES = {
  bg: '--bg',
  surface: '--surface',
  placeholder: '--placeholder',
  ink: '--ink',
  muted: '--muted',
  line: '--line',
  accent: '--accent',
  accentInk: '--accent-ink',
  accentSoft: '--accent-soft',
  highlight: '--highlight',
};

const tokens = (palette) =>
  Object.entries(TOKEN_NAMES)
    .map(([key, name]) => `${name}:${palette[key]};`)
    .join('');

/** Variables de color y tipografía generadas desde el config. */
export function themeCss(config) {
  const { light, dark } = config.colors;
  const f = config.fonts;
  const fonts = `--font-display:${f.display};--font-body:${f.body};--font-accent:${f.accent};--font-mono:${f.mono};`;
  let css = `:root{${tokens(light)}${fonts}color-scheme:light}`;
  if (dark) {
    css += `@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){${tokens(dark)}color-scheme:dark}}`;
    css += `:root[data-theme="dark"]{${tokens(dark)}color-scheme:dark}`;
  }
  return css;
}

function structuredData(config) {
  if (!config.site.structuredData) return '';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.person.name,
    jobTitle: config.person.profession,
    description: config.site.description,
    url: config.site.url,
    email: `mailto:${config.contact.email}`,
    sameAs: config.social.filter((s) => s.url).map((s) => s.url),
  };
  if (config.person.photo?.src) data.image = `${config.site.url}/${config.person.photo.src}`;
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

/** Contenido del <head>: SEO, metadatos sociales, fuentes y tema. */
export function head(config, { inlineCss, inlineJs } = {}) {
  const s = config.site;
  const ogImage = s.ogImage ? `${s.url}/${s.ogImage}` : '';
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<script>document.documentElement.classList.add('js')</script>
<title>${esc(s.title)}</title>
<meta name="description" content="${esc(s.description)}">
<link rel="canonical" href="${esc(s.url)}/">
<meta name="theme-color" content="${esc(s.themeColor)}">
${config.demo ? '<meta name="robots" content="noindex">' : ''}
<meta property="og:type" content="website">
<meta property="og:locale" content="${esc(s.locale)}">
<meta property="og:title" content="${esc(s.title)}">
<meta property="og:description" content="${esc(s.description)}">
<meta property="og:url" content="${esc(s.url)}/">
${ogImage ? `<meta property="og:image" content="${esc(ogImage)}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n<meta property="og:image:alt" content="${esc(`${config.person.name}, ${plain(config.person.profession)}`)}">` : ''}
<meta name="twitter:card" content="${ogImage ? 'summary_large_image' : 'summary'}">
<meta name="twitter:title" content="${esc(s.title)}">
<meta name="twitter:description" content="${esc(s.description)}">
${ogImage ? `<meta name="twitter:image" content="${esc(ogImage)}">` : ''}
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${esc(config.fonts.googleFontsUrl)}">
<style>${themeCss(config)}</style>
${inlineCss ? `<style>${inlineCss}</style>` : '<link rel="stylesheet" href="styles.css">'}
${structuredData(config)}
${inlineJs ? '' : '<script src="main.js" defer></script>'}`;
}

/** Cuerpo de la página: encabezado, secciones elegidas y pie. */
export function body(config) {
  const sections = config.sections.map((id) => {
    const render = SECTIONS[id];
    if (!render) throw new Error(`Sección desconocida en config.sections: "${id}"`);
    return render(config);
  });
  return `<a class="skip-link" href="#contenido">Saltar al contenido</a>
${header(config)}
<main id="contenido" tabindex="-1">
${sections.join('\n')}
</main>
${footer(config)}`;
}

export function renderPage(config) {
  return `<!doctype html>
<html lang="${esc(config.site.lang)}">
<head>
${head(config)}
</head>
<body>
${body(config)}
</body>
</html>
`;
}
