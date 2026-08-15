/**
 * Diccionario de Traducción Semántica UPROTA
 * Transforma acciones del mundo real en misiones de supervivencia del Yermo.
 */

export const DICCIONARIO_BASE = {
  // Coincidencias Exactas
  exactas: {
    "hacer ejercicio": {
      lore: "Patrulla del perímetro",
      recurso: { provisiones: 3, agua: 1 },
      categoria: "cuerpo",
      icono: "🏃"
    },
    "trotar 20min": {
      lore: "Patrullar perímetro exterior",
      recurso: { provisiones: 3, agua: 1 },
      categoria: "cuerpo",
      icono: "🏃"
    },
    "lavar platos": {
      lore: "Purificar utensilios del clan",
      recurso: { tablas: 2, moral: 1 },
      categoria: "hogar",
      icono: "🥣"
    },
    "limpiar casa": {
      lore: "Fortificar y desinfectar el refugio",
      recurso: { tablas: 3, clavos: 1 },
      categoria: "hogar",
      icono: "🧹"
    },
    "leer 20min": {
      lore: "Decodificar manuales antiguos",
      recurso: { clavos: 2, moral: 2 },
      categoria: "mente",
      icono: "📜"
    },
    "estudiar": {
      lore: "Mapear zona segura y planos",
      recurso: { clavos: 2, moral: 2 },
      categoria: "mente",
      icono: "🗺️"
    },
    "meditar 10min": {
      lore: "Escuchar el viento del Yermo",
      recurso: { moral: 3 },
      categoria: "espiritu",
      icono: "🔥"
    },
    "tomar agua": {
      lore: "Purificar ración de cisterna",
      recurso: { agua: 2 },
      categoria: "cuerpo",
      icono: "💧"
    },
    "ahorrar dinero": {
      lore: "Guardar chatarra en caja fuerte",
      recurso: { clavos: 4 },
      categoria: "finanzas",
      icono: "🪙"
    }
  },

  // Sinónimos comunes
  sinonimos: {
    "correr": "trotar 20min",
    "trotar": "trotar 20min",
    "gym": "hacer ejercicio",
    "entrenar": "hacer ejercicio",
    "fregar platos": "lavar platos",
    "fregar trastes": "lavar platos",
    "lavar trastes": "lavar platos",
    "ordenar cuarto": "limpiar casa",
    "barrer": "limpiar casa",
    "leer libro": "leer 20min",
    "leer": "leer 20min",
    "orar": "meditar 10min",
    "rezar": "meditar 10min",
    "beber agua": "tomar agua",
    "ahorrar": "ahorrar dinero"
  },

  // Semillas para categorización automática
  semillas: {
    cuerpo: ["ejercicio", "trotar", "correr", "caminar", "gym", "dormir", "agua", "pesas", "estirar"],
    mente: ["leer", "estudiar", "aprender", "libro", "idioma", "curso", "escribir", "programar"],
    espiritu: ["meditar", "orar", "rezar", "agradecer", "respirar", "naturaleza", "silencio"],
    hogar: ["platos", "trastes", "limpiar", "barrer", "trapear", "ordenar", "cocinar", "ropa", "planchar"],
    finanzas: ["ahorrar", "presupuesto", "inversion", "gasto", "factura", "cuenta"]
  },

  // Diccionario para Cadenas (Hábitos a dejar)
  cadenas: {
    "fumar": {
      lore: "Niebla de Ceniza",
      icono: "🌫️",
      categoria: "cuerpo"
    },
    "alcohol": {
      lore: "Agua Contaminada",
      icono: "🧪",
      categoria: "cuerpo"
    },
    "refresco": {
      lore: "Jarabe Corrosivo",
      icono: "🥤",
      categoria: "cuerpo"
    },
    "redes sociales / doomscrolling": {
      lore: "Espejismo del Yermo",
      icono: "🪞",
      categoria: "mente"
    },
    "comida chatarra": {
      lore: "Raciones Caducadas",
      icono: "🥫",
      categoria: "cuerpo"
    }
  }
};
