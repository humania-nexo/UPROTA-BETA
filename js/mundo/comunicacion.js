/**
 * Motor del Sistema de Comunicación (Documento Sistema de Comunicación)
 * Fases: 0 (Silencio / Visitas presenciales), 1 (Radio onda corta con audio grabado), 2 (WAN local).
 */

export class ComunicacionEngine {
  static getInfoFase(faseNumero) {
    const fases = {
      0: {
        fase: 0,
        nombre: 'Fase 0 — Silencio Inicial',
        icono: '🏕️',
        tipoFlujo: 'Presencial / Cara a cara',
        desc: 'Sin aparatos de radio ni red. Tu único contacto son los caminantes como Don Chui que llegan a pie a tu refugio.'
      },
      1: {
        fase: 1,
        nombre: 'Fase 1 — Radio de Onda Corta',
        icono: '📻',
        tipoFlujo: 'Unidireccional (Solo Audio)',
        desc: 'Un solo canal. Recibes boletines, historias y conocimiento grabado de supervivencia.'
      },
      2: {
        fase: 2,
        nombre: 'Fase 2 — WAN Local',
        icono: '💻',
        tipoFlujo: 'Unidireccional (Audio + Visual)',
        desc: 'Red inalámbrica local. Requiere bioenergía, batería y router. Permite recibir planos y diagramas técnicos.'
      }
    };

    return fases[faseNumero] || fases[0];
  }
}
