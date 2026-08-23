/**
 * Vista: Refugio, Bioenergía, Almacén y 10 Niveles
 */

import { estadoApp } from '../core/estado.js';
import { RefugioMundoEngine } from '../mundo/refugio_engine.js';
import { NIVELES_REFUGIO } from '../data/niveles_refugio.js';

export class VistaRefugio {
  constructor(contenedor) {
    this.contenedor = contenedor;
  }

  render(estado) {
    const infoNivel = estadoApp.infoNivelRefugio;
    const evaluacionSubida = RefugioMundoEngine.puedeSubirNivel(estado.nivelRefugio, estado.recursos);

    this.contenedor.innerHTML = `
      <div class="refugio-hero">
        <span class="refugio-stage-tag">Nivel ${infoNivel.nivel} &bull; ${infoNivel.nombre}</span>
        <div class="refugio-titulo-row">
          <span>${infoNivel.icono}</span>
          <span>Refugio de ${estado.perfil.nombre}</span>
        </div>
        <p class="refugio-desc">${infoNivel.descripcion}</p>

        <!-- PANEL DE BIOENERGÍA -->
        <div class="bioenergia-panel">
          <div class="bioenergia-head">
            <span>⚡ Bioenergía por Pedal</span>
            <span>${estado.bioenergia.nivelCarga}% Carga</span>
          </div>
          <div class="bioenergia-barra-wrap">
            <div class="bioenergia-barra" style="width: ${estado.bioenergia.nivelCarga}%;"></div>
          </div>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 2px;">
            Cumple tus Sendas de Cuerpo para pedalear y recargar la batería de la radio y luces LED.
          </div>
        </div>

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
          <span class="bolsa-titulo">🎒 ${estado.bolsa.tipo}</span>
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
        <h4 style="margin-bottom: 10px; font-size: 0.9rem; color: var(--text-primary);">📦 Inventario del Asentamiento</h4>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
          <div style="background: var(--bg-surface); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted);">🪵 Tablas</div>
            <div style="font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); color: #fff;">${estado.recursos.tablas} u.</div>
          </div>
          <div style="background: var(--bg-surface); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted);">🔩 Clavos</div>
            <div style="font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); color: #fff;">${estado.recursos.clavos} u.</div>
          </div>
          <div style="background: var(--bg-surface); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted);">🥕 Provisiones</div>
            <div style="font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); color: #fff;">${estado.recursos.provisiones} rac.</div>
          </div>
          <div style="background: var(--bg-surface); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; color: var(--text-muted);">💧 Agua Pura</div>
            <div style="font-size: 1.1rem; font-weight: 700; font-family: var(--font-mono); color: #fff;">${estado.recursos.aguaLitros} L</div>
          </div>
        </div>
      </div>
    `;

    const btnSubir = this.contenedor.querySelector('#btn-subir-nivel-refugio');
    if (btnSubir) {
      btnSubir.addEventListener('click', async () => {
        estado.nivelRefugio += 1;
        await estadoApp.guardar();
      });
    }
  }
}
