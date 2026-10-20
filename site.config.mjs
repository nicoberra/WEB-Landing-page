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
    photo: null, // PENDIENTE: { src: 'assets/jesica.jpg', alt: 'Jesica Cuevas sonriendo en su consultorio' }
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
  },
  portal: {
    url: '', // PENDIENTE: enlace al panel de pacientes. Vacío = no se muestra.
    label: 'Acceso pacientes',
  },
  instagramUrl: 'https://www.instagram.com/nutricionista.cj/',

  // --- Secciones y navegación -----------------------------------------------------
  sections: ['hero', 'marquee', 'about', 'services', 'credentials', 'process', 'products', 'booking', 'instagram', 'faq', 'contact'],
  nav: [
    { id: 'sobre-mi', label: 'Sobre mí' },
    { id: 'consultas', label: 'Consultas' },
    { id: 'formacion', label: 'Formación' },
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
    secondaryCta: { label: 'Ver recetarios', href: '#recetarios' },
    badges: ['Especialista en nutrición deportiva', 'Antropometrista ISAK nivel 2'], // etiquetas flotantes junto a la foto
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
    paragraphs: [
      'Hola, soy Jesi, Licenciada en Nutrición y especialista en nutrición deportiva. Trabajo con deportistas, clubes y con personas que quieren sentirse mejor, en mi consultorio de Castelar y online.',
      'Me niego a que la única meta sea bajar de peso. Quiero que rindas mejor, que tengas energía y que aprendas a elegir qué comer en el súper, en tu casa o antes de entrenar. Mi objetivo es que, con el tiempo, no me necesites.',
    ],
    highlights: [
      { title: 'Mi enfoque', text: 'No elimines: agregá y mejorá. Sin dietas extremas ni listas de prohibidos.' },
      { title: 'Cómo trabajo', text: 'Planes 100% personalizados, evaluación antropométrica y seguimiento. Online o en Castelar.' },
      { title: 'Qué te llevás', text: 'Herramientas para comer rico, rendir mejor y sostenerlo en el tiempo.' },
    ],
  },

  // --- Consultas / especialidades --------------------------------------------------
  services: {
    id: 'consultas',
    eyebrow: 'Consultas',
    title: 'Cómo te puedo *acompañar*',
    intro: 'Planes 100% personalizados según tu objetivo. Si no sabés por dónde empezar, escribime y lo vemos.',
    items: [
      {
        title: 'Nutrición deportiva',
        description: 'Para que tu alimentación acompañe tu entrenamiento y mejore tu rendimiento.',
        includes: ['Plan según tu deporte y tu rutina', 'Planificación de competencias', 'Trabajo con deportistas y clubes'],
        idealFor: 'Si entrenás o competís y querés rendir mejor.',
      },
      {
        title: 'Antropometría',
        description: 'Evaluación corporal con protocolo ISAK para objetivos de descenso de grasa o aumento muscular.',
        includes: ['Mediciones antropométricas', 'Plan según tu objetivo', 'Seguimiento de tus cambios'],
        idealFor: 'Si querés medir tu progreso más allá de la balanza.',
      },
      {
        title: 'Nutrición hormonal',
        description: 'Una alimentación pensada para acompañar SOP, menopausia, endometriosis o hipotiroidismo.',
        includes: ['Evaluación de hábitos y síntomas', 'Plan personalizado', 'Seguimiento cercano'],
        idealFor: 'Si querés entender a tu cuerpo y sentirte mejor.',
      },
      {
        title: 'Nutrición clínica y hábitos',
        description: 'Cambio de hábitos, alimentación antiinflamatoria y planes para necesidades específicas.',
        includes: ['Plant-based', 'Celiaquía, SIBO e IMO', 'Alimentación antiinflamatoria'],
        idealFor: 'Si necesitás un plan adaptado a tu situación.',
      },
    ],
  },

  // --- Especialidades y formación ------------------------------------------------------
  credentials: {
    id: 'formacion',
    eyebrow: 'Especialidades y formación',
    title: 'Formación para *acompañarte* mejor',
    specialtiesTitle: 'Especialidades',
    specialties: [
      'Nutrición deportiva (mejora del rendimiento)',
      'Antropometría: descenso de grasa y/o aumento muscular',
      'Plant-based, celiaquía, SIBO, IMO',
      'Nutrición clínica, cambio de hábitos y antiinflamatoria',
      'Planificación de competencias',
      'Nutrición hormonal: SOP, menopausia, endometriosis, hipotiroidismo',
    ],
    educationTitle: 'Formación',
    education: [
      { title: 'Licenciada en Nutrición', detail: 'M.N. 12233' },
      { title: 'Antropometrista ISAK nivel 2', detail: 'Francis Holway' },
      { title: 'Posgrado en Deportes Específicos', detail: 'Francis Holway' },
      { title: 'Posgrado en Suplementación', detail: 'Suplementando ConCiencia' },
      { title: 'Posgrado Plant-Based con orientación deportiva', detail: 'ULP' },
      { title: 'Curso Internacional de Nutrición Hormonal', detail: 'Viví Sano' },
      { title: 'Actualización en Microbiota', detail: 'AADYND' },
    ],
  },

  // --- Proceso --------------------------------------------------------------------
  process: {
    id: 'proceso',
    eyebrow: 'Paso a paso',
    title: 'Así arrancamos',
    steps: [
      { title: 'Reservás tu turno', text: 'Elegís día y horario en el turnero online, presencial u online.' },
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
      { q: '¿Cómo saco un turno?', a: 'Desde el botón "Sacar turno" entrás al turnero online y elegís día, horario y modalidad.' },
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
    email: '', // opcional. Vacío = no se muestra.
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
