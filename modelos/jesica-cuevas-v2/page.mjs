// Jesica Cuevas · versión 2: página dinámica con tipografía variable en
// movimiento. Los textos y datos salen de config.mjs (que hereda del modelo
// principal). Las animaciones están en main.js; sin JavaScript o con
// "reducir movimiento" todo se ve igual, quieto y completo.
import { esc, rich, linkAttrs, media, whatsappUrl } from '../../src/helpers.mjs';
import { head } from '../../src/render.mjs';
import { existsSync } from 'node:fs';

// Foto que aparece dentro del círculo al pasar el mouse (si está cargada).
const ALT_PHOTO = 'assets/jesica-saco.webp';
const hasAlt = existsSync(new URL('./' + ALT_PHOTO, import.meta.url));
const CONTACT_PHOTO = 'assets/jesica-saco-chica.webp';
const hasContactPhoto = existsSync(new URL('./' + CONTACT_PHOTO, import.meta.url));

const leaf = (cls = '') =>
  `<svg class="leaf ${cls}" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 34C6 18 16 6 36 4c-1 19-12 30-30 30Z" fill="currentColor"/><path d="M8 32 28 12" stroke="rgba(255,255,255,.55)" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`;

const icons = {
  instagram: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" class="fill"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24"><path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.6 18.6Z"/><path d="M9.2 8.6c.3-.6.8-.6 1-.1l.6 1.4c.1.3 0 .6-.2.8l-.4.4c.5 1 1.3 1.8 2.3 2.3l.4-.4c.2-.2.5-.3.8-.2l1.4.6c.5.2.5.7-.1 1-1 .6-2.4.4-3.9-.7a8.6 8.6 0 0 1-2.6-2.9c-.7-1.4-.6-2.4.7-2.2Z" class="fill"/></svg>',
  email: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
};

const arrow = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';

// Dibujitos de línea para las tapas de los recetarios (se repiten en orden)
const bookIcons = [
  // batidor
  '<path d="M12 21v-7"/><path d="M12 14c-4 0-5-6-5-8a5 5 0 0 1 10 0c0 2-1 8-5 8Z"/><path d="M12 14c-2 0-2.5-6-2.5-8M12 14c2 0 2.5-6 2.5-8"/>',
  // pesa
  '<path d="M6 8v8M18 8v8M3.5 10v4M20.5 10v4M6 12h12"/>',
  // vianda
  '<rect x="3.5" y="9" width="17" height="10" rx="3"/><path d="M5 9c0-2 2-3.5 7-3.5S19 7 19 9M12 9v10"/>',
  // calendario
  '<rect x="4" y="5.5" width="16" height="14" rx="3"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4M8 14h2M12 14h2M8 17h2"/>',
  // porción de tarta
  '<path d="M4 18h16L12 5.5Z"/><path d="M4 18c0 1.5 1 2 2 2h12c1 0 2-.5 2-2M9 13.5h1.5M12.5 11h1"/>',
];

/** Tiendita: fachada con toldo, estante con los recetarios y un mostrador
 *  con caja registradora que imprime el pedido (se manda por WhatsApp). */
/** Precio en pesos con puntos de miles: 9900 → "$ 9.900". */
const money = (n) => '$ ' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const forSale = (it) => typeof it.price === 'number' && it.price > 0;

