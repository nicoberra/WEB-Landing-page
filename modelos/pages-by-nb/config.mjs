// ============================================================================
//  MODELO: Pages by NB · venta de páginas web (Nicolás Berra)
//  Estilo colorido y juguetón, con el azul como color principal.
//  Tres productos: landing page, web e-commerce y CRM. Portfolio con todas
//  las webs hechas (capturas en assets/web-*.webp y assets/cel-*.webp).
//
//  ⚠ Lo marcado "PENDIENTE" es provisorio: nombre de marca, WhatsApp,
//  precios y dominio.
//  En los textos, *así* se pinta una palabra de color.
// ============================================================================

export default {
  demo: true,

  site: {
    lang: 'es-AR',
    locale: 'es_AR',
    url: 'https://www.example.com', // PENDIENTE: dominio final
    title: 'Pages by NB · Páginas web, tiendas online y CRM',
    description:
      'Diseño páginas web a medida para emprendedores y marcas: landing pages, tiendas online con Mercado Pago y CRM para ordenar tus clientes.',
    ogImage: '',
    themeColor: '#2B44FF',
    structuredData: false,
  },

  person: {
    name: 'Nicolás Berra',
    profession: 'Diseño y desarrollo web',
    photo: null,
  },

  // Nombre de la marca (PENDIENTE: confirmar). "word" va grande y "tag" en la
  // etiqueta de color al lado.
  brand: { word: 'pages', tag: 'by NB' },

  logo: { type: 'monogram', text: 'nb' },
  social: [],

  contact: {
    whatsapp: {
      number: '5491131751517',
      display: 'WhatsApp',
      message: '¡Hola Nico! Quiero consultar por una página web.',
    },
    email: '',
  },

  colors: {
    light: {
      bg: '#FFF8EE', // crema
      surface: '#FFFFFF',
      placeholder: '#EEF0FF',
      ink: '#0F1440', // azul noche (textos)
      muted: '#4A5072',
      line: '#E6E1D6',
      accent: '#2B44FF', // azul eléctrico (su color favorito)
      accentInk: '#FFFFFF',
      accentSoft: '#DDE2FF',
      highlight: '#FFD23F', // amarillo
    },
  },

  fonts: {
    googleFontsUrl:
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Plus+Jakarta+Sans:wght@400..800&family=Gochi+Hand&display=swap',
    display: "'Bricolage Grotesque', 'Arial Rounded MT Bold', sans-serif",
    displayWeight: 800,
    body: "'Plus Jakarta Sans', 'Helvetica Neue', Arial, sans-serif",
    accent: "'Gochi Hand', cursive",
    accentStyle: 'normal',
    mono: "'Plus Jakarta Sans', Arial, sans-serif",
  },

  hero: {
    eyebrow: 'Hola, soy Nico 👋',
    // Palabras que van cambiando en el título
    before: 'Webs que',
    words: ['venden', 'enamoran', 'se recuerdan', 'suman clientes'],
    text: 'Diseño páginas web a medida para emprendedores y marcas con ganas de crecer: lindas, rápidas en el celu y pensadas para que te escriban (y te compren).',
    cta: 'Quiero mi web',
    secondary: 'Ver trabajos',
    // Capturas de la portada (número de trabajo en works.items, desde 0)
    shots: [3, 4, 1],
    stickers: ['100% a medida', 'Rápida en el celu', '¡Con animaciones!'],
  },

  ticker: ['Landing pages', 'Tiendas online', 'CRM a medida', 'Mercado Pago', 'Botón de WhatsApp', 'Diseño único', 'Aparece en Google'],

  // Asistente "¿Qué necesitás?": cada opción recomienda un producto
  picker: {
    title: '¿Qué necesitás *hoy*?',
    options: [
      { text: 'Que me conozcan y me escriban', product: 'landing', emoji: '📣' },
      { text: 'Vender mis productos online', product: 'tienda', emoji: '🛍️' },
      { text: 'Ordenar clientes, pedidos y ventas', product: 'crm', emoji: '🗂️' },
    ],
  },

  products: {
    eyebrow: 'Lo que hago',
    title: 'Elegí tu *web*',
    intro: 'Tres productos, todos hechos a medida. Si no sabés cuál necesitás, escribime y lo vemos juntos.',
    items: [
      {
        id: 'landing',
        name: 'Landing page',
        color: 'blue',
        badge: 'La más pedida',
        pitch: 'Una página que presenta lo que hacés y lleva a la gente directo a escribirte.',
        ideal: 'Profesionales, servicios, cursos y lanzamientos.',
        features: ['Diseño único con tu marca', 'Botón y mensajes de WhatsApp', 'Animaciones y secciones a medida', 'Lista para Google y redes'],
        price: '', // PENDIENTE: ej. "Desde $150.000"
      },
      {
        id: 'tienda',
        name: 'Web e-commerce',
        color: 'pink',
        badge: 'Para vender 24/7',
        pitch: 'Tu tienda online con carrito, pagos con Mercado Pago y productos que se ven increíbles.',
        ideal: 'Marcas con productos físicos o digitales.',
        features: ['Catálogo y carrito', 'Cobros con Mercado Pago', 'Productos digitales con descarga', 'Pedidos por WhatsApp'],
        price: '',
      },
      {
        id: 'crm',
        name: 'CRM',
        color: 'mint',
        badge: '¡Nuevo!',
        pitch: 'Un sistema simple para ordenar tus clientes, consultas, pedidos y ventas en un solo lugar.',
        ideal: 'Negocios que reciben muchas consultas y quieren no perder ninguna.',
        features: ['Fichas de clientes', 'Seguimiento de consultas y ventas', 'Recordatorios y estados', 'Hecho a la medida de tu negocio'],
        price: '',
      },
    ],
    soonPrice: 'Consultá el precio',
  },

  // Portfolio: para sumar una web, agregá un ítem con sus capturas en assets/
  // (web-*.webp: página completa de compu, 720 px de ancho; cel-*.webp: celu).
  // url: dirección publicada (si está vacía, no se muestra el botón "Visitar").
  works: {
    eyebrow: 'Trabajos',
    title: 'Webs que *ya hice*',
    intro: 'Pasá el mouse (o tocá) para recorrer cada una de arriba a abajo.',
    items: [
      {
        name: 'NutriSigo',
        kind: 'Software para nutricionistas',
        type: ['crm'],
        tags: ['CRM', 'Panel + app para pacientes'],
        color: 'blue',
        web: 'assets/web-nutrisigo.webp',
        cel: 'assets/cel-nutrisigo.webp',
        url: 'https://www.nutrisigo.com',
      },
      {
        name: 'San Ou',
        kind: 'Herramientas hidráulicas',
        type: ['tienda'],
        tags: ['E-commerce', 'Catálogo', 'Precios mayoristas'],
        color: 'yellow',
        web: 'assets/web-sanou.webp',
        cel: 'assets/cel-sanou.webp',
        url: 'https://sanou.com.ar',
      },
      {
        name: 'Virtual Shop Baires',
        kind: 'Productos importados',
        type: ['tienda'],
        tags: ['E-commerce', 'Carrito', 'Categorías'],
        color: 'pink',
        web: 'assets/web-virtualshop.webp',
        cel: 'assets/cel-virtualshop.webp',
        url: 'https://virtualshopbaires.com.ar',
      },
      {
        name: 'Jesica Cuevas',
        kind: 'Nutricionista',
        type: ['landing', 'tienda'],
        tags: ['Landing', 'Tiendita de recetarios', 'Mercado Pago'],
        color: 'mint',
        web: 'assets/web-jesica-cuevas-v2.webp',
        cel: 'assets/cel-jesica-cuevas-v2.webp',
        url: '',
      },
      {
        name: 'DN Estética',
        kind: 'Estética facial y corporal',
        type: ['landing'],
        tags: ['Landing', 'Buscador de tratamientos'],
        color: 'peach',
        web: 'assets/web-daniela-bassano.webp',
        cel: 'assets/cel-daniela-bassano.webp',
        url: '',
      },
      {
        name: 'digitalbysofia_',
        kind: 'Diseño de contenido',
        type: ['landing'],
        tags: ['Landing', 'Portfolio'],
        color: 'pink',
        web: 'assets/web-digitalbysofia.webp',
        cel: 'assets/cel-digitalbysofia.webp',
        url: '',
      },
      {
        name: 'Jesica Cuevas · v1',
        kind: 'Nutricionista',
        type: ['landing'],
        tags: ['Landing', 'Recetarios'],
        color: 'yellow',
        web: 'assets/web-jesica-cuevas.webp',
        cel: 'assets/cel-jesica-cuevas.webp',
        url: '',
      },
    ],
  },

  perks: {
    eyebrow: 'Todas incluyen',
    title: 'Nada de webs *aburridas*',
    items: [
      { emoji: '📱', title: 'Perfecta en el celu', text: 'La mayoría de tus clientes te ve desde el teléfono.' },
      { emoji: '⚡', title: 'Carga rapidísimo', text: 'Liviana y sin vueltas, para que nadie se vaya.' },
      { emoji: '💬', title: 'WhatsApp a un toque', text: 'Botones con el mensaje ya escrito.' },
      { emoji: '🔎', title: 'Lista para Google', text: 'Títulos, descripción y vista previa para redes.' },
      { emoji: '✨', title: 'Animaciones', text: 'Detalles con movimiento que la hacen única.' },
      { emoji: '🌐', title: 'Tu dominio', text: 'Te ayudo a publicarla con tu propia dirección.' },
    ],
  },

  process: {
    eyebrow: 'Cómo trabajo',
    title: 'De la idea a tu web en *4 pasos*',
    steps: [
      { title: 'Charlamos', text: 'Me contás tu proyecto, qué vendés y a quién le hablás.' },
      { title: 'Diseño', text: 'Armo una propuesta con tus colores, fotos y textos.' },
      { title: 'Ajustamos', text: 'La revisamos juntos y cambiamos lo que haga falta.' },
      { title: '¡Online!', text: 'La publico con tu dominio y te enseño a usarla.' },
    ],
  },

  faq: {
    eyebrow: 'Preguntas',
    title: 'Lo que siempre me *preguntan*',
    items: [
      { q: '¿Cuánto tarda en estar lista?', a: 'Depende del proyecto: una landing page suele estar en pocas semanas; una tienda o un CRM llevan un poco más. Te paso los tiempos antes de empezar.' },
      { q: '¿Necesito tener logo, fotos y textos?', a: 'Ayuda, pero no es obligatorio. Si te falta algo, lo vemos juntos y te doy ideas para resolverlo.' },
      { q: '¿Puedo cobrar con Mercado Pago?', a: 'Sí. Las tiendas online pueden cobrar con Mercado Pago, y los productos digitales se pueden descargar después de pagar.' },
      { q: '¿Qué es un CRM y para qué me sirve?', a: 'Es un lugar donde ordenás a tus clientes, sus consultas y sus compras, para hacer seguimiento y no perder ventas. Lo armo a la medida de cómo trabajás.' },
      { q: '¿La web se ve bien en el celular?', a: 'Sí, todas se diseñan pensando primero en el celu y después en la compu.' },
    ],
  },

  end: {
    title: '¿Hacemos tu *web*?',
    text: 'Escribime por WhatsApp, contame tu idea y te paso una propuesta sin compromiso.',
    cta: 'Escribime por WhatsApp',
  },

  footer: { note: 'Páginas web, tiendas online y CRM a medida.' },
};
