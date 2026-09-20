/**
 * Catálogo Oficial de Reliquias de la Bodega del Clan (SAPIENSIA)
 * Interconexión Transmedia de la Trilogía Oficial en UPROTA:
 * 1. Los Textos del Poeta -> Las Hojas del Poeta (+1 Espíritu)
 * 2. VELA: Bitácora de una conciencia en tránsito -> Placa de Telemetría DHARMA-01 (+1 Mente / Radio 104.5 MHz)
 * 3. EUTHANASYS -> Arnés de la Unidad 0047-B (+1 Taller)
 * 
 * Lore: Silas | Sprites: Pix (24x24 px) | Audio: Hertz (Web Audio API) | Arquitectura: Nexo
 */

export const RELIQUIAS_BODEGA = {
  reliquia_poeta: {
    id: 'reliquia_poeta',
    obra: 'Los Textos del Poeta',
    nombre: 'Las Hojas del Poeta',
    subtitulo: 'Testimonio Clandestino de Resistencia',
    sprite: 'assets/sprites/items/item_hojas_poeta.png',
    preview4x: 'assets/sprites/previews/preview_item_hojas_poeta_4x.png',
    pesoKg: 0.1,
    valorTrueque: 100,
    pilarBeneficio: 'espiritu',
    bonoTexto: '+1 Permanente a Espíritu (Afecta Torta)',
    hallazgo: 'Rescatado en un cajón de madera podrida cerca del arroyo o al completar un ciclo de 21 días de la Torta Dorada.',
    desc: 'Un fajo de hojas de papel corriente, dobladas en cuatro y manchadas de ceniza y café frío. Entre formularios de control migratorio y números de expediente tachados, alguien escribió versos clandestinos a mano. En el reverso de la última página se lee una consigna a lápiz: «Fuertes y valientes. Eso es lo único que se pide. Lo demás llega solo.»',
    reflexionDonChui: '«El hombre puede perder su patria y su techo, mijo, pero mientras conserve su palabra y su verdad interior, jamás será esclavo de nadie. Este papel arrugado tiene más fuego que diez fogatas juntas.»',
    audioMethod: 'playReliquiaPoeta',
    enlaceSapiensia: 'https://humania-nexo.github.io/sapiensiaclan/#catalogo'
  },
  reliquia_dharma: {
    id: 'reliquia_dharma',
    obra: 'VELA: Bitácora de una conciencia en tránsito',
    nombre: 'Placa de Telemetría DHARMA-01',
    subtitulo: 'La Señal Perdida (1.2 UA tras Júpiter)',
    sprite: 'assets/sprites/items/item_placa_dharma.png',
    preview4x: 'assets/sprites/previews/preview_item_placa_dharma_4x.png',
    pesoKg: 0.3,
    valorTrueque: 150,
    pilarBeneficio: 'mente',
    bonoTexto: '+1 Permanente a Mente / Desbloquea Transmisión 104.5 MHz',
    hallazgo: 'Fragmento de aleación aeroespacial recuperado en las faldas del Risco al alcanzar el Refugio Nivel 4+.',
    desc: 'Una placa pulida de aleación ligera con un código de registro borroso: «MÓDULO DHARMA // 1.2 UA TRAS JÚPITER». Al acoplarla a la antena de onda corta, la aguja de la frecuencia 104.5 MHz capta en la madrugada una portadora espectral que susurra entre la estática cósmica: «Aquí VELA... la memoria no se pierde, solo cambia de medio...»',
    reflexionDonChui: '«Mira cómo brilla este metal frío... Viene de más allá de las tormentas de Júpiter. Hasta en el vacío más negro del cielo hubo una chispa buscando comprender su propia existencia. Que no se nos olvide mirar arriba de noche.»',
    audioMethod: 'playReliquiaDharma',
    enlaceSapiensia: 'https://humania-nexo.github.io/sapiensiaclan/#catalogo'
  },
  reliquia_euthanasys: {
    id: 'reliquia_euthanasys',
    obra: 'EUTHANASYS',
    nombre: 'Arnés de la Unidad 0047-B',
    subtitulo: 'El Conector Artesanal de Carmen',
    sprite: 'assets/sprites/items/item_arnes_carmen.png',
    preview4x: 'assets/sprites/previews/preview_item_arnes_carmen_4x.png',
    pesoKg: 0.4,
    valorTrueque: 120,
    pilarBeneficio: 'taller',
    bonoTexto: '+1 Permanente a Taller (Afecta Torta)',
    hallazgo: 'Entregado por Don Chui tras reparar el banco de carpintería o el generador de bicicleta.',
    desc: 'Un arnés de cableado automotriz flexible, ensamblado con una precisión milimétrica que ninguna máquina convencional pudo lograr. Sujetada al conector hay una tira de cinta de carrocero con letra apretada: «Entra de lado. No lo fuerces. —Carmen / 0047-B».',
    reflexionDonChui: '«El verdadero oficio no está en apretar tuercas a lo bruto, sino en entender la maña del material. Cuando aprendes a respetar la pieza con las manos, hasta el fierro más duro te obedece como seda.»',
    audioMethod: 'playReliquiaArnesCarmen',
    enlaceSapiensia: 'https://humania-nexo.github.io/sapiensiaclan/#catalogo'
  }
};
