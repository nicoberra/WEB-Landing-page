// POST /api/webhook  (lo llama Mercado Pago cuando cambia un pago)
// Si el pago quedó aprobado, manda el mail con los links de descarga.
// Siempre se vuelve a consultar el pago a Mercado Pago: el aviso solo trae el número.
import { createHmac, timingSafeEqual } from 'node:crypto';
import { missingConfig, send, body, siteUrl, catalog, mp, paymentItems, paymentEmail, mailDownloads } from './_tienda.js';

/** Firma del aviso (si se cargó MP_WEBHOOK_SECRET). */
function signed(req, dataId) {
  const secret = process.env.MP_WEBHOOK_SECRET;
  if (!secret) return true;
  const parts = Object.fromEntries(String(req.headers['x-signature'] || '').split(',').map((kv) => kv.trim().split('=')));
  if (!parts.ts || !parts.v1) return false;
  const manifest = `id:${String(dataId).toLowerCase()};request-id:${req.headers['x-request-id'] || ''};ts:${parts.ts};`;
  const good = createHmac('sha256', secret).update(manifest).digest();
  const got = Buffer.from(parts.v1, 'hex');
  return got.length === good.length && timingSafeEqual(got, good);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Método no permitido' });
  if (missingConfig().length) return send(res, 200, { ok: false });
  const url = new URL(req.url, 'http://x');
  const b = body(req);
  const type = url.searchParams.get('type') || url.searchParams.get('topic') || b.type || b.topic;
  const dataId = url.searchParams.get('data.id') || url.searchParams.get('id') || (b.data && b.data.id);
  if (type !== 'payment' || !dataId) return send(res, 200, { ok: true });
  if (!signed(req, dataId)) return send(res, 401, { error: 'Firma inválida' });
  try {
    const p = await mp(`/v1/payments/${String(dataId).replace(/\D/g, '')}`);
    if (p.status !== 'approved') return send(res, 200, { ok: true, status: p.status });
    const email = paymentEmail(p);
    const ids = paymentItems(p);
    if (!email || !ids.length) return send(res, 200, { ok: true });
    const site = siteUrl(req);
    const cat = await catalog(site);
    const titles = new Map([...cat].map(([id, it]) => [id, it.title]));
    await mailDownloads({ site, email, ids, titles, subject: 'Tus recetarios de Jesica Cuevas', idempotencyKey: `pago-${p.id}` });
    send(res, 200, { ok: true });
  } catch (err) {
    // Con error, Mercado Pago vuelve a avisar más tarde.
    console.error(err);
    send(res, 500, { error: 'No se pudo procesar' });
  }
}
