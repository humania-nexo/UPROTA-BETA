/**
 * Motor del Refugio y Bioenergía (Documento B - Secciones 2.2, 2.3, 12)
 * Bioenergía a Pedal/Manivela: El esfuerzo físico real carga la batería del refugio.
 * Restauración de herramientas (30% -> 80% con vinagre -> 100% con electrólisis).
 */

import { NIVELES_REFUGIO } from '../data/niveles_refugio.js';

export class RefugioMundoEngine {
  /**
   * Carga la batería del refugio cuando el jugador cumple una Senda de Cuerpo (o giro de manivela Taller).
   */
  static recargarBioenergia(estadoBioenergia, incremento = 35) {
    const nuevaCarga = Math.min(100, estadoBioenergia.nivelCarga + incremento);
    return {
      ...estadoBioenergia,
      nivelCarga: nuevaCarga
    };
  }

  /**
   * Valida si el refugio puede subir al siguiente nivel según sus recursos acumulados.
   */
  static puedeSubirNivel(nivelActual, recursos) {
    const sigNivel = nivelActual + 1;
    if (sigNivel >= NIVELES_REFUGIO.length) return { posible: false, razon: 'Nivel máximo alcanzado.' };

    const req = NIVELES_REFUGIO[sigNivel].requisitos;
    const falta = [];

    if (req.tablas && (recursos.tablas || 0) < req.tablas) {
      falta.push(`${req.tablas - (recursos.tablas || 0)} Tablas`);
    }
    if (req.clavos && (recursos.clavos || 0) < req.clavos) {
      falta.push(`${req.clavos - (recursos.clavos || 0)} Clavos`);
    }
    if (req.provisiones && (recursos.provisiones || 0) < req.provisiones) {
      falta.push(`${req.provisiones - (recursos.provisiones || 0)} Provisiones`);
    }
    if (req.aguaLitros && (recursos.aguaLitros || 0) < req.aguaLitros) {
      falta.push(`${req.aguaLitros - (recursos.aguaLitros || 0)}L Agua`);
    }

    return {
      posible: falta.length === 0,
      siguienteInfo: NIVELES_REFUGIO[sigNivel],
      faltantes: falta
    };
  }
}
