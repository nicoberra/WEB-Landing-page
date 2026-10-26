// Funciones compartidas de la tienda (Vercel no publica como función los
// archivos de /api que empiezan con "_").
//
// Cómo funciona, sin base de datos:
//  - Mercado Pago guarda las compras. Cada pago lleva como "referencia
//    externa" un código que sale del mail del comprador (firmado con
//    DESCARGAS_SECRETO), así después se pueden buscar todas sus compras.
//  - Los PDF están guardados aparte (por ejemplo en Vercel Blob) y sus
//    direcciones van en la variable RECETARIOS_ARCHIVOS, que no es pública.
//  - Los links de descarga van firmados y vencen; para descargar de nuevo,
//    la persona pide links nuevos con su mail en mis-recetarios.html.
//
// Variables de entorno (se cargan en Vercel → Settings → Environment Variables):
//  MP_ACCESS_TOKEN      Access token de Mercado Pago (credenciales de producción).
//  DESCARGAS_SECRETO    Texto largo al azar. No cambiarlo nunca después de vender.
//  RECETARIOS_ARCHIVOS  JSON con la dirección del PDF de cada recetario:
//                       {"snacks-dulces":"https://…/snacks.pdf", …}
//  RESEND_API_KEY       Clave de Resend para mandar los mails.
//  MAIL_FROM            Remitente, ej.: Jesica Cuevas <recetarios@su-dominio.com>
//  MP_WEBHOOK_SECRET    (opcional) Clave secreta de webhooks de Mercado Pago.
//  SITE_URL             (opcional) Dirección del sitio, ej.: https://su-dominio.com
import { createHmac, timingSafeEqual } from 'node:crypto';

const MP = 'https://api.mercadopago.com';
const DAY = 24 * 60 * 60 * 1000;

/** Qué variables faltan para poder vender. */
export function missingConfig() {
  return ['MP_ACCESS_TOKEN', 'DESCARGAS_SECRETO', 'RECETARIOS_ARCHIVOS', 'RESEND_API_KEY', 'MAIL_FROM'].filter((k) => !process.env[k]);
}

export function send(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

export function notReady(res) {
  send(res, 503, { error: 'Los pagos todavía no están habilitados.', code: 'pagos-no-configurados' });
}

export function body(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  try { return JSON.parse(req.body || '{}'); } catch { return {}; }
}

export const cleanEmail = (v) => String(v || '').trim().toLowerCase();
export const validEmail = (v) => v.length <= 120 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/** Dirección del sitio (para el catálogo, la vuelta de Mercado Pago y los links). */
export function siteUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `https://${host}`;
}

const b64 = (buf) => Buffer.from(buf).toString('base64url');
const hmac = (text) => createHmac('sha256', process.env.DESCARGAS_SECRETO).update(text).digest();

/** Código fijo de cada comprador (con él se buscan sus compras en Mercado Pago). */
export const buyerRef = (email) => 'jc-' + hmac('comprador:' + email).toString('hex').slice(0, 40);

/** Link firmado para descargar un recetario; vence a los `days` días. */
export function downloadUrl(site, email, id, days) {
  const payload = b64(JSON.stringify({ e: email, i: id, x: Date.now() + days * DAY }));
  return `${site}/api/descargar?t=${payload}.${b64(hmac('descarga:' + payload))}`;
}

/** Revisa un link de descarga. Devuelve { email, id } o null. */
export function readToken(token) {
  const [payload, sig] = String(token || '').split('.');
  if (!payload || !sig) return null;
  const good = hmac('descarga:' + payload);
  const got = Buffer.from(sig, 'base64url');
  if (got.length !== good.length || !timingSafeEqual(got, good)) return null;
  try {
    const d = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return d.x > Date.now() ? { email: d.e, id: d.i } : null;
  } catch {
    return null;
  }
}

/** Catálogo público que genera el sitio (precios siempre desde acá, nunca del navegador). */
export async function catalog(site) {
  const r = await fetch(`${site}/tienda.json`, { cache: 'no-store' });
  if (!r.ok) throw new Error('No se pudo leer el catálogo (' + r.status + ')');
  const data = await r.json();
  return new Map((data.items || []).map((it) => [it.id, it]));
}

export function files() {
  try { return JSON.parse(process.env.RECETARIOS_ARCHIVOS || '{}'); } catch { return {}; }
}

export async function mp(path, options = {}) {
  const r = await fetch(MP + path, {
    ...options,
    headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`, 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`Mercado Pago respondió ${r.status}: ${data.message || ''}`);
  return data;
}

/** Recetarios de un pago (los guardamos en metadata y, por las dudas, en los ítems). */
export function paymentItems(p) {
  const fromMeta = String((p.metadata && p.metadata.recetarios) || '').split(',').filter(Boolean);
  if (fromMeta.length) return fromMeta;
  return ((p.additional_info && p.additional_info.items) || []).map((it) => it.id).filter(Boolean);
}

export const paymentEmail = (p) => cleanEmail((p.metadata && p.metadata.email) || (p.payer && p.payer.email));

/** Todos los recetarios comprados (pagos aprobados) por un mail. */
export async function purchasesOf(email) {
  const ref = buyerRef(email);
  const data = await mp(`/v1/payments/search?external_reference=${encodeURIComponent(ref)}&status=approved&limit=100&sort=date_created&criteria=desc`);
  const ids = new Set();
  (data.results || []).forEach((p) => paymentItems(p).forEach((id) => ids.add(id)));
  return [...ids];
}

/** Manda el mail con los links de descarga. */
export async function mailDownloads({ site, email, ids, titles, subject, idempotencyKey }) {
  const days = 30;
  const rows = ids
    .map((id) => `<li style="margin:0 0 12px"><a href="${downloadUrl(site, email, id, days)}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#3E5B47;color:#fff;text-decoration:none;font-weight:600">Descargar ${escapeHtml(titles.get(id) || id)}</a></li>`)
    .join('');
  const html = `<div style="font-family:Arial,sans-serif;color:#1F2D25;max-width:520px;margin:0 auto;padding:24px">
  <h1 style="font-size:24px;margin:0 0 12px">¡Gracias por tu compra!</h1>
  <p style="margin:0 0 18px">Acá tenés tus recetarios. Los links funcionan durante ${days} días.</p>
  <ul style="list-style:none;padding:0;margin:0 0 18px">${rows}</ul>
  <p style="margin:0 0 6px">¿Los necesitás de nuevo más adelante? Entrá a <a href="${site}/mis-recetarios.html">${site.replace(/^https?:\/\//, '')}/mis-recetarios.html</a>, poné este mail y te llegan links nuevos.</p>
</div>`;
  const text = `¡Gracias por tu compra!\n\n${ids.map((id) => `${titles.get(id) || id}: ${downloadUrl(site, email, id, days)}`).join('\n')}\n\nPara descargarlos de nuevo: ${site}/mis-recetarios.html`;
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
      ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
    },
    body: JSON.stringify({ from: process.env.MAIL_FROM, to: [email], subject, html, text }),
  });
  if (!r.ok) throw new Error('No se pudo mandar el mail (' + r.status + ')');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
