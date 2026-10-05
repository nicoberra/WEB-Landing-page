// ============================================================================
//  CONFIGURACIÓN DEL SITIO
//  Este es el ÚNICO archivo que hace falta editar para adaptar la plantilla
//  a otro profesional: datos, textos, colores, fotos, servicios, proyectos,
//  redes y contacto. Después de editarlo, ejecutá `npm run build`.
//
//  Convenciones:
//  - Los textos son texto plano. Para resaltar una palabra en cursiva con la
//    tipografía de acento, rodeala con asteriscos: "con *criterio*".
//  - Las fotos van en /public/assets/ y se referencian como "assets/archivo.jpg".
//    Si una foto queda en null, se muestra un bloque de reemplazo rotulado.
//  - Para quitar una sección, sacala de la lista `sections`.
// ============================================================================

export default {
  // --- Modo demostración ----------------------------------------------------
  // true: muestra avisos de que la marca y los proyectos son de muestra,
  // y el formulario no envía nada. Ponelo en false al publicar un sitio real.
  demo: true,

  // --- Datos del sitio y SEO --------------------------------------------------
  site: {
    lang: 'es-AR',
    locale: 'es_AR',
    url: 'https://www.example.com', // dominio final, sin barra al final
    title: 'Martina López · Diseñadora gráfica independiente',
    description:
      'Identidad visual, diseño editorial, packaging y piezas para redes para emprendimientos, marcas pequeñas y proyectos culturales.',
    ogImage: 'assets/og-image.png', // 1200×630 px
    themeColor: '#2A36C9',
    // Agrega datos estructurados (schema.org/Person) con nombre, profesión y redes.
    structuredData: true,
  },

  // --- Profesional ------------------------------------------------------------
  person: {
    name: 'Martina López',
    profession: 'Diseñadora gráfica independiente',
    location: 'Trabajo a distancia', // ej.: "Rosario, Argentina · también a distancia"
    photo: null, // ej.: { src: 'assets/martina.jpg', alt: 'Martina López sonriendo en su estudio' }
  },

  // --- Logo ---------------------------------------------------------------------
  // type 'monogram' dibuja las iniciales con los colores de la marca.
  // type 'image' usa un archivo: { type: 'image', src: 'assets/logo.svg', alt: 'Logo de ...', width: 120, height: 32 }
  logo: { type: 'monogram', text: 'ml' },

  // --- Colores ------------------------------------------------------------------
  // Se usan en toda la página. `npm run check` avisa si algún par no llega
  // al contraste mínimo recomendado (WCAG AA).
  colors: {
    light: {
      bg: '#F2F3EF', // fondo general
      surface: '#E6E8E1', // paneles y tarjetas
      placeholder: '#DCDFD6', // bloques de foto
      ink: '#16181D', // texto principal
      muted: '#4F5560', // texto secundario
      line: '#C9CCC2', // bordes y divisores
      accent: '#2A36C9', // color de marca (botones, enlaces)
      accentInk: '#FFFFFF', // texto sobre el color de marca
      accentSoft: '#DADDF7', // fondos suaves con el color de marca
      highlight: '#E9533B', // detalle puntual (marcas de registro)
    },
    dark: {
      bg: '#111318',
      surface: '#1A1D24',
      placeholder: '#232731',
      ink: '#ECEDE8',
      muted: '#A3A8B3',
      line: '#2E333D',
      accent: '#93A0FF',
      accentInk: '#0E1020',
      accentSoft: '#232A55',
      highlight: '#FF7B63',
    },
  },

  // --- Tipografías --------------------------------------------------------------
  // Se cargan desde Google Fonts (licencia SIL Open Font License).
  // Si cambiás las familias, actualizá también `googleFontsUrl`.
  fonts: {
    googleFontsUrl:
      'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,700;12..96,800&family=Instrument+Serif:ital@1&family=IBM+Plex+Mono:wght@400;500&display=swap',
    display: "'Bricolage Grotesque', 'Helvetica Neue', Arial, sans-serif",
    body: "'Bricolage Grotesque', 'Helvetica Neue', Arial, sans-serif",
    accent: "'Instrument Serif', Georgia, 'Times New Roman', serif",
    mono: "'IBM Plex Mono', ui-monospace, Menlo, Consolas, monospace",
  },

  // --- Orden de secciones y navegación -----------------------------------------
  // Quitá o reordená ids. `nav` define qué aparece en el menú y con qué texto.
  sections: ['hero', 'about', 'services', 'process', 'projects', 'faq', 'contact'],
  nav: [
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'proceso', label: 'Proceso' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'preguntas', label: 'Preguntas' },
  ],
  navCta: { label: 'Contacto', href: '#contacto' },

  // --- Presentación inicial -----------------------------------------------------
  hero: {
    tagline: 'Diseño gráfico con *criterio* para marcas que están por mostrarse.',
    description:
      'Ayudo a emprendimientos, marcas pequeñas y proyectos culturales a ordenar cómo se ven: una identidad clara, piezas coherentes y archivos listos para usar.',
    primaryCta: { label: 'Escribime por WhatsApp', href: 'whatsapp' }, // 'whatsapp', 'email' o un enlace
    secondaryCta: { label: 'Ver proyectos', href: '#proyectos' },
  },

  // --- Sobre mí -----------------------------------------------------------------
  about: {
    id: 'sobre-mi',
    eyebrow: 'Sobre mí',
    title: 'Me gusta que una marca se *entienda* antes de que se luzca.',
    paragraphs: [
      'Soy Martina, diseñadora gráfica. Trabajo de forma independiente con personas que tienen un proyecto propio y necesitan que su comunicación visual esté a la altura de lo que hacen.',
      'Antes de abrir un programa de diseño, pregunto mucho: a quién le hablás, qué querés que sientan y dónde se va a ver cada pieza. Con esas respuestas armo propuestas simples de aplicar y fáciles de sostener en el tiempo.',
    ],
    highlights: [
      { title: 'Trabajo con', text: 'Emprendimientos, marcas pequeñas, estudios y proyectos culturales.' },
      { title: 'Cómo trabajo', text: 'Por etapas, con propuestas explicadas y revisiones acordadas desde el inicio.' },
      { title: 'Qué te llevás', text: 'Archivos ordenados para imprenta y pantalla, y una guía para usarlos.' },
    ],
  },

  // --- Servicios ----------------------------------------------------------------
  services: {
    id: 'servicios',
    eyebrow: 'Servicios',
    title: 'Lo que puedo hacer por tu proyecto',
    intro: 'Cada servicio se puede contratar por separado. Si no sabés por dónde empezar, lo vemos juntas en la primera charla.',
    items: [
      {
        title: 'Identidad visual',
        description: 'El sistema que hace reconocible a tu marca, pensado para usarse en todos lados.',
        includes: ['Logo y variantes', 'Paleta de colores y tipografías', 'Guía de uso básica'],
        idealFor: 'Marcas nuevas o que necesitan ordenarse.',
      },
      {
        title: 'Diseño editorial',
        description: 'Publicaciones legibles y con carácter, del primer boceto al archivo para imprenta.',
        includes: ['Diagramación de revistas, catálogos o fanzines', 'Grilla y estilos reutilizables', 'Preparación de originales'],
        idealFor: 'Proyectos culturales, catálogos de producto y publicaciones independientes.',
      },
      {
        title: 'Packaging y etiquetas',
        description: 'Envases y etiquetas que se distinguen en la góndola y respetan la información obligatoria.',
        includes: ['Diseño de etiqueta o caja', 'Adaptación a distintos tamaños', 'Archivos con troquel para imprenta'],
        idealFor: 'Productos artesanales y líneas nuevas.',
      },
      {
        title: 'Piezas para redes',
        description: 'Plantillas y piezas coherentes con tu identidad, para publicar con constancia sin depender de mí.',
        includes: ['Plantillas editables para publicaciones e historias', 'Piezas para lanzamientos o campañas', 'Indicaciones para usarlas'],
        idealFor: 'Marcas que publican seguido y quieren verse consistentes.',
      },
    ],
  },

  // --- Proceso de trabajo -------------------------------------------------------
  process: {
    id: 'proceso',
    eyebrow: 'Proceso',
    title: 'Cómo trabajamos, paso a paso',
    steps: [
      { title: 'Primera charla', text: 'Me contás tu proyecto, qué necesitás y para cuándo. Sin compromiso.' },
      { title: 'Propuesta', text: 'Te envío alcance, etapas, plazos y presupuesto por escrito para que decidas con claridad.' },
      { title: 'Diseño y ajustes', text: 'Presento las propuestas explicadas y hacemos las rondas de cambios acordadas.' },
      { title: 'Entrega', text: 'Recibís los archivos finales ordenados y una guía para usarlos.' },
    ],
  },

  // --- Proyectos ----------------------------------------------------------------
  // Si `demo` es true, cada proyecto se marca como "Muestra".
  // image: null muestra un bloque "FOTO DEL PROYECTO". Para una foto real:
  // image: { src: 'assets/proyecto-1.jpg', alt: 'Descripción de la imagen' }
  projects: {
    id: 'proyectos',
    eyebrow: 'Proyectos',
    title: 'Una selección de trabajos',
    intro: 'Algunos ejemplos del tipo de proyectos que hago.',
    demoNote: 'Proyectos ficticios de muestra: ilustran el formato de la sección y no son trabajos reales.',
    filterLabel: 'Filtrar proyectos por categoría',
    allLabel: 'Todos',
    items: [
      {
        title: 'Identidad para una panadería de barrio',
        category: 'Identidad',
        description: 'Logo, paleta cálida y aplicaciones en bolsas, etiquetas y cartelería.',
        image: null,
        link: null, // ej.: { label: 'Ver caso', href: 'https://...' }
      },
      {
        title: 'Etiquetas para una línea de té en hebras',
        category: 'Packaging',
        description: 'Sistema de etiquetas con un color por variedad y la información de cada blend.',
        image: null,
        link: null,
      },
      {
        title: 'Revista de un centro cultural',
        category: 'Editorial',
        description: 'Grilla, estilos tipográficos y portada para una publicación trimestral.',
        image: null,
        link: null,
      },
      {
        title: 'Plantillas para un estudio de yoga',
        category: 'Redes',
        description: 'Plantillas editables para horarios, novedades y frases de las clases.',
        image: null,
        link: null,
      },
      {
        title: 'Afiches para un ciclo de cine',
        category: 'Editorial',
        description: 'Serie de afiches con una estructura común y una imagen distinta por función.',
        image: null,
        link: null,
      },
      {
        title: 'Cajas para velas artesanales',
        category: 'Packaging',
        description: 'Caja con troquel simple, sello de aroma y una tarjeta de cuidados.',
        image: null,
        link: null,
      },
    ],
  },

  // --- Preguntas frecuentes -----------------------------------------------------
  faq: {
    id: 'preguntas',
    eyebrow: 'Preguntas frecuentes',
    title: 'Antes de escribirme',
    intro: '¿No encontrás tu duda? Escribime y te respondo.',
    items: [
      {
        q: '¿Cómo empezamos?',
        a: 'Me escribís por WhatsApp o email con una idea general de lo que necesitás. Coordinamos una charla corta y después te envío una propuesta por escrito.',
      },
      {
        q: '¿Cuánto cuesta un proyecto?',
        a: 'Depende del alcance, la cantidad de piezas y los plazos. Por eso el presupuesto llega después de la primera charla, detallado por etapas.',
      },
      {
        q: '¿Cuánto tiempo lleva?',
        a: 'Lo definimos en la propuesta según el proyecto y tu fecha objetivo. Si tenés un lanzamiento, contámelo desde el principio.',
      },
      {
        q: '¿Trabajás con personas de otras ciudades?',
        a: 'Sí. Las charlas y revisiones se pueden hacer por videollamada y los archivos se comparten en línea.',
      },
      {
        q: '¿Qué archivos recibo al final?',
        a: 'Los formatos que necesites para imprenta y pantalla, ordenados en carpetas y con nombres claros. Lo detallamos en la propuesta.',
      },
      {
        q: '¿Puedo contratar solo una parte?',
        a: 'Sí. Por ejemplo, solo el logo o solo las plantillas para redes. Te voy a avisar si alguna pieza depende de otra para funcionar bien.',
      },
    ],
  },

  // --- Contacto -------------------------------------------------------------------
  contact: {
    id: 'contacto',
    eyebrow: 'Contacto',
    title: '¿Tenés un proyecto en *mente*?',
    intro: 'Contame en pocas líneas qué necesitás. Te respondo para coordinar una primera charla.',
    // WhatsApp: número en formato internacional, solo dígitos (ej.: 5491122334455).
    whatsapp: {
      number: '5490000000000',
      display: '+54 9 000 000-0000',
      message: 'Hola Martina, vi tu página y quería consultarte por un proyecto.',
    },
    email: 'hola@example.com',
    responseNote: 'Respondo consultas de lunes a viernes.',
    form: {
      enabled: true,
      // 'demo': valida y muestra el resultado, pero no envía ni guarda nada.
      // 'whatsapp': arma el mensaje y abre WhatsApp con el texto listo para enviar.
      // 'email': abre el programa de correo con el mensaje armado.
      mode: 'demo',
      title: 'Dejame tu consulta',
      projectTypes: ['Identidad visual', 'Diseño editorial', 'Packaging y etiquetas', 'Piezas para redes', 'Otro / no estoy segura'],
      submitLabel: 'Enviar consulta',
    },
  },

  // --- Pie de página ---------------------------------------------------------------
  // Dejá url vacía ('') para ocultar una red.
  social: [
    { label: 'Instagram', url: 'https://www.instagram.com/' },
    { label: 'Behance', url: 'https://www.behance.net/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
  ],
  footer: {
    note: 'Diseño gráfico para emprendimientos, marcas pequeñas y proyectos culturales.',
    links: [
      // Enlaces extra configurables, ej.: { label: 'Política de privacidad', href: 'privacidad.html' }
    ],
    demoNotice: 'Sitio demostrativo: la marca, los textos, los datos de contacto y los proyectos son ficticios.',
  },
};
