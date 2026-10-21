// Plantilla propia del modelo digitalbysofia_: un recorrido con un celular en
// 3D que muestra cada servicio mientras se baja, y después una página simple
// (sobre mí, proceso, preguntas y contacto). Los textos salen de config.mjs.
import { esc, rich, linkAttrs, media } from '../../src/helpers.mjs';
import { head } from '../../src/render.mjs';

const star = (cls = '') =>
  `<svg class="star ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.8l3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.6 5.7 21.2l1.5-7.1L1.8 9.2 9 8.4z" fill="currentColor"/></svg>`;

const wordmark = (config, cls = '') =>
  `<span class="wordmark ${cls}"><span class="wordmark__name">${esc(config.brand.wordmark)}${star()}</span><span class="wordmark__tag">${esc(config.brand.tagline)}</span></span>`;

/** Resuelve atajos de enlaces propios de este modelo. */
const href = (value, config) => {
  if (value === 'instagram-dm') return config.contact.instagramDm || config.instagramUrl;
  if (value === 'instagram') return config.instagramUrl;
  return value;
};

const button = (cta, config, cls) =>
  cta ? `<a class="btn ${cls}" ${linkAttrs(href(cta.href, config))}>${esc(cta.label)}</a>` : '';

function chapter(ch, i) {
  return `<section class="ch" id="${esc(ch.id)}" data-screen="${esc(ch.screen)}" data-text="${esc(ch.side)}"${ch.card ? ' data-card="1"' : ''} data-act="${esc(ch.eyebrow)}" data-glow="${i % 2 ? '232 169 181' : '179 22 79'}" aria-labelledby="${esc(ch.id)}-titulo">
      <div class="copy">
        <p class="eyebrow">${esc(ch.eyebrow)}</p>
        <p class="big" data-scramble="${esc(ch.word)}" aria-hidden="true">${esc(ch.word)}</p>
        <h2 id="${esc(ch.id)}-titulo"><span class="visually-hidden">${esc(ch.word)} </span>${rich(ch.title)}</h2>
        <p class="lead">${rich(ch.text)}</p>
        ${ch.point ? `<div class="point">${star('point__star')}<div><b>${esc(ch.point.title)}</b><span>${esc(ch.point.text)}</span></div></div>` : ''}
      </div>
    </section>`;
}

/** Pantalla de un dispositivo: la imagen indicada en config o una maqueta con la marca. */
function screen(image, kind, i) {
  if (image?.src) {
    return `<img src="${esc(image.src)}" alt="${esc(image.alt || '')}" loading="eager" decoding="async">`;
  }
  // Maqueta: una grilla de publicaciones con los colores de la marca.
  const n = kind === 'laptop' ? 21 : kind === 'phone' ? 9 : 12;
  const tiles = Array.from({ length: n }, (_, k) => `<span class="mock__tile mock__tile--${(k + i * 3) % 7}"></span>`).join('');
  if (kind === 'laptop') {
    return `<div class="mock mock--laptop"><div class="mock__bar"><span>✦ Editor</span><span class="mock__pill">Seleccionar todo</span></div><div class="mock__grid">${tiles}</div></div>`;
  }
  if (kind === 'phone') {
    return `<div class="mock mock--phone"><div class="mock__profile"><span class="mock__avatar"></span><span class="mock__lines"><i></i><i></i></span></div><div class="mock__grid">${tiles}</div></div>`;
  }
  return `<div class="mock mock--tablet"><div class="mock__grid">${tiles}</div></div>`;
}

/**
 * Apertura: primero la compu sola; al bajar caen los dispositivos desde
 * arriba, después aparecen el título y los botones, y al final se van los
 * dispositivos. Sin animaciones se ve directamente la composición final.
 */
