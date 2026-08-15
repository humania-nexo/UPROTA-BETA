/**
 * Módulo de UI: Radio del Yermo
 * Transmisión de conocimiento real con síntesis de voz (TTS) nativa del dispositivo.
 */

import { PROGRAMAS_RADIO, ECOS_RADIO } from '../data/radio_programas.js';
import { estadoApp } from '../core/estado.js';

export class RadioModulo {
  constructor(contenedor) {
    this.contenedor = contenedor;
    this.audioActivo = false;
    this.programaActualId = null;
  }

  render(estado) {
    const ciudad = estado.perfil.ciudad || "Mazatlán";
    const conocimientos = estado.conocimientosAdquiridos || [];

    // Combinar programas fijos con ecos liberados
    const transmisiones = [...PROGRAMAS_RADIO];

    this.contenedor.innerHTML = `
      <div class="radio-container">
        <!-- Aparato de Radio Físico -->
        <div class="radio-device">
          <div class="radio-top-bar">
            <span class="radio-brand">RADIO YERMO RECEPTOR MK-II</span>
            <div class="radio-indicator">
              <span class="radio-led ${this.audioActivo ? 'on' : ''}" id="radio-led"></span>
              <span id="radio-frecuencia-texto">104.5 MHz FM</span>
            </div>
          </div>

          <div class="radio-display">
            <div class="radio-station-title" id="radio-station-title">
              YERMO ${ciudad.toUpperCase()} RADIO
            </div>
            <div class="radio-now-playing" id="radio-display-status">
              ${this.audioActivo ? '🔊 Transmisión en curso...' : 'Sintonizador listo. Selecciona una frecuencia abajo.'}
            </div>
          </div>

          <div class="radio-controls">
            <button id="btn-detener-tts" class="btn-secondary" style="font-size: 0.8rem; padding: 6px 12px;">
              ⏹️ Detener
            </button>
            <button id="btn-cambiar-ciudad" class="btn-secondary" style="font-size: 0.8rem; padding: 6px 12px; margin-left: auto;">
              📍 Cambiar Ciudad (${ciudad})
            </button>
          </div>
        </div>

        <!-- Lista de Frecuencias / Transmisiones -->
        <div class="radio-list-title">Transmisiones Sintonizables</div>
        <div class="transmisiones-list">
          ${transmisiones.map(prog => {
            const esConocimiento = prog.tipo === 'conocimiento';
            const aprendido = esConocimiento && conocimientos.includes(prog.conocimientoId);

            return `
              <div class="transmision-card ${esConocimiento ? 'conocimiento' : ''}" data-id="${prog.id}">
                <div class="transmision-header">
                  <span class="transmision-tipo">${prog.tag || 'Transmisión'}</span>
                  ${aprendido ? `<span class="badge-desbloqueo-radio">✓ Aprendido</span>` : ''}
                </div>
                <h3 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${prog.titulo}</h3>
                <p class="transmision-texto">${prog.guion}</p>
                <div class="transmision-footer">
                  <button class="btn-tts-play btn-escuchar-transmision" data-id="${prog.id}">
                    ▶️ Escuchar (Voz)
                  </button>
                  ${esConocimiento ? `
                    <span style="font-size: 0.72rem; color: var(--accent-amber-light);">
                      Desbloquea: ${prog.desbloqueo.nombre}
                    </span>
                  ` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    this.vincularEventos();
  }

  vincularEventos() {
    // Botones de reproducción de transmisiones
    this.contenedor.querySelectorAll('.btn-escuchar-transmision').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const prog = PROGRAMAS_RADIO.find(p => p.id === id);
        if (prog) {
          this.reproducirTexto(prog);
        }
      });
    });

    // Detener reproducción
    const btnDetener = this.contenedor.querySelector('#btn-detener-tts');
    if (btnDetener) {
      btnDetener.addEventListener('click', () => {
        this.detenerTTS();
      });
    }

    // Cambiar Ciudad
    const btnCiudad = this.contenedor.querySelector('#btn-cambiar-ciudad');
    if (btnCiudad) {
      btnCiudad.addEventListener('click', () => {
        this.abrirModalCiudad();
      });
    }
  }

  reproducirTexto(prog) {
    if (!('speechSynthesis' in window)) {
      alert("Tu navegador no soporta síntesis de voz nativa, pero puedes leer el contenido directamente.");
      if (prog.conocimientoId) {
        estadoApp.adquirirConocimiento(prog.conocimientoId);
      }
      return;
    }

    window.speechSynthesis.cancel();

    const ciudad = estadoApp.estado.perfil.ciudad || "Mazatlán";
    const textoConCiudad = prog.guion.replace(/\[CIUDAD\]/g, ciudad);

    const utterance = new SpeechSynthesisUtterance(textoConCiudad);
    utterance.lang = 'es-MX';
    utterance.rate = 0.92; // Ritmo calmado de locutor
    utterance.pitch = 0.9;

    const displayStatus = document.getElementById('radio-display-status');
    const led = document.getElementById('radio-led');

    utterance.onstart = () => {
      this.audioActivo = true;
      this.programaActualId = prog.id;
      if (displayStatus) displayStatus.textContent = `🔊 Transmitiendo: "${prog.titulo}"`;
      if (led) led.classList.add('on');
    };

    utterance.onend = async () => {
      this.audioActivo = false;
      if (displayStatus) displayStatus.textContent = 'Transmisión finalizada.';
      if (led) led.classList.remove('on');

      // Si es un programa de conocimiento, marcarlo como adquirido
      if (prog.conocimientoId) {
        const nuevo = await estadoApp.adquirirConocimiento(prog.conocimientoId);
        if (nuevo) {
          this.mostrarNotificacionConocimiento(prog.desbloqueo.nombre);
        }
      }
    };

    utterance.onerror = (e) => {
      console.warn("TTS interrumpido o cancelado:", e);
      this.audioActivo = false;
      if (displayStatus) displayStatus.textContent = 'Transmisión pausada.';
      if (led) led.classList.remove('on');
    };

    window.speechSynthesis.speak(utterance);
  }

  detenerTTS() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.audioActivo = false;
    const displayStatus = document.getElementById('radio-display-status');
    const led = document.getElementById('radio-led');
    if (displayStatus) displayStatus.textContent = 'Sintonizador en silencio.';
    if (led) led.classList.remove('on');
  }

  mostrarNotificacionConocimiento(nombre) {
    const banner = document.getElementById('banner-notificacion');
    if (!banner) return;

    banner.innerHTML = `💡 <strong>¡Conocimiento Asimilado!</strong> Ahora puedes levantar: ${nombre} (+3 Moral)`;
    banner.classList.remove('hidden');

    setTimeout(() => {
      banner.classList.add('hidden');
    }, 4000);
  }

  abrirModalCiudad() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    const actual = estadoApp.estado.perfil.ciudad || "Mazatlán";

    modalContent.innerHTML = `
      <h2 style="font-size: 1.1rem; margin-bottom: 10px; color: var(--text-primary);">Sintonizar Ciudad Natal</h2>
      <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 14px;">
        ¿De qué ciudad vienes, Prota? El Yermo también tiene memoria del mundo antes del colapso.
      </p>
      <div class="form-group">
        <input type="text" id="input-ciudad" class="form-input" value="${actual}" placeholder="Ej: Mazatlán, Monterrey, Madrid...">
      </div>
      <div class="modal-actions">
        <button id="btn-cancelar-ciudad" class="btn-secondary" style="flex: 1;">Cancelar</button>
        <button id="btn-guardar-ciudad" class="btn-primary" style="flex: 2;">Guardar Frecuencia</button>
      </div>
    `;

    modalContent.querySelector('#btn-cancelar-ciudad').addEventListener('click', () => {
      modalContainer.classList.add('hidden');
    });

    modalContent.querySelector('#btn-guardar-ciudad').addEventListener('click', async () => {
      const nueva = modalContent.querySelector('#input-ciudad').value.trim();
      if (nueva) {
        await estadoApp.actualizarCiudad(nueva);
        modalContainer.classList.add('hidden');
      }
    });

    modalContainer.classList.remove('hidden');
  }
}
