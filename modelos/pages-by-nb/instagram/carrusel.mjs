// Carrusel de Instagram de NB.studio (1080×1350, formato 4:5).
// Uso: node modelos/pages-by-nb/instagram/carrusel.mjs
// Genera las placas en esta carpeta (placa-01.png, placa-02.png, ...).
// Los textos están acá abajo; las capturas salen de ../assets.
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const img = (f) => `data:image/webp;base64,${readFileSync(path.join(here, '../assets', f)).toString('base64')}`;

const C = { ink: '#0F1440', blue: '#2B44FF', yellow: '#FFD23F', pink: '#FF8FC7', mint: '#5EE6B0', cream: '#FFF8EE', muted: '#4A5072' };
const WA = '11 3175-1517';
const TOTAL = 9;

const logo = (size = 90, light = true) => `<span class="logo" style="--L:${size}px;color:${light ? '#fff' : C.ink}">NB<span class="dot">.</span><span class="st" style="color:${light ? C.yellow : C.blue}">studio</span></span>`;
const star = (cls = '') => `<svg class="star ${cls}" viewBox="0 0 24 24"><path d="M12 1.5c.9 6.4 4.1 9.6 10.5 10.5-6.4.9-9.6 4.1-10.5 10.5C11.1 16.1 7.9 12.9 1.5 12 7.9 11.1 11.1 7.9 12 1.5Z" fill="currentColor"/></svg>`;
const phone = (f, cls = '') => `<div class="phone ${cls}"><div class="pv"><img src="${img(f)}"></div></div>`;
const browser = (f, cls = '') => `<div class="br ${cls}"><div class="bar"><i></i><i></i><i></i></div><div class="bv"><img src="${img(f)}"></div></div>`;
const foot = (n, dark = false) => `<div class="foot ${dark ? 'foot--d' : ''}"><span>${logo(34, dark)}</span><span class="pg">${n}/${TOTAL}</span>${n < TOTAL ? '<span class="sw">Deslizá →</span>' : ''}</div>`;
const list = (items) => `<ul class="list">${items.map((t) => `<li>${t}</li>`).join('')}</ul>`;

const slides = [
  // 1 · Portada
  `<section class="s s--blue">
    <div class="blob b1"></div><div class="blob b2"></div>
    ${star('st1')}${star('st2')}
    <div class="center">
      ${logo(150)}
      <h1 class="big">Webs que <em>venden</em></h1>
      <p class="sub">Landing pages · Tiendas online · CRM</p>
      <span class="sticker" style="background:${C.mint}">100% a medida</span>
    </div>
    ${foot(1, true)}
  </section>`,
  // 2 · Hola
  `<section class="s s--cream">
    <p class="hand">Hola, soy Nico 👋</p>
    <h2 class="h">Hago páginas web para <em>emprendedores</em> y marcas con ganas de crecer.</h2>
    <p class="p">Lindas, rápidas en el celu y pensadas para que te escriban (y te compren).</p>
    <div class="chips"><span style="background:${C.yellow}">📱 Perfectas en el celu</span><span style="background:${C.pink}">⚡ Carga rapidísimo</span><span style="background:${C.mint}">💬 WhatsApp a un toque</span><span style="background:#DDE2FF">🔎 Listas para Google</span></div>
    ${browser('web-sanou.webp', 'br-hola')}
    ${foot(2)}
  </section>`,
  // 3 · Landing
  `<section class="s s--cream">
    <span class="tag" style="background:${C.yellow}">La más pedida</span>
    <p class="num">01</p>
    <h2 class="h">Landing <em>page</em></h2>
    <p class="p">Una página que presenta lo que hacés y lleva a la gente directo a escribirte.</p>
    ${list(['Diseño único con tu marca', 'Botón y mensajes de WhatsApp', 'Animaciones a medida', 'Lista para Google y redes'])}
    ${phone('cel-daniela-bassano.webp', 'ph-r')}
    ${foot(3)}
  </section>`,
  // 4 · E-commerce
  `<section class="s s--pink">
    <span class="tag" style="background:#fff">Vendé 24/7</span>
    <p class="num">02</p>
    <h2 class="h">Web <em>e-commerce</em></h2>
    <p class="p">Tu tienda online con carrito y cobros con Mercado Pago.</p>
    ${list(['Catálogo y carrito', 'Cobros con Mercado Pago', 'Productos digitales con descarga', 'Pedidos por WhatsApp'])}
    ${phone('celfull-suplemarket.webp', 'ph-r ph-scroll')}
    ${foot(4)}
  </section>`,
  // 5 · CRM
  `<section class="s s--mint">
    <span class="tag" style="background:${C.yellow}">¡Nuevo!</span>
    <p class="num">03</p>
    <h2 class="h"><em>CRM</em> a medida</h2>
    <p class="p">Ordená clientes, consultas, pedidos y ventas en un solo lugar. Sin perder ninguna venta.</p>
    ${list(['Fichas de clientes', 'Seguimiento de consultas y ventas', 'Recordatorios y estados', 'Hecho a la medida de tu negocio'])}
    ${browser('web-nutrisigo.webp', 'br-crm')}
    ${foot(5)}
  </section>`,
  // 6 · Tiendas hechas
  `<section class="s s--ink">
    <p class="hand hand--y">Webs que ya hice</p>
    <h2 class="h h--w">Tiendas <em>online</em></h2>
    <div class="trio">
      ${phone('celfull-suplemarket.webp', 't1')}
      ${phone('celfull-sanou.webp', 't2')}
      ${phone('cel-virtualshop.webp', 't3')}
    </div>
    <div class="names"><span>Suple Market</span><span>San Ou</span><span>Virtual Shop Baires</span></div>
    ${foot(6, true)}
  </section>`,
  // 7 · Landings hechas
  `<section class="s s--ink">
    <p class="hand hand--y">Webs que ya hice</p>
    <h2 class="h h--w">Landings y <em>sistemas</em></h2>
    <div class="trio">
      ${phone('cel-jesica-cuevas-v2.webp', 't1')}
      ${phone('cel-daniela-bassano.webp', 't2')}
      ${phone('cel-nutrisigo.webp', 't3')}
    </div>
    <div class="names"><span>Jesica Cuevas</span><span>DN Estética</span><span>NutriSigo</span></div>
    ${foot(7, true)}
  </section>`,
  // 8 · Proceso
  `<section class="s s--cream">
    <p class="hand">Cómo trabajo</p>
    <h2 class="h">De la idea a tu web en <em>4 pasos</em></h2>
    <ol class="steps">
      <li><b style="background:${C.yellow}">1</b><div><h3>Charlamos</h3><p>Me contás tu proyecto y a quién le hablás.</p></div></li>
      <li><b style="background:${C.pink}">2</b><div><h3>Diseño</h3><p>Armo una propuesta con tus colores y fotos.</p></div></li>
      <li><b style="background:${C.mint}">3</b><div><h3>Ajustamos</h3><p>La revisamos juntos hasta que te encante.</p></div></li>
      <li><b style="background:${C.blue};color:#fff">4</b><div><h3>¡Online!</h3><p>La publico con tu dominio y te enseño a usarla.</p></div></li>
    </ol>
    ${foot(8)}
  </section>`,
  // 9 · Cierre
  `<section class="s s--blue">
    <div class="blob b1"></div><div class="blob b2"></div>
    ${star('st1')}${star('st2')}
    <div class="center">
      <h2 class="big">¿Hacemos tu <em>web</em>?</h2>
      <p class="sub">Escribime y te paso una propuesta sin compromiso.</p>
      <span class="cta">💬 WhatsApp ${WA}</span>
      <p class="sub sub--s">o tocá el link de la bio</p>
      <div style="margin-top:40px">${logo(110)}</div>
    </div>
    ${foot(9, true)}
  </section>`,
];