function intro(config) {
  const it = config.intro;
  const devices = it.devices
    .map(
      (d, i) => `<div class="dev dev--${esc(d.type)} dev--${i + 1}"><div class="dev__drop" data-drop><div class="dev__body"><div class="dev__screen">${screen(d.image, d.type, i)}</div></div></div></div>`
    )
    .join('\n        ');
  return `<section class="intro" id="inicio" aria-labelledby="inicio-titulo" data-intro>
    <div class="intro__in">
      <div class="intro__title" data-intro-title>
        <p class="eyebrow">${esc(it.eyebrow)}</p>
        <h1 id="inicio-titulo">${rich(it.title)}</h1>
        <p class="lead">${rich(it.text)}</p>
        <div class="ctas ctas--center">
          ${button(it.primaryCta, config, 'btn--accent')}
          ${button(it.secondaryCta, config, 'btn--ghost')}
        </div>
      </div>
      <div class="scene" data-scene aria-hidden="true">
        ${devices}
        <div class="laptop" data-laptop>
          <div class="laptop__lid"><div class="laptop__screen">${screen(it.laptop?.image, 'laptop', 0)}</div></div>
          <div class="laptop__base"></div>
        </div>
        <div class="badge" ><div class="pop" data-pop>${wordmark(config, 'wordmark--badge')}</div></div>
        <div class="folder"><div class="pop" data-pop><div class="folder__body"><span>${rich(it.folder)}</span></div>
          <svg class="folder__cursor" viewBox="0 0 24 24"><path d="M5 3l14 8-6 1.5L16 20l-3 1.4-3.2-7.4L5 18z" fill="#fff" stroke="#1d1416" stroke-width="1.4" stroke-linejoin="round"/></svg></div></div>
      </div>
      <p class="intro__hint" data-intro-hint><i aria-hidden="true"></i>Bajá para ver más</p>
    </div>
  </section>`;
}

/**
 * Trabajos publicados: dos filas de tarjetas levemente torcidas que se mueven
 * en sentidos opuestos. Cada fila se repite dos veces para que el movimiento
 * no tenga cortes.
 */
function gallery(config) {
  const g = config.gallery;
  if (!g) return '';
  const card = (item, k) => {
    const inner = item?.src
      ? `<img src="${esc(item.src)}" alt="${esc(item.alt || '')}" loading="lazy" decoding="async">`
      : `<div class="work__mock work__mock--${k % 6}"><span>${esc(g.placeholderLabel)}</span></div>`;
    return `<li class="work" style="--tilt:${[-3, 2.5, -1.5, 3, -2.5, 1.5][k % 6]}deg">${inner}</li>`;
  };
  const row = (items, dir) => {
    const list = items.map(card).join('');
    return `<div class="works__row works__row--${dir}"><ul class="works__track" role="list">${list}</ul><ul class="works__track" role="list" aria-hidden="true">${list}</ul></div>`;
  };
  return `<section class="works" id="${esc(g.id)}" aria-labelledby="${esc(g.id)}-titulo">
    <div class="wrap works__head">
      <p class="eyebrow">${esc(g.eyebrow)}</p>
      <h2 id="${esc(g.id)}-titulo">${rich(g.title)}</h2>
    </div>
    ${row(g.rowA, 'right')}
    ${row(g.rowB, 'left')}
  </section>`;
}

/**
 * Feed + panel de servicios: el feed baja con el scroll y el panel de la
 * derecha queda fijo (position: sticky) hasta que el feed termina.
 */
function showcase(config) {
  const s = config.showcase;
  if (!s) return '';
  const wa = config.contact.whatsapp?.number;
  const waLink = (msg) => (wa ? `https://wa.me/${wa}?text=${encodeURIComponent(msg)}` : config.contact.instagramDm || config.instagramUrl);
  const tile = (item, k) =>
    item?.src
      ? `<li class="feed__item${k === 0 ? ' feed__item--cover' : ''}"><img src="${esc(item.src)}" alt="${esc(item.alt || '')}" loading="lazy" decoding="async"></li>`
      : `<li class="feed__item${k === 0 ? ' feed__item--cover' : ''} feed__mock feed__mock--${k % 6}">${
          k === 0 ? `<span class="feed__cover-tag">${esc(s.feedLabel)}</span><span class="feed__cover-title">${rich(s.coverTitle)}</span>` : ''
        }</li>`;
  return `<section class="showcase" id="${esc(s.id)}" aria-labelledby="${esc(s.id)}-titulo">
    <div class="showcase__in">
      <ul class="feed" role="list" aria-label="${esc(s.feedLabel)}">
        ${s.feed.map(tile).join('\n        ')}
      </ul>
      <aside class="pricing">
        <h2 id="${esc(s.id)}-titulo">${rich(s.title)}</h2>
        <p class="pricing__price">${esc(s.price || 'Consultá tu presupuesto')}</p>
        <ul class="pricing__chips" role="list">${s.chips.map((c, i) => `<li class="pricing__chip pricing__chip--${i}">${i === 0 ? '★ ' : ''}${esc(c)}</li>`).join('')}</ul>
        <a class="btn btn--accent pricing__cta" ${linkAttrs(waLink('Hola Sofi! Quiero pedir presupuesto para mi marca.'))}>${esc(s.ctaLabel)}</a>
        <h3 class="pricing__list-title">${esc(s.listTitle)}</h3>
        <ul class="pricing__list" role="list">
          ${s.services
            .map(
              (sv, i) => `<li class="pricing__row">
            <span class="pricing__thumb feed__mock--${(i + 1) % 6}" aria-hidden="true"></span>
            <span class="pricing__name">${esc(sv.title)}<span class="pricing__row-price">${esc(sv.price || 'Consultar')}</span></span>
            <a class="pricing__add" ${linkAttrs(waLink(`Hola Sofi! Quiero pedir presupuesto para ${sv.title.toLowerCase()}.`))}>+ consultar<span class="visually-hidden"> por ${esc(sv.title)}</span></a>
          </li>`
            )
            .join('\n          ')}
        </ul>
      </aside>
    </div>
  </section>`;
}

