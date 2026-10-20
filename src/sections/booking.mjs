import { esc, rich, linkAttrs, bookingUrl, icons } from '../helpers.mjs';

/** Bloque destacado para reservar turno (turnero o, si falta, WhatsApp). */
export default function booking(config) {
  const b = config.bookingSection;
  return `<section class="booking" id="${esc(b.id)}" aria-labelledby="${esc(b.id)}-titulo">
  <div class="container">
    <div class="booking__panel" data-reveal>
      <div class="booking__shape" aria-hidden="true" data-parallax="0.08"></div>
      <p class="eyebrow">${esc(b.eyebrow)}</p>
      <h2 id="${esc(b.id)}-titulo">${rich(b.title)}</h2>
      <p class="booking__text">${rich(b.text)}</p>
      ${
        config.booking?.url
          ? `<a class="button button--invert" ${linkAttrs(bookingUrl(config))}>${icons.calendar}${esc(b.ctaLabel)}<span class="visually-hidden"> (se abre en una pestaña nueva)</span></a>`
          : `<p class="booking__pending">${icons.calendar}${esc(config.booking?.pendingNote || 'Turnero online: próximamente.')}</p>`
      }
    </div>
  </div>
</section>`;
}
