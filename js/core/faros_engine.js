/**
 * Motor de Faros (Documento A - Sección 4.1 y 4.2)
 * Desacoplado de los pilares: Metas a mediano/largo plazo y cultura de ahorro real.
 * Modalidad 1: Faro por Tiempo (24 Semanas / 168 Días por ciclo, 5%-10% ingreso fijo).
 * Modalidad 2: Faro por Monto (Proyectos materiales específicos con barra de progreso %).
 */

export class FarosEngine {
  /**
   * Obtiene el total de checkpoints requeridos según la frecuencia de cobro para 24 semanas (168 días).
   */
  static obtenerCheckpointsTotales(frecuenciaCobro = 'quincenal') {
    switch (frecuenciaCobro) {
      case 'semanal': return 24; // 24 semanas
      case 'quincenal': return 12; // 12 quincenas
      case 'mensual': return 6; // 6 meses
      default: return 12;
    }
  }

  /**
   * Inicializa el Faro de Ahorro regular de 24 semanas (Modalidad 1).
   */
  static crearFaroAhorroTiempo(frecuenciaCobro = 'quincenal', ciclo = 1) {
    const checkpointsTotales = this.obtenerCheckpointsTotales(frecuenciaCobro);
    const nombresCiclo = {
      1: 'Faro Semestral I: Los Cimientos (24 Semanas)',
      2: 'Faro Semestral II: La Travesía del Convoy (24 Semanas)',
      3: 'Faro Anual III: El Guardián del Yermo (Año 2)'
    };

    return {
      id: `faro_ahorro_tiempo_c${ciclo}`,
      tipoModalidad: 'tiempo',
      nombre: nombresCiclo[ciclo] || `Faro de Ahorro: Ciclo ${ciclo} (24 Semanas)`,
      porcentajeAhorro: ciclo === 1 ? 5 : 10,
      cicloActual: ciclo,
      frecuenciaCobro, // 'semanal', 'quincenal', 'mensual'
      fechaInicio: new Date().toISOString().split('T')[0],
      checkpointsTotales,
      checkpointsRegistrados: 0,
      checkpointsLogrados: 0,
      checkpointsSinIngreso: 0,
      checkpointsCompromiso: 0,
      porcentajeCompletado: 0,
      completado: false,
      historialCiclos: []
    };
  }

  /**
   * Avanza el faro al siguiente ciclo semestral preservando el historial acumulado.
   */
  static avanzarSiguienteCiclo(faro) {
    const f = { ...faro };
    const cicloCompletado = {
      ciclo: f.cicloActual,
      nombre: f.nombre,
      porcentajeAhorro: f.porcentajeAhorro,
      fechaFin: new Date().toISOString().split('T')[0],
      checkpointsLogrados: f.checkpointsLogrados,
      checkpointsSinIngreso: f.checkpointsSinIngreso,
      checkpointsCompromiso: f.checkpointsCompromiso
    };

    const nuevoCicloNum = f.cicloActual + 1;
    const nuevoFaro = this.crearFaroAhorroTiempo(f.frecuenciaCobro, nuevoCicloNum);
    nuevoFaro.historialCiclos = [...(f.historialCiclos || []), cicloCompletado];
    return nuevoFaro;
  }

  /**
   * Crea un Faro por Monto para una meta material específica (Modalidad 2).
   */
  static crearFaroMonto(nombre, montoMeta, moneda = '$') {
    return {
      id: `faro_monto_${Date.now()}`,
      tipoModalidad: 'monto',
      nombre,
      montoMeta: Number(montoMeta),
      montoAcumulado: 0,
      moneda,
      aportesHistorial: [],
      porcentajeCompletado: 0,
      completado: false
    };
  }

  /**
   * Registra un aporte económico a un Faro por Monto.
   */
  static aportarFaroMonto(faro, montoAporte, nota = '') {
    const f = { ...faro };
    const aporte = Math.max(0, Number(montoAporte));
    f.montoAcumulado += aporte;
    f.aportesHistorial = f.aportesHistorial || [];
    f.aportesHistorial.push({
      fecha: new Date().toISOString().split('T')[0],
      monto: aporte,
      nota
    });

    f.porcentajeCompletado = Math.min(100, (f.montoAcumulado / f.montoMeta) * 100);
    if (f.montoAcumulado >= f.montoMeta) {
      f.completado = true;
    }

    return f;
  }

  /**
   * Registra un checkpoint honesto en el Faro de Ahorro por Tiempo.
   * Estados: 'logrado', 'compromiso' (no esta vez), 'sin_ingreso'.
   */
  static registrarCheckpointTiempo(faro, estadoReporte) {
    const f = { ...faro };
    f.checkpointsRegistrados += 1;

    if (estadoReporte === 'logrado') {
      f.checkpointsLogrados += 1;
    } else if (estadoReporte === 'sin_ingreso') {
      f.checkpointsSinIngreso += 1;
    } else if (estadoReporte === 'compromiso') {
      f.checkpointsCompromiso += 1;
    }

    const total = f.checkpointsTotales || this.obtenerCheckpointsTotales(f.frecuenciaCobro);
    f.porcentajeCompletado = Math.min(100, Math.round((f.checkpointsRegistrados / total) * 100));

    if (f.checkpointsRegistrados >= total) {
      f.completado = true;
    }

    return f;
  }
}
