// GET /api/pago?payment_id=…&external_reference=…
// Al volver de Mercado Pago: si el pago está aprobado, devuelve los links de
// descarga. Pide también la referencia del comprador para que nadie pueda ver
// compras ajenas probando números de pago.
import { missingConfig, notReady, send, siteUrl, catalog, mp, paymentItems, paymentEmail, downloadUrl } from './_tienda.js';

export default async function handler(req, res) {
  if (missingConfig().length) return notReady(res);
  const url = new URL(req.url, 'http://x');
  const id = (url.searchParams.get('payment_id') || '').replace(/\D/g, '');
  const ref = url.searchParams.get('external_reference') || '';
  if (!id || !ref) return send(res, 400, { error: 'Faltan datos del pago.' });
  try {
    const p = await mp(`/v1/payments/${id}`);
    if (p.external_reference !== ref) return send(res, 404, { error: 'No encontramos ese pago.' });
    if (p.status !== 'approved') return send(res, 200, { status: p.status });
    const site = siteUrl(req);
    const cat = await catalog(site);
    const email = paymentEmail(p);
    const list = paymentItems(p).map((rid) => ({ title: (cat.get(rid) || {}).title || rid, url: downloadUrl(site, email, rid, 2) }));
    send(res, 200, { status: 'approved', files: list });
  } catch (err) {
    console.error(err);
    send(res, 502, { error: 'No pudimos revisar el pago. Probá de nuevo en un rato.' });
  }
}
