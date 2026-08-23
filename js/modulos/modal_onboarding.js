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
          REGISTRO DE TRANSMISIÓN &bull; AÑO 3
        </div>

        <h2 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin-bottom: 2px;">
          El Yermo no Perdona la Desidia
        </h2>
        <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 12px;">
          Bienvenido a UPROTA &bull; Eres el Protagonista de tu Propia Historia
        </div>

        <div style="background: rgba(0, 0, 0, 0.4); border-left: 3px solid var(--accent-rust); padding: 12px 14px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 14px;">
          <p>
            La civilización colapsó por múltiples motivos: sequías interminables, apagones globales y el silencio de las ciudades. Cada persona quedó por su cuenta, sobreviviendo desde su propio refugio.
          </p>
          <p style="margin-top: 8px; font-weight: 700; color: #fed7aa;">
            En este mundo, tu vida diaria real es tu fortaleza:
          </p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 18px; font-size: 0.82rem;">
          <div style="display: flex; align-items: center; gap: 8px; background: var(--bg-surface); padding: 8px 10px; border-radius: var(--radius-sm); border-left: 3px solid var(--pilar-taller);">
            <span>🍽️</span>
            <span><strong>Lavar los platos</strong> es <em>purificar utensilios</em> del refugio.</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; background: var(--bg-surface); padding: 8px 10px; border-radius: var(--radius-sm); border-left: 3px solid var(--pilar-cuerpo);">
            <span>🏃</span>
            <span><strong>Hacer ejercicio</strong> es <em>patrullar tu perímetro</em> y generar energía.</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; background: var(--bg-surface); padding: 8px 10px; border-radius: var(--radius-sm); border-left: 3px solid var(--pilar-mente);">
            <span>📜</span>
            <span><strong>Estudiar o leer</strong> es <em>decodificar planos</em> de supervivencia.</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; background: var(--bg-surface); padding: 8px 10px; border-radius: var(--radius-sm); border-left: 3px solid var(--pilar-espiritu);">
            <span>🔥</span>
            <span><strong>Orar o meditar</strong> es <em>cuidar el fuego interior</em> y la calma.</span>
          </div>
        </div>

        <button id="btn-onb-ir-paso-2" class="btn-yermo-primary" style="width: 100%; padding: 12px; font-size: 0.92rem;">
          Entendido &bull; Trazar Mis 4 Sendas Iniciales ➔
        </button>
      </div>
    `;

    modalContent.querySelector('#btn-onb-ir-paso-2').addEventListener('click', () => {
      estadoApp.datos.perfil.nombre = 'Prota';
      estadoApp.datos.perfil.ciudad = 'El Yermo';
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
          Para que ninguna dimensión quede abandonada, define 1 hábito real para cada pilar. Toca un ejemplo o escribe el tuyo.
        </p>

        <!-- PILAR 1: CUERPO -->
        <div style="margin-bottom: 12px; border-left: 3px solid var(--pilar-cuerpo); padding-left: 10px;">
          <label style="font-size: 0.84rem; font-weight: 700; color: var(--pilar-cuerpo-light);">🏃 1. CUERPO (Salud y Energía)</label>
          <div style="font-size: 0.72rem; color: var(--text-secondary); margin: 2px 0 6px 0;">
            <strong>Propósito:</strong> Sacudirte el sedentarismo y generar energía física.
          </div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
            <button type="button" class="chip-sug" data-target="input-pilar-cuerpo" data-val="Caminar 25 min al aire libre">Caminar 25 min</button>
            <button type="button" class="chip-sug" data-target="input-pilar-cuerpo" data-val="15 Flexiones y estiramientos">15 Flexiones</button>
            <button type="button" class="chip-sug" data-target="input-pilar-cuerpo" data-val="Trotar o andar en bicicleta">Trotar / Bici</button>
            <button type="button" class="btn-toggle-mas" data-target-extra="extra-cuerpo">+ Más</button>
          </div>
          <div id="extra-cuerpo" class="extra-chips-box hidden" style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
            <button type="button" class="chip-sug" data-target="input-pilar-cuerpo" data-val="Subir escaleras sin ascensor">Subir escaleras</button>
            <button type="button" class="chip-sug" data-target="input-pilar-cuerpo" data-val="Tomar 2L de agua pura hoy">Beber 2L agua</button>
            <button type="button" class="chip-sug" data-target="input-pilar-cuerpo" data-val="30 min de entrenamiento con pesas">Pesas / Gym</button>
          </div>
          <input type="text" id="input-pilar-cuerpo" class="card-yermo" style="width: 100%; padding: 6px 8px; color: #fff; background: var(--bg-surface); margin-bottom: 0;" placeholder="Escribe tu hábito de cuerpo...">
        </div>

        <!-- PILAR 2: MENTE -->
        <div style="margin-bottom: 12px; border-left: 3px solid var(--pilar-mente); padding-left: 10px;">
          <label style="font-size: 0.84rem; font-weight: 700; color: var(--pilar-mente-light);">📜 2. MENTE (Nutrición Intelectual)</label>
          <div style="font-size: 0.72rem; color: var(--text-secondary); margin: 2px 0 6px 0;">
            <strong>Propósito:</strong> Alimentar el intelecto con conocimiento útil.
          </div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
            <button type="button" class="chip-sug" data-target="input-pilar-mente" data-val="Leer 10 páginas de un libro">Leer 10 págs libro</button>
            <button type="button" class="chip-sug" data-target="input-pilar-mente" data-val="Estudiar lección de idioma">Estudiar idioma</button>
            <button type="button" class="chip-sug" data-target="input-pilar-mente" data-val="Escuchar podcast educativo">Podcast educativo</button>
            <button type="button" class="btn-toggle-mas" data-target-extra="extra-mente">+ Más</button>
          </div>
          <div id="extra-mente" class="extra-chips-box hidden" style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
            <button type="button" class="chip-sug" data-target="input-pilar-mente" data-val="Tomar notas de un curso técnico">Curso técnico</button>
            <button type="button" class="chip-sug" data-target="input-pilar-mente" data-val="Avanzar 20 min en programación">Estudiar código</button>
            <button type="button" class="chip-sug" data-target="input-pilar-mente" data-val="Partida de ajedrez / lógica">Ajedrez / Lógica</button>
          </div>
          <input type="text" id="input-pilar-mente" class="card-yermo" style="width: 100%; padding: 6px 8px; color: #fff; background: var(--bg-surface); margin-bottom: 0;" placeholder="Escribe tu hábito de mente...">
        </div>

        <!-- PILAR 3: ESPÍRITU -->
        <div style="margin-bottom: 12px; border-left: 3px solid var(--pilar-espiritu); padding-left: 10px;">
          <label style="font-size: 0.84rem; font-weight: 700; color: var(--pilar-espiritu-light);">🔥 3. ESPÍRITU (Calma y Desconexión)</label>
          <div style="font-size: 0.72rem; color: var(--text-secondary); margin: 2px 0 6px 0;">
            <strong>Propósito:</strong> Soltar el teléfono y reconectar con la calma interior.
          </div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
            <button type="button" class="chip-sug" data-target="input-pilar-espiritu" data-val="Oración sincera y gratitud">Oración y gratitud</button>
            <button type="button" class="chip-sug" data-target="input-pilar-espiritu" data-val="5 min respiración consciente">5 min respiración</button>
            <button type="button" class="chip-sug" data-target="input-pilar-espiritu" data-val="Escribir en diario sin pantallas">Escribir en diario</button>
            <button type="button" class="btn-toggle-mas" data-target-extra="extra-espiritu">+ Más</button>
          </div>
          <div id="extra-espiritu" class="extra-chips-box hidden" style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
            <button type="button" class="chip-sug" data-target="input-pilar-espiritu" data-val="Caminata en silencio sin audífonos">Caminata en silencio</button>
            <button type="button" class="chip-sug" data-target="input-pilar-espiritu" data-val="Tomar café/té con calma sin pantalla">Café sin teléfono</button>
            <button type="button" class="chip-sug" data-target="input-pilar-espiritu" data-val="Contemplar el cielo al atardecer">Contemplar atardecer</button>
          </div>
          <input type="text" id="input-pilar-espiritu" class="card-yermo" style="width: 100%; padding: 6px 8px; color: #fff; background: var(--bg-surface); margin-bottom: 0;" placeholder="Escribe tu hábito de espíritu...">
        </div>

        <!-- PILAR 4: TALLER -->
        <div style="margin-bottom: 16px; border-left: 3px solid var(--pilar-taller); padding-left: 10px;">
          <label style="font-size: 0.84rem; font-weight: 700; color: var(--pilar-taller-light);">🛠️ 4. TALLER (Labor Manual y Cuidado)</label>
          <div style="font-size: 0.72rem; color: var(--text-secondary); margin: 2px 0 6px 0;">
            <strong>Propósito:</strong> Usar tus manos para ordenar, reparar o cuidar algo real.
          </div>
          <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
            <button type="button" class="chip-sug" data-target="input-pilar-taller" data-val="Regar las plantas / cuidar jardín">Regar plantas/jardín</button>
            <button type="button" class="chip-sug" data-target="input-pilar-taller" data-val="Bañar o cepillar a mi mascota">Cuidar mascota</button>
            <button type="button" class="chip-sug" data-target="input-pilar-taller" data-val="Dibujar / practicar instrumento">Dibujar / Música</button>
            <button type="button" class="btn-toggle-mas" data-target-extra="extra-taller">+ Más</button>
          </div>
          <div id="extra-taller" class="extra-chips-box hidden" style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
            <button type="button" class="chip-sug" data-target="input-pilar-taller" data-val="Limpieza profunda de cocina/cuarto">Limpieza profunda</button>
            <button type="button" class="chip-sug" data-target="input-pilar-taller" data-val="Reparar o ajustar algo roto en casa">Reparar algo roto</button>
            <button type="button" class="chip-sug" data-target="input-pilar-taller" data-val="Cocinar comida fresca desde cero">Cocinar desde cero</button>
          </div>
          <input type="text" id="input-pilar-taller" class="card-yermo" style="width: 100%; padding: 6px 8px; color: #fff; background: var(--bg-surface); margin-bottom: 0;" placeholder="Escribe tu labor manual...">
        </div>

        <button id="btn-onb-ir-paso-3" class="btn-yermo-primary" style="width: 100%; padding: 12px; font-size: 0.92rem;">
          Siguiente: Atar 2 Cadenas Iniciales ➔
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

    // Botones + Más
    modalContent.querySelectorAll('.btn-toggle-mas').forEach(btn => {
      btn.addEventListener('click', () => {
        const extraId = btn.getAttribute('data-target-extra');
        const box = modalContent.querySelector(`#${extraId}`);
        if (box) {
          box.classList.toggle('hidden');
          btn.textContent = box.classList.contains('hidden') ? '+ Más' : '− Menos';
        }
      });
    });

    modalContent.querySelector('#btn-onb-ir-paso-3').addEventListener('click', () => {
      const hCuerpo = modalContent.querySelector('#input-pilar-cuerpo').value.trim() || 'Caminar 25 min al aire libre';
      const hMente = modalContent.querySelector('#input-pilar-mente').value.trim() || 'Leer 10 páginas de un libro';
      const hEspiritu = modalContent.querySelector('#input-pilar-espiritu').value.trim() || 'Oración sincera y gratitud';
      const hTaller = modalContent.querySelector('#input-pilar-taller').value.trim() || 'Regar las plantas / cuidar jardín';

      const sendasConfig = [
        { nombre: hCuerpo, pilar: 'cuerpo' },
        { nombre: hMente, pilar: 'mente' },
        { nombre: hEspiritu, pilar: 'espiritu' },
        { nombre: hTaller, pilar: 'taller' }
      ];

      this.abrirPaso3(sendasConfig);
    });
  }

  static abrirPaso3(sendasConfig) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="onboarding-wrap">
        <h3 style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 2px;">
          ⛓️ Atar 2 Cadenas (Malos Hábitos a Romper)
        </h3>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 14px; line-height: 1.4;">
          Una <strong>Cadena</strong> representa un hábito negativo que drena tu energía y deseas erradicar de tu vida real. Necesitas <strong>21 días continuos</strong> sin recaer para romper cada una.
        </p>

        <!-- CADENA 1 -->
        <div style="margin-bottom: 14px; border-left: 3px solid #ef4444; padding-left: 10px;">
          <label style="font-size: 0.84rem; font-weight: 700; color: #fca5a5;">⛓️ 1. Primera Cadena a Romper:</label>
          <div style="display: flex; gap: 4px; flex-wrap: wrap; margin: 6px 0;">
            <button type="button" class="chip-sug" data-target="input-cadena-1" data-val="Desvelarme con el teléfono en la cama">Desvelarme con teléfono</button>
            <button type="button" class="chip-sug" data-target="input-cadena-1" data-val="Fumar cigarrillos o vapear">Fumar / Vapear</button>
            <button type="button" class="chip-sug" data-target="input-cadena-1" data-val="Tomar refrescos dulces / gaseosas">Tomar refrescos</button>
            <button type="button" class="btn-toggle-mas" data-target-extra="extra-cadena-1">+ Más</button>
          </div>
          <div id="extra-cadena-1" class="extra-chips-box hidden" style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
            <button type="button" class="chip-sug" data-target="input-cadena-1" data-val="Comer comida chatarra / ultraprocesados">Comida chatarra</button>
            <button type="button" class="chip-sug" data-target="input-cadena-1" data-val="Consumir pornografía / dopamina rápida">Pornografía</button>
            <button type="button" class="chip-sug" data-target="input-cadena-1" data-val="Alcohol / Bebidas embriagantes">Consumir alcohol</button>
          </div>
          <input type="text" id="input-cadena-1" class="card-yermo" style="width: 100%; padding: 6px 8px; color: #fff; background: var(--bg-surface); margin-bottom: 0;" placeholder="Escribe tu mal hábito...">
        </div>

        <!-- CADENA 2 -->
        <div style="margin-bottom: 18px; border-left: 3px solid #f97316; padding-left: 10px;">
          <label style="font-size: 0.84rem; font-weight: 700; color: #fdba74;">⛓️ 2. Segunda Cadena a Romper:</label>
          <div style="display: flex; gap: 4px; flex-wrap: wrap; margin: 6px 0;">
            <button type="button" class="chip-sug" data-target="input-cadena-2" data-val="Procrastinar y aplazar tareas difíciles">Procrastinar tareas</button>
            <button type="button" class="chip-sug" data-target="input-cadena-2" data-val="Ver redes sociales al despertar">Redes al despertar</button>
            <button type="button" class="chip-sug" data-target="input-cadena-2" data-val="Gastos impulsivos innecesarios">Gastos impulsivos</button>
            <button type="button" class="btn-toggle-mas" data-target-extra="extra-cadena-2">+ Más</button>
          </div>
          <div id="extra-cadena-2" class="extra-chips-box hidden" style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 6px;">
            <button type="button" class="chip-sug" data-target="input-cadena-2" data-val="Comer por ansiedad sin hambre">Comer por ansiedad</button>
            <button type="button" class="chip-sug" data-target="input-cadena-2" data-val="Quejarme sin proponer soluciones">Quejas continuas</button>
            <button type="button" class="chip-sug" data-target="input-cadena-2" data-val="Quedarme sentado más de 2 horas">Sedentarismo largo</button>
          </div>
          <input type="text" id="input-cadena-2" class="card-yermo" style="width: 100%; padding: 6px 8px; color: #fff; background: var(--bg-surface); margin-bottom: 0;" placeholder="Escribe tu segundo mal hábito...">
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

    // Botones + Más
    modalContent.querySelectorAll('.btn-toggle-mas').forEach(btn => {
      btn.addEventListener('click', () => {
        const extraId = btn.getAttribute('data-target-extra');
        const box = modalContent.querySelector(`#${extraId}`);
        if (box) {
          box.classList.toggle('hidden');
          btn.textContent = box.classList.contains('hidden') ? '+ Más' : '− Menos';
        }
      });
    });

    modalContent.querySelector('#btn-onb-guardar-todo').addEventListener('click', async () => {
      const c1 = modalContent.querySelector('#input-cadena-1').value.trim() || 'Desvelarme con el teléfono en la cama';
      const c2 = modalContent.querySelector('#input-cadena-2').value.trim() || 'Procrastinar y aplazar tareas difíciles';

      // Agregar las 4 sendas
      for (const s of sendasConfig) {
        await estadoApp.agregarSenda(s.nombre, s.pilar);
      }

      // Agregar las 2 cadenas
      await estadoApp.agregarCadena(c1);
      await estadoApp.agregarCadena(c2);

      estadoApp.datos.perfil.onboardingCompletado = true;
      await estadoApp.guardar();

      modalContainer.classList.add('hidden');
    });
  }
}
