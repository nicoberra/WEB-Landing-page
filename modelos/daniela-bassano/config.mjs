// ============================================================================
//  MODELO: DN · Estética Facial y Corporal (Terra) · Daniela Bassano
//  Lic. en Nutrición, esteticista y cosmetóloga. Tratamientos faciales y
//  corporales en su espacio de Terravista.
//
//  Todos los textos salen de sus placas de Instagram (mismo contenido, con
//  algunas faltas de tipeo corregidas). Este modelo tiene su propia plantilla
//  (page.mjs, styles.css y main.js en esta carpeta).
//
//  ⚠ Los valores marcados con "PENDIENTE" son provisorios.
//  En los textos, **así** se resalta una parte (como en sus placas).
// ============================================================================

const WA = '5491154938280';

export default {
  demo: true,

  site: {
    lang: 'es-AR',
    locale: 'es_AR',
    url: 'https://www.example.com', // PENDIENTE: dominio final
    title: 'DN Estética Facial y Corporal · Daniela Bassano',
    description:
      'Tratamientos faciales y corporales en Terravista: Venus Legacy, HIFU 12D, Velashape II, Alquimia y más. Belleza y tecnología para tu piel.',
    ogImage: '',
    themeColor: '#F5EDE7',
    structuredData: true,
  },

  person: {
    name: 'Daniela Bassano',
    profession: 'Lic. en Nutrición · Esteticista · Cosmetóloga',
    location: 'Terravista',
    photo: null, // PENDIENTE: foto de Daniela
  },

  // Para el ícono de la pestaña se usa assets/favicon.svg
  logo: { type: 'monogram', text: 'DN' },

  brand: {
    name: 'DN',
    script: 'Estética Facial y Corporal',
    place: 'Terra',
    logo: { src: 'assets/logo-dn.webp', width: 310, height: 384, alt: 'DN Estética Facial y Corporal' },
  },

  // Colores de sus placas: crema satinado, gris carbón, moka y greige
  // (los tres círculos que aparecen en cada placa).
  colors: {
    light: {
      bg: '#F5EDE7', // crema
      surface: '#EFE4DC', // paneles
      placeholder: '#EDE3DB',
      ink: '#3E3B39', // gris carbón (la D del logo)
      muted: '#625B58',
      line: '#E2D3C8',
      accent: '#7A5B4E', // moka oscuro (botones, buen contraste)
      accentInk: '#FFFFFF',
      accentSoft: '#E9DCD3',
      highlight: '#A68B7C', // moka (la N del logo)
    },
  },

  // Títulos en serif clásica (como "TRATAMIENTOS FACIALES"), textos en una
  // sans geométrica liviana y "Estética Facial y Corporal" escrita a mano.
  fonts: {
    googleFontsUrl:
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Montserrat:wght@300;400;500;600&family=Allura&display=swap',
    display: "'Cormorant Garamond', Georgia, 'Times New Roman', serif",
    displayWeight: 500,
    body: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
    accent: "'Allura', 'Segoe Script', cursive",
    accentStyle: 'normal',
    accentSize: '1em',
    mono: "'Montserrat', Arial, sans-serif",
  },

  hero: {
    title: 'Tratamientos',
    titleSub: 'faciales y corporales',
    text: 'Belleza, bienestar y tecnología aplicada al cuidado de tu piel.',
    cta: 'Reservá tu turno',
    secondary: 'Ver tratamientos',
  },

  agenda: ['La agenda está abierta para todos los tratamientos', 'Recordá sacar turno con anticipación'],

  // --- Tratamientos ---------------------------------------------------------------
  // Cada uno: id, title (dos partes: arriba gris y abajo moka, como en las placas),
  // icon, photo, equipment (foto del equipo, opcional), time, intro, points (con
  // ícono), list (beneficios), steps, note y needs (para "¿Qué querés mejorar?").
  categories: [
    {
      id: 'faciales',
      label: 'Faciales',
      title: ['Tratamientos', 'faciales'],
      photo: 'assets/foto-faciales.webp',
      items: [
        {
          id: 'limpieza',
          short: 'Limpieza de cutis con punta de diamantes',
          title: ['Limpieza de cutis', 'profunda'],
          icon: 'sparkle',
          photo: 'assets/foto-limpieza.webp',
          time: '60 minutos',
          points: [
            { icon: 'sparkle', text: 'Si buscás lucir una piel luminosa y mantenerla siempre joven, lo ideal es realizar una limpieza facial profunda **cada 21 días**.' },
            { icon: 'drop', text: 'En todas mis limpiezas utilizo productos de primera calidad para obtener **óptimos resultados**.' },
            { icon: 'hands', text: 'Para finalizar, después de la máscara realizo masajes **relajantes y tonificantes**.' },
          ],
          needs: ['limpieza'],
        },
        {
          id: 'diamantes',
          short: 'Punta de diamantes',
          title: ['Punta de', 'diamantes'],
          icon: 'diamond',
          photo: 'assets/foto-diamantes.webp',
          time: '60 minutos',
          points: [
            { icon: 'diamond', text: 'La microdermoabrasión con punta de diamantes es un tipo de peeling mecánico, mediante el cual se elimina la primera capa de la piel, llamada estrato córneo, acelerando el proceso natural de descamación de la misma.' },
            { icon: 'molecule', text: 'Tiene excelentes beneficios como estimular la producción de colágeno y elastina, y favorecer la penetración de activos a la piel.' },
            { icon: 'face', text: 'Tratamiento que incluyo en todas las limpiezas faciales que realizo.' },
            { icon: 'hands', text: 'Para finalizar, después de la máscara realizo masajes relajantes y tonificantes.' },
          ],
          needs: ['limpieza'],
        },
        {
          id: 'alquimia',
          short: 'Alquimia',
          title: ['', 'Alquimia'],
          icon: 'flask',
          photo: 'assets/foto-alquimia.webp',
          equipment: 'assets/equipo-alquimia.webp',
          time: '60 minutos',
          intro: 'Alquimia es un tratamiento sumamente **innovador**. Brinda la aplicación de un amplio rango de vehículos y **nutrientes** al mismo tiempo que se realiza la limpieza e hidratación con las **puntas de diamantes**.',
          highlight: 'Exfolia, hidrata y nutre en un solo paso',
          list: [
            'Suaviza pequeñas arrugas y líneas de expresión',
            'Reduce poros',
            'Elimina las impurezas',
            'Renueva los nutrientes',
            'Disminuye signos de envejecimiento',
            'Es un tratamiento **no invasivo**',
          ],
          note: 'La sesión incluye **rostro, cuello y escote**; se finaliza con una máscara y masajes relajantes.',
          needs: ['arrugas', 'poros', 'limpieza', 'hidratacion'],
        },
        {
          id: 'venus-rostro',
          short: 'Venus Legacy (radiofrecuencia médica)',
          title: ['Venus', 'Legacy'],
          icon: 'waves',
          photo: 'assets/venus-rostro.webp',
          equipment: 'assets/equipo-venus.webp',
          time: '70 minutos',
          points: [
            { icon: 'signal', text: 'Equipo de **radiofrecuencia médica** utilizado para devolver el aspecto joven y fresco a la piel, tensándola al producir nuevas fibras de colágeno y elastina.' },
            { icon: 'face', text: 'Devuelve al rostro una expresión juvenil, elevando las cejas, realzando los pómulos y logrando una mayor **definición del óvalo facial**.' },
            { icon: 'star', text: 'Tratamiento preferido por las famosas: mejora la flacidez del rostro, cuello y escote **sin tener que pasar por el quirófano**.' },
          ],
          needs: ['flacidez', 'lifting'],
        },
        {
          id: 'hifu-rostro',
          short: 'HIFU 12D Max',
          title: ['HIFU', '12D Max'],
          icon: 'dots',
          photo: 'assets/foto-hifu-rostro.webp',
          equipment: 'assets/equipo-hifu.webp',
          time: '70 minutos',
          points: [
            { icon: 'signal', text: 'El HIFU 12D es una tecnología avanzada que utiliza **ultrasonido focalizado** para penetrar en las capas más profundas de la piel, llegando hasta el sistema muscular aponeurótico superficial (SMAS).' },
            { icon: 'face', text: 'Penetra a múltiples profundidades de la piel para un lifting no invasivo, mejorando la firmeza y reduciendo arrugas con resultados que duran.' },
          ],
          list: ['Rejuvenecimiento facial', 'Eleva las cejas y pómulos', 'Disminuye arrugas', 'Reduce papada', 'Tensa el cuello'],
          needs: ['arrugas', 'flacidez', 'lifting'],
        },
        {
          id: 'peeling',
          short: 'Peeling químico',
          title: ['Peeling', 'químico'],
          icon: 'drop',
          photo: 'assets/foto-peeling.webp',
          time: '60 minutos',
          intro: 'El peeling químico es un procedimiento mediante el cual se aplican diferentes ácidos a distintas concentraciones sobre la piel, provocando así, en algunos casos, una descamación que ayuda a la renovación celular.',
          text: 'Consiste en higiene y preparación de la piel con máscaras renovadoras y desincrustantes, exfoliación de la piel con puntas de diamantes, utilización del ácido elegido según el tipo de piel y necesidades, máscara descongestiva, máscara LED e hidratación acorde al biotipo cutáneo.',
          points: [{ icon: 'sun', text: 'Todos los tratamientos son finalizados con **protección solar**.' }],
          needs: ['limpieza', 'manchas'],
        },
        {
          id: 'electroporacion',
          short: 'Electroporación',
          title: ['', 'Electroporación'],
          icon: 'bolt',
          photo: 'assets/foto-electroporacion.webp',
          time: '60 minutos',
          intro: 'La electroporación es una alternativa a la mesoterapia convencional: no es invasiva, se aplica sin uso de agujas y sin causar dolor.',
          listTitle: 'Se generan canales en las células para el paso de principios activos:',
          list: ['Hidratantes', 'Reafirmantes', 'Nutritivos', 'Anti-age'],
          steps: [
            'Se comienza realizando una higiene facial, se utiliza la punta de diamantes y luego se pasa la electroporación, seleccionando el activo de acuerdo a la necesidad de la piel.',
            'Se finaliza con una máscara específica de acuerdo a la necesidad de la piel y masajes relajantes y tonificantes.',
          ],
          needs: ['hidratacion', 'flacidez'],
        },
        {
          id: 'led',
          short: 'Máscara LED',
          title: ['Máscara', 'LED'],
          icon: 'mask',
          photo: 'assets/foto-led.webp',
          time: '60 minutos',
          intro: 'La máscara LED se utiliza para finalizar los tratamientos faciales. Su objetivo es ofrecer un cuidado completo y profundo en la piel.',
          listTitle: 'Sus principales beneficios son:',
          list: ['Estimula el colágeno', 'Reduce el tamaño de los poros', 'Disminuye el acné', 'Disminuye la inflamación y congestión de la piel'],
          note: 'Emite varios colores y cada uno aporta beneficios distintos para tu tipo de piel.',
          needs: ['poros', 'acne'],
        },
      ],
    },
    {
      id: 'corporales',
      label: 'Corporales',
      title: ['Tratamientos', 'corporales'],
      photo: 'assets/foto-corporales.webp',
      items: [
        {
          id: 'venus-cuerpo',
          short: 'Venus Legacy',
          title: ['Venus', 'Legacy'],
          icon: 'machine',
          photo: 'assets/foto-venus-corporal.webp',
          equipment: 'assets/equipo-venus.webp',
          time: '30 minutos por zona',
          points: [
            { icon: 'waist', text: 'La solución ideal contra la **flacidez y celulitis**.' },
            { icon: 'signal', text: 'Es un tratamiento que combina **radiofrecuencia multipolar**, magnetoterapia y succión para mejorar la flacidez, la celulitis y la adiposidad localizada.' },
            { icon: 'waves', text: 'Consigue reducir el volumen, definiendo el contorno corporal, **tensando y revitalizando la piel**.' },
          ],
          listTitle: 'Zonas a tratar:',
          list: ['Glúteos', 'Pantalón de montar', 'Entrepierna', 'Brazos'],
          needs: ['flacidez', 'celulitis', 'adiposidad'],
        },
        {
          id: 'velashape',
          short: 'Velashape II',
          title: ['Velashape', 'II'],
          icon: 'waist',
          photo: 'assets/foto-velashape.webp',
          equipment: 'assets/equipo-velashape.webp',
          time: '40 minutos por zona',
          intro: 'El Velashape es una aparatología premium que combina **4 tecnologías en 1**:',
          tech: ['Radiofrecuencia', 'Vacumterapia', 'Láser infrarrojo', 'Masaje de rodillo'],
          list: ['Reduce y modela el contorno corporal', 'Elimina la adiposidad localizada de abdomen, piernas y glúteos', 'Reafirma la piel', 'Reduce la celulitis'],
          needs: ['celulitis', 'adiposidad', 'flacidez'],
        },
        {
          id: 'hifu-cuerpo',
          short: 'HIFU 12D Max',
          title: ['HIFU', '12D Max'],
          icon: 'probe',
          photo: 'assets/foto-hifu-corporal.webp',
          equipment: 'assets/equipo-hifu-corporal.webp',
          time: '30 minutos por zona',
          intro: 'El HIFU 12D es una **tecnología avanzada** que utiliza **ultrasonido focalizado** para penetrar en las capas más profundas de la piel, llegando hasta el sistema muscular aponeurótico superficial (SMAS).',
          points: [
            { icon: 'signal', text: 'Penetra a múltiples profundidades mejorando la **firmeza**, la **celulitis** y **modelando** el cuerpo.' },
            { icon: 'waist', text: 'Se pueden tratar: **abdomen, flancos, línea de corpiño, glúteos, muslos y brazos**.' },
          ],
          needs: ['flacidez', 'celulitis'],
        },
        {
          id: 'electroestimulacion',
          short: 'Electroestimulación',
          title: ['', 'Electroestimulación'],
          icon: 'muscle',
          photo: 'assets/foto-electroestimulacion.webp',
          time: '40 minutos',
          points: [
            { icon: 'muscle', text: 'Proporciona **firmeza** y **desarrollo** al músculo.' },
            { icon: 'sparkle', text: 'Beneficia la **eliminación** paulatina de la **flacidez**.' },
            { icon: 'drops', text: 'Favorece al **sistema circulatorio** facilitando el **retorno venoso** y **linfático**, eliminando las toxinas y mejorando la **celulitis** progresivamente.' },
          ],
          note: 'El equipo cuenta con **10 canales**, por lo que podemos trabajar varias zonas a la vez.',
          needs: ['flacidez', 'celulitis', 'circulacion'],
        },
        {
          id: 'termocel',
          short: 'Termocel Stim',
          title: ['Termocel', 'Stim'],
          icon: 'heat',
          photo: 'assets/foto-termocel.webp',
          time: '40 minutos',
          intro: 'Termocel® Stim es un equipo que combina termoterapia y electroestimulación en un mismo tratamiento.',
          listTitle: 'Modelación corporal 3 en 1',
          list: ['Celulitis', 'Flacidez', 'Adiposidad localizada', 'Modelación corporal'],
          needs: ['celulitis', 'flacidez', 'adiposidad'],
        },
        {
          id: 'ultracavitacion',
          short: 'Ultracavitación',
          title: ['', 'Ultracavitación'],
          icon: 'sound',
          photo: 'assets/foto-ultracavitacion.webp',
          time: '70 minutos',
          intro: 'Eficaz método para **destruir** las masas adiposas localizadas y **modelar** el cuerpo.',
          list: ['**Reduce** y modela el contorno corporal', '**Elimina** la adiposidad localizada de abdomen, piernas y glúteos', '**Reduce** la celulitis'],
          note: 'Se finaliza con **botas de presoterapia** para facilitar el drenaje linfático.',
          needs: ['adiposidad', 'celulitis'],
        },
        {
          id: 'presoterapia',
          short: 'Botas de presoterapia',
          title: ['Botas de', 'presoterapia'],
          icon: 'boots',
          photo: 'assets/foto-presoterapia.webp',
          time: '30 minutos',
          intro: 'Las botas de presoterapia generan una compresión y descompresión alternada que actúa de forma muy eficaz en nuestro sistema linfático.',
          list: ['Recupera la elasticidad cutánea', 'Aumenta el aporte de oxígeno a los tejidos', 'Indicada en edemas', 'Activa el sistema circulatorio', 'Mejora la **celulitis** y previene las arañitas'],
          needs: ['celulitis', 'circulacion'],
        },
        // En la placa de corporales también figuran estos dos:
        { id: 'electroporacion', short: 'Electroporación', ref: 'electroporacion', icon: 'bolt' },
        {
          id: 'termoterapia',
          short: 'Termoterapia',
          icon: 'heat',
          // PENDIENTE: placa con la descripción. Mientras, invita a consultar.
        },
      ],
    },
  ],

  // "¿Qué querés mejorar?": cada necesidad muestra los tratamientos que la
  // nombran en sus placas.
  needs: [
    { id: 'flacidez', label: 'Flacidez' },
    { id: 'celulitis', label: 'Celulitis' },
    { id: 'adiposidad', label: 'Adiposidad localizada' },
    { id: 'arrugas', label: 'Arrugas y líneas de expresión' },
    { id: 'lifting', label: 'Lifting sin quirófano' },
    { id: 'limpieza', label: 'Piel limpia y luminosa' },
    { id: 'poros', label: 'Poros' },
    { id: 'acne', label: 'Acné' },
    { id: 'hidratacion', label: 'Hidratación y nutrición' },
    { id: 'circulacion', label: 'Circulación y edemas' },
  ],

  space: {
    title: 'Mi espacio en Terravista',
    lines: ['Lugar pensado para poder relajarte y embellecerte.', 'La mejor aparatología para cada necesidad.'],
    photos: [
      { src: 'assets/espacio-camilla.webp', alt: 'Camilla con botas de presoterapia en el espacio de Terravista', width: 296, height: 474 },
      { src: 'assets/espacio-equipos.webp', alt: 'Equipos de aparatología: Velashape II, Venus Legacy y más', width: 244, height: 414 },
      { src: 'assets/espacio-estante.webp', alt: 'Estantería con productos y equipos del gabinete', width: 232, height: 414 },
    ],
  },

  hours: {
    title: 'Horarios',
    days: 'Lunes a viernes',
    time: 'De 8 a 19 hs',
  },

  contact: {
    whatsapp: { number: WA, display: '+54 9 11 5493-8280', message: 'Hola Daniela! Quería consultar por un turno.' },
    email: '',
    location: 'Terravista',
  },

  social: [],

  footer: {
    note: 'Belleza, bienestar y tecnología aplicada al cuidado de tu piel.',
  },
};
