/**
 * Motor de Cronologia Maestra de NPCs y Arcos Narrativos (Dias 1 a 90+)
 * Basado en: docs/diseno/UPROTA_Cronologia_Arcos_NPCs.md
 */
export class CronologiaEngine {
  static evaluarProgreso(estado) {
    const dia = estado.perfil.diaSupervivencia || 1;
    const nivelRefugio = estado.nivelRefugio || 0;
    const eventosActivados = [];

    // 1. DIA 3: Don Chui (Tomo I)
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
        desc: 'Don Chui te ha visitado con su cojera y su delantal de lona. Te entrega el Tomo I de Supervivencia.'
      });
    }

    // 2. DIA 7: Evento Semanal El Rincon Royido
    if (dia >= 7 && !estado.eventosCumplidos?.includes('rincon_royido')) {
      if (!estado.eventosCumplidos) estado.eventosCumplidos = [];
      estado.eventosCumplidos.push('rincon_royido');
      eventosActivados.push({
        id: 'rincon_royido',
        titulo: 'El Rincon Royido',
        npc: 'Don Chui',
        icono: 'assets/sprites/npcs/don_chui_neutral.png',
        desc: 'Unos roedores han atacado tus reservas. Construye la Alacena Hermetica Colgante.'
      });
    }

    // 3. DIAS 18 a 20: Don Chui entrega Tomo II
    if (dia >= 18 && !estado.manualesDonChui.includes('tomo_2')) {
      estado.manualesDonChui.push('tomo_2');
      if (!estado.objetosSabiduriaInventario.includes('obj_manual_supervivencia_2')) {
        estado.objetosSabiduriaInventario.push('obj_manual_supervivencia_2');
      }
      eventosActivados.push({
        id: 'evento_don_chui_tomo2',
        titulo: 'Consolidacion del Yermo',
        npc: 'Don Chui',
        icono: 'assets/sprites/npcs/don_chui_hablando.png',
        desc: 'Don Chui te entrega el Tomo II: Trampas de vereda y velas de sebo.'
      });
    }

    // 4. DIAS 20+: Dona Concha (Nivel 2)
    if (dia >= 20 && nivelRefugio >= 2 && !estado.npcsConocidos?.includes('dona_concha')) {
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
        desc: 'Doña Concha te enseña a clasificar hierbas y te entrega el Herbario del Valle (-25% riesgo de infección).'
      });
    }

    // 5. DIAS 22 a 25: Valeria (Costurera) y Mision Singer
    if (dia >= 22 && nivelRefugio >= 2 && !estado.npcsConocidos?.includes('valeria_costurera')) {
      if (!estado.npcsConocidos) estado.npcsConocidos = [];
      estado.npcsConocidos.push('valeria_costurera');
      if (estado.bolsa.capacidadKg < 12.0) {
        estado.bolsa.tipo = 'Bolso reforzado (Costura de Valeria)';
        estado.bolsa.capacidadKg = 12.0;
        estado.bolsa.espaciosMax = 10;
      }
      eventosActivados.push({
        id: 'evento_valeria_singer',
        titulo: 'La Aguja del Yermo: Valeria',
        npc: 'Valeria',
        icono: 'assets/sprites/npcs/npc_valeria_costurera_idle.png',
        desc: 'Valeria repara tu carga. Tu capacidad sube a 12 kg y 10 ranuras con el Bolso Reforzado.'
      });
    }

    // 6. DIAS 28 a 32: El Lutier Anciano (Nivel 3)
    if (dia >= 28 && nivelRefugio >= 3 && !estado.npcsConocidos?.includes('lutier_anciano')) {
      if (!estado.npcsConocidos) estado.npcsConocidos = [];
      estado.npcsConocidos.push('lutier_anciano');
      eventosActivados.push({
        id: 'evento_lutier_visita',
        titulo: 'La Melodía Perdida: El Lutier',
        npc: 'El Lutier',
        icono: 'assets/sprites/npcs/npc_lutier_anciano_idle.png',
        desc: 'El Lutier busca madera curada para su orquesta. La música puede traer gran moral al refugio.'
      });
    }

    // 7. DIAS 35 a 40: Katia (La Mensajera)
    if (dia >= 35 && !estado.npcsConocidos?.includes('katia_mensajera')) {
      if (!estado.npcsConocidos) estado.npcsConocidos = [];
      estado.npcsConocidos.push('katia_mensajera');
      estado.bonificaciones = estado.bonificaciones || {};
      estado.bonificaciones.recuperacionFisicaPilarCuerpo = 0.10;
      eventosActivados.push({
        id: 'evento_katia_mensajera',
        titulo: 'La Senda Rápida: Katia',
        npc: 'Katia',
        icono: 'assets/sprites/npcs/npc_katia_mensajera_idle.png',
        desc: 'Katia evalúa tu condición. Si mantienes el Pilar Cuerpo activo, tu recuperación mejora un +10%.'
      });
    }

    // 8. DIAS 40 a 45: Don Chui entrega Tomo III
    if (dia >= 40 && !estado.manualesDonChui.includes('tomo_3')) {
      estado.manualesDonChui.push('tomo_3');
      eventosActivados.push({
        id: 'evento_don_chui_tomo3',
        titulo: 'Maestría del Yermo: Tomo III',
        npc: 'Don Chui',
        icono: 'assets/sprites/npcs/don_chui_hablando.png',
        desc: 'Don Chui te entrega el Tomo III: Horno cob de alta masa térmica y lejía desinfectante.'
      });
    }

    // 9. DIA 60: La Biblia de Don Chui y Radio Onda Corta (Fase 1)
    if (dia >= 60 && !estado.objetosSabiduriaInventario.includes('obj_biblia_chui')) {
      estado.objetosSabiduriaInventario.push('obj_biblia_chui');
      if (estado.objetosSabiduriaActivos.length < 3 && !estado.objetosSabiduriaActivos.includes('obj_biblia_chui')) {
        estado.objetosSabiduriaActivos.push('obj_biblia_chui');
      }
      if (estado.comunicacion.fase < 1) estado.comunicacion.fase = 1;
      eventosActivados.push({
        id: 'evento_don_chui_biblia',
        titulo: 'El Legado de Don Chui',
        npc: 'Don Chui',
        icono: 'assets/sprites/npcs/don_chui_hablando.png',
        desc: 'Don Chui te entrega su Biblia (+1 Espíritu). Se habilita la Radio de Onda Corta en 104.5 MHz.'
      });
    }

    // 10. DIAS 65+: Elena (Radio) y Arte de la Guerra (Fase 2 / Nivel 5)
    if (dia >= 65 && nivelRefugio >= 5 && !estado.objetosSabiduriaInventario.includes('obj_arte_guerra_elena')) {
      estado.objetosSabiduriaInventario.push('obj_arte_guerra_elena');
      if (estado.comunicacion.fase < 2) estado.comunicacion.fase = 2;
      eventosActivados.push({
        id: 'evento_elena_arte_guerra',
        titulo: 'La Estrategia del Risco: Elena',
        npc: 'Elena (Sierra-Uno)',
        icono: 'assets/sprites/npcs/npc_elena_radio_idle.png',
        desc: 'Elena comparte "El Arte de la Guerra" de Sun Tzu (+1 Mente). Se habilita la red WAN local.'
      });
    }

    // 11. DIA 90+: Evento Cumbre El Vivero Silenciado
    if (dia >= 90 && nivelRefugio >= 6 && !estado.eventosCumplidos?.includes('vivero_silenciado')) {
      if (!estado.eventosCumplidos) estado.eventosCumplidos = [];
      estado.eventosCumplidos.push('vivero_silenciado');
      eventosActivados.push({
        id: 'vivero_silenciado',
        titulo: 'El Vivero Silenciado: Bebé Fitolantro',
        npc: 'Misterio Ecológico',
        icono: 'assets/sprites/npcs/npc_bebe_fitolantro.png',
        desc: 'Encuentras un campamento quemado y un Bebé Fitolantro de 40 cm llorando entre las raíces. Comienza la Simbiosis.'
      });
    }

    return eventosActivados;
  }
}
