// GET /api/descargar?t=…  Revisa el link firmado y manda al PDF.
import { missingConfig, readToken, files } from './_tienda.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  const page = (msg) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Descarga</title><body style="font-family:Arial,sans-serif;max-width:480px;margin:60px auto;padding:0 16px;color:#1F2D25"><h1 style="font-size:22px">${msg}</h1><p><a href="/mis-recetarios.html">Pedir links nuevos con tu mail</a></p></body>`);
  };
  if (missingConfig().length) { res.statusCode = 503; return page('Las descargas todavía no están habilitadas.'); }
  const t = readToken(new URL(req.url, 'http://x').searchParams.get('t'));
  if (!t) { res.statusCode = 410; return page('Este link venció o no es válido.'); }
  const file = files()[t.id];
  if (!file) { res.statusCode = 404; return page('No encontramos ese recetario.'); }
  res.statusCode = 302;
  res.setHeader('Location', file);
  res.end();
}
