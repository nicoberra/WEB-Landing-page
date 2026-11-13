// Pages by NB · interacciones (sin librerías)
(function () {
  'use strict';
  window.__motionReady = true;
  var root = document.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Año del pie
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // Barra: se "despega" al bajar
  var top = document.querySelector('[data-top]');
  var onScroll = function () { if (top) top.classList.toggle('is-stuck', scrollY > 30); };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Sección actual en el menú
  var links = $$('.top__nav a');
  if ('IntersectionObserver' in window && links.length) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-here', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s) navIo.observe(s); });
  }

  // Aparición al bajar
  var revealEls = $$('[data-reveal], .steps__wrap');
  if ('IntersectionObserver' in window && root.classList.contains('motion')) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in', 'is-drawn');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in', 'is-drawn'); });
  }

  // Palabra que cambia en el título
  var swap = document.querySelector('[data-swap]');
  if (swap && !reduce) {
    var words = [];
    try { words = JSON.parse(swap.getAttribute('data-swap')); } catch (e) {}
    var w = swap.querySelector('[data-swap-word]');
    var i = 0;
    if (words.length > 1) setInterval(function () {
      swap.classList.add('is-out');
      setTimeout(function () {
        i = (i + 1) % words.length;
        swap.classList.remove('is-out');
        swap.classList.add('is-in');
        w.textContent = words[i];
        void w.offsetWidth;
        swap.classList.remove('is-in');
      }, 380);
    }, 2600);
  }

  // Profundidad de la portada: las capturas y stickers siguen al mouse / scroll
  var art = document.querySelector('[data-parallax]');
  if (art && !reduce) {
    var layers = $$('[data-depth]', art);
    var tx = 0, ty = 0, cx = 0, cy = 0, sy = 0;
    if (fine) addEventListener('mousemove', function (e) {
      tx = (e.clientX / innerWidth - 0.5) * 2;
      ty = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
    (function loop() {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      sy = Math.min(scrollY, 900);
      layers.forEach(function (l) {
        var d = parseFloat(l.getAttribute('data-depth')) || 1;
        l.style.translate = (cx * d * 8).toFixed(2) + 'px ' + (cy * d * 8 - sy * d * 0.06).toFixed(2) + 'px';
      });
      requestAnimationFrame(loop);
    })();
  }

  // Botones con imán (suave, con lerp)
  if (fine && !reduce) {
    $$('[data-magnetic]').forEach(function (b) {
      var x = 0, y = 0, gx = 0, gy = 0, raf = 0;
      var step = function () {
        x += (gx - x) * 0.18; y += (gy - y) * 0.18;
        b.style.transform = 'translate(' + x.toFixed(2) + 'px,' + y.toFixed(2) + 'px)';
        if (Math.abs(gx - x) > 0.05 || Math.abs(gy - y) > 0.05) raf = requestAnimationFrame(step);
        else raf = 0;
      };
      var kick = function () { if (!raf) raf = requestAnimationFrame(step); };
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        gx = (e.clientX - r.left - r.width / 2) * 0.25;
        gy = (e.clientY - r.top - r.height / 2) * 0.35;
        kick();
      });
      b.addEventListener('mouseleave', function () { gx = 0; gy = 0; kick(); });
    });
  }

  // Tarjetas de producto que se inclinan con el mouse
  if (fine && !reduce) {
    $$('[data-tilt]').forEach(function (c) {
      c.addEventListener('mousemove', function (e) {
        var r = c.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = 'perspective(900px) rotateX(' + (-py * 6).toFixed(2) + 'deg) rotateY(' + (px * 8).toFixed(2) + 'deg) translateY(-6px)';
      });
      c.addEventListener('mouseleave', function () { c.style.transform = ''; });
    });
  }

  // "¿Qué necesitás?": resalta el producto recomendado
  var cards = document.querySelector('.cards');
  $$('[data-pick]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-pick');
      var on = !btn.classList.contains('is-on');
      $$('[data-pick]').forEach(function (b) { b.classList.remove('is-on'); b.setAttribute('aria-pressed', 'false'); });
      $$('[data-product]').forEach(function (c) { c.classList.remove('is-picked'); });
      if (!cards) return;
      cards.classList.toggle('is-picking', on);
      if (!on) return;
      btn.classList.add('is-on');
      btn.setAttribute('aria-pressed', 'true');
      var card = document.querySelector('[data-product="' + id + '"]');
      if (card) {
        void card.offsetWidth;
        card.classList.add('is-picked');
        if (innerWidth < 960) card.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
      }
    });
  });

  // Filtro de trabajos
  $$('[data-filter]').forEach(function (f) {
    f.addEventListener('click', function () {
      var t = f.getAttribute('data-filter');
      $$('[data-filter]').forEach(function (o) { o.classList.toggle('is-on', o === f); o.setAttribute('aria-pressed', String(o === f)); });
      $$('.work').forEach(function (w, k) {
        var show = t === 'todos' || (' ' + w.getAttribute('data-type') + ' ').indexOf(' ' + t + ' ') > -1;
        w.classList.toggle('is-hidden', !show);
        if (show && !reduce) {
          w.animate([{ opacity: 0, transform: 'translateY(24px) scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 600, delay: (k % 4) * 60, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' });
        }
      });
    });
  });

  // En el celu (sin mouse), cada web se recorre sola cuando está a la vista
  if (!fine && !reduce && 'IntersectionObserver' in window) {
    var tour = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle('is-touring', e.isIntersecting); });
    }, { threshold: 0.6 });
    $$('.work').forEach(function (w) { tour.observe(w); });
  }

  // Visor de la web completa
  var viewer = document.querySelector('[data-viewer]');
  var data = [];
  try { data = JSON.parse((document.querySelector('[data-works]') || {}).textContent || '[]'); } catch (e) {}
  if (viewer && viewer.showModal) {
    var img = viewer.querySelector('[data-viewer-img]');
    var name = viewer.querySelector('[data-viewer-name]');
    var visit = viewer.querySelector('[data-viewer-visit]');
    var body = viewer.querySelector('.viewer__body');
    $$('[data-open]').forEach(function (b) {
      b.addEventListener('click', function () {
        var it = data[+b.getAttribute('data-open')];
        if (!it) return;
        img.src = it.web;
        img.alt = 'Página completa de ' + it.name;
        name.textContent = it.name;
        if (it.url) { visit.href = it.url; visit.hidden = false; } else visit.hidden = true;
        body.scrollTop = 0;
        viewer.showModal();
      });
    });
    viewer.querySelector('[data-viewer-close]').addEventListener('click', function () { viewer.close(); });
    viewer.addEventListener('click', function (e) { if (e.target === viewer) viewer.close(); });
  }

  // Confeti en el botón final
  var conf = document.querySelector('[data-confetti]');
  if (conf && !reduce) {
    var colors = ['#2B44FF', '#FFD23F', '#FF8FC7', '#5EE6B0', '#FFB38A', '#ffffff'];
    var burst = function () {
      var r = conf.getBoundingClientRect();
      for (var n = 0; n < 36; n++) {
        var p = document.createElement('i');
        p.className = 'confetti';
        p.style.left = r.left + r.width / 2 + 'px';
        p.style.top = r.top + r.height / 2 + 'px';
        p.style.background = colors[n % colors.length];
        document.body.appendChild(p);
        var a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 160;
        p.animate([
          { transform: 'translate(-50%,-50%) rotate(0)', opacity: 1 },
          { transform: 'translate(' + Math.cos(a) * d + 'px,' + (Math.sin(a) * d - 60) + 'px) rotate(' + (Math.random() * 720) + 'deg)', opacity: 1, offset: 0.7 },
          { transform: 'translate(' + Math.cos(a) * d * 1.1 + 'px,' + (Math.sin(a) * d + 80) + 'px) rotate(' + (Math.random() * 900) + 'deg)', opacity: 0 }
        ], { duration: 1300 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = (function (el) { return function () { el.remove(); }; })(p);
      }
    };
    conf.addEventListener('mouseenter', burst);
    conf.addEventListener('click', burst);
  }
})();