function shopSection(config) {
  const s = config.v2.shop;
  if (!s || !s.items || !s.items.length) return '';
  const first = s.items[0];
  const send = `https://wa.me/${config.contact.whatsapp.number}?text=${encodeURIComponent(s.orderIntro)}`;
  return `<section class="shop" id="tienda" aria-labelledby="tienda-titulo" data-shop data-soon="${esc(s.soonPrice)}" data-intro="${esc(s.orderIntro)}" data-wa="${esc(config.contact.whatsapp.number)}"${s.payments ? ' data-payments' : ''}>
    <div class="shop__awning" data-awning aria-hidden="true"><span></span></div>
    <div class="shop__sign" data-sign aria-hidden="true"><span>${esc(s.sign)}</span></div>
    <div class="wrap shop__in">
      <header class="shop__head">
        <p class="eyebrow">${esc(s.eyebrow)}</p>
        <h2 class="big-title shop__title" id="tienda-titulo">${esc(s.title)}</h2>
        <p class="shop__intro">${esc(s.intro)}</p>
      </header>
      <div class="shop__grid">
        <ul class="shelf" role="list" data-shelf>
          ${s.items
            .map(
              (it, i) => `<li class="shelf__item shelf__item--${i % 5}" data-book data-id="${esc(it.id)}" data-title="${esc(it.title)}" data-text="${esc(it.description)}" data-format="${esc(it.format)}" data-price="${forSale(it) ? it.price : ''}" data-price-label="${forSale(it) ? money(it.price) : ''}">
            <button class="book" type="button" data-pick aria-pressed="${i === 0}" aria-label="Ver ${esc(it.title)}">
              <span class="book__cover">
                <span class="book__label">Recetario</span>
                <span class="book__title">${esc(it.title)}</span>
                <svg class="book__icon" viewBox="0 0 24 24" aria-hidden="true">${bookIcons[i % bookIcons.length]}</svg>
                <span class="book__brand">Jesica Cuevas</span>
              </span>
            </button>
            <span class="pricetag" aria-hidden="true">${forSale(it) ? money(it.price) : 'Pronto'}</span>
          </li>`
            )
            .join('\n          ')}
        </ul>
        <aside class="counter" aria-label="Mostrador">
          <div class="counter__preview" data-preview aria-live="polite">
            <p class="counter__kicker" data-p-format>${esc(first.format)}</p>
            <h3 class="counter__title" data-p-title>${esc(first.title)}</h3>
            <p class="counter__text" data-p-text>${esc(first.description)}</p>
            <div class="counter__row">
              <span class="counter__price" data-p-price>${forSale(first) ? money(first.price) : esc(s.soonPrice)}</span>
              <button class="counter__add" type="button" data-add>Agregar al pedido</button>
            </div>
          </div>
          <div class="register" data-register>
            <div class="register__top">
              <span class="register__screen"><b data-count>0</b> en tu pedido</span>
              <span class="register__keys" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
            </div>
            <div class="ticket" data-ticket>
              <p class="ticket__head">Tu pedido</p>
              <ol class="ticket__list" data-ticket-list></ol>
              <p class="ticket__empty" data-ticket-empty>Elegí un recetario del estante y sumalo acá.</p>
              <p class="ticket__total"><span>Total</span><strong data-ticket-total>—</strong></p>
              ${s.payments ? `<div class="ticket__pay" data-pay-box>
                <label class="ticket__mail"><span>Tu mail: ahí te llegan los recetarios</span><input type="email" name="email" data-mail autocomplete="email" inputmode="email" placeholder="tu@mail.com" required></label>
                <button class="ticket__send ticket__send--mp" type="button" data-pay>Pagar con Mercado Pago${arrow}</button>
                <p class="ticket__msg" data-pay-msg role="status" aria-live="polite"></p>
              </div>
              <a class="ticket__alt" data-send ${linkAttrs(send)}>¿Dudas? Escribime por WhatsApp</a>` : `<a class="ticket__send" data-send ${linkAttrs(send)}>Pedir por WhatsApp${arrow}</a>`}
            </div>
          </div>
          ${s.payments ? '<a class="shop__mine" href="mis-recetarios.html">¿Ya compraste? Descargá tus recetarios</a>' : ''}
        </aside>
      </div>
    </div>
  </section>`;
}

// Letras pagas de la marca. Se usan si están instaladas en la compu de quien
// mira o si se suben sus archivos (con licencia para web) a assets/fonts/ con
// estos nombres. Si no, styles.css usa Instrument Serif y Caveat.
const BRAND_FONTS = [
  { family: 'Times New Roman MT Condensed', local: ['Times New Roman MT Condensed', 'TimesNewRomanMTCondensed', 'Times New Roman Condensed'], file: 'assets/fonts/times-new-roman-mt-condensed.woff2' },
  { family: 'Biro Script Plus', local: ['Biro Script Plus', 'BiroScriptPlus', 'Biro Script plus'], file: 'assets/fonts/biro-script-plus.woff2' },
];
function brandFonts() {
  const rules = BRAND_FONTS.map((f) => {
    const src = f.local.map((n) => `local('${n}')`);
    if (existsSync(new URL('./' + f.file, import.meta.url))) src.push(`url('${f.file}') format('woff2')`);
    return `@font-face{font-family:'${f.family}';src:${src.join(',')};font-display:swap}`;
  });
  return `<style>${rules.join('')}</style>`;
}

