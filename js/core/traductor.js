/**
 * Motor Semántico de Traducción UPROTA
 * Capas:
 * 1. Coincidencia Exacta
 * 2. Sinónimos
 * 3. Semillas Categoriales
 * 4. Bautizo Personalizado (Scribblenauts)
 */

import { DICCIONARIO_BASE } from '../data/diccionario.js';

export class MotorTraductor {
  constructor(diccionarioPersonal = {}) {
    this.diccionarioPersonal = diccionarioPersonal;
  }

  normalizarTexto(texto) {
    return (texto || '')
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  traducirAccion(textoOriginal) {
    const normalizado = this.normalizarTexto(textoOriginal);

    // Capa 0: Diccionario Personal del Usuario
    if (this.diccionarioPersonal[normalizado]) {
      return {
        ...this.diccionarioPersonal[normalizado],
        fuente: 'personal'
      };
    }

    // Capa 1: Búsqueda Exacta
    if (DICCIONARIO_BASE.exactas[normalizado]) {
      return {
        ...DICCIONARIO_BASE.exactas[normalizado],
        fuente: 'exacta'
      };
    }

    // Capa 2: Sinónimos
    const sinonimoClave = DICCIONARIO_BASE.sinonimos[normalizado];
    if (sinonimoClave && DICCIONARIO_BASE.exactas[sinonimoClave]) {
      return {
        ...DICCIONARIO_BASE.exactas[sinonimoClave],
        fuente: 'sinonimo'
      };
    }

    // Capa 3: Semillas Categoriales (Inferencia)
    const palabras = normalizado.split(/\s+/);
    for (const [categoria, palabrasClave] of Object.entries(DICCIONARIO_BASE.semillas)) {
      for (const palabra of palabras) {
        if (palabrasClave.some(p => p.includes(palabra) || palabra.includes(p))) {
          return this.generarPlantillaCategoria(categoria, textoOriginal);
        }
      }
    }

    // Capa 4: Territorio Inexplorado
    return {
      lore: `Labor de Supervivencia: ${textoOriginal}`,
      recurso: { tablas: 1, provisiones: 1 },
      categoria: 'general',
      icono: '⛺',
      fuente: 'desconocido'
    };
  }

  traducirCadena(textoOriginal) {
    const normalizado = this.normalizarTexto(textoOriginal);

    if (DICCIONARIO_BASE.cadenas[normalizado]) {
      return DICCIONARIO_BASE.cadenas[normalizado];
    }

    for (const [clave, datos] of Object.entries(DICCIONARIO_BASE.cadenas)) {
      if (normalizado.includes(clave) || clave.includes(normalizado)) {
        return datos;
      }
    }

    return {
      lore: `Cadena del Hábito: ${textoOriginal}`,
      icono: '⛓️',
      categoria: 'cuerpo'
    };
  }

  generarPlantillaCategoria(categoria, textoOriginal) {
    switch (categoria) {
      case 'cuerpo':
        return {
          lore: `Patrullar la ruta: ${textoOriginal}`,
          recurso: { provisiones: 2, agua: 1 },
          categoria: 'cuerpo',
          icono: '🏃',
          fuente: 'semilla'
        };
      case 'mente':
        return {
          lore: `Decodificar archivos: ${textoOriginal}`,
          recurso: { clavos: 2, moral: 1 },
          categoria: 'mente',
          icono: '📜',
          fuente: 'semilla'
        };
      case 'espiritu':
        return {
          lore: `Velar junto a la fogata: ${textoOriginal}`,
          recurso: { moral: 2 },
          categoria: 'espiritu',
          icono: '🔥',
          fuente: 'semilla'
        };
      case 'hogar':
        return {
          lore: `Asegurar el refugio: ${textoOriginal}`,
          recurso: { tablas: 2 },
          categoria: 'hogar',
          icono: '🛠️',
          fuente: 'semilla'
        };
      case 'finanzas':
        return {
          lore: `Almacenar recursos de valor: ${textoOriginal}`,
          recurso: { clavos: 3 },
          categoria: 'finanzas',
          icono: '🪙',
          fuente: 'semilla'
        };
      default:
        return {
          lore: `Tarea del Yermo: ${textoOriginal}`,
          recurso: { tablas: 1 },
          categoria: 'general',
          icono: '📦',
          fuente: 'semilla'
        };
    }
  }
}
