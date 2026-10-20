# Plantilla de landing para marca personal

Landing page informativa para presentar a un profesional independiente: quién es, qué hace, cómo trabaja y cómo contactarlo. Sirve como demo para vender servicios de diseño web y como base reutilizable para cada cliente.

La configuración actual es la de **Jesica Cuevas, Licenciada en Nutrición (M.N. 12233)**, [@nutricionista.cj](https://www.instagram.com/nutricionista.cj/). La identidad sale de su Instagram: verdes salvia y bosque, fondo crema, títulos con serif condensada, acentos manuscritos y su forma de hablar. La matrícula, las especialidades y la formación las cargó la persona que encargó la página; los recetarios, sus precios y el turnero todavía son provisorios (ver [sección 8](#8-qué-está-pendiente)).

También queda un segundo ejemplo, ficticio, en [`examples/disenadora-grafica.config.mjs`](examples/disenadora-grafica.config.mjs) (_Martina López, diseñadora gráfica_), para mostrar cómo la misma plantilla sirve para otra profesión.

- **Sin dependencias.** HTML, CSS y JavaScript sin frameworks. Solo hace falta Node.js 20 o superior para generar el sitio.
- **Un solo archivo para personalizar:** [`site.config.mjs`](site.config.mjs).
- **Con movimiento:** el nombre entra palabra por palabra, las secciones aparecen al hacer scroll, hay una cinta de frases en movimiento, efecto de profundidad (parallax), barra de progreso de lectura y tarjetas que se inclinan con el mouse. Todo se apaga si la persona tiene activado "reducir movimiento" en su dispositivo.
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
8. [Qué está pendiente](#8-qué-está-pendiente)
9. [Qué necesita configuración externa](#9-qué-necesita-configuración-externa)
10. [Recursos y licencias](#10-recursos-y-licencias)

---

## 1. Ejecutar en tu computadora

```bash
npm run dev     # vista previa en http://localhost:4321 que se recarga al guardar
npm run build   # genera el sitio final en dist/
npm run check   # genera el sitio y revisa contraste, encabezados, enlaces y datos pendientes
```

Para ver o generar el ejemplo de la diseñadora gráfica (u otro archivo de configuración):

```bash
SITE_CONFIG=examples/disenadora-grafica.config.mjs npm run dev
```

No hace falta `npm install`: el proyecto no tiene dependencias.

`npm run check` muestra:

- **✖ errores** que conviene corregir antes de publicar (contraste insuficiente, enlaces internos rotos, imágenes sin texto alternativo, campos sin etiqueta, saltos de encabezados);
- **! avisos** con lo que sigue siendo de ejemplo (dominio, email, WhatsApp, fotos, redes, modo demostración).

## 2. Estructura del proyecto

```
site.config.mjs        ← TODOS los datos editables (textos, colores, fotos, contacto…)
examples/              ← otras configuraciones de ejemplo (diseñadora gráfica)
public/                ← archivos que se copian tal cual (fotos, logo, imagen para redes)
  assets/og-image.png  ← imagen que se ve al compartir el enlace (1200×630)
src/
  render.mjs           ← arma la página y el <head> (SEO, metadatos sociales, tema)
  helpers.mjs          ← utilidades: escapado de textos, fotos/bloques de reemplazo, íconos
  sections/            ← una sección por archivo: header, hero, marquee (cinta), about,
                         services, credentials (formación), process, products
                         (recetarios), booking (turnos), instagram, projects
                         (portfolio), faq, contact, footer, logo
  styles.css           ← estilos (usa los colores y fuentes del config como variables)
  main.js              ← menú móvil, animaciones al hacer scroll, filtro de proyectos,
                         copiar email, validación del formulario
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
| Turnero (enlace externo) | `booking` |
| Panel de pacientes (enlace externo) | `portal` |
| Instagram | `instagramUrl` e `instagram` |
| Cinta de frases en movimiento | `marquee` |
| Especialidades y formación | `credentials` |
| Recetarios o productos digitales | `products` |
| Bloque de turnos | `bookingSection` |
| Avisos de versión en preparación | `demo` |

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

### Turnero y panel de pacientes

El turnero y el panel son sistemas aparte: la página solo los enlaza.

- `booking.url`: enlace al turnero. Todos los botones "Sacar turno" lo usan. Mientras esté vacío, llevan a la sección de turnos, que muestra "Turnero online: enlace pendiente de configuración".
- `portal.url`: enlace al panel de pacientes. Cuando se completa, aparece "Acceso pacientes" en el menú.

### Recetarios

Cada recetario es un objeto en `products.items` con título, descripción, formato, precio, tapa (`image`) y enlace de compra (`href`, por ejemplo un link de pago de Mercado Pago). Si `href` está vacío, el botón abre WhatsApp con un mensaje que nombra el recetario. Si `price` está vacío, no se muestra precio.

### Formación

`credentials` muestra las especialidades (la primera va destacada) y la formación con su institución. Cargá solo datos reales y verificables.

### Movimiento

Las animaciones están en `src/styles.css` (sección "Movimiento") y `src/main.js`. Para sumar la animación de aparición a un elemento nuevo, agregale el atributo `data-reveal`; para escalonar varios, `style="--reveal-delay:1"`, `2`, etc. Para un efecto de profundidad, `data-parallax="0.08"` (valores chicos, positivos o negativos).

Si JavaScript no carga, a los 3 segundos se desactivan las animaciones de aparición para que no quede contenido oculto.

### Proyectos (portfolio)

Sección usada en el ejemplo de la diseñadora.

Cada proyecto es un objeto en `projects.items`. Para quitarlo, borrá el objeto; para quitar la sección completa, sacá `'projects'` de `sections` y su entrada de `nav`. El filtro por categoría aparece solo si hay dos categorías o más. Con `demo: true` cada proyecto se marca como "Muestra".

### Colores

Cada paleta tiene diez colores con su uso comentado. Después de cambiarlos corré `npm run check`: avisa si algún par (texto/fondo, botón, enlaces) no llega al contraste WCAG AA. `colors.dark` es opcional: sin esa paleta (como en la página de Jesica), el sitio se ve siempre con los colores de la marca.

### Tipografías

`fonts` define la familia de títulos (`display`), textos (`body`), acentos (`accent`, la que se usa en las palabras entre asteriscos) y rótulos (`mono`), y la URL de Google Fonts que las carga. `displayWeight`, `accentStyle` y `accentSize` ajustan el peso de los títulos, si el acento va en cursiva y su tamaño relativo (útil con letras manuscritas, que se ven más chicas).

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

`public/assets/og-image.png` está generada con el nombre, la matrícula y los colores del config actual. Reemplazala por una imagen propia de 1200×630, o regenerala desde el config:

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

**Antes de publicar un sitio real:** `demo: false`, datos de contacto reales y `npm run check` sin errores. Con `demo: true` la página se marca como `noindex` para que la versión en preparación no aparezca en buscadores.

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

TURNOS, PANEL Y PRODUCTOS
  Enlace al turnero online (si tiene):
  Enlace al panel o sistema de pacientes (si tiene):
  Productos digitales (recetarios, guías). Para cada uno: título, descripción, precio, tapa y enlace de pago:

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
5. **No presentar contenido de muestra como real.** Con `demo: false`, quitá o reemplazá todo lo provisorio (proyectos, recetarios, precios).
6. Correr `npm run check`, revisar en celular y computadora, y probar cada botón de contacto con los datos reales.

## 8. Qué está pendiente

**Página de Jesica Cuevas (`site.config.mjs`).** `npm run check` lista todo lo pendiente. Hoy:

- **Turnero:** falta el enlace (`booking.url`). Mientras tanto, la sección de turnos indica reservar escribiendo a [@nm.trainingcenter](https://www.instagram.com/nm.trainingcenter/), como dice su placa de servicios.
- **Panel de pacientes:** falta el enlace (`portal.url`).
- **Recetarios:** los tres títulos, descripciones y formatos son provisorios, inspirados en temas de su Instagram. Faltan precios, tapas y enlaces de compra.
- **Fotos:** están el retrato de la presentación y el de "Sobre mí" (`public/assets/jesica-*.webp`). Faltan las tapas de los recetarios (3:4) y fotos de publicaciones para el bloque de Instagram (1:1).
- **Textos a validar con ella:** descripciones de cada plan, pasos del proceso y respuestas de preguntas frecuentes.
- **Dominio:** `site.url` sigue siendo el de ejemplo (en GitHub Pages se usa la dirección de Pages automáticamente).
- **Publicación:** con `demo: true`, la página muestra un aviso de versión en preparación y no se indexa.

Fuentes de los datos: su placa de servicios (los seis planes, que son el eje de la página), su CV (matrícula, experiencia, formación y email), su Instagram (colores, tipografías, tono, Castelar y modalidad online/presencial) y el WhatsApp +54 9 11 6407-2673 indicado por quien encargó la página. El CV trae otro teléfono (11 3797-8217) que no se usa. Por pedido, no se menciona Espacio SilRagolia ni se publica la fecha de nacimiento.

**Ejemplo de la diseñadora (`examples/disenadora-grafica.config.mjs`).** Todo es ficticio: la persona, los textos, los proyectos, el email `hola@example.com` y el WhatsApp `+54 9 000 000-0000`.

## 9. Qué necesita configuración externa

- **GitHub Pages y dominio:** hay que activar Pages una vez por repositorio (_Settings → Pages → Source: GitHub Actions_). El dominio propio se compra y configura aparte. La página no está publicada hasta que el flujo de publicación termina bien.
- **Recepción de mensajes del formulario:** con los modos incluidos no hay servidor; el mensaje se envía desde el WhatsApp o el correo del visitante. Para recibirlos en una casilla sin que el visitante use su app hace falta un servicio de formularios (por ejemplo Formspree, Netlify Forms o similar) o un backend propio, con su cuenta y configuración. En ese caso conviene sumar una política de privacidad provista por el cliente.
- **Analítica** (Google Analytics, Plausible, etc.): no incluida. Si se agrega, puede requerir aviso de cookies según la jurisdicción.
- **Search Console / indexación:** con `demo: false`, cargá el dominio en Google Search Console y enviá `sitemap.xml`.
- **Fuentes:** se cargan desde Google Fonts (requiere conexión). Si el cliente prefiere no depender de Google, se pueden descargar y servir desde `public/`.

## 10. Recursos y licencias

- **Tipografías:** Instrument Serif, Caveat y Montserrat (página de Jesica) y Bricolage Grotesque, Instrument Serif e IBM Plex Mono (ejemplo de la diseñadora), servidas por Google Fonts bajo la licencia SIL Open Font License 1.1 (uso comercial permitido).
- **Íconos:** dibujados para esta plantilla (SVG simples). No se usan logos de marcas; las redes se muestran como texto.
- **Imágenes:** no hay fotos. Los bloques de reemplazo están hechos con CSS. `og-image.png` se generó con `scripts/og-image.mjs` a partir del config.
- **Textos legales:** no se incluyen. Si el sitio los necesita, debe proveerlos el cliente o su asesor.
