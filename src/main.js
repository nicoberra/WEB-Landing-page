// Interacciones de la página. Sin dependencias.
// Todo funciona sin JavaScript (contenido visible, enlaces y preguntas
// desplegables); este archivo suma menú móvil, filtros, copiar y validación.
(function () {
  'use strict';
  document.documentElement.classList.add('js');


  // ---------- Encabezado y menú móvil ----------
  var header = document.querySelector('[data-header]');
  var toggle = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-menu]');

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 861px)').addEventListener('change', function () {
      setMenu(false);
    });
  }

  // ---------- Movimiento al hacer scroll ----------
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var progressBar = document.querySelector('[data-scroll-progress]');
  var parallaxItems = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  var progressSections = Array.prototype.slice.call(document.querySelectorAll('[data-progress]'));
  var lastY = window.scrollY;
  var ticking = false;

  function update() {
    ticking = false;
    var y = window.scrollY;
    var vh = window.innerHeight;
    var max = root.scrollHeight - vh;

    if (header) {
      header.classList.toggle('is-scrolled', y > 8);
      // Se esconde al bajar y vuelve al subir (nunca con el menú abierto).
      var menuOpen = toggle && toggle.getAttribute('aria-expanded') === 'true';
      header.classList.toggle('is-hidden', !menuOpen && y > 240 && y > lastY + 2);
      if (y < lastY - 2) header.classList.remove('is-hidden');
    }
    lastY = y;

    if (progressBar) progressBar.style.setProperty('--progress', max > 0 ? Math.min(1, y / max) : 0);

    if (reduceMotion) return;

    parallaxItems.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      var speed = parseFloat(el.getAttribute('data-parallax')) || 0;
      var offset = (rect.top + rect.height / 2 - vh / 2) * speed;
      el.style.setProperty('--parallax', offset.toFixed(1) + 'px');
    });

    progressSections.forEach(function (section) {
      var rect = section.getBoundingClientRect();
      var p = (vh * 0.75 - rect.top) / (rect.height * 0.7);
      section.style.setProperty('--progress', Math.max(0, Math.min(1, p)).toFixed(3));
    });
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(update);
    }
  }

  update();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);

  // Aparición de elementos al entrar en pantalla.
  var revealItems = document.querySelectorAll('[data-reveal]');
  if (root.classList.contains('motion') && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.04 }
    );
    revealItems.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    root.classList.remove('motion');
  }
  window.__motionReady = true;

  // Inclinación suave de tarjetas siguiendo el mouse (solo con mouse).
  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      card.addEventListener('pointermove', function (event) {
        var rect = card.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - 0.5;
        var y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--tilt-x', (-y * 6).toFixed(2) + 'deg');
        card.style.setProperty('--tilt-y', (x * 6).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  // ---------- Sección activa en el menú ----------
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav ul a[href^="#"]'));
  if ('IntersectionObserver' in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (link) {
      byId[link.getAttribute('href').slice(1)] = link;
    });
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = byId[entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) {
              l.removeAttribute('aria-current');
            });
            link.setAttribute('aria-current', 'true');
          } else if (link.getAttribute('aria-current')) {
            link.removeAttribute('aria-current');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  // ---------- Filtro de proyectos ----------
  var filters = document.querySelector('[data-filters]');
  if (filters) {
    filters.hidden = false;
    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-projects] [data-category]'));
    var status = document.querySelector('[data-filter-status]');
    filters.addEventListener('click', function (event) {
      var button = event.target.closest('[data-filter]');
      if (!button) return;
      var value = button.getAttribute('data-filter');
      filters.querySelectorAll('[data-filter]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === button));
      });
      var visible = 0;
      cards.forEach(function (card) {
        var show = value === '*' || card.getAttribute('data-category') === value;
        card.hidden = !show;
        if (show) visible++;
      });
      if (status) status.textContent = visible + (visible === 1 ? ' proyecto visible' : ' proyectos visibles');
    });
  }

  // ---------- Copiar email ----------
  document.querySelectorAll('[data-copy]').forEach(function (button) {
    var label = button.querySelector('[data-copy-label]');
    var original = label ? label.textContent : '';
    function done(text) {
      if (!label) return;
      label.textContent = text;
      setTimeout(function () {
        label.textContent = original;
      }, 2200);
    }
    button.addEventListener('click', function () {
      var value = button.getAttribute('data-copy');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(
          function () {
            done('Copiado');
          },
          function () {
            done('Copialo a mano');
          }
        );
      } else {
        done('Copialo a mano');
      }
    });
  });

  // ---------- Formulario de contacto ----------
  var form = document.querySelector('[data-contact-form]');
  if (!form) return;

  var formStatus = form.querySelector('[data-form-status]');
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var rules = {
    'cf-nombre': function (v) {
      if (!v) return 'Escribí tu nombre.';
      if (v.length < 2) return 'El nombre tiene que tener al menos 2 letras.';
    },
    'cf-email': function (v) {
      if (!v) return 'Escribí tu email para poder responderte.';
      if (!EMAIL.test(v)) return 'Revisá el email: debería tener el formato nombre@dominio.com.';
    },
    'cf-mensaje': function (v) {
      if (!v) return 'Contame brevemente qué necesitás.';
      if (v.length < 15) return 'Sumá un poco más de detalle (al menos 15 caracteres).';
    },
  };

  function validateField(input) {
    var rule = rules[input.id];
    if (!rule) return true;
    var message = rule(input.value.trim()) || '';
    var error = form.querySelector('[data-error-for="' + input.id + '"]');
    if (error) error.textContent = message;
    if (message) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
    return !message;
  }

  Object.keys(rules).forEach(function (id) {
    var input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('blur', function () {
      if (input.value.trim()) validateField(input);
    });
    input.addEventListener('input', function () {
      if (input.getAttribute('aria-invalid') === 'true') validateField(input);
    });
  });

  function showStatus(state, title, text) {
    formStatus.setAttribute('data-state', state);
    formStatus.innerHTML = '';
    var strong = document.createElement('strong');
    strong.textContent = title;
    var p = document.createElement('span');
    p.textContent = text;
    formStatus.appendChild(strong);
    formStatus.appendChild(p);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var firstInvalid = null;
    Object.keys(rules).forEach(function (id) {
      var input = document.getElementById(id);
      if (input && !validateField(input) && !firstInvalid) firstInvalid = input;
    });

    if (firstInvalid) {
      showStatus('error', 'Faltan datos', 'Revisá los campos marcados y volvé a intentar.');
      firstInvalid.focus();
      return;
    }

    var data = {
      nombre: form.elements.nombre.value.trim(),
      email: form.elements.email ? form.elements.email.value.trim() : '',
      tipo: form.elements.tipo.value,
      mensaje: form.elements.mensaje.value.trim(),
    };
    var mode = form.getAttribute('data-mode');
    var text =
      'Hola, soy ' + data.nombre + (data.email ? ' (' + data.email + ')' : '') + '.' +
      (data.tipo ? '\n' + (form.getAttribute('data-type-label') || 'Tipo de proyecto') + ': ' + data.tipo + '.' : '') +
      '\n\n' + data.mensaje;

    if (mode === 'whatsapp' || mode === 'email') {
      var target = form.getAttribute('data-target');
      var url =
        mode === 'whatsapp'
          ? 'https://wa.me/' + target + '?text=' + encodeURIComponent(text)
          : 'mailto:' + target + '?subject=' + encodeURIComponent('Consulta desde la web') + '&body=' + encodeURIComponent(text);
      showStatus(
        'ok',
        mode === 'whatsapp' ? 'Abrimos WhatsApp con tu mensaje' : 'Abrimos tu correo con el mensaje',
        'Revisalo y envialo desde ahí. Si no se abrió, usá los datos de contacto de esta sección.'
      );
      window.open(url, '_blank', 'noopener');
    } else {
      showStatus(
        'ok',
        'Datos completos',
        'Esto es una demostración: el mensaje no se envió ni se guardó. En un sitio real, acá se confirmaría el envío.'
      );
      form.reset();
    }
    formStatus.focus();
  });
})();
