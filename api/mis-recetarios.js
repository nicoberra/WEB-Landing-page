// POST /api/mis-recetarios  { email }
// Busca en Mercado Pago las compras aprobadas de ese mail y le manda links
// nuevos para descargar todo. La respuesta es la misma haya compras o no,
// para no revelar quién compró.
import { missingConfig, notReady, send, body, cleanEmail, validEmail, siteUrl, catalog, purchasesOf, mailDownloads } from './_tienda.js';

const MESSAGE = 'Si hay compras con ese mail, en unos minutos te llega un link para descargarlas. Revisá también spam o promociones.';

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Método no permitido' });
  if (missingConfig().length) return notReady(res);
  const email = cleanEmail(body(req).email);
  if (!validEmail(email)) return send(res, 400, { error: 'Revisá el mail que escribiste.' });
  try {
    const ids = await purchasesOf(email);
    if (ids.length) {
      const site = siteUrl(req);
      const cat = await catalog(site);
      const titles = new Map([...cat].map(([id, it]) => [id, it.title]));
      await mailDownloads({ site, email, ids, titles, subject: 'Tus recetarios para descargar' });
    }
    send(res, 200, { message: MESSAGE });
  } catch (err) {
    console.error(err);
    send(res, 502, { error: 'No pudimos buscar tus compras. Probá de nuevo en un rato.' });
  }
}
