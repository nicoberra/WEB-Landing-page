// Contenido de Instagram de NB.studio: posts (1080×1350), historias (1080×1920)
// y portadas de historias destacadas (1080×1920).
// Uso: node modelos/pages-by-nb/instagram/contenido.mjs
// Genera las imágenes en instagram/posts, instagram/historias e instagram/destacadas.
// Los textos están acá abajo; las capturas salen de ../assets. Nunca inventar precios ni datos.
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

// Playwright: sirve tanto en la compu de Nicolás como en la nube.
const candidatos = [
  process.env.PLAYWRIGHT_MJS,
  path.join(process.env.APPDATA || '', 'npm/node_modules/@playwright/cli/node_modules/playwright/index.mjs'),
  path.join(process.env.APPDATA || '', 'npm/node_modules/playwright/index.mjs'),
  '/opt/node22/lib/node_modules/playwright/index.mjs',
].filter((p) => p && existsSync(p));
if (!candidatos.length) throw new Error('No encontré Playwright. Instalalo con: npm i -g playwright');
const { chromium } = await import(pathToFileURL(candidatos[0]).href);

const here = path.dirname(fileURLToPath(import.meta.url));
const img = (f) => `data:image/webp;base64,${readFileSync(path.join(here, '../assets', f)).toString('base64')}`;

const C = { ink: '#0F1440', blue: '#2B44FF', yellow: '#FFD23F', pink: '#FF8FC7', mint: '#5EE6B0', cream: '#FFF8EE', muted: '#4A5072' };
const SOFT = { pink: '#FFDDEE', mint: '#CDF7E6', yellow: '#FFF1C2', blue: '#DDE2FF', cream: C.cream };
const WA = '11 3175-1517';

