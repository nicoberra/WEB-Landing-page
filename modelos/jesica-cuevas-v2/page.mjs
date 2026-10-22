// Jesica Cuevas · versión 2: página dinámica con tipografía variable en
// movimiento. Los textos y datos salen de config.mjs (que hereda del modelo
// principal). Las animaciones están en main.js; sin JavaScript o con
// "reducir movimiento" todo se ve igual, quieto y completo.
import { esc, rich, linkAttrs, media, whatsappUrl } from '../../src/helpers.mjs';
import { head } from '../../src/render.mjs';

const leaf = (cls = '') =>
  `<svg class="leaf ${cls}" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 34C6 18 16 6 36 4c-1 19-12 30-30 30Z" fill="currentColor"/><path d="M8 32 28 12" stroke="rgba(255,255,255,.55)" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`;

const icons = {
  instagram: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.1" class="fill"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24"><path d="M4.5 19.5l1.2-3.6A8 8 0 1 1 8.6 18.6Z"/><path d="M9.2 8.6c.3-.6.8-.6 1-.1l.6 1.4c.1.3 0 .6-.2.8l-.4.4c.5 1 1.3 1.8 2.3 2.3l.4-.4c.2-.2.5-.3.8-.2l1.4.6c.5.2.5.7-.1 1-1 .6-2.4.4-3.9-.7a8.6 8.6 0 0 1-2.6-2.9c-.7-1.4-.6-2.4.7-2.2Z" class="fill"/></svg>',
  email: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
};

const arrow = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';

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

  const headHtml = head(config).replace(
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
        <img class="manifesto__cutout" data-cutout src="assets/jesica-recorte.webp" alt="${esc(p.name)}, licenciada en Nutrición" width="900" height="1207" loading="lazy">
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
        ${config.process.steps.map((s, i) => `<li class="step" data-rise><span class="step__n">${i + 1}</span><h3>${esc(s.title)}</h3><p>${rich(s.text)}</p></li>`).join('\n        ')}
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
        <a class="card__cover card__cover--img" ${linkAttrs(it.url)} tabindex="-1" aria-hidden="true"><img src="${esc(it.image)}" alt="" width="720" height="900" loading="lazy"></a>
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
      <h2 class="big-title" id="preguntas-titulo">Preguntas</h2>
      <div class="faq__list">
        ${config.faq.items.map((f) => `<details class="qa" data-rise><summary>${esc(f.q)}<span class="qa__icon" aria-hidden="true"></span></summary><p>${rich(f.a)}</p></details>`).join('\n        ')}
      </div>
    </div>
  </section>

  <section class="contact" id="contacto" aria-labelledby="contacto-titulo">
    <div class="contact__card">
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
