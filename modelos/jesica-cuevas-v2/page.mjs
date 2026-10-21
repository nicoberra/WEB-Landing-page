// Jesica Cuevas · versión 2: página dinámica con tipografía variable en
// movimiento. Los textos y datos salen de config.mjs (que hereda del modelo
// principal). Las animaciones están en main.js; sin JavaScript o con
// "reducir movimiento" todo se ve igual, quieto y completo.
import { esc, rich, linkAttrs, media, whatsappUrl } from '../../src/helpers.mjs';
import { head } from '../../src/render.mjs';

const leaf = (cls = '') =>
  `<svg class="leaf ${cls}" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 34C6 18 16 6 36 4c-1 19-12 30-30 30Z" fill="currentColor"/><path d="M8 32 28 12" stroke="rgba(255,255,255,.55)" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>`;

const arrow = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';

/** Enlace del turnero o, mientras no exista, el contacto provisorio (Instagram). */
function bookingLink(config) {
  const b = config.booking || {};
  if (b.url) return { href: b.url, label: 'Sacar turno' };
  if (b.interim?.url) return { href: b.interim.url, label: `Turnos: ${b.interim.label}` };
  return { href: whatsappUrl(config.contact), label: 'Escribime' };
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
  <div class="loader__strip" data-loader-strip><span>${esc(p.name)}</span></div>
  <div class="loader__card" data-loader-card>
    <img class="loader__logo" data-loader-logo src="${esc(config.logo.full.src)}" alt="" width="${config.logo.full.width}" height="${config.logo.full.height}" fetchpriority="high">
  </div>
</div>
<div class="progress" aria-hidden="true"><span data-progress></span></div>

<header class="top" data-top>
  <a class="top__brand" href="#inicio" aria-label="${esc(p.name)}, ir al inicio">
    <img src="${esc(config.logo.src)}" alt="" width="${config.logo.width}" height="${config.logo.height}">
    <span>${esc(p.name)}</span>
  </a>
  <nav class="top__nav" aria-label="Principal">
    <a href="#planes">Planes</a>
    <a href="#trayectoria">Trayectoria</a>
    <a href="#recetarios">Recetarios</a>
    <a href="#contacto">Contacto</a>
  </nav>
  <a class="btn btn--solid btn--small" data-magnetic ${linkAttrs(book.href)}>${esc(book.label)}</a>
</header>

<main id="contenido" tabindex="-1">

  <section class="hero" id="inicio" aria-labelledby="inicio-titulo">
    <div class="hero__copy">
      <p class="tag"><span class="tag__dot"></span>${esc(p.profession)} · ${esc(p.license)}</p>
      <h1 class="hero__title" id="inicio-titulo">
        ${v.heroLines.map((l, i) => `<span class="hl" data-hl style="--i:${i}"><span class="hl__in">${esc(l)}</span></span>`).join('\n        ')}
      </h1>
      <p class="hero__text">${rich(v.heroText)}</p>
      <div class="hero__ctas">
        <a class="btn btn--solid" data-magnetic ${linkAttrs(book.href)}>${esc(book.label)}${arrow}</a>
        <a class="btn btn--line" data-magnetic href="#planes">Ver planes</a>
      </div>
      <p class="hero__where">${esc(p.location)}</p>
    </div>
    <div class="hero__visual" data-hero-visual>
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
      <p class="sticker" data-sticker>${esc(config.hero.badges?.[1] || 'Especialista en nutrición deportiva')}</p>
    </div>
  </section>

  <section class="trust" aria-label="Formación y matrícula">
    <ul class="trust__list" role="list">
      ${v.trust.map((t) => `<li class="trust__item" data-rise><strong>${esc(t.big)}</strong><span>${esc(t.small)}</span></li>`).join('\n      ')}
    </ul>
  </section>

  <div class="tick-band">
    <div class="tick" role="presentation">
      <p class="visually-hidden">${v.ticker.map(esc).join(', ')}</p>
      <div class="tick__track" data-tick aria-hidden="true"><div class="tick__row">${tick}</div><div class="tick__row">${tick}</div></div>
    </div>
  </div>

  <section class="manifesto" aria-labelledby="manifiesto-titulo">
    <p class="eyebrow">${esc(v.manifestoEyebrow)}</p>
    <h2 class="visually-hidden" id="manifiesto-titulo">${esc(v.manifestoEyebrow)}</h2>
    <p class="manifesto__text" data-words>${esc(v.manifesto)}</p>
    <div class="manifesto__foot">
      ${media({ image: config.about.photo, label: 'FOTO', hint: '', ratio: '4/5', alt: config.about.photo?.alt || p.name, className: 'manifesto__photo' })}
      <div>
        <p class="manifesto__sign">${rich(config.about.title)}</p>
        <p class="manifesto__name">${esc(v.signature)}</p>
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
      <h2 class="big-title" id="pasos-titulo" data-stretch>${esc(v.stepsTitle)}</h2>
      <ol class="steps__list">
        ${config.process.steps.map((s, i) => `<li class="step" data-rise><span class="step__n">${i + 1}</span><h3>${esc(s.title)}</h3><p>${rich(s.text)}</p></li>`).join('\n        ')}
      </ol>
    </div>
  </section>

  <section class="career" id="trayectoria" aria-labelledby="trayectoria-titulo">
    <div class="wrap">
      <p class="eyebrow">${esc(v.careerEyebrow)}</p>
      <h2 class="big-title" id="trayectoria-titulo" data-stretch>${esc(v.careerTitle)}</h2>
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
      <h2 class="big-title" id="recetarios-titulo" data-stretch>${esc(v.productsTitle)}</h2>
      ${config.demo && products.demoNote ? `<p class="note">${esc(products.demoNote)}</p>` : ''}
    </div>
    <ul class="fan" role="list">
      ${products.items
        .map(
          (it, i) => `<li class="card card--${i}" data-card>
        <div class="card__cover">${leaf('card__leaf')}<span>${esc(it.format)}</span></div>
        <h3>${esc(it.title)}</h3>
        <p>${rich(it.description)}</p>
        <div class="card__foot">
          ${it.price ? `<span class="card__price">${esc(it.price)}</span>` : ''}
          <a class="btn btn--solid btn--small" ${linkAttrs(it.href || `https://wa.me/${config.contact.whatsapp.number}?text=${encodeURIComponent(`Hola Jesi! Quiero el recetario "${it.title}".`)}`)}>${esc(it.ctaLabel || 'Lo quiero')}<span class="visually-hidden">: ${esc(it.title)}</span></a>
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
      ${config.booking?.url ? '' : config.booking?.interim ? `<p class="booking__interim">${esc(config.booking.interim.text)}</p>` : ''}
      <a class="btn btn--light" data-magnetic ${linkAttrs(book.href)}>${esc(config.booking?.url ? 'Ver turnos disponibles' : config.booking?.interim?.label || 'Escribime')}${arrow}</a>
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
    <div class="wrap contact__in">
      <h2 class="contact__title" id="contacto-titulo" data-stretch data-stretch-max="100">Hablemos</h2>
      <div class="contact__links">
        <a class="contact__link" data-magnetic ${linkAttrs(wa)}><span>WhatsApp</span><strong>${esc(config.contact.whatsapp.display)}</strong>${arrow}</a>
        <a class="contact__link" data-magnetic ${linkAttrs(config.instagramUrl)}><span>Instagram</span><strong>${esc(config.instagram.handle)}</strong>${arrow}</a>
        ${config.contact.email ? `<a class="contact__link" data-magnetic href="mailto:${esc(config.contact.email)}"><span>Email</span><strong>${esc(config.contact.email)}</strong>${arrow}</a>` : ''}
      </div>
    </div>
  </section>
</main>

<footer class="foot">
  <div class="wrap foot__in">
    <img class="foot__logo" src="${esc(config.logo.full.src)}" alt="${esc(config.logo.full.alt)}" width="${config.logo.full.width}" height="${config.logo.full.height}" loading="lazy">
    <p>${rich(config.footer.note)}</p>
  </div>
  <p class="foot__legal">© <span data-year>${new Date().getFullYear()}</span> ${esc(p.name)}${config.demo ? ` · ${esc(config.footer.demoNotice)}` : ''}</p>
</footer>
</body>
</html>
`;
}
