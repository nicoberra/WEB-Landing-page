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
    stepsTitle: 'Así arrancamos, sin vueltas',
    plansEyebrow: 'Planes 100% personalizados',
    plansTitle: 'Elegí tu objetivo',
    careerEyebrow: 'Trayectoria',
    careerTitle: 'Formación que se nota en cada plan',
    productsEyebrow: 'Recetarios',
    productsTitle: 'Recetas rapiditas para tu semana',
    // Los recetarios todavía están en preparación: no se venden aún.
    productsSoonTag: 'Próximamente',
    productsSoonText: 'Disponible próximamente',
    bookingTitle: 'No hace falta hacerlo perfecto para empezar.',
    bookingText: 'Reservá tu primera consulta, online o presencial en Castelar.',
  },
};
