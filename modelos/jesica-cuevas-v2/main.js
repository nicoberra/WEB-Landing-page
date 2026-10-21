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
      // El encabezado no se esconde: ahí queda la foto como logo.
      top.classList.toggle('is-solid', y > 30);
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
      { yPercent: 110, opacity: 0, '--wdth': 62, '--wght': 300 },
      { yPercent: 0, opacity: 1, '--wdth': function (i) { return i === 3 ? 100 : 78; }, '--wght': 900, duration: 1.3, stagger: 0.12, ease: 'expo.out' }, 0)
    .from('[data-blob]', { scale: 0.6, opacity: 0, duration: 1.4, ease: 'expo.out' }, 0.1)
    .from('.hero__text, .hero__ctas, .hero__where, .tag', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out' }, 0.45);
  // Ocultas hasta que entran (si no, los acentos se verían sueltos arriba).
  gsap.set(lines, { yPercent: 110, opacity: 0 });

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
      .to({}, { duration: 0.55 })
      // La tarjeta ocupa toda la pantalla y el logo se agranda.
      .addLabel('abrir')
      .to(loader, { padding: 0, duration: 0.8, ease: 'expo.inOut' }, 'abrir')
      .to('[data-loader-card]', { borderRadius: 0, duration: 0.8, ease: 'expo.inOut' }, 'abrir')
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
  // ---------- La foto vuela al lugar del logo mientras se baja ----------
  // Va desde su lugar en la portada hasta el encabezado, achicándose, con el
  // texto que gira y las hojas. Al volver a subir hace el camino inverso.
  var fly = document.querySelector('[data-fly]');
  var holder = document.querySelector('[data-hero-visual]');
  var slot = document.querySelector('[data-avatar-slot]');
  var slotLogo = document.querySelector('[data-avatar-logo]');
  if (fly && holder && slot) {
    fly.classList.add('is-flying');
    var smooth = function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; };
    var updateFly = function () {
      var h = holder.getBoundingClientRect();
      var s = slot.getBoundingClientRect();
      if (!h.width) return;
      fly.style.width = h.width + 'px';
      fly.style.height = h.height + 'px';
      // Recorrido: más o menos la mitad de la pantalla de scroll.
      var p = Math.min(1, Math.max(0, window.scrollY / Math.max(240, window.innerHeight * 0.55)));
      var e = smooth(p);
      // Tamaño final: el círculo con su texto entra en el lugar del logo.
      var kEnd = (s.width * 0.95) / (h.width * 1.12);
      var k = 1 + (kEnd - 1) * e;
      var endX = s.left + s.width / 2 - (h.width * kEnd) / 2;
      var endY = s.top + s.height / 2 - (h.height * kEnd) / 2;
      // Sale desde donde se ve al principio (sin arrastrarse con el scroll),
      // así nunca se va por arriba de la pantalla en el celular.
      var startY = h.top + window.scrollY;
      var x = h.left + (endX - h.left) * e;
      var y = startY + (endY - startY) * e;
      fly.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) scale(' + k.toFixed(4) + ')';
      // El ícono de la manzana se desvanece justo cuando llega la foto.
      if (slotLogo) slotLogo.style.opacity = String(Math.max(0, Math.min(1, (0.85 - e) / 0.2)));
    };
    updateFly();
    gsap.ticker.add(updateFly);
  }

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