/** Bloques de venta: problemas, antes y después, servicios, cinta y para quién es. */
function salesSections(config) {
  const { pains, contrast, offer, marquee, forYou } = config;
  const dm = config.contact.instagramDm || config.instagramUrl;
  // Con WhatsApp, cada botón abre el chat con un mensaje que nombra el servicio.
  const wa = config.contact.whatsapp?.number;
  const quote = (service) =>
    wa ? `https://wa.me/${wa}?text=${encodeURIComponent(`Hola Sofi! Quiero pedir presupuesto para ${service}.`)}` : dm;
  const ticker = (marquee || []).map((m) => `<span>${esc(m)}</span><span aria-hidden="true">✦</span>`).join('');
  return `${
    pains
      ? `<section class="sec pains" id="${esc(pains.id)}" aria-labelledby="${esc(pains.id)}-titulo">
    <div class="wrap">
      <p class="eyebrow rv">${esc(pains.eyebrow)}</p>
      <h2 class="rv" id="${esc(pains.id)}-titulo">${rich(pains.title)}</h2>
      <ol class="pains__list">
        ${pains.items.map((it, i) => `<li class="rv"><span class="pains__n">${String(i + 1).padStart(2, '0')}</span><h3>${esc(it.title)}</h3><p>${rich(it.text)}</p></li>`).join('\n        ')}
      </ol>
    </div>
  </section>`
      : ''
  }
  ${
    contrast
      ? `<section class="contrast" aria-label="Antes y después">
    <div class="wrap contrast__in rv">
      <p class="contrast__before">${esc(contrast.before)}</p>
      <span class="contrast__arrow" aria-hidden="true">→</span>
      <p class="contrast__after">${esc(contrast.after)}</p>
      <p class="contrast__text">${rich(contrast.text)}</p>
    </div>
  </section>`
      : ''
  }
  ${
    offer
      ? `<section class="sec offer" id="${esc(offer.id)}" aria-labelledby="${esc(offer.id)}-titulo">
    <div class="wrap">
      <p class="eyebrow rv">${esc(offer.eyebrow)}</p>
      <h2 class="rv" id="${esc(offer.id)}-titulo">${rich(offer.title)}</h2>
      <p class="lead rv">${rich(offer.intro)}</p>
      <ul class="offer__grid" role="list">
        ${offer.items
          .map(
            (it) => `<li class="offer__card rv">
          ${star('offer__star')}
          <h3>${esc(it.title)}</h3>
          <p>${rich(it.text)}</p>
          <ul class="offer__includes">${it.includes.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
          <a class="btn btn--ghost btn--small" ${linkAttrs(quote(it.title.toLowerCase()))}>${esc(offer.ctaLabel)}<span class="visually-hidden">: ${esc(it.title)}</span></a>
        </li>`
          )
          .join('\n        ')}
      </ul>
    </div>
  </section>`
      : ''
  }
  ${
    ticker
      ? `<div class="ticker" role="presentation"><p class="visually-hidden">${(marquee || []).map(esc).join(', ')}</p><div class="ticker__track" aria-hidden="true"><div class="ticker__row">${ticker}</div><div class="ticker__row">${ticker}</div></div></div>`
      : ''
  }
  ${
    forYou
      ? `<section class="sec foryou" id="${esc(forYou.id)}" aria-labelledby="${esc(forYou.id)}-titulo">
    <div class="wrap">
      <p class="eyebrow rv">${esc(forYou.eyebrow)}</p>
      <h2 class="rv" id="${esc(forYou.id)}-titulo">${rich(forYou.title)}</h2>
      <ul class="foryou__list" role="list">
        ${forYou.items.map((it) => `<li class="rv">${star('foryou__star')}<div><h3>${esc(it.title)}</h3><p>${rich(it.text)}</p></div></li>`).join('\n        ')}
      </ul>
      <div class="ctas rv"><a class="btn btn--accent" ${linkAttrs(quote('mi marca'))}>Quiero mi propuesta</a></div>
    </div>
  </section>`
      : ''
  }`;
}

