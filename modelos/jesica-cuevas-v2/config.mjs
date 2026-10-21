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
    title: 'Jesica Cuevas · Nutrición deportiva y hormonal',
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
    heroLines: ['Rendí', 'mejor,', 'comé sin', 'restricciones.'],
    heroText: 'Planes 100% personalizados según tu objetivo: rendimiento, descenso de grasa o aumento muscular. Con evaluación antropométrica y seguimiento.',
    // Texto que gira alrededor de la foto.
    ring: 'Nutrición deportiva ✦ Salud hormonal ✦ Antropometría ISAK ✦ ',
    // Cinta inclinada.
    ticker: ['Comé para nutrirte', 'No para castigarte', 'No elimines: agregá y mejorá', 'No hace falta hacerlo perfecto', 'Rendí mejor'],
    // Manifiesto: se va "encendiendo" palabra por palabra al bajar.
    manifestoEyebrow: 'Mi forma de trabajar',
    manifesto:
      'Me niego a que la única meta sea bajar de peso. Quiero que rindas mejor, que tengas energía y que aprendas a elegir qué comer en el súper, en tu casa o antes de entrenar. Mi objetivo es que, con el tiempo, no me necesites.',
    // Franja de confianza debajo de la portada: solo datos reales y verificables
    // (de su CV y de la placa de servicios).
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
    bookingTitle: 'No hace falta hacerlo perfecto para empezar.',
    bookingText: 'Reservá tu primera consulta, online o presencial en Castelar.',
  },
};
