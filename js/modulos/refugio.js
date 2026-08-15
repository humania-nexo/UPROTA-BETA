/**
 * Módulo de UI: Refugio, Cimientos y Bitácora de Crónicas
 * Muestra el estado evolutivo del asentamiento y permite consultar la historia.
 */

import { GameEngine } from '../core/engine.js';
import { PROGRAMAS_RADIO } from '../data/radio_programas.js';

export class RefugioModulo {
  constructor(contenedor) {
    this.contenedor = contenedor;
    this.tabSubseccion = 'refugio'; // 'refugio' o 'bitacora'
  }

  render(estado) {
    const infoNivel = GameEngine.calcularNivelRefugio(estado.recursos, estado.cimientos);
    const conocimientos = estado.conocimientosAdquiridos || [];
    const bitacora = estado.bitacoraEventos || [];

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

      <!-- Selector de Subsecciones -->
      <div class="refugio-subnav">
        <button class="btn-subnav ${this.tabSubseccion === 'refugio' ? 'active' : ''}" id="btn-sub-refugio">
          🛖 Estructuras & Almacén
        </button>
        <button class="btn-subnav ${this.tabSubseccion === 'bitacora' ? 'active' : ''}" id="btn-sub-bitacora">
          📜 Bitácora & Crónicas (${bitacora.length})
        </button>
      </div>

      ${this.tabSubseccion === 'refugio' ? this.renderEstructuras(conocimientos, estado) : this.renderBitacora(bitacora)}
    `;

    this.vincularSubnav(estado);
  }

  renderEstructuras(conocimientos, estado) {
    return `
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
            <div class="cimiento-desc">Usadas para reforzar paredes y defensas.</div>
          </div>
          <div class="cimiento-card">
            <div class="cimiento-header">
              <span class="cimiento-nombre">🥕 Provisiones de Comida</span>
              <span class="cimiento-integridad alta">${estado.recursos.provisiones} raciones</span>
            </div>
            <div class="cimiento-desc">Energía y alimento de actividades físicas y huerto.</div>
          </div>
          <div class="cimiento-card">
            <div class="cimiento-header">
              <span class="cimiento-nombre">🔩 Clavos y Chatarra</span>
              <span class="cimiento-integridad alta">${estado.recursos.clavos} piezas</span>
            </div>
            <div class="cimiento-desc">Piezas de ensamblaje obtenidas de estudio y lectura.</div>
          </div>
          <div class="cimiento-card">
            <div class="cimiento-header">
              <span class="cimiento-nombre">💧 Agua Pura</span>
              <span class="cimiento-integridad alta">${estado.recursos.agua} litros</span>
            </div>
            <div class="cimiento-desc">El recurso más valioso del Yermo para sobrevivir.</div>
          </div>
        </div>
      </section>
    `;
  }

  renderBitacora(bitacora) {
    if (bitacora.length === 0) {
      return `
        <div class="zero-state-card" style="margin-top: 14px;">
          <div class="zero-state-icon">📜</div>
          <h3>La Bitácora está en Blanco</h3>
          <p>A medida que sobrevivas y tomes decisiones en los eventos del Yermo, las crónicas de tu viaje quedarán registradas aquí para siempre.</p>
        </div>
      `;
    }

    return `
      <div class="bitacora-lista" style="margin-top: 14px; display: flex; flex-direction: column; gap: 10px;">
        ${bitacora.map(cronica => {
          return `
            <div class="card-item" style="border-left: 3px solid var(--accent-amber);">
              <div style="font-size: 0.72rem; color: var(--accent-amber-light); font-family: var(--font-mono);">${cronica.fecha}</div>
              <h4 style="font-size: 0.95rem; color: var(--text-primary); margin: 2px 0;">${cronica.titulo}</h4>
              <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 4px;"><strong>Decisión:</strong> ${cronica.decision}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4;">${cronica.resultado}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  vincularSubnav(estado) {
    const btnRef = this.contenedor.querySelector('#btn-sub-refugio');
    const btnBit = this.contenedor.querySelector('#btn-sub-bitacora');

    if (btnRef) {
      btnRef.addEventListener('click', () => {
        this.tabSubseccion = 'refugio';
        this.render(estado);
      });
    }

    if (btnBit) {
      btnBit.addEventListener('click', () => {
        this.tabSubseccion = 'bitacora';
        this.render(estado);
      });
    }
  }
}