export function renderPage(config) {
  const s = config.story;
  const h = s.hero;
  const c = config.contact;
  const whatsapp = c.whatsapp?.number
    ? `https://wa.me/${c.whatsapp.number}?text=${encodeURIComponent(c.whatsapp.message || '')}`
    : '';
  // Datos que usa main.js para dibujar las pantallas del celular.
  const brand = {
    wordmark: config.brand.wordmark,
    tagline: config.brand.tagline,
    handle: config.instagramHandle.replace('@', ''),
    bio: ['Diseño contenido que conecta ✦', 'Edición de videos · Carruseles · Logotipos', 'Identidad visual para potenciar tu marca'],
    colors: config.colors.light,
  };

  const headHtml = head(config).replace(
    '<script src="main.js" defer></script>',
    `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
<script src="main.js" defer></script>`
  );

  return `<!doctype html>
<html lang="${esc(config.site.lang)}">
<head>
${headHtml}
</head>
<body>
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<header class="top" data-header>
  <a class="top__brand" href="#inicio" aria-label="${esc(config.brand.wordmark)}, ir al inicio">${wordmark(config, 'wordmark--small')}</a>
  <nav class="top__nav" aria-label="Principal">
    <a href="#servicios">Servicios</a>
    <a href="#sobre-mi">Sobre mí</a>
    <a href="#contacto">Contacto</a>
  </nav>
  ${button({ label: 'Pedí tu propuesta', href: '#contacto' }, config, 'btn--accent btn--small')}
</header>

<main id="contenido" tabindex="-1">
  ${intro(config)}

  ${gallery(config)}

  ${showcase(config)}

  <div class="story" id="recorrido">
    <div class="stage" aria-hidden="true">
      <div class="drape"></div>
      <div class="glow" data-glow-layer></div>
      <svg class="swirls" viewBox="0 0 1200 800" preserveAspectRatio="none"><path d="M-40 620 C 220 420, 360 760, 620 560 S 980 300, 1240 470"/><path d="M-60 180 C 180 60, 300 300, 520 200 S 860 20, 1260 140"/></svg>
      <div class="bigword" data-bigword>${esc(config.brand.wordmark)}</div>
      <div class="floor" data-floor></div>
      <canvas class="phone3d" data-phone3d></canvas>
      <div class="phone-flat" data-phone-flat></div>
      <div class="rail" data-rail></div>
      <p class="act" data-act></p>
    </div>

    <div class="chapters">
      <section class="ch ch--hero" data-screen="${esc(h.screen)}" data-text="left" data-act="${esc(config.brand.wordmark)}" data-glow="179 22 79" aria-labelledby="recorrido-titulo">
        <div class="copy">
          <p class="eyebrow">${esc(h.eyebrow)}</p>
          <h2 class="ch__title" id="recorrido-titulo">${rich(h.title)}</h2>
          <p class="lead">${rich(h.text)}</p>
          <div class="ctas">
            ${button(h.primaryCta, config, 'btn--accent')}
            ${button(h.secondaryCta, config, 'btn--ghost')}
          </div>
          <p class="hint"><i aria-hidden="true"></i>${esc(h.hint)}</p>
        </div>
      </section>
      ${s.chapters.map(chapter).join('\n      ')}
    </div>
  </div>

  <section class="end" aria-labelledby="cierre-titulo">
    <div class="end__in">
      ${wordmark(config, 'wordmark--big')}
      <h2 id="cierre-titulo">${rich(s.end.title)}</h2>
      <p>${rich(s.end.text)}</p>
      <div class="ctas ctas--center">
        ${button(s.end.primaryCta, config, 'btn--accent')}
        ${button(s.end.secondaryCta, config, 'btn--ghost')}
      </div>
    </div>
  </section>

  ${salesSections(config)}

  <section class="sec about" id="${esc(config.about.id)}" aria-labelledby="${esc(config.about.id)}-titulo">
    <div class="wrap about__grid">
      <div class="about__photo rv">
        ${media({ image: config.person.photo, label: 'FOTO DE SOFÍA', hint: 'Vertical 4:5 · 1200 × 1500 px', ratio: '4/5', alt: `Retrato de ${config.person.name}`, shape: 'arch' })}
      </div>
      <div class="about__text">
        <p class="eyebrow rv">${esc(config.about.eyebrow)}</p>
        <h2 class="rv" id="${esc(config.about.id)}-titulo">${rich(config.about.title)}</h2>
        ${config.about.paragraphs.map((p) => `<p class="rv">${rich(p)}</p>`).join('\n        ')}
        <ul class="chips rv" aria-label="Servicios">
          ${s.chapters.map((ch) => `<li><a href="#${esc(ch.id)}">${esc(ch.eyebrow)}</a></li>`).join('')}
        </ul>
      </div>
    </div>
  </section>

  <section class="sec process" id="${esc(config.process.id)}" aria-labelledby="${esc(config.process.id)}-titulo">
    <div class="wrap">
      <p class="eyebrow rv">${esc(config.process.eyebrow)}</p>
      <h2 class="rv" id="${esc(config.process.id)}-titulo">${rich(config.process.title)}</h2>
      <ol class="steps">
        ${config.process.steps.map((st, i) => `<li class="rv"><span class="steps__n">${i + 1}</span><h3>${esc(st.title)}</h3><p>${rich(st.text)}</p></li>`).join('\n        ')}
      </ol>
    </div>
  </section>

  <section class="sec faq" id="${esc(config.faq.id)}" aria-labelledby="${esc(config.faq.id)}-titulo">
    <div class="wrap faq__grid">
      <div>
        <p class="eyebrow rv">${esc(config.faq.eyebrow)}</p>
        <h2 class="rv" id="${esc(config.faq.id)}-titulo">${rich(config.faq.title)}</h2>
      </div>
      <div class="faq__list">
        ${config.faq.items
          .map(
            (item) => `<details class="faq__item rv"><summary>${esc(item.q)}<span class="faq__plus" aria-hidden="true"></span></summary><p>${rich(item.a)}</p></details>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <section class="sec contact" id="${esc(c.id)}" aria-labelledby="${esc(c.id)}-titulo">
    <div class="wrap">
      <div class="contact__panel rv">
        <svg class="contact__swirl" viewBox="0 0 600 300" aria-hidden="true"><path d="M-20 240 C 120 120, 220 300, 330 180 S 520 20, 640 110"/></svg>
        <p class="eyebrow">${esc(c.eyebrow)}</p>
        <h2 id="${esc(c.id)}-titulo">${rich(c.title)}</h2>
        <p class="lead">${rich(c.intro)}</p>
        <div class="ctas ctas--center">
          <a class="btn btn--light" ${linkAttrs(c.instagramDm || config.instagramUrl)}>Escribime por Instagram</a>
          ${whatsapp ? `<a class="btn btn--outline-light" ${linkAttrs(whatsapp)}>WhatsApp</a>` : ''}
          ${config.portfolioUrl ? `<a class="btn btn--outline-light" ${linkAttrs(config.portfolioUrl)}>Ver portfolio</a>` : ''}
        </div>
        <p class="contact__data">${esc(config.instagramHandle)}${c.whatsapp?.display ? ` · ${esc(c.whatsapp.display)}` : ''}${c.email ? ` · ${esc(c.email)}` : ''}</p>
      </div>
    </div>
  </section>
</main>

<footer class="foot">
  <div class="wrap foot__in">
    ${wordmark(config, 'wordmark--small')}
    <p>${esc(config.footer.note)}</p>
    <nav aria-label="Redes">
      ${config.social.filter((x) => x.url).map((x) => `<a ${linkAttrs(x.url)}>${esc(x.label)}</a>`).join('')}
    </nav>
  </div>
  <p class="foot__legal">© <span data-year>${new Date().getFullYear()}</span> ${esc(config.person.name)}${config.demo ? ` · ${esc(config.footer.demoNotice)}` : ''}</p>
</footer>
<script type="application/json" id="brand-data">${JSON.stringify(brand).replace(/</g, '\\u003c')}</script>
</body>
</html>
`;
}