const logo = (size = 90, light = true) => `<span class="logo" style="--L:${size}px;color:${light ? '#fff' : C.ink}">NB<span class="dot">.</span><span class="st" style="color:${light ? C.yellow : C.blue}">studio</span></span>`;
const star = (cls = '', style = '') => `<svg class="star ${cls}" style="${style}" viewBox="0 0 24 24"><path d="M12 1.5c.9 6.4 4.1 9.6 10.5 10.5-6.4.9-9.6 4.1-10.5 10.5C11.1 16.1 7.9 12.9 1.5 12 7.9 11.1 11.1 7.9 12 1.5Z" fill="currentColor"/></svg>`;
const phone = (f, cls = '', style = '') => `<div class="phone ${cls}" style="${style}"><div class="pv"><img src="${img(f)}"></div></div>`;
const browser = (f, cls = '', style = '') => `<div class="br ${cls}" style="${style}"><div class="bar"><i></i><i></i><i></i></div><div class="bv"><img src="${img(f)}"></div></div>`;
const chips = (items, colors = [C.yellow, C.pink, C.mint, '#DDE2FF']) => `<div class="chips">${items.map((t, i) => `<span style="background:${colors[i % colors.length]}">${t}</span>`).join('')}</div>`;
const list = (items) => `<ul class="list">${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;
const foot = (dark = false, right = '') => `<div class="foot ${dark ? 'foot--d' : ''}"><span>${logo(34, dark)}</span>${right ? `<span class="url">${right}</span>` : ''}</div>`;

// ─── Datos reales (copiados de config.mjs) ───────────────────────────────────
const works = [
  { id: 'suplemarket', name: 'Suple <em>Market</em>', plain: 'Suple Market', kind: 'Suplementos deportivos', what: 'Tienda online con combos, ofertas y pagos con Mercado Pago.', tags: ['🛒 E-commerce', '🎁 Combos', '🔥 Ofertas'], web: 'web-suplemarket.webp', cel: 'celfull-suplemarket.webp', url: 'suplemarket.com.ar', bg: 'pink' },
  { id: 'sanou', name: 'San <em>Ou</em>', plain: 'San Ou', kind: 'Herramientas hidráulicas', what: 'Tienda online con catálogo completo y precios mayoristas.', tags: ['🛒 E-commerce', '📦 Catálogo', '💼 Mayoristas'], web: 'web-sanou.webp', cel: 'celfull-sanou.webp', url: 'sanou.com.ar', bg: 'yellow' },
  { id: 'virtualshop', name: 'Virtual Shop <em>Baires</em>', plain: 'Virtual Shop Baires', kind: 'Productos importados', what: 'Tienda online con carrito y categorías para encontrar todo rápido.', tags: ['🛒 E-commerce', '🧺 Carrito', '🗂️ Categorías'], web: 'web-virtualshop.webp', cel: 'cel-virtualshop.webp', url: 'virtualshopbaires.com.ar', bg: 'mint' },
  { id: 'nutrisigo', name: 'Nutri<em>Sigo</em>', plain: 'NutriSigo', kind: 'Software para nutricionistas', what: 'Un CRM con panel para la nutricionista y app para sus pacientes.', tags: ['📊 CRM', '🖥️ Panel', '📱 App para pacientes'], web: 'web-nutrisigo.webp', cel: 'cel-nutrisigo.webp', url: 'nutrisigo.com', bg: 'ink' },
  { id: 'jesica-cuevas', name: 'Jesica <em>Cuevas</em>', plain: 'Jesica Cuevas', kind: 'Nutricionista', what: 'Landing page con una tiendita de recetarios y cobro con Mercado Pago.', tags: ['✨ Landing', '📚 Recetarios', '💳 Mercado Pago'], web: 'web-jesica-cuevas-v2.webp', cel: 'cel-jesica-cuevas-v2.webp', url: '', bg: 'mint' },
  { id: 'dn-estetica', name: 'DN <em>Estética</em>', plain: 'DN Estética', kind: 'Estética facial y corporal', what: 'Landing page con un buscador de tratamientos.', tags: ['✨ Landing', '🔍 Buscador de tratamientos'], web: 'web-daniela-bassano.webp', cel: 'cel-daniela-bassano.webp', url: '', bg: 'pink' },
  { id: 'digitalbysofia', name: 'digitalby<em>sofia</em>', plain: 'digitalbysofia_', kind: 'Diseño de contenido', what: 'Landing page y portfolio para mostrar su trabajo.', tags: ['✨ Landing', '🎨 Portfolio'], web: 'web-digitalbysofia.webp', cel: 'cel-digitalbysofia.webp', url: '', bg: 'yellow' },
];

const products = [
  { id: 'landing', num: '01', name: 'Landing <em>page</em>', tag: 'La más pedida', pitch: 'Una página que presenta lo que hacés y lleva a la gente directo a escribirte.', ideal: 'Profesionales, servicios, cursos y lanzamientos.', features: ['Diseño único con tu marca', 'Botón y mensajes de WhatsApp', 'Animaciones a medida', 'Lista para Google y redes'], cel: 'cel-daniela-bassano.webp', bg: 'blue' },
  { id: 'tienda', num: '02', name: 'Web <em>e-commerce</em>', tag: 'Vendé 24/7', pitch: 'Tu tienda online con carrito, pagos con Mercado Pago y productos que se ven increíbles.', ideal: 'Marcas con productos físicos o digitales.', features: ['Catálogo y carrito', 'Cobros con Mercado Pago', 'Productos digitales con descarga', 'Pedidos por WhatsApp'], cel: 'celfull-suplemarket.webp', bg: 'pink' },
  { id: 'crm', num: '03', name: '<em>CRM</em> a medida', tag: '¡Nuevo!', pitch: 'Un sistema simple para ordenar clientes, consultas, pedidos y ventas en un solo lugar.', ideal: 'Negocios que reciben muchas consultas y no quieren perder ninguna.', features: ['Fichas de clientes', 'Seguimiento de consultas y ventas', 'Recordatorios y estados', 'Hecho a la medida de tu negocio'], cel: 'cel-nutrisigo.webp', bg: 'mint' },
];

const bgClass = (bg) => (bg === 'ink' ? 's--ink' : bg === 'blue' ? 's--blue' : '');
const bgStyle = (bg) => (bg === 'ink' || bg === 'blue' ? '' : `background:${SOFT[bg]}`);

// ─── POSTS (1080×1350) ───────────────────────────────────────────────────────
const casePost = (w) => {
  const dark = w.bg === 'ink';
  return `<section class="s ${bgClass(w.bg)}" style="${bgStyle(w.bg)}">
    <p class="hand ${dark ? 'hand--y' : ''}">Caso real ✨</p>
    <h2 class="h ${dark ? 'h--w' : ''}">${w.name}</h2>
    <p class="kind">${w.kind}</p>
    <p class="p ${dark ? 'p--w' : ''}">${w.what}</p>
    ${chips(w.tags)}
    ${browser(w.web, 'br-case')}
    ${phone(w.cel, `ph-case ${w.cel.startsWith('celfull') ? 'ph-scroll' : ''}`)}
    ${foot(dark, w.url ? `🌐 ${w.url}` : 'Hecha por NB.studio')}
  </section>`;
};

const posts = [
  ['01-hola', `<section class="s s--blue">
    <div class="blob b1"></div><div class="blob b2"></div>${star('st1')}${star('st2')}
    <div class="center">
      <p class="hand hand--y" style="font-size:64px">Hola, soy Nico 👋</p>
      <h1 class="big" style="margin-top:20px">Hago webs que <em>venden</em></h1>
      <p class="sub">Landing pages · Tiendas online · CRM</p>
      <span class="sticker" style="background:${C.mint}">Seguime para ver webs reales</span>
    </div>
    ${foot(true, '💬 ' + WA)}
  </section>`],
  ...works.slice(0, 4).map((w, i) => [`0${i + 2}-caso-${w.id}`, casePost(w)]),
  ['06-senales', `<section class="s s--cream">
    <p class="hand">¿Te pasa?</p>
    <h2 class="h">5 señales de que tu negocio necesita <em>web</em></h2>
    <ol class="senales">
      <li><b style="background:${C.yellow}">1</b>Respondés lo mismo por mensaje todo el día.</li>
      <li><b style="background:${C.pink}">2</b>Vendés solo por Instagram y dependés del algoritmo.</li>
      <li><b style="background:${C.mint}">3</b>Te buscan en Google y no aparecés.</li>
      <li><b style="background:#DDE2FF">4</b>Tu catálogo son fotos sueltas o un PDF.</li>
      <li><b style="background:${C.blue};color:#fff">5</b>Se te pierden consultas en el chat.</li>
    </ol>
    <span class="tag" style="background:${C.yellow}">Guardalo 📌</span>
    ${foot(false, '¿Cuántas marcaste? 👇')}
  </section>`],
  ['07-que-web-necesitas', `<section class="s s--ink">
    <p class="hand hand--y">Te ayudo a elegir</p>
    <h2 class="h h--w">¿Qué web <em>necesitás</em>?</h2>
    <div class="cards">
      ${products.map((p, i) => `<div class="card" style="background:${[C.yellow, C.pink, C.mint][i]}">
        <span class="cn">${p.num}</span>
        <h3>${p.name.replace(/<\/?em>/g, '')}</h3>
        <p>${p.ideal}</p>
      </div>`).join('')}
    </div>
    <p class="p p--w" style="margin-top:44px;max-width:none">¿No sabés cuál? Escribime y lo vemos juntos 💬</p>
    ${foot(true, '💬 ' + WA)}
  </section>`],
  ['08-todas-incluyen', `<section class="s" style="background:${SOFT.mint}">
    <p class="hand">Todas incluyen</p>
    <h2 class="h">Nada de webs <em>aburridas</em></h2>
    <div class="perks">
      ${[['📱', 'Perfecta en el celu'], ['⚡', 'Carga rapidísimo'], ['💬', 'WhatsApp a un toque'], ['🔎', 'Lista para Google'], ['✨', 'Animaciones'], ['🌐', 'Tu dominio']]
        .map(([e, t]) => `<div class="perk"><span>${e}</span>${t}</div>`).join('')}
    </div>
    ${foot(false, '100% a medida')}
  </section>`],
  ['09-caso-jesica-cuevas', casePost(works[4])],
];

// ─── HISTORIAS (1080×1920). Zona segura: 250 px arriba y 350 px abajo libres ─
const storyWork = (w) => {
  const dark = w.bg === 'ink';
  return `<section class="s st ${bgClass(w.bg)}" style="${bgStyle(w.bg)}">
    <div class="safe">
      <p class="hand ${dark ? 'hand--y' : ''}">Clientes 💛</p>
      <h2 class="h ${dark ? 'h--w' : ''}" style="font-size:104px">${w.name}</h2>
      <p class="kind">${w.kind}</p>
      ${phone(w.cel, `ph-story ${w.cel.startsWith('celfull') ? 'ph-scroll' : ''}`)}
      ${chips(w.tags.slice(0, 3))}
      ${w.url ? `<span class="url url--big">🌐 ${w.url}</span>` : ''}
    </div>
  </section>`;
};

const storyProduct = (p) => {
  const dark = p.bg === 'blue';
  return `<section class="s st ${bgClass(p.bg)}" style="${bgStyle(p.bg)}">
    <div class="safe">
      <p class="hand ${dark ? 'hand--y' : ''}">Servicios · ${p.num}</p>
      <h2 class="h ${dark ? 'h--w' : ''}" style="font-size:112px">${p.name}</h2>
      <p class="p ${dark ? 'p--w' : ''}" style="max-width:none">${p.pitch}</p>
      <div class="st-list ${dark ? 'st-list--w' : ''}">${list(p.features)}</div>
      ${phone(p.cel, `ph-prod ${p.cel.startsWith('celfull') ? 'ph-scroll' : ''}`)}
      <span class="ideal">Ideal para: ${p.ideal}</span>
    </div>
  </section>`;
};

const historias = [
  ['01-hola', `<section class="s st s--blue">
    <div class="blob b1"></div><div class="blob b2" style="bottom:500px"></div>${star('st1', 'top:300px')}${star('st2', 'bottom:520px')}
    <div class="safe center-v">
      ${logo(140)}
      <p class="hand hand--y" style="font-size:76px;margin-top:110px">Hola, soy Nico 👋</p>
      <h1 class="big" style="font-size:132px;margin-top:10px">Hago webs para <em>emprendedores</em></h1>
      <p class="sub" style="font-size:44px">Que se vean lindas, carguen rápido y te traigan clientes.</p>
    </div>
  </section>`],
  ['02-mira-esta-tienda', `<section class="s st s--ink">
    <div class="safe">
      <p class="hand hand--y" style="font-size:70px">Mirá esta tienda 👀</p>
      <h2 class="h h--w" style="font-size:100px">Suple <em>Market</em></h2>
      ${phone('celfull-suplemarket.webp', 'ph-hero ph-scroll')}
      <span class="sticker sticker--abs" style="background:${C.yellow}">Hecha por NB.studio</span>
      <p class="hand hand--y tap">Entrá y recorrela 👇</p>
    </div>
  </section>`],
  ['03-encuesta', `<section class="s st" style="background:${C.cream}">
    ${star('st1', `top:330px;color:${C.pink}`)}${star('st2', `bottom:520px;color:${C.mint}`)}
    <div class="safe center-v">
      <p class="hand" style="font-size:70px">Pregunta rápida</p>
      <h2 class="h" style="font-size:150px;text-align:center">¿Tu negocio tiene <em>web</em>?</h2>
      <div class="poll-space"></div>
      <p class="hand" style="font-size:60px">Votá acá arriba 👆</p>
    </div>
  </section>`],
  ['04-proceso', `<section class="s st" style="background:${SOFT.yellow}">
    <div class="safe">
      <p class="hand">Cómo trabajo</p>
      <h2 class="h" style="font-size:108px">Tu web en <em>4 pasos</em></h2>
      <ol class="steps steps--st">
        <li><b style="background:${C.yellow}">1</b><div><h3>Charlamos</h3><p>Me contás tu proyecto, qué vendés y a quién le hablás.</p></div></li>
        <li><b style="background:${C.pink}">2</b><div><h3>Diseño</h3><p>Armo una propuesta con tus colores, fotos y textos.</p></div></li>
        <li><b style="background:${C.mint}">3</b><div><h3>Ajustamos</h3><p>La revisamos juntos y cambiamos lo que haga falta.</p></div></li>
        <li><b style="background:${C.blue};color:#fff">4</b><div><h3>¡Online!</h3><p>La publico con tu dominio y te enseño a usarla.</p></div></li>
      </ol>
    </div>
  </section>`],
  ['05-precios', `<section class="s st" style="background:${C.yellow}">
    ${star('st1', `top:310px;color:#fff`)}
    <div class="safe">
      <p class="hand">Precios</p>
      <h2 class="h" style="font-size:118px">¿Cuánto sale una <em>web</em>?</h2>
      <p class="p" style="max-width:none;color:${C.ink}">Cada web se arma a la medida de tu negocio, así que el precio depende de lo que necesites.</p>
      <div class="price-rows">
        ${products.map((p) => `<div class="pr"><span>${p.name.replace(/<\/?em>/g, '')}</span><b>Consultá 💬</b></div>`).join('')}
      </div>
      <span class="cta cta--st">Pedí tu propuesta sin compromiso</span>
      <p class="hand tap" style="color:${C.ink}">WhatsApp ${WA}</p>
    </div>
  </section>`],
  ['06-preguntame', `<section class="s st" style="background:${SOFT.pink}">
    ${star('st1', `top:320px;color:${C.blue}`)}${star('st2', `bottom:520px;color:${C.yellow}`)}
    <div class="safe center-v">
      <p class="hand" style="font-size:70px">Cajita de preguntas</p>
      <h2 class="h" style="font-size:130px;text-align:center">Preguntame lo que quieras sobre <em>webs</em></h2>
      <div class="poll-space"></div>
      <p class="hand" style="font-size:56px">Respondo todas 💬</p>
    </div>
  </section>`],
  ['07-contacto', `<section class="s st s--blue">
    <div class="blob b1"></div><div class="blob b2" style="bottom:520px"></div>${star('st1', 'top:320px')}${star('st2', 'bottom:540px')}
    <div class="safe center-v">
      <h2 class="big" style="font-size:150px">¿Hacemos tu <em>web</em>?</h2>
      <p class="sub" style="font-size:46px">Escribime y te paso una propuesta sin compromiso.</p>
      <span class="cta" style="font-size:54px;margin-top:70px">💬 ${WA}</span>
      <p class="sub sub--s" style="font-size:40px">o tocá el link de la bio</p>
      <div style="margin-top:90px">${logo(110)}</div>
    </div>
  </section>`],
  ...products.map((p, i) => [`${String(i + 8).padStart(2, '0')}-servicio-${p.id}`, storyProduct(p)]),
  ...works.map((w, i) => [`${String(i + 11).padStart(2, '0')}-cliente-${w.id}`, storyWork(w)]),
];

// ─── PORTADAS DE DESTACADAS (1080×1920, el ícono queda en el centro) ─────────
const ICON = {
  trabajos: '<rect x="2.5" y="3.5" width="19" height="13" rx="2.2"/><path d="M8 21h8M12 16.5V21"/>',
  clientes: '<path d="M12 20.5s-8-4.6-8-10.4A4.4 4.4 0 0 1 12 7.3a4.4 4.4 0 0 1 8 2.8c0 5.8-8 10.4-8 10.4Z"/>',
  servicios: '<path d="M12 2.5c.8 5.3 3.2 7.7 8.5 8.5-5.3.8-7.7 3.2-8.5 8.5-.8-5.3-3.2-7.7-8.5-8.5 5.3-.8 7.7-3.2 8.5-8.5Z"/>',
  precios: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.4"/>',
  proceso: '<path d="m3.5 6 1.6 1.6L8 4.7M3.5 12l1.6 1.6L8 10.7M3.5 18l1.6 1.6L8 16.7M11.5 6h9M11.5 12h9M11.5 18h9"/>',
  preguntas: '<circle cx="12" cy="12" r="9.5"/><path d="M9.2 9.3a2.9 2.9 0 0 1 5.6 1c0 2-2.8 2.6-2.8 4.2"/><path d="M12 17.6v.1"/>',
  contacto: '<path d="M20.5 11.6a8.4 8.4 0 0 1-12.3 7.5L3.5 20.5l1.4-4.5a8.5 8.5 0 1 1 15.6-4.4Z"/>',
};
const destacadas = [
  ['trabajos', C.blue, '#fff'],
  ['clientes', C.pink, C.ink],
  ['servicios', C.mint, C.ink],
  ['precios', C.yellow, C.ink],
  ['proceso', C.cream, C.blue],
  ['preguntas', C.ink, C.yellow],
  ['contacto', C.blue, C.yellow],
].map(([id, bg, fg]) => [id, `<section class="s st hl" style="background:${bg}">
  <svg viewBox="0 0 24 24" fill="none" stroke="${fg}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICON[id]}</svg>
