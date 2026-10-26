// ============================================================================
//  MODELO: Jesica Cuevas · versión 2 (dinámica)
//  Toma los datos de su modelo principal (modelos/jesica-cuevas/config.mjs):
//  contacto, planes, formación, recetarios, preguntas y colores. Así hay un
//  solo lugar para actualizarlos. Acá solo cambia lo propio de esta versión:
//  tipografía, textos de las partes animadas y la plantilla (page.mjs).
// ============================================================================
import base from '../jesica-cuevas/config.mjs';

export default {
  ...base,

  site: {
    ...base.site,
    title: 'Jesica Cuevas | Nutricionista en Castelar y online',
  },

  // Turnos: en esta versión todos los botones de turno llevan al WhatsApp de
  // contacto (no hay turnero todavía). Se quita el contacto provisorio de
  // Instagram de otra cuenta para no confundir.
  booking: { ...base.booking, url: '', interim: null },

  // Servicios: ajustes de texto pedidos para esta versión.
  services: {
    ...base.services,
    items: base.services.items.map((it) => {
      if (it.title === 'Antropometría') {
        return {
          ...it,
          title: 'Composición corporal',
          description: 'Un plan adaptado a tu objetivo de descenso de grasa o aumento muscular, con evaluación antropométrica en las consultas presenciales.',
        };
      }
      if (it.title.startsWith('Plant-based')) {
        return {
          ...it,
          description: 'Planes para una alimentación basada en plantas y acompañamiento nutricional adaptado a diagnósticos como celiaquía, SIBO e IMO.',
        };
      }
      return it;
    }),
  },

  // Primera consulta: la antropometría es solo presencial; online es por videollamada.
  process: {
    ...base.process,
    steps: base.process.steps.map((st) =>
      st.title === 'Primera consulta'
        ? {
            ...st,
            text: 'Charlamos sobre tus hábitos, tu entrenamiento y tu objetivo. Si venís a la consulta presencial, hacemos la evaluación antropométrica. Si es online, nos vemos por videollamada y armamos tu plan con lo que me contás, sin mediciones a distancia.',
          }
        : st
    ),
  },

  // Preguntas: la de turnos ahora indica WhatsApp (el resto, igual).
  faq: {
    ...base.faq,
    items: base.faq.items.map((f) =>
      f.q === '¿Cómo saco un turno?'
        ? { ...f, a: `Escribime por WhatsApp al ${base.contact.whatsapp.display} y coordinamos día y horario.` }
        : f
    ),
  },

  // Archivo: una letra variable (ancho y peso) que se anima con el scroll.
  // Figtree para los textos largos.
  fonts: {
    googleFontsUrl:
      'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=Figtree:wght@400;500;600&display=swap',
    display: "'Archivo', 'Arial Narrow', Arial, sans-serif",
    displayWeight: 800,
    body: "'Figtree', 'Helvetica Neue', Arial, sans-serif",
    accent: "'Archivo', 'Arial Narrow', Arial, sans-serif",
    accentStyle: 'italic',
    accentSize: '1em',
    mono: "'Archivo', Arial, sans-serif",
  },

  v2: {
    // Frase gigante de la portada: cada línea se anima por separado.
    heroLines: ['Una alimentación', 'que acompañe', 'tu vida.'],
    heroText: 'Nutrición personalizada para mejorar tus hábitos, cuidar tu salud y acompañar tu entrenamiento. Atención online y presencial en Castelar.',
    heroCta: 'Consultá por tu turno',
    // Texto que gira alrededor de la foto.
    ring: 'Nutrición deportiva ✦ Salud hormonal ✦ Antropometría ISAK ✦ ',
    // Cinta inclinada.
    ticker: ['Comé para nutrirte', 'No para castigarte', 'No elimines: agregá y mejorá', 'No hace falta hacerlo perfecto', 'Rendí mejor'],
    // Manifiesto: se va "encendiendo" palabra por palabra al bajar.
    manifestoEyebrow: 'Mi forma de trabajar',
    manifesto:
      'Me niego a que la única meta sea bajar de peso. Quiero que rindas mejor, que tengas energía y que aprendas a elegir qué comer en el súper, en tu casa o antes de entrenar. Mi objetivo es que, con el tiempo, no me necesites.',
    // Columna de matrícula y formación (debajo de la foto, en compu): solo datos
    // reales y verificables (de su CV y de la placa de servicios).
    trust: [
      { big: 'M.N. 12233', small: 'Licenciada en Nutrición' },
      { big: 'UNLaM', small: 'Universidad Nacional de La Matanza' },
      { big: 'ISAK 2', small: 'Antropometrista certificada' },
      { big: 'Clubes', small: 'Argentinos de Castelar y Club 77' },
    ],
    // Debajo de la foto del manifiesto.
    signature: 'Lic. Jesica Cuevas · M.N. 12233',
    stepsEyebrow: 'Tu primera consulta',
    stepsTitle: 'Cómo trabajo con mis pacientes',
    plansEyebrow: 'Planes 100% personalizados',
    plansTitle: 'Elegí tu objetivo',
    careerEyebrow: 'Trayectoria',
    careerTitle: 'Mi formación como profesional',
    productsEyebrow: 'Recetarios',
    productsTitle: 'Recetas rapiditas para tu semana',
    // Por ahora, en lugar de los recetarios se muestran 3 posts de ejemplo de
    // su Instagram, con todas sus imágenes en un carrusel (título y resumen corto).
    // Las de "5 ideas" van a los costados y el menú semanal en el medio.
    posts: [
      {
        title: '5 ideas de tartas caseras',
        summary: 'Cinco rellenos fáciles para variar almuerzos y cenas.',
        images: ['assets/post-tartas-1.webp', 'assets/post-tartas-2.webp', 'assets/post-tartas-3.webp', 'assets/post-tartas-4.webp', 'assets/post-tartas-5.webp', 'assets/post-tartas-6.webp', 'assets/post-tartas-7.webp'],
        url: 'https://www.instagram.com/p/Deu6wMTjhid/',
      },
      {
        title: 'Menú semanal para cambiar hábitos',
        summary: 'Ideas de almuerzos y cenas para organizar tu semana.',
        images: ['assets/post-semana-1.webp', 'assets/post-semana-2.webp', 'assets/post-semana-3.webp', 'assets/post-semana-4.webp', 'assets/post-semana-5.webp', 'assets/post-semana-6.webp', 'assets/post-semana-7.webp'],
        url: 'https://www.instagram.com/p/DeKyW_MD4fW/',
      },
      {
        title: '5 ideas de rapiditas tipo wrap',
        summary: 'Rellenos prácticos para armar comidas completas.',
        images: ['assets/post-wraps-1.webp', 'assets/post-wraps-2.webp', 'assets/post-wraps-3.webp', 'assets/post-wraps-4.webp', 'assets/post-wraps-5.webp', 'assets/post-wraps-6.webp', 'assets/post-wraps-7.webp'],
        url: 'https://www.instagram.com/p/DdZodYVj9QQ/',
      },
    ],
    // Los recetarios todavía están en preparación: no se venden aún.
    productsSoonTag: 'Próximamente',
    productsSoonText: 'Disponible próximamente',
    // --- Tiendita de recetarios (documentos digitales) ---
    // Toma los recetarios del modelo principal y suma dos basados en sus
    // posteos (menú semanal y tartas/wraps). PENDIENTE: títulos, precios y
    // contenido de cada uno.
    //
    // Venta con Mercado Pago (ver TIENDA.md en esta carpeta):
    //  - id: nombre corto y fijo de cada recetario (no cambiarlo después de
    //    vender: con él se encuentra su PDF y las compras anteriores).
    //  - price: precio en pesos, solo el número (ej.: 9900). null = todavía no
    //    está a la venta y se muestra "Precio a confirmar".
    //  - payments: true muestra el pago con Mercado Pago en el ticket; si los
    //    pagos todavía no están configurados en Vercel, ofrece WhatsApp.
    shop: {
      eyebrow: 'Tienda',
      title: 'La tiendita de Jesi',
      sign: 'Abierto',
      intro: base.products.intro,
      soonPrice: 'Precio a confirmar',
      orderIntro: 'Hola Jesi! Quiero estos recetarios:',
      payments: true,
      items: [
        ...base.products.items.map((it, i) => ({
          id: ['snacks-dulces', 'pre-post-entreno', 'viandas-rapiditas'][i] || `recetario-${i + 1}`,
          title: it.title,
          description: it.description,
          format: it.format,
          price: null,
        })),
        { id: 'menu-semanal', title: 'Menú semanal', description: 'Almuerzos y cenas organizados para toda la semana, para cambiar hábitos sin complicarte.', format: 'Recetario digital · PDF', price: null },
        { id: 'tartas-wraps', title: 'Tartas y wraps caseros', description: 'Rellenos fáciles para variar almuerzos y cenas, con ideas para toda la familia.', format: 'Recetario digital · PDF', price: null },
      ],
    },
    contactText: 'Escribime y coordinamos tu consulta, online o presencial en Castelar.',
    bookingTitle: 'No hace falta hacerlo perfecto para empezar.',
    bookingText: 'Reservá tu primera consulta, online o presencial en Castelar.',
  },
};
