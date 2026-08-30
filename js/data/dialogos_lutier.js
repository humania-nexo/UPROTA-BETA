/**
 * Dataset de Diálogos y Dilema Moral del Lutier Anciano
 * Vincula: UPROTA_NPC_Lutier_Anciano.md + Sistema de Decisiones y Ecos de Radio
 */

export const DIALOGOS_LUTIER = {
  eventoId: 'evt_lutier_ladron_madera',
  titulo: 'El Ladrón en el Taller de Madera',
  diaActivacionMin: 28,
  nivelRefugioMin: 3,
  
  contexto: 'Escuchas un ruido sordo en el patio trasero cerca del montón de leña. Al salir con tu linterna o antorcha, encuentras a un anciano encorvado con las manos temblorosas, intentando cargar dos tablones curados de mezquite. No lleva armas, solo una gubia de tallar gastada en el bolsillo del chaleco.',
  
  dialogoInicial: '«¡Por favor, no golpees! No vengo a hacer daño... Solo necesito madera seca y estacionada. La madera verde se tuerce con la humedad y no sostiene la tensión del cordal. Estoy terminando un violín para la orquesta del valle... la gente ha olvidado cómo suena la música, solo recuerdan los disparos y los gritos.»',
  
  opciones: [
    {
      id: 'opcion_a_rigor',
      clave: 'A',
      etiqueta: 'Entregar a la Patrulla del Valle (Rigor / Ley del Yermo)',
      descripcion: 'Haces sonar la campana de alarma y entregas al anciano a la guardia de paso para que responda por intento de robo.',
      coste: {},
      recompensaInmediata: {
        items: [{ id: 'item_clavos', cantidad: 10, nombre: 'Clavos Forjados' }],
        moral: -1,
        espiritu: 0
      },
      textoResolucion: 'La patrulla agradece la alerta y se lleva al anciano atado de manos. Uno de los guardias te entrega un puñado de clavos como recompensa cívica. Esa noche, el silencio del refugio se siente más frío y pesado de lo habitual.',
      ecoRadio: {
        diaDesfase: 20,
        texto: '«Boletín policial de la quebrada: Se informa de la muerte por neumonía de un anciano no identificado en las celdas de detención del puesto sur. Portaba únicamente una gubia de tallar y un boceto de partituras.»'
      },
      bloqueaOrquesta: true
    },
    
    {
      id: 'opcion_b_justicia_restaurativa',
      clave: 'B',
      etiqueta: 'Trabajo Compensatorio (Justicia Práctica)',
      descripcion: 'Le exiges trabajar 3 días en el taller serrando troncos y reparando el cerco a cambio de los tablones que intentaba llevarse.',
      coste: {},
      recompensaInmediata: {
        items: [{ id: 'item_tablas', cantidad: 5, nombre: 'Tablas Cepilladas' }],
        moral: 0,
        espiritu: 0
      },
      textoResolucion: 'El anciano acepta con la cabeza baja. Durante tres días trabaja con dedicación absoluta cepillando madera y reparando vigas. Al caer la tarde del tercer día, toma sus dos tablones ganados con el sudor de su frente, te da las gracias con una reverencia sobria y se marcha hacia los cerros.',
      ecoRadio: {
        diaDesfase: 30,
        texto: '«Noticias de la Caravana del Norte: Se reporta la inauguración de una pequeña escuela de música en el asentamiento de Los Sauces, dirigida por un maestro lutier que reconstruyó instrumentos con madera de la quebrada.»'
      },
      bloqueaOrquesta: false,
      regresoOrquesta: false
    },
    
    {
      id: 'opcion_c_gracia_donacion',
      clave: 'C',
      etiqueta: 'Perdón y Donación de Gracia (La Apuesta por el Alma)',
      descripcion: 'Bajas la antorcha, perdonas la falta y le regalas no solo esos dos tablones, sino tu mejor pieza de mezquite curado y un bote de cola animal.',
      coste: {
        items: [{ id: 'item_tablas', cantidad: 2 }]
      },
      recompensaInmediata: {
        items: [],
        moral: +2,
        espiritu: +2
      },
      textoResolucion: 'El anciano se queda atónito. Las lágrimas le surcan el rostro arrugado. Pone sus manos temblorosas sobre tus hombros y promete solemnemente: «Que la tierra me trague si olvido esta nobleza. La música volverá a sonar en este patio, te lo juro por la memoria de los que ya no están».',
      ecoRadio: {
        diaDesfase: 15,
        texto: '«Sierra-Uno en 104.5 MHz: Rumores hermosos cruzan los campamentos... Dicen que una pequeña orquesta de cuerdas está ensayando en las ruinas del teatro municipal. Parece que el arte no murió en el Colapso.»'
      },
      bloqueaOrquesta: false,
      regresoOrquesta: true,
      diaRegresoOrquesta: 55,
      eventoRetorno: {
        titulo: 'El Concierto del Lago de los Cisnes',
        descripcion: 'Una tarde de cielo anaranjado, cinco músicos guiados por el maestro lutier llegan al patio de tu refugio. Desempacan dos violines, una viola y un violonchelo relucientes y ejecutan el tema principal de El Lago de los Cisnes de Tchaikovsky. Todos los supervivientes cercanos escuchan en reverente silencio.',
        beneficioPermanente: '+1 Moral cada 3 días mientras el Lutier habite en el refugio.'
      }
    }
  ]
};
