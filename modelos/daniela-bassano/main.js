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

  // ---------- Títulos que se escriben letra por letra ----------
  // Al llegar a cada título de sección, las letras van apareciendo de a una
  // (como si se escribiera) y después quedan fijas.
  if (!reduce && 'IntersectionObserver' in window) {
    var titles = $$('h2.title');
    titles.forEach(function (t) {
      var text = t.textContent;
      t.setAttribute('aria-label', text);
      t.textContent = '';
      var n = 0;
      text.split(/(\s+)/).forEach(function (word) {
        if (!word) return;
        if (/^\s+$/.test(word)) { t.appendChild(document.createTextNode(' ')); return; }
        var w = document.createElement('span');
        w.className = 'type__word';
        w.setAttribute('aria-hidden', 'true');
        word.split('').forEach(function (ch) {
          var c = document.createElement('span');
          c.className = 'type__ch';
          c.textContent = ch;
          c.style.transitionDelay = (n++ * 55) + 'ms';
          w.appendChild(c);
        });
        t.appendChild(w);
      });
      t.classList.add('type');
    });
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-typed'); tio.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -15% 0px' });
    titles.forEach(function (t) { tio.observe(t); });
    setTimeout(function () { titles.forEach(function (t) { if (t.getBoundingClientRect().top < window.innerHeight) t.classList.add('is-typed'); }); }, 4000);
  }

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
      $$('[data-need]').forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-need') === need ? 'true' : 'false'); });
      results.textContent = '';
      // Primero el más recomendado: el tratamiento que nombra esta necesidad
      // en primer lugar (sin perder el orden de la placa entre iguales)
      // Separados en Faciales y Corporales, cada grupo con su título y su
      // propia numeración (y su recomendado).
      var list = all.filter(function (t) { return t.needs.indexOf(need) >= 0; })
        .map(function (t, k) { return { t: t, k: k }; })
        .sort(function (x, y) { return (x.t.needs.indexOf(need) - y.t.needs.indexOf(need)) || (x.k - y.k); })
        .map(function (x) { return x.t; });
      var groups = [];
      list.forEach(function (t) {
        var g = groups.filter(function (x) { return x.cat === t.cat; })[0];
        if (!g) { g = { cat: t.cat, label: t.catLabel, items: [] }; groups.push(g); }
        g.items.push(t);
      });
      groups.sort(function (x, y) { return x.cat === 'faciales' ? -1 : y.cat === 'faciales' ? 1 : 0; });
      var step = 0;
      groups.forEach(function (g) {
        var head = document.createElement('li');
        head.className = 'results__group';
        head.style.setProperty('--i', String(step++));
        head.textContent = g.label;
        results.appendChild(head);
        g.items.forEach(function (t, i) {
        var li = document.createElement('li');
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'result';
        b.style.setProperty('--i', String(step++));
        var img = document.createElement('img');
        img.src = t.photo; img.alt = ''; img.loading = 'lazy';
        var txt = document.createElement('span');
        var cat = document.createElement('span'); cat.className = 'result__cat'; cat.textContent = t.catLabel;
        var name = document.createElement('span'); name.className = 'result__name'; name.textContent = t.title;
        var time = document.createElement('span'); time.className = 'result__time'; time.textContent = t.time + ' · Ver tratamiento';
        cat.textContent = i === 0 ? '★ Recomendado' : t.catLabel;
        txt.appendChild(cat); txt.appendChild(name); txt.appendChild(time);
        // Número de orden, como una lista que se va armando
        var num = document.createElement('span');
        num.className = 'result__num';
        num.setAttribute('aria-hidden', 'true');
        num.textContent = String(i + 1);
        if (i === 0) b.classList.add('result--top');
        b.appendChild(num); b.appendChild(img); b.appendChild(txt);
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
      });
    };
    chips.forEach(function (c) { c.addEventListener('click', function () { render(c.getAttribute('data-need')); }); });
    render(chips[0].getAttribute('data-need'));
    // Celular: las opciones van en dos filas que se mueven solas (en sentidos
    // contrarios), así se ve que hay más. Cada fila lleva una copia para que
    // el movimiento no se corte; las copias también se pueden tocar.
    var box = $('[data-needs]');
    if (box && !reduce && window.matchMedia('(max-width: 640px)').matches) {
      var half = Math.ceil(chips.length / 2);
      [chips.slice(0, half), chips.slice(half)].forEach(function (group, r) {
        var row = document.createElement('div');
        row.className = 'chips__row chips__row--' + r;
        group.forEach(function (c) { row.appendChild(c); });
        group.forEach(function (c) {
          var copy = c.cloneNode(true);
          copy.setAttribute('aria-hidden', 'true');
          copy.tabIndex = -1;
          copy.addEventListener('click', function () { c.click(); });
          row.appendChild(copy);
        });
        box.appendChild(row);
      });
      box.classList.add('is-moving');
    }
  }

  // ---------- Logo y texto de la portada que vuelan a la barra ----------
  // Arriba de todo solo se ven en el centro de la portada. Al bajar, el logo
  // va a la barra (arriba a la izquierda) y "Estética Facial y Corporal" al
  // centro de la barra; ahí se cambian por los de la barra, que quedan fijos.
  (function () {
    var fl = $('[data-fly-logo]'), fw = $('[data-fly-words]');
    var tl = $('.top__brand img'), tw = $('.top__words');
    var end = $('.end__logo');
    if (!fl || !fw || !tl || !tw || !top) return;
    top.setAttribute('data-fly', '');
    var smooth = function (t) { return t * t * (3 - 2 * t); };
    var place = function (el, target, e) {
      el.style.transform = '';
      if (e <= 0) return;
      var a = el.getBoundingClientRect(), b = target.getBoundingClientRect();
      if (!a.width) return;
      var k = 1 + (b.height / a.height - 1) * e;
      var dx = (b.left + b.width / 2 - (a.left + a.width / 2)) * e;
      var dy = (b.top + b.height / 2 - (a.top + a.height / 2)) * e;
      el.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0) scale(' + k.toFixed(4) + ')';
    };
    var tick = function () {
      var dist = Math.max(220, Math.min(420, window.innerHeight * 0.45));
      var p = Math.min(1, Math.max(0, window.scrollY / dist));
      var e = reduce ? (p >= 1 ? 1 : 0) : smooth(p);
      var docked = p >= 1;
      top.classList.toggle('is-docked', docked);
      fl.style.opacity = fw.style.opacity = docked ? '0' : '';
      if (!docked) { place(fl, tl, e); place(fw, tw, e); }
      // Al final de la página, el logo de la barra baja hasta el logo del
      // cierre ("Reservá tu turno"), agrandándose, y se queda ahí.
      if (end) {
        tl.style.transform = '';
        var r = end.getBoundingClientRect(), vh = window.innerHeight;
        var from = vh, to = vh * 0.35; // empieza al asomar y llega con el logo a un tercio de la pantalla
        var q = docked ? Math.min(1, Math.max(0, (from - r.top) / (from - to))) : 0;
        var arrived = q >= 1;
        end.style.opacity = arrived || !docked ? '' : '0';
        tl.style.opacity = arrived ? '0' : '';
        if (q > 0 && !arrived) {
          var qe = reduce ? 1 : smooth(q);
          var a = tl.getBoundingClientRect();
          var k = 1 + (r.height / a.height - 1) * qe;
          var dx = (r.left + r.width / 2 - (a.left + a.width / 2)) * qe;
          var dy = (r.top + r.height / 2 - (a.top + a.height / 2)) * qe;
          tl.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px,0) scale(' + k.toFixed(4) + ')';
        }
      }
    };
    tick();
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    // La portada entra con una animación: se acomoda al terminar
    setTimeout(tick, 1800);
  })();

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