</section>`]);

// ─── Estilos (mismo sistema visual que la web y el carrusel) ─────────────────
const css = `
*{box-sizing:border-box;margin:0}
body{font-family:'Plus Jakarta Sans',sans-serif;color:${C.ink};overflow:hidden}
.s{position:relative;width:1080px;height:1350px;padding:110px 90px 0;overflow:hidden;background:${C.cream}}
.s.st{height:1920px;padding:0 80px}
.safe{position:absolute;left:80px;right:80px;top:250px;bottom:350px}
.center-v{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.s--blue{background:${C.blue};color:#fff}.s--ink{background:${C.ink};color:#fff}
.logo{--L:90px;position:relative;display:inline-block;font:400 var(--L)/.9 'Shrikhand';white-space:nowrap;margin-right:calc(var(--L)*2.15)}
.logo .dot{color:${C.mint}}
.logo .st{position:absolute;left:calc(100% + 2px);top:calc(var(--L)*.02);font:400 calc(var(--L)*.78)/1 'Yellowtail';transform-origin:0 70%;transform:rotate(-10deg)}
.center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 80px 80px}
.center-v .logo,.center .logo{margin-right:0;transform:translateX(calc(var(--L)*-1.07))}
.big{font:800 128px/.98 'Bricolage Grotesque';letter-spacing:-.04em}
.big em,.h em{font-style:normal;white-space:nowrap}
.s--blue .big em{color:${C.yellow}}
.h em{color:${C.blue}} .s--ink .h em,.h--w em,.s--blue .h em{color:${C.yellow}}
.sub{font-size:38px;font-weight:600;margin-top:34px;opacity:.95}.sub--s{font-size:30px;margin-top:22px;opacity:.85}
.sticker{display:inline-block;margin-top:50px;font:800 36px/1 'Plus Jakarta Sans';color:${C.ink};padding:18px 30px;border-radius:99px;border:4px solid ${C.ink};box-shadow:0 7px 0 ${C.ink};transform:rotate(-4deg)}
.cta{display:inline-block;margin-top:50px;background:${C.yellow};color:${C.ink};font:800 44px/1 'Plus Jakarta Sans';padding:30px 44px;border-radius:99px;border:4px solid ${C.ink};box-shadow:0 9px 0 ${C.ink}}
.blob{position:absolute;border-radius:50%}
.b1{width:620px;height:620px;right:-220px;top:-220px;background:rgba(255,255,255,.12)}
.b2{width:360px;height:360px;left:-140px;bottom:120px;background:rgba(255,143,199,.45)}
.star{position:absolute;width:80px;color:${C.yellow};filter:drop-shadow(0 4px 0 ${C.ink})}
.st1{left:110px;top:170px}.st2{right:130px;bottom:300px;width:56px;color:#fff}
.hand{font:400 54px/1 'Gochi Hand';color:${C.blue};transform:rotate(-3deg);transform-origin:left;margin-bottom:22px}
.center-v .hand{transform-origin:center}
.hand--y{color:${C.yellow}}
.h{font:800 92px/1 'Bricolage Grotesque';letter-spacing:-.035em;max-width:900px}
.h--w{color:#fff}
.kind{font:700 34px/1.2 'Plus Jakarta Sans';color:${C.blue};margin-top:14px;text-transform:uppercase;letter-spacing:.06em}
.s--ink .kind,.s--blue .kind{color:${C.mint}}
.p{font-size:36px;line-height:1.38;color:${C.muted};margin-top:24px;max-width:860px}
.p--w{color:rgba(255,255,255,.85)}
.chips{display:flex;flex-wrap:wrap;gap:16px;margin-top:30px}
.chips span{font:700 28px/1 'Plus Jakarta Sans';color:${C.ink};padding:16px 22px;border-radius:99px;border:4px solid ${C.ink};box-shadow:0 5px 0 ${C.ink}}
.s--ink .chips span{border-color:#fff;box-shadow:0 5px 0 rgba(255,255,255,.5)}
.tag{position:absolute;right:90px;top:110px;font:800 30px/1 'Plus Jakarta Sans';padding:16px 26px;border-radius:99px;border:4px solid ${C.ink};box-shadow:0 6px 0 ${C.ink};transform:rotate(5deg)}
.list{list-style:none;padding:0;margin-top:40px;display:grid;gap:22px;max-width:560px}
.list li{position:relative;padding-left:62px;font-size:34px;font-weight:600;line-height:1.25}
.list li::before{content:'✓';position:absolute;left:0;top:0;width:44px;height:44px;border-radius:50%;background:${C.ink};color:#fff;font-size:24px;font-weight:800;display:grid;place-items:center}
.phone{background:${C.ink};padding:10px;border-radius:46px;border:4px solid ${C.ink};box-shadow:0 12px 0 rgba(15,20,64,.35)}
.s--ink .phone{border-color:#fff;box-shadow:0 12px 0 ${C.yellow}}
.pv{aspect-ratio:9/19;overflow:hidden;border-radius:36px;background:#fff}
.pv img{width:100%;display:block}
.ph-scroll .pv img{transform:translateY(-12%)}
.br{position:absolute;background:#fff;border:4px solid ${C.ink};border-radius:26px;overflow:hidden;box-shadow:0 12px 0 ${C.ink}}
.s--ink .br{border-color:#fff;box-shadow:0 12px 0 ${C.yellow}}
.bar{display:flex;gap:10px;padding:14px 18px;border-bottom:4px solid ${C.ink}}
.bar i{width:18px;height:18px;border-radius:50%;background:${C.pink};border:2px solid ${C.ink}}.bar i:nth-child(2){background:${C.yellow}}.bar i:nth-child(3){background:${C.mint}}
.bv{height:380px;overflow:hidden}.bv img{width:100%;display:block}
.br-case{left:60px;bottom:150px;width:700px;transform:rotate(-3deg)}
.ph-case{position:absolute;right:70px;bottom:120px;width:270px;transform:rotate(5deg)}
.foot{position:absolute;left:90px;right:90px;bottom:48px;display:flex;align-items:center;gap:24px;font-weight:700;font-size:28px}
.foot .logo{margin-right:calc(var(--L)*2.15)}
.url{margin-left:auto;background:${C.ink};color:#fff;padding:14px 24px;border-radius:99px;font:700 28px/1 'Plus Jakarta Sans'}
.foot--d .url{background:#fff;color:${C.ink}}
.url--big{display:table;margin:34px auto 0;font-size:34px;padding:20px 32px;white-space:nowrap}
.s--ink .url--big{background:#fff;color:${C.ink}}
.senales{list-style:none;padding:0;margin-top:56px;display:grid;gap:30px}
.senales li{display:flex;gap:28px;align-items:center;font:700 38px/1.25 'Plus Jakarta Sans'}
.senales b{flex:none;width:96px;height:96px;border-radius:50%;display:grid;place-items:center;font:800 44px/1 'Bricolage Grotesque';border:4px solid ${C.ink};box-shadow:0 6px 0 ${C.ink}}
.cards{display:grid;gap:26px;margin-top:50px}
.card{position:relative;color:${C.ink};border:4px solid #fff;border-radius:32px;padding:34px 40px 34px 150px;box-shadow:0 8px 0 rgba(255,255,255,.35)}
.card .cn{position:absolute;left:38px;top:36px;font:800 64px/1 'Bricolage Grotesque'}
.card h3{font:800 52px/1 'Bricolage Grotesque';letter-spacing:-.02em}
.card p{font-size:31px;line-height:1.3;margin-top:10px;font-weight:600}
.perks{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:60px}
.perk{display:flex;flex-direction:column;gap:16px;background:#fff;border:4px solid ${C.ink};border-radius:30px;padding:30px 30px;box-shadow:0 7px 0 ${C.ink};font:800 38px/1.1 'Bricolage Grotesque'}
.perk span{font-size:58px;line-height:1}
.ph-story{width:400px;margin:44px auto 0}
.st .chips{justify-content:center;margin-top:46px}
.st .chips span{font-size:32px;padding:18px 26px}
.ph-hero{width:470px;margin:50px auto 0}
.sticker--abs{position:absolute;right:0;top:560px;transform:rotate(6deg)}
.tap{position:absolute;left:0;right:0;bottom:0;text-align:center;transform:rotate(-2deg);transform-origin:center;font-size:64px;margin:0}
.poll-space{height:420px}
.steps{list-style:none;padding:0;display:grid}
.steps--st{margin-top:90px;gap:70px}
.steps li{display:flex;gap:36px;align-items:center}
.steps b{flex:none;width:150px;height:150px;border-radius:50%;display:grid;place-items:center;font:800 64px/1 'Bricolage Grotesque';border:4px solid ${C.ink};box-shadow:0 7px 0 ${C.ink}}
.steps h3{font:800 64px/1.05 'Bricolage Grotesque'}
.steps p{font-size:38px;line-height:1.3;color:${C.muted};margin-top:8px}
.price-rows{display:grid;gap:22px;margin-top:60px}
.pr{display:flex;align-items:center;justify-content:space-between;background:#fff;border:4px solid ${C.ink};border-radius:28px;padding:34px 38px;box-shadow:0 7px 0 ${C.ink};font:800 50px/1 'Bricolage Grotesque'}
.pr b{font:800 32px/1 'Plus Jakarta Sans';background:${C.ink};color:#fff;padding:16px 22px;border-radius:99px}
.cta--st{display:block;text-align:center;margin-top:70px;background:${C.blue};color:#fff;font-size:42px}
.st-list .list{max-width:600px;margin-top:50px}
.st-list .list li{font-size:40px;padding-left:70px}
.st-list .list li::before{width:50px;height:50px}
.st-list--w .list li::before{background:${C.yellow};color:${C.ink}}
.ph-prod{position:absolute;right:-20px;bottom:40px;width:310px;transform:rotate(6deg)}
.s--blue .phone{border-color:#fff;box-shadow:0 12px 0 ${C.yellow}}
.ideal{position:absolute;left:0;bottom:0;max-width:560px;font:700 32px/1.3 'Plus Jakarta Sans';background:#fff;color:${C.ink};border:4px solid ${C.ink};border-radius:26px;padding:22px 26px;box-shadow:0 6px 0 ${C.ink}}
.hl{display:grid;place-items:center}
.hl svg{width:560px;height:560px}
`;

const fonts = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Plus+Jakarta+Sans:wght@400..800&family=Gochi+Hand&family=Shrikhand&family=Yellowtail&display=swap';
const grupos = [
  ['posts', posts, 1350],
  ['historias', historias, 1920],
  ['destacadas', destacadas, 1920],
];

const soloGrupo = process.argv[2];
// Si falta el navegador de Playwright, usa el Chrome instalado en la compu.
const b = await chromium.launch().catch(() => chromium.launch({ channel: 'chrome' }));
let total = 0;
for (const [carpeta, piezas, alto] of grupos) {
  if (soloGrupo && soloGrupo !== carpeta) continue;
  const dir = path.join(here, carpeta);
  mkdirSync(dir, { recursive: true });
  const p = await b.newPage({ viewport: { width: 1080, height: alto } });
  for (const [nombre, html] of piezas) {
    await p.setContent(`<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${fonts}"><style>${css}</style></head><body>${html}</body></html>`);
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(400);
    await p.screenshot({ path: path.join(dir, `${carpeta === 'destacadas' ? 'destacada' : carpeta === 'posts' ? 'post' : 'historia'}-${nombre}.png`) });
    total++;
  }
  await p.close();
}
await b.close();
console.log(total, 'imágenes generadas');
