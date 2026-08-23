/**
 * Módulo de Objetos de Sabiduría Diaria (Documento Sabiduría Diaria)
 * Gestiona: Don Chui, Biblia, Manuales de supervivencia, tope de 3 activos y mensajes del día.
 */

import { OBJETOS_SABIDURIA } from '../data/sabiduria_textos.js';

export class SabiduriaDiariaEngine {
  /**
   * Obtiene el mensaje del día para un objeto de sabiduría activo.
   */
  static obtenerMensajeDelDia(objetoId) {
    const obj = Object.values(OBJETOS_SABIDURIA).find(o => o.id === objetoId);
    if (!obj || !obj.mensajes || obj.mensajes.length === 0) return null;

    // Usar el día del año como índice para consistencia diaria
    const hoy = new Date();
    const diaDelAnio = Math.floor((hoy - new Date(hoy.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const index = diaDelAnio % obj.mensajes.length;

    return {
      objetoId: obj.id,
      nombreObjeto: obj.nombre,
      icono: obj.icono,
      pilar: obj.pilar,
      botonTexto: obj.botonTexto || 'Leído',
      mensaje: obj.mensajes[index]
    };
  }

  /**
   * Valida la activación de un nuevo objeto de sabiduría respetando el tope de 3 activos.
   */
  static intentarActivarObjeto(objetosActivos, nuevoObjetoId) {
    if (objetosActivos.includes(nuevoObjetoId)) {
      return { exito: true, objetosActivos };
    }

    if (objetosActivos.length >= 3) {
      return {
        exito: false,
        razon: 'Límite alcanzado: Máximo 3 Objetos de Sabiduría Diaria activos simultáneos. Desactiva uno en tu inventario para activar este.'
      };
    }

    return {
      exito: true,
      objetosActivos: [...objetosActivos, nuevoObjetoId]
    };
  }
}
