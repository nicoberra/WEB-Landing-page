// Jesica Cuevas · versión 2: animaciones con GSAP + ScrollTrigger.
// Si GSAP no carga o la persona pidió "reducir movimiento", la página queda
// quieta y completa (los planes se ven en grilla, sin desplazamiento lateral).
(function () {
  'use strict';
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Encabezado y barra de progreso ----------
  var top = document.querySelector('[data-top]');
  var bar = document.querySelector('[data-progress]');
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY, max = root.scrollHeight - window.innerHeight;
    if (bar) bar.style.setProperty('--p', max > 0 ? Math.min(1, y / max) : 0);
    if (top) {
      top.classList.toggle('is-solid', y > 30);
      top.classList.toggle('is-hidden', y > 400 && y > lastY + 2);
      if (y < lastY - 2) top.classList.remove('is-hidden');
    }
    lastY = y;
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  window.__motionReady = true;
  var gsap = window.gsap, ST = window.ScrollTrigger;
  if (!gsap || !ST || reduce) {
    root.classList.remove('motion');
    return;
  }
  gsap.registerPlugin(ST);

  // ---------- Portada: frase gigante (arranca al terminar la apertura) ----------
  var lines = gsap.utils.toArray('[data-hl] .hl__in');
  var heroIn = gsap.timeline({ paused: true });
  heroIn
    .fromTo(lines,
      { yPercent: 110, '--wdth': 62, '--wght': 300 },
      { yPercent: 0, '--wdth': function (i) { return i === 3 ? 100 : 78; }, '--wght': 900, duration: 1.3, stagger: 0.12, ease: 'expo.out' }, 0)
    .from('[data-blob]', { scale: 0.6, opacity: 0, duration: 1.4, ease: 'expo.out' }, 0.1)
    .from('.hero__text, .hero__ctas, .hero__where, .tag', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out' }, 0.45)
    .from('[data-sticker]', { scale: 0, rotation: -40, duration: 0.9, ease: 'back.out(2)' }, 0.9);
  gsap.set(lines, { yPercent: 110 });

  // ---------- Apertura: aparece el logo y la tarjeta se abre ----------
  var loader = document.querySelector('[data-loader]');
  if (loader) {
    root.style.overflow = 'hidden';
    var finish = function () {
      loader.remove();
      root.style.overflow = '';
      heroIn.play();
      ST.refresh();
    };
    var open = gsap.timeline({ onComplete: finish });
    open
      .from('[data-loader-logo]', { scale: 0.7, opacity: 0, filter: 'blur(8px)', duration: 0.8, ease: 'expo.out' })
      .from('[data-loader-strip] span', { yPercent: 120, opacity: 0, duration: 0.7, ease: 'expo.out' }, 0.1)
      .to({}, { duration: 0.55 })
      // La franja se va, la tarjeta ocupa toda la pantalla y el logo se agranda.
      .to('[data-loader-strip]', { xPercent: -100, duration: 0.8, ease: 'expo.inOut' }, 'abrir')
      .to(loader, { padding: 0, gridTemplateColumns: '0px 1fr', duration: 0.8, ease: 'expo.inOut' }, 'abrir')
      .to('[data-loader-card]', { marginLeft: 0, borderRadius: 0, duration: 0.8, ease: 'expo.inOut' }, 'abrir')
      .to('[data-loader-logo]', { scale: 1.6, opacity: 0, duration: 0.7, ease: 'power2.in' }, 'abrir+=0.2')
      .to(loader, { opacity: 0, duration: 0.35 }, '-=0.15');
    // Un clic saltea la apertura.
    loader.addEventListener('click', function () { open.progress(1); });
  } else {
    heroIn.play();
  }

  // Al bajar, las líneas se corren hacia lados opuestos y se ensanchan.
  lines.forEach(function (el, i) {
    gsap.to(el, {
      x: (i % 2 ? -1 : 1) * window.innerWidth * 0.12,
      '--wdth': i === 3 ? 125 : 112,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 },
    });
  });
  gsap.to('[data-hero-visual]', { yPercent: 18, rotation: 6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 } });
  gsap.to('[data-blob] img', { scale: 1.3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.6 } });

  // ---------- Cinta: se mueve sola y acelera con el scroll ----------
  var tick = document.querySelector('[data-tick]');
  if (tick) {
    var tx = 0, speed = 1, dir = -1;
    var tickST = ST.create({ trigger: document.body, start: 'top top', end: 'bottom bottom', onUpdate: function (self) {
      dir = self.direction === 1 ? -1 : 1;
      speed = 1 + Math.min(8, Math.abs(self.getVelocity()) / 300);
    } });
    gsap.ticker.add(function () {
      var half = tick.scrollWidth / 2;
      tx += dir * speed * 1.1;
      speed += (1 - speed) * 0.05;
      if (tx <= -half) tx += half;
      if (tx > 0) tx -= half;
      tick.style.transform = 'translate3d(' + tx + 'px,0,0)';
    });
    void tickST;
  }

  // ---------- Manifiesto: se enciende palabra por palabra ----------
  var mText = document.querySelector('[data-words]');
  if (mText) {
    var words = mText.textContent.trim().split(/\s+/);
    mText.innerHTML = words.map(function (w) { return '<span class="w">' + w.replace(/[&<>]/g, '') + '</span>'; }).join(' ');
    var spans = mText.querySelectorAll('.w');
    ST.create({ trigger: mText, start: 'top 80%', end: 'bottom 45%', scrub: true, onUpdate: function (self) {
      var lit = self.progress * spans.length;
      for (var i = 0; i < spans.length; i++) spans[i].style.setProperty('--o', Math.max(0.14, Math.min(1, lit - i + 1)));
    } });
    spans.forEach(function (s) { s.style.setProperty('--o', 0.14); });
  }

  // ---------- Planes: desplazamiento lateral mientras se baja ----------
  var plans = document.querySelector('[data-plans]');
  var track = document.querySelector('[data-plans-track]');
  if (plans && track) {
    plans.classList.add('is-horizontal');
    var dist = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
    gsap.to(track, {
      x: function () { return -dist(); },
      ease: 'none',
      scrollTrigger: { trigger: plans, start: 'top top', end: function () { return '+=' + dist(); }, scrub: 0.8, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
    });
    gsap.from(track.children, { y: 80, opacity: 0, rotation: 4, stagger: 0.08, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: plans, start: 'top 70%' } });
  }

  // ---------- Títulos que se estiran ----------
  gsap.utils.toArray('[data-stretch]').forEach(function (el) {
    gsap.fromTo(el, { '--wdth': 62 }, { '--wdth': +(el.dataset.stretchMax || 118), ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'bottom 25%', scrub: 0.5 } });
  });

  // ---------- Trayectoria: la línea se dibuja ----------
  var line = document.querySelector('[data-draw]');
  if (line) {
    gsap.fromTo(line, { '--draw': 100 }, { '--draw': 0, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 75%', end: 'bottom 60%', scrub: 0.5 } });
  }
  ST.batch('[data-rise]', {
    start: 'top 88%',
    onEnter: function (els) { gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.07, ease: 'expo.out', overwrite: true }); },
  });

  // ---------- Recetarios: de un mazo a un abanico ----------
  var cards = gsap.utils.toArray('[data-card]');
  if (cards.length) {
    var mid = (cards.length - 1) / 2;
    gsap.fromTo(cards,
      { '--x': function (i) { return (mid - i) * 340 + 'px'; }, '--r': '0deg', '--ty': '120px', opacity: 0.4 },
      { '--x': '0px', '--r': function (i) { return ((i - mid) * 7) + 'deg'; }, '--ty': function (i) { return (i === mid ? -10 : 18) + 'px'; }, opacity: 1, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-fan]', start: 'top 70%', end: 'center 55%', scrub: 0.8 } });
  }

  // ---------- Turnos: el círculo verde crece hasta llenar la pantalla ----------
  var circle = document.querySelector('[data-circle]');
  if (circle) {
    gsap.fromTo(circle, { '--s': 0.02 }, { '--s': 1, ease: 'power2.inOut', scrollTrigger: { trigger: '[data-booking]', start: 'top 85%', end: 'center 55%', scrub: 0.6 } });
    gsap.from('[data-booking] .booking__in > *', { y: 40, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: '[data-booking]', start: 'top 35%' } });
  }

  // ---------- Botones "magnéticos" (solo con mouse) ----------
  if (fine) {
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      var xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      var yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.25);
        yTo((e.clientY - r.top - r.height / 2) * 0.35);
      });
      el.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
    });
  }

  window.addEventListener('load', function () { ST.refresh(); });
})();
