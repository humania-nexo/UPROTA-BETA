/**
 * Vista: Refugio, Bioenergía, Almacén y 10 Niveles
 */

import { estadoApp } from '../core/estado.js';
import { RefugioMundoEngine, DioramaEngine } from '../mundo/refugio_engine.js';
import { NIVELES_REFUGIO } from '../data/niveles_refugio.js';
import { audioProcedural } from '../core/audio_procedural.js';

export class VistaRefugio {
  constructor(contenedor) {
    this.contenedor = contenedor;
  }

  render(estado) {
    const infoNivel = estadoApp.infoNivelRefugio;
    const evaluacionSubida = RefugioMundoEngine.puedeSubirNivel(estado.nivelRefugio, estado.recursos);

    this.contenedor.innerHTML = `
      <div class="refugio-hero">
        <!-- DIORAMA MODULAR POR CAPAS (PLANTILLA EVOLUTIVA) -->
        <div class="refugio-diorama-wrap">
          ${DioramaEngine.render(estado)}
        </div>

        <span class="refugio-stage-tag">Nivel ${infoNivel.nivel} &bull; ${infoNivel.nombre}</span>
        <div class="refugio-titulo-row">
          <img src="assets/sprites/ui/tab_refugio.png" alt="Refugio" class="pixel-icon icon-24">
          <span>Refugio de ${estado.perfil.nombre}</span>
        </div>
        <p class="refugio-desc">${infoNivel.descripcion}</p>

        <!-- PANEL DE ENERGÍA (Oculto hasta que se descubran fuentes y almacenamiento) -->
        ${estado.bioenergia?.biciGeneradorConstruido ? `
          <div class="bioenergia-panel">
            <div class="bioenergia-head">
              <span>⚡ Red Eléctrica del Refugio</span>
              <span>${estado.bioenergia.nivelCarga}% Almacenado</span>
            </div>
            <div class="bioenergia-barra-wrap">
              <div class="bioenergia-barra" style="width: ${estado.bioenergia.nivelCarga}%;"></div>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">
              Fuentes conectadas: Bioenergía / Baterías del viejo mundo.
            </div>
          </div>
        ` : ''}

        ${evaluacionSubida.posible ? `
          <button id="btn-subir-nivel-refugio" class="btn-yermo-primary" style="width: 100%; margin-top: 8px;">
            🔨 Mejorar Refugio a Nivel ${estado.nivelRefugio + 1} (${evaluacionSubida.siguienteInfo.nombre})
          </button>
        ` : `
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
            Próximo nivel (${NIVELES_REFUGIO[estado.nivelRefugio + 1]?.nombre || 'Cima'}): Requiere ${NIVELES_REFUGIO[estado.nivelRefugio + 1]?.requisitoTexto || 'Completado'}.
          </div>
        `}
      </div>

      <!-- PANEL DE BOLSA DE PESO REAL -->
      <div class="bolsa-panel">
        <div class="bolsa-head">
          <span class="bolsa-titulo" style="display: flex; align-items: center; gap: 6px;">
            <img src="assets/sprites/items/caja_expedicion.png" alt="Bolsa" class="pixel-icon icon-20">
            <span>${estado.bolsa.tipo}</span>
          </span>
          <span class="bolsa-peso-badge">${estado.bolsa.pesoActualKg} / ${infoNivel.capacidadBolsaKg} kg</span>
        </div>
        <div class="bolsa-items-grid">
          ${estado.bolsa.items.map(item => `
            <div class="bolsa-item-chip">
              <span>${item.nombre} (x${item.cantidad})</span>
              <span style="font-family: var(--font-mono); color: var(--text-muted);">${item.pesoKg}kg</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- ALMACÉN DE RECURSOS DEL ASENTAMIENTO -->
      <div class="card-yermo">
        <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 10px;">
          <img src="assets/sprites/items/caja_expedicion.png" alt="Almacen" class="pixel-icon icon-20">
          <h4 style="font-size: 0.9rem; color: var(--text-primary); margin: 0;">Inventario del Asentamiento</h4>
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
          <div style="background: var(--bg-surface); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 4px;">
              <img src="assets/sprites/recursos/recurso_tablas.png" alt="Tablas" class="pixel-icon icon-16">
              <span>Tablas</span>
            </div>
            <div style="font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); color: #fff; margin-top: 2px;">${estado.recursos.tablas} u.</div>
          </div>
          <div style="background: var(--bg-surface); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 4px;">
              <img src="assets/sprites/recursos/recurso_clavos.png" alt="Clavos" class="pixel-icon icon-16">
              <span>Clavos</span>
            </div>
            <div style="font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); color: #fff; margin-top: 2px;">${estado.recursos.clavos} u.</div>
          </div>
          <div style="background: var(--bg-surface); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 4px;">
              <img src="assets/sprites/recursos/recurso_provisiones.png" alt="Provisiones" class="pixel-icon icon-16">
              <span>Provisiones</span>
            </div>
            <div style="font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); color: #fff; margin-top: 2px;">${estado.recursos.provisiones} rac.</div>
          </div>
          <div style="background: var(--bg-surface); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 4px;">
              <img src="assets/sprites/recursos/recurso_agua.png" alt="Agua" class="pixel-icon icon-16">
              <span>Agua Pura</span>
            </div>
            <div style="font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); color: #fff; margin-top: 2px;">${estado.recursos.aguaLitros} L</div>
          </div>
        </div>
      </div>
    `;

    const btnSubir = this.contenedor.querySelector('#btn-subir-nivel-refugio');
    if (btnSubir) {
      btnSubir.addEventListener('click', async () => {
        const nuevoNivelInfo = RefugioMundoEngine.ejecutarSubidaNivel(estado);
        if (!nuevoNivelInfo) return;

        // Fanfarria 8-bits
        audioProcedural.playFanfarriaFaro();

        // Guardar estado y notificar vistas
        await estadoApp.guardar();
        estadoApp.notificar();

        // Abrir modal de celebración de ascenso
        const modalContainer = document.getElementById('modal-container');
        const modalContent = document.getElementById('modal-content');
        if (modalContainer && modalContent) {
          modalContent.innerHTML = `
            <div class="info-modal-wrap" style="text-align: center; padding: 20px 14px;">
              <div style="font-size: 2.2rem; margin-bottom: 6px;">🔨✨</div>
              <h2 style="color: var(--oro-torta-glow); font-size: 1.25rem; margin-bottom: 2px;">¡REFUGIO MEJORADO!</h2>
              <div style="font-size: 0.95rem; color: #fff; font-weight: bold; margin-bottom: 12px;">
                Nivel ${nuevoNivelInfo.nivel}: ${nuevoNivelInfo.nombre}
              </div>

              <div class="card-yermo" style="background: rgba(0,0,0,0.4); text-align: left; margin-bottom: 14px; border-left: 3px solid var(--oro-torta);">
                <div style="font-size: 0.72rem; color: var(--oro-torta); font-weight: bold; text-transform: uppercase; margin-bottom: 6px;">
                  NUEVAS CAPACIDADES DESBLOQUEADAS:
                </div>
                <div style="font-size: 0.8rem; color: #e7e5e4; line-height: 1.6;">
                  <div>🎒 <strong>Bolsa:</strong> ${nuevoNivelInfo.bolsaTipo} (${nuevoNivelInfo.capacidadBolsaKg} kg / ${nuevoNivelInfo.espaciosBolsa} ranuras)</div>
                  <div>🌿 <strong>Sendas Máximas:</strong> ${nuevoNivelInfo.maxSendas} hábitos simultáneos</div>
                  <div>⛓️ <strong>Cadenas a Romper:</strong> ${nuevoNivelInfo.maxCadenas} vicios a erradicar</div>
                  <div>🌟 <strong>Faros de Propósito:</strong> ${nuevoNivelInfo.maxFaros} metas a largo plazo</div>
                </div>
              </div>

              <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 16px;">
                "${nuevoNivelInfo.descripcion}"
              </p>

              <button id="btn-cerrar-mejora-refugio" class="btn-yermo-primary" style="width: 100%; padding: 10px; font-weight: bold; font-size: 0.9rem;">
                ¡A la Obra! Continuar Supervivencia
              </button>
            </div>
          `;
          modalContainer.classList.remove('hidden');

          modalContent.querySelector('#btn-cerrar-mejora-refugio')?.addEventListener('click', () => {
            modalContainer.classList.add('hidden');
          });
        }
      });
    }
  }
}
