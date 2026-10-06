# Plantilla de landing para marca personal

Landing page informativa para presentar a un profesional independiente: quién es, qué hace, cómo trabaja y cómo contactarlo. Sirve como demo para vender servicios de diseño web y como base reutilizable para cada cliente.

La versión incluida usa una **marca de demostración**: _Martina López, diseñadora gráfica independiente_. La persona, los textos, los datos de contacto y los proyectos son **ficticios** y la página lo avisa (pie de página y sección de proyectos).

- **Sin dependencias.** HTML, CSS y JavaScript sin frameworks. Solo hace falta Node.js 20 o superior para generar el sitio.
- **Un solo archivo para personalizar:** [`site.config.mjs`](site.config.mjs).
- **Resultado estático** en `dist/`: se publica solo en GitHub Pages con cada cambio, o se sube a cualquier hosting.

---

## Índice

1. [Ejecutar en tu computadora](#1-ejecutar-en-tu-computadora)
2. [Estructura del proyecto](#2-estructura-del-proyecto)
3. [Personalizar para un cliente](#3-personalizar-para-un-cliente)
4. [Duplicar la plantilla para un cliente nuevo](#4-duplicar-la-plantilla-para-un-cliente-nuevo)
5. [Publicar en GitHub Pages](#5-publicar-en-github-pages)
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
.github/workflows/
  deploy-pages.yml     ← revisa el sitio en cada cambio y lo publica en GitHub Pages
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

La forma recomendada es usar este repositorio como **plantilla de GitHub**:

1. Una sola vez, en este repositorio: _Settings → General_ → marcá **Template repository**.
2. Para cada cliente: botón **Use this template → Create a new repository** (por ejemplo `landing-nombre-cliente`). El repositorio nuevo arranca con todos los archivos, sin el historial de la plantilla.
3. Activá GitHub Pages en el repositorio nuevo (ver [Publicar](#5-publicar-en-github-pages)).

Después:

1. Completá la [ficha](#6-ficha-de-información-para-pedirle-al-profesional) con el cliente.
2. Editá `site.config.mjs` y poné `demo: false`. Se puede editar directo en GitHub con el lápiz (_Edit this file_).
3. Subí fotos, logo e imagen para redes a `public/assets/` (_Add file → Upload files_).
4. Guardá los cambios (_Commit changes_). GitHub revisa y publica solo; si `npm run check` encuentra un error, la publicación se frena y el error aparece en la pestaña **Actions**.

Si preferís trabajar en tu computadora: `git clone`, editá, `npm run dev` para ver los cambios y `git push` para publicar.

## 5. Publicar en GitHub Pages

El repositorio ya trae el flujo [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml), que en cada cambio:

- genera el sitio y corre `npm run check` (en cualquier rama y en los pull requests);
- si el cambio está en la **rama principal** del repositorio (la _default branch_, normalmente `main`), publica `dist/` en GitHub Pages.

**Activarlo (una sola vez por repositorio):**

1. _Settings → Pages → Build and deployment → Source:_ elegí **GitHub Actions**.
2. Hacé un cambio en la rama principal, o andá a _Actions → Revisar y publicar → Run workflow_.
3. Cuando termina, la dirección aparece en _Settings → Pages_ y en el resumen del flujo. Para un repositorio `usuario/nombre` es `https://usuario.github.io/nombre/`.

**Dirección del sitio (`site.url`):** mientras `site.url` sea el de ejemplo (`https://www.example.com`), el flujo usa automáticamente la dirección de GitHub Pages para el enlace canónico, la imagen para redes y el `sitemap.xml`. Si el cliente tiene dominio propio, poné ese dominio en `site.url`.

**Dominio propio:** _Settings → Pages → Custom domain_, escribí el dominio y configurá los registros DNS que indica GitHub en el proveedor del dominio. Activá _Enforce HTTPS_ cuando esté disponible.

**Antes de publicar un sitio real:** `demo: false`, datos de contacto reales y `npm run check` sin errores. Con `demo: true` la página se marca como `noindex` para que la demo no aparezca en buscadores.

### Otros hostings

El sitio final es la carpeta `dist/` (se genera con `npm run build`). Cualquier hosting de archivos estáticos sirve:

| Servicio | Configuración |
| --- | --- |
| **Netlify** | Conectá el repositorio. Comando de build: `npm run build`. Carpeta de publicación: `dist`. También podés arrastrar la carpeta `dist/` a app.netlify.com/drop. |
| **Vercel** | Importá el repositorio. Framework: _Other_. Build: `npm run build`. Output: `dist`. |
| **Cloudflare Pages** | Build: `npm run build`. Directorio de salida: `dist`. |
| **Hosting tradicional (cPanel, FTP)** | Corré `npm run build` y subí el contenido de `dist/` a la carpeta pública (`public_html`). |

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

- **GitHub Pages y dominio:** hay que activar Pages una vez por repositorio (_Settings → Pages → Source: GitHub Actions_). El dominio propio se compra y configura aparte. La página no está publicada hasta que el flujo de publicación termina bien.
- **Recepción de mensajes del formulario:** con los modos incluidos no hay servidor; el mensaje se envía desde el WhatsApp o el correo del visitante. Para recibirlos en una casilla sin que el visitante use su app hace falta un servicio de formularios (por ejemplo Formspree, Netlify Forms o similar) o un backend propio, con su cuenta y configuración. En ese caso conviene sumar una política de privacidad provista por el cliente.
- **Analítica** (Google Analytics, Plausible, etc.): no incluida. Si se agrega, puede requerir aviso de cookies según la jurisdicción.
- **Search Console / indexación:** con `demo: false`, cargá el dominio en Google Search Console y enviá `sitemap.xml`.
- **Fuentes:** se cargan desde Google Fonts (requiere conexión). Si el cliente prefiere no depender de Google, se pueden descargar y servir desde `public/`.

## 10. Recursos y licencias

- **Tipografías:** Bricolage Grotesque, Instrument Serif e IBM Plex Mono, servidas por Google Fonts bajo la licencia SIL Open Font License 1.1 (uso comercial permitido).
- **Íconos:** dibujados para esta plantilla (SVG simples). No se usan logos de marcas; las redes se muestran como texto.
- **Imágenes:** no hay fotos. Los bloques de reemplazo están hechos con CSS. `og-image.png` se generó con `scripts/og-image.mjs` a partir del config.
- **Textos legales:** no se incluyen. Si el sitio los necesita, debe proveerlos el cliente o su asesor.
