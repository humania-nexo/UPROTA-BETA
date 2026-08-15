/**
 * Módulo de UI: Refugio, Progresión de 10 Niveles y Bitácora de Crónicas
 */

import { GameEngine } from '../core/engine.js';
import { PROGRAMAS_RADIO } from '../data/radio_programas.js';

export class RefugioModulo {
  constructor(contenedor) {
    this.contenedor = contenedor;
    this.tabSubseccion = 'refugio'; // 'refugio', 'niveles', 'bitacora'
  }

  render(estado) {
    const infoNivel = GameEngine.calcularNivelRefugio(estado.recursos);
    const conocimientos = estado.conocimientosAdquiridos || [];
    const bitacora = estado.bitacoraEventos || [];
    const sig = infoNivel.siguienteNivel;

    this.contenedor.innerHTML = `
      <div class="refugio-view-header">
        <div class="refugio-hero-card">
          <div class="refugio-stage-badge">Nivel ${infoNivel.nivel} &bull; ${infoNivel.nombre}</div>
          <div class="refugio-titulo-grande">
            <span>${infoNivel.icono}</span>
            <span>Refugio de ${estado.perfil.nombre}</span>
          </div>
          <p class="refugio-narrativa-texto">${infoNivel.descripcion}</p>
          
          <div class="refugio-capacidad-box">
            <span>Capacidad actual:</span>
            <strong>🏃 ${infoNivel.maxSendas} Sendas &bull; 🕯️ ${infoNivel.maxFaros} Faros</strong>
          </div>

          ${sig ? `
            <div class="refugio-sig-nivel-box">
              <div class="sig-nivel-head">
                <span>Próximo: Nivel ${sig.nivel} - ${sig.nombre}</span>
                <span style="color: var(--accent-amber-light);">+2 Sendas</span>
              </div>
              <div class="sig-requisitos-row">
                ${this.renderRequisitosChips(estado.recursos, sig.requisitos)}
              </div>
            </div>
          ` : `
            <div class="refugio-max-level">👑 ¡Has alcanzado la cima: La Ciudadela Libre!</div>
          `}

          <div class="refugio-clima-box">
            <strong>Estado del Yermo:</strong> ${infoNivel.clima}
          </div>
        </div>
      </div>

      <!-- Selector de Subsecciones -->
      <div class="refugio-subnav">
        <button class="btn-subnav ${this.tabSubseccion === 'refugio' ? 'active' : ''}" id="btn-sub-refugio">
          🛖 Almacén & Cimientos
        </button>
        <button class="btn-subnav ${this.tabSubseccion === 'niveles' ? 'active' : ''}" id="btn-sub-niveles">
          🗺️ 10 Niveles
        </button>
        <button class="btn-subnav ${this.tabSubseccion === 'bitacora' ? 'active' : ''}" id="btn-sub-bitacora">
          📜 Bitácora (${bitacora.length})
        </button>
      </div>

      ${this.renderSubseccion(this.tabSubseccion, conocimientos, estado, bitacora)}
    `;

    this.vincularSubnav(estado);
  }

  renderSubseccion(tab, conocimientos, estado, bitacora) {
    if (tab === 'niveles') return this.renderNivelesMapa(estado);
    if (tab === 'bitacora') return this.renderBitacora(bitacora);
    return this.renderEstructuras(conocimientos, estado);
  }

  renderRequisitosChips(recursos, req) {
    return Object.entries(req).map(([rec, cant]) => {
      const actual = recursos[rec] || 0;
      const cumplido = actual >= cant;
      return `
        <span class="req-chip ${cumplido ? 'ok' : ''}">
          ${this.getEmojiRecurso(rec)} ${actual}/${cant}
        </span>
      `;
    }).join(' ');
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
            <div class="cimiento-desc">Usadas para reforzar paredes, subir de nivel y fortificar.</div>
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

  renderNivelesMapa(estado) {
    const infoActual = GameEngine.calcularNivelRefugio(estado.recursos);

    return `
      <div class="mapa-niveles-wrap" style="display: flex; flex-direction: column; gap: 10px; margin-top: 14px;">
        ${GameEngine.NIVELES_REFUGIO.map(n => {
          const esActual = n.nivel === infoActual.nivel;
          const superado = n.nivel < infoActual.nivel;

          return `
            <div class="card-item ${esActual ? 'nivel-actual' : ''}" style="${esActual ? 'border-color: var(--accent-amber); background: rgba(217, 119, 6, 0.08);' : ''}">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">
                  ${n.icono} Nivel ${n.nivel}: ${n.nombre}
                </div>
                <div>
                  ${esActual ? `<span class="badge-desbloqueo-radio" style="background: var(--accent-rust); color: #fff;">Actual</span>` : ''}
                  ${superado ? `<span style="color: var(--accent-green); font-size: 0.8rem;">✓ Conquistado</span>` : ''}
                </div>
              </div>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 4px;">
                Ranuras: 🏃 ${n.maxSendas} Sendas &bull; 🕯️ ${n.maxFaros} Faros
              </div>
              <div style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--accent-amber-light); margin-top: 2px;">
                ${n.requisitoTexto}
              </div>
            </div>
          `;
        }).join('')}
      </div>
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
    const btnNiv = this.contenedor.querySelector('#btn-sub-niveles');
    const btnBit = this.contenedor.querySelector('#btn-sub-bitacora');

    if (btnRef) {
      btnRef.addEventListener('click', () => {
        this.tabSubseccion = 'refugio';
        this.render(estado);
      });
    }

    if (btnNiv) {
      btnNiv.addEventListener('click', () => {
        this.tabSubseccion = 'niveles';
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

  getEmojiRecurso(tipo) {
    const mapa = { tablas: '🪵', provisiones: '🥕', clavos: '🔩', agua: '💧', moral: '🔥' };
    return mapa[tipo] || '📦';
  }
}
