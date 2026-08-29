/**
 * Vista: Sistema de Comunicación (Fases 0, 1 y 2)
 */

import { estadoApp } from '../core/estado.js';
import { ComunicacionEngine } from '../mundo/comunicacion.js';

export class VistaComunicacion {
  constructor(contenedor) {
    this.contenedor = contenedor;
  }

  render(estado) {
    const faseInfo = ComunicacionEngine.getInfoFase(estado.comunicacion.fase);

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
        <div class="card-yermo" style="border-left: 3px solid var(--pilar-espiritu); background-image: url('assets/sprites/fondos/bg_chapa_oxidada.png'); background-repeat: repeat; background-size: 48px 48px;">
          <div style="display: flex; gap: 12px; align-items: flex-start;">
            <img src="assets/sprites/npcs/don_chui_neutral.png" alt="Don Chui" class="pixel-icon icon-48" style="width: 48px; height: 48px; border: 2px solid var(--pilar-espiritu); border-radius: var(--radius-sm); background: #000;">
            <div>
              <h4 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 2px;">Don Chui (El Caminante)</h4>
              <div style="font-size: 0.75rem; color: var(--pilar-espiritu-light); margin-bottom: 8px;">Mensajero del Yermo &bull; Portador de Sabiduría</div>
              <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; font-style: italic;">
                "El día que esté con Dios, ya no me van a reclamar. El Padre no me va a decir '¿por qué no me los ayudaste?'. Ten paciencia, Prota. El Yermo premia las manos firmes."
              </p>
            </div>
          </div>
        </div>

        <div class="card-yermo" style="background: rgba(0, 0, 0, 0.3);">
          <h4 style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">Próximo Hito: Radio de Onda Corta</h4>
          <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.4;">
            Alcanza el Nivel 2 del Refugio para encontrar componentes y reparar el receptor de radio.
          </p>
        </div>
      ` : `
        <!-- FASE 1 / 2: RECEPTOR DE RADIO -->
        <div class="card-yermo" style="background: #171513; border: 1px solid var(--border-strong);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="font-family: var(--font-mono); color: var(--oro-torta-glow); font-size: 1.1rem;">104.5 MHz YERMO LIBRE</span>
            <span style="font-size: 0.72rem; color: #4ade80;">● EN VIVO</span>
          </div>

          <div style="background: #000; padding: 12px; border-radius: var(--radius-sm); border: 1px solid #333; margin-bottom: 12px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">Boletín en Transmisión:</div>
            <div style="font-size: 0.88rem; color: #fff; font-weight: 600;">"Fuerza que no se apaga: Bioenergía por Pedal"</div>
            <div style="font-size: 0.78rem; color: #aaa; margin-top: 4px;">Audio grabado local &bull; Duración: 1:30 min</div>
          </div>

          <audio controls style="width: 100%; margin-bottom: 8px;">
            <source src="assets/audio/radio/programa_001_bioenergia.mp3" type="audio/mpeg">
            Tu navegador no soporta reproducción de audio.
          </audio>
        </div>
      `}
    `;
  }
}
