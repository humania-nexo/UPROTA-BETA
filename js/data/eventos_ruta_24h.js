/**
 * Dataset de Expediciones de 24 Horas y Encuentros Aleatorios en Ruta
 * Vincula: UPROTA_Progresion_Transporte_y_Expediciones_24h.md + Sistema de Carga y Exploración
 */

export const DESTINOS_EXPEDICION_24H = [
  {
    id: 'exp_silo_granos',
    nombre: 'El Silo de Granos Olvidado',
    distanciaKm: 15,
    duracionHoras: 24,
    nivelRefugioMin: 4,
    transporteRequerido: 'Mochila Costal (18 kg) o Bicicleta (35 kg)',
    consumoAguaLitros: 2.5,
    consumoRaciones: 2,
    descripcion: 'Antiguo complejo agropecuario con silos de chapa galvanizada herméticos en medio de rastrojos de cultivo seco.',
    botinPosible: [
      { id: 'item_saco_grano_trigo', nombre: 'Saco de Trigo Preservado', pesoKg: 10, prob: 0.9 },
      { id: 'item_lona_industrial', nombre: 'Lona de Silobolsa Impermeable', pesoKg: 4, prob: 0.8 },
      { id: 'item_herramienta_agricola', nombre: 'Pala de Punta Forjada', pesoKg: 3, prob: 0.6 }
    ]
  },
  {
    id: 'exp_subestacion_risco',
    nombre: 'La Subestación Eléctrica del Risco',
    distanciaKm: 22,
    duracionHoras: 24,
    nivelRefugioMin: 5,
    transporteRequerido: 'Bicicleta de Acero (35 kg)',
    consumoAguaLitros: 3.0,
    consumoRaciones: 2,
    descripcion: 'Puesto de alta tensión en las faldas de la cordillera norte, con casetas de transformadores y bancos de baterías.',
    botinPosible: [
      { id: 'item_bobina_cobre', nombre: 'Bobina de Alambre de Cobre', pesoKg: 6, prob: 0.9 },
      { id: 'item_aisladores_ceramicos', nombre: 'Aisladores de Antena', pesoKg: 2, prob: 0.85 },
      { id: 'item_panel_solar_chico', nombre: 'Panel Solar Monocristalino 50W', pesoKg: 5, prob: 0.5 },
      { id: 'item_bateria_gel', nombre: 'Batería de Plomo-Gel Sellada', pesoKg: 12, prob: 0.4 }
    ]
  },
  {
    id: 'exp_desguace_camiones',
    nombre: 'El Desguace de Camiones de la Carretera Sur',
    distanciaKm: 28,
    duracionHoras: 24,
    nivelRefugioMin: 6,
    transporteRequerido: 'Bicicleta con Alforjas o Carrito Trailer',
    consumoAguaLitros: 3.5,
    consumoRaciones: 3,
    descripcion: 'Kilómetros de asfalto quebrado con convoyes de carga abandonados y talleres de transporte pesado.',
    botinPosible: [
      { id: 'item_ballesta_acero', nombre: 'Ballesta de Acero de Camión', pesoKg: 15, prob: 0.85 },
      { id: 'item_alternador_pesado', nombre: 'Alternador de 24V de Servicio Pesado', pesoKg: 8, prob: 0.7 },
      { id: 'item_mangueras_reforzadas', nombre: 'Mangueras Hidráulicas de Alta Presión', pesoKg: 3, prob: 0.9 },
      { id: 'item_perfil_estructural', nombre: 'Perfil Tubular para Carrito Trailer', pesoKg: 12, prob: 0.6 }
    ]
  },
  {
    id: 'exp_cantera_calera',
    nombre: 'La Cantera de Yeso y la Calera Vieja',
    distanciaKm: 35,
    duracionHoras: 24,
    nivelRefugioMin: 7,
    transporteRequerido: 'Carrito Trailer / Remolque (85 kg) Obligatorio',
    consumoAguaLitros: 4.0,
    consumoRaciones: 3,
    descripcion: 'Imponente mina a cielo abierto de piedra caliza y yeso con hornos de calcinación rústicos.',
    botinPosible: [
      { id: 'item_saco_cal_viva', nombre: 'Saco de Cal Viva (40 kg)', pesoKg: 40, prob: 0.95 },
      { id: 'item_saco_yeso_enlucir', nombre: 'Saco de Yeso de Revoque (25 kg)', pesoKg: 25, prob: 0.9 },
      { id: 'item_arcilla_refractaria', nombre: 'Arcilla Refractaria de Veta', pesoKg: 15, prob: 0.8 }
    ]
  }
];

