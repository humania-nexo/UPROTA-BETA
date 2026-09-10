/**
 * Catálogo de Transmisiones de Radio Onda Corta (104.5 MHz)
 * Locución Principal: Director Anigami Agadni (Voz Natural / Fifine AM8 + SC3)
 * Incluye transcripción completa legible en pantalla y rutas de audio con botón de descarga.
 */

export const TRANSMISIONES_RADIO = [
  {
    id: 'rad_001',
    numero: 1,
    titulo: 'Voz en la Quebrada: Primer Contacto del Director',
    locutor: 'Director (Anigami Agadni) [Voz Natural]',
    frecuencia: '104.5 MHz',
    duracionAprox: '1:45 min',
    archivoAudio: 'assets/audio/radio/transmision_01_primer_contacto.mp3',
    resumen: 'El Director emite su primer llamado general a los supervivientes del valle desde la cabina central.',
    transcripcion: `[Estática suave de onda corta... 'Click' de interruptor PTT]

«Probando modulación en los siete punto doscientos megaciclos... Buenas noches a todos en la quebrada. Les habla el Director desde la estación central de Yermo Radio en 104.5 MHz. Si estás escuchando esto al lado de tu estufa o con el auricular de tapón pegado a la oreja: no estás solo.

La primera ley del Yermo no es pelear, es poner orden. Cuida tu agua antes de que pegue el mediodía. Asegura tu leña seca antes de que caiga el sol. Si estás levantando tu refugio con cuatro tablas y lámina vieja, mantén el fuego bajo para no llamar miradas innecesarias.

Estaremos emitiendo reportes de clima, consejos de taller y enlaces comunitarios todas las noches al cambio de guardia. Cuiden su mente, sostengan la rutina y no pierdan la fe. Cambio y fuera.»

[Click de PTT... siseo suave]`
  },
  {
    id: 'rad_002',
    numero: 2,
    titulo: 'Cápsula de Taller: Bioenergía y Generador',
    locutor: 'Director & Don Chui [SC3: Anciano]',
    frecuencia: '104.5 MHz',
    duracionAprox: '2:15 min',
    archivoAudio: 'assets/audio/radio/transmision_02_bioenergia.mp3',
    resumen: 'Instrucciones para montar un bici-generador con alternador de camión sin gasolina.',
    transcripcion: `[Sintonía de radio... zumbido de dinamo de pedaleo]

—Director (Voz Natural): «Seguimos en 104.5 MHz. Hoy vino al estudio Don Chui para darnos una lección de taller sobre cómo no depender de combustibles fósiles podridos.»

—Don Chui [Efecto SC3: Anciano]: «¡Buenas noches, muchachos! Miren: no se quiebren la cabeza buscando gasolina vieja que tapa los carburadores. Si rescatan una bicicleta clásica de montaña y la montan sobre un caballete de mezquite con una faja al alternador de camión, veinte minutos de pedaleo parejo les llenan una batería de plomo para alumbrar la mesa toda la noche. El cuerpo humano es la única máquina en el mundo que se hace más fuerte con el uso.»

—Director (Voz Natural): «Así de simple. Quien pedalea no solo carga luces; despeja la mente y fortalece las piernas para la expedición de mañana. Cuiden sus fierros. Cambio y fuera.»`
  },
  {
    id: 'rad_003',
    numero: 3,
    titulo: 'Botica de Monte: Remedios de Ribera',
    locutor: 'Director & Doña Concha [SC3: Anciana]',
    frecuencia: '104.5 MHz',
    duracionAprox: '2:00 min',
    archivoAudio: 'assets/audio/radio/transmision_03_remedios_concha.mp3',
    resumen: 'Doña Concha enseña a usar el llantén, la manzanilla y la salmuera para evitar infecciones.',
    transcripcion: `[Sonido de hojas crujiendo... tono cálido de radio]

—Director (Voz Natural): «Son las ocho de la noche. Doña Concha nos envió una nota de voz desde el Valle Bajo para los que andan raspados por el alambre de espino.»

—Doña Concha [Efecto SC3: Mujer / Anciana]: «Habla Concha, mijos. Por favor, nunca le echen alcohol reseco a una herida abierta; eso solo quema la carne viva. Hiervan agua limpia con una cucharadita de sal de grano. Cuelen con trapo de lino y machaquen tres hojas frescas de llantén de arroyo. El emplasto verde saca el calor malo y cierra la piel en dos noches. Y cuando sientan que la angustia les aprieta el pecho, una infusión de manzanilla devuelve el sueño. Cuiden su cuerpo, que es su única casa en esta tierra.»

—Director (Voz Natural): «Palabra sabia de la tierra. Ténganlo a mano en su botiquín. Sierra Central fuera.»`
  },
  {
    id: 'rad_004',
    numero: 4,
    titulo: 'Alerta Meteorológica: Viento de Ceniza',
    locutor: 'Director (Anigami Agadni) [Voz Natural]',
    frecuencia: '104.5 MHz',
    duracionAprox: '1:30 min',
    archivoAudio: 'assets/audio/radio/transmision_05_viento_ceniza.mp3',
    resumen: 'El Director alerta sobre ráfagas secas del norte cargadas de polvo volcánico y ceniza.',
    transcripcion: `[Tono de alerta breve... ráfagas de viento contra la antena]

«Atención a todos los refugios del cuadrante norte. Boletín meteorológico de urgencia para las próximas 36 horas.

El barómetro de la estación cayó en picada. Se aproxima una vaguada seca con viento de ceniza volcánica. Si tienen huertos descubiertos o semilleros en cubetas, tápenlos de inmediato con esteras de paja o costales húmedos.

Cierren las compuertas de las alacenas y tapen los filtros de agua con plástico; el polvo fino arruina los lechos de carbón. Quien tenga que salir a trotar o a recoger leña mañana temprano, use un pañuelo de algodón humedecido sobre la boca y la nariz. Cuiden los pulmones; en el Yermo no hay repuestos. Cambio y fuera.»

[Beep de cierre]`
  },
  {
    id: 'rad_005',
    numero: 5,
    titulo: 'Cápsula de Fontanería: La Trampa First-Flush',
    locutor: 'Director & Don Chui [SC3: Anciano]',
    frecuencia: '104.5 MHz',
    duracionAprox: '2:10 min',
    archivoAudio: 'assets/audio/radio/transmision_06_colector_pluvial.mp3',
    resumen: 'Instrucciones para limpiar canaletas y verificar la válvula first-flush antes de la lluvia.',
    transcripcion: `[Zumbido de sintonía... chasquido de micrófono]

—Director (Voz Natural): «Frecuencia 104.5 MHz. Don Chui nos recuerda una regla de oro antes de que caigan las primeras lluvias de la temporada.»

—Don Chui [Efecto SC3: Anciano]: «Muchachos, no se confíen de las primeras gotas. El techo junta tizne, polvo y caca de pájaro durante semanas de sequía. Si no limpian la canaleta y no vacían el tubo de descarte previo —el first-flush—, toda esa porquería se les va directo al tambor de doscientos litros y les pudre la reserva del mes. Cinco minutos de escoba de varas en el tejado les salvan cien litros de agua pura.»

—Director (Voz Natural): «Prevención pura. La pereza se paga con disentería. Revisen sus canaletas antes de que oscurezca. Buenas tardes a todos.»`
  },
  {
    id: 'rad_006',
    numero: 6,
    titulo: 'Ecos de Madrugada: Para el que Tropezó',
    locutor: 'Director (Anigami Agadni) [Voz Natural Íntima]',
    frecuencia: '104.5 MHz',
    duracionAprox: '2:00 min',
    archivoAudio: 'assets/audio/radio/transmision_07_buenas_noches_risco.mp3',
    resumen: 'Reflexión nocturna de contención emocional, perdón sin culpa y fuerza estoica.',
    transcripcion: `[Siseo suave constante... sonido lejano de brasa crepitando]

«Son las once y media de la noche en el valle.

Esta transmisión corta es para vos, que hoy estás mirando el techo de chapa y sientes que las fuerzas no te alcanzan. Para el que dio un paso en falso, o para el que rompió una racha y siente que todo se vino abajo.

Escúchame bien: siete veces cae el justo y vuelve a levantarse. Setenta veces siete. Una caída no te define; lo que te define es la dignidad con la que barres las cenizas y vuelves a encender el fogón mañana al alba.

Respira hondo. Toma un sorbo de agua fresca. Deja la brasa bien tapada para que guarde calor. Mañana volvemos a empezar juntos. Descansa... Sierra Central fuera.»

[Fade-out suave... silencio nocturno]`
  },
  {
    id: 'rad_007',
    numero: 7,
    titulo: 'El Secreto de la Isla Clarión: Los Fitolantros',
    locutor: 'Director & Cría Fitolantra [SC3: Bebé]',
    frecuencia: '104.5 MHz',
    duracionAprox: '2:45 min',
    archivoAudio: 'assets/audio/radio/transmision_04_proyecto_eden.mp3',
    resumen: 'Revelación de los diarios de Clarión sobre el origen botánico y pacífico de los Fitolantros.',
    transcripcion: `[Frecuencia encriptada con tono grave y eco de montaña]

—Director (Voz Natural): «Atención a los receptores del valle. Hoy compartimos una grabación recuperada de los diarios de la Isla Clarión sobre el Proyecto Edén de 2035. Dejemos de llamarles monstruos a los seres de los viveros. No nacieron de un virus de pesadilla; nacieron de un intento desesperado de la ciencia por evitar que la humanidad muriera de hambre cuando colapsaron los campos. Tienen clorofila en la piel, hacen fotosíntesis y lloran cuando se queman los árboles.»

—Cría Fitolantra [Efecto SC3: Bebé / Susurro vegetal]: «Ah... ra-íz... sol... luz...»

—Director (Voz Natural): «Si no los atacamos, no nos atacarán. El futuro no es arrasar el monte, es aprender a convivir con lo que brotó de las cenizas. Mantengan los ojos abiertos y el corazón despierto. Sierra Central fuera.»`
  }
];