/** Turnos: por ahora todos llevan al WhatsApp de contacto (no hay turnero). */
function bookingLink(config) {
  const b = config.booking || {};
  // PENDIENTE: si más adelante hay turnero propio, se carga en booking.url.
  if (b.url) return { href: b.url, label: 'Turnos' };
  return { href: whatsappUrl(config.contact), label: 'Turnos' };
}

export function renderPage(config) {
  const v = config.v2;
  const p = config.person;
  const book = bookingLink(config);
  const wa = whatsappUrl(config.contact);
  const plans = config.services.items;
  const cred = config.credentials;
  const products = config.products;
  const tick = v.ticker.map((t) => `<span>${esc(t)}</span>${leaf('tick__leaf')}`).join('');

  const headHtml = head(config).replace('<link rel="stylesheet" href="styles.css">', `${brandFonts()}\n<link rel="stylesheet" href="styles.css">`).replace(
    '<script src="main.js" defer></script>',
    `<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js" defer></script>
<script src="main.js" defer></script>`
  );

  return `<!doctype html>
<html lang="${esc(config.site.lang)}">
<head>
${headHtml}
</head>
<body>
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<div class="loader" data-loader aria-hidden="true">
  <div class="loader__card" data-loader-card>
    <img class="loader__logo" data-loader-logo src="${esc(config.logo.full.src)}" alt="" width="${config.logo.full.width}" height="${config.logo.full.height}" fetchpriority="high">
  </div>
</div>
<div class="progress" aria-hidden="true"><span data-progress></span></div>

<header class="top" data-top>
  <svg class="top__line" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
    <filter id="fibron"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="3"/><feDisplacementMap in="SourceGraphic" scale="2.2"/></filter>
    <path pathLength="1" filter="url(#fibron)" d="M0 86C110 74 230 99 350 88S590 72 720 84 950 96 1080 87 1330 74 1440 84"/>
  </svg>
  <a class="top__brand" href="#inicio" aria-label="${esc(p.name)}, ir al inicio">
    <span class="top__slot" data-avatar-slot><img src="${esc(config.logo.src)}" alt="" width="${config.logo.width}" height="${config.logo.height}" data-avatar-logo></span>
    <span class="top__name">${esc(p.name)}</span>
  </a>
  <!-- Lugar de la matrícula: al bajar, la etiqueta de la portada sube hasta acá (main.js) -->
  <span class="top__tag" data-tag-slot></span>
  <!-- Celular: fila fija del menú debajo de la barra (aparece cuando los
       botones de la portada llegan arriba; se va cuando pasa la cinta) -->
  <nav class="top__menu" aria-label="Secciones" data-top-menu>
    <a href="#planes">Planes</a>
    <a href="#trayectoria">Trayectoria</a>
    <a href="#recetarios">Recetarios</a>
    <a href="#contacto">Contacto</a>
  </nav>
  <div class="top__cta">
    <a class="top__icon" ${linkAttrs(config.instagramUrl)} aria-label="Instagram de ${esc(p.name)}"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" class="fill"/></svg></a>
    <a class="top__icon" ${linkAttrs(whatsappUrl(config.contact))} aria-label="WhatsApp de ${esc(p.name)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.6 18.6Z"/><path d="M9.2 8.6c.3-.6.8-.6 1-.1l.6 1.4c.1.3 0 .6-.2.8l-.4.4c.5 1 1.3 1.8 2.3 2.3l.4-.4c.2-.2.5-.3.8-.2l1.4.6c.5.2.5.7-.1 1-1 .6-2.4.4-3.9-.7a8.6 8.6 0 0 1-2.6-2.9c-.7-1.4-.6-2.4.7-2.2Z" class="fill"/></svg></a>
    <a class="btn btn--solid btn--small" data-magnetic ${linkAttrs(book.href)}>${esc(book.label)}</a>
  </div>
</header>

<!-- Columna que se despliega debajo de la foto (arriba a la izquierda) al
     bajar, en pantallas anchas; ver main.js. -->
<aside class="rail" data-rail aria-label="Formación y matrícula">
  <ul class="rail__list" role="list">
    ${v.trust.map((t) => `<li class="rail__item"><strong>${esc(t.big)}</strong><span>${esc(t.small)}</span></li>`).join('\n    ')}
  </ul>
</aside>

<main id="contenido" tabindex="-1">

  <section class="hero" id="inicio" aria-labelledby="inicio-titulo">
    <div class="hero__bg" aria-hidden="true">
      <svg class="blob-wave" viewBox="0 0 800 560"><path d="M0 92C96 30 214 18 300 70c92 56 118 170 196 252 70 74 186 96 268 126 22 8 36 22 36 40V560H0Z"/></svg>
      <svg class="blob-stone" viewBox="0 0 500 500"><path d="M120 0h380v430c-40 50-120 70-176 36-70-42-60-140-130-190C130 236 40 250 12 196-18 136 50 56 120 0Z"/></svg>
      <svg class="blob-sage" viewBox="0 0 200 200"><path d="M150 20c34 24 52 74 36 116s-64 66-108 56S2 140 6 96 46 14 86 6s40-10 64 14Z"/></svg>
    </div>
    <!-- Cinta que se mueve: cruza la portada en diagonal, por detrás del texto -->
    <div class="tick-band">
      <div class="tick" role="presentation">
        <p class="visually-hidden">${v.ticker.map(esc).join(', ')}</p>
        <div class="tick__track" data-tick aria-hidden="true"><div class="tick__row">${tick}</div><div class="tick__row">${tick}</div></div>
      </div>
    </div>
    <div class="hero__copy">
      <p class="tag" data-tag><span class="tag__dot"></span>${esc(p.profession)} · ${esc(p.license)}</p>
      <!-- Menú: arranca en burbujas alrededor de la foto y al bajar se alinea acá (main.js) -->
      <nav class="hero__nav" aria-label="Principal" data-hero-nav>
        <a href="#planes">Planes</a>
        <a href="#trayectoria">Trayectoria</a>
        <a href="#recetarios">Recetarios</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <h1 class="hero__title" id="inicio-titulo">
        ${v.heroLines.map((l, i) => `<span class="hl" data-hl style="--i:${i}"><span class="hl__in">${esc(l)}</span></span>`).join('\n        ')}
      </h1>
      <p class="hero__text">${rich(v.heroText)}</p>
      <div class="hero__ctas">
        <a class="btn btn--solid" data-magnetic ${linkAttrs(book.href)}>${esc(v.heroCta)}${arrow}</a>
        <a class="btn btn--line" data-magnetic href="#planes">Ver planes</a>
      </div>
      <p class="hero__where">${esc(p.location)}</p>
    </div>
    <!-- El hueco (hero__visual) guarda el lugar; al bajar, "hero__fly" vuela
         achicándose hasta el lugar del logo en el encabezado (ver main.js). -->
    <div class="hero__visual" data-hero-visual>
      <div class="hero__fly" data-fly>
        <svg class="ring" viewBox="0 0 400 400" aria-hidden="true">
          <defs><path id="ring-path" d="M200,200 m-170,0 a170,170 0 1,1 340,0 a170,170 0 1,1 -340,0"/></defs>
          <text><textPath href="#ring-path" textLength="1060" lengthAdjust="spacing">${esc(v.ring)}</textPath></text>
        </svg>
        <div class="blob" data-blob>
          <img src="${esc(p.photo.src)}" alt="${esc(p.photo.alt)}" width="${p.photo.width}" height="${p.photo.height}" style="object-position:${esc(p.photo.position || '50% 30%')}" fetchpriority="high">
        </div>
        ${leaf('float float--1')}
        ${leaf('float float--2')}
        ${leaf('float float--3')}
      </div>
    </div>
  </section>

  <section class="manifesto" aria-labelledby="manifiesto-titulo">
    <div class="manifesto__grid">
      <!-- Jesi recortada, parada sobre un arco verde; la cabeza sobresale del arco.
           Con el scroll: el arco crece, ella sube y el sello gira (main.js). -->
      <figure class="manifesto__figure" data-figure>
        <div class="manifesto__arch" data-arch aria-hidden="true"></div>
        ${hasAlt ? `<!-- Tarjeta para rascar: abajo está la foto con saco blanco; al rascar
             (mouse o dedo) se va borrando de a partes la foto de arriba (main.js) -->
        <div class="manifesto__people" data-cutout data-scratch>
          <img class="manifesto__cutout manifesto__cutout--alt" src="${ALT_PHOTO}" alt="" width="900" height="1207" aria-hidden="true">
          <img class="manifesto__cutout" data-scratch-top src="assets/jesica-recorte.webp" alt="${esc(p.name)}, licenciada en Nutrición" width="900" height="1207">
        </div>` : `<img class="manifesto__cutout" data-cutout src="assets/jesica-recorte.webp" alt="${esc(p.name)}, licenciada en Nutrición" width="900" height="1207" loading="lazy">`}
        <svg class="manifesto__badge" data-badge viewBox="0 0 200 200" aria-hidden="true">
          <defs><path id="badge-path" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"/></defs>
          <circle cx="100" cy="100" r="98" class="manifesto__badge-bg"/>
          <text><textPath href="#badge-path" textLength="462" lengthAdjust="spacing">${esc(`Lic. en Nutrición ✦ ${p.license} ✦ `)}</textPath></text>
        </svg>
        ${leaf('manifesto__leaf manifesto__leaf--1')}
        ${leaf('manifesto__leaf manifesto__leaf--2')}
      </figure>
      <div class="manifesto__copy">
        <p class="eyebrow">${esc(v.manifestoEyebrow)}</p>
        <h2 class="visually-hidden" id="manifiesto-titulo">${esc(v.manifestoEyebrow)}</h2>
        <p class="manifesto__text" data-words>${esc(v.manifesto)}</p>
        <div class="manifesto__foot">
          <p class="manifesto__sign">${rich(config.about.title)}</p>
          <p class="manifesto__name">${esc(v.signature)}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="plans" id="planes" aria-labelledby="planes-titulo" data-plans>
    <div class="plans__head">
      <p class="eyebrow">${esc(v.plansEyebrow)}</p>
      <h2 id="planes-titulo">${esc(v.plansTitle)}</h2>
    </div>
    <div class="plans__viewport">
      <ol class="plans__track" data-plans-track>
        ${plans
          .map(
            (pl, i) => `<li class="plan plan--${i % 3}">
          <span class="plan__n">${String(i + 1).padStart(2, '0')}</span>
          <h3>${esc(pl.title)}</h3>
          <p>${rich(pl.description)}</p>
          <a class="plan__link" ${linkAttrs(`https://wa.me/${config.contact.whatsapp.number}?text=${encodeURIComponent(`Hola Jesi! Quiero consultar por ${pl.title.toLowerCase()}.`)}`)}>Consultar${arrow}<span class="visually-hidden"> por ${esc(pl.title)}</span></a>
        </li>`
          )
          .join('\n        ')}
      </ol>
    </div>
  </section>

  <section class="steps" aria-labelledby="pasos-titulo">
    <div class="wrap">
      <p class="eyebrow">${esc(v.stepsEyebrow)}</p>
      <h2 class="big-title" id="pasos-titulo" data-rise-words>${esc(v.stepsTitle)}</h2>
      <ol class="steps__list">
        ${config.process.steps.map((s, i) => `<li class="step" data-step><span class="step__n">${i + 1}</span><h3>${esc(s.title)}</h3><p>${rich(s.text)}</p></li>`).join('\n        ')}
      </ol>
    </div>
  </section>

  <section class="career" id="trayectoria" aria-labelledby="trayectoria-titulo">
    <div class="wrap">
      <p class="eyebrow">${esc(v.careerEyebrow)}</p>
      <h2 class="big-title" id="trayectoria-titulo" data-rise-words>${esc(v.careerTitle)}</h2>
      <div class="career__grid">
        <div class="career__exp">
          <h3 class="career__label">${esc(cred.experienceTitle || 'Experiencia')}</h3>
          ${(cred.experience || [])
            .map((e) => `<article class="exp" data-rise><h4>${esc(e.title)}</h4><p class="exp__place">${esc(e.place)}</p><p>${rich(e.detail)}</p></article>`)
            .join('\n          ')}
        </div>
        <div class="career__edu">
          <h3 class="career__label">${esc(cred.educationTitle || 'Formación')}</h3>
          <div class="timeline">
            <svg class="timeline__line" viewBox="0 0 4 100" preserveAspectRatio="none" aria-hidden="true"><line x1="2" y1="0" x2="2" y2="100" data-draw/></svg>
            <ul role="list">
              ${cred.education
                .map(
                  (e) => `<li class="edu" data-rise><span class="edu__dot" aria-hidden="true"></span><span class="edu__title">${esc(e.title)}${e.status ? ` <em class="edu__status">${esc(e.status)}</em>` : ''}</span><span class="edu__detail">${esc(e.detail)}</span></li>`
                )
                .join('\n              ')}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="recipes" id="recetarios" aria-labelledby="recetarios-titulo" data-fan>
    <div class="wrap recipes__head">
      <p class="eyebrow">${esc(v.productsEyebrow)}</p>
      <h2 class="big-title recipes__title" id="recetarios-titulo" data-gather>${esc(v.productsTitle)}</h2>
    </div>
    <ul class="fan" role="list">
      ${(v.posts || [])
        .map(
          (it, i) => `<li class="card card--${i} card--post" data-card>
        <div class="slides" data-slides aria-roledescription="carrusel" aria-label="${esc(it.title)}">
          <div class="slides__track" data-slides-track tabindex="0">
            ${it.images.map((src, k) => `<img src="${esc(src)}" alt="${esc(it.title)}: imagen ${k + 1} de ${it.images.length}" width="640" height="800" loading="lazy">`).join('')}
          </div>
          <button class="slides__btn slides__btn--prev" type="button" data-slides-prev aria-label="Imagen anterior"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
          <button class="slides__btn slides__btn--next" type="button" data-slides-next aria-label="Imagen siguiente"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
          <div class="slides__dots" aria-hidden="true">${it.images.map(() => '<i></i>').join('')}</div>
        </div>
        <h3>${esc(it.title)}</h3>
        <p>${esc(it.summary)}</p>
        <div class="card__foot">
          <a class="card__link" ${linkAttrs(it.url)}>Ver en Instagram${arrow}<span class="visually-hidden">: ${esc(it.title)}</span></a>
        </div>
      </li>`
        )
        .join('\n      ')}
    </ul>
  </section>

  ${shopSection(config)}

  <section class="booking" id="turnos" aria-labelledby="turnos-titulo" data-booking>
    <div class="booking__circle" data-circle aria-hidden="true"></div>
    <div class="booking__in">
      <p class="eyebrow eyebrow--light">Turnos</p>
      <h2 id="turnos-titulo" data-stretch>${esc(v.bookingTitle)}</h2>
      <p>${rich(v.bookingText)}</p>
      <a class="btn btn--light" data-magnetic ${linkAttrs(book.href)}>${esc(book.label)}${arrow}</a>
    </div>
  </section>

  <section class="faq" id="preguntas" aria-labelledby="preguntas-titulo">
    <div class="wrap faq__grid">
      <div class="faq__intro">
        <p class="eyebrow">Preguntas frecuentes</p>
        <h2 class="big-title" id="preguntas-titulo">¿Tenés dudas?</h2>
        <p class="faq__text">Estas son las más comunes antes de la primera consulta. Tocá una y te respondo.</p>
        <a class="btn btn--solid faq__wa" data-magnetic ${linkAttrs(wa)}>¿Otra duda? Escribime${arrow}</a>
      </div>
      <!-- Como un chat: la pregunta es un globito tuyo y la respuesta, uno de Jesi -->
      <div class="chat">
        ${config.faq.items
          .map(
            (f) => `<details class="chat__qa" data-chat>
          <summary class="chat__q">${esc(f.q)}<span class="chat__plus" aria-hidden="true"></span></summary>
          <div class="chat__a">
            <img class="chat__avatar" src="${esc(p.photo.src)}" alt="" width="40" height="40" loading="lazy">
            <p class="chat__bubble">${rich(f.a)}</p>
          </div>
        </details>`
          )
          .join('\n        ')}
      </div>
    </div>
  </section>

  <section class="contact" id="contacto" aria-labelledby="contacto-titulo">
    <div class="contact__card${hasContactPhoto ? ' has-photo' : ''}">
      ${hasContactPhoto ? `<img class="contact__photo" src="${CONTACT_PHOTO}" alt="" width="560" height="747" loading="lazy" aria-hidden="true">` : ''}
      <div class="contact__intro">
        <p class="eyebrow">Contacto</p>
        <h2 class="contact__title" id="contacto-titulo">Hablemos</h2>
        <p class="contact__text">${esc(v.contactText)}</p>
      </div>
      <div class="contact__links">
        <a class="contact__link" data-magnetic ${linkAttrs(wa)}><i class="contact__icon" aria-hidden="true">${icons.whatsapp}</i><span>WhatsApp</span><strong>${esc(config.contact.whatsapp.display)}</strong></a>
        <a class="contact__link" data-magnetic ${linkAttrs(config.instagramUrl)}><i class="contact__icon" aria-hidden="true">${icons.instagram}</i><span>Instagram</span><strong>${esc(config.instagram.handle)}</strong></a>
        ${config.contact.email ? `<a class="contact__link" data-magnetic href="mailto:${esc(config.contact.email)}"><i class="contact__icon" aria-hidden="true">${icons.email}</i><span>Email</span><strong>${esc(config.contact.email)}</strong></a>` : ''}
      </div>
    </div>
  </section>
</main>

<footer class="foot">
  <div class="wrap foot__in">
    <img class="foot__logo" src="${esc(config.logo.full.src)}" alt="${esc(config.logo.full.alt)}" width="${config.logo.full.width}" height="${config.logo.full.height}" loading="lazy">
    <p>${rich(config.footer.note)}</p>
  </div>
  <p class="foot__legal">© <span data-year>${new Date().getFullYear()}</span> ${esc(p.name)}</p>
</footer>
</body>
</html>
`;
}

