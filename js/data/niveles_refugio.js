/**
 * Catálogo Oficial de los 10 Niveles de Refugio y Progresión Make-to-Win
 * Define: Desbloqueos de slots (Sendas, Cadenas, Faros), Capacidad de bolsa y Requisitos
 */

export const NIVELES_REFUGIO = [
  {
    nivel: 0,
    nombre: "Punto Cero",
    icono: "🏕️",
    descripcion: "Un rincón polvoriento bajo una chapa suelta. Solo tú y el inicio de tu camino.",
    bolsaTipo: "Bolsa ecológica rota",
    capacidadBolsaKg: 8.0,
    espaciosBolsa: 6,
    maxSendas: 4,  // Piso mínimo 1-1-1-8
    maxCadenas: 2,
    maxFaros: 0,    // Se activa con el almacén en Día 7
    requisitos: {},
    requisitoTexto: "Inicio del juego"
  },
  {
    nivel: 1,
    nombre: "Refugio Apuntalado",
    icono: "🛖",
    descripcion: "Palets reforzados, letrina cavada y fogón protegido del viento. Almacén seguro.",
    bolsaTipo: "Bolsa ecológica remendada",
    capacidadBolsaKg: 8.0,
    espaciosBolsa: 6,
    maxSendas: 4,
    maxCadenas: 2,
    maxFaros: 1,    // Primer Faro de Ahorro
    requisitos: { tablas: 10, clavos: 8, aguaLitros: 5 },
    requisitoTexto: "10 Tablas, 8 Clavos, 5L Agua"
  },
  {
    nivel: 2,
    nombre: "Puesto Asegurado",
    icono: "📻",
    descripcion: "Radio de onda corta sintonizada, candado en la alacena y bolso reforzado.",
    bolsaTipo: "Bolso de tela reforzado (Singer)",
    capacidadBolsaKg: 12.0,
    espaciosBolsa: 10,
    maxSendas: 6,   // +2 Sendas
    maxCadenas: 2,
    maxFaros: 1,
    requisitos: { tablas: 20, clavos: 15, provisiones: 5, aguaLitros: 10 },
    requisitoTexto: "20 Tablas, 15 Clavos, 5 Provisiones, 10L Agua"
  },
  {
    nivel: 3,
    nombre: "Casilla Fortificada",
    icono: "🧱",
    descripcion: "Muros dobles aislados contra el frío. Los primeros caminantes pasan a comerciar.",
    bolsaTipo: "Bolso de tela reforzado",
    capacidadBolsaKg: 12.0,
    espaciosBolsa: 10,
    maxSendas: 6,
    maxCadenas: 3,  // +1 Cadena
    maxFaros: 1,
    requisitos: { tablas: 35, clavos: 25, provisiones: 10, aguaLitros: 15 },
    requisitoTexto: "35 Tablas, 25 Clavos, 10 Provisiones, 15L Agua"
  },
  {
    nivel: 4,
    nombre: "Bastión de Cimientos",
    icono: "🏛️",
    descripcion: "Tus hábitos forjados sostienen la estructura. Mochila costal resistente.",
    bolsaTipo: "Mochila costal con cuerdas",
    capacidadBolsaKg: 18.0,
    espaciosBolsa: 14,
    maxSendas: 6,
    maxCadenas: 3,
    maxFaros: 2,    // +1 Faro (Monto)
    requisitos: { tablas: 50, clavos: 40, provisiones: 15, aguaLitros: 20 },
    requisitoTexto: "50 Tablas, 40 Clavos, 15 Provisiones, 20L Agua"
  },
  {
    nivel: 5,
    nombre: "Estación de Bioenergía",
    icono: "⚡",
    descripcion: "Bici-generador montado. Tu esfuerzo físico genera luz LED propia y energía constante.",
    bolsaTipo: "Mochila costal",
    capacidadBolsaKg: 18.0,
    espaciosBolsa: 14,
    maxSendas: 8,   // +2 Sendas
    maxCadenas: 3,
    maxFaros: 2,
    requisitos: { tablas: 70, clavos: 55, provisiones: 25, aguaLitros: 30 },
    requisitoTexto: "70 Tablas, 55 Clavos, 25 Provisiones, 30L Agua"
  },
  {
    nivel: 6,
    nombre: "Taller de Restauración",
    icono: "🛠️",
    descripcion: "Electrólisis y forja rústica para llevar herramientas al 100% de eficiencia.",
    bolsaTipo: "Mochila costal reforzada",
    capacidadBolsaKg: 18.0,
    espaciosBolsa: 14,
    maxSendas: 8,
    maxCadenas: 4,  // +1 Cadena
    maxFaros: 2,
    requisitos: { tablas: 95, clavos: 75, provisiones: 35, aguaLitros: 40 },
    requisitoTexto: "95 Tablas, 75 Clavos, 35 Provisiones, 40L Agua"
  },
  {
    nivel: 7,
    nombre: "Enclave Comercial",
    icono: "🐪",
    descripcion: "Parada fija de la Caravana de la Sal. Trueque regular de bienes raros y mochila de varilla.",
    bolsaTipo: "Mochila con estructura de varilla",
    capacidadBolsaKg: 25.0,
    espaciosBolsa: 18,
    maxSendas: 8,
    maxCadenas: 4,
    maxFaros: 3,    // +1 Faro
    requisitos: { tablas: 125, clavos: 100, provisiones: 50, aguaLitros: 50 },
    requisitoTexto: "125 Tablas, 100 Clavos, 50 Provisiones, 50L Agua"
  },
  {
    nivel: 8,
    nombre: "Complejo Autosustentable",
    icono: "🌱",
    descripcion: "Invernadero protegido, panel solar complementario y forja de metal avanzada.",
    bolsaTipo: "Mochila con estructura de varilla",
    capacidadBolsaKg: 25.0,
    espaciosBolsa: 18,
    maxSendas: 10,  // +2 Sendas
    maxCadenas: 4,
    maxFaros: 3,
    requisitos: { tablas: 160, clavos: 130, provisiones: 70, aguaLitros: 65 },
    requisitoTexto: "160 Tablas, 130 Clavos, 70 Provisiones, 65L Agua"
  },
  {
    nivel: 9,
    nombre: "Santuario Comunitario",
    icono: "🏰",
    descripcion: "Cisterna subterránea, filtro de bioarena y corrales de aves protegidos.",
    bolsaTipo: "Mochila militar adaptada",
    capacidadBolsaKg: 25.0,
    espaciosBolsa: 18,
    maxSendas: 10,
    maxCadenas: 5,  // +1 Cadena
    maxFaros: 3,
    requisitos: { tablas: 200, clavos: 170, provisiones: 90, aguaLitros: 80 },
    requisitoTexto: "200 Tablas, 170 Clavos, 90 Provisiones, 80L Agua"
  },
  {
    nivel: 10,
    nombre: "La Ciudadela Libre",
    icono: "👑",
    descripcion: "Cúspide de la reconstrucción. Tu disciplina ha creado un faro indestructible en el Yermo.",
    bolsaTipo: "Equipo completo de expedición",
    capacidadBolsaKg: 30.0,
    espaciosBolsa: 20,
    maxSendas: 12,  // +2 Sendas
    maxCadenas: 5,
    maxFaros: 4,    // +1 Faro
    requisitos: { tablas: 250, clavos: 220, provisiones: 120, aguaLitros: 100 },
    requisitoTexto: "250 Tablas, 220 Clavos, 120 Provisiones, 100L Agua"
  }
];
