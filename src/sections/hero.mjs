import { esc, rich, media, linkAttrs, resolveHref, icons } from '../helpers.mjs';

/** Separa un texto en palabras para animarlas de a una al cargar. */
const words = (text) =>
  esc(text)
    .split(' ')
    .map((w, i) => `<span class="word" style="--i:${i}">${w}</span>`)
    .join(' ');

export default function hero(config) {
  const { person, hero: h } = config;
  const primary = resolveHref(h.primaryCta.href, config);
  const icon = { whatsapp: icons.chat, booking: icons.calendar }[h.primaryCta.href] || '';
  const badges = (h.badges || [])
    .map((b, i) => `<span class="hero__badge hero__badge--${i + 1}">${icons.leaf}${esc(b)}</span>`)
    .join('\n      ');
  const meta = [person.profession, person.license].filter(Boolean);
  return `<section class="hero" id="inicio" aria-labelledby="inicio-titulo">
  <div class="hero__blobs" aria-hidden="true"><span></span><span></span></div>
  <div class="container hero__grid">
    <div class="hero__copy">
      <p class="eyebrow hero__eyebrow">${meta.map((m) => `<span>${esc(m)}</span>`).join('<span class="hero__dot" aria-hidden="true"></span>')}</p>
      ${person.location ? `<p class="hero__location">${icons.pin}${esc(person.location)}</p>` : ''}
      <h1 class="hero__name" id="inicio-titulo">${words(person.name)}</h1>
      <p class="hero__tagline">${rich(h.tagline)}</p>
      <p class="hero__description">${rich(h.description)}</p>
      <div class="hero__actions">
        <a class="button" ${linkAttrs(primary)}>${icon}${esc(h.primaryCta.label)}</a>
        ${h.secondaryCta ? `<a class="button button--ghost" ${linkAttrs(resolveHref(h.secondaryCta.href, config))}>${esc(h.secondaryCta.label)}${icons.down}</a>` : ''}
      </div>
    </div>
    <div class="hero__media" data-parallax="-0.06">
      ${media({ image: person.photo, label: 'FOTO DEL PROFESIONAL', hint: 'Retrato vertical 4:5 · 1200 × 1500 px', ratio: '4/5', alt: `Retrato de ${person.name}`, eager: true, className: 'media--hero', shape: 'arch' })}
      ${badges}
    </div>
  </div>
</section>`;
}
