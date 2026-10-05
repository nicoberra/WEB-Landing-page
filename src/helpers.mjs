// Utilidades compartidas por las secciones.

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escapa texto plano para insertarlo en HTML o en atributos. */
export const esc = (value = '') => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

/** Texto con *énfasis*: escapa y convierte *palabra* en <em>. */
export const rich = (value = '') => esc(value).replace(/\*([^*]+)\*/g, '<em>$1</em>');

/** Quita los asteriscos de énfasis (para metadatos y textos alternativos). */
export const plain = (value = '') => String(value).replace(/\*([^*]+)\*/g, '$1');

/** Une partes de HTML ignorando valores vacíos. */
export const html = (parts) => parts.filter(Boolean).join('\n');

/** Convierte un texto en un identificador apto para URLs y atributos. */
export const slug = (value = '') =>
  String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const whatsappUrl = (contact) => {
  const text = contact.whatsapp.message ? `?text=${encodeURIComponent(contact.whatsapp.message)}` : '';
  return `https://wa.me/${contact.whatsapp.number}${text}`;
};

export const mailtoUrl = (contact) => `mailto:${contact.email}`;

/** Resuelve los atajos 'whatsapp' y 'email' de los botones. */
export const resolveHref = (href, config) => {
  if (href === 'whatsapp') return whatsappUrl(config.contact);
  if (href === 'email') return mailtoUrl(config.contact);
  return href;
};

const isExternal = (href) => /^https?:\/\//.test(href);

/** Enlace con target/rel correctos para destinos externos. */
export const linkAttrs = (href) =>
  `href="${esc(href)}"${isExternal(href) ? ' target="_blank" rel="noopener noreferrer"' : ''}`;

/**
 * Foto real o bloque de reemplazo rotulado.
 * ratio: '4/5', '4/3', etc. Se usa para reservar el espacio y evitar saltos.
 */
export const media = ({ image, label, ratio, hint, alt, eager = false, className = '' }) => {
  const [w, h] = ratio.split('/').map(Number);
  if (image && image.src) {
    const width = image.width || w * 300;
    const height = image.height || h * 300;
    return `<figure class="media ${className}" style="--ratio:${w}/${h}">
  <img src="${esc(image.src)}" alt="${esc(image.alt || alt || '')}" width="${width}" height="${height}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">
</figure>`;
  }
  return `<div class="media media--placeholder ${className}" style="--ratio:${w}/${h}" role="img" aria-label="${esc(`${alt}. Espacio reservado para una foto.`)}">
  <span class="crop crop--tl" aria-hidden="true"></span><span class="crop crop--tr" aria-hidden="true"></span>
  <span class="crop crop--bl" aria-hidden="true"></span><span class="crop crop--br" aria-hidden="true"></span>
  <span class="media__label" aria-hidden="true">${esc(label)}</span>
  <span class="media__hint" aria-hidden="true">${esc(hint)}</span>
</div>`;
};

export const sectionHeader = ({ eyebrow, title, intro, id }) => `<header class="section-head">
  <p class="eyebrow">${esc(eyebrow)}</p>
  <h2 id="${esc(id)}-titulo">${rich(title)}</h2>
  ${intro ? `<p class="section-head__intro">${rich(intro)}</p>` : ''}
</header>`;

// Íconos simples dibujados para esta plantilla (sin logos de marcas).
export const icons = {
  chat: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18.5V6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H8.5L4 18.5Z"/><path d="M8.5 9h7M8.5 12h4.5"/></svg>',
  mail: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="m4 7 8 6 8-6"/></svg>',
  arrow: '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>',
  down: '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M6 13l6 6 6-6"/></svg>',
  copy: '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="8.5" y="8.5" width="11" height="11" rx="1.5"/><path d="M15.5 8.5V6A1.5 1.5 0 0 0 14 4.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/></svg>',
  plus: '<svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  menu: '<svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 8h16M4 16h16"/></svg>',
};
