// Jesica Cuevas · versión 2: animaciones con GSAP + ScrollTrigger.
// Si GSAP no carga o la persona pidió "reducir movimiento", la página queda
// quieta y completa (los planes se ven en grilla, sin desplazamiento lateral).
(function () {
  'use strict';
  var root = document.documentElement;

  // ---------- Seguro: si algo falla, la página se ve igual ----------
  // Saca la apertura y deja todo quieto y visible (como sin animaciones).
  var rescued = false;
  function rescue() {
    if (rescued) return;
    rescued = true;
    var l = document.querySelector('[data-loader]');
    if (l) l.remove();
    root.style.overflow = '';
    root.classList.remove('motion');
    if (window.gsap) { try { window.gsap.ticker.lagSmoothing(0); window.gsap.globalTimeline.clear(); } catch (e) {} }
    if (window.ScrollTrigger) { try { window.ScrollTrigger.getAll().forEach(function (t) { t.kill(true); }); } catch (e) {} }
    var sel = '.is-bubbles, .is-flying, .is-horizontal';
    [].forEach.call(document.querySelectorAll(sel), function (el) { el.classList.remove('is-bubbles', 'is-flying', 'is-horizontal'); });
    [].forEach.call(document.querySelectorAll('[style]'), function (el) {
      if (el.closest('.hero, .top, .plans')) { el.style.transform = ''; el.style.opacity = ''; el.style.removeProperty('--wght'); el.style.removeProperty('--wdth'); }
    });
  }
  window.addEventListener('error', rescue);
  // La apertura nunca dura más de unos segundos, pase lo que pase.
  setTimeout(function () { if (document.querySelector('[data-loader]')) rescue(); }, 6000);
  // Dentro de otra página, el alto de "pantalla" no puede crecer con el contenido.
  if (window.self !== window.top) root.style.setProperty('--screen', Math.min(window.innerHeight, window.screen.height || window.innerHeight) + 'px');
  try {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ---------- Enlaces internos (menú, burbujas, "Ver planes") ----------
  // Se desplaza con scrollIntoView: funciona también cuando la página se ve
  // dentro de otra (ahí el salto común con "#" no mueve nada).
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest && ev.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    var dest = document.getElementById(a.getAttribute('href').slice(1));
    if (!dest) return;
    ev.preventDefault();
    var go = dest.id === 'inicio' ? document.body : dest;
    go.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  });

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Parte visible de la página ----------
  // Normalmente es la ventana. Pero algunas vistas previas (por ejemplo, la
  // app en el celular) muestran la página entera estirada dentro de otra y la
  // desplazan desde afuera: ahí "fixed" no queda pegado a la pantalla. Para
  // ese caso se mide qué franja se ve con IntersectionObserver.
  var started = false;
  var view = { top: window.scrollY, h: window.innerHeight, off: 0, framed: false };
  var framedCheck = window.self !== window.top && 'IntersectionObserver' in window;
  if (framedCheck) {
    var STEP = 30;
    var seen = new Map();
    var layer = document.createElement('div');
    layer.setAttribute('aria-hidden', 'true');
    layer.style.cssText = 'position:absolute;left:0;top:0;width:1px;height:0;opacity:0;pointer-events:none;';
    document.body.appendChild(layer);
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) seen.set(e.target, e.intersectionRect); else seen.delete(e.target);
      });
      var a = Infinity, b = -Infinity;
      seen.forEach(function (r) { a = Math.min(a, r.top); b = Math.max(b, r.bottom); });
      if (a === Infinity) return;
      // Si se ve menos que la ventana, la página está estirada y se desplaza desde afuera.
      view.framed = a > 2 || b - a < window.innerHeight - 4;
      view.vis = { a: a, b: b };
      measure();
      if (!started && typeof ready === 'function') { started = true; ready(); }
    }, { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] });
    var built = 0;
    var build = function () {
      var hgt = root.scrollHeight;
      if (Math.abs(hgt - built) < STEP) return;
      built = hgt;
      io.disconnect(); seen.clear(); layer.textContent = '';
      for (var y = 0; y < hgt; y += STEP) {
        var d = document.createElement('div');
        d.style.cssText = 'position:absolute;left:0;width:1px;height:' + STEP + 'px;top:' + y + 'px';
        layer.appendChild(d); io.observe(d);
      }
    };
    build();
    if ('ResizeObserver' in window) new ResizeObserver(build).observe(document.body);
  }
  function measure() {
    var y = window.scrollY;
    if (view.framed && view.vis) {
      view.top = y + view.vis.a;
      view.h = view.vis.b - view.vis.a;
      view.off = view.vis.a;
      root.style.setProperty('--screen', Math.round(view.h) + 'px');
    } else {
      view.top = y; view.h = window.innerHeight; view.off = 0;
    }
    onScroll();
  }

  // ---------- Encabezado y barra de progreso ----------
  var top = document.querySelector('[data-top]');
  var bar = document.querySelector('[data-progress]');
  var barBox = bar && bar.parentElement;
  function onScroll() {
    var y = view.top, max = root.scrollHeight - view.h;
    if (bar) bar.style.setProperty('--p', max > 0 ? Math.min(1, y / max) : 0);
    var shift = view.off ? 'translate3d(0,' + view.off.toFixed(1) + 'px,0)' : '';
    if (top) {
      // El encabezado no se esconde: ahí queda la foto como logo.
      top.classList.toggle('is-solid', y > 30);
      top.style.transition = view.off ? 'none' : '';
      top.style.transform = shift;
    }
    if (barBox) barBox.style.transform = shift;
  }
  measure();
  window.addEventListener('scroll', measure, { passive: true });

  window.__motionReady = true;
  var gsap = window.gsap, ST = window.ScrollTrigger;
  if (!gsap || !ST || reduce) {
    root.classList.remove('motion');
    return;
  }
  gsap.registerPlugin(ST);
  // En una vista estirada, ScrollTrigger lee la parte visible en lugar del
  // scroll de la ventana (que ahí siempre vale 0).
  var ready = function () {
    if (view.framed) {
      var scroller = document.body;
      ST.scrollerProxy(scroller, {
        scrollTop: function () { return view.top; },
        getBoundingClientRect: function () { return { top: view.off, left: 0, width: window.innerWidth, height: view.h }; },
        pinType: 'transform',
      });
      ST.defaults({ scroller: scroller });
      gsap.ticker.add(function () { measure(); ST.update(); });
    }
    start();
  };
  if (!framedCheck) ready(); else { started = false; setTimeout(function () { if (!started) { started = true; ready(); } }, 600); }

  function start() {

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
    // En una vista estirada, la apertura ocupa solo la parte visible.
    if (view.framed) { loader.style.bottom = 'auto'; loader.style.height = view.h + 'px'; loader.style.top = view.off + 'px'; }
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
  // ---------- Menú en burbujas alrededor de la foto ----------
  // Al cargar, los botones del menú aparecen como burbujas a los costados de
  // la foto y flotan. Al bajar, bajan y se alinean en su lugar: una fila de
  // botones arriba del título. Se pueden apretar en cualquier momento.
  var nav = document.querySelector('[data-hero-nav]');
  var links = nav ? [].slice.call(nav.querySelectorAll('a')) : [];
  var small = window.matchMedia('(max-width: 900px)');
  // Lugar de cada burbuja: lado (-1 izquierda, 1 derecha), altura respecto de
  // la foto y un corrimiento extra hacia afuera (Planes, lejos de la hoja).
  var spots = [[-1, -0.08, 34], [1, -0.3, 0], [-1, 0.3, 0], [1, 0.24, 0]];
  // En celular no hay lugar a los costados: van arriba y abajo del aro.
  var spotsSmall = [[-1, -0.3, 0], [1, -0.47, 0], [-1, 0.47, 0], [1, 0.47, 0]];
  var pops = links.map(function () { return { v: 0 }; });
  if (links.length) {
    nav.classList.add('is-bubbles');
    heroIn.to(pops, { v: 1, duration: 1.1, ease: 'elastic.out(1, 0.55)', stagger: 0.14 }, 0.35);
  }
  function updateBubbles(h, startY, p) {
    if (!links.length) return;
    // Se acomodan antes que la foto, así la fila ya está lista al leer el título.
    var e = smooth(Math.min(1, p * 1.5));
    var t = gsap.ticker.time;
    var cx = h.left + h.width / 2, cy = startY + h.height / 2;
    var mobile = small.matches;
    var f = 1 - e;
    // Mientras flotan van por encima de la foto; ya alineadas, por debajo del encabezado.
    nav.style.zIndex = e < 1 ? '' : '40';
    links.forEach(function (a, i) {
      var sp = (mobile ? spotsSmall : spots)[i % spots.length], pop = pops[i].v;
      var w = a.offsetWidth, hh = a.offsetHeight;
      // Su lugar en la fila, en coordenadas de la página (offsetLeft no cuenta el transform)
      var ox = 0, oy = 0, el = a;
      while (el) { ox += el.offsetLeft; oy += el.offsetTop; el = el.offsetParent; }
      var nx = ox + w / 2, ny = oy + hh / 2;
      // Dónde flota, a un costado del aro de la foto, sin salirse de la pantalla
      var ring = Math.sqrt(Math.max(0, 0.56 * 0.56 - sp[1] * sp[1])) * h.width;
      var bx = cx + sp[0] * (ring + w / 2 + (mobile ? 8 : 26) + sp[2]);
      bx = Math.max(w / 2 + 12, Math.min(window.innerWidth - w / 2 - 12, bx));
      var by = cy + sp[1] * h.height;
      // Aparece desde el centro de la foto, como una burbuja
      var sx = cx + (bx - cx) * pop, sy = cy + (by - cy) * pop;
      var bob = f * pop;
      var dx = (sx - nx) * f + Math.sin(t * 1.1 + i * 1.9) * 9 * bob;
      var dy = (sy - ny) * f + Math.cos(t * 0.9 + i * 1.3) * 12 * bob;
      var sc = pop + (1 - pop) * e;
      a.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0) scale(' + Math.max(0, sc).toFixed(3) + ')';
      var op = Math.min(1, pop * 1.5 + e);
      a.style.opacity = op.toFixed(3);
      a.style.pointerEvents = op < 0.2 ? 'none' : '';
    });
  }

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
      var p = Math.min(1, Math.max(0, view.top / Math.max(240, view.h * 0.55)));
      var e = smooth(p);
      // Tamaño final: el círculo con su texto entra en el lugar del logo.
      var kEnd = (s.width * 0.95) / (h.width * 1.12);
      var k = 1 + (kEnd - 1) * e;
      // Todo se calcula en coordenadas de la parte visible (view.off es 0
      // en un navegador común) y al final se vuelve a sumar ese corrimiento.
      var endX = s.left + s.width / 2 - (h.width * kEnd) / 2;
      var endY = s.top - view.off + s.height / 2 - (h.height * kEnd) / 2;
      // Sale desde donde se ve al principio (sin arrastrarse con el scroll),
      // así nunca se va por arriba de la pantalla en el celular.
      var startY = h.top + window.scrollY;
      var x = h.left + (endX - h.left) * e;
      var y = startY + (endY - startY) * e + view.off;
      fly.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) scale(' + k.toFixed(4) + ')';
      // El ícono de la manzana se desvanece justo cuando llega la foto.
      if (slotLogo) slotLogo.style.opacity = String(Math.max(0, Math.min(1, (0.85 - e) / 0.2)));
      updateBubbles(h, startY, p);
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

  ST.refresh();
  }

  window.addEventListener('load', function () { ST.refresh(); });
  } catch (err) { rescue(); }
})();
