/**
 * Catálogo de Transmisiones de Radio Onda Corta (104.5 MHz)
 * Incluye transcripción completa legible en pantalla y rutas de audio con botón de descarga.
 */

export const TRANSMISIONES_RADIO = [
  {
    id: 'rad_001',
    numero: 1,
    titulo: 'Voz en la Quebrada: Primer Contacto',
    locutor: 'Elena (Sierra-Uno)',
    frecuencia: '104.5 MHz',
    duracionAprox: '1:45 min',
    archivoAudio: 'assets/audio/radio/transmision_01_primer_contacto.mp3',
    resumen: 'Elena emite su primer llamado general a los supervivientes del valle.',
    transcripcion: `[Estática suave... beep de sincronía]

«Aquí Sierra-Uno transmitiendo en 104.5 MHz desde el Risco Norte. Si estás escuchando esto, no estás solo en la quebrada. 

La primera regla del Yermo no es pelear, es construir orden. Cuida tu agua antes del mediodía. Asegura tu leña antes de que caiga el sol. Si tienes un refugio levantado con láminas y clavos, mantén el fuego bajo para no llamar miradas innecesarias.

Estaremos emitiendo reportes de clima, consejos de taller y enlaces entre supervivientes todas las noches al cambio de guardia. Mantengan la calma, cuiden su mente y sostengan la rutina. Sierra-Uno fuera.»

[Beep final... estática]`
  },
  {
    id: 'rad_002',
    numero: 2,
    titulo: 'Bioenergía: La Fuerza que no se Apaga',
    locutor: 'Elena & Don Chui',
    frecuencia: '104.5 MHz',
    duracionAprox: '2:15 min',
    archivoAudio: 'assets/audio/radio/transmision_02_bioenergia.mp3',
    resumen: 'Instrucciones técnicas para armar el bici-generador con alternador de auto reciclado.',
    transcripcion: `[Sintonía de radio... zumbido de dinamo]

«Sierra-Uno en 104.5. Hoy tenemos en el micro a Don Chui con un apunte de carpintería y energía:

—Don Chui: "Miren muchachos, no se quiebren la cabeza buscando gasolina podrida. Si rescatan una bicicleta vieja y la montan en un caballete de mezquite con una correa al alternador de camión, veinte minutos de pedaleo parejo les llenan la batería de plomo para alumbrar la mesa toda la noche. El cuerpo humano es la única máquina que se hace más fuerte con el uso."

—Elena: "Confirmado desde el Risco. La bioenergía sostiene nuestros transmisores. Quien pedalea no solo carga luces; despeja la mente y fortalece las piernas para la expedición de mañana. Sierra-Uno fuera."»`
  },
  {
    id: 'rad_003',
    numero: 3,
    titulo: 'El Saber de la Tierra: Remedios de Ribera',
    locutor: 'Doña Concha',
    frecuencia: '104.5 MHz',
    duracionAprox: '2:00 min',
    archivoAudio: 'assets/audio/radio/transmision_03_remedios_concha.mp3',
    resumen: 'Doña Concha enseña a usar el llantén, la manzanilla y la salmuera para evitar infecciones.',
    transcripcion: `[Sonido de hojas crujiendo... tono amable de radio]

«Habla Concha desde el Valle Bajo. Para todos los que andan raspados por los alambres del monte:

Nunca le echen alcohol reseco a una herida abierta; eso quema la carne viva. Hiervan medio pocillo de agua con una pizca de sal de grano. Cuelen con trapo limpio y machaquen tres hojas frescas de llantén de arroyo. El emplasto verde saca el calor malo y cierra la piel en dos noches.

Y cuando sientan que la angustia les aprieta el pecho al anochecer, una infusión tibia de manzanilla silvestre asienta el estómago y devuelve el sueño. Cuiden su cuerpo, que es su única casa en esta tierra.»`
  },
  {
    id: 'rad_004',
    numero: 4,
    titulo: 'Los Ecos del Vivero: La Verdad de los Fitolantros',
    locutor: 'El Tuerto (Isla Clarión)',
    frecuencia: '104.5 MHz',
    duracionAprox: '3:10 min',
    archivoAudio: 'assets/audio/radio/transmision_04_proyecto_eden.mp3',
    resumen: 'Revelación del Proyecto Edén (2031-2038) y el origen simbiótico de los fitolantros.',
    transcripcion: `[Frecuencia encriptada... tono grave]

«Atención a los receptores de onda corta. Habla El Tuerto. Vengo de la costa con los diarios de la expedición de Clarión.

Dejen de llamarles "monstruos verdes". Lo que habita en los viveros no nació de un virus de pesadilla; nació del Proyecto Edén de Elias Voss en 2035 para evitar que la humanidad muriera de hambre cuando colapsaron las cosechas mundiales.

Tienen clorofila en la dermis, hacen fotosíntesis y lloran cuando se queman los árboles. Si no los agredes, no te atacarán. El futuro no es exterminar el monte, es aprender a convivir con lo que brotó de las cenizas. Mantengan los ojos abiertos.»`
  },
  {
    id: 'rad_005',
    numero: 5,
    titulo: 'Aviso Meteorológico: Viento de Ceniza',
    locutor: 'Elena (Sierra-Uno)',
    frecuencia: '104.5 MHz',
    duracionAprox: '1:30 min',
    archivoAudio: 'assets/audio/radio/transmision_05_viento_ceniza.mp3',
    resumen: 'Elena alerta sobre ráfagas secas del norte cargadas de polvo volcánico y ceniza.',
    transcripcion: `[Tono de alerta breve... estática modulada]

«Sierra-Uno con boletín meteorológico de urgencia para las próximas 36 horas. 

El barómetro del Risco está cayendo en picada. Se aproxima una vaguada seca desde el norte con viento de ceniza. Si tienen huertos descubiertos o semilleros en cubetas, tápenlos de inmediato con esteras de paja o costales húmedos. 

Cierren las compuertas de las alacenas y aseguren los filtros de agua. El polvo fino colmata los lechos de carbón si los dejan abiertos al aire. Quien tenga que salir a trotar o a recoger leña mañana temprano, use un pañuelo de algodón humedecido sobre la boca y la nariz. Cuiden los pulmones; en el Yermo no hay respiradores de repuesto. Sierra-Uno fuera.»`
  },
  {
    id: 'rad_006',
    numero: 6,
    titulo: 'Cápsula Técnica: Mantenimiento del Colector Pluvial',
    locutor: 'Elena & Don Chui',
    frecuencia: '104.5 MHz',
    duracionAprox: '2:10 min',
    archivoAudio: 'assets/audio/radio/transmision_06_colector_pluvial.mp3',
    resumen: 'Instrucciones para limpiar canaletas y verificar la válvula first-flush antes de la lluvia.',
    transcripcion: `[Zumbido de sintonía... chasquido de micrófono]

«104.5 MHz en la escala. Hoy Don Chui nos recuerda una regla sagrada de fontanería rústica:

—Don Chui: "Muchachos, no se confíen de las primeras gotas. El techo junta caca de pájaro, tizne y polvo durante semanas de sequía. Si no limpian la canaleta de lámina y no vacían el tubo de descarte previo —el first-flush—, toda esa porquería se les va directo al tambor de doscientos litros y les pudre la reserva del mes. Cinco minutos de escoba de varas en el tejado les salvan cien litros de agua limpia."

—Elena: "Escucharon al maestro. La prevención no cuesta nada; la pereza se paga con disentería. Revisen sus codos de PVC y sus mallas mosquiteras antes de que oscurezca. Sierra-Uno fuera."»`
  },
  {
    id: 'rad_007',
    numero: 7,
    titulo: 'Buenas Noches desde el Risco: El Fuego Interior',
    locutor: 'Elena (Sierra-Uno)',
    frecuencia: '104.5 MHz',
    duracionAprox: '2:00 min',
    archivoAudio: 'assets/audio/radio/transmision_07_buenas_noches_risco.mp3',
    resumen: 'Reflexión nocturna de contención emocional y constancia para los supervivientes solitarios.',
    transcripcion: `[Estática cálida... sonido lejano de viento de montaña]

«Son las once de la noche en el valle. Habla Elena desde la cima del Risco.

A esta hora las luces de los fogones empiezan a apagarse en la quebrada. Sé que hay noches en que el cansancio pesa el doble. Noches en que miran el techo de chapa y se preguntan cuánto más habrá que remar contra la corriente.

Solo quiero recordarles algo: cada clavo que enderezaron hoy, cada gota de agua que hirvieron, cada paso que dieron con la carga al hombro, es una victoria contra el caos. El mundo viejo no va a volver, pero la dignidad con la que nos levantamos mañana depende enteramente de nosotros.

Dejen la brasa bien tapada con ceniza para que guarde calor. Descansen el cuerpo y serenen la mente. Mañana volvemos a empezar. Buenas noches a todos en el Yermo... Sierra-Uno fuera.»

[Tono de cierre... silencio nocturno]`
  }
];
