// Plantilla propia de DN Estética Facial y Corporal (Daniela Bassano).
// Estética de sus placas: crema satinado, gris carbón y moka, títulos en serif
// clásica, "Estética Facial y Corporal" a mano, fotos en óvalos y arcos, y
// hojas de eucalipto y espigas en las esquinas. Los textos salen de config.mjs.
// Sin JavaScript se ven todas las fichas una debajo de la otra.
import { esc, linkAttrs } from '../../src/helpers.mjs';
import { head } from '../../src/render.mjs';

/** **resaltado** → <strong>, como las palabras en moka de sus placas. */
const hl = (s = '') => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

const wa = (config, text) =>
  `https://wa.me/${config.contact.whatsapp.number}?text=${encodeURIComponent(text || config.contact.whatsapp.message)}`;

// Íconos de línea, como los de sus placas
const ICONS = {
  sparkle: '<path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7Z"/><path d="M19 15.5c.2 1.4.8 2 2.2 2.2-1.4.2-2 .8-2.2 2.2-.2-1.4-.8-2-2.2-2.2 1.4-.2 2-.8 2.2-2.2Z"/>',
  diamond: '<path d="M6.5 4h11L21 9l-9 11L3 9Z"/><path d="M3 9h18M9.5 4 8 9l4 11 4-11-1.5-5"/>',
  molecule: '<circle cx="6" cy="7" r="2.2"/><circle cx="17.5" cy="6" r="2.2"/><circle cx="12" cy="17" r="2.6"/><path d="m7.6 8.6 3 6M16.4 7.9l-3 6.6M8.2 7.1l7-.9"/>',
  face: '<path d="M12 3.5c-3.6 0-6 2.8-6 6.7 0 4.5 2.9 9.3 6 9.3s6-4.8 6-9.3c0-3.9-2.4-6.7-6-6.7Z"/><path d="M9.5 10.5h.01M14.5 10.5h.01M10 15c1.2.8 2.8.8 4 0"/>',
  hands: '<path d="M12 9.5c-1.3-2.2-4.6-1.6-4.6.9 0 2 2.6 3.6 4.6 5 2-1.4 4.6-3 4.6-5 0-2.5-3.3-3.1-4.6-.9Z"/><path d="M3 13.5c1.2 2.8 3.6 5 6.5 6M21 13.5c-1.2 2.8-3.6 5-6.5 6"/>',
  flask: '<path d="M9.5 3.5h5M10.5 3.5v5.2L5.4 17.6a2 2 0 0 0 1.7 2.9h9.8a2 2 0 0 0 1.7-2.9l-5.1-8.9V3.5"/><path d="M7.6 14h8.8"/><circle cx="11" cy="16.6" r=".6"/><circle cx="13.6" cy="17.6" r=".6"/>',
  waves: '<path d="M3 8c2-1.6 3.5-1.6 5.5 0S12 9.6 14 8s3.5-1.6 5.5 0M3 12.5c2-1.6 3.5-1.6 5.5 0s3.5 1.6 5.5 0 3.5-1.6 5.5 0M3 17c2-1.6 3.5-1.6 5.5 0s3.5 1.6 5.5 0 3.5-1.6 5.5 0"/>',
  signal: '<circle cx="12" cy="12" r="1.6"/><path d="M8.6 8.6a4.8 4.8 0 0 0 0 6.8M15.4 8.6a4.8 4.8 0 0 1 0 6.8M5.8 5.8a8.8 8.8 0 0 0 0 12.4M18.2 5.8a8.8 8.8 0 0 1 0 12.4"/>',
  star: '<path d="m12 3.5 2.5 5.3 5.8.7-4.3 4 1.1 5.7L12 16.4l-5.1 2.8 1.1-5.7-4.3-4 5.8-.7Z"/>',
  dots: '<path d="M3 12c3-4 15-4 18 0-3 4-15 4-18 0Z"/><path d="M7 12h.01M10 11h.01M14 11h.01M17 12h.01M12 13.4h.01"/>',
  drop: '<path d="M12 3.5s6 6.4 6 10.6a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5Z"/>',
  sun: '<circle cx="12" cy="12" r="3.6"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>',
  bolt: '<path d="M13 3 6 13.5h5.2L10.5 21 18 10.4h-5.3Z"/>',
  mask: '<path d="M12 3.5c-4 0-6.5 2.6-6.5 7.6 0 5.4 3.2 9.4 6.5 9.4s6.5-4 6.5-9.4c0-5-2.5-7.6-6.5-7.6Z"/><path d="M8.6 10.2c.8-.6 1.8-.6 2.4 0M13 10.2c.8-.6 1.8-.6 2.4 0M10 15.2c1.3.9 2.7.9 4 0"/>',
  machine: '<rect x="7" y="3.5" width="10" height="7" rx="1.4"/><path d="M8 10.5 7 19.5h10l-1-9M9 20.5v.5M15 20.5v.5M10 6.5h4"/>',
  waist: '<path d="M7 3.5c1.6 3.6 1.6 7 0 9.5-1.4 2.2-1.2 5 .4 7.5M17 3.5c-1.6 3.6-1.6 7 0 9.5 1.4 2.2 1.2 5-.4 7.5"/><path d="M3 9.5h3M18 9.5h3M4.5 8l1.5 1.5L4.5 11M19.5 8 18 9.5l1.5 1.5"/>',
  probe: '<path d="M9 4.5 15.5 11l-2.8 2.8a2 2 0 0 1-2.8 0L6.2 10.1a2 2 0 0 1 0-2.8Z"/><path d="m11.6 15.4 3.6 3.6M3.5 17c1.5.6 2.6 1.7 3.2 3.2M3.5 13.5c3.3.7 5.8 3.2 6.5 6.5"/>',
  muscle: '<path d="M5 19.5c-.8-4.2.2-8.4 3.2-11.4L10 6.3c.8-.8 2.2-.8 3 0l.5.5-1.8 2.4c2.4-.4 4.6.4 6.3 2.2 1.8 1.9 2.3 4.6 1.6 7.1"/><path d="M5 19.5h15.6M9 14c1.4-.8 3.3-.8 4.6.3"/>',
  drops: '<path d="M8 4s3.5 3.7 3.5 6.1A3.5 3.5 0 0 1 4.5 10C4.5 7.7 8 4 8 4ZM16.5 9.5s3 3.2 3 5.3a3 3 0 0 1-6 0c0-2.1 3-5.3 3-5.3Z"/><path d="M4 19.5c2-1.3 4-1.3 6 0s4 1.3 6 0"/>',
  heat: '<path d="M7.5 4c-1.6 2 1.6 3.4 0 5.6s1.6 3.4 0 5.6M12 4c-1.6 2 1.6 3.4 0 5.6s1.6 3.4 0 5.6M16.5 4c-1.6 2 1.6 3.4 0 5.6s1.6 3.4 0 5.6M4 19.5h16"/>',
  sound: '<path d="M8.5 7.5a6 6 0 0 0 0 9M5.5 4.8a10 10 0 0 0 0 14.4M15.5 7.5a6 6 0 0 1 0 9M18.5 4.8a10 10 0 0 1 0 14.4"/><circle cx="12" cy="12" r="1.6"/>',
  boots: '<path d="M6 3.5h5v9.5l4.5 2.7c1 .6 1.5 1.7 1.2 2.8l-.2.5H6Z"/><path d="M6 7.5h5M6 11h5M14 14.5l-1 2M16.2 16.2l-1.6 1.8"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  check: '<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.2 2.4 2.3 4.6-4.9"/>',
  lotus: '<path d="M12 5c1.8 2 2.6 4.3 2.6 6.6S13.8 15.6 12 17c-1.8-1.4-2.6-3.1-2.6-5.4S10.2 7 12 5Z"/><path d="M12 17c-2.6-.2-5.2-1.6-7-4.2 2.2-.6 4.4-.2 6.2 1.2M12 17c2.6-.2 5.2-1.6 7-4.2-2.2-.6-4.4-.2-6.2 1.2"/>',
  user: '<circle cx="12" cy="8" r="3.6"/><path d="M5 20c.6-4 3.3-6.5 7-6.5s6.4 2.5 7 6.5"/>',
  phone: '<path d="M6.5 3.5h2.8l1.4 4-2 1.4a11 11 0 0 0 6.4 6.4l1.4-2 4 1.4v2.8a2 2 0 0 1-2.2 2C10.6 19 5 13.4 4.5 5.7a2 2 0 0 1 2-2.2Z"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};
const icon = (name, cls = 'ico') =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ICONS.sparkle}</svg>`;

const waIcon =
  '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.6 18.6Z"/><path d="M9.2 8.6c.3-.6.8-.6 1-.1l.6 1.4c.1.3 0 .6-.2.8l-.4.4c.5 1 1.3 1.8 2.3 2.3l.4-.4c.2-.2.5-.3.8-.2l1.4.6c.5.2.5.7-.1 1-1 .6-2.4.4-3.9-.7a8.6 8.6 0 0 1-2.6-2.9c-.7-1.4-.6-2.4.7-2.2Z" fill="currentColor" stroke="none"/></svg>';

/** Línea con el puntito, como debajo de cada título de sus placas */
const rule = (cls = '') => `<span class="rule ${cls}" aria-hidden="true"><i></i></span>`;

/** Los tres círculos de su paleta */
const swatches = '<span class="swatches" aria-hidden="true"><i></i><i></i><i></i></span>';

/** Título en dos tonos: arriba gris carbón, abajo moka */
const twoTone = (t, tag = 'h3', id = '') =>
  `<${tag} class="tt${t.join(' ').split(' ').some((w) => w.length > 13) ? ' tt--long' : ''}"${id ? ` id="${id}"` : ''}>${t[0] ? `<span class="tt__a">${esc(t[0])}</span>` : ''}<span class="tt__b">${esc(t[1])}</span></${tag}>`;

const leaf = (name, cls) => `<img class="leaf ${cls}" src="assets/${name}.webp" alt="" aria-hidden="true" loading="lazy" data-sway>`;

function allItems(config) {
  const map = new Map();
  config.categories.forEach((c) => c.items.forEach((it) => { if (it.title) map.set(it.id, { ...it, cat: c }); }));
  return map;
}

/** Ficha completa de un tratamiento */
function ficha(config, it, cat, first) {
  const ask = wa(config, `Hola Daniela! Quería consultar por un turno de ${it.title.filter(Boolean).join(' ')} (${cat.label.toLowerCase()}).`);
  const body = [];
  if (it.intro) body.push(`<p class="ficha__intro">${hl(it.intro)}</p>`);
  if (it.highlight) body.push(`<p class="ficha__hl">${icon('sparkle')}<span>${esc(it.highlight)}</span></p>`);
  if (it.tech) body.push(`<ul class="ficha__tech" role="list">${it.tech.map((t, i) => `<li>${icon(['signal', 'probe', 'sun', 'waves'][i % 4])}<span>${esc(t)}</span>${i < it.tech.length - 1 ? '<b aria-hidden="true">+</b>' : ''}</li>`).join('')}</ul>`);
  if (it.text) body.push(`<p class="ficha__text">${hl(it.text)}</p>`);
  if (it.points) body.push(`<ul class="ficha__points" role="list">${it.points.map((p) => `<li>${icon(p.icon)}<p>${hl(p.text)}</p></li>`).join('')}</ul>`);
  if (it.list) body.push(`${it.listTitle ? `<p class="ficha__lt">${esc(it.listTitle)}</p>` : ''}<ul class="ficha__list" role="list">${it.list.map((l) => `<li>${icon('check')}<span>${hl(l)}</span></li>`).join('')}</ul>`);
  if (it.steps) body.push(`<ol class="ficha__steps">${it.steps.map((s, i) => `<li><span class="ficha__n">${String(i + 1).padStart(2, '0')}</span><p>${hl(s)}</p></li>`).join('')}</ol>`);
  if (it.note) body.push(`<p class="ficha__note">${hl(it.note)}</p>`);
  return `<article class="ficha" id="t-${esc(cat.id)}-${esc(it.id)}" data-ficha="${esc(cat.id)}:${esc(it.id)}"${first ? ' data-current' : ''} aria-labelledby="t-${esc(cat.id)}-${esc(it.id)}-h">
          <div class="ficha__media">
            <div class="oval${it.photoWide ? ' oval--wide' : ''}"><img src="${esc(it.photo)}" alt="" loading="lazy"></div>
            ${it.equipment ? `<div class="equipo"><img src="${esc(it.equipment)}" alt="Equipo de ${esc(it.title.filter(Boolean).join(' '))}" loading="lazy"></div>` : ''}
          </div>
          <div class="ficha__copy">
            <p class="ficha__cat">${esc(cat.label)}</p>
            ${twoTone(it.title, 'h3', `t-${esc(cat.id)}-${esc(it.id)}-h`)}
            ${rule()}
            ${body.join('\n            ')}
            <div class="ficha__foot">
              <span class="pill">${icon('clock')}${esc(it.time)}</span>
              ${swatches}
            </div>
            <a class="btn btn--solid" data-magnetic ${linkAttrs(ask)}>${waIcon}Quiero mi turno</a>
          </div>
        </article>`;
}

function treatments(config) {
  const items = allItems(config);
  const tabs = config.categories
    .map((c, i) => `<button class="switch__btn" type="button" role="tab" id="tab-${esc(c.id)}" aria-controls="panel-${esc(c.id)}" aria-selected="${i === 0}" data-cat="${esc(c.id)}">${esc(c.label)}</button>`)
    .join('');
  const panels = config.categories
    .map((c, ci) => {
      const list = c.items
        .map((it, i) => {
          const target = it.ref || it.id;
          const known = items.has(target);
          const where = known ? (it.ref ? items.get(target).cat.id : c.id) : '';
          const inner = `<span class="menu__ico">${icon(it.icon)}</span>
              <span class="menu__name">${esc(it.short)}</span>
              <span class="menu__go" aria-hidden="true">${icon('arrow')}</span>`;
          // Sin placa todavía: lleva a consultar por WhatsApp
          if (!known) return `<li><a class="menu__item" data-ask ${linkAttrs(wa(config, `Hola Daniela! Quería consultar por ${it.short} (${c.label.toLowerCase()}).`))}>${inner}</a></li>`;
          return `<li><button class="menu__item" type="button" data-pick="${esc(where)}:${esc(target)}" aria-pressed="${i === 0}">${inner}</button></li>`;
        })
        .join('\n            ');
      const fichas = c.items.filter((it) => it.title).map((it, i) => ficha(config, it, c, i === 0)).join('\n        ');
      return `<div class="panel" role="tabpanel" id="panel-${esc(c.id)}" aria-labelledby="tab-${esc(c.id)}" data-panel="${esc(c.id)}"${ci ? ' hidden' : ''}>
        <div class="panel__side">
          ${twoTone(c.title, 'h3')}
          ${rule()}
          <ul class="menu" role="list">
            ${list}
          </ul>
        </div>
        <div class="panel__fichas" data-fichas>
        ${fichas}
        </div>
      </div>`;
    })
    .join('\n      ');
  return `<section class="treat" id="tratamientos" aria-labelledby="tratamientos-titulo">
    ${leaf('eucalipto-arriba', 'leaf--tr')}
    <div class="wrap">
      <header class="head" data-reveal>
        <p class="script">Elegí el tuyo</p>
        <h2 class="title" id="tratamientos-titulo">Tratamientos</h2>
        ${rule()}
        <div class="switch" role="tablist" aria-label="Tipo de tratamiento" data-switch>
          <span class="switch__thumb" aria-hidden="true"></span>
          ${tabs}
        </div>
      </header>
      ${panels}
    </div>
  </section>`;
}

function needs(config) {
  const items = allItems(config);
  const data = [...items.values()].map((it) => ({ id: it.id, cat: it.cat.id, catLabel: it.cat.label, title: it.title.filter(Boolean).join(' '), photo: it.photo, time: it.time, needs: it.needs || [] }));
  return `<section class="needs" id="encontra" aria-labelledby="encontra-titulo">
    ${leaf('espiga-arriba', 'leaf--tl')}
    <div class="wrap">
      <header class="head" data-reveal>
        <p class="script">Encontrá tu tratamiento</p>
        <h2 class="title" id="encontra-titulo">¿Qué querés mejorar?</h2>
        ${rule()}
        <p class="lead">Tocá lo que te gustaría trabajar y te muestro los tratamientos que te pueden ayudar.</p>
      </header>
      <div class="chips" role="group" aria-label="Necesidades" data-needs>
        ${config.needs.map((n, i) => `<button class="chip" type="button" data-need="${esc(n.id)}" aria-pressed="${i === 0}">${esc(n.label)}</button>`).join('\n        ')}
      </div>
      <ul class="results" role="list" data-results aria-live="polite"></ul>
      <script type="application/json" data-needs-data>${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
    </div>
  </section>`;
}

function space(config) {
  const s = config.space;
  return `<section class="space" id="espacio" aria-labelledby="espacio-titulo">
    ${leaf('eucalipto-abajo', 'leaf--bl')}
    <div class="wrap space__in">
      <div class="space__text" data-reveal>
        <p class="script">Terra</p>
        <h2 class="title" id="espacio-titulo">${esc(s.title)}</h2>
        ${rule()}
        ${s.lines.map((l, i) => `<p class="space__line">${esc(l)}</p>${i < s.lines.length - 1 ? rule('rule--small') : ''}`).join('\n        ')}
      </div>
      <div class="arches">
        ${s.photos
          .map(
            (p, i) => `<figure class="arch arch--${i}${p.wide ? ' arch--wide' : ''}" data-arch>
          <div class="arch__frame">
          ${p.wide
            ? `<svg class="arch__curve" viewBox="-16 -16 132 42" aria-hidden="true"><defs><path id="arc-${i}" d="M-6 26 A56 32 0 0 1 106 26"/></defs>`
            : `<svg class="arch__curve" viewBox="-16 -16 132 66" aria-hidden="true"><defs><path id="arc-${i}" d="M-6 50 A56 56 0 0 1 106 50"/></defs>`}<text><textPath href="#arc-${i}" startOffset="50%" text-anchor="middle">${esc(s.title)}</textPath></text></svg>
          <img src="${esc(p.src)}" alt="${esc(p.alt)}" width="${p.width}" height="${p.height}" loading="lazy"></div>
          <span class="arch__star arch__star--l" aria-hidden="true">✦</span><span class="arch__star arch__star--r" aria-hidden="true">✦</span>
        </figure>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>`;
}

function agendaBand(config) {
  const row = config.agenda.map((t) => `<span>${esc(t)}</span><i aria-hidden="true">✦</i>`).join('');
  return `<div class="band" aria-label="${esc(config.agenda.join('. '))}">
    <div class="band__track" data-band aria-hidden="true">${row}${row}${row}${row}</div>
  </div>`;
}

function hours(config) {
  const h = config.hours;
  const p = config.person;
  return `<section class="hours" id="horarios" aria-labelledby="horarios-titulo">
    ${leaf('espiga-abajo', 'leaf--br')}
    ${leaf('eucalipto-arriba', 'leaf--tr leaf--small')}
    <div class="wrap hours__in">
      <div class="hours__agenda" data-reveal>
        <p class="script">Turnos</p>
        <p class="hours__big">${esc(config.agenda[0])}</p>
        ${rule()}
      </div>
      <div class="card" data-reveal>
        <span class="card__clock">${icon('clock')}</span>
        <h2 class="card__title" id="horarios-titulo">${esc(h.title)}</h2>
        <span class="card__line" aria-hidden="true"></span>
        <p class="card__days">${esc(h.days)}</p>
        <p class="card__time">${esc(h.time)}</p>
      </div>
    </div>
  </section>`;
}

export function renderPage(config) {
  const b = config.brand;
  const h = config.hero;
  const book = wa(config);
  return `<!doctype html>
<html lang="${esc(config.site.lang)}">
<head>
${head(config)}
</head>
<body>
<a class="skip" href="#tratamientos">Ir a los tratamientos</a>

<header class="top" data-top>
  <a class="top__brand" href="#inicio" aria-label="${esc(b.logo.alt)}, ir al inicio">
    <img src="${esc(b.logo.src)}" alt="" width="${b.logo.width}" height="${b.logo.height}">
  </a>
  <!-- "Estética Facial y Corporal · Terra" siempre en el centro de la barra -->
  <a class="top__words" href="#inicio" aria-hidden="true" tabindex="-1"><span class="top__script">${esc(b.script)}</span><span class="top__place">${esc(b.place)}</span></a>
  <nav class="top__nav" aria-label="Secciones">
    <a href="#tratamientos">Tratamientos</a>
    <a href="#encontra">Encontrá el tuyo</a>
    <a href="#espacio">Mi espacio</a>
    <a href="#horarios">Horarios</a>
  </nav>
  <a class="btn btn--small" ${linkAttrs(book)} aria-label="Reservar por WhatsApp">${waIcon}<span>Reservar</span></a>
</header>

<main>
  <section class="hero" id="inicio" aria-labelledby="inicio-titulo">
    <div class="hero__satin" aria-hidden="true"></div>
    ${leaf('espiga-arriba', 'leaf--tl')}
    ${leaf('eucalipto-arriba', 'leaf--tr')}
    ${leaf('eucalipto-abajo', 'leaf--bl')}
    ${leaf('espiga-abajo', 'leaf--br')}
    <div class="hero__frame" aria-hidden="true"></div>
    <div class="hero__in">
      <!-- Al bajar, el logo vuela a la barra (arriba a la izquierda) y el texto
           al centro de la barra (main.js) -->
      <div class="logo" data-logo>
        <img src="${esc(b.logo.src)}" alt="${esc(b.logo.alt)}" width="${b.logo.width}" height="${b.logo.height}" fetchpriority="high" data-fly-logo>
      </div>
      <div class="hero__brand">
        <div class="hero__brand-in" data-fly-words>
          <p class="hero__script" data-write>${esc(b.script)}</p>
          <p class="hero__place">${esc(b.place)}</p>
        </div>
      </div>
      <span class="hero__lotus">${icon('lotus')}</span>
      <h1 class="hero__title" id="inicio-titulo"><span>${esc(h.title)}</span><span class="hero__sub">${esc(h.titleSub)}</span></h1>
      <p class="hero__text">${esc(h.text)}</p>
      <div class="hero__ctas">
        <a class="btn btn--solid" data-magnetic ${linkAttrs(book)}>${waIcon}${esc(h.cta)}</a>
        <a class="btn btn--line" data-magnetic href="#tratamientos">${esc(h.secondary)}</a>
      </div>
      <p class="hero__who"><span>${esc(config.person.name)}</span>${esc(config.person.profession)}</p>
    </div>
    <a class="hero__down" href="#tratamientos" aria-label="Bajar a los tratamientos"><span></span></a>
  </section>

  ${agendaBand(config)}

  ${treatments(config)}

  ${needs(config)}

  ${space(config)}

  ${hours(config)}

  <section class="end" id="contacto" aria-labelledby="contacto-titulo">
    <div class="wrap end__in" data-reveal>
      <img class="end__logo" src="${esc(b.logo.src)}" alt="" width="${b.logo.width}" height="${b.logo.height}" loading="lazy">
      <p class="script">${esc(b.script)}</p>
      <h2 class="title" id="contacto-titulo">Reservá tu turno</h2>
      ${rule()}
      <p class="lead">Escribime por WhatsApp y coordinamos el día y el horario de tu tratamiento.</p>
      <a class="btn btn--solid btn--big" data-magnetic ${linkAttrs(book)}>${waIcon}${esc(config.contact.whatsapp.display)}</a>
    </div>
  </section>
</main>

<footer class="foot">
  <p>${esc(config.footer.note)}</p>
  <p class="foot__legal">© <span data-year>${new Date().getFullYear()}</span> ${esc(config.person.name)} · DN Estética Facial y Corporal</p>
</footer>

<a class="wa-float" ${linkAttrs(book)} aria-label="Escribir por WhatsApp">${waIcon}</a>
</body>
</html>
`;
}