export const EVENTOS_RUTA_24H = [
  {
    id: 'evt_r01_vado_rio',
    titulo: 'El Vado de Piedras del Río Seco',
    texto: 'La carretera está cortada por un deslave de barro seco. Puedes intentar cruzar cargando la bicicleta al hombro con cuidado o dar un rodeo de tres kilómetros por el puente de ferrocarril.',
    opciones: [
      { id: 'cruce_lento_seguro', texto: 'Tomar el desvío seguro del puente de ferrocarril (+1h de viaje, 0% riesgo de daño).' },
      { id: 'cruce_directo', texto: 'Cruzar el vado de barro cargando el peso (Riesgo de tropiezo / raspón).' }
    ]
  },
  {
    id: 'evt_r02_cruce_katia',
    titulo: 'Encuentro con Katia la Mensajera',
    texto: 'Una figura ágil desciende al trote por el filo de la loma con una vara de avellano. Es Katia. Mira tus alforjas bien estibadas y te indica un atajo por el sendero de las cabras.',
    recompensa: { tiempoAhorradoHoras: 2, moral: +1 }
  },
  {
    id: 'evt_r03_refugio_paso',
    titulo: 'El Refugio de Paso en la Ruina',
    texto: 'Encuentras una antigua caseta de peones de campo con techo de teja intacto y una tinaja con agua de lluvia limpia.',
    recompensa: { moral: +1, aguaRecuperadaLitros: 1.5 }
  },
  {
    id: 'evt_r04_pinchazo_mezquite',
    titulo: 'Espina de Mezquite en la Rueda Trasera',
    texto: 'Un chasquido en la rueda trasera avisa que una espina dura atravesó la cubierta. Afortunadamente llevas el kit de parches y la bomba de pie de Don Chui.',
    costeItem: 'kit_parches'
  },
  {
    id: 'evt_r05_viento_repentino',
    titulo: 'Vagualada de Viento y Polvo',
    texto: 'El viento levanta una cortina de tierra ciega. Aseguras las lonas de tu carga y usas el pañuelo húmedo de Valeria para no respirar ceniza.',
    recompensa: { moral: +1 }
  },
  {
    id: 'evt_r06_caravana_sal',
    titulo: 'El Carromato de la Caravana de la Sal',
    texto: 'Dos comerciantes nómadas descansan sus mulas junto a una noria. Te ofrecen intercambiar un saco de sal de roca pura por dos tablas de madera cepillada.',
    intercambio: { dar: 'item_tablas', cantidadDar: 2, recibir: 'item_saco_sal', cantidadRecibir: 1 }
  },
  {
    id: 'evt_r07_trampa_lazo',
    titulo: 'La Trampa de Lazo en la Vereda',
    texto: 'Ves un lazo de alambre de acero colocado en una senda de conejos. Una liebre fresca ha quedado atrapada hace menos de una hora.',
    recompensa: { item: 'item_carne_fresca', cantidad: 2 }
  },
  {
    id: 'evt_r08_perro_lastimado',
    titulo: 'El Perro Cimarrón en el Matorral',
    texto: 'Un perro mestizo de pelaje arena tiene la pata trasera atrapada en un alambre oxidado. Le das un trozo de charqui, cortas el alambre y limpias la herida con salmuera.',
    recompensa: { moral: +2, desbloqueoCompanero: true }
  },
  {
    id: 'evt_r09_mural_savia',
    titulo: 'El Mural de Savia en la Pared de Piedra',
    texto: 'En una peña protegida del sol encuentras símbolos botánicos trazados con savia verde fluorescente que explican el curso de las aguas subterráneas.',
    recompensa: { espiritu: +1, loreFitolantros: true }
  },
  {
    id: 'evt_r10_eco_radio_cumbre',
    titulo: 'Sintonía en el Collado Alto',
    texto: 'Al alcanzar el paso de montaña al caer el sol, tu receptor portátil sintoniza la voz de Elena en 104.5 MHz con una claridad cristalina que reconforta el alma.',
    recompensa: { moral: +1, mente: +1 }
  }
];
