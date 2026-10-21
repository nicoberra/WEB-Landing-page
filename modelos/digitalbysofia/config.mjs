// ============================================================================
//  MODELO: digitalbysofia_ · Sofía Lencina (@digitalbysofia_)
//  Diseño de contenido, edición de videos, carruseles, logotipos e identidad
//  visual. Este modelo tiene su propia plantilla (page.mjs, styles.css y
//  main.js en esta carpeta): un recorrido con un celular en 3D que muestra
//  cada servicio mientras se baja por la página.
//
//  ⚠ Los valores marcados con "PENDIENTE" son provisorios.
//  Para resaltar una palabra con la letra de acento, rodeala con asteriscos.
// ============================================================================

export default {
  demo: true,

  site: {
    lang: 'es-AR',
    locale: 'es_AR',
    url: 'https://www.example.com', // PENDIENTE: dominio final
    title: 'digitalbysofia_ · Diseño de contenido e identidad visual',
    description:
      'Sofía Lencina: diseño de contenido para redes, edición de videos, carruseles, logotipos e identidad visual para potenciar tu marca.',
    ogImage: 'assets/og-digitalbysofia.png',
    themeColor: '#B3164F',
    structuredData: true,
  },

  person: {
    name: 'Sofía Lencina',
    profession: 'Diseño de contenido e identidad visual',
    location: '',
    photo: null, // PENDIENTE: { src: 'assets/sofia.webp', alt: 'Sofía Lencina', width: 960, height: 1200 }
  },

  brand: {
    wordmark: 'digitalbysofia_',
    tagline: 'SOFIA LENCINA',
  },

  // Logo dibujado con texto (como su marca). Para un archivo:
  // { type: 'image', src: 'assets/logo.svg', alt: '', width: 160, height: 40 }
  logo: { type: 'monogram', text: 's' },

  // Colores de su marca: rosa empolvado, frambuesa del logo y bordó del anturio.
  colors: {
    light: {
      bg: '#F8EEEC', // fondo (rosa papel)
      surface: '#F2E0DD', // paneles
      placeholder: '#EBD2CF', // bloques de foto
      ink: '#3B0F1F', // texto (vino)
      muted: '#744553', // texto secundario
      line: '#E5C7C3', // líneas
      accent: '#B3164F', // frambuesa del logo
      accentInk: '#FFFFFF',
      accentSoft: '#F5D5DB', // rosa suave
      highlight: '#E8A9B5', // rosa de las curvas (decorativo)
    },
  },

  fonts: {
    googleFontsUrl:
      'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&family=Instrument+Serif:ital@1&display=swap',
    display: "'Poppins', 'Helvetica Neue', Arial, sans-serif", // como el logotipo
    displayWeight: 600,
    body: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
    accent: "'Instrument Serif', Georgia, serif",
    accentStyle: 'italic',
    accentSize: '1.08em',
    mono: "'Poppins', 'Helvetica Neue', Arial, sans-serif",
  },

  // --- Recorrido: un capítulo por servicio ---------------------------------------
  // screen: qué se dibuja en la pantalla del celular
  //   (perfil, contenido, carrusel, video, logo, identidad).
  // side: de qué lado va el texto ('left' o 'right'); el celular va del otro.
  // card: true muestra además la tarjeta de marca en 3D.
  story: {
    hero: {
      eyebrow: 'Diseño contenido que conecta ✦',
      title: 'Identidad visual para *potenciar* tu marca.',
      text: 'Diseño de contenido para redes, edición de videos, carruseles y logotipos. Bajá y mirá cómo puede verse tu marca.',
      primaryCta: { label: 'Quiero mi propuesta', href: '#contacto' },
      secondaryCta: { label: 'Ver servicios', href: '#servicios' },
      hint: 'Bajá para recorrer',
      screen: 'perfil',
    },
    chapters: [
      {
        id: 'servicios',
        eyebrow: 'Diseño de contenido',
        word: 'Contenido',
        title: 'que conecta con tu comunidad.',
        text: 'Publicaciones con una estética coherente, pensadas para tu público y para que tu perfil se vea como una marca.',
        point: { title: 'Un feed con identidad', text: 'Cada pieza sigue tu paleta, tus tipografías y tu tono.' },
        screen: 'contenido',
        side: 'left',
      },
      {
        id: 'carruseles',
        eyebrow: 'Carruseles',
        word: 'Carruseles',
        title: 'que se leen hasta el final.',
        text: 'Ordeno tu información en slides claros, con un gancho al principio y un llamado a la acción al cierre.',
        point: { title: 'Pensados para guardar y compartir', text: 'Contenido útil, fácil de leer en el celular.' },
        screen: 'carrusel',
        side: 'right',
      },
      {
        id: 'videos',
        eyebrow: 'Edición de videos',
        word: 'Reels',
        title: 'con ritmo, subtítulos y tu estilo.',
        text: 'Edito tus videos para redes: cortes dinámicos, textos en pantalla, música y portadas que siguen tu identidad.',
        point: { title: 'Subtítulos incluidos', text: 'Para que se entienda aunque se mire sin sonido.' },
        screen: 'video',
        side: 'left',
      },
      {
        id: 'logotipos',
        eyebrow: 'Logotipos',
        word: 'Logo',
        title: 'que se reconoce de un vistazo.',
        text: 'Diseño tu logotipo y sus versiones para que funcione en tu perfil, en tu packaging y en todo lo que hagas.',
        point: { title: 'Versiones para cada uso', text: 'Principal, secundaria y para fondos de color.' },
        screen: 'logo',
        side: 'right',
        card: true,
      },
      {
        id: 'identidad',
        eyebrow: 'Identidad visual',
        word: 'Identidad',
        title: 'para que tu marca se vea siempre igual de bien.',
        text: 'Paleta de colores, tipografías, elementos gráficos y una guía para aplicarlos en cada publicación.',
        point: { title: 'Tu marca en un solo lugar', text: 'Una guía simple para usar tu identidad sin dudar.' },
        screen: 'identidad',
        side: 'left',
        card: true,
      },
    ],
    end: {
      title: 'Tus ideas son buenas. *Hagamos que se vean.*',
      text: 'Contame qué necesitás y armamos una propuesta para tu marca.',
      primaryCta: { label: 'Escribime por Instagram', href: 'instagram-dm' },
      secondaryCta: { label: 'Ver mi portfolio', href: 'https://sofialencina.my.canva.site/portfolio' },
    },
  },

  // --- Página después del recorrido ------------------------------------------------
  // Estructura de ventas inspirada en la página de referencia (bycadigital),
  // adaptada a servicios: problemas, antes y después, servicios, para quién es.
  pains: {
    id: 'te-pasa',
    eyebrow: '¿Te pasa?',
    title: 'Tu marca merece verse *como la imaginás*',
    items: [
      { title: 'Lo dejás para la semana que viene.', text: 'Y la semana que viene pasa lo mismo. El contenido de tu marca siempre queda último en la lista.' },
      { title: 'Abrís Canva y te quedás en blanco.', text: 'Sabés lo que querés decir, pero no cómo mostrarlo. Colores, tipografías, márgenes… y no publicás nada.' },
      { title: 'Tu feed no se siente tuyo.', text: 'Cada publicación parece de una marca distinta y cuesta reconocerte al mirar tu perfil completo.' },
      { title: 'Grabás videos que nunca editás.', text: 'Quedan guardados en el celular porque editarlos lleva más tiempo del que tenés.' },
    ],
  },

  contrast: {
    before: 'Horas pensando qué y cómo publicar.',
    after: 'Contenido listo, con tu estética.',
    text: 'Vos te ocupás de tu marca. Yo diseño, edito y te entrego todo listo para publicar.',
  },

  offer: {
    id: 'servicios-detalle',
    eyebrow: 'Servicios',
    title: 'Elegí lo que *tu marca* necesita',
    intro: 'Podés contratar un servicio solo o combinarlos. Escribime y armamos una propuesta a tu medida.',
    ctaLabel: 'Pedir presupuesto',
    items: [
      { title: 'Diseño de contenido', text: 'Publicaciones e historias con tu estética.', includes: ['Piezas para feed e historias', 'Coherentes con tu identidad', 'Listas para publicar'] },
      { title: 'Carruseles', text: 'Información clara, slide por slide.', includes: ['Portada que frena el scroll', 'Contenido ordenado', 'Cierre con llamado a la acción'] },
      { title: 'Edición de videos', text: 'Reels con ritmo y subtítulos.', includes: ['Cortes y transiciones', 'Textos y subtítulos', 'Portada para el feed'] },
      { title: 'Logotipos', text: 'Una marca que se reconoce.', includes: ['Logo principal', 'Versiones secundarias', 'Archivos para cada uso'] },
      { title: 'Identidad visual', text: 'Tu marca, ordenada en una guía.', includes: ['Paleta y tipografías', 'Elementos gráficos', 'Guía de uso'] },
    ],
  },

  marquee: ['Diseño a medida', 'Tu estética', 'Listo para publicar', 'Carruseles', 'Reels', 'Logotipos', 'Identidad visual'],

  forYou: {
    id: 'para-vos',
    eyebrow: 'Para quién es',
    title: 'Es para vos *si…*',
    items: [
      { title: 'Tenés una marca, un emprendimiento o creás contenido.', text: 'Y querés que quien entre a tu perfil entienda quién sos y qué hacés.' },
      { title: 'No sabés diseñar (y no hace falta).', text: 'De los colores, las tipografías y la edición me ocupo yo.' },
      { title: 'Querés publicar seguido sin repetirte.', text: 'Publicaciones, carruseles, historias y reels con una misma estética.' },
      { title: 'Buscás una imagen profesional.', text: 'Una identidad clara que se sostenga en cada publicación.' },
    ],
  },

  about: {
    id: 'sobre-mi',
    eyebrow: 'Sobre mí',
    title: 'Hola, soy *Sofía*.',
    paragraphs: [
      'Detrás de digitalbysofia_ estoy yo, Sofía Lencina. Diseño contenido para marcas y emprendimientos que quieren comunicar con una estética propia.',
      'Me encargo de que tu marca se vea coherente en cada publicación: desde el logo y la paleta hasta los carruseles y los videos de todos los días.',
    ],
  },

  process: {
    id: 'proceso',
    eyebrow: 'Cómo trabajamos',
    title: 'De la idea a tu feed',
    steps: [
      { title: 'Charlamos', text: 'Me contás sobre tu marca, tu público y lo que necesitás.' },
      { title: 'Propuesta', text: 'Te envío una propuesta con el servicio, los tiempos y el presupuesto.' },
      { title: 'Diseño', text: 'Creo las piezas y las ajustamos juntas hasta que te encanten.' },
      { title: 'Entrega', text: 'Recibís los archivos listos para publicar.' },
    ],
  },

  faq: {
    id: 'preguntas',
    eyebrow: 'Preguntas frecuentes',
    title: 'Antes de *empezar*',
    items: [
      { q: '¿Cómo pido una propuesta?', a: 'Escribime por Instagram contándome qué necesitás y te respondo con los detalles.' },
      { q: '¿Puedo contratar un solo servicio?', a: 'Sí. Podés pedir solo un logo, una tanda de carruseles o la edición de tus videos.' },
      { q: '¿Qué necesito tener para empezar?', a: 'Una idea de tu marca y, si los tenés, tu logo, tus colores o ejemplos que te gusten.' },
      { q: '¿En qué formato recibo los diseños?', a: 'En los formatos listos para subir a tus redes. Lo detallamos en la propuesta.' },
      { q: '¿Cuánto cuesta?', a: 'Depende del servicio y de la cantidad de piezas. Escribime y te paso un presupuesto a medida.' },
      { q: '¿Puedo pedir cambios?', a: 'Sí. Hacemos los ajustes acordados en la propuesta hasta que el diseño te guste.' },
    ],
  },

  contact: {
    id: 'contacto',
    eyebrow: 'Contacto',
    title: 'Hablemos de *tu marca*',
    intro: 'Escribime y armamos juntas la propuesta para tu marca.',
    instagramDm: 'https://ig.me/m/digitalbysofia_',
    whatsapp: { number: '5491151640472', display: '+54 9 11 5164-0472', message: 'Hola Sofi! Vi tu página y quiero consultarte por un diseño.' },
    email: '', // PENDIENTE
  },

  instagramUrl: 'https://www.instagram.com/digitalbysofia_/',
  instagramHandle: '@digitalbysofia_',
  portfolioUrl: 'https://sofialencina.my.canva.site/portfolio',

  social: [
    { label: 'Instagram', url: 'https://www.instagram.com/digitalbysofia_/' },
    { label: 'Portfolio', url: 'https://sofialencina.my.canva.site/portfolio' },
  ],

  footer: {
    note: 'Diseño contenido que conecta ✦',
    demoNotice: 'Versión en preparación: textos y datos de contacto a confirmar.',
  },
};
