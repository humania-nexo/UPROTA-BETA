/**
 * Motor de Misiones y Exploración Asíncrona (Resolución al día siguiente)
 * 1 misión despachada por día real. El Prota regresa al amanecer con el informe.
 */

import { ITEMS_BOTIN, CAT_BOTIN } from '../data/items_botin.js';

export class MisionesEngine {
  /**
   * Resuelve una misión enviada el día anterior y produce el informe de bitácora.
   */
  static resolverMision(misionEnCurso, capacidadBolsaKg = 8.0, esDorado = false) {
    const { tipo, destino } = misionEnCurso;

    if (tipo === 'tipo_b_madera') {
      return {
        tipo: 'tipo_b',
        nombreDestino: 'Bosquecito tras el cerro',
        recursosGanados: { tablas: 3, clavos: 2 },
        itemsRecogidos: [
          { id: 'item_008', nombre: 'Tabla de pino suelta', pesoKg: 1.2, cantidad: 3, valorTrueque: 3 }
        ],
        itemsDejadosPorPeso: [],
        pesoTotalKg: 3.6,
        estadoSalud: 'Ileso',
        logNarrativo: [
          'Saliste antes del mediodía bordeando la quebrada seca.',
          'Encontraste una tarima de palet rota y lograste desclavar 3 tablas útiles.',
          'Regresaste al anochecer con madera firme para las obras del refugio.'
        ]
      };
    }

    if (tipo === 'tipo_b_agua') {
      return {
        tipo: 'tipo_b',
        nombreDestino: 'Riachuelo cercano',
        recursosGanados: { aguaLitros: 8 },
        itemsRecogidos: [],
        itemsDejadosPorPeso: [],
        pesoTotalKg: 8.0,
        estadoSalud: 'Ileso',
        logNarrativo: [
          'Caminaste hacia el cauce bajo del arroyo con tus contenedores.',
          'El agua corría turbia pero constante. Llenaste 8 litros.',
          'Recuerda: Don Chui enseña que debes filtrar y hervir 5 min antes de beber.'
        ]
      };
    }

    // Tipo A: Exploración de ruinas con riesgo y azar
    const heridaRoll = Math.random() * 100;
    const herido = heridaRoll < 20; // 20% probabilidad de raspadura
    const estadoSalud = herido ? 'Raspadura en el brazo (-1 Moral)' : 'Ileso y alerta';

    const lootCandidatos = this.generarLootAleatorio(esDorado);
    const { recogidos, dejados, pesoFinalKg } = this.filtrarPorCapacidadBolsa(lootCandidatos, capacidadBolsaKg);

    const logNarrativo = [
      `Te internaste en las ruinas de ${destino || 'la zona urbana abandonada'}.`,
      herido 
        ? '⚠️ Una viga rota cedió al pasar y te raspaste el brazo, pero lograste asegurar la mochila.'
        : 'Avanzaste con cautela entre los escombros sin alertar a nadie.',
      `Revisaste armarios y alacenas. Hallaste ${lootCandidatos.length} objetos de valor.`,
      dejados.length > 0
        ? `⚠️ Tu bolsa ecológica llegó al límite (${pesoFinalKg.toFixed(1)}/${capacidadBolsaKg} kg). Tuviste que dejar atrás ${dejados.map(d => d.nombre).join(', ')} por exceso de peso.`
        : `Empacaste todo lo encontrado sin sobrepasar los ${capacidadBolsaKg} kg de tu bolsa.`
    ];

    return {
      tipo: 'tipo_a',
      nombreDestino: destino || 'Casas del sector norte',
      itemsRecogidos: recogidos,
      itemsDejadosPorPeso: dejados,
      pesoTotalKg: pesoFinalKg,
      estadoSalud,
      herido,
      recursosGanados: { clavos: Math.floor(Math.random() * 4) + 1 },
      logNarrativo
    };
  }

  static generarLootAleatorio(esDorado = false) {
    const cantidadItems = Math.floor(Math.random() * 3) + 2; // 2 a 4 ítems
    const loot = [];

    for (let i = 0; i < cantidadItems; i++) {
      const roll = Math.random() * 100;
      let categoriaElegida = CAT_BOTIN.COMUN;

      if (esDorado) {
        if (roll < 30) categoriaElegida = CAT_BOTIN.MUY_RARO;
        else if (roll < 55) categoriaElegida = CAT_BOTIN.RARO;
        else if (roll < 80) categoriaElegida = CAT_BOTIN.POCO_COMUN;
      } else {
        if (roll < 5) categoriaElegida = CAT_BOTIN.MUY_RARO;
        else if (roll < 18) categoriaElegida = CAT_BOTIN.RARO;
        else if (roll < 45) categoriaElegida = CAT_BOTIN.POCO_COMUN;
      }

      const opciones = ITEMS_BOTIN.filter(item => item.categoria === categoriaElegida);
      const seleccionado = opciones[Math.floor(Math.random() * opciones.length)];
      if (seleccionado) {
        loot.push({ ...seleccionado, cantidad: 1 });
      }
    }

    return loot;
  }

  static filtrarPorCapacidadBolsa(itemsCandidatos, capacidadBolsaKg) {
    // Ordenar de mayor a menor valor de trueque
    const ordenados = [...itemsCandidatos].sort((a, b) => (b.valorTrueque || 1) - (a.valorTrueque || 1));

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
