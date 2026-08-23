/**
 * Motor de Misiones y Exploración (Documento B - Secciones 3, 4, 5)
 * Regla de oro: 1 misión por día real.
 * Sistema de bolsa con peso real y auto-recolección por valor de trueque.
 */

import { ITEMS_BOTIN, CAT_BOTIN } from '../data/items_botin.js';

export class MisionesEngine {
  /**
   * Ejecuta una misión de exploración (Tipo A con riesgo) o recolección (Tipo B segura).
   */
  static ejecutarMision(tipo, destino, capacidadBolsaKg, esDorado = false) {
    if (tipo === 'tipo_b_madera') {
      return {
        exito: true,
        tipo: 'tipo_b',
        nombreDestino: 'Bosquecito tras el cerro',
        recursosGanados: { tablas: 3, leñaKg: 4 },
        itemsRecogidos: [{ id: 'item_008', nombre: 'Tabla de pino suelta', pesoKg: 1.2, cantidad: 3 }],
        itemsDejadosPorPeso: [],
        mensaje: '🌳 Regresaste con 3 tablas firmes y leña seca para el fogón.'
      };
    }

    if (tipo === 'tipo_b_agua') {
      return {
        exito: true,
        tipo: 'tipo_b',
        nombreDestino: 'Riachuelo cercano',
        recursosGanados: { aguaLitros: 10 },
        itemsRecogidos: [],
        itemsDejadosPorPeso: [],
        mensaje: '💧 Llenaste contenedores con 10L de agua de río (recuerda filtrarla y hervirla).'
      };
    }

    // Tipo A: Exploración de ruinas (azar realista)
    const lootCandidatos = this.generarLootAleatorio(esDorado);
    const { recogidos, dejados, pesoFinalKg } = this.filtrarPorCapacidadBolsa(lootCandidatos, capacidadBolsaKg);

    return {
      exito: true,
      tipo: 'tipo_a',
      nombreDestino: destino || 'Casas del sector norte',
      itemsRecogidos: recogidos,
      itemsDejadosPorPeso: dejados,
      pesoTotalCargadoKg: pesoFinalKg,
      mensaje: `🏚️ Exploraste ${destino || 'la zona norte'}. Traes ${recogidos.length} objetos valiosos.`
    };
  }

  static generarLootAleatorio(esDorado = false) {
    const cantidadItems = Math.floor(Math.random() * 3) + 2; // 2 a 4 ítems
    const loot = [];

    for (let i = 0; i < cantidadItems; i++) {
      const roll = Math.random() * 100;
      let categoriaElegida = CAT_BOTIN.COMUN;

      if (esDorado) {
        // Torta Dorada: +25% de loot muy raro
        if (roll < 30) categoriaElegida = CAT_BOTIN.MUY_RARO;
        else if (roll < 55) categoriaElegida = CAT_BOTIN.RARO;
        else if (roll < 80) categoriaElegida = CAT_BOTIN.POCO_COMUN;
      } else {
        if (roll < 5) categoriaElegida = CAT_BOTIN.MUY_RARO;
        else if (roll < 15) categoriaElegida = CAT_BOTIN.RARO;
        else if (roll < 40) categoriaElegida = CAT_BOTIN.POCO_COMUN;
      }

      const opciones = ITEMS_BOTIN.filter(item => item.categoria === categoriaElegida);
      const seleccionado = opciones[Math.floor(Math.random() * opciones.length)];
      if (seleccionado) {
        loot.push({ ...seleccionado, cantidad: 1 });
      }
    }

    return loot;
  }

  /**
   * Auto-recolección inteligente: Prioriza mayor valor de trueque por menor peso.
   */
  static filtrarPorCapacidadBolsa(itemsCandidatos, capacidadBolsaKg) {
    // Ordenar de mayor a menor valor de trueque
    const ordenados = [...itemsCandidatos].sort((a, b) => b.valorTrueque - a.valorTrueque);

    const recogidos = [];
    const dejados = [];
    let pesoAcumulado = 0;

    for (const item of ordenados) {
      if (pesoAcumulado + item.pesoKg <= capacidadBolsaKg) {
        recogidos.push(item);
        pesoAcumulado += item.pesoKg;
      } else {
        dejados.push(item);
      }
    }

    return {
      recogidos,
      dejados,
      pesoFinalKg: Number(pesoAcumulado.toFixed(2))
    };
  }
}
