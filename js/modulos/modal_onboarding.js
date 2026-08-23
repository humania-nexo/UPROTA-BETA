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
        <h3 style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 2px;">
          ⚖️ Configuración del Piso Mínimo (4 Pilares)
        </h3>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 14px; line-height: 1.4;">
          Para que ninguna dimensión de tu vida quede abandonada, define un hábito real para cada pilar. Puedes escribir el tuyo o tocar un ejemplo para seleccionarlo.
        </p>

        <!-- PILAR 1: CUERPO -->
        <div style="margin-bottom: 12px; border-left: 3px solid var(--pilar-cuerpo); padding-left: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label style="font-size: 0.84rem; font-weight: 700; color: var(--pilar-cuerpo-light);">🏃 1. CUERPO (Salud y Energía)</label>
          </div>
          <div style="font-size: 0.72rem; color: var(--text-secondary); margin: 2px 0 6px 0;">
            <strong>Propósito:</strong> Sacudirte el sedentarismo y generar la energía física que sostiene tu día. En el Yermo: patrullaje y recarga de bioenergía.
          </div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
            <button type="button" class="chip-sug" data-target="input-pilar-cuerpo" data-val="Caminar 25 min al aire libre">Caminar 25 min</button>
            <button type="button" class="chip-sug" data-target="input-pilar-cuerpo" data-val="15 Flexiones y estiramientos">15 Flexiones/Estiramientos</button>
            <button type="button" class="chip-sug" data-target="input-pilar-cuerpo" data-val="Trotar o andar en bicicleta">Trotar/Bici</button>
          </div>
          <input type="text" id="input-pilar-cuerpo" class="card-yermo" style="width: 100%; padding: 6px 8px; color: #fff; background: var(--bg-surface); margin-bottom: 0;" placeholder="Escribe tu hábito de cuerpo...">
        </div>

        <!-- PILAR 2: MENTE -->
        <div style="margin-bottom: 12px; border-left: 3px solid var(--pilar-mente); padding-left: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label style="font-size: 0.84rem; font-weight: 700; color: var(--pilar-mente-light);">📜 2. MENTE (Nutrición Intelectual)</label>
          </div>
          <div style="font-size: 0.72rem; color: var(--text-secondary); margin: 2px 0 6px 0;">
            <strong>Propósito:</strong> Alimentar el intelecto con conocimiento útil en vez de chatarra digital. En el Yermo: decodificar planos y manuales.
          </div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
            <button type="button" class="chip-sug" data-target="input-pilar-mente" data-val="Leer 10 páginas de un libro">Leer 10 págs libro</button>
            <button type="button" class="chip-sug" data-target="input-pilar-mente" data-val="Estudiar lección de idioma / curso">Estudiar idioma/curso</button>
            <button type="button" class="chip-sug" data-target="input-pilar-mente" data-val="Escuchar podcast / audio educativo">Podcast educativo</button>
          </div>
          <input type="text" id="input-pilar-mente" class="card-yermo" style="width: 100%; padding: 6px 8px; color: #fff; background: var(--bg-surface); margin-bottom: 0;" placeholder="Escribe tu hábito de mente...">
        </div>

        <!-- PILAR 3: ESPÍRITU -->
        <div style="margin-bottom: 12px; border-left: 3px solid var(--pilar-espiritu); padding-left: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label style="font-size: 0.84rem; font-weight: 700; color: var(--pilar-espiritu-light);">🔥 3. ESPÍRITU (Calma y Desconexión)</label>
          </div>
          <div style="font-size: 0.72rem; color: var(--text-secondary); margin: 2px 0 6px 0;">
            <strong>Propósito:</strong> Soltar el teléfono, salir del ruido de la rutina y reconectar con la calma interior. En el Yermo: cuidar el fuego del refugio.
          </div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
            <button type="button" class="chip-sug" data-target="input-pilar-espiritu" data-val="Oración sincera y gratitud">Oración y gratitud</button>
            <button type="button" class="chip-sug" data-target="input-pilar-espiritu" data-val="5 min respiración consciente / silencio">5 min respiración/silencio</button>
            <button type="button" class="chip-sug" data-target="input-pilar-espiritu" data-val="Escribir en diario sin pantallas">Escribir en diario</button>
          </div>
          <input type="text" id="input-pilar-espiritu" class="card-yermo" style="width: 100%; padding: 6px 8px; color: #fff; background: var(--bg-surface); margin-bottom: 0;" placeholder="Escribe tu hábito de espíritu...">
        </div>

        <!-- PILAR 4: TALLER -->
        <div style="margin-bottom: 16px; border-left: 3px solid var(--pilar-taller); padding-left: 10px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <label style="font-size: 0.84rem; font-weight: 700; color: var(--pilar-taller-light);">🛠️ 4. TALLER (Labor Manual y Cuidado)</label>
          </div>
          <div style="font-size: 0.72rem; color: var(--text-secondary); margin: 2px 0 6px 0;">
            <strong>Propósito:</strong> Usar tus manos para ordenar, reparar, crear o cuidar algo en tu mundo físico real. En el Yermo: forja y mantenimiento.
          </div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
            <button type="button" class="chip-sug" data-target="input-pilar-taller" data-val="Regar las plantas / cuidar jardín">Regar plantas/jardín</button>
            <button type="button" class="chip-sug" data-target="input-pilar-taller" data-val="Bañar o cepillar a mi mascota">Cuidar a mi mascota</button>
            <button type="button" class="chip-sug" data-target="input-pilar-taller" data-val="Dibujar / practicar instrumento">Dibujar / Instrumento</button>
            <button type="button" class="chip-sug" data-target="input-pilar-taller" data-val="Limpieza profunda de un área">Limpieza profunda</button>
            <button type="button" class="chip-sug" data-target="input-pilar-taller" data-val="Reparar o arreglar algo en casa">Reparar algo roto</button>
          </div>
          <input type="text" id="input-pilar-taller" class="card-yermo" style="width: 100%; padding: 6px 8px; color: #fff; background: var(--bg-surface); margin-bottom: 0;" placeholder="Escribe tu labor manual...">
        </div>

        <button id="btn-onb-guardar-todo" class="btn-yermo-primary" style="width: 100%; padding: 12px; font-size: 0.92rem;">
          🔥 Reclamar Punto Cero y Comenzar
        </button>
      </div>
    `;

    // Vincular chips de sugerencias
    modalContent.querySelectorAll('.chip-sug').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const val = btn.getAttribute('data-val');
        const input = modalContent.querySelector(`#${targetId}`);
        if (input) {
          input.value = val;
          input.focus();
        }
      });
    });

    modalContent.querySelector('#btn-onb-guardar-todo').addEventListener('click', async () => {
      const hCuerpo = modalContent.querySelector('#input-pilar-cuerpo').value.trim() || 'Caminar 25 min al aire libre';
      const hMente = modalContent.querySelector('#input-pilar-mente').value.trim() || 'Leer 10 páginas de un libro';
      const hEspiritu = modalContent.querySelector('#input-pilar-espiritu').value.trim() || 'Oración sincera y gratitud';
      const hTaller = modalContent.querySelector('#input-pilar-taller').value.trim() || 'Regar las plantas / cuidar jardín';

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
