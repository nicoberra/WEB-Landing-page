# Tienda de recetarios (Mercado Pago + descarga)

## Cómo funciona

1. La persona arma su pedido en la tiendita, escribe su mail y toca **Pagar con Mercado Pago**.
2. `api/checkout.js` arma el cobro con los precios de `tienda.json` (salen de `config.mjs`, nunca del navegador) y la manda a Mercado Pago.
3. Al pagar, vuelve a `mis-recetarios.html`, que muestra los botones de descarga (`api/pago.js`).
4. Mercado Pago avisa a `api/webhook.js` y se manda un mail con los links (Resend).
5. Para descargar de nuevo, la persona pone su mail en `mis-recetarios.html` y le llegan links nuevos (`api/mis-recetarios.js`). Las compras se buscan en Mercado Pago: no hace falta base de datos.
6. Los links pasan por `api/descargar.js`, que revisa la firma y el vencimiento (2 días en la página, 30 en el mail) y manda al PDF.

Mientras falte configurar algo, el botón de pago avisa que los pagos se habilitan pronto y ofrece WhatsApp.

## Qué hay que cargar

### 1. Precios (en `config.mjs` → `v2.shop.items`)

`price: 9900` (solo el número, en pesos). Con `price: null` el recetario se ve con "Precio a confirmar" y no se puede pagar. El `id` de cada recetario no se cambia después de vender.

### 2. Variables en Vercel (Settings → Environment Variables, para Production)

| Variable | Qué es | Dónde se consigue |
| --- | --- | --- |
| `MODELO` | `jesica-cuevas-v2` | Ya cargada. |
| `MP_ACCESS_TOKEN` | Clave para cobrar | Mercado Pago de Jesi → mercadopago.com.ar/developers → *Tus integraciones* → crear aplicación (pagos online, Checkout Pro) → *Credenciales de producción* → **Access Token**. Para probar sin cobrar, usar las *credenciales de prueba*. |
| `DESCARGAS_SECRETO` | Texto largo al azar (40 caracteres o más) | Generarlo con un generador de contraseñas. **No cambiarlo nunca después de vender**: con él se encuentran las compras anteriores. |
| `RECETARIOS_ARCHIVOS` | Dónde está el PDF de cada recetario | Ver punto 3. Formato: `{"snacks-dulces":"https://…/snacks.pdf","menu-semanal":"https://…/menu.pdf"}` |
| `RESEND_API_KEY` | Clave para mandar los mails | resend.com → crear cuenta → *Domains*: agregar y verificar el dominio de Jesi → *API Keys*: crear una. |
| `MAIL_FROM` | Remitente de los mails | Ej.: `Jesica Cuevas <recetarios@su-dominio.com>` (con el dominio verificado en Resend). |
| `MP_WEBHOOK_SECRET` | Opcional | Solo si se configuran webhooks en el panel de Mercado Pago: copiar su *clave secreta*. Sin esto también funciona (el aviso va en cada pago). |
| `SITE_URL` | Opcional | Dirección final, ej.: `https://su-dominio.com`. Si no está, se usa la del pedido. |

### 3. Los PDF (Vercel Blob)

Vercel → *Storage* → *Create* → **Blob** → conectarlo al proyecto. En la pestaña *Browser* subir cada PDF y copiar su dirección. Las direcciones van en `RECETARIOS_ARCHIVOS`, que es privada (no se publica en la página). Un recetario sin PDF cargado no se puede pagar.

### 4. Publicar y probar

Después de cargar todo: *Deployments* → *Redeploy*. Probar con las credenciales de prueba de Mercado Pago (usuarios y tarjetas de prueba) que:

- se puede pagar,
- vuelve a la página con los botones de descarga,
- llega el mail,
- en `mis-recetarios.html` llegan links nuevos.

Recién ahí cambiar `MP_ACCESS_TOKEN` por el de producción.

## A tener en cuenta

- La facturación de cada venta la hace Jesi (no la resuelve la página).
- Quien ya descargó un PDF puede compartirlo: es así con cualquier archivo digital.
- Mercado Pago cobra su comisión por venta.
