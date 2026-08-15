/**
 * Módulo de Onboarding / Bienvenida Inmersiva
 * Explica la filosofía de UPROTA y solicita nombre y ciudad iniciales.
 */

import { estadoApp } from '../core/estado.js';

export class OnboardingModulo {
  static mostrarSiEsNecesario() {
    const yaVisto = localStorage.getItem('uprota_onboarding_visto');
    if (!yaVisto) {
      this.abrirModalBienvenida();
    }
  }

  static abrirModalBienvenida(forzar = false) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    const estado = estadoApp.estado;
    const nombreActual = estado.perfil.nombre || "";
    const ciudadActual = estado.perfil.ciudad || "";

    modalContent.innerHTML = `
      <div class="onboarding-wrap">
        <div class="onboarding-badge">📡 Transmisión de Emergencia</div>
        <h2 class="onboarding-title">Bienvenido a UPROTA</h2>
        <div class="onboarding-sub">Tu vida real convertida en aventura de supervivencia</div>

        <div class="onboarding-body">
          <div class="onboarding-quote">
            "UPROTA no es una aplicación de productividad. Es un refugio. Nace de una pregunta simple: ¿qué pasa cuando las cosas que antes eran fáciles —levantarte, ordenar, aprender— de pronto empiezan a pesar?"
          </div>

          <div class="onboarding-feature">
            <span class="feat-icon">🪵</span>
            <div class="feat-text">
              <strong>Supervivencia real:</strong> Cada tarea que completas en tu vida diaria (trotar, leer, lavar los platos) es, literalmente, el material que mantiene tu refugio en pie.
            </div>
          </div>

          <div class="onboarding-feature">
            <span class="feat-icon">🕯️</span>
            <div class="feat-text">
              <strong>El Hogar (Cero culpa):</strong> Aquí nunca hay números rojos ni penalizaciones crueles si un día se complica. Cuando las cosas se tensan, el refugio te acoge y te da luz prestada.
            </div>
          </div>

          <div class="onboarding-feature">
            <span class="feat-icon">📻</span>
            <div class="feat-text">
              <strong>Conocimiento Real:</strong> El sistema de radio transmite habilidades reales de supervivencia narradas con voz. Al aprenderlas, desbloqueas nuevas tecnologías en tu refugio.
            </div>
          </div>

          <div class="onboarding-form">
            <div class="form-group">
              <label for="input-onboarding-nombre">¿Cómo te llamas, Prota?</label>
              <input type="text" id="input-onboarding-nombre" class="form-input" value="${nombreActual}" placeholder="Tu nombre o apodo">
            </div>

            <div class="form-group">
              <label for="input-onboarding-ciudad">¿De qué ciudad vienes? (Para sintonizar la radio)</label>
              <input type="text" id="input-onboarding-ciudad" class="form-input" value="${ciudadActual}" placeholder="Ej: Mazatlán, Madrid, Buenos Aires...">
            </div>
          </div>
        </div>

        <div class="modal-actions" style="margin-top: 16px;">
          <button id="btn-comenzar-aventura" class="btn-primary" style="padding: 12px 20px; font-size: 0.95rem;">
            🔥 Encender la Fogata y Entrar al Refugio
          </button>
        </div>
      </div>
    `;

    modalContent.querySelector('#btn-comenzar-aventura').addEventListener('click', async () => {
      const nombre = modalContent.querySelector('#input-onboarding-nombre').value.trim() || "Prota";
      const ciudad = modalContent.querySelector('#input-onboarding-ciudad').value.trim() || "Yermo Central";

      estadoApp.estado.perfil.nombre = nombre;
      estadoApp.estado.perfil.ciudad = ciudad;
      await estadoApp.guardar();

      localStorage.setItem('uprota_onboarding_visto', 'true');
      modalContainer.classList.add('hidden');
    });

    modalContainer.classList.remove('hidden');
  }
}
