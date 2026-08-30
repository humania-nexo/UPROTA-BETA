/**
 * Vista: Sistema de Comunicación (Fases 0, 1 y 2)
 * Incluye Radio 104.5 MHz con reproductor de audio, botón de descarga directa
 * y transcripción completa legible para lectura sin audio o en silencio.
 */

import { estadoApp } from '../core/estado.js';
import { ComunicacionEngine } from '../mundo/comunicacion.js';
import { TRANSMISIONES_RADIO } from '../data/radio_transmisiones.js';

export class VistaComunicacion {
  constructor(contenedor) {
    this.contenedor = contenedor;
    this.transmisionSeleccionadaId = 'rad_001';
  }

  render(estado) {
    const faseInfo = ComunicacionEngine.getInfoFase(estado.comunicacion.fase);
    const transmisionActual = TRANSMISIONES_RADIO.find(t => t.id === this.transmisionSeleccionadaId) || TRANSMISIONES_RADIO[0];

    this.contenedor.innerHTML = `
      <div class="card-yermo">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <h3 style="font-size: 1rem; color: var(--text-primary);">${faseInfo.icono} ${faseInfo.nombre}</h3>
          <span style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--oro-torta);">${faseInfo.tipoFlujo}</span>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45;">
          ${faseInfo.desc}
        </p>
      </div>

      ${estado.comunicacion.fase === 0 ? `
        <!-- FASE 0: ENCUENTROS PRESENCIALES CON DON CHUI -->
        <div class="card-yermo" style="border-left: 3px solid var(--pilar-espiritu); background: #1a1714;">
          <div style="display: flex; gap: 14px; align-items: flex-start;">
            <img src="assets/sprites/npcs/don_chui_hablando.png" alt="Don Chui" class="pixel-icon icon-48" style="width: 48px; height: 48px; border: 2px solid var(--oro-torta); border-radius: var(--radius-sm); background: #000;">
            <div>
              <h4 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 2px;">Don Chui (El Caminante)</h4>
              <div style="font-size: 0.75rem; color: var(--oro-torta); margin-bottom: 8px;">Mensajero del Yermo &bull; Portador de Sabiduría</div>
              <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5; font-style: italic;">
                "El día que esté con Dios, ya no me van a reclamar. El Padre no me va a decir '¿por qué no me los ayudaste?'. Ten paciencia, Prota. El Yermo premia las manos firmes."
              </p>
            </div>
          </div>
        </div>

        <div class="card-yermo" style="background: rgba(0, 0, 0, 0.4); border: 1px dashed var(--border-subtle);">
          <div style="display: flex; gap: 10px; align-items: center;">
            <span style="font-size: 1.4rem;">📻</span>
            <div>
              <h4 style="font-size: 0.85rem; color: var(--text-primary); margin-bottom: 2px;">Próximo Hito: Radio de Onda Corta (104.5 MHz)</h4>
              <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4;">
                Se desbloquea al avanzar en tu refugio. Podrás escuchar y leer las transmisiones nocturnas de Elena y los supervivientes del valle.
              </p>
            </div>
          </div>
        </div>
      ` : `
        <!-- FASE 1 / 2: RECEPTOR DE RADIO 104.5 MHz -->
        <div class="card-yermo" style="background: #171513; border: 1px solid var(--border-strong);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--border-subtle);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.2rem;">📻</span>
              <div>
                <div style="font-family: var(--font-mono); color: var(--oro-torta-glow); font-size: 1.05rem; font-weight: bold;">104.5 MHz YERMO LIBRE</div>
                <div style="font-size: 0.7rem; color: #a8a29e;">Sierra-Uno / Estación del Risco</div>
              </div>
            </div>
            <span style="font-size: 0.72rem; color: #4ade80; font-weight: bold; display: flex; align-items: center; gap: 4px;">
              <span style="width: 8px; height: 8px; background: #4ade80; border-radius: 50%; display: inline-block;"></span>
              RECEPTOR ACTIVO
            </span>
          </div>

          <!-- Selector de Emisiones de Radio -->
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em;">
            Emisiones en Memoria:
          </div>
          <div style="display: flex; gap: 6px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 14px;">
            ${TRANSMISIONES_RADIO.map(t => `
              <button 
                class="btn-radio-tab ${t.id === transmisionActual.id ? 'active' : ''}" 
                data-id="${t.id}"
                style="padding: 6px 12px; font-size: 0.78rem; border-radius: var(--radius-sm); border: 1px solid ${t.id === transmisionActual.id ? 'var(--oro-torta)' : 'var(--border-subtle)'}; background: ${t.id === transmisionActual.id ? '#78350f' : '#1f1c19'}; color: #fff; cursor: pointer; white-space: nowrap;">
                #${t.numero} ${t.locutor.split(' ')[0]}
              </button>
            `).join('')}
          </div>

          <!-- Ficha de la Transmisión Seleccionada -->
          <div style="background: #11100e; padding: 14px; border-radius: var(--radius-sm); border: 1px solid #2d2925; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div>
                <h4 style="font-size: 0.95rem; color: #fff; font-weight: 700; margin-bottom: 2px;">
                  ${transmisionActual.titulo}
                </h4>
                <div style="font-size: 0.75rem; color: var(--oro-torta);">
                  Voz: ${transmisionActual.locutor} &bull; Duración: ${transmisionActual.duracionAprox}
                </div>
              </div>
              <a href="${transmisionActual.archivoAudio}" download="${transmisionActual.archivoAudio.split('/').pop()}" class="btn-yermo-subtle" style="font-size: 0.75rem; padding: 6px 10px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); color: var(--oro-torta);" title="Descargar archivo de audio para escuchar offline">
                📥 Descargar
              </a>
            </div>

            <!-- Reproductor de Audio Nativo -->
            <audio controls style="width: 100%; margin: 8px 0 12px 0; height: 36px;">
              <source src="${transmisionActual.archivoAudio}" type="audio/mpeg">
              Tu navegador no soporta reproducción de audio.
            </audio>

            <!-- Transcripción Legible en Pantalla -->
            <div style="margin-top: 10px; border-top: 1px dashed var(--border-subtle); padding-top: 10px;">
              <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; margin-bottom: 6px; font-weight: bold;">
                📜 Transcripción en Pantalla (Lectura en Silencio):
              </div>
              <div style="font-size: 0.84rem; color: #e7e5e4; line-height: 1.55; white-space: pre-line; background: #171513; padding: 12px; border-radius: var(--radius-sm); border-left: 3px solid var(--oro-torta); font-family: sans-serif;">
                ${transmisionActual.transcripcion}
              </div>
            </div>
          </div>
        </div>
      `}
    `;

    // Eventos de botones de emisión
    this.contenedor.querySelectorAll('.btn-radio-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        this.transmisionSeleccionadaId = btn.dataset.id;
        this.render(estadoApp.datos);
      });
    });
  }
}