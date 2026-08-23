/**
 * Motor de los 4 Pilares y Torta de Equilibrio (Documento A - Secciones 2, 5, 6, 7)
 * Paleta: Cuerpo (Rojo Óxido), Mente (Azul Cobalto), Espíritu (Púrpura Místico), Taller (Verde Oliva)
 * Torta Dorada: Exclusivo para Equilibrio Perfecto
 */

export const PILARES_INFO = {
  cuerpo: {
    nombre: 'Cuerpo',
    icono: '🏃',
    colorHex: '#b91c1c',
    colorLight: '#f87171',
    efectoMecanico: 'Aumenta la energía de exploración y capacidad de carga física.'
  },
  mente: {
    nombre: 'Mente',
    icono: '📜',
    colorHex: '#0369a1',
    colorLight: '#38bdf8',
    efectoMecanico: 'Acelera el avance de Faros y sintoniza nuevas transmisiones.'
  },
  espiritu: {
    nombre: 'Espíritu',
    icono: '🔥',
    colorHex: '#7e22ce',
    colorLight: '#c084fc',
    efectoMecanico: 'Fortalece El Hogar con más luz prestada y atrae visitantes amistosos.'
  },
  taller: {
    nombre: 'Taller',
    icono: '🛠️',
    colorHex: '#15803d',
    colorLight: '#4ade80',
    efectoMecanico: 'Mejora la eficiencia de restauración y crafteo de herramientas.'
  }
};

export class PilaresEngine {
  /**
   * Calcula los puntos y porcentajes de cada pilar en la ventana móvil de 21 días.
   * Cada Senda activa sostenida = 1 punto entero a su pilar.
   * Cada Objeto de Sabiduría activo = 1 punto entero a su pilar.
   */
  static calcularEquilibrio(sendasActivas = [], objetosActivos = []) {
    const conteo = { cuerpo: 0, mente: 0, espiritu: 0, taller: 0 };

    // Sumar Sendas activas
    sendasActivas.forEach(senda => {
      if (conteo[senda.pilar] !== undefined) {
        conteo[senda.pilar] += 1;
      }
    });

    // Sumar Objetos de Sabiduría Diaria activos
    objetosActivos.forEach(obj => {
      if (conteo[obj.pilar] !== undefined) {
        conteo[obj.pilar] += 1;
      }
    });

    const totalPuntos = conteo.cuerpo + conteo.mente + conteo.espiritu + conteo.taller;

    if (totalPuntos === 0) {
      return {
        puntos: conteo,
        porcentajes: { cuerpo: 25, mente: 25, espiritu: 25, taller: 25 },
        totalPuntos: 0,
        nivelEquilibrio: 'inicial',
        bonos: []
      };
    }

    const porcentajes = {
      cuerpo: (conteo.cuerpo / totalPuntos) * 100,
      mente: (conteo.mente / totalPuntos) * 100,
      espiritu: (conteo.espiritu / totalPuntos) * 100,
      taller: (conteo.taller / totalPuntos) * 100
    };

    const evaluacion = this.evaluarNivelEquilibrio(porcentajes, totalPuntos, conteo);

    return {
      puntos: conteo,
      porcentajes,
      totalPuntos,
      nivelEquilibrio: evaluacion.nivel,
      bonos: evaluacion.bonos,
      esDorado: evaluacion.nivel === 'perfecto'
    };
  }

  /**
   * Evalúa el nivel de equilibrio según Documento A (Sección 6).
   * El inicio básico (4 sendas) no da bonos dorados para no regalar la cima sin esfuerzo previo.
   */
  static evaluarNivelEquilibrio(porcentajes, totalPuntos = 0, conteo = { cuerpo: 0, mente: 0, espiritu: 0, taller: 0 }) {
    const valores = Object.values(porcentajes);
    const min = Math.min(...valores);
    const max = Math.max(...valores);

    const bonos = [];

    // --- BONOS ESPECÍFICOS POR PILAR ACUMULADO (2+ fuentes en un pilar) ---
    if (conteo.cuerpo >= 2) {
      bonos.push({
        id: 'bono_pilar_cuerpo',
        titulo: '🏃 Resistencia Física',
        desc: '−5% probabilidad de herida en exploraciones del Yermo.'
      });
    }
    if (conteo.mente >= 2) {
      bonos.push({
        id: 'bono_pilar_mente',
        titulo: '📜 Agudeza Mental',
        desc: '+10% avance en proyectos de planos y lectura.'
      });
    }
    if (conteo.espiritu >= 2) {
      bonos.push({
        id: 'bono_pilar_espiritu',
        titulo: '🔥 Calma Interior',
        desc: '+2 puntos de moral y mayor resguardo en El Hogar.'
      });
    }
    if (conteo.taller >= 2) {
      bonos.push({
        id: 'bono_pilar_taller',
        titulo: '🛠️ Manos Hábiles',
        desc: '+10% eficiencia al reparar y craftear herramientas.'
      });
    }

    // Si es el inicio básico (4 sendas), mantener como base de partida
    if (totalPuntos <= 4) {
      return { nivel: 'base_inicial', bonos };
    }

    let nivel = 'desbalanceado';

    // Nivel 1: Aproximado (ningún pilar por debajo de 15%)
    if (min >= 15) {
      nivel = 'aproximado';
      bonos.push({
        id: 'bono_aproximado',
        titulo: 'Alerta Perimetral',
        desc: '−15% probabilidad de eventos de saqueadores o ataques.'
      });
    }

    // Nivel 2: Alineado (ningún pilar fuera del rango 15% - 35%)
    if (min >= 15 && max <= 35) {
      nivel = 'alineado';
      bonos.push({
        id: 'bono_alineado',
        titulo: 'Paso Firme',
        desc: '−20% probabilidad de salir herido en exploraciones Tipo A.'
      });
    }

    // Nivel 3: Perfecto (todos entre 20% y 30% -> Torta Dorada)
    if (min >= 20 && max <= 30) {
      nivel = 'perfecto';
      bonos.push({
        id: 'bono_dorado',
        titulo: 'Armonía del Yermo (Torta Dorada)',
        desc: '+25% probabilidad de encontrar botín Muy Raro y de Trueque (Sal, Ferrocerio, Café).'
      });
    }

    return { nivel, bonos };
  }
}
