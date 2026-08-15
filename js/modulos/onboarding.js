/**
 * Módulo de Onboarding / Bienvenida Inmersiva
 * Prólogo distópico, filosofía del refugio y configuración inicial del Prota (Sin Spoilers).
 */

import { estadoApp } from '../core/estado.js';

export class OnboardingModulo {
  static mostrarSiEsNecesario() {
    const yaVisto = localStorage.getItem('uprota_onboarding_visto');
    if (!yaVisto) {
      this.abrirModalBienvenida();
    }
  }

  static abrirModalBienvenida() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    const estado = estadoApp.estado;
    const nombreActual = estado.perfil.nombre || "";
    const ciudadActual = estado.perfil.ciudad || "";

    modalContent.innerHTML = `
      <div class="onboarding-wrap">
        <div class="onboarding-distopia-header">
          <span class="stamp-clasificado">AÑO 3 TRAS EL COLAPSO</span>
          <h2 class="onboarding-title">El Yermo no Perdona la Desidia</h2>
          <div class="onboarding-sub">Registro de Transmisión de Emergencia</div>
        </div>

        <!-- Prólogo Narrativo Distópico (Sin Spoilers) -->
        <div class="onboarding-lore-box">
          <p>
            Los gobiernos cayeron hace años. No hubo un solo cataclismo: fueron las sequías interminables, los apagones globales y el silencio de las ciudades. El mundo que conocías se desmoronó.
          </p>
          <p style="margin-top: 8px;">
            Afuera hay tormentas de polvo rojo, saqueadores al acecho y una extraña presencia en la maleza a la que todos llaman <em>"Verdes"</em>... pero las cosas rara vez son lo que parecen a primera vista.
          </p>
          <p style="margin-top: 8px; font-weight: 600; color: #fed7aa;">
            En este mundo roto, la única muralla que te separa del abismo es tu propia disciplina diaria.
          </p>
        </div>

        <div class="onboarding-body">
          <div class="onboarding-feature">
            <span class="feat-icon">🪵</span>
            <div class="feat-text">
              <strong>Tu vida real es tu fortaleza:</strong> Lavar los platos purifica tus utensilios; salir a correr patrulla tu perímetro; estudiar decodifica planos. Cada tarea que cumples mantiene tu refugio en pie.
            </div>
          </div>

          <div class="onboarding-feature">
            <span class="feat-icon">📁</span>
            <div class="feat-text">
              <strong>Descubre la verdad:</strong> A través de transmisiones de radio, diarios de campo y expedientes clasificados, irás desenterrando poco a poco qué causó el Colapso y qué secretos oculta el Yermo.
            </div>
          </div>

          <div class="onboarding-feature">
            <span class="feat-icon">🕯️</span>
            <div class="feat-text">
              <strong>El Hogar (Validación sin culpa):</strong> Cuando las cosas se compliquen en tu vida real, el refugio nunca te castigará con números rojos. Te dará resguardo, calor y luz prestada para volver a empezar.
            </div>
          </div>

          <div class="onboarding-form">
            <div class="form-group">
              <label for="input-onboarding-nombre">Nombre de tu Sobreviviente (Prota):</label>
              <input type="text" id="input-onboarding-nombre" class="form-input" value="${nombreActual}" placeholder="Ej: Joshua, Elena, Cuervo...">
            </div>

            <div class="form-group">
              <label for="input-onboarding-ciudad">Ciudad natal o de origen (Para sintonizar la radio):</label>
              <input type="text" id="input-onboarding-ciudad" class="form-input" value="${ciudadActual}" placeholder="Ej: Mazatlán, Madrid, Monterrey...">
            </div>
          </div>
        </div>

        <div class="modal-actions" style="margin-top: 16px;">
          <button id="btn-comenzar-aventura" class="btn-primary" style="padding: 12px 20px; font-size: 0.95rem; width: 100%;">
            🔥 Reclamar Punto Cero y Sobrevivir
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
