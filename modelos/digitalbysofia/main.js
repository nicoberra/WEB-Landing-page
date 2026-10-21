// digitalbysofia_ · recorrido con celular en 3D.
// - Las pantallas del celular se dibujan en un lienzo (sin capturas): perfil,
//   feed, carrusel, reel, logo y guía de marca, con los colores de la marca.
// - Con GSAP + ScrollTrigger el celular cruza la pantalla entre capítulos y
//   el contenido de cada pantalla avanza con el scroll.
// - Sin WebGL o con "reducir movimiento", el mismo dibujo se muestra en un
//   marco hecho con CSS y sin giros.
(function () {
  'use strict';
  var root = document.documentElement;
  var dataEl = document.getElementById('brand-data');
  if (!dataEl) return;
  var B = JSON.parse(dataEl.textContent);
  var C = B.colors;
  var COL = {
    paper: '#FBF3F1',
    pink: '#F4DCDA',
    rose: C.highlight,
    soft: C.accentSoft,
    accent: C.accent,
    wine: C.ink,
    burgundy: '#6E1530',
    muted: C.muted,
    line: C.line,
    white: '#FFFFFF',
  };
  var FONT = { display: 'Poppins, "Helvetica Neue", Arial, sans-serif', body: '"DM Sans", "Helvetica Neue", Arial, sans-serif', serif: '"Instrument Serif", Georgia, serif' };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobile = function () { return window.matchMedia('(max-width: 760px)').matches; };

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  var header = document.querySelector('[data-header]');
  var onScrollHeader = function () { if (header) header.classList.toggle('is-solid', window.scrollY > 40); };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  var chapters = Array.prototype.slice.call(document.querySelectorAll('.ch'));
  var stage = document.querySelector('.stage');
  var canvas = document.querySelector('[data-phone3d]');
  var flat = document.querySelector('[data-phone-flat]');
  var rail = document.querySelector('[data-rail]');
  var act = document.querySelector('[data-act]');
  var glow = document.querySelector('[data-glow-layer]');
  var floorEl = document.querySelector('[data-floor]');
  var bigword = document.querySelector('[data-bigword]');
  if (!stage || !chapters.length) return;
  chapters.forEach(function () { rail.appendChild(document.createElement('span')); });
  var dots = rail.children;

  /* =====================================================================
     Pantalla del celular (lienzo 2D)
     ===================================================================== */
  var SW = 0.659, SH = 1.442;
  var CW = 1170, CH = Math.round(CW * SH / SW);
  var STATUS = Math.round(CH * 0.046);
  var scr = document.createElement('canvas');
  scr.width = CW; scr.height = CH;
  var x = scr.getContext('2d', { alpha: false });
  var progress = {};
  var cur = chapters[0].dataset.screen, prev = null, fade = 1;

  function font(weight, size, fam) { return weight + ' ' + Math.round(size) + 'px ' + fam; }
  function rr(px, py, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    x.beginPath(); x.moveTo(px + r, py); x.arcTo(px + w, py, px + w, py + h, r); x.arcTo(px + w, py + h, px, py + h, r);
    x.arcTo(px, py + h, px, py, r); x.arcTo(px, py, px + w, py, r); x.closePath();
  }
  function starPath(cx, cy, R) {
    x.beginPath();
    for (var i = 0; i < 10; i++) {
      var rad = i % 2 ? R * 0.44 : R, a = -Math.PI / 2 + i * Math.PI / 5;
      x.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
    }
    x.closePath();
  }
  function swirl(pts, color, width) {
    x.save(); x.strokeStyle = color; x.lineWidth = width; x.lineCap = 'round';
    x.beginPath(); x.moveTo(pts[0], pts[1]);
    for (var i = 2; i < pts.length; i += 6) x.bezierCurveTo(pts[i], pts[i + 1], pts[i + 2], pts[i + 3], pts[i + 4], pts[i + 5]);
    x.stroke(); x.restore();
  }
  function spaced(text, cx, cy, size, spacing, color, weight) {
    x.save(); x.font = font(weight || 500, size, FONT.display); x.fillStyle = color; x.textBaseline = 'middle'; x.textAlign = 'left';
    var w = 0, i;
    for (i = 0; i < text.length; i++) w += x.measureText(text[i]).width + (i < text.length - 1 ? spacing : 0);
    var px = cx - w / 2;
    for (i = 0; i < text.length; i++) { x.fillText(text[i], px, cy); px += x.measureText(text[i]).width + spacing; }
    x.restore();
  }
  // Logotipo: "digitalbysofia_" con la estrella y "SOFIA LENCINA" debajo.
  function wordmark(cx, cy, size, color, tagColor, letters, starScale) {
    var name = B.wordmark;
    x.save(); x.font = font(600, size, FONT.display); x.textBaseline = 'alphabetic';
    var w = x.measureText(name).width, left = cx - w / 2;
    var shown = letters == null ? name : name.slice(0, letters);
    x.fillStyle = color; x.textAlign = 'left';
    var savedLS = x.letterSpacing;
    if ('letterSpacing' in x) x.letterSpacing = -size * 0.04 + 'px';
    x.fillText(shown, left, cy);
    if ('letterSpacing' in x) x.letterSpacing = savedLS;
    var s = starScale == null ? 1 : starScale;
    if (s > 0) {
      x.save(); x.translate(left + w - size * 0.12, cy - size * 0.92); x.rotate((1 - s) * -1.2); x.scale(s, s);
      starPath(0, 0, size * 0.3); x.fillStyle = color; x.fill(); x.restore();
    }
    if (tagColor) spaced(B.tagline, cx, cy + size * 0.5, size * 0.17, size * 0.07, tagColor, 500);
    x.restore();
    return w;
  }
  function wrapText(text, px, py, maxW, lineH, align) {
    var words = text.split(' '), line = '', lines = [];
    words.forEach(function (wd) {
      var test = line ? line + ' ' + wd : wd;
      if (x.measureText(test).width > maxW && line) { lines.push(line); line = wd; } else line = test;
    });
    if (line) lines.push(line);
    x.textAlign = align || 'left';
    lines.forEach(function (l, i) { x.fillText(l, px, py + i * lineH); });
    return lines.length;
  }
  function ease(t) { t = Math.max(0, Math.min(1, t)); return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function seg(p, a, b) { return Math.max(0, Math.min(1, (p - a) / (b - a))); }

  // ---------- Piezas de feed (miniaturas) ----------
  function tile(i, px, py, w, h) {
    x.save(); x.beginPath(); x.rect(px, py, w, h); x.clip();
    var k = i % 9;
    if (k === 0) {
      var g = x.createLinearGradient(px, py, px + w, py);
      g.addColorStop(0, '#E9B5BB'); g.addColorStop(0.5, '#F6DAD8'); g.addColorStop(1, '#D9959E');
      x.fillStyle = g; x.fillRect(px, py, w, h);
      for (var s = 0; s < 6; s++) { x.fillStyle = 'rgba(255,255,255,' + (s % 2 ? 0.18 : 0.06) + ')'; x.fillRect(px + s * w / 6, py, w / 12, h * 0.7); }
      x.fillStyle = '#F2E4E1'; x.fillRect(px, py + h * 0.72, w, h * 0.28);
      x.fillStyle = COL.paper; rr(px + w * 0.22, py + h * 0.22, w * 0.42, h * 0.55, 6); x.fill();
      wordmark(px + w * 0.43, py + h * 0.52, w * 0.07, COL.accent, null);
      x.fillStyle = COL.burgundy; x.beginPath(); x.ellipse(px + w * 0.16, py + h * 0.78, w * 0.13, h * 0.06, -0.4, 0, Math.PI * 2); x.fill();
      x.fillStyle = '#1d1416'; rr(px + w * 0.68, py + h * 0.4, w * 0.16, h * 0.34, 10); x.fill();
      x.fillStyle = COL.pink; rr(px + w * 0.69, py + h * 0.41, w * 0.14, h * 0.32, 8); x.fill();
    } else if (k === 1) {
      x.fillStyle = COL.accent; x.fillRect(px, py, w, h);
      x.fillStyle = COL.white; x.font = font(600, w * 0.15, FONT.display); x.textAlign = 'left'; x.fillText('Tu marca', px + w * 0.1, py + h * 0.45);
      x.font = font(400, w * 0.16, FONT.serif).replace('400', 'italic 400'); x.fillText('con estilo', px + w * 0.1, py + h * 0.62);
      starPath(px + w * 0.82, py + h * 0.2, w * 0.07); x.fill();
    } else if (k === 2) {
      x.fillStyle = COL.paper; x.fillRect(px, py, w, h);
      x.fillStyle = COL.accent; x.font = font(700, w * 0.3, FONT.display); x.textAlign = 'left'; x.fillText('5', px + w * 0.1, py + h * 0.4);
      x.fillStyle = COL.wine; x.font = font(600, w * 0.1, FONT.display); x.fillText('tips para', px + w * 0.36, py + h * 0.3); x.fillText('tu feed', px + w * 0.36, py + h * 0.41);
      for (var l = 0; l < 4; l++) { x.fillStyle = l ? COL.line : COL.rose; rr(px + w * 0.1, py + h * (0.55 + l * 0.09), w * (0.8 - l * 0.12), h * 0.035, 6); x.fill(); }
    } else if (k === 3) {
      x.fillStyle = COL.burgundy; x.fillRect(px, py, w, h);
      swirl([px - 10, py + h * 0.8, px + w * 0.3, py + h * 0.5, px + w * 0.6, py + h * 1.0, px + w + 10, py + h * 0.6], 'rgba(255,255,255,.35)', 3);
      spaced('NUEVO', px + w / 2, py + h * 0.42, w * 0.13, w * 0.04, COL.white, 600);
      x.fillStyle = COL.rose; x.font = font(500, w * 0.065, FONT.body); x.textAlign = 'center'; x.fillText('lanzamiento', px + w / 2, py + h * 0.56);
    } else if (k === 4) {
      x.fillStyle = COL.pink; x.fillRect(px, py, w, h);
      [COL.accent, COL.burgundy, COL.rose, COL.paper].forEach(function (c, j) {
        x.fillStyle = c; x.beginPath(); x.arc(px + w * (0.28 + (j % 2) * 0.44), py + h * (0.33 + Math.floor(j / 2) * 0.34), w * 0.16, 0, Math.PI * 2); x.fill();
      });
    } else if (k === 5) {
      x.fillStyle = COL.paper; x.fillRect(px, py, w, h);
      x.fillStyle = '#E7DAD8'; x.fillRect(px, py, w / 2, h);
      x.fillStyle = COL.muted; x.font = font(500, w * 0.065, FONT.display); x.textAlign = 'center'; x.fillText('antes', px + w * 0.25, py + h * 0.88);
      x.fillStyle = COL.accent; x.fillText('después', px + w * 0.75, py + h * 0.88);
      x.fillStyle = '#cbbdbb'; rr(px + w * 0.08, py + h * 0.2, w * 0.34, h * 0.5, 8); x.fill();
      x.fillStyle = COL.soft; rr(px + w * 0.58, py + h * 0.2, w * 0.34, h * 0.5, 8); x.fill();
      starPath(px + w * 0.75, py + h * 0.45, w * 0.07); x.fillStyle = COL.accent; x.fill();
    } else if (k === 6) {
      var g2 = x.createLinearGradient(px, py, px, py + h); g2.addColorStop(0, '#E8A9B5'); g2.addColorStop(1, COL.burgundy);
      x.fillStyle = g2; x.fillRect(px, py, w, h);
      x.fillStyle = 'rgba(255,255,255,.9)'; x.beginPath(); x.moveTo(px + w * 0.42, py + h * 0.4); x.lineTo(px + w * 0.62, py + h * 0.5); x.lineTo(px + w * 0.42, py + h * 0.6); x.closePath(); x.fill();
    } else if (k === 7) {
      x.fillStyle = COL.paper; x.fillRect(px, py, w, h);
      x.strokeStyle = COL.rose; x.lineWidth = 2; x.beginPath(); x.arc(px + w / 2, py + h / 2, w * 0.3, 0, Math.PI * 2); x.stroke();
      x.beginPath(); x.moveTo(px, py + h / 2); x.lineTo(px + w, py + h / 2); x.moveTo(px + w / 2, py); x.lineTo(px + w / 2, py + h); x.stroke();
      starPath(px + w / 2, py + h / 2, w * 0.17); x.fillStyle = COL.accent; x.fill();
    } else {
      x.fillStyle = COL.soft; x.fillRect(px, py, w, h);
      x.fillStyle = COL.wine; x.font = 'italic 400 ' + Math.round(w * 0.12) + 'px ' + FONT.serif; x.textAlign = 'center';
      x.fillText('Diseño que', px + w / 2, py + h * 0.45); x.fillText('conecta ✦', px + w / 2, py + h * 0.6);
    }
    x.restore();
  }

  // ---------- Pantallas ----------
  var SCREENS = {
    perfil: function (p) {
      x.fillStyle = COL.white; x.fillRect(0, 0, CW, CH);
      var y = STATUS + 40 - ease(p) * 760;
      x.fillStyle = COL.wine; x.font = font(600, 58, FONT.display); x.textAlign = 'left'; x.fillText(B.handle, 70, y + 70);
      // Avatar
      var ay = y + 290;
      x.strokeStyle = COL.rose; x.lineWidth = 10; x.beginPath(); x.arc(200, ay, 140, 0, Math.PI * 2); x.stroke();
      x.fillStyle = COL.paper; x.beginPath(); x.arc(200, ay, 126, 0, Math.PI * 2); x.fill();
      wordmark(200, ay + 10, 34, COL.accent, COL.wine);
      x.fillStyle = COL.wine; x.font = font(600, 50, FONT.display); x.fillText('Sofía Lencina', 400, ay - 20);
      x.fillStyle = COL.muted; x.font = font(500, 38, FONT.body); x.fillText('Diseñadora de contenido', 400, ay + 40);
      x.fillStyle = COL.wine; x.font = font(400, 42, FONT.body);
      B.bio.forEach(function (line, i) { x.fillText(line, 70, ay + 230 + i * 60); });
      x.fillStyle = COL.accent; x.font = font(500, 40, FONT.body); x.fillText('sofialencina.my.canva.site/portfolio', 70, ay + 420);
      x.fillStyle = COL.accent; rr(70, ay + 480, 500, 100, 24); x.fill();
      x.fillStyle = '#EFE5E4'; rr(600, ay + 480, 500, 100, 24); x.fill();
      x.font = font(600, 40, FONT.display); x.textAlign = 'center'; x.fillStyle = COL.white; x.fillText('Seguir', 320, ay + 544);
      x.fillStyle = COL.wine; x.fillText('Mensaje', 850, ay + 544);
      ['logos', 'reels', 'carruseles', 'marcas'].forEach(function (t, i) {
        var hx = 160 + i * 280, hy = ay + 740;
        x.strokeStyle = COL.line; x.lineWidth = 6; x.beginPath(); x.arc(hx, hy, 92, 0, Math.PI * 2); x.stroke();
        x.fillStyle = [COL.soft, COL.accent, COL.rose, COL.burgundy][i]; x.beginPath(); x.arc(hx, hy, 80, 0, Math.PI * 2); x.fill();
        x.fillStyle = COL.wine; x.font = font(500, 34, FONT.body); x.fillText(t, hx, hy + 150);
      });
      var gy = ay + 960, tw = (CW - 6) / 3, th = tw * 1.25;
      x.fillStyle = COL.line; x.fillRect(0, gy - 10, CW, 3);
      for (var i = 0; i < 9; i++) tile(i, (i % 3) * (tw + 3), gy + Math.floor(i / 3) * (th + 3), tw, th);
    },
    contenido: function (p) {
      x.fillStyle = COL.white; x.fillRect(0, 0, CW, CH);
      x.fillStyle = COL.wine; x.font = font(600, 64, FONT.display); x.textAlign = 'left'; x.fillText('Tu feed', 70, STATUS + 120);
      x.fillStyle = COL.muted; x.font = font(400, 40, FONT.body); x.fillText('Planificado y con estética propia', 70, STATUS + 185);
      var tw = (CW - 6) / 3, th = tw * 1.25, gy = STATUS + 260 - ease(seg(p, 0.55, 1)) * 520;
      var order = [1, 2, 0, 3, 8, 4, 6, 5, 7, 2, 1, 3, 0, 8, 4];
      for (var i = 0; i < 15; i++) {
        var t = ease(seg(p, i * 0.035, i * 0.035 + 0.25));
        var cx = (i % 3) * (tw + 3), cy = gy + Math.floor(i / 3) * (th + 3);
        x.save(); x.globalAlpha = t; x.translate(cx + tw / 2, cy + th / 2); x.scale(0.85 + 0.15 * t, 0.85 + 0.15 * t); x.translate(-tw / 2, -th / 2);
        tile(order[i] + (i > 8 ? 0 : 0), 0, 0, tw, th); x.restore();
      }
    },
    carrusel: function (p) {
      x.fillStyle = COL.white; x.fillRect(0, 0, CW, CH);
      var hy = STATUS + 90;
      x.fillStyle = COL.paper; x.beginPath(); x.arc(110, hy, 50, 0, Math.PI * 2); x.fill(); x.strokeStyle = COL.rose; x.lineWidth = 5; x.stroke();
      starPath(110, hy, 22); x.fillStyle = COL.accent; x.fill();
      x.fillStyle = COL.wine; x.font = font(600, 42, FONT.display); x.textAlign = 'left'; x.fillText(B.handle, 185, hy + 14);
      var slides = [
        { cover: true, title: '5 claves para que tu marca se vea profesional' },
        { n: '01', t: 'Definí tu paleta de colores' }, { n: '02', t: 'Elegí dos tipografías' },
        { n: '03', t: 'Usá tu logo siempre igual' }, { n: '04', t: 'Repetí tus elementos gráficos' },
        { n: '05', t: 'Hablá con el mismo tono' }, { cta: true, t: 'Guardalo para después' },
      ];
      var sy = hy + 90, sh = CW * 1.25, pos = ease(p) * (slides.length - 1);
      slides.forEach(function (sl, i) {
        var sx = (i - pos) * CW;
        if (sx > CW || sx < -CW) return;
        x.save(); x.translate(sx, sy); x.beginPath(); x.rect(0, 0, CW, sh); x.clip();
        if (sl.cover) {
          x.fillStyle = COL.accent; x.fillRect(0, 0, CW, sh);
          swirl([-20, sh * 0.85, 300, sh * 0.6, 600, sh * 1.05, CW + 20, sh * 0.7], 'rgba(255,255,255,.35)', 5);
          x.fillStyle = COL.white; x.font = font(600, 104, FONT.display); wrapText(sl.title, 90, sh * 0.32, CW - 180, 118);
          x.font = font(500, 40, FONT.body); x.globalAlpha = 0.85; x.fillText('Deslizá →', 90, sh - 90); x.globalAlpha = 1;
        } else if (sl.cta) {
          x.fillStyle = COL.wine; x.fillRect(0, 0, CW, sh);
          starPath(CW / 2, sh * 0.36, 90); x.fillStyle = COL.accent; x.fill();
          x.fillStyle = COL.white; x.font = font(600, 84, FONT.display); x.textAlign = 'center'; wrapText(sl.t, CW / 2, sh * 0.58, CW - 240, 100, 'center');
          x.font = font(500, 40, FONT.body); x.fillStyle = COL.rose; x.fillText('@' + B.handle, CW / 2, sh * 0.82);
        } else {
          x.fillStyle = COL.paper; x.fillRect(0, 0, CW, sh);
          swirl([-20, sh * 0.2, 300, -40, 700, sh * 0.35, CW + 20, sh * 0.1], COL.rose, 4);
          x.fillStyle = COL.accent; x.font = font(700, 240, FONT.display); x.textAlign = 'left'; x.fillText(sl.n, 90, sh * 0.45);
          x.fillStyle = COL.wine; x.font = font(600, 92, FONT.display); wrapText(sl.t, 90, sh * 0.62, CW - 180, 106);
          x.fillStyle = COL.line; rr(90, sh * 0.86, CW - 180, 14, 7); x.fill();
          x.fillStyle = COL.accent; rr(90, sh * 0.86, (CW - 180) * (i / (slides.length - 1)), 14, 7); x.fill();
        }
        x.restore();
      });
      var dy = sy + sh + 60;
      slides.forEach(function (sl, i) {
        var on = Math.round(pos) === i;
        x.fillStyle = on ? COL.accent : COL.line; x.beginPath(); x.arc(CW / 2 + (i - 3) * 36, dy, on ? 11 : 8, 0, Math.PI * 2); x.fill();
      });
      x.strokeStyle = COL.wine; x.lineWidth = 6; x.lineJoin = 'round';
      // Íconos: corazón, comentario, compartir, guardar
      x.beginPath(); x.moveTo(110, dy + 20); x.bezierCurveTo(60, dy - 30, 40, dy + 50, 110, dy + 80); x.bezierCurveTo(180, dy + 50, 160, dy - 30, 110, dy + 20); x.fillStyle = COL.accent; x.fill();
      x.beginPath(); x.arc(250, dy + 40, 34, 0.3, Math.PI * 2 - 0.1); x.stroke();
      x.beginPath(); x.moveTo(340, dy + 10); x.lineTo(420, dy + 40); x.lineTo(340, dy + 70); x.closePath(); x.stroke();
      x.beginPath(); x.moveTo(1040, dy + 5); x.lineTo(1100, dy + 5); x.lineTo(1100, dy + 85); x.lineTo(1070, dy + 60); x.lineTo(1040, dy + 85); x.closePath(); x.stroke();
      x.fillStyle = COL.wine; x.font = font(600, 40, FONT.display); x.textAlign = 'left'; x.fillText(B.handle, 70, dy + 170);
      x.font = font(400, 40, FONT.body); x.fillText('Guardá este carrusel ✦', 70 + x.measureText(B.handle).width + 260, dy + 170);
    },
    video: function (p) {
      var g = x.createLinearGradient(0, 0, 0, CH); g.addColorStop(0, '#EBB6BE'); g.addColorStop(0.55, '#C2506F'); g.addColorStop(1, '#4A0E22');
      x.fillStyle = g; x.fillRect(0, 0, CW, CH);
      var t = ease(p);
      // Escena: formas que se mueven como cortes de cámara
      x.fillStyle = 'rgba(255,255,255,.18)'; x.beginPath(); x.arc(CW * (0.3 + t * 0.4), CH * 0.32, 340, 0, Math.PI * 2); x.fill();
      x.fillStyle = 'rgba(110,21,48,.35)'; rr(CW * (0.55 - t * 0.35), CH * 0.42, 520, 700, 60); x.fill();
      swirl([-40, CH * (0.62 - t * 0.1), CW * 0.3, CH * 0.45, CW * 0.6, CH * 0.8, CW + 40, CH * 0.55], 'rgba(255,255,255,.4)', 6);
      // Barra de progreso del reel
      x.fillStyle = 'rgba(255,255,255,.35)'; rr(60, STATUS + 40, CW - 120, 10, 5); x.fill();
      x.fillStyle = COL.white; rr(60, STATUS + 40, (CW - 120) * Math.max(0.02, t), 10, 5); x.fill();
      x.font = font(600, 46, FONT.display); x.textAlign = 'left'; x.fillText('Reels', 70, STATUS + 140);
      var secs = Math.round(t * 15);
      x.textAlign = 'right'; x.font = font(500, 38, FONT.body); x.fillText('0:' + String(secs).padStart(2, '0') + ' / 0:15', CW - 70, STATUS + 140);
      // Subtítulos palabra por palabra
      var words = ['Así', 'se', 've', 'un', 'reel', 'con', 'tu', 'estilo', '✦'];
      var n = Math.min(words.length, Math.floor(t * (words.length + 1)));
      var line1 = words.slice(0, 5), line2 = words.slice(5);
      x.font = font(700, 96, FONT.display); x.textAlign = 'left';
      [line1, line2].forEach(function (ln, li) {
        var widths = ln.map(function (w) { return x.measureText(w + ' ').width; });
        var total = widths.reduce(function (a, b) { return a + b; }, 0), px = (CW - total) / 2, py = CH * 0.6 + li * 130;
        ln.forEach(function (w, wi) {
          var idx = li * 5 + wi; if (idx >= n) return;
          if (idx === n - 1) { x.fillStyle = COL.accent; rr(px - 14, py - 88, widths[wi] - 4, 116, 18); x.fill(); }
          x.fillStyle = COL.white; x.fillText(w, px, py); px += widths[wi];
        });
      });
      // Columna de acciones
      [0, 1, 2].forEach(function (i) { x.fillStyle = 'rgba(255,255,255,.9)'; x.beginPath(); x.arc(CW - 110, CH * 0.62 + i * 170, 46, 0, Math.PI * 2); x.fill(); });
      starPath(CW - 110, CH * 0.62, 26); x.fillStyle = COL.accent; x.fill();
      x.fillStyle = COL.white; x.font = font(600, 44, FONT.display); x.textAlign = 'left'; x.fillText('@' + B.handle, 70, CH * 0.86);
      x.font = font(400, 38, FONT.body); x.fillText('Edición, subtítulos y portada ✦', 70, CH * 0.86 + 64);
      // Línea de tiempo de edición
      var ty = CH * 0.93;
      for (var c = 0; c < 6; c++) { x.fillStyle = ['#F4D3D8', '#E8A9B5', '#B3164F', '#F4D3D8', '#6E1530', '#E8A9B5'][c]; rr(70 + c * 175, ty, 165, 70, 12); x.fill(); }
      x.fillStyle = COL.white; x.fillRect(70 + (CW - 140) * t, ty - 20, 6, 110);
    },
    logo: function (p) {
      x.fillStyle = COL.paper; x.fillRect(0, 0, CW, CH);
      var cy = CH * 0.4, t = ease(p);
      x.strokeStyle = 'rgba(232,169,181,.55)'; x.lineWidth = 2;
      for (var gx = 0; gx <= CW; gx += 90) { x.beginPath(); x.moveTo(gx, STATUS); x.lineTo(gx, CH); x.stroke(); }
      for (var gy = STATUS; gy <= CH; gy += 90) { x.beginPath(); x.moveTo(0, gy); x.lineTo(CW, gy); x.stroke(); }
      x.strokeStyle = COL.rose; x.lineWidth = 4;
      x.beginPath(); x.arc(CW / 2, cy - 40, 360 * Math.min(1, t * 2), 0, Math.PI * 2); x.stroke();
      x.beginPath(); x.arc(CW * 0.84, cy - 150, 120 * Math.min(1, t * 2), 0, Math.PI * 2); x.stroke();
      x.fillStyle = COL.muted; x.font = font(600, 36, FONT.display); x.textAlign = 'left';
      x.fillText('LOGOTIPO', 70, STATUS + 110);
      var letters = Math.round(seg(p, 0.08, 0.62) * B.wordmark.length);
      var starS = ease(seg(p, 0.62, 0.78));
      wordmark(CW / 2, cy + 30, 128, COL.accent, seg(p, 0.75, 0.85) > 0 ? COL.wine : null, letters, starS);
      if (letters < B.wordmark.length) {
        x.font = font(600, 128, FONT.display); var full = x.measureText(B.wordmark).width, part = x.measureText(B.wordmark.slice(0, letters)).width;
        x.fillStyle = COL.accent; x.fillRect(CW / 2 - full / 2 + part + 6, cy - 70, 8, 120);
      }
      var vt = ease(seg(p, 0.82, 1));
      [[COL.accent, COL.white], [COL.wine, COL.rose], [COL.pink, COL.accent]].forEach(function (v, i) {
        var bw = 320, bx = 75 + i * (bw + 30), by = CH * 0.62 + (1 - vt) * 120;
        x.save(); x.globalAlpha = vt; x.fillStyle = v[0]; rr(bx, by, bw, 400, 28); x.fill();
        wordmark(bx + bw / 2, by + 215, 38, v[1], null); x.restore();
      });
      x.globalAlpha = 1;
      x.fillStyle = COL.muted; x.font = font(500, 34, FONT.body); x.textAlign = 'center';
      x.fillText('Principal · Secundaria · Sobre color', CW / 2, CH * 0.62 + 480);
    },
    identidad: function (p) {
      x.fillStyle = COL.paper; x.fillRect(0, 0, CW, CH);
      var t = ease(p);
      x.fillStyle = COL.wine; x.font = font(600, 76, FONT.display); x.textAlign = 'left'; x.fillText('Guía de marca', 70, STATUS + 140);
      wordmark(CW - 230, STATUS + 130, 44, COL.accent, null);
      x.fillStyle = COL.muted; x.font = font(600, 32, FONT.display); x.fillText('PALETA', 70, STATUS + 250);
      var sw = [COL.accent, COL.burgundy, COL.rose, COL.soft, COL.wine];
      var hex = [C.accent, '#6E1530', C.highlight, C.accentSoft, C.ink];
      sw.forEach(function (c, i) {
        var h = 520 * ease(seg(p, i * 0.08, i * 0.08 + 0.35)), bx = 70 + i * 210;
        x.fillStyle = c; rr(bx, STATUS + 290, 190, Math.max(10, h), 26); x.fill();
        if (h > 300) { x.fillStyle = i > 1 && i < 4 ? COL.wine : COL.white; x.font = font(500, 28, FONT.body); x.save(); x.translate(bx + 40, STATUS + 290 + h - 40); x.rotate(-Math.PI / 2); x.fillText(hex[i].toUpperCase(), 0, 0); x.restore(); }
      });
      var ty = STATUS + 940, tt = ease(seg(p, 0.35, 0.6));
      x.globalAlpha = tt;
      x.fillStyle = COL.muted; x.font = font(600, 32, FONT.display); x.fillText('TIPOGRAFÍAS', 70, ty);
      x.fillStyle = COL.wine; x.font = font(600, 220, FONT.display); x.fillText('Aa', 70, ty + 240);
      x.fillStyle = COL.accent; x.font = 'italic 400 230px ' + FONT.serif; x.fillText('Aa', 600, ty + 240);
      x.fillStyle = COL.muted; x.font = font(500, 34, FONT.body); x.fillText('Poppins', 80, ty + 310); x.fillText('Instrument Serif', 610, ty + 310);
      x.globalAlpha = ease(seg(p, 0.55, 0.8));
      x.fillStyle = COL.muted; x.font = font(600, 32, FONT.display); x.fillText('ELEMENTOS', 70, ty + 440);
      swirl([70, ty + 620, 300, ty + 470, 450, ty + 760, 700, ty + 560], COL.accent, 5);
      starPath(880, ty + 600, 80); x.fillStyle = COL.accent; x.fill();
      x.globalAlpha = ease(seg(p, 0.75, 1));
      var mw = (CW - 180) / 3;
      for (var i = 0; i < 3; i++) tile([1, 0, 8][i], 70 + i * (mw + 20), ty + 760, mw, mw * 1.25);
      x.globalAlpha = 1;
    },
  };

  function statusBar(dark) {
    var mid = STATUS * 0.56;
    var d = new Date(), time = d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
    x.fillStyle = dark ? COL.white : '#111'; x.textBaseline = 'middle'; x.textAlign = 'center';
    x.font = font(600, STATUS * 0.43, '-apple-system, "SF Pro Text", ' + FONT.body); x.fillText(time, CW * 0.19, mid);
    var u = STATUS / 10, bw = u * 6.6, bh = u * 3.2, bx = CW * 0.915 - bw;
    x.globalAlpha = 0.35; rr(bx, mid - bh / 2, bw, bh, bh * 0.32); x.fill(); x.globalAlpha = 1;
    rr(bx, mid - bh / 2, bw * 0.62, bh, bh * 0.32); x.fill();
    x.font = font(600, STATUS * 0.34, FONT.body); x.textAlign = 'right'; x.fillText('4G', bx - u, mid);
    for (var i = 0; i < 4; i++) { var hh = bh * (0.38 + i * 0.2); x.globalAlpha = i === 3 ? 0.3 : 1; rr(bx - u * 5.2 - (3 - i) * u * 1.5, mid + bh / 2 - hh, u * 0.95, hh, 2); x.fill(); }
    x.globalAlpha = 1; x.textBaseline = 'alphabetic';
  }

  function drawShot(k, alpha) {
    var fn = SCREENS[k]; if (!fn) return;
    x.save(); x.globalAlpha = alpha; fn(progress[k] || 0); x.restore();
  }
  var screenTex = null, dirty = true;
  function redraw() {
    x.save();
    x.globalAlpha = 1; x.fillStyle = COL.white; x.fillRect(0, 0, CW, CH);
    if (prev && fade < 1) drawShot(prev, 1);
    drawShot(cur, prev && fade < 1 ? fade : 1);
    statusBar(cur === 'video');
    x.restore();
    if (screenTex) screenTex.needsUpdate = true;
    dirty = true;
  }
  var fadeTween = null;
  function setScreen(k) {
    if (k === cur) return;
    if (fadeTween) fadeTween.kill();
    prev = cur; cur = k; fade = 0;
    if (window.gsap && !reduce) {
      var o = { f: 0 };
      fadeTween = window.gsap.to(o, { f: 1, duration: 0.45, ease: 'power1.out', onUpdate: function () { fade = o.f; redraw(); }, onComplete: function () { prev = null; fade = 1; fadeTween = null; redraw(); } });
    } else { prev = null; fade = 1; redraw(); }
  }
  function setProgress(k, p) {
    if (Math.abs((progress[k] || 0) - p) < 0.0008) return;
    progress[k] = p;
    if (k === cur || k === prev) redraw();
  }
  // Redibuja cuando cargan las tipografías.
  if (document.fonts && document.fonts.load) {
    Promise.all(['600 40px Poppins', '700 40px Poppins', '500 40px Poppins', '400 40px "DM Sans"', 'italic 400 40px "Instrument Serif"'].map(function (f) {
      return document.fonts.load(f).catch(function () {});
    })).then(redraw);
  }
  redraw();

  /* =====================================================================
     Escena 3D: celular + tarjeta de marca
     ===================================================================== */
  var THREE = window.THREE;
  var renderer, scene, camera, phone, card, pxToWorld = 0.002, phoneY = 0;
  var P = { x: 0, rotationY: -20, rotationX: 5, rotationZ: -2, scale: 1 };
  var K = { x: 0, y: 0, rotationY: -12, s: 0 };

  function squircle(w, h, r, n) {
    var s = new THREE.Shape(), pts = [];
    var corners = [[w / 2 - r, h / 2 - r, 0], [-w / 2 + r, h / 2 - r, Math.PI / 2], [-w / 2 + r, -h / 2 + r, Math.PI], [w / 2 - r, -h / 2 + r, Math.PI * 1.5]];
    corners.forEach(function (c) { for (var k = 0; k <= n; k++) { var a = c[2] + (k / n) * Math.PI / 2; pts.push(new THREE.Vector2(c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r)); } });
    s.setFromPoints(pts);
    return s;
  }
  function planeFromShape(shape) {
    var g = new THREE.ShapeGeometry(shape, 24);
    g.computeBoundingBox();
    var bb = g.boundingBox, pos = g.attributes.position, uv = g.attributes.uv;
    for (var i = 0; i < pos.count; i++) uv.setXY(i, (pos.getX(i) - bb.min.x) / (bb.max.x - bb.min.x), (pos.getY(i) - bb.min.y) / (bb.max.y - bb.min.y));
    uv.needsUpdate = true;
    return g;
  }
  function envMap() {
    var es = new THREE.Scene();
    es.add(new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20), new THREE.MeshBasicMaterial({ color: 0xf3dcd8, side: THREE.BackSide })));
    function panel(w, h, px, py, pz, c) {
      var m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(c[0], c[1], c[2]), side: THREE.DoubleSide }));
      m.position.set(px, py, pz); m.lookAt(0, 0, 0); es.add(m);
    }
    panel(8, 2, 0, 6, 2, [4, 3.8, 3.8]);
    panel(2, 9, -7, 0, 3, [3, 2.4, 2.5]);
    panel(2, 9, 7, 1, 2, [2.4, 1.6, 1.8]);
    panel(6, 4, 0, -1, 8, [1.3, 1.1, 1.1]);
    var pm = new THREE.PMREMGenerator(renderer);
    var tex = pm.fromScene(es, 0.04).texture; pm.dispose();
    return tex;
  }
  function cardTexture() {
    var c = document.createElement('canvas'); c.width = 1000; c.height = 1350;
    var g = c.getContext('2d');
    g.fillStyle = '#F7E2DF'; g.fillRect(0, 0, 1000, 1350);
    g.strokeStyle = COL.accent; g.lineWidth = 3; g.lineCap = 'round';
    g.beginPath(); g.moveTo(-20, 260); g.bezierCurveTo(200, 40, 330, 380, 560, 160); g.bezierCurveTo(700, 30, 820, 120, 1020, 40); g.stroke();
    g.beginPath(); g.moveTo(-20, 1180); g.bezierCurveTo(240, 980, 420, 1340, 680, 1120); g.bezierCurveTo(820, 1000, 900, 1080, 1020, 1000); g.stroke();
    // Reutiliza el dibujo del logotipo sobre este lienzo.
    var saved = x; x = g; wordmark(500, 700, 110, COL.accent, COL.wine); x = saved;
    var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 8;
    return t;
  }
  function build3d() {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio || 1, 1.5), 2.5));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0;
    scene = new THREE.Scene();
    scene.environment = envMap();
    camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
    var key = new THREE.DirectionalLight(0xffffff, 0.6); key.position.set(-2, 3, 4); scene.add(key);
    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    var W = 0.719, H = 1.502, D = 0.0825, R = 0.118, BEV = 0.022, zf = D / 2;
    phone = new THREE.Group();
    // Marco en tono rosa dorado, como la estética de la marca.
    var frame = new THREE.MeshStandardMaterial({ color: 0xe0b2a8, metalness: 1, roughness: 0.28, envMapIntensity: 1.1 });
    var body = new THREE.ExtrudeGeometry(squircle(W - BEV * 2, H - BEV * 2, R - BEV, 14), { depth: D - BEV * 2, bevelEnabled: true, bevelThickness: BEV, bevelSize: BEV, bevelSegments: 10, curveSegments: 14 });
    body.translate(0, 0, -(D - BEV * 2) / 2);
    phone.add(new THREE.Mesh(body, frame));
    var glass = new THREE.MeshPhysicalMaterial({ color: 0x050407, roughness: 0.06, clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 1.1 });
    var gl = new THREE.Mesh(planeFromShape(squircle(W - 0.03, H - 0.03, R - 0.012, 14)), glass); gl.position.z = zf + 0.0006; phone.add(gl);
    screenTex = new THREE.CanvasTexture(scr);
    screenTex.encoding = THREE.sRGBEncoding; screenTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    var sm = new THREE.Mesh(planeFromShape(squircle(SW, SH, 0.088, 14)), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }));
    sm.position.z = zf + 0.0012; phone.add(sm);
    var refl = new THREE.Mesh(planeFromShape(squircle(SW, SH, 0.088, 14)), new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.12, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, envMapIntensity: 0.22 }));
    refl.position.z = zf + 0.0016; phone.add(refl);
    var island = new THREE.Mesh(planeFromShape(squircle(0.2, 0.058, 0.029, 8)), new THREE.MeshBasicMaterial({ color: 0x030304 }));
    island.position.set(0, SH / 2 - 0.05, zf + 0.002); phone.add(island);
    scene.add(phone);

    // Tarjeta de marca (como la de su primera publicación)
    card = new THREE.Group();
    var cw = 1.0, chh = 1.35, cd = 0.05;
    var cbody = new THREE.ExtrudeGeometry(squircle(cw, chh, 0.02, 4), { depth: cd, bevelEnabled: false });
    cbody.translate(0, 0, -cd / 2);
    card.add(new THREE.Mesh(cbody, new THREE.MeshStandardMaterial({ color: 0xf3d6d2, roughness: 0.7, metalness: 0 })));
    // La cara de la tarjeta no recibe luz: así conserva los colores reales de la marca.
    var face = new THREE.Mesh(planeFromShape(squircle(cw, chh, 0.02, 4)), new THREE.MeshBasicMaterial({ map: cardTexture(), toneMapped: false }));
    face.position.z = cd / 2 + 0.001; card.add(face);
    card.visible = false;
    scene.add(card);
    resize();
  }

  function phonePx() { var vh = stage.clientHeight; return mobile() ? vh * 0.42 : Math.min(vh * 0.74, 700); }
  function resize() {
    if (!renderer) return;
    var w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    var visH = 1.502 * h / phonePx();
    camera.position.set(0, 0, visH / (2 * Math.tan((camera.fov * Math.PI / 180) / 2)));
    camera.updateProjectionMatrix();
    pxToWorld = visH / h;
    phoneY = mobile() ? h * 0.19 * pxToWorld : 0;
    if (floorEl) floorEl.style.top = (mobile() ? h * 0.31 : h * 0.5) + phonePx() / 2 + 6 + 'px';
    dirty = true;
  }
  function render() {
    if (!renderer || !dirty) return;
    dirty = false;
    phone.position.set(P.x * pxToWorld, phoneY, 0);
    phone.rotation.set(-P.rotationX * Math.PI / 180, P.rotationY * Math.PI / 180, -P.rotationZ * Math.PI / 180);
    phone.scale.setScalar(P.scale);
    card.visible = K.s > 0.01 && !mobile();
    card.scale.setScalar(Math.max(0.001, K.s) * 0.95);
    card.position.set(K.x * pxToWorld, 0.1 + K.y, -0.55);
    card.rotation.set(0.05, K.rotationY * Math.PI / 180, 0.04);
    renderer.render(scene, camera);
  }

  function phoneSide(ch) { return ch.dataset.text === 'right' ? 'left' : 'right'; }
  function pose(ch) {
    var m = mobile(), side = phoneSide(ch), w = window.innerWidth;
    var px = m ? 0 : side === 'right' ? w * 0.2 : -w * 0.21;
    if (ch.classList.contains('ch--hero')) return { x: px, rotationY: m ? -10 : -22, rotationX: 6, rotationZ: -3, scale: m ? 0.95 : 1.03 };
    return { x: px, rotationY: m ? (side === 'left' ? 10 : -10) : side === 'left' ? 24 : -24, rotationX: 4, rotationZ: side === 'left' ? -1.5 : 1.5, scale: 1 };
  }
  function cardPose(ch) {
    var side = phoneSide(ch), ph = pose(ch).x, w = window.innerWidth;
    return { x: ph + (side === 'right' ? w * 0.12 : -w * 0.12), rotationY: side === 'right' ? -26 : 26, s: ch.dataset.card ? 1 : 0 };
  }

  /* =====================================================================
     Capítulos
     ===================================================================== */
  var active = -1;
  function show(i) {
    if (i === active) return;
    active = i;
    var ch = chapters[i];
    setScreen(ch.dataset.screen);
    for (var d = 0; d < dots.length; d++) dots[d].classList.toggle('on', d === i);
    if (act) act.innerHTML = i === 0 ? '<b>' + B.wordmark + '</b> · ' + B.tagline.toLowerCase() : '<b>' + ch.dataset.act + '</b>';
    if (glow) {
      glow.style.setProperty('--glow', ch.dataset.glow);
      glow.style.setProperty('--gx', phoneSide(ch) === 'left' ? '32%' : '68%');
    }
    root.style.setProperty('--glow', ch.dataset.glow);
    if (flat) flat.classList.toggle('is-left', phoneSide(ch) === 'left');
    if (renderer) {
      var cp = cardPose(ch);
      if (window.gsap && !reduce) window.gsap.to(K, { x: cp.x, rotationY: cp.rotationY, s: cp.s, duration: 0.9, ease: 'power3.out', onUpdate: function () { dirty = true; } });
      else { K.x = cp.x; K.rotationY = cp.rotationY; K.s = cp.s; dirty = true; }
    }
  }
  function chapterProgress(ch) {
    var r = ch.getBoundingClientRect(), vh = window.innerHeight;
    return Math.min(1, Math.max(0, (vh * 0.55 - r.top) / (r.height - vh * 0.6)));
  }

  var use3d = !reduce && !!THREE;
  if (use3d) {
    try { build3d(); } catch (e) { use3d = false; renderer = null; }
  }
  if (!use3d) {
    root.classList.add('no-webgl');
    if (flat) flat.appendChild(scr);
  }
  window.addEventListener('resize', function () { resize(); if (window.ScrollTrigger) window.ScrollTrigger.refresh(); });

  var gsap = window.gsap, ST = window.ScrollTrigger;

  /* =====================================================================
     Apertura: compu sola → caen los dispositivos → aparecen los títulos
     → se van los dispositivos. La sección queda fija mientras pasa.
     ===================================================================== */
  (function initIntro() {
    var intro = document.querySelector('[data-intro]');
    if (!intro || !gsap || !ST || reduce) return;
    gsap.registerPlugin(ST);
    var scene = intro.querySelector('[data-scene]');
    var title = intro.querySelector('[data-intro-title]');
    var hint = intro.querySelector('[data-intro-hint]');
    var laptop = intro.querySelector('[data-laptop]');
    var drops = gsap.utils.toArray(intro.querySelectorAll('[data-drop]'));
    var pops = gsap.utils.toArray(intro.querySelectorAll('[data-pop]'));
    // Al principio el título no ocupa lugar visual: la escena baja y se agranda
    // para que la compu quede centrada en la pantalla.
    // Sube la mitad del alto del título (que todavía no se ve) y un poco más,
    // porque la compu está en la parte de abajo de la escena.
    var startY = function () { return -(title.offsetHeight / 2 + 12) - scene.offsetHeight * 0.12; };
    var fromTop = function (i) { return -(window.innerHeight * 1.5 + i * 60); };

    gsap.set(title.children, { opacity: 0, y: 30 });
    gsap.set(drops, { y: fromTop, rotation: function (i) { return i % 2 ? 18 : -14; } });
    gsap.set(pops, { scale: 0, opacity: 0 });
    // En celular la escena es chica: al principio la compu se muestra más grande.
    gsap.set(scene, { y: startY, scale: function () { return mobile() ? 1.5 : 1.12; } });

    var tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: { trigger: intro, start: 'top top', end: '+=280%', scrub: 0.8, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
    });
    tl.to(hint, { opacity: 0, duration: 0.3 }, 0)
      // 1. Caen los dispositivos desde arriba y se acomodan.
      .to(drops, { y: 0, rotation: 0, duration: 1.2, stagger: 0.14, ease: 'power3.out' }, 0.1)
      .to(pops, { scale: 1, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.8)' }, 0.9)
      // 2. La escena sube a su lugar y aparecen el título y los botones.
      .to(scene, { y: 0, scale: 1, duration: 1, ease: 'power2.inOut' }, 1.6)
      .to(title.children, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, 1.9)
      // Pausa para leer.
      .to({}, { duration: 0.8 })
      // 3. Se van la compu y los dispositivos.
      .addLabel('salida')
      .to(drops, { y: function (i) { return -window.innerHeight * (1 + i * 0.08); }, rotation: function (i) { return i % 2 ? 22 : -22; }, opacity: 0, duration: 1, stagger: 0.06, ease: 'power2.in' }, 'salida')
      .to(pops, { scale: 0, opacity: 0, duration: 0.5, ease: 'power2.in' }, 'salida')
      .to(laptop, { y: function () { return window.innerHeight * 0.7; }, scale: 0.9, opacity: 0, duration: 1, ease: 'power2.in' }, 'salida+=0.15')
      // El título baja al centro para que no quede un hueco antes de los trabajos.
      .to(title, { y: function () { return scene.offsetHeight * 0.42; }, duration: 1, ease: 'power2.inOut' }, 'salida+=0.3');
  })();
  if (!gsap || !ST || reduce || !use3d) {
    // Versión sin animaciones de giro: cambia la pantalla según el capítulo
    // y el contenido avanza con el scroll.
    if (use3d) { var p0 = pose(chapters[0]); P.x = p0.x; P.rotationY = -12; P.rotationX = 3; P.rotationZ = 0; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          var i = chapters.indexOf(e.target); show(i);
          if (use3d) { var pp = pose(chapters[i]); P.x = pp.x; P.rotationY = pp.rotationY; dirty = true; }
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    chapters.forEach(function (c) { io.observe(c); });
    var onScroll = function () {
      chapters.forEach(function (ch) { setProgress(ch.dataset.screen, chapterProgress(ch)); });
      render();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    show(0); onScroll();
    if (use3d) { dirty = true; (function loop() { render(); requestAnimationFrame(loop); })(); }
    return;
  }

  gsap.registerPlugin(ST);
  gsap.ticker.add(render);
  var mark = function () { dirty = true; };
  var p0 = pose(chapters[0]);
  P.x = p0.x; P.rotationY = p0.rotationY; P.rotationX = p0.rotationX; P.rotationZ = p0.rotationZ; P.scale = p0.scale;
  gsap.set(floorEl, { x: P.x });

  // Entre capítulos el celular cruza la pantalla y gira hacia el texto.
  chapters.forEach(function (ch, i) {
    if (i === 0) return;
    var prevCh = chapters[i - 1];
    var get = function (c, k) { return function () { return pose(c)[k]; }; };
    gsap.timeline({ scrollTrigger: { trigger: ch, start: 'top 92%', end: 'top 38%', scrub: 0.9, invalidateOnRefresh: true } })
      .fromTo(P, { x: get(prevCh, 'x'), rotationY: get(prevCh, 'rotationY'), rotationX: get(prevCh, 'rotationX'), rotationZ: get(prevCh, 'rotationZ'), scale: get(prevCh, 'scale') },
        { x: get(ch, 'x'), rotationY: get(ch, 'rotationY'), rotationX: get(ch, 'rotationX'), rotationZ: get(ch, 'rotationZ'), scale: get(ch, 'scale'), ease: 'power2.inOut', immediateRender: false, onUpdate: mark }, 0)
      .fromTo(floorEl, { x: get(prevCh, 'x') }, { x: get(ch, 'x'), ease: 'power2.inOut', immediateRender: false }, 0);
  });

  // Media vuelta suave del celular al empezar a bajar (muestra el canto).
  gsap.to(P, { rotationY: '+=10', yoyo: true, repeat: 1, ease: 'sine.inOut', onUpdate: mark,
    scrollTrigger: { trigger: chapters[0], start: 'top top', end: 'bottom 60%', scrub: 1 } });

  if (bigword) gsap.to(bigword, { opacity: 0.04, scale: 0.86, ease: 'none', scrollTrigger: { trigger: chapters[1], start: 'top bottom', end: 'top 30%', scrub: true } });
  var paths = stage.querySelectorAll('.swirls path');
  gsap.fromTo(paths, { strokeDashoffset: 2600 }, { strokeDashoffset: 0, ease: 'none', stagger: 0.2, scrollTrigger: { trigger: '.story', start: 'top top', end: 'bottom bottom', scrub: 1 } });

  chapters.forEach(function (ch, i) {
    ST.create({ trigger: ch, start: 'top 55%', end: 'bottom 55%', onToggle: function (self) { if (self.isActive) show(i); } });
    ST.create({ trigger: ch, start: 'top 45%', end: 'bottom 80%', scrub: 0.6,
      onUpdate: function (self) { setProgress(ch.dataset.screen, self.progress); },
      onLeaveBack: function () { setProgress(ch.dataset.screen, 0); } });
    var copy = ch.querySelector('.copy');
    if (i < chapters.length - 1) {
      gsap.fromTo(copy, { opacity: 1, y: 0 }, { opacity: 0, y: -40, ease: 'power1.in', immediateRender: false, scrollTrigger: { trigger: ch, start: 'bottom 108%', end: 'bottom 86%', scrub: true } });
    }
    if (i > 0) {
      gsap.from(copy.children, { y: 34, opacity: 0, filter: 'blur(6px)', duration: 0.8, stagger: 0.08, ease: 'expo.out',
        scrollTrigger: { trigger: ch, start: 'top 70%', toggleActions: 'play none none reverse' } });
    }
  });

  // Palabras grandes que se "escriben" al aparecer.
  document.querySelectorAll('[data-scramble]').forEach(function (el) {
    var final = el.dataset.scramble, chars = 'abcdefghijklmnopqrstuvwxyz✦';
    ST.create({ trigger: el, start: 'top 80%', once: true, onEnter: function () {
      var o = { p: 0 };
      gsap.to(o, { p: 1, duration: 0.9, ease: 'none', onUpdate: function () {
        var n = Math.floor(o.p * final.length), out = '';
        for (var k = 0; k < final.length; k++) out += k < n || final[k] === ' ' ? final[k] : chars[Math.floor(Math.random() * chars.length)];
        el.textContent = out;
      }, onComplete: function () { el.textContent = final; } });
    } });
  });

  // Secciones de abajo: aparecen suave.
  gsap.utils.toArray('.rv').forEach(function (el) {
    gsap.from(el, { y: 36, opacity: 0, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } });
  });

  window.addEventListener('load', function () { resize(); ST.refresh(); });
  show(0);
})();
