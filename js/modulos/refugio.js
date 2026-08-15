/**
 * Módulo de UI: Refugio y Cimientos Vivos
 * Muestra el estado evolutivo del asentamiento y construcciones disponibles.
 */

import { GameEngine } from '../core/engine.js';
import { PROGRAMAS_RADIO } from '../data/radio_programas.js';

export class RefugioModulo {
  constructor(contenedor) {
    this.contenedor = contenedor;
  }

  render(estado) {
    const infoNivel = GameEngine.calcularNivelRefugio(estado.recursos, estado.cimientos);
    const conocimientos = estado.conocimientosAdquiridos || [];

    this.contenedor.innerHTML = `
      <div class="refugio-view-header">
        <div class="refugio-hero-card">
          <div class="refugio-stage-badge">Nivel ${infoNivel.nivel} &bull; ${infoNivel.nombre}</div>
          <div class="refugio-titulo-grande">
            <span>${infoNivel.icono}</span>
            <span>Refugio de ${estado.perfil.nombre}</span>
          </div>
          <p class="refugio-narrativa-texto">${infoNivel.descripcion}</p>
          <div class="refugio-clima-box">
            <strong>Estado del Yermo:</strong> ${infoNivel.clima}
          </div>
        </div>
      </div>

      <!-- SECCIÓN: CONOCIMIENTOS APLICADOS -->
      <section class="construcciones-seccion">
        <div class="seccion-header">
          <span class="seccion-titulo">🛠️ Cimientos por Conocimiento</span>
          <span class="seccion-sub">Desbloqueados por la Radio</span>
        </div>
        <div class="construcciones-list">
          ${PROGRAMAS_RADIO
            .filter(p => p.tipo === 'conocimiento')
            .map(prog => {
              const aprendido = conocimientos.includes(prog.conocimientoId);
              return `
                <div class="construccion-card">
                  <div class="construccion-info">
                    <h4>${prog.desbloqueo.icono} ${prog.desbloqueo.nombre}</h4>
                    <div class="construccion-costos">${prog.desbloqueo.descripcion}</div>
                  </div>
                  <div>
                    ${aprendido 
                      ? `<span class="badge-desbloqueo-radio">✓ Construido</span>`
                      : `<span style="font-size: 0.75rem; color: var(--text-muted);">Sintoniza Radio 📻</span>`
                    }
                  </div>
                </div>
              `;
            }).join('')}
        </div>
      </section>

      <!-- SECCIÓN: ALMACÉN DETALLADO -->
      <section class="cimientos-seccion">
        <div class="seccion-header">
          <span class="seccion-titulo">📦 Inventario del Asentamiento</span>
        </div>
        <div class="cimientos-grid">
          <div class="cimiento-card">
            <div class="cimiento-header">
              <span class="cimiento-nombre">🪵 Tablas de Madera</span>
              <span class="cimiento-integridad alta">${estado.recursos.tablas} unidades</span>
            </div>
            <div class="cimiento-desc">Usadas para reforzar paredes, defensas y estructuras del refugio.</div>
          </div>
          <div class="cimiento-card">
            <div class="cimiento-header">
              <span class="cimiento-nombre">🥕 Provisiones de Comida</span>
              <span class="cimiento-integridad alta">${estado.recursos.provisiones} raciones</span>
            </div>
            <div class="cimiento-desc">Energía y alimento obtenidos al patrullar o completar actividades físicas.</div>
          </div>
          <div class="cimiento-card">
            <div class="cimiento-header">
              <span class="cimiento-nombre">🔩 Clavos y Chatarra</span>
              <span class="cimiento-integridad alta">${estado.recursos.clavos} piezas</span>
            </div>
            <div class="cimiento-desc">Piezas de ensamblaje obtenidas de estudio, lectura y orden.</div>
          </div>
          <div class="cimiento-card">
            <div class="cimiento-header">
              <span class="cimiento-nombre">💧 Agua Pura</span>
              <span class="cimiento-integridad alta">${estado.recursos.agua} litros</span>
            </div>
            <div class="cimiento-desc">El recurso más valioso del Yermo para mantener con vida los cimientos.</div>
          </div>
        </div>
      </section>
    `;
  }
}