/** Archivos extra del sitio (los escribe scripts/build.mjs junto a index.html):
 *  - tienda.json: catálogo público (id, título y precio) que leen las funciones
 *    de /api para cobrar siempre el precio correcto.
 *  - mis-recetarios.html: página a la que vuelve la persona después de pagar
 *    (descarga) y donde puede pedir de nuevo sus recetarios con su mail. */
export function extraFiles(config) {
  const s = config.v2 && config.v2.shop;
  if (!s || !s.payments) return {};
  const c = config.colors.light;
  const catalog = s.items.map((it) => ({ id: it.id, title: it.title, price: forSale(it) ? it.price : null }));
  const page = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mis recetarios · ${esc(config.person.name)}</title>
<meta name="robots" content="noindex">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${esc(config.fonts.googleFontsUrl)}">
<style>
  :root { --bg: ${c.bg}; --surface: ${c.surface}; --ink: ${c.ink}; --muted: ${c.muted}; --line: ${c.line}; --accent: ${c.accent}; --apple: ${c.highlight}; --paper: #FFFDF7; }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; background: radial-gradient(70% 50% at 80% 0%, #DCE3D2, transparent 70%), var(--bg); color: var(--ink); font: 400 16px/1.6 'Figtree', system-ui, sans-serif; display: grid; place-items: start center; padding: 32px 16px 64px; }
  main { width: 100%; max-width: 520px; }
  .back { display: inline-flex; align-items: center; gap: 10px; color: var(--ink); text-decoration: none; font-weight: 600; margin-bottom: 28px; }
  .back img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
  h1 { margin: 0 0 10px; font: 800 clamp(34px, 9vw, 52px)/0.95 'Archivo', system-ui, sans-serif; font-variation-settings: 'wdth' 85; text-transform: uppercase; letter-spacing: -0.02em; }
  p { margin: 0 0 18px; color: var(--muted); }
  .card { margin-top: 24px; padding: 24px 20px 30px; background: var(--paper); box-shadow: 0 18px 30px -20px rgb(31 45 37 / .6); font-family: ui-monospace, Menlo, monospace; font-size: 14px;
    -webkit-mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 14px 100%; mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50% / 14px 100%; }
  .card h2 { margin: 0 0 12px; padding-bottom: 10px; border-bottom: 1.5px dashed #9aa59c; text-align: center; font-size: 14px; letter-spacing: .24em; text-transform: uppercase; }
  label { display: grid; gap: 6px; font-weight: 600; }
  input { width: 100%; padding: 12px 14px; border: 1.5px solid var(--line); border-radius: 12px; background: #fff; font: inherit; color: var(--ink); }
  input:focus { outline: 3px solid color-mix(in srgb, var(--apple) 50%, transparent); border-color: var(--accent); }
  .btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; margin-top: 14px; padding: 14px 18px; border: 0; border-radius: 999px; background: var(--apple); color: var(--ink); font: 700 13px/1 'Archivo', system-ui, sans-serif; letter-spacing: .1em; text-transform: uppercase; text-decoration: none; cursor: pointer; }
  .btn--dark { background: var(--accent); color: var(--paper); }
  .btn[disabled] { opacity: .5; cursor: wait; }
  ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; }
  .msg { margin: 14px 0 0; font-family: 'Figtree', system-ui, sans-serif; color: var(--ink); }
  .small { font-size: 13px; }
  .small a { color: var(--accent); font-weight: 600; }
</style>
</head>
<body>
<main>
  <a class="back" href="./#tienda"><img src="${esc(config.person.photo.src)}" alt="" width="44" height="44">Volver a la tienda</a>
  <h1 data-title>Mis recetarios</h1>
  <p data-lead>Poné el mail con el que compraste y te mandamos un link para descargar todos tus recetarios, las veces que quieras.</p>

  <section class="card" data-result hidden>
    <h2>Tu compra</h2>
    <p class="msg" data-result-msg></p>
    <ul data-files></ul>
  </section>

  <form class="card" data-form>
    <h2>Descargar de nuevo</h2>
    <label>Tu mail<input type="email" name="email" required autocomplete="email" inputmode="email" placeholder="tu@mail.com"></label>
    <button class="btn" type="submit">Mandarme el link</button>
    <p class="msg" data-form-msg role="status" aria-live="polite"></p>
  </form>
  <p class="small">¿Problemas con tu compra? <a href="https://wa.me/${esc(config.contact.whatsapp.number)}">Escribime por WhatsApp</a>.</p>
</main>
<script>
(function () {
  var qs = new URLSearchParams(location.search);
  var $ = function (s) { return document.querySelector(s); };
  var result = $('[data-result]'), resMsg = $('[data-result-msg]'), files = $('[data-files]');
  var form = $('[data-form]'), formMsg = $('[data-form-msg]');
  // Vuelta desde Mercado Pago: ?payment_id=...&status=...&external_reference=...
  var pay = qs.get('payment_id') || qs.get('collection_id');
  var status = qs.get('status') || qs.get('collection_status');
  if (status === 'rejected' || status === 'null') {
    result.hidden = false;
    resMsg.textContent = 'El pago no se completó. Podés volver a la tienda e intentarlo de nuevo.';
  } else if (pay && qs.get('external_reference')) {
    result.hidden = false;
    $('[data-title]').textContent = '¡Gracias por tu compra!';
    $('[data-lead]').textContent = 'También te mandamos los links por mail. Si no lo ves, revisá en spam o promociones.';
    resMsg.textContent = 'Buscando tu compra…';
    fetch('/api/pago?payment_id=' + encodeURIComponent(pay) + '&external_reference=' + encodeURIComponent(qs.get('external_reference')))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d.status === 'approved' && d.files && d.files.length) {
          resMsg.textContent = 'Listo, ya podés descargarlos:';
          d.files.forEach(function (f) {
            var li = document.createElement('li'), a = document.createElement('a');
            a.className = 'btn btn--dark'; a.href = f.url; a.textContent = 'Descargar ' + f.title;
            li.appendChild(a); files.appendChild(li);
          });
        } else if (d.status === 'pending' || d.status === 'in_process') {
          resMsg.textContent = 'Tu pago está en proceso. Cuando se acredite te llega un mail con los links de descarga.';
        } else {
          resMsg.textContent = d.error || 'No pudimos encontrar tu compra. Si ya pagaste, escribime por WhatsApp.';
        }
      })
      .catch(function () { resMsg.textContent = 'No pudimos cargar tu compra. Probá de nuevo en un rato o escribime por WhatsApp.'; });
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button'), email = form.email.value.trim();
    btn.disabled = true; formMsg.textContent = 'Enviando…';
    fetch('/api/mis-recetarios', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email }) })
      .then(function (r) { return r.json(); })
      .then(function (d) { formMsg.textContent = d.message || d.error || 'Listo.'; })
      .catch(function () { formMsg.textContent = 'No pudimos enviarlo. Probá de nuevo en un rato.'; })
      .then(function () { btn.disabled = false; });
  });
})();
</script>
</body>
</html>
`;
  return { 'tienda.json': JSON.stringify({ items: catalog }, null, 2) + '\n', 'mis-recetarios.html': page };
}
