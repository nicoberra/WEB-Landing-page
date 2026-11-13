// Plantilla propia de "Pages by NB" (venta de páginas web).
// Colorida y juguetona: azul eléctrico, stickers, formas redondas y mucho
// movimiento. Los textos salen de config.mjs. Sin JavaScript se ve todo.
import { esc } from '../../src/helpers.mjs';
import { head } from '../../src/render.mjs';

/** *palabra* → palabra pintada con subrayado de color */
const hl = (s = '') => esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');

const wa = (config, text) =>
  `https://wa.me/${config.contact.whatsapp.number}?text=${encodeURIComponent(text || config.contact.whatsapp.message)}`;
const ext = 'target="_blank" rel="noopener noreferrer"';

const waIcon =
  '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.6 18.6Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9.2 8.6c.3-.6.8-.6 1-.1l.6 1.4c.1.3 0 .6-.2.8l-.4.4c.5 1 1.3 1.8 2.3 2.3l.4-.4c.2-.2.5-.3.8-.2l1.4.6c.5.2.5.7-.1 1-1 .6-2.4.4-3.9-.7a8.6 8.6 0 0 1-2.6-2.9c-.7-1.4-.6-2.4.7-2.2Z" fill="currentColor"/></svg>';
const arrow = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const star = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 1.5c.9 6.4 4.1 9.6 10.5 10.5-6.4.9-9.6 4.1-10.5 10.5C11.1 16.1 7.9 12.9 1.5 12 7.9 11.1 11.1 7.9 12 1.5Z" fill="currentColor"/></svg>';

const logo = (config, cls = '') =>
  `<span class="logo ${cls}"><span class="logo__word">${esc(config.brand.word)}</span><span class="logo__tag">${esc(config.brand.tag)}</span></span>`;

/** Mini ilustraciones de cada producto (hechas con HTML y CSS) */
const ART = {
  landing: `<div class="art art--landing" aria-hidden="true"><div class="art__bar"><i></i><i></i><i></i></div><div class="art__hero"><b></b><span></span><span></span><em></em></div><div class="art__row"><i></i><i></i><i></i></div></div>`,
  tienda: `<div class="art art--tienda" aria-hidden="true"><div class="art__grid"><i><u></u></i><i><u></u></i><i><u></u></i><i><u></u></i></div><div class="art__cart">🛒<b>2</b></div></div>`,
  crm: `<div class="art art--crm" aria-hidden="true"><div class="art__cols"><div><i></i><i></i><i></i></div><div><i></i><i></i></div><div><i></i></div></div><div class="art__ok">✓</div></div>`,
};

