/**
 * Motor de Cronología Maestra de NPCs y Arcos Narrativos (Escala Anual: Días 1 a 365+)
 * Basado en: docs/diseno/UPROTA_Cronologia_Arcos_NPCs.md
 * Filosofía: El tiempo real como forjador de hábitos. Cero speedrun, acompañamiento diario.
 */
export class CronologiaEngine {
  static evaluarProgreso(estado) {
    const dia = estado.perfil.diaSupervivencia || 1;
    const nivelRefugio = estado.nivelRefugio || 0;
    const eventosActivados = [];

    // ==========================================
    // ESTACIÓN 1: EL DESPERTAR (Meses 1 a 3 • Días 1 a 90)
    // ==========================================

    // 1. DÍA 3: Don Chui (Tomo I)
    if (dia >= 3 && !estado.donChuiConocido) {
      estado.donChuiConocido = true;
      if (!estado.manualesDonChui.includes('tomo_1')) estado.manualesDonChui.push('tomo_1');
      if (!estado.objetosSabiduriaInventario.includes('obj_manual_supervivencia_1')) {
        estado.objetosSabiduriaInventario.push('obj_manual_supervivencia_1');
      }
      eventosActivados.push({
        id: 'evento_don_chui_tomo1',
        titulo: 'El Legado de Don Chui',
        npc: 'Don Chui',
        icono: 'assets/sprites/npcs/don_chui_hablando.png',
        desc: 'Don Chui te ha visitado con su cojera y su delantal de lona. Te entrega el Tomo I de Supervivencia (Fuego y filtro PET).'
      });
    }

    // 2. DÍA 7: Evento Semanal "El Rincón Royido" & Inicio del Faro Semestral de Ahorro
    if (dia >= 7 && !estado.eventosCumplidos?.includes('rincon_royido')) {
      if (!estado.eventosCumplidos) estado.eventosCumplidos = [];
      estado.eventosCumplidos.push('rincon_royido');
      eventosActivados.push({
        id: 'rincon_royido',
        titulo: 'El Rincón Royido',
        npc: 'Don Chui',
        icono: 'assets/sprites/npcs/don_chui_neutral.png',
        desc: 'Roedores atacaron tus provisiones. Construye la Alacena Colgante e inicia tu Primer Faro Semestral de Ahorro.'
      });
    }

    // 3. DÍA 30 (Mes 1 cumplido): Don Chui entrega Tomo II
    if (dia >= 30 && !estado.manualesDonChui.includes('tomo_2')) {
      estado.manualesDonChui.push('tomo_2');
      if (!estado.objetosSabiduriaInventario.includes('obj_manual_supervivencia_2')) {
        estado.objetosSabiduriaInventario.push('obj_manual_supervivencia_2');
      }
      eventosActivados.push({
        id: 'evento_don_chui_tomo2',
        titulo: 'Consolidación del Yermo: Tomo II',
        npc: 'Don Chui',
        icono: 'assets/sprites/npcs/don_chui_hablando.png',
        desc: 'Don Chui comprueba tu constancia tras 1 mes y te entrega el Tomo II (Trampas de alambre, velas de sebo y carne seca).'
      });
    }

    // 4. DÍA 45 (Mes 2): Doña Concha y el Herbario del Valle
    if (dia >= 45 && !estado.npcsConocidos?.includes('dona_concha')) {
      if (!estado.npcsConocidos) estado.npcsConocidos = [];
      estado.npcsConocidos.push('dona_concha');
      if (!estado.objetosSabiduriaInventario.includes('obj_herbario_concha')) {
        estado.objetosSabiduriaInventario.push('obj_herbario_concha');
      }
      estado.bonificaciones = estado.bonificaciones || {};
      estado.bonificaciones.reduccionInfeccionLluvia = 0.25;
      eventosActivados.push({
        id: 'evento_dona_concha_visita',
        titulo: 'El Saber de Doña Concha',
        npc: 'Doña Concha',
        icono: 'assets/sprites/npcs/npc_dona_concha_idle.png',
        desc: 'Doña Concha te enseña botánica del yermo y te entrega el Herbario del Valle (-25% riesgo de infección).'
      });
    }

    // 5. DÍAS 60-70 (Mes 2): Valeria (La Costurera) y Misión Singer
    if (dia >= 60 && !estado.npcsConocidos?.includes('valeria_costurera')) {
      if (!estado.npcsConocidos) estado.npcsConocidos = [];
      estado.npcsConocidos.push('valeria_costurera');
      if (estado.bolsa.capacidadKg < 12.0) {
        estado.bolsa.tipo = 'Bolso reforzado (Costura Singer de Valeria)';
        estado.bolsa.capacidadKg = 12.0;
        estado.bolsa.espaciosMax = 10;
      }
      eventosActivados.push({
        id: 'evento_valeria_singer',
        titulo: 'La Aguja del Yermo: Valeria',
        npc: 'Valeria',
        icono: 'assets/sprites/npcs/npc_valeria_costurera_idle.png',
        desc: 'Valeria repara tu carga con su máquina Singer. Tu capacidad sube a 12 kg y 10 ranuras con el Bolso Reforzado.'
      });
    }

    // ==========================================
    // ESTACIÓN 2: LA PRUEBA DEL INVIERNO (Meses 4 a 6 • Días 91 a 180)
    // ==========================================

    // 6. DÍA 120 (Mes 4): Mochila Costal con Correas de Auto (18 kg)
    if (dia >= 120 && estado.bolsa.capacidadKg < 18.0) {
      estado.bolsa.tipo = 'Mochila costal con correas de auto';
      estado.bolsa.capacidadKg = 18.0;
      estado.bolsa.espaciosMax = 14;
      eventosActivados.push({
        id: 'evento_mochila_costal',
        titulo: 'Carga Media: Mochila Costal',
        npc: 'Taller del Refugio',
        icono: 'assets/sprites/items/caja_expedicion.png',
        desc: 'Confeccionas una mochila costal resistente con correas de auto. Capacidad aumentada a 18 kg (Radio: 8 km).'
      });
    }

    // 7. DÍAS 130-140 (Mes 5): Don Chui entrega Tomo III
    if (dia >= 130 && !estado.manualesDonChui.includes('tomo_3')) {
      estado.manualesDonChui.push('tomo_3');
      eventosActivados.push({
        id: 'evento_don_chui_tomo3',
        titulo: 'Maestría del Yermo: Tomo III',
        npc: 'Don Chui',
        icono: 'assets/sprites/npcs/don_chui_hablando.png',
        desc: 'Don Chui te entrega el Tomo III: Horno cob de alta masa térmica, descarte first-flush y lejía desinfectante.'
      });
    }

    // 8. DÍA 150 (Mes 5): El Lutier Anciano y el dilema de la madera curada
    if (dia >= 150 && !estado.npcsConocidos?.includes('lutier_anciano')) {
      if (!estado.npcsConocidos) estado.npcsConocidos = [];
      estado.npcsConocidos.push('lutier_anciano');
      eventosActivados.push({
        id: 'evento_lutier_visita',
        titulo: 'La Melodía Perdida: El Lutier',
        npc: 'El Lutier Anciano',
        icono: 'assets/sprites/npcs/npc_lutier_anciano_idle.png',
        desc: 'El Lutier busca madera curada para devolver la música al Yermo. Elige tu postura moral ante su pedido.'
      });
    }

    // 9. DÍA 180 (Mes 6 — Gran Hito del Semestre): La Biblia de Don Chui y Radio Onda Corta (104.5 MHz)
    if (dia >= 180 && !estado.objetosSabiduriaInventario.includes('obj_biblia_chui')) {
      estado.objetosSabiduriaInventario.push('obj_biblia_chui');
      if (estado.objetosSabiduriaActivos.length < 3 && !estado.objetosSabiduriaActivos.includes('obj_biblia_chui')) {
        estado.objetosSabiduriaActivos.push('obj_biblia_chui');
      }
      if (estado.comunicacion.fase < 1) estado.comunicacion.fase = 1;
      eventosActivados.push({
        id: 'evento_don_chui_biblia',
        titulo: '6 Meses de Constancia: La Biblia de Don Chui',
        npc: 'Don Chui',
        icono: 'assets/sprites/npcs/don_chui_hablando.png',
        desc: 'Don Chui premia tu medio año de disciplina entregándote su Biblia (+1 Espíritu). Se sintoniza la Radio 104.5 MHz.'
      });
    }

    // ==========================================
    // ESTACIÓN 3: LAS DOS RUEDAS Y EL RISCO (Meses 7 a 9 • Días 181 a 270)
    // ==========================================

    // 10. DÍA 240 (Mes 8 — EL GRAN SALTO MECÁNICO): Bicicleta de Acero Cromoly Restaurada (35 kg, Radio 20 km)
    if (dia >= 240 && estado.bolsa.capacidadKg < 35.0) {
      estado.bolsa.tipo = 'Bicicleta de Acero Cromoly Restaurada';
      estado.bolsa.capacidadKg = 35.0;
      estado.bolsa.espaciosMax = 18;
      eventosActivados.push({
        id: 'evento_bici_cromoly',
        titulo: '🚲 El Gran Salto: La Bicicleta de Expedición',
        npc: 'Don Chui & Valeria',
        icono: 'assets/sprites/items/caja_expedicion.png',
        desc: 'Tras 8 meses de constancia física y de taller, completas la Bicicleta de Acero. Velocidad x2.0 y radio de 20 km.'
      });
    }

    // 11. DÍA 250-260 (Mes 9): Katia (La Mensajera) y Mapas de Montaña
    if (dia >= 250 && !estado.npcsConocidos?.includes('katia_mensajera')) {
      if (!estado.npcsConocidos) estado.npcsConocidos = [];
      estado.npcsConocidos.push('katia_mensajera');
      estado.bonificaciones = estado.bonificaciones || {};
      estado.bonificaciones.recuperacionFisicaPilarCuerpo = 0.15;
      eventosActivados.push({
        id: 'evento_katia_mensajera',
        titulo: 'La Mensajera del Risco: Katia',
        npc: 'Katia',
        icono: 'assets/sprites/npcs/npc_katia_mensajera_idle.png',
        desc: 'Katia admira tu tracción sobre ruedas y te entrega mapas de montaña (+15% recuperación en Pilar Cuerpo).'
      });
    }

    // ==========================================
    // ESTACIÓN 4: SIMBIOSIS Y CARGA PESADA (Meses 10 a 12 • Días 271 a 365+)
    // ==========================================

    // 12. DÍA 290 (Mes 10): Elena (Radio) y "El Arte de la Guerra" de Sun Tzu
    if (dia >= 290 && !estado.objetosSabiduriaInventario.includes('obj_arte_guerra_elena')) {
      estado.objetosSabiduriaInventario.push('obj_arte_guerra_elena');
      if (estado.comunicacion.fase < 2) estado.comunicacion.fase = 2;
      eventosActivados.push({
        id: 'evento_elena_arte_guerra',
        titulo: 'La Estrategia del Risco: Elena',
        npc: 'Elena (Sierra-Uno)',
        icono: 'assets/sprites/npcs/npc_elena_radio_idle.png',
        desc: 'Elena comparte "El Arte de la Guerra" de Sun Tzu (+1 Mente). Se habilita la red comunitaria WAN.'
      });
    }

    // 13. DÍA 310 (Mes 11): El Tuerto y el Cuaderno de Isla Clarión
    if (dia >= 310 && !estado.npcsConocidos?.includes('el_tuerto')) {
      if (!estado.npcsConocidos) estado.npcsConocidos = [];
      estado.npcsConocidos.push('el_tuerto');
      eventosActivados.push({
        id: 'evento_el_tuerto_isla',
        titulo: 'El Registro de Isla Clarión: El Tuerto',
        npc: 'El Tuerto',
        icono: 'assets/sprites/npcs/npc_el_tuerto_idle.png',
        desc: 'El Tuerto revela los informes botánicos de Elias Voss y la verdadera naturaleza del Proyecto Edén.'
      });
    }

    // 14. DÍA 330 (Mes 11): Forja del Carrito Trailer / Remolque de Carga Pesada (85 kg)
    if (dia >= 330 && estado.bolsa.capacidadKg < 85.0) {
      estado.bolsa.tipo = 'Bicicleta con Carrito Trailer de Carga Pesada';
      estado.bolsa.capacidadKg = 85.0;
      estado.bolsa.espaciosMax = 28;
      eventosActivados.push({
        id: 'evento_carrito_trailer',
        titulo: '🚛 Convoy Pesado: Carrito Trailer Remolque',
        npc: 'Taller del Refugio',
        icono: 'assets/sprites/items/caja_expedicion.png',
        desc: 'Forjas el Carrito Trailer de 2 ruedas acoplado al eje trasero. Capacidad máxima: 85 kg (Radio: 35 km).'
      });
    }

    // 15. DÍA 365 (Fin del Año 1 — EVENTO CUMBRE): "El Vivero Silenciado" y Rescate del Bebé Fitolantro
    if (dia >= 365 && !estado.eventosCumplidos?.includes('vivero_silenciado')) {
      if (!estado.eventosCumplidos) estado.eventosCumplidos = [];
      estado.eventosCumplidos.push('vivero_silenciado');
      eventosActivados.push({
        id: 'vivero_silenciado',
        titulo: 'Fin del Año 1: El Vivero Silenciado',
        npc: 'Simbiosis Ecológica',
        icono: 'assets/sprites/npcs/npc_bebe_fitolantro.png',
        desc: '1 año de constancia culmina en el rescate del Bebé Fitolantro de 40 cm. Comienza el Año 2 hacia la Simbiosis.'
      });
    }

    return eventosActivados;
  }
}
