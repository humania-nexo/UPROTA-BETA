/**
 * Motor de Faros (Documento A - Sección 4.1 y 4.2)
 * Desacoplado de los pilares: Metas a mediano/largo plazo y cultura de ahorro real.
 * Modalidad 1: Faro por Tiempo (Ahorro regular de 6 meses, 5% ingreso fijo).
 * Modalidad 2: Faro por Monto (Proyectos materiales específicos con barra de progreso %).
 */

export class FarosEngine {
  /**
   * Inicializa el Faro de Ahorro regular obligatorio de 6 meses (Modalidad 1).
   */
  static crearFaroAhorroTiempo(frecuenciaCobro = 'quincenal') {
    return {
      id: 'faro_ahorro_tiempo_c1',
      tipoModalidad: 'tiempo',
      nombre: 'Faro de Ahorro: 6 Meses de Constancia',
      porcentajeAhorro: 5, // 5% fijo en ciclo 1
      cicloActual: 1,
      frecuenciaCobro, // 'semanal', 'quincenal', 'mensual'
      fechaInicio: new Date().toISOString().split('T')[0],
      checkpointsRegistrados: 0,
      checkpointsLogrados: 0,
      checkpointsSinIngreso: 0,
      checkpointsCompromiso: 0,
      completado: false
    };
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

    return f;
  }
}
