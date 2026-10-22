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

  // ---------- Carruseles de los posts (funcionan aunque no haya animaciones) ----------
  // Pasan solos; se pueden deslizar con el dedo o con las flechas. En compu,
  // mientras la sección queda fija, la ruedita del mouse los va cambiando (main
  // más abajo pone "scrollDriven" y los maneja).
  var carousels = [].slice.call(document.querySelectorAll('[data-slides]')).map(function (box, ci) {
    var track = box.querySelector('[data-slides-track]');
    var dots = [].slice.call(box.querySelectorAll('.slides__dots i'));
    var n = track.children.length;
    var c = { box: box, n: n, index: 0, pausedUntil: 0, visible: false };
    var current = function () { return Math.round(track.scrollLeft / Math.max(1, track.clientWidth)); };
    c.go = function (i, instant) {
      c.index = (i + n) % n;
      track.scrollTo({ left: c.index * track.clientWidth, behavior: instant || reduce ? 'auto' : 'smooth' });
      mark(c.index);
    };
    var mark = function (i) { dots.forEach(function (d, k) { d.classList.toggle('is-on', k === i); }); };
    mark(0);
    track.addEventListener('scroll', function () { var i = current(); if (i !== c.index) { c.index = i; mark(i); } }, { passive: true });
    var hold = function () { c.pausedUntil = Date.now() + 9000; };
    ['pointerdown', 'touchstart', 'wheel'].forEach(function (ev) { track.addEventListener(ev, hold, { passive: true }); });
    box.querySelector('[data-slides-prev]').addEventListener('click', function () { hold(); c.go(c.index - 1); });
    box.querySelector('[data-slides-next]').addEventListener('click', function () { hold(); c.go(c.index + 1); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { hold(); c.go(c.index + 1); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { hold(); c.go(c.index - 1); e.preventDefault(); }
    });
    // Solo pasan solos cuando se ven en pantalla
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { c.visible = es[0].isIntersecting; }, { threshold: 0.4 }).observe(box);
    } else { c.visible = true; }
    c.offset = ci * 900; // que no cambien los tres a la vez
    return c;
  });
  var scrollDriven = false;

  // ---------- Foto de "Mi forma de trabajar": tarjeta para rascar ----------
  // Las dos fotos se dibujan en un lienzo. Una máscara guarda lo rascado:
  // fuera de la máscara se ve la foto de remera blanca y adentro la del saco,
  // así no asoman partes de la otra foto por los costados.
  // Va en su propia función (y con try) para no pisar nombres del resto del
  // archivo ni frenar las animaciones si algo falla.
  (function () {
    var scratch = document.querySelector('[data-scratch]');
    if (!scratch) return;
    var topImg = scratch.querySelector('[data-scratch-top]');
    var altImg = scratch.querySelector('.manifesto__cutout--alt');
    var cv = document.createElement('canvas');
    cv.className = 'manifesto__scratch';
    cv.setAttribute('aria-hidden', 'true');
    var mask = document.createElement('canvas'), layer = document.createElement('canvas');
    var ctx = cv.getContext('2d'), mctx = mask.getContext('2d'), lctx = layer.getContext('2d');
    var cvW = 0, last = null, queued = false;
    var render = function () {
      queued = false;
      try {
        var w = cv.width, h = cv.height;
        // Foto del saco recortada a lo rascado
        lctx.globalCompositeOperation = 'source-over';
        lctx.clearRect(0, 0, w, h); lctx.drawImage(mask, 0, 0);
        lctx.globalCompositeOperation = 'source-in'; lctx.drawImage(altImg, 0, 0, w, h);
        // Foto de arriba con el agujero de lo rascado, y encima el saco
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, w, h); ctx.drawImage(topImg, 0, 0, w, h);
        ctx.globalCompositeOperation = 'destination-out'; ctx.drawImage(mask, 0, 0);
        ctx.globalCompositeOperation = 'source-over'; ctx.drawImage(layer, 0, 0);
      } catch (err) { scratch.classList.remove('is-scratch'); }
    };
    var paint = function () {
      var w = scratch.offsetWidth;
      if (!w || w === cvW) return; // solo se vuelve a armar si cambia el ancho
      cvW = w;
      var d = Math.min(2, window.devicePixelRatio || 1);
      cv.width = mask.width = layer.width = Math.round(w * d);
      cv.height = mask.height = layer.height = Math.round(scratch.offsetHeight * d);
      render();
    };
    var loaded = function (img) {
      return img.complete && img.naturalWidth ? Promise.resolve() : new Promise(function (ok) { img.addEventListener('load', ok, { once: true }); });
    };
    Promise.all([loaded(topImg), loaded(altImg)]).then(function () {
      scratch.appendChild(cv); scratch.classList.add('is-scratch'); paint();
    });
    window.addEventListener('resize', paint);
    var at = function (e) {
      var b = cv.getBoundingClientRect();
      return { x: (e.clientX - b.left) / b.width * cv.width, y: (e.clientY - b.top) / b.height * cv.height };
    };
    var rub = function (e) {
      var pt = at(e), from = last || pt;
      mctx.lineCap = mctx.lineJoin = 'round';
      mctx.lineWidth = cv.width * 0.12;
      mctx.beginPath(); mctx.moveTo(from.x, from.y); mctx.lineTo(pt.x + 0.01, pt.y); mctx.stroke();
      last = pt;
      if (!queued) { queued = true; requestAnimationFrame(render); }
    };
    cv.addEventListener('pointerdown', function (e) { last = null; rub(e); });
    cv.addEventListener('pointermove', rub);
    cv.addEventListener('pointerleave', function () { last = null; });
    cv.addEventListener('pointerup', function () { last = null; });
  })();
  if (carousels.length && !reduce) {
    var started0 = Date.now();
    setInterval(function () {
      if (scrollDriven) return;
      var now = Date.now();
      carousels.forEach(function (c) {
        if (!c.visible || now < c.pausedUntil) return;
        if (!c.last) c.last = started0 + c.offset;
        if (now - c.last >= 3600) { c.last = now; c.go(c.index + 1); }
      });
    }, 300);
  }

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
    .from('.hero__text, .hero__ctas, .hero__where', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out' }, 0.45)
    .from('[data-tag]', { opacity: 0, duration: 0.9, ease: 'power2.out' }, 0.45);
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
      // Corrimiento y estirado suaves: las líneas son largas y no deben cortarse
      x: (i % 2 ? -1 : 1) * window.innerWidth * 0.03,
      '--wdth': 86,
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
  var wide = window.matchMedia('(min-width: 1100px)');
  var menuLinks = [].slice.call(document.querySelectorAll('[data-top-menu] a'));
  var turnos = document.querySelector('.top__cta .btn');
  // Lugar de cada burbuja: lado (-1 izquierda, 1 derecha), altura respecto de
  // la foto y un corrimiento extra hacia afuera (Planes, lejos de la hoja).
  var spots = [[-1, -0.08, 34], [1, -0.3, 0], [-1, 0.3, 0], [1, 0.24, 0]];
  // En celular no hay lugar a los costados: van arriba y abajo del aro.
  var spotsSmall = [[-1, -0.44, 0], [1, -0.4, 0], [-1, 0.42, 0], [1, 0.46, 0]];
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
    // Cuando la fila está por esconderse bajo la línea de la barra, los botones
    // se corren a la derecha y quedan en columna debajo de "Turnos" (en compu).
    var d = 0, dockRight = 0, dockTop = 0, dockRow = false;
    if (mobile) {
      // Celular: cuando la fila llega arriba, queda fija en una fila centrada
      // debajo de la barra (el menú siempre a mano).
      var barM = top.getBoundingClientRect();
      var rowTopM = nav.getBoundingClientRect().top - view.off;
      var lineM = barM.bottom - view.off;
      d = smooth(Math.max(0, Math.min(1, (lineM + 120 - rowTopM) / 120)));
      dockTop = lineM + 4;
      dockRow = true;
    } else if (wide.matches && turnos) {
      var bar = top.getBoundingClientRect();
      var tb = turnos.getBoundingClientRect();
      var lineY = bar.bottom - view.off + 16;
      var rowTop = nav.getBoundingClientRect().top - view.off;
      d = smooth(Math.max(0, Math.min(1, (lineY + 90 - rowTop) / 140)));
      dockRight = tb.right;
      dockTop = lineY + 14;
    }
    // Flotando o yendo a la columna: por encima de la foto. En la fila: por debajo de la barra.
    nav.style.zIndex = e < 1 || d > 0 ? '' : '40';
    var stackY = dockTop;
    var away = d > 0 && !dockRow ? bandOut() : 0;
    // Celular: la fila fija se muestra al llegar arriba y se va cuando pasa la cinta
    // (se va cuando la cinta termina de subir hasta la barra)
    var bandLow = band ? band.getBoundingClientRect().bottom - view.off > 150 : true;
    if (dockRow) top.classList.toggle('has-menu', d >= 0.98 && bandLow);
    else top.classList.remove('has-menu');
    // Fila del celular: ancho total para centrarla
    var rowGap = 6, rowW = -rowGap;
    if (dockRow) links.forEach(function (a) { rowW += a.offsetWidth + rowGap; });
    var rowX = (window.innerWidth - rowW) / 2;
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
      var shrink = 1;
      if (d > 0 && dockRow) {
        // Va al lugar exacto de su gemelo en la fila fija de la barra y se
        // achica hasta su tamaño, así el cambio no se nota.
        var twin = menuLinks[i];
        var txr, tyr;
        if (twin) {
          var tr = twin.getBoundingClientRect();
          txr = tr.left + tr.width / 2; tyr = tr.top - view.off + tr.height / 2 + view.top;
          shrink = 1 + (tr.width / w - 1) * d;
        } else {
          txr = rowX + w / 2; tyr = dockTop + hh / 2 + view.top;
          rowX += w + rowGap;
        }
        dx += (txr - nx - dx) * d;
        dy += (tyr - ny - dy) * d;
      } else if (d > 0 && !dockRow) {
        // Lugar en la columna: borde derecho alineado con "Turnos", uno debajo del otro
        var tx = dockRight - w / 2, ty = stackY + hh / 2 + view.top;
        stackY += hh + 10;
        dx += (tx - nx - dx) * d;
        dy += (ty - ny - dy) * d;
        // Se va por la derecha mientras pasa la cinta
        dx += (window.innerWidth - (tx - w / 2) + 30) * away;
      }
      var sc = (pop + (1 - pop) * e) * shrink;
      a.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0) scale(' + Math.max(0, sc).toFixed(3) + ')';
      var op = Math.min(1, pop * 1.5 + e);
      // Celular: al llegar arriba le pasan el lugar a la fila fija de la barra
      // (así no vibran al scrollear)
      if (dockRow && d >= 0.98) op = 0;
      a.style.opacity = op.toFixed(3);
      a.style.pointerEvents = op < 0.2 ? 'none' : '';
    });
  }

  // ---------- La matrícula sube a la barra de arriba ----------
  // La etiqueta pasa al encabezado (centro) y en la portada queda una copia
  // invisible que guarda su lugar. Mientras se baja, se mueve desde esa copia
  // hasta su lugar en la barra, donde queda fija.
  var tagEl = document.querySelector('[data-tag]');
  var tagSlot = document.querySelector('[data-tag-slot]');
  var tagGhost = null;
  // En celular no sube (ocupa mucho lugar arriba): queda en la portada.
  if (tagEl && tagSlot && !window.matchMedia('(max-width: 900px)').matches) {
    tagGhost = tagEl.cloneNode(true);
    tagGhost.removeAttribute('data-tag');
    tagGhost.classList.add('tag--ghost');
    tagGhost.setAttribute('aria-hidden', 'true');
    tagEl.parentNode.insertBefore(tagGhost, tagEl);
    tagSlot.appendChild(tagEl);
  }
  function updateTag(e) {
    if (!tagGhost) return;
    var g = tagGhost.getBoundingClientRect();
    var s = tagSlot.getBoundingClientRect();
    // Lugar en la barra (sin el transform propio): centro del hueco del medio
    var w = tagEl.offsetWidth, hh = tagEl.offsetHeight;
    var sx = s.left + s.width / 2 - w / 2, sy = s.top + s.height / 2 - hh / 2;
    var f = 1 - e;
    var dx = (g.left - sx) * f, dy = (g.top - sy) * f;
    tagEl.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0)';
  }

  // ---------- Las columnas se van cuando pasa la cinta ----------
  // Cuando la cinta llega a la zona de las columnas, estas se salen hacia los
  // costados (a la par del scroll) y quedan afuera el resto de la página.
  var band = document.querySelector('.tick-band');
  function bandOut() {
    if (!band) return 0;
    var r = band.getBoundingClientRect();
    var t = r.top - view.off;
    // Se quedan a la vista hasta que la cinta llega a la altura de su parte
    // de abajo; ahí se van y ya no vuelven (solo si se sube otra vez).
    var leaveFrom = view.h * 0.58, goneAt = view.h * 0.2;
    var o = Math.max(0, Math.min(1, (leaveFrom - t) / (leaveFrom - goneAt)));
    return o * o * (3 - 2 * o);
  }

  // ---------- Columna debajo de la foto ----------
  // Cuando la foto llegó arriba, los ítems se despliegan uno por uno según
  // cuánto se baja (y se repliegan al volver a subir).
  var rail = document.querySelector('[data-rail]');
  var railList = rail && rail.querySelector('.rail__list');
  var railItems = rail ? [].slice.call(rail.querySelectorAll('.rail__item')) : [];
  function updateRail(dockDist) {
    if (!railItems.length || !rail.offsetWidth) return;
    var STEP = 120;
    var from = view.top - dockDist * 0.85;
    var total = Math.max(0, Math.min(1, from / (STEP * railItems.length)));
    railList.style.setProperty('--grow', total.toFixed(3));
    railItems.forEach(function (it, i) {
      var q = Math.max(0, Math.min(1, (from - i * STEP) / STEP));
      it.style.setProperty('--q', (1 - Math.pow(1 - q, 3)).toFixed(3));
    });
    var out = bandOut() * (rail.offsetWidth + rail.offsetLeft + 30);
    rail.style.transform = 'translate3d(' + (-out).toFixed(1) + 'px,' + view.off.toFixed(1) + 'px,0)';
  }

  // ---------- La foto vuela al lugar del logo mientras se baja ----------
  // Va desde su lugar en la portada hasta el encabezado, achicándose, con el
  // texto que gira y las hojas. Al volver a subir hace el camino inverso.
  var fly = document.querySelector('[data-fly]');
  var holder = document.querySelector('[data-hero-visual]');
  var slot = document.querySelector('[data-avatar-slot]');
  var slotLogo = document.querySelector('[data-avatar-logo]');
  var footLogo = document.querySelector('.foot__logo');
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
      var dockDist = Math.max(240, view.h * 0.55);
      var p = Math.min(1, Math.max(0, view.top / dockDist));
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
      // Al final de la página: la foto baja al lugar del logo del pie y el logo
      // sube a la barra (uno baja y el otro sube, a la par del scroll).
      if (footLogo) {
        var lw = footLogo.offsetWidth, lh = footLogo.offsetHeight;
        var lox = 0, loy = 0, lel = footLogo;
        while (lel) { lox += lel.offsetLeft; loy += lel.offsetTop; lel = lel.offsetParent; }
        var lx = lox - window.scrollX, ly = loy - window.scrollY - view.off; // en pantalla, sin su transform
        // Avanza desde que el logo asoma abajo hasta el final de la página
        var qStart = loy - view.h, qEnd = root.scrollHeight - view.h;
        var q = Math.max(0, Math.min(1, (view.top - qStart) / Math.max(1, qEnd - qStart)));
        q = smooth(q);
        if (q > 0) {
          // La foto llega grande al medio del pie; en el camino se agranda un
          // poco más (y el logo gira) para que el cruce se note.
          var size = Math.max(lw, lh) * 1.25;
          var kF = size / (h.width * 1.12);
          var bump = 1 + Math.sin(q * Math.PI) * 0.35;
          var kNow = (k + (kF - k) * q) * bump;
          var fcx = lx + lw / 2, fcy = ly + lh / 2;
          // centro de la foto en vuelo: de donde estaba al centro del logo
          var ccx = x + (h.width * k) / 2, ccy = y - view.off + (h.height * k) / 2;
          ccx += (fcx - ccx) * q; ccy += (fcy - ccy) * q;
          k = kNow;
          x = ccx - (h.width * k) / 2;
          y = ccy - (h.height * k) / 2 + view.off;
          // El logo del pie sube hasta el lugar de la foto en la barra
          var sTop = s.top - view.off;
          var ls = (s.height * 0.95) / lh;
          var tdx = (s.left + s.width / 2) - (lx + lw / 2);
          var tdy = (sTop + s.height / 2) - (ly + lh / 2);
          var spin = Math.sin(q * Math.PI) * -18;
          footLogo.style.transform = 'translate3d(' + (tdx * q).toFixed(1) + 'px,' + (tdy * q).toFixed(1) + 'px,0) rotate(' + spin.toFixed(2) + 'deg) scale(' + ((1 + (ls - 1) * q) * (1 + Math.sin(q * Math.PI) * 0.2)).toFixed(4) + ')';
          footLogo.style.zIndex = '60';
        } else if (footLogo.style.transform) {
          footLogo.style.transform = '';
          footLogo.style.zIndex = '';
        }
      }
      fly.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0) scale(' + k.toFixed(4) + ')';
      // El ícono de la manzana se desvanece justo cuando llega la foto.
      if (slotLogo) slotLogo.style.opacity = String(Math.max(0, Math.min(1, (0.85 - e) / 0.2)));
      updateBubbles(h, startY, p);
      updateTag(e);
      updateRail(dockDist);
      // La línea curva de la barra se dibuja al mismo ritmo que sube la foto
      if (top) top.style.setProperty('--line', e.toFixed(4));
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

  // ---------- Jesi sobre el arco: crece, sube y el sello gira (con el scroll) ----------
  var figure = document.querySelector('[data-figure]');
  if (figure) {
    var figTl = gsap.timeline({ scrollTrigger: { trigger: figure, start: 'top 90%', end: 'center 45%', scrub: 0.7 } });
    figTl
      .fromTo('[data-arch]', { scaleY: 0.45, scaleX: 0.8, opacity: 0.6 }, { scaleY: 1, scaleX: 1, opacity: 1, ease: 'none' }, 0)
      .fromTo('[data-cutout]', { yPercent: 18, opacity: 0 }, { yPercent: 0, opacity: 1, ease: 'none' }, 0.1)
      .fromTo(figure.querySelectorAll('.manifesto__leaf'), { scale: 0, rotation: -60 }, { scale: 1, rotation: 0, ease: 'none', stagger: 0.1 }, 0.3);
    gsap.fromTo('[data-badge]', { rotation: -120, scale: 0.6 }, { rotation: 140, scale: 1, ease: 'none', scrollTrigger: { trigger: figure, start: 'top 90%', end: 'bottom top', scrub: 0.5 } });
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
    var dist = function () { return Math.max(0, track.offsetLeft + track.scrollWidth - plans.clientWidth); };
    gsap.to(track, {
      x: function () { return -dist(); },
      ease: 'none',
      scrollTrigger: { trigger: plans, start: 'top top', end: function () { return '+=' + dist(); }, scrub: 0.8, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
    });
    // Con el dedo también: arrastrar a los costados avanza/retrocede los planes
    // (mueve el scroll, que es lo que maneja el desplazamiento). Al llegar al
    // final ya no se mueven más y la página sigue bajando normal.
    var vp = plans.querySelector('.plans__viewport');
    if (vp && 'ontouchstart' in window) {
      var sx0 = 0, sy0 = 0, lastX = 0, horiz = null, vel = 0, raf = 0;
      var glide = function () {
        if (Math.abs(vel) < 0.5) return;
        window.scrollBy(0, vel); vel *= 0.92; raf = requestAnimationFrame(glide);
      };
      vp.addEventListener('touchstart', function (e) {
        cancelAnimationFrame(raf); vel = 0;
        sx0 = lastX = e.touches[0].clientX; sy0 = e.touches[0].clientY; horiz = null;
      }, { passive: true });
      vp.addEventListener('touchmove', function (e) {
        var x = e.touches[0].clientX, y = e.touches[0].clientY;
        if (horiz === null && (Math.abs(x - sx0) > 6 || Math.abs(y - sy0) > 6)) horiz = Math.abs(x - sx0) > Math.abs(y - sy0);
        if (!horiz) return;
        e.preventDefault();
        var dx = x - lastX; lastX = x;
        vel = -dx;
        window.scrollBy(0, -dx);
      }, { passive: false });
      vp.addEventListener('touchend', function () { if (horiz) { vel *= 1.6; raf = requestAnimationFrame(glide); } }, { passive: true });
    }
    gsap.from(track.children, { y: 80, opacity: 0, rotation: 4, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: plans, start: 'top 90%', end: 'top 25%', scrub: 0.6 } });
  }

  // ---------- Preguntas tipo chat: los globitos entran a la par del scroll ----------
  gsap.utils.toArray('[data-chat]').forEach(function (el) {
    gsap.fromTo(el.querySelector('.chat__q'), { x: 60, opacity: 0 }, { x: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 96%', end: 'top 75%', scrub: 0.5 } });
  });

  // ---------- Pasos: entran de derecha a izquierda, uno detrás del otro ----------
  gsap.utils.toArray('[data-step]').forEach(function (el, i) {
    gsap.fromTo(el, { xPercent: 110, rotation: 5, opacity: 0 }, { xPercent: 0, rotation: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 98%', end: 'top 62%', scrub: 0.6 } });
  });

  // ---------- Títulos que suben palabra por palabra (a la par del scroll) ----------
  gsap.utils.toArray('[data-rise-words]').forEach(function (el) {
    el.innerHTML = el.textContent.trim().split(/\s+/).map(function (w) { return '<span class="rw"><span>' + w.replace(/[&<>]/g, '') + '</span></span>'; }).join(' ');
    gsap.fromTo(el.querySelectorAll('.rw > span'), { yPercent: 110, rotation: 4 }, { yPercent: 0, rotation: 0, stagger: 0.12, ease: 'none', scrollTrigger: { trigger: el, start: 'top 92%', end: 'top 55%', scrub: 0.6 } });
  });

  // ---------- Recetarios: palabras separadas que se juntan en el medio ----------
  // El título queda fijo en el centro de la pantalla mientras las palabras,
  // que arrancan desparramadas, se acercan hasta formar la frase.
  var gather = document.querySelector('[data-gather]');
  if (gather) {
    gather.innerHTML = gather.textContent.trim().split(/\s+/).map(function (w) { return '<span class="gw">' + w.replace(/[&<>]/g, '') + '</span>'; }).join(' ');
    var gws = gather.querySelectorAll('.gw');
    // Cada palabra arranca hacia su propio lado (según dónde queda en la frase),
    // así se acercan sin cruzarse.
    var spread = function (i, el) {
      // offsetLeft no cuenta el corrimiento que ya tiene la palabra
      var dx = (el.offsetLeft + el.offsetWidth / 2) - (gather.offsetLeft + gather.offsetWidth / 2);
      var dir = dx >= 0 ? 1 : -1;
      return dx * 1.4 + dir * window.innerWidth * 0.1;
    };
    gsap.timeline({ scrollTrigger: { trigger: gather.parentNode, start: 'center center', end: '+=' + Math.round(window.innerHeight * 0.7), scrub: 0.7, pin: true, anticipatePin: 1, invalidateOnRefresh: true } })
      .fromTo(gws, { x: spread, y: function (i) { return (i % 2 ? -1 : 1) * 30; }, rotation: function (i) { return i % 2 ? 6 : -6; }, opacity: 0.25 }, { x: 0, y: 0, rotation: 0, opacity: 1, ease: 'power2.out' });
  }

  // ---------- Títulos que se estiran ----------
  gsap.utils.toArray('[data-stretch]').forEach(function (el) {
    gsap.fromTo(el, { '--wdth': 62 }, { '--wdth': +(el.dataset.stretchMax || 104), ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'bottom 25%', scrub: 0.5 } });
  });

  // ---------- Trayectoria: la línea se dibuja ----------
  var line = document.querySelector('[data-draw]');
  if (line) {
    gsap.fromTo(line, { '--draw': 100 }, { '--draw': 0, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 75%', end: 'bottom 60%', scrub: 0.5 } });
  }
  // Todo aparece a la par del scroll (si se sube, vuelve a esconderse)
  gsap.utils.toArray('[data-rise]').forEach(function (el) {
    gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 70%', scrub: 0.6 } });
  });

  // ---------- Recetarios: de un mazo a un abanico ----------
  var cards = gsap.utils.toArray('[data-card]');
  // En celular quedan quietos (solo se mueven las imágenes con el dedo)
  if (cards.length && !window.matchMedia('(max-width: 900px)').matches) {
    var mid = (cards.length - 1) / 2;
    gsap.fromTo(cards,
      { '--x': function (i) { return (mid - i) * 340 + 'px'; }, '--r': '0deg', '--ty': '120px', opacity: 0.4 },
      { '--x': '0px', '--r': function (i) { return ((i - mid) * 7) + 'deg'; }, '--ty': function (i) { return (i === mid ? -10 : 18) + 'px'; }, opacity: 1, ease: 'power2.out',
        scrollTrigger: { trigger: '[data-fan]', start: 'top 70%', end: 'center 55%', scrub: 0.8 } });
  }

  // ---------- Compu: con la ruedita cambian las fotos de los posts ----------
  // Cuando los posts se ven completos, la sección queda fija y cada tramo de
  // scroll pasa a la imagen siguiente (en los tres a la vez). Al terminar,
  // la página sigue bajando. En celular se deslizan con el dedo y pasan solos.
  var fanList = document.querySelector('.fan');
  if (fanList && carousels.length && window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)').matches) {
    var steps = Math.max.apply(null, carousels.map(function (c) { return c.n; })) - 1;
    var lastStep = -1;
    ST.create({
      trigger: fanList,
      start: 'center 55%',
      end: function () { return '+=' + Math.round(steps * window.innerHeight * 0.32); },
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onToggle: function (self) { scrollDriven = self.isActive; },
      onUpdate: function (self) {
        var k = Math.min(steps, Math.floor(self.progress * (steps + 1)));
        if (k === lastStep) return;
        lastStep = k;
        carousels.forEach(function (c) { c.go(Math.min(k, c.n - 1)); });
      },
    });
  }

  // ---------- Turnos: el círculo verde crece hasta llenar la pantalla ----------
  var circle = document.querySelector('[data-circle]');
  if (circle) {
    gsap.fromTo(circle, { '--s': 0.02 }, { '--s': 1, ease: 'power2.inOut', scrollTrigger: { trigger: '[data-booking]', start: 'top 85%', end: 'center 55%', scrub: 0.6 } });
    gsap.from('[data-booking] .booking__in > *', { y: 40, opacity: 0, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: '[data-booking]', start: 'top 55%', end: 'top 15%', scrub: 0.6 } });
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
