// DN Estética · interacciones: barra, apariciones, interruptor Faciales /
// Corporales, fichas de tratamientos, "¿Qué querés mejorar?" y detalles de
// movimiento. Todo en una función propia; sin JavaScript se ve todo igual.
(function () {
  'use strict';
  window.__motionReady = true;
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  var year = $('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());

  // ---------- Barra y botón de WhatsApp ----------
  var top = $('[data-top]');
  var hero = $('.hero');
  var float = $('.wa-float');
  var onScroll = function () {
    var y = window.scrollY;
    if (top) top.classList.toggle('is-solid', y > 30);
    if (float && hero) float.classList.toggle('is-hidden', y < hero.offsetHeight * 0.6);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // ---------- Apariciones al bajar ----------
  var shown = $$('[data-reveal], [data-arch]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    shown.forEach(function (el) { io.observe(el); });
  } else {
    shown.forEach(function (el) { el.classList.add('is-in'); });
  }
  // Por las dudas, nada queda escondido
  setTimeout(function () { shown.forEach(function (el) { el.classList.add('is-in'); }); }, 4000);

  // ---------- Faciales / Corporales ----------
  var sw = $('[data-switch]');
  var tabs = $$('[data-cat]');
  var showCat = function (cat) {
    tabs.forEach(function (t, i) {
      var on = t.getAttribute('data-cat') === cat;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      if (on && sw) sw.setAttribute('data-on', String(i));
    });
    $$('[data-panel]').forEach(function (p) { p.hidden = p.getAttribute('data-panel') !== cat; });
  };
  tabs.forEach(function (t) {
    t.addEventListener('click', function () { showCat(t.getAttribute('data-cat')); });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var i = tabs.indexOf(t) + (e.key === 'ArrowRight' ? 1 : -1);
      var next = tabs[(i + tabs.length) % tabs.length];
      next.focus(); showCat(next.getAttribute('data-cat'));
    });
  });

  // ---------- Fichas ----------
  var pick = function (key, scroll) {
    var parts = key.split(':');
    var cat = parts[0];
    showCat(cat);
    var panel = $('[data-panel="' + cat + '"]');
    if (!panel) return;
    $$('[data-ficha]', panel).forEach(function (f) {
      if (f.getAttribute('data-ficha') === key) f.setAttribute('data-current', '');
      else f.removeAttribute('data-current');
    });
    $$('[data-pick]', panel).forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-pick') === key ? 'true' : 'false');
    });
    var ficha = $('[data-ficha="' + key + '"]');
    if (scroll && ficha) {
      var r = ficha.getBoundingClientRect();
      if (r.top < 70 || r.top > window.innerHeight * 0.6) {
        window.scrollTo({ top: window.scrollY + r.top - 90, behavior: reduce ? 'auto' : 'smooth' });
      }
    }
  };
  $$('[data-pick]').forEach(function (b) {
    b.addEventListener('click', function () {
      // En celular, la ficha queda debajo de la fila: se baja hasta ella
      pick(b.getAttribute('data-pick'), window.innerWidth <= 1000);
    });
  });

  // ---------- ¿Qué querés mejorar? ----------
  var dataEl = $('[data-needs-data]');
  var results = $('[data-results]');
  var chips = $$('[data-need]');
  if (dataEl && results && chips.length) {
    var all = [];
    try { all = JSON.parse(dataEl.textContent); } catch (err) { all = []; }
    var render = function (need) {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-need') === need ? 'true' : 'false'); });
      results.textContent = '';
      all.filter(function (t) { return t.needs.indexOf(need) >= 0; }).forEach(function (t, i) {
        var li = document.createElement('li');
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'result';
        b.style.setProperty('--i', String(i));
        var img = document.createElement('img');
        img.src = t.photo; img.alt = ''; img.loading = 'lazy';
        var txt = document.createElement('span');
        var cat = document.createElement('span'); cat.className = 'result__cat'; cat.textContent = t.catLabel;
        var name = document.createElement('span'); name.className = 'result__name'; name.textContent = t.title;
        var time = document.createElement('span'); time.className = 'result__time'; time.textContent = t.time + ' · Ver tratamiento';
        txt.appendChild(cat); txt.appendChild(name); txt.appendChild(time);
        b.appendChild(img); b.appendChild(txt);
        b.addEventListener('click', function () {
          pick(t.cat + ':' + t.id, false);
          var sec = $('#tratamientos');
          var ficha = $('[data-ficha="' + t.cat + ':' + t.id + '"]');
          var target = window.innerWidth <= 1000 && ficha ? ficha : sec;
          if (target) window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - 80, behavior: reduce ? 'auto' : 'smooth' });
        });
        li.appendChild(b);
        results.appendChild(li);
      });
    };
    chips.forEach(function (c) { c.addEventListener('click', function () { render(c.getAttribute('data-need')); }); });
    render(chips[0].getAttribute('data-need'));
  }

  if (reduce) return;

  // ---------- Portada: el logo sigue un poco al mouse y las hojas se mueven al bajar ----------
  var logo = $('[data-logo]');
  var leaves = $$('.hero .leaf');
  var mx = 0, my = 0, cx = 0, cy = 0;
  if (fine && logo) {
    window.addEventListener('pointermove', function (e) {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }
  (function loop() {
    cx += (mx - cx) * 0.06; cy += (my - cy) * 0.06;
    var y = window.scrollY;
    if (y < window.innerHeight * 1.2) {
      if (logo) logo.style.transform = 'translate3d(' + (cx * 10).toFixed(2) + 'px,' + (cy * 8 + y * 0.12).toFixed(2) + 'px,0) rotate(' + (cx * 2).toFixed(2) + 'deg)';
      leaves.forEach(function (l, i) {
        var dir = i % 2 ? 1 : -1;
        l.style.translate = (cx * 12 * dir).toFixed(1) + 'px ' + (y * (0.08 + i * 0.03) * (i < 2 ? -1 : 1) + cy * 8).toFixed(1) + 'px';
      });
    }
    requestAnimationFrame(loop);
  })();

  // ---------- Botones "magnéticos" (solo con mouse) ----------
  if (fine) {
    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.18).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }
})();
