// ============================================================================
//  CONFIGURACIÓN DEL SITIO · Jesica Cuevas, nutricionista (@nutricionista.cj)
//  Este es el ÚNICO archivo que hace falta editar para adaptar la página:
//  datos, textos, colores, fotos, servicios, recetarios, turnos, redes y
//  contacto. Después de editarlo, ejecutá `npm run build` (o `npm run dev`).
//
//  ⚠ DATOS PENDIENTES: los valores marcados con "PENDIENTE" son provisorios
//  y hay que reemplazarlos por los reales (`npm run check` los lista).
//
//  Convenciones:
//  - Los textos son texto plano. Para resaltar una palabra en cursiva con la
//    tipografía de acento, rodeala con asteriscos: "comer *rico*".
//  - Las fotos van en /public/assets/ y se referencian como "assets/archivo.jpg".
//    Si una foto queda en null, se muestra un bloque de reemplazo rotulado.
//  - Para quitar una sección, sacala de la lista `sections`.
//  - Atajos para enlaces: 'whatsapp', 'email', 'booking' (turnero) e
//    'instagram' se convierten en el enlace configurado más abajo.
// ============================================================================

export default {
  // true: muestra un aviso de versión en preparación, el formulario no envía
  // nada y la página no se indexa en buscadores. false al publicar.
  demo: true,

  // --- Datos del sitio y SEO --------------------------------------------------
  site: {
    lang: 'es-AR',
    locale: 'es_AR',
    url: 'https://www.example.com', // PENDIENTE: dominio final, sin barra al final
    title: 'Jesica Cuevas · Lic. en Nutrición · Nutrición deportiva',
    description:
      'Licenciada en Nutrición especialista en nutrición deportiva, antropometría y nutrición hormonal. Consultas en Castelar y online.',
    ogImage: 'assets/og-image.png', // 1200×630 px
    themeColor: '#3E5B47',
    structuredData: true,
  },

  // --- Profesional ------------------------------------------------------------
  person: {
    name: 'Jesica Cuevas',
    profession: 'Licenciada en Nutrición',
    license: 'M.N. 12233', // matrícula tal como debe mostrarse. Vacío = no se muestra.
    location: 'Castelar · Online y presencial',
    // position: qué parte de la foto queda visible al recortarla (horizontal vertical).
    photo: {
      src: 'assets/jesica-jardin.webp',
      alt: 'Jesica Cuevas sonriendo en un jardín',
      width: 960,
      height: 1280,
      position: '50% 30%',
    },
  },

  // --- Logo ---------------------------------------------------------------------
  // 'monogram' dibuja las iniciales; 'image' usa un archivo:
  // { type: 'image', src: 'assets/logo.svg', alt: '', width: 120, height: 40 }
  logo: { type: 'monogram', text: 'JC' },

  // --- Colores: tomados de su Instagram (verdes salvia y bosque, fondo crema) ------
  // `npm run check` avisa si algún par no llega al contraste mínimo (WCAG AA).
  // Sin paleta `dark`, el sitio se ve siempre con la paleta clara de la marca.
  colors: {
    light: {
      bg: '#F4F3EE', // fondo general (papel crema de sus posteos)
      surface: '#E8ECE0', // paneles y tarjetas (salvia muy claro)
      placeholder: '#DCE3D2', // bloques de foto
      ink: '#1F2D25', // texto principal (verde casi negro)
      muted: '#4F5E54', // texto secundario
      line: '#D3DACA', // bordes y divisores
      accent: '#3E5B47', // verde bosque (botones, enlaces)
      accentInk: '#FFFFFF', // texto sobre el verde
      accentSoft: '#D9E4CF', // salvia suave
      highlight: '#A7BC8F', // salvia (formas decorativas)
    },
  },

  // --- Tipografías (Google Fonts, licencia SIL Open Font License) -----------------
  fonts: {
    googleFontsUrl:
      'https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Caveat:wght@500&family=Montserrat:wght@400;500;600&display=swap',
    // Títulos: serif condensada, como sus placas. Acentos: manuscrita, como
    // "Saludable" o "Rapiditas". Textos: sans-serif clara.
    display: "'Instrument Serif', Georgia, 'Times New Roman', serif",
    displayWeight: 400,
    body: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
    accent: "'Caveat', 'Segoe Script', cursive",
    accentStyle: 'normal', // la manuscrita no necesita cursiva
    accentSize: '1.18em', // la manuscrita se ve más chica: se agranda un poco
    mono: "'Montserrat', 'Helvetica Neue', Arial, sans-serif", // rótulos pequeños
  },

  // --- Turnos, panel de pacientes y redes ------------------------------------------
  booking: {
    // PENDIENTE: enlace al turnero online. Mientras esté vacío, los botones de
    // turno llevan a la sección de turnos, que avisa que el enlace está pendiente.
    url: '',
    pendingNote: 'Turnero online: enlace pendiente de configuración.',
    // Cómo se reserva hoy, mientras no hay turnero propio. Vacío = no se muestra.
    interim: {
      text: 'Por ahora, reservá tu turno escribiendo a',
      label: '@nm.trainingcenter',
      url: 'https://www.instagram.com/nm.trainingcenter/',
    },
  },
  portal: {
    url: '', // PENDIENTE: enlace al panel de pacientes. Vacío = no se muestra.
    label: 'Acceso pacientes',
  },
  instagramUrl: 'https://www.instagram.com/nutricionista.cj/',

  // --- Secciones y navegación -----------------------------------------------------
  sections: ['hero', 'marquee', 'services', 'about', 'credentials', 'process', 'products', 'booking', 'instagram', 'faq', 'contact'],
  nav: [
    { id: 'planes', label: 'Planes' },
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'formacion', label: 'Trayectoria' },
    { id: 'recetarios', label: 'Recetarios' },
    { id: 'contacto', label: 'Contacto' },
  ],
  navCta: { label: 'Sacar turno', href: 'booking' },

  // --- Presentación inicial -----------------------------------------------------
  hero: {
    tagline: 'Rendí mejor, comé *sin restricciones*.',
    description:
      'Planes 100% personalizados según tu objetivo: rendimiento, descenso de grasa o aumento muscular. Con evaluación antropométrica y seguimiento.',
    primaryCta: { label: 'Sacar turno', href: 'booking' },
    secondaryCta: { label: 'Ver planes', href: '#planes' },
    badges: ['Planes 100% personalizados', 'Especialista en nutrición deportiva'], // etiquetas flotantes junto a la foto
  },

  // --- Cinta animada (frases de su Instagram) ----------------------------------------
  marquee: {
    items: [
      'Comé para nutrirte, no para castigarte',
      'No elimines: agregá y mejorá',
      'No hace falta hacerlo perfecto para empezar',
      'Rendí mejor',
      'Comé sin restricciones',
    ],
  },

  // --- Sobre mí -----------------------------------------------------------------
  about: {
    id: 'sobre-mi',
    eyebrow: 'Sobre mí',
    title: 'Comé para *nutrirte*, no para castigarte.',
    photo: {
      src: 'assets/jesica-retrato.webp',
      alt: 'Retrato de Jesica Cuevas con musculosa blanca',
      width: 960,
      height: 1280,
      position: '50% 25%',
    },
    paragraphs: [
      'Hola, soy Jesi, Licenciada en Nutrición y especialista en nutrición deportiva. Acompaño a deportistas, clubes y personas que quieren sentirse mejor, en consultorio y online.',
      'Me niego a que la única meta sea bajar de peso. Quiero que rindas mejor, que tengas energía y que aprendas a elegir qué comer en el súper, en tu casa o antes de entrenar. Mi objetivo es que, con el tiempo, no me necesites.',
    ],
    highlights: [
      { title: 'Mi enfoque', text: 'No elimines: agregá y mejorá. Sin dietas extremas ni listas de prohibidos.' },
      { title: 'Cómo trabajo', text: 'Planes 100% personalizados, evaluación antropométrica y seguimiento. Online o en Castelar.' },
      { title: 'Qué te llevás', text: 'Herramientas para comer rico, rendir mejor y sostenerlo en el tiempo.' },
    ],
  },

  // --- Planes 100% personalizados (lo principal: tomado de su placa de servicios) ----
  services: {
    id: 'planes',
    eyebrow: 'Consultas',
    title: 'Planes *100% personalizados*',
    intro: 'Cada plan se arma según tu objetivo: rendimiento, descenso de grasa o aumento muscular. Con evaluación antropométrica y seguimiento.',
    items: [
      {
        title: 'Nutrición deportiva',
        description: 'Mejora del rendimiento deportivo, con un plan pensado para tu deporte y tu rutina.',
      },
      {
        title: 'Antropometría',
        description: 'Descenso de grasa y/o aumento muscular, medido con evaluación antropométrica.',
      },
      {
        title: 'Plant-based, celiaquía, SIBO, IMO',
        description: 'Planes adaptados a tu forma de comer y a tu diagnóstico.',
      },
      {
        title: 'Cambio de hábitos y nutrición antiinflamatoria',
        description: 'Ordenar tu alimentación sin restricciones y sostenerlo en el tiempo.',
      },
      {
        title: 'Planificación de competencias',
        description: 'Tu alimentación organizada para llegar bien a cada competencia.',
      },
      {
        title: 'Nutrición hormonal',
        description: 'SOP, menopausia, endometriosis e hipotiroidismo.',
      },
    ],
  },

  // --- Especialidades y formación ------------------------------------------------------
  credentials: {
    id: 'formacion',
    eyebrow: 'Trayectoria',
    title: 'Experiencia y formación para *acompañarte* mejor',
    intro: 'Licenciada en Nutrición (M.N. 12233) con orientación al ámbito deportivo. Trabajo con deportistas, clubes y pacientes en consultorio.',
    // Especialidades como etiquetas (opcional). Vacío = solo se muestra la formación.
    specialtiesTitle: 'Especialidades',
    specialties: [],
    experienceTitle: 'Experiencia',
    experience: [
      {
        title: 'Nutrición deportiva, clínica y hormonal',
        place: 'Consultorio particular',
        detail: 'Evaluación y diagnóstico, planes personalizados, planificación de competencias y evaluación antropométrica.',
      },
      {
        title: 'Consultoría en clubes',
        place: 'Club Argentinos de Castelar y Club 77',
        detail: 'Charlas, talleres, planes personalizados, planificación de alimentación en viajes y evaluación antropométrica individual o grupal.',
      },
      {
        title: 'Asesoría nutricional',
        place: 'Savia Viandas Saludables',
        detail: 'Planificación de menús saludables según objetivos y cálculo de información nutricional.',
      },
    ],
    educationTitle: 'Formación',
    education: [
      { title: 'Licenciatura en Nutrición', detail: 'Universidad Nacional de La Matanza' },
      { title: 'Curso Internacional de Nutrición Hormonal', detail: 'Instituto Universitario Vive Sano', status: 'En curso' },
      { title: 'Posgrado Plant-Based con orientación deportiva', detail: 'ULP' },
      { title: 'Posgrado de Deportes Específicos', detail: 'Francis Holway' },
      { title: 'Curso de Antropometría ISAK II', detail: 'Francis Holway' },
      { title: 'Curso de Interpretación de Antropometría', detail: 'Francis Holway' },
      { title: 'Posgrado de Suplementación', detail: 'Suplementando ConCiencia' },
      { title: 'Tramo de Formación Pedagógica', detail: 'Universidad FASTA' },
      { title: 'Curso de Embarazo en Patologías y Situaciones de Riesgo', detail: 'Nutrinfo' },
      { title: 'Posgrado de Nutrición en Adultos Mayores', detail: 'Nutrinfo' },
      { title: 'Curso de Actualización en Microbiota', detail: 'AADYND' },
    ],
  },

  // --- Proceso --------------------------------------------------------------------
  process: {
    id: 'proceso',
    eyebrow: 'Paso a paso',
    title: 'Así arrancamos',
    steps: [
      { title: 'Reservás tu turno', text: 'Coordinás día y horario, presencial u online.' },
      { title: 'Primera consulta', text: 'Charlamos sobre tus hábitos, tu entrenamiento y tu objetivo. Hacemos la evaluación antropométrica.' },
      { title: 'Tu plan', text: 'Recibís un plan a tu medida, con ideas de comidas y reemplazos.' },
      { title: 'Seguimiento', text: 'Nos volvemos a ver para ajustar y sostener lo que funciona.' },
    ],
  },

  // --- Recetarios y productos (PENDIENTE: títulos, precios y enlaces reales) --------
  // href: enlace de compra (Mercado Pago, tienda, etc.). Vacío = abre WhatsApp
  // con un mensaje que nombra el producto.
  // image: null muestra un bloque "FOTO DEL RECETARIO".
  products: {
    id: 'recetarios',
    eyebrow: 'Recetarios',
    title: 'Recetas *rapiditas* para tu semana',
    intro: 'Guías digitales con recetas fáciles y reales. Las tenés en el celu para usarlas cuando quieras.',
    demoNote: 'Recetarios de ejemplo: títulos, descripciones y precios provisorios.',
    items: [
      {
        title: 'Snacks dulces saludables',
        description: 'Mug cakes, barritas y opciones dulces fáciles para cortar la tarde.',
        format: 'Recetario digital · PDF',
        price: '', // ej.: '$ 9.900'. Vacío = no se muestra.
        image: null,
        href: '',
        ctaLabel: 'Lo quiero',
      },
      {
        title: 'Pre y post entreno',
        description: 'Qué comer antes y después de entrenar, con recetas simples para cada momento.',
        format: 'Recetario digital · PDF',
        price: '',
        image: null,
        href: '',
        ctaLabel: 'Lo quiero',
      },
      {
        title: 'Viandas rapiditas',
        description: 'Ideas prácticas para armar almuerzos saludables y llevar a donde vayas.',
        format: 'Recetario digital · PDF',
        price: '',
        image: null,
        href: '',
        ctaLabel: 'Lo quiero',
      },
    ],
  },

  // --- Bloque de turnos -----------------------------------------------------------
  bookingSection: {
    id: 'turnos',
    eyebrow: 'Turnos',
    title: 'No hace falta hacerlo *perfecto* para empezar.',
    text: 'Reservá tu primera consulta, online o presencial en Castelar.',
    ctaLabel: 'Quiero mi turno',
  },

  // --- Instagram ------------------------------------------------------------------
  // images: fotos de publicaciones para los bloques, ej.: [{ src: 'assets/ig-1.jpg', alt: '...' }]
  instagram: {
    id: 'instagram',
    eyebrow: 'Instagram',
    handle: '@nutricionista.cj',
    title: 'Recetas, reemplazos saludables, data del súper y el día a día del consultorio.',
    ctaLabel: 'Seguime en Instagram',
    tiles: 4,
    images: [],
  },

  // --- Preguntas frecuentes (PENDIENTE: validar respuestas con Jesica) ---------------
  faq: {
    id: 'preguntas',
    eyebrow: 'Preguntas frecuentes',
    title: 'Antes de tu *consulta*',
    intro: '¿No encontrás tu duda? Escribime y te respondo.',
    items: [
      { q: '¿Cómo saco un turno?', a: 'Por ahora, escribiéndole a @nm.trainingcenter por Instagram. Muy pronto vas a poder reservar desde el turnero online.' },
      { q: '¿Atendés online?', a: 'Sí. Atiendo online por videollamada y presencial en Castelar. El plan te llega en formato digital.' },
      { q: '¿Tengo que dejar de comer lo que me gusta?', a: 'No. La idea es no eliminar, sino agregar y mejorar. Armamos un plan que se adapte a vos.' },
      { q: '¿Trabajás con deportistas y clubes?', a: 'Sí. Armo planes para mejorar el rendimiento y planifico la alimentación para competencias.' },
      { q: '¿Qué es la evaluación antropométrica?', a: 'Son mediciones corporales con protocolo ISAK que permiten seguir cambios en grasa y masa muscular, más allá del peso.' },
      { q: '¿Qué llevo a la primera consulta?', a: 'Si tenés análisis recientes, traelos. Y muchas ganas de contarme cómo es tu día a día.' },
      { q: '¿Cómo recibo un recetario?', a: 'Después de la compra te llega el archivo digital para usarlo desde el celu o imprimirlo.' },
    ],
  },

  // --- Contacto -------------------------------------------------------------------
  contact: {
    id: 'contacto',
    eyebrow: 'Contacto',
    title: '¿Arrancamos? *Escribime*',
    intro: 'Contame qué te gustaría trabajar y te respondo por WhatsApp.',
    whatsapp: {
      number: '5491164072673', // formato internacional, solo dígitos
      display: '+54 9 11 6407-2673',
      message: 'Hola Jesi! Vi tu página y quería hacerte una consulta.',
    },
    email: 'nutricionista.cj@gmail.com', // del CV. Vacío = no se muestra.
    responseNote: '',
    form: {
      enabled: true,
      // 'demo' valida sin enviar; 'whatsapp' abre WhatsApp con el mensaje armado;
      // 'email' abre el correo (requiere `email`).
      mode: 'whatsapp',
      title: 'Dejame tu consulta',
      projectTypes: ['Nutrición deportiva', 'Salud hormonal', 'Plan de alimentación', 'Consulta online', 'Recetarios', 'Otra consulta'],
      typeLabel: 'Motivo de consulta',
      messageHint: 'Contame brevemente qué te gustaría trabajar.',
      submitLabel: 'Enviar por WhatsApp',
    },
  },

  // --- Redes y pie de página ---------------------------------------------------------
  // Dejá url vacía ('') para ocultar una red.
  social: [{ label: 'Instagram', url: 'https://www.instagram.com/nutricionista.cj/' }],
  footer: {
    note: 'Licenciada en Nutrición · M.N. 12233. Nutrición deportiva y hormonal. Castelar · Online y presencial.',
    links: [],
    demoNotice: 'Versión en preparación: recetarios, precios y turnero provisorios.',
  },
};