const css = `
*{box-sizing:border-box;margin:0}
body{width:1080px;height:1350px;font-family:'Plus Jakarta Sans',sans-serif;color:${C.ink};overflow:hidden}
.s{position:relative;width:1080px;height:1350px;padding:110px 90px 0;overflow:hidden}
.s--blue{background:${C.blue};color:#fff}.s--cream{background:${C.cream}}.s--pink{background:#FFDDEE}.s--mint{background:#CDF7E6}.s--ink{background:${C.ink};color:#fff}
.logo{--L:90px;position:relative;display:inline-block;font:400 var(--L)/.9 'Shrikhand';white-space:nowrap;margin-right:calc(var(--L)*2.15)}
.logo .dot{color:${C.mint}}
.logo .st{position:absolute;left:calc(100% + 2px);top:calc(var(--L)*.02);font:400 calc(var(--L)*.78)/1 'Yellowtail';transform-origin:0 70%;transform:rotate(-10deg)}
.center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 80px 80px}
.center .logo{margin-right:0;margin-left:calc(-1 * var(--L)*2.15)} .center .logo{transform:translateX(calc(var(--L)*1.07))}
.big{font:800 128px/.98 'Bricolage Grotesque';letter-spacing:-.04em;margin-top:60px}
.big em,.h em{font-style:normal;position:relative;white-space:nowrap}
.s--blue .big em{color:${C.yellow}}
.h em{color:${C.blue}} .s--ink .h em,.h--w em{color:${C.yellow}}
.sub{font-size:38px;font-weight:600;margin-top:34px;opacity:.95}.sub--s{font-size:30px;margin-top:22px;opacity:.85}
.sticker{display:inline-block;margin-top:50px;font:800 36px/1 'Plus Jakarta Sans';color:${C.ink};padding:18px 30px;border-radius:99px;border:4px solid ${C.ink};box-shadow:0 7px 0 ${C.ink};transform:rotate(-4deg)}
.cta{display:inline-block;margin-top:50px;background:${C.yellow};color:${C.ink};font:800 44px/1 'Plus Jakarta Sans';padding:30px 44px;border-radius:99px;border:4px solid ${C.ink};box-shadow:0 9px 0 ${C.ink}}
.blob{position:absolute;border-radius:50%}
.b1{width:620px;height:620px;right:-220px;top:-220px;background:rgba(255,255,255,.12)}
.b2{width:360px;height:360px;left:-140px;bottom:120px;background:rgba(255,143,199,.45)}
.star{position:absolute;width:80px;color:${C.yellow};filter:drop-shadow(0 4px 0 ${C.ink})}
.st1{left:110px;top:170px}.st2{right:130px;bottom:300px;width:56px;color:#fff}
.hand{font:400 54px/1 'Gochi Hand';color:${C.blue};transform:rotate(-3deg);transform-origin:left;margin-bottom:26px}
.hand--y{color:${C.yellow}}
.h{font:800 92px/1 'Bricolage Grotesque';letter-spacing:-.035em;max-width:900px}
.h--w{color:#fff}
.p{font-size:36px;line-height:1.4;color:${C.muted};margin-top:30px;max-width:600px}
.s--cream .p{max-width:860px}
.chips{display:flex;flex-wrap:wrap;gap:20px;margin-top:60px}
.chips span{font:700 32px/1 'Plus Jakarta Sans';padding:22px 28px;border-radius:99px;border:4px solid ${C.ink};box-shadow:0 6px 0 ${C.ink}}
.tag{position:absolute;right:90px;top:110px;font:800 30px/1 'Plus Jakarta Sans';padding:16px 26px;border-radius:99px;border:4px solid ${C.ink};box-shadow:0 6px 0 ${C.ink};transform:rotate(5deg)}
.num{font:800 54px/1 'Bricolage Grotesque';color:${C.blue};margin-bottom:12px}
.list{list-style:none;padding:0;margin-top:40px;display:grid;gap:22px;max-width:560px}
.list li{position:relative;padding-left:62px;font-size:34px;font-weight:600;line-height:1.25}
.list li::before{content:'✓';position:absolute;left:0;top:0;width:44px;height:44px;border-radius:50%;background:${C.ink};color:#fff;font-size:24px;font-weight:800;display:grid;place-items:center}
.phone{background:${C.ink};padding:10px;border-radius:46px;border:4px solid ${C.ink};box-shadow:0 12px 0 rgba(15,20,64,.35)}
.s--ink .phone{border-color:#fff;box-shadow:0 12px 0 ${C.yellow}}
.pv{aspect-ratio:9/19;overflow:hidden;border-radius:36px;background:#fff}
.pv img{width:100%;display:block}
.ph-r{position:absolute;right:70px;bottom:150px;width:300px;transform:rotate(6deg)}
.ph-scroll .pv img{transform:translateY(-18%)}
.br{position:absolute;right:-120px;bottom:150px;width:620px;background:#fff;border:4px solid ${C.ink};border-radius:26px;overflow:hidden;box-shadow:0 12px 0 ${C.ink};transform:rotate(-5deg)}
.bar{display:flex;gap:10px;padding:14px 18px;border-bottom:4px solid ${C.ink}}
.bar i{width:18px;height:18px;border-radius:50%;background:${C.pink};border:2px solid ${C.ink}}.bar i:nth-child(2){background:${C.yellow}}.bar i:nth-child(3){background:${C.mint}}
.br-hola{right:-40px;left:auto;bottom:130px;width:640px;transform:rotate(-3deg)}
.br-hola .bv{height:210px}
.bv{height:360px;overflow:hidden}.bv img{width:100%;display:block}
.trio{position:relative;height:760px;margin-top:50px}
.trio .phone{position:absolute;width:300px;top:30px}
.t1{left:0;transform:rotate(-6deg)}.t2{left:315px;top:0!important;z-index:2}.t3{left:630px;transform:rotate(6deg)}
.names{display:flex;justify-content:space-between;margin-top:10px;font:800 34px/1.1 'Bricolage Grotesque';color:#fff}
.names span{width:300px;text-align:center}
.steps{list-style:none;padding:0;margin-top:80px;display:grid;gap:58px}
.steps li{display:flex;gap:34px;align-items:center}
.steps b{flex:none;width:130px;height:130px;border-radius:50%;display:grid;place-items:center;font:800 54px/1 'Bricolage Grotesque';border:4px solid ${C.ink};box-shadow:0 7px 0 ${C.ink}}
.steps h3{font:800 54px/1.1 'Bricolage Grotesque'}
.steps p{font-size:36px;color:${C.muted};margin-top:6px}
.foot{position:absolute;left:90px;right:90px;bottom:56px;display:flex;align-items:center;gap:24px;font-weight:700;font-size:28px}
.foot .logo{margin-right:calc(var(--L)*2.15)}
.foot .pg{margin-left:auto;opacity:.6}
.foot .sw{background:${C.ink};color:#fff;padding:14px 22px;border-radius:99px}
.foot--d .sw{background:#fff;color:${C.ink}}
`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
for (const [i, s] of slides.entries()) {
  await p.setContent(`<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Plus+Jakarta+Sans:wght@400..800&family=Gochi+Hand&family=Shrikhand&family=Yellowtail&display=swap">
<style>${css}</style></head><body>${s}</body></html>`);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(here, `placa-${String(i + 1).padStart(2, '0')}.png`) });
}
await b.close();
console.log(slides.length, 'placas');
