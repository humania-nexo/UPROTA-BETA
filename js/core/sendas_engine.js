/**
 * Motor de Sendas y Cimientos (Documento A - Secciones 3, 3.1, 4)
 * Gobierna: Asignación de 1 pilar absoluto, Piso 1-1-1-8, Forjado a 66 días y Barra de Integridad.
 */

export class SendasEngine {
  /**
   * Valida si el conjunto de sendas activas cumple con el piso mínimo (al menos 1 senda por cada pilar).
   */
  static verificarPisoMinimo(sendasActivas = []) {
    const pilaresCubiertos = {
      cuerpo: false,
      mente: false,
      espiritu: false,
      taller: false
    };

    sendasActivas.forEach(s => {
      if (pilaresCubiertos[s.pilar] !== undefined) {
        pilaresCubiertos[s.pilar] = true;
      }
    });

    const faltantes = Object.entries(pilaresCubiertos)
      .filter(([_, cubierto]) => !cubierto)
      .map(([pilar]) => pilar);

    return {
      cumplePiso: faltantes.length === 0,
      pilaresFaltantes: faltantes
    };
  }

  /**
   * Procesa el progreso diario de una senda.
   * A los 66 días con menos del 25% de fallos se forja en Cimiento.
   */
  static registrarCumplimiento(senda, cumplidoHoy) {
    const s = { ...senda };
    s.diasTotales = (s.diasTotales || 0) + 1;

    if (cumplidoHoy) {
      s.diasCumplidos = (s.diasCumplidos || 0) + 1;
      s.rachaActual = (s.rachaActual || 0) + 1;
      s.fallosSeguidos = 0;
    } else {
      s.diasFallados = (s.diasFallados || 0) + 1;
      s.fallosSeguidos = (s.fallosSeguidos || 0) + 1;
    }

    s.tasaFallos = s.diasFallados / s.diasTotales;

    // Verificar Forjado a Cimiento
    if (s.diasTotales >= 66 && s.tasaFallos <= 0.25) {
      return {
        senda: s,
        forjada: true,
        mensaje: `🔥 ¡La senda "${s.nombre}" ha sido forjada! Ahora es un Cimiento de tu vida.`
      };
    }

    return {
      senda: s,
      forjada: false,
      activarHogar: s.fallosSeguidos >= 3
    };
  }

  /**
   * Convierte una senda forjada en Cimiento con Barra de Integridad 100%.
   */
  static convertirACimiento(sendaForjada) {
    return {
      id: `cimiento_${sendaForjada.id}`,
      nombre: sendaForjada.nombre,
      pilar: sendaForjada.pilar,
      fechaForjado: new Date().toISOString().split('T')[0],
      integridad: 100, // 0 a 100%
      diasSinPracticar: 0,
      requiereMantenimientoSemanal: 2 // 2x/semana
    };
  }

  /**
   * Actualiza el desgaste de un Cimiento si pasa tiempo sin practicarse.
   * 14 días sin registrar baja a 85%, etc.
   */
  static evaluarIntegridadCimiento(cimiento, diasInactivo) {
    const c = { ...cimiento };
    c.diasSinPracticar += diasInactivo;

    if (c.diasSinPracticar >= 28) {
      c.integridad = 0;
      return { cimiento: c, resquebrajado: true };
    } else if (c.diasSinPracticar >= 21) {
      c.integridad = 50;
    } else if (c.diasSinPracticar >= 14) {
      c.integridad = 85;
    }

    return { cimiento: c, resquebrajado: false };
  }
}