function products(config) {
  const p = config.products;
  const pk = config.picker;
  return `<section class="sec products" id="productos" aria-labelledby="productos-titulo">
  <div class="wrap">
    <p class="eyebrow">${esc(p.eyebrow)}</p>
    <h2 class="title" id="productos-titulo">${hl(p.title)}</h2>
    <p class="lead">${esc(p.intro)}</p>

    <div class="picker" data-picker>
      <p class="picker__q">${hl(pk.title)}</p>
      <div class="picker__opts">
        ${pk.options.map((o) => `<button type="button" class="pick" data-pick="${esc(o.product)}"><span class="pick__emoji" aria-hidden="true">${o.emoji}</span>${esc(o.text)}</button>`).join('\n        ')}
      </div>
    </div>

    <div class="cards">
      ${p.items
        .map(
          (it, i) => `<article class="card card--${esc(it.color)}" id="producto-${esc(it.id)}" data-product="${esc(it.id)}" data-tilt data-reveal style="--d:${i * 120}ms">
        <span class="sticker card__badge">${esc(it.badge)}</span>
        ${ART[it.id] || ''}
        <h3 class="card__name">${esc(it.name)}</h3>
        <p class="card__pitch">${esc(it.pitch)}</p>
        <ul class="card__list">${it.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
        <p class="card__ideal"><strong>Ideal para:</strong> ${esc(it.ideal)}</p>
        <div class="card__foot">
          <span class="card__price">${esc(it.price || p.soonPrice)}</span>
          <a class="btn btn--ink" data-magnetic href="${wa(config, `¡Hola Nico! Quiero consultar por una ${it.name}.`)}" ${ext}>Consultar ${arrow}</a>
        </div>
      </article>`
        )
        .join('\n      ')}
    </div>
  </div>
</section>`;
}

function works(config) {
  const w = config.works;
  const types = [
    ['todos', 'Todas'],
    ['landing', 'Landing pages'],
    ['tienda', 'E-commerce'],
    ['crm', 'CRM'],
  ].filter(([t]) => t === 'todos' || w.items.some((it) => it.type.includes(t)));
  return `<section class="sec works" id="trabajos" aria-labelledby="trabajos-titulo">
  <div class="wrap">
    <p class="eyebrow">${esc(w.eyebrow)}</p>
    <h2 class="title" id="trabajos-titulo">${hl(w.title)}</h2>
    <p class="lead">${esc(w.intro)}</p>
    <div class="filters" role="group" aria-label="Filtrar trabajos">
      ${types.map(([t, label], i) => `<button type="button" class="filter${i === 0 ? ' is-on' : ''}" data-filter="${t}" aria-pressed="${i === 0}">${esc(label)}</button>`).join('\n      ')}
    </div>
    <div class="works__grid">
      ${w.items
        .map(
          (it, i) => `<article class="work work--${esc(it.color)}" data-type="${esc(it.type.join(' '))}" data-reveal style="--d:${(i % 2) * 120}ms">
        <button type="button" class="work__shot" data-open="${i}" aria-label="Ver la web de ${esc(it.name)} completa">
          <span class="browser"><span class="browser__bar"><i></i><i></i><i></i><span>${esc(it.url ? it.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : it.name)}</span></span>
            <span class="browser__view"><img src="${esc(it.web)}" alt="Página de ${esc(it.name)} en la compu" loading="lazy" decoding="async"></span></span>
          <span class="phone"><img src="${esc(it.cel)}" alt="" loading="lazy" decoding="async"></span>
          <span class="work__zoom" aria-hidden="true">Ver completa ↗</span>
        </button>
        <div class="work__info">
          <h3 class="work__name">${esc(it.name)}</h3>
          <p class="work__kind">${esc(it.kind)}</p>
          <ul class="work__tags">${it.tags.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          ${it.url ? `<a class="work__visit" href="${esc(it.url)}" ${ext}>Visitar ${arrow}</a>` : ''}
        </div>
      </article>`
        )
        .join('\n      ')}
    </div>
  </div>
  <dialog class="viewer" data-viewer aria-label="Vista completa de la web">
    <div class="viewer__top"><p class="viewer__name" data-viewer-name></p><a class="viewer__visit" data-viewer-visit ${ext} hidden>Visitar ${arrow}</a><button type="button" class="viewer__close" data-viewer-close aria-label="Cerrar">✕</button></div>
    <div class="viewer__body"><img data-viewer-img src="" alt=""></div>
  </dialog>
  <script type="application/json" data-works>${JSON.stringify(w.items.map((it) => ({ name: it.name, web: it.web, url: it.url }))).replace(/</g, '\\u003c')}</script>
</section>`;
}

export function renderPage(config) {
  const h = config.hero;
  const t = config.ticker;
  const book = `href="${wa(config)}" ${ext}`;
  return `<!doctype html>
<html lang="${esc(config.site.lang)}">
<head>
${head(config)}
</head>
<body>
<a class="skip-link" href="#contenido">Saltar al contenido</a>
${config.demo ? '<p class="demo-note">Vista previa · nombre, WhatsApp y precios provisorios</p>' : ''}

<header class="top" data-top>
  <div class="top__in">
    <a class="top__brand" href="#inicio" aria-label="${esc(config.brand.word + ' ' + config.brand.tag)}, inicio">${logo(config)}</a>
    <nav class="top__nav" aria-label="Secciones">
      <a href="#productos">Productos</a>
      <a href="#trabajos">Trabajos</a>
      <a href="#proceso">Cómo trabajo</a>
      <a href="#preguntas">Preguntas</a>
    </nav>
    <a class="btn btn--blue btn--sm" data-magnetic ${book}>${waIcon}<span>Hablemos</span></a>
  </div>
</header>

<main id="contenido" tabindex="-1">
  <section class="hero" id="inicio" aria-labelledby="inicio-titulo">
    <div class="blobs" aria-hidden="true"><i class="blob blob--a"></i><i class="blob blob--b"></i><i class="blob blob--c"></i></div>
    <div class="wrap hero__in">
      <div class="hero__copy">
        <p class="hero__hi" data-reveal>${esc(h.eyebrow)}</p>
        <h1 class="hero__title" id="inicio-titulo" data-reveal style="--d:80ms">
          <span>${esc(h.before)}</span>
          <span class="swap" data-swap='${esc(JSON.stringify(h.words))}'><span class="swap__word" data-swap-word>${esc(h.words[0])}</span></span>
        </h1>
        <p class="hero__text" data-reveal style="--d:160ms">${esc(h.text)}</p>
        <div class="hero__ctas" data-reveal style="--d:240ms">
          <a class="btn btn--blue btn--big" data-magnetic ${book}>${waIcon}${esc(h.cta)}</a>
          <a class="btn btn--line btn--big" data-magnetic href="#trabajos">${esc(h.secondary)}</a>
        </div>
      </div>
      <div class="hero__art" aria-hidden="true" data-parallax>
        <div class="stack">
          ${(h.shots || [0, 1, 2])
            .map((n) => config.works.items[n])
            .filter(Boolean)
            .map((it, i) => `<div class="stack__card stack__card--${i}" data-depth="${(i + 1) * 0.6}"><span class="browser browser--mini"><span class="browser__bar"><i></i><i></i><i></i></span><span class="browser__view"><img src="${esc(it.web)}" alt="" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}></span></span></div>`)
            .join('')}
          ${h.stickers.map((s, i) => `<span class="sticker sticker--float sticker--${i}" data-depth="${1.6 + i * 0.4}">${esc(s)}</span>`).join('')}
          <span class="spark spark--a" data-depth="2.4">${star}</span>
          <span class="spark spark--b" data-depth="1.2">${star}</span>
          <span class="smile" data-depth="2">☺</span>
        </div>
      </div>
    </div>
  </section>

  <div class="ticker" aria-hidden="true">
    <div class="ticker__track">${[...t, ...t, ...t].map((w) => `<span>${esc(w)}</span><i>${star}</i>`).join('')}</div>
  </div>

  ${products(config)}

  ${works(config)}

  <section class="sec perks" id="incluye" aria-labelledby="incluye-titulo">
    <div class="wrap">
      <p class="eyebrow">${esc(config.perks.eyebrow)}</p>
      <h2 class="title" id="incluye-titulo">${hl(config.perks.title)}</h2>
      <ul class="perks__grid">
        ${config.perks.items.map((p, i) => `<li class="perk" data-reveal style="--d:${(i % 3) * 100}ms"><span class="perk__emoji" aria-hidden="true">${p.emoji}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`).join('\n        ')}
      </ul>
    </div>
  </section>

  <section class="sec steps" id="proceso" aria-labelledby="proceso-titulo">
    <div class="wrap">
      <p class="eyebrow">${esc(config.process.eyebrow)}</p>
      <h2 class="title" id="proceso-titulo">${hl(config.process.title)}</h2>
      <div class="steps__wrap">
      <svg class="steps__path" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true"><path d="M20 60 C 180 -10, 300 130, 500 60 S 820 -10, 980 60"/></svg>
      <ol class="steps__list">
        ${config.process.steps.map((s, i) => `<li class="step" data-reveal style="--d:${i * 150}ms"><span class="step__num">${i + 1}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></li>`).join('\n        ')}
      </ol>
      </div>
    </div>
  </section>

  <section class="sec faq" id="preguntas" aria-labelledby="preguntas-titulo">
    <div class="wrap faq__in">
      <div>
        <p class="eyebrow">${esc(config.faq.eyebrow)}</p>
        <h2 class="title" id="preguntas-titulo">${hl(config.faq.title)}</h2>
      </div>
      <div class="faq__list">
        ${config.faq.items.map((f) => `<details class="qa" data-reveal><summary>${esc(f.q)}<span class="qa__plus" aria-hidden="true"></span></summary><p>${esc(f.a)}</p></details>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="end" id="contacto" aria-labelledby="contacto-titulo">
    <div class="wrap">
      <div class="end__box" data-reveal>
        <span class="spark spark--c" aria-hidden="true">${star}</span>
        <span class="spark spark--d" aria-hidden="true">${star}</span>
        <h2 class="end__title" id="contacto-titulo">${hl(config.end.title)}</h2>
        <p class="end__text">${esc(config.end.text)}</p>
        <a class="btn btn--yellow btn--big" data-magnetic data-confetti ${book}>${waIcon}${esc(config.end.cta)}</a>
      </div>
    </div>
  </section>
</main>

<footer class="foot">
  <div class="wrap foot__in">
    ${logo(config, 'logo--foot')}
    <p>${esc(config.footer.note)}</p>
    <p class="foot__legal">© <span data-year>${new Date().getFullYear()}</span> ${esc(config.person.name)}</p>
  </div>
</footer>

<a class="wa-float" ${book} aria-label="Escribir por WhatsApp">${waIcon}</a>
</body>
</html>
`;
}
