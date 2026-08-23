/**
 * Componente: Onboarding Inicial Guiado (2 Pasos)
 * Paso 1: Prólogo del Colapso y Puente Vida Real.
 * Paso 2: Configuración Inicial de los 4 Pilares (Piso Mínimo 1-1-1-8).
 */

import { estadoApp } from '../core/estado.js';

export class ModalOnboarding {
  static mostrarSiEsNecesario() {
    const estado = estadoApp.datos;
    if (!estado.perfil.onboardingCompletado && estado.sendas.length === 0) {
      this.abrirPaso1();
    }
  }

  static abrirPaso1() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="onboarding-wrap">
        <div style="display: inline-block; background: #451a03; border: 1px dashed var(--oro-torta); color: var(--oro-torta-glow); font-family: var(--font-mono); font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; margin-bottom: 6px;">
          REGISTRO DE EMERGENCIA &bull; AÑO 3
        </div>

        <h2 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin-bottom: 4px;">
          El Yermo no Perdona la Desidia
        </h2>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 12px;">
          Prólogo de Supervivencia y Puente a tu Vida Real
        </div>

        <div style="background: rgba(0, 0, 0, 0.4); border-left: 3px solid var(--accent-rust); padding: 12px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
          <p>
            La civilización no cayó por un solo cataclismo: fueron las sequías interminables, los apagones globales y el silencio de las ciudades. Cada persona quedó por su cuenta, sobreviviendo desde su propio rincón.
          </p>
          <p style="margin-top: 6px; font-weight: 600; color: #fed7aa;">
            En este mundo, tu vida diaria real es tu fortaleza. Lavar platos purifica utensilios; hacer ejercicio patrulla tu perímetro; estudiar decodifica planos; orar o meditar cuida el fuego interior.
          </p>
        </div>

        <div style="margin-bottom: 16px;">
          <div style="font-size: 0.82rem; color: var(--text-primary); font-weight: 600; margin-bottom: 6px;">
            Sobreviviente (Prota):
          </div>
          <input type="text" id="input-onb-nombre" class="card-yermo" style="width: 100%; padding: 8px; color: #fff; background: var(--bg-surface); margin-bottom: 8px;" placeholder="Tu nombre o apodo (Ej: Elena, Joshua, Cuervo)">
          <input type="text" id="input-onb-ciudad" class="card-yermo" style="width: 100%; padding: 8px; color: #fff; background: var(--bg-surface);" placeholder="Ciudad de origen (Ej: Mazatlán, Madrid, Bogotá)">
        </div>

        <button id="btn-onb-ir-paso-2" class="btn-yermo-primary" style="width: 100%; padding: 12px;">
          Entendido &bull; Trazar Mis 4 Sendas Iniciales ➔
        </button>
      </div>
    `;

    modalContent.querySelector('#btn-onb-ir-paso-2').addEventListener('click', () => {
      const nombre = modalContent.querySelector('#input-onb-nombre').value.trim() || 'Prota';
      const ciudad = modalContent.querySelector('#input-onb-ciudad').value.trim() || 'Yermo Central';
      
      estadoApp.datos.perfil.nombre = nombre;
      estadoApp.datos.perfil.ciudad = ciudad;
      
      this.abrirPaso2();
    });

    modalContainer.classList.remove('hidden');
  }

  static abrirPaso2() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="onboarding-wrap">
        <h3 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 4px;">
          ⚖️ Configuración del Piso Mínimo (4 Pilares)
        </h3>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 12px;">
          Define un hábito real y concreto para cada dimensión de tu vida. Ninguna quedará abandonada.
        </p>

        <!-- PILAR 1: CUERPO -->
        <div style="margin-bottom: 10px; border-left: 3px solid var(--pilar-cuerpo); padding-left: 8px;">
          <label style="font-size: 0.8rem; font-weight: 700; color: var(--pilar-cuerpo-light);">🏃 1. Cuerpo (Salud y Movimiento):</label>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 2px;">En el Yermo: Patrulla de perímetro y recarga de energía física.</div>
          <input type="text" id="input-pilar-cuerpo" class="card-yermo" style="width: 100%; padding: 6px; color: #fff; background: var(--bg-surface); margin-bottom: 0;" placeholder="Ej: Caminar 20 min, 15 flexiones, trotar...">
        </div>

        <!-- PILAR 2: MENTE -->
        <div style="margin-bottom: 10px; border-left: 3px solid var(--pilar-mente); padding-left: 8px;">
          <label style="font-size: 0.8rem; font-weight: 700; color: var(--pilar-mente-light);">📜 2. Mente (Estudio y Lectura):</label>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 2px;">En el Yermo: Decodificación de planos y manuales de supervivencia.</div>
          <input type="text" id="input-pilar-mente" class="card-yermo" style="width: 100%; padding: 6px; color: #fff; background: var(--bg-surface); margin-bottom: 0;" placeholder="Ej: Leer 10 páginas, Estudiar 20 min...">
        </div>

        <!-- PILAR 3: ESPÍRITU -->
        <div style="margin-bottom: 10px; border-left: 3px solid var(--pilar-espiritu); padding-left: 8px;">
          <label style="font-size: 0.8rem; font-weight: 700; color: var(--pilar-espiritu-light);">🔥 3. Espíritu (Vida Interior y Calma):</label>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 2px;">En el Yermo: Cuidar el fuego interior, silencio y gratitud.</div>
          <input type="text" id="input-pilar-espiritu" class="card-yermo" style="width: 100%; padding: 6px; color: #fff; background: var(--bg-surface); margin-bottom: 0;" placeholder="Ej: Orar 5 min, Meditar, Respiración consciente...">
        </div>

        <!-- PILAR 4: TALLER -->
        <div style="margin-bottom: 14px; border-left: 3px solid var(--pilar-taller); padding-left: 8px;">
          <label style="font-size: 0.8rem; font-weight: 700; color: var(--pilar-taller-light);">🛠️ 4. Taller (Labor Manual y Oficio):</label>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 2px;">En el Yermo: Forja manual, mantenimiento y reparar con las manos.</div>
          <input type="text" id="input-pilar-taller" class="card-yermo" style="width: 100%; padding: 6px; color: #fff; background: var(--bg-surface); margin-bottom: 0;" placeholder="Ej: Dibujar, Ordenar herramientas, Soldar, Limpieza profunda...">
        </div>

        <button id="btn-onb-guardar-todo" class="btn-yermo-primary" style="width: 100%; padding: 12px;">
          🔥 Reclamar Punto Cero y Comenzar
        </button>
      </div>
    `;

    modalContent.querySelector('#btn-onb-guardar-todo').addEventListener('click', async () => {
      const hCuerpo = modalContent.querySelector('#input-pilar-cuerpo').value.trim() || 'Movimiento y Salud';
      const hMente = modalContent.querySelector('#input-pilar-mente').value.trim() || 'Lectura y Estudio';
      const hEspiritu = modalContent.querySelector('#input-pilar-espiritu').value.trim() || 'Calma y Fuego Interior';
      const hTaller = modalContent.querySelector('#input-pilar-taller').value.trim() || 'Labor Manual y Orden';

      // Agregar las 4 sendas básicas
      await estadoApp.agregarSenda(hCuerpo, 'cuerpo');
      await estadoApp.agregarSenda(hMente, 'mente');
      await estadoApp.agregarSenda(hEspiritu, 'espiritu');
      await estadoApp.agregarSenda(hTaller, 'taller');

      estadoApp.datos.perfil.onboardingCompletado = true;
      await estadoApp.guardar();

      modalContainer.classList.add('hidden');
    });
  }
}
