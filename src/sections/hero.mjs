import { esc, rich, media, linkAttrs, resolveHref, icons } from '../helpers.mjs';

export default function hero(config) {
  const { person, hero: h } = config;
  const primary = resolveHref(h.primaryCta.href, config);
  return `<section class="hero" id="inicio" aria-labelledby="inicio-titulo">
  <div class="container hero__grid">
    <div class="hero__copy">
      <p class="eyebrow hero__eyebrow"><span>${esc(person.profession)}</span>${person.location ? `<span class="hero__dot" aria-hidden="true"></span><span>${esc(person.location)}</span>` : ''}</p>
      <h1 class="hero__name" id="inicio-titulo">${esc(person.name)}</h1>
      <p class="hero__tagline">${rich(h.tagline)}</p>
      <p class="hero__description">${rich(h.description)}</p>
      <div class="hero__actions">
        <a class="button" ${linkAttrs(primary)}>${h.primaryCta.href === 'whatsapp' ? icons.chat : ''}${esc(h.primaryCta.label)}</a>
        ${h.secondaryCta ? `<a class="button button--ghost" ${linkAttrs(h.secondaryCta.href)}>${esc(h.secondaryCta.label)}${icons.down}</a>` : ''}
      </div>
    </div>
    <div class="hero__media">
      ${media({ image: person.photo, label: 'FOTO DEL PROFESIONAL', hint: 'Retrato vertical 4:5 · 1200 × 1500 px', ratio: '4/5', alt: `Retrato de ${person.name}`, eager: true, className: 'media--hero' })}
      <span class="reg-mark" aria-hidden="true"></span>
    </div>
  </div>
</section>`;
}
