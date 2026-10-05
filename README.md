# Plantilla de landing para marca personal

Landing page informativa para presentar a un profesional independiente: quién es, qué hace, cómo trabaja y cómo contactarlo. Sirve como demo para vender servicios de diseño web y como base reutilizable para cada cliente.

La versión incluida usa una **marca de demostración**: _Martina López, diseñadora gráfica independiente_. La persona, los textos, los datos de contacto y los proyectos son **ficticios** y la página lo avisa (pie de página y sección de proyectos).

- **Sin dependencias.** HTML, CSS y JavaScript sin frameworks. Solo hace falta Node.js 20 o superior para generar el sitio.
- **Un solo archivo para personalizar:** [`site.config.mjs`](site.config.mjs).
- **Resultado estático** en `dist/`: se puede subir a cualquier hosting.

---

## Índice

1. [Ejecutar en tu computadora](#1-ejecutar-en-tu-computadora)
2. [Estructura del proyecto](#2-estructura-del-proyecto)
3. [Personalizar para un cliente](#3-personalizar-para-un-cliente)
4. [Duplicar la plantilla para un cliente nuevo](#4-duplicar-la-plantilla-para-un-cliente-nuevo)
5. [Publicar](#5-publicar)
6. [Ficha de información para pedirle al profesional](#6-ficha-de-información-para-pedirle-al-profesional)
7. [Proceso de adaptación](#7-proceso-de-adaptación)
8. [Qué es contenido de muestra](#8-qué-es-contenido-de-muestra)
9. [Qué necesita configuración externa](#9-qué-necesita-configuración-externa)
10. [Recursos y licencias](#10-recursos-y-licencias)

---

## 1. Ejecutar en tu computadora

```bash
npm run dev     # vista previa en http://localhost:4321 que se recarga al guardar
npm run build   # genera el sitio final en dist/
npm run check   # genera el sitio y revisa contraste, encabezados, enlaces y datos pendientes
```

No hace falta `npm install`: el proyecto no tiene dependencias.

`npm run check` muestra:

- **✖ errores** que conviene corregir antes de publicar (contraste insuficiente, enlaces internos rotos, imágenes sin texto alternativo, campos sin etiqueta, saltos de encabezados);
- **! avisos** con lo que sigue siendo de ejemplo (dominio, email, WhatsApp, fotos, redes, modo demostración).

## 2. Estructura del proyecto

```
site.config.mjs        ← TODOS los datos editables (textos, colores, fotos, contacto…)
public/                ← archivos que se copian tal cual (fotos, logo, imagen para redes)
  assets/og-image.png  ← imagen que se ve al compartir el enlace (1200×630)
src/
  render.mjs           ← arma la página y el <head> (SEO, metadatos sociales, tema)
  helpers.mjs          ← utilidades: escapado de textos, fotos/bloques de reemplazo, íconos
  sections/            ← una sección por archivo (header, hero, about, services, process,
                         projects, faq, contact, footer, logo)
  styles.css           ← estilos (usa los colores y fuentes del config como variables)
  main.js              ← menú móvil, filtro de proyectos, copiar email, validación del formulario
scripts/
  build.mjs            ← genera dist/
  dev.mjs              ← servidor local con recarga automática
  check.mjs            ← revisión de calidad y datos pendientes
  og-image.mjs         ← (opcional) genera la imagen para redes desde el config
```

## 3. Personalizar para un cliente

Todo se edita en **`site.config.mjs`**. Cada bloque tiene comentarios. Lo principal:

| Qué | Dónde en el config |
| --- | --- |
| Nombre, profesión, ubicación, foto | `person` |
| Logo (iniciales o archivo) | `logo` |
| Colores (claro y oscuro) | `colors.light` y `colors.dark` |
| Tipografías | `fonts` |
| Título, descripción SEO, dominio, imagen para redes | `site` |
| Secciones visibles y orden | `sections` |
| Menú | `nav` y `navCta` |
| Textos de cada sección | `hero`, `about`, `services`, `process`, `projects`, `faq`, `contact` |
| WhatsApp, email y formulario | `contact` |
| Redes y enlaces del pie | `social` y `footer` |
| Avisos de demostración | `demo` |

### Textos

Texto plano. Para resaltar una palabra con la tipografía cursiva de acento, rodeala con asteriscos: `'Diseño con *criterio*'`.

### Fotos

1. Guardá la imagen en `public/assets/` (JPG o WebP, comprimida; idealmente menos de 300 KB).
2. Referenciala en el config:

```js
person: {
  photo: { src: 'assets/retrato.jpg', alt: 'Martina López en su estudio, sonriendo' },
},
```

Medidas recomendadas (ya están reservadas en el diseño):

| Foto | Proporción | Tamaño sugerido |
| --- | --- | --- |
| Foto del profesional | 4:5 vertical | 1200 × 1500 px |
| Foto de cada proyecto | 4:3 horizontal | 1600 × 1200 px |
| Imagen para redes (`og-image.png`) | 1,91:1 | 1200 × 630 px |

Si una foto queda en `null`, se muestra un bloque rotulado **FOTO DEL PROFESIONAL** o **FOTO DEL PROYECTO** con marcas de corte.

### Proyectos

Cada proyecto es un objeto en `projects.items`. Para quitarlo, borrá el objeto; para quitar la sección completa, sacá `'projects'` de `sections` y su entrada de `nav`. El filtro por categoría aparece solo si hay dos categorías o más. Con `demo: true` cada proyecto se marca como "Muestra".

### Colores

Cada paleta tiene diez colores con su uso comentado. Después de cambiarlos corré `npm run check`: avisa si algún par (texto/fondo, botón, enlaces) no llega al contraste WCAG AA. Si no querés modo oscuro, borrá `colors.dark`.

### Logo

- Iniciales: `logo: { type: 'monogram', text: 'ml' }`. El favicon se genera solo con las mismas iniciales y colores.
- Archivo: `logo: { type: 'image', src: 'assets/logo.svg', alt: '', width: 120, height: 40 }`. Si querés otro favicon, poné `public/favicon.svg` y reemplaza al generado.

### Formulario

`contact.form.mode`:

- `'demo'`: valida y muestra el resultado, **no envía ni guarda nada**.
- `'whatsapp'`: valida, arma el mensaje y abre WhatsApp con el texto listo para que la persona lo envíe.
- `'email'`: valida y abre el programa de correo con el mensaje armado.

Para no mostrar formulario: `form.enabled: false` (quedan los botones de WhatsApp y email).

Si el cliente necesita recibir los mensajes en un servidor, hay que sumar un servicio externo de formularios (ver [sección 9](#9-qué-necesita-configuración-externa)).

### Agregar una sección nueva

1. Creá `src/sections/mi-seccion.mjs` copiando una existente (por ejemplo `process.mjs`).
2. Importala en `src/render.mjs` y sumala a `SECTIONS`.
3. Agregá sus datos al config, su id a `sections` y, si corresponde, un ítem en `nav`.

### Imagen para redes

`public/assets/og-image.png` está generada con el nombre y los colores de la demo. Reemplazala por una imagen propia de 1200×630, o regenerala desde el config:

```bash
npm install --no-save playwright && npx playwright install chromium
node scripts/og-image.mjs
```

## 4. Duplicar la plantilla para un cliente nuevo

```bash
cp -r WEB-Landing-page landing-nombre-cliente   # o usá "Use this template" en GitHub
cd landing-nombre-cliente
rm -rf .git && git init                          # historial propio para el cliente
```

Después:

1. Completá la [ficha](#6-ficha-de-información-para-pedirle-al-profesional) con el cliente.
2. Editá `site.config.mjs` y poné `demo: false`.
3. Reemplazá fotos, logo e imagen para redes en `public/assets/`.
4. Corré `npm run check` hasta que no queden errores ni avisos pendientes.

## 5. Publicar

El sitio final es la carpeta `dist/`. Cualquier hosting de archivos estáticos sirve.

**Antes de publicar un sitio real:** `demo: false`, `site.url` con el dominio final, datos de contacto reales y `npm run check` sin errores. Con `demo: true` la página se marca como `noindex` y `robots.txt` bloquea a los buscadores, para que la demo no compita con sitios reales.

| Servicio | Configuración |
| --- | --- |
| **Netlify** | Conectá el repositorio. Comando de build: `npm run build`. Carpeta de publicación: `dist`. También podés arrastrar la carpeta `dist/` a app.netlify.com/drop. |
| **Vercel** | Importá el repositorio. Framework: _Other_. Build: `npm run build`. Output: `dist`. |
| **Cloudflare Pages** | Build: `npm run build`. Directorio de salida: `dist`. |
| **GitHub Pages** | En _Settings → Pages_, elegí _GitHub Actions_ y usá el flujo "Static HTML" apuntando a `dist` después de `npm run build`. |
| **Hosting tradicional (cPanel, FTP)** | Corré `npm run build` y subí el contenido de `dist/` a la carpeta pública (`public_html`). |

Dominio propio: se configura en el panel del hosting (registros DNS en el proveedor del dominio). Recordá actualizar `site.url`.

## 6. Ficha de información para pedirle al profesional

Copiá esta ficha y enviásela al cliente. Lo marcado con ★ es imprescindible.

```
DATOS BÁSICOS
★ Nombre con el que quiere aparecer:
★ Profesión o actividad (cómo la diría un cliente):
  Ciudad / zona donde trabaja (o si trabaja a distancia):
★ ¿A quién le quiere hablar? (tipo de cliente, rubro, edad, ubicación):
★ Objetivo principal de la página (que le escriban, que agenden una llamada, mostrar trabajos…):

PRESENTACIÓN
★ En 2 o 3 frases: qué hace y cómo ayuda a sus clientes:
  ¿Qué la/lo diferencia? (forma de trabajo, enfoque, especialidad):
  Formación, certificaciones o años de experiencia QUE QUIERA MOSTRAR (solo datos verificables):

SERVICIOS
★ Lista de servicios. Para cada uno: nombre, qué incluye y para quién es ideal:
  ¿Quiere mostrar precios o "desde"? (sí / no):
  Pasos de su forma de trabajo (de la primera consulta a la entrega):

PROYECTOS / TRABAJOS
  3 a 6 trabajos para mostrar. Para cada uno: título, categoría, breve descripción e imagen.
  ¿Tiene permiso de sus clientes para mostrarlos? (sí / no / algunos):
  Testimonios reales con permiso de publicación (nombre o iniciales y texto):

FOTOS Y MARCA
★ Foto profesional (vertical, buena luz, mínimo 1200 px de ancho):
  Logo (SVG o PNG con fondo transparente) o si se usan sus iniciales:
  Colores de marca (si tiene) o 2–3 referencias de estilo que le gusten:
  Tipografías de marca (si tiene):

CONTACTO
★ WhatsApp (con código de país):
★ Email:
  Mensaje inicial sugerido para WhatsApp:
  Horario o días de respuesta:
  ¿Formulario en la página? (no / que abra WhatsApp / que abra el correo / servicio de formularios):

REDES Y ENLACES
  Instagram, LinkedIn, Behance, TikTok, otras (enlaces completos al perfil):
  Otros enlaces (agenda online, tienda, portfolio externo):

PREGUNTAS FRECUENTES
  Las 4 a 6 preguntas que más le hacen sus clientes, con su respuesta:

DOMINIO Y PUBLICACIÓN
★ ¿Tiene dominio? ¿Cuál y dónde está registrado?:
  ¿Tiene hosting o lo elegimos juntos?:
  ¿Necesita textos legales (privacidad, cookies)? Los provee el cliente o su asesor:
```

## 7. Proceso de adaptación

Al adaptar la plantilla para un profesional:

1. **Revisar su actividad y objetivo.** Una psicóloga, un fotógrafo o un estudio contable necesitan acentos distintos: confianza y privacidad, galería protagonista, claridad sobre servicios y requisitos.
2. **Detectar qué falta o sobra.** Por ejemplo: un profesional sin portfolio visual puede reemplazar "Proyectos" por "Para quién trabajo" o por casos descritos en texto; quien atiende con turno puede necesitar un enlace a su agenda; una profesión regulada puede requerir mostrar su matrícula (dato real que debe proveer el cliente).
3. **Pedir solo la información esencial** (lo marcado con ★ en la ficha) y completar lo demás después.
4. **No inventar** títulos, años de experiencia, clientes, premios, testimonios ni resultados. Si falta un dato, se deja fuera o se marca como pendiente.
5. **No presentar los proyectos de muestra como reales.** Con `demo: false`, quitá o reemplazá todos los proyectos ficticios.
6. Correr `npm run check`, revisar en celular y computadora, y probar cada botón de contacto con los datos reales.

## 8. Qué es contenido de muestra

Todo lo siguiente es ficticio y debe reemplazarse:

- La profesional "Martina López", su descripción y textos en primera persona.
- Los 6 proyectos (panadería, té, revista, yoga, cine, velas): no son trabajos reales ni clientes reales.
- Servicios, proceso y preguntas frecuentes: redactados como ejemplo plausible.
- Datos de contacto: `hola@example.com` (dominio reservado para ejemplos) y el WhatsApp `+54 9 000 000-0000` (no existe).
- Dominio `https://www.example.com`.
- Redes: apuntan a la página principal de cada red, no a un perfil.
- La paleta, el monograma "ml" y la imagen para redes: son la identidad de la demo.

## 9. Qué necesita configuración externa

- **Dominio y hosting:** no incluidos. La página no está publicada hasta que se suba `dist/` a un hosting.
- **Recepción de mensajes del formulario:** con los modos incluidos no hay servidor; el mensaje se envía desde el WhatsApp o el correo del visitante. Para recibirlos en una casilla sin que el visitante use su app hace falta un servicio de formularios (por ejemplo Formspree, Netlify Forms o similar) o un backend propio, con su cuenta y configuración. En ese caso conviene sumar una política de privacidad provista por el cliente.
- **Analítica** (Google Analytics, Plausible, etc.): no incluida. Si se agrega, puede requerir aviso de cookies según la jurisdicción.
- **Search Console / indexación:** con `demo: false`, cargá el dominio en Google Search Console y enviá `sitemap.xml`.
- **Fuentes:** se cargan desde Google Fonts (requiere conexión). Si el cliente prefiere no depender de Google, se pueden descargar y servir desde `public/`.

## 10. Recursos y licencias

- **Tipografías:** Bricolage Grotesque, Instrument Serif e IBM Plex Mono, servidas por Google Fonts bajo la licencia SIL Open Font License 1.1 (uso comercial permitido).
- **Íconos:** dibujados para esta plantilla (SVG simples). No se usan logos de marcas; las redes se muestran como texto.
- **Imágenes:** no hay fotos. Los bloques de reemplazo están hechos con CSS. `og-image.png` se generó con `scripts/og-image.mjs` a partir del config.
- **Textos legales:** no se incluyen. Si el sitio los necesita, debe proveerlos el cliente o su asesor.
