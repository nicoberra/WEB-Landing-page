import { esc } from '../helpers.mjs';

/** Logo configurable: monograma con las iniciales o un archivo de imagen. */
export function logo(config) {
  const l = config.logo;
  if (l.type === 'image') {
    return `<img class="brand__logo" src="${esc(l.src)}" alt="" width="${l.width || 40}" height="${l.height || 40}">`;
  }
  return `<span class="monogram" aria-hidden="true">${esc(l.text)}</span>`;
}

/** Favicon SVG generado a partir del monograma y los colores de marca. */
export function faviconSvg(config) {
  const { accent, accentInk } = config.colors.light;
  const text = config.logo.type === 'monogram' ? config.logo.text : config.person.name.slice(0, 1);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="32" fill="${accent}"/><text x="32" y="41" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="26" font-weight="700" letter-spacing="-1" fill="${accentInk}">${esc(text)}</text></svg>`;
}
