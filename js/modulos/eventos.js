/**
 * Módulo de Eventos y Decisiones Morales del Yermo
 * Dispara pop-up de eventos y guarda el resultado en la Bitácora de Crónicas.
 */

import { EVENTOS_YERMO } from '../data/eventos.js';
import { estadoApp } from '../core/estado.js';

export class EventosModulo {
  constructor() {
    this.eventoActual = null;
  }

  evaluarEventoSemanal(estado) {
    const candidatos = EVENTOS_YERMO.filter(e => e.condicion(estado));
    if (candidatos.length === 0) return null;

    const seleccionado = candidatos[Math.floor(Math.random() * candidatos.length)];
    this.mostrarModalEvento(seleccionado);
  }

  mostrarModalEvento(evento) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--accent-amber-light); font-weight: 700; margin-bottom: 4px;">
        📡 Suceso en el Yermo
      </div>
      <h2 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
        ${evento.icono} ${evento.nombre}
      </h2>
      <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">
        ${evento.descripcion}
      </p>

      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${evento.opciones.map((opc, index) => {
          return `
            <button class="btn-secondary btn-opcion-evento" data-idx="${index}" style="text-align: left; padding: 12px 14px;">
              <strong style="color: var(--text-primary); display: block; margin-bottom: 2px;">${opc.texto}</strong>
            </button>
          `;
        }).join('')}
      </div>
    `;

    modalContent.querySelectorAll('.btn-opcion-evento').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        const opcionElegida = evento.opciones[idx];
        await this.resolverOpcion(evento, opcionElegida);
        modalContainer.classList.add('hidden');
      });
    });

    modalContainer.classList.remove('hidden');
  }

  async resolverOpcion(evento, opcion) {
    // Aplicar costos
    if (opcion.costo) {
      for (const [rec, cant] of Object.entries(opcion.costo)) {
        await estadoApp.aplicarCambioRecursos({ [rec]: -cant });
      }
    }

    // Aplicar recompensas
    if (opcion.recompensa) {
      for (const [rec, cant] of Object.entries(opcion.recompensa)) {
        await estadoApp.aplicarCambioRecursos({ [rec]: cant });
      }
    }

    // Guardar en la Bitácora de Crónicas para consulta perpetua
    await estadoApp.registrarEventoEnBitacora({
      eventoId: evento.id,
      titulo: evento.nombre,
      decision: opcion.texto,
      resultado: opcion.resultado
    });

    const banner = document.getElementById('banner-notificacion');
    if (banner) {
      banner.innerHTML = `📜 <strong>${evento.nombre}:</strong> ${opcion.resultado}`;
      banner.classList.remove('hidden');
      setTimeout(() => banner.classList.add('hidden'), 5000);
    }
  }
}
