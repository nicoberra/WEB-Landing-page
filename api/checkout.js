// POST /api/checkout  { items: ["snacks-dulces", …], email: "…" }
// Arma el pago en Mercado Pago con los precios del catálogo y devuelve la
// dirección a la que hay que mandar a la persona para pagar.
import { missingConfig, notReady, send, body, cleanEmail, validEmail, siteUrl, catalog, files, mp, buyerRef } from './_tienda.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Método no permitido' });
  if (missingConfig().length) return notReady(res);
  const b = body(req);
  const email = cleanEmail(b.email);
  if (!validEmail(email)) return send(res, 400, { error: 'Revisá tu mail: ahí te llegan los recetarios.' });
  const wanted = [...new Set(Array.isArray(b.items) ? b.items.map(String) : [])].slice(0, 20);
  if (!wanted.length) return send(res, 400, { error: 'Tu pedido está vacío.' });
  try {
    const site = siteUrl(req);
    const cat = await catalog(site);
    const pdfs = files();
    const items = [];
    for (const id of wanted) {
      const it = cat.get(id);
      if (!it) return send(res, 400, { error: 'Uno de los recetarios ya no está en la tienda. Recargá la página.' });
      if (!(it.price > 0) || !pdfs[id]) return send(res, 400, { error: `"${it.title}" todavía no está a la venta.` });
      items.push({ id, title: it.title, quantity: 1, currency_id: 'ARS', unit_price: Number(it.price) });
    }
    const back = `${site}/mis-recetarios.html`;
    const pref = await mp('/checkout/preferences', {
      method: 'POST',
      body: JSON.stringify({
        items,
        payer: { email },
        external_reference: buyerRef(email),
        metadata: { email, recetarios: wanted.join(',') },
        back_urls: { success: back, pending: back, failure: back },
        auto_return: 'approved',
        notification_url: `${site}/api/webhook`,
        statement_descriptor: 'RECETARIOS',
      }),
    });
    send(res, 200, { url: pref.init_point });
  } catch (err) {
    console.error(err);
    send(res, 502, { error: 'No pudimos conectar con Mercado Pago. Probá de nuevo en un rato.' });
  }
}
