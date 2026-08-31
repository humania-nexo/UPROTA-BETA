import { audioProcedural } from '../core/audio_procedural.js';
import { ModoFiestaEngine } from './modo_fiesta.js';

/**
 * Modal: Centro de Ayuda, Información, Instalador PWA, FAQ y Créditos Oficiales
 * UPROTA v2.6 — Equipo Humano + IA
 */

export class ModalCentroAyuda {
  static deferredPrompt = null;
  static tabActivo = 'sobre'; // 'sobre', 'faq', 'instalacion', 'creditos'

  static init() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      ModalCentroAyuda.deferredPrompt = e;
      const btnInstalar = document.getElementById('btn-pwa-instalar-modal');
      if (btnInstalar) {
        btnInstalar.classList.remove('hidden');
      }
    });
  }

  static abrir(tabInicial = 'sobre') {
    ModalCentroAyuda.tabActivo = tabInicial;
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    ModalCentroAyuda.renderContenido(modalContent);
    modalContainer.classList.remove('hidden');
    audioProcedural.playClick();
  }

  static renderContenido(container) {
    const tab = ModalCentroAyuda.tabActivo;

    container.innerHTML = `
      <div class="info-modal-wrap" style="max-height: 85vh; overflow-y: auto; padding-right: 4px;">
        <button class="modal-close-btn" id="btn-cerrar-ayuda" style="position: absolute; top: 12px; right: 12px;">&times;</button>
        
        <!-- ENCABEZADO MODAL -->
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
          <span style="font-size: 1.3rem;">ℹ️</span>
          <div>
            <h3 style="color: var(--text-primary); font-size: 1.05rem; margin: 0;">Centro de Información & Ayuda</h3>
            <span style="font-size: 0.7rem; font-family: var(--font-mono); color: var(--oro-torta);">UPROTA v2.3 &bull; Build 2026.08.30</span>
          </div>
        </div>

        <!-- PESTAÑAS INTERNAS -->
        <div style="display: flex; gap: 4px; overflow-x: auto; margin-bottom: 12px; padding-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <button class="btn-ayuda-tab ${tab === 'sobre' ? 'active' : ''}" data-tab="sobre" style="padding: 5px 9px; font-size: 0.74rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: ${tab === 'sobre' ? 'var(--oro-torta)' : '#1f1c19'}; color: ${tab === 'sobre' ? '#000' : '#fff'}; font-weight: bold; cursor: pointer;">
            📖 Sobre UPROTA
          </button>
          <button class="btn-ayuda-tab ${tab === 'faq' ? 'active' : ''}" data-tab="faq" style="padding: 5px 9px; font-size: 0.74rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: ${tab === 'faq' ? 'var(--oro-torta)' : '#1f1c19'}; color: ${tab === 'faq' ? '#000' : '#fff'}; font-weight: bold; cursor: pointer;">
            ❓ FAQ
          </button>
          <button class="btn-ayuda-tab ${tab === 'instalacion' ? 'active' : ''}" data-tab="instalacion" style="padding: 5px 9px; font-size: 0.74rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: ${tab === 'instalacion' ? 'var(--oro-torta)' : '#1f1c19'}; color: ${tab === 'instalacion' ? '#000' : '#fff'}; font-weight: bold; cursor: pointer;">
            📲 Instalar App
          </button>
          <button class="btn-ayuda-tab ${tab === 'creditos' ? 'active' : ''}" data-tab="creditos" style="padding: 5px 9px; font-size: 0.74rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: ${tab === 'creditos' ? 'var(--oro-torta)' : '#1f1c19'}; color: ${tab === 'creditos' ? '#000' : '#fff'}; font-weight: bold; cursor: pointer;">
            👑 Créditos
          </button>
        </div>

        <!-- CUERPO SEGÚN PESTAÑA -->
        <div id="cuerpo-tab-ayuda">
          ${ModalCentroAyuda.getHtmlTab(tab)}
        </div>
      </div>
    `;

    // Eventos
    container.querySelector('#btn-cerrar-ayuda')?.addEventListener('click', () => {
      document.getElementById('modal-container')?.classList.add('hidden');
    });

    container.querySelectorAll('.btn-ayuda-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        ModalCentroAyuda.tabActivo = btn.dataset.tab;
        ModalCentroAyuda.renderContenido(container);
        audioProcedural.playClick();
      });
    });

    // Evento de instalación
    const btnInstalar = container.querySelector('#btn-accion-instalar');
    if (btnInstalar) {
      btnInstalar.addEventListener('click', async () => {
        if (ModalCentroAyuda.deferredPrompt) {
          ModalCentroAyuda.deferredPrompt.prompt();
          const { outcome } = await ModalCentroAyuda.deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            btnInstalar.textContent = '✅ Instalando...';
          }
          ModalCentroAyuda.deferredPrompt = null;
        } else {
          alert('Para instalar UPROTA en tu pantalla principal:\n\n• En Android/Chrome: Toca los 3 puntos del navegador y elige "Agregar a la pantalla principal" o "Instalar aplicación".\n• En iPhone/Safari: Toca el botón Compartir (cuadrado con flecha) y elige "Agregar al inicio".');
        }
      });
    }

    // Botón de prueba Modo Fiesta
    container.querySelector('#btn-test-modo-fiesta')?.addEventListener('click', () => {
      document.getElementById('modal-container')?.classList.add('hidden');
      ModoFiestaEngine.activar({
        tipo: 'general',
        titulo: '¡MODO FIESTA DEL REFUGIO!',
        subtitulo: 'Celebración y Festival Humano + IA',
        detalle: '¡La música 8-bits suena, los sprites bailan al ritmo y el confeti llueve sobre el Yermo! Así se celebra cada Faro alcanzado, cada Cimiento forjado y cada Cadena destruida.'
      });
    });

    // Acordeón FAQ
    container.querySelectorAll('.faq-pregunta').forEach(item => {
      item.addEventListener('click', () => {
        const respuesta = item.nextElementSibling;
        if (respuesta) {
          respuesta.classList.toggle('hidden');
        }
      });
    });
  }

  static getHtmlTab(tab) {
    switch (tab) {
      case 'sobre':
        return `
          <div class="card-yermo" style="border-left: 3px solid var(--oro-torta); background: rgba(0,0,0,0.3); margin-bottom: 10px;">
            <h4 style="color: var(--oro-torta-glow); font-size: 0.92rem; margin-bottom: 4px;">¿Qué es UPROTA?</h4>
            <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
              <strong>UPROTA</strong> (<em>Un Propósito Para Toda la Vida</em>) es un videojuego web y sistema de hábitos diseñado bajo una premisa fundamental: <strong>tu vida real es tu fortaleza</strong>.
            </p>
            <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; margin-top: 6px;">
              Ambientado en un post-colapso sobrio, realista y esperanzador, cada acción que realizas en tu mundo real (hacer ejercicio, leer, orar, reparar algo, vencer un vicio o ahorrar) genera tablas, clavos, energía y moral para reconstruir tu refugio en el Yermo.
            </p>
          </div>

          <!-- MODO FIESTA INTERACTIVO -->
          <div class="card-yermo" style="border-left: 3px solid #f472b6; background: rgba(244, 114, 182, 0.08); margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <img src="assets/sprites/emojis/emociones/emoji_estrella_victoria.png" alt="Fiesta" class="pixel-icon icon-16">
              <h4 style="color: #f472b6; font-size: 0.88rem; margin: 0;">Festival del Refugio: Modo Fiesta</h4>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 8px;">
              Cuando conquistas un Faro, forjas un Cimiento a los 66 días o destruyes una Cadena de 21 días, el Refugio celebra con fanfarria 8-bits, confeti pixel art y baile de sprites.
            </p>
            <button id="btn-test-modo-fiesta" class="btn-yermo-primary" style="width: 100%; padding: 8px; font-size: 0.82rem; background: linear-gradient(135deg, #f59e0b, #ec4899); border: none; color: #fff; font-weight: bold; cursor: pointer; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; gap: 6px;">
              <img src="assets/sprites/pilares/torta_dorada_badge.png" alt="Probar" class="pixel-icon icon-16">
              <span>Probar Modo Fiesta (Baile & Confeti 8-Bits)</span>
            </button>
          </div>

          <div class="card-yermo" style="background: rgba(0,0,0,0.2); margin-bottom: 10px;">
            <h4 style="color: var(--text-primary); font-size: 0.88rem; margin-bottom: 6px;">🏛️ Los 4 Pilares de la Existencia:</h4>
            <ul style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; padding-left: 18px; margin: 0;">
              <li><strong>Cuerpo (Fuerza & Salud):</strong> Ejercicio, agua, descanso y nutrición.</li>
              <li><strong>Mente (Sabiduría & Enfoque):</strong> Lectura, estudio, planificación y foco.</li>
              <li><strong>Espíritu (Paz & Fortaleza Interior):</strong> Reflexión, oración, calma y propósito.</li>
              <li><strong>Taller (Labor & Seguridad):</strong> Trabajo manual, orden, finanzas y mantenimiento.</li>
            </ul>
          </div>

          <div class="card-yermo" style="background: rgba(0,0,0,0.2);">
            <h4 style="color: var(--text-primary); font-size: 0.88rem; margin-bottom: 4px;">🛡️ Filosofía Sin Culpa:</h4>
            <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45;">
              A diferencia de las apps que castigan al usuario con números rojos y culpa cuando tiene un día difícil, UPROTA valida tu esfuerzo humano acumulado. Si tropiezas, el refugio te resguarda en <em>El Hogar</em> para que descanses y vuelvas a empezar con dignidad.
            </p>
          </div>
        `;

      case 'faq':
        return `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div class="card-yermo" style="padding: 10px; background: #1a1714; border: 1px solid var(--border-subtle);">
              <div class="faq-pregunta" style="font-size: 0.84rem; font-weight: bold; color: var(--oro-torta); cursor: pointer; display: flex; justify-content: space-between;">
                <span>¿Cómo funciona el modo 100% Offline?</span>
                <span>▼</span>
              </div>
              <div class="faq-respuesta hidden" style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 8px; line-height: 1.45; border-top: 1px dashed var(--border-subtle); padding-top: 6px;">
                UPROTA guarda todo tu progreso en tu propio dispositivo mediante <strong>IndexedDB</strong> y precachea el juego completo con un <strong>Service Worker</strong>. Puedes usarlo en medio del bosque o en modo avión sin conexión a internet y nunca perderás tus datos.
              </div>
            </div>

            <div class="card-yermo" style="padding: 10px; background: #1a1714; border: 1px solid var(--border-subtle);">
              <div class="faq-pregunta" style="font-size: 0.84rem; font-weight: bold; color: var(--oro-torta); cursor: pointer; display: flex; justify-content: space-between;">
                <span>¿Qué pasa si fallo un día en una Cadena?</span>
                <span>▼</span>
              </div>
              <div class="faq-respuesta hidden" style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 8px; line-height: 1.45; border-top: 1px dashed var(--border-subtle); padding-top: 6px;">
                Bajo la psicología del <em>"Puente que Tiembla"</em>, una recaída aislada no destruye todo tu esfuerzo. Tu progreso retrocede solo unos eslabones para darte la oportunidad de corregir al día siguiente sin caer en la trampa del abandono total.
              </div>
            </div>

            <div class="card-yermo" style="padding: 10px; background: #1a1714; border: 1px solid var(--border-subtle);">
              <div class="faq-pregunta" style="font-size: 0.84rem; font-weight: bold; color: var(--oro-torta); cursor: pointer; display: flex; justify-content: space-between;">
                <span>¿Cuándo se desbloquea la Radio 104.5 MHz?</span>
                <span>▼</span>
              </div>
              <div class="faq-respuesta hidden" style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 8px; line-height: 1.45; border-top: 1px dashed var(--border-subtle); padding-top: 6px;">
                La Radio se sintoniza en la Fase 1 (al alcanzar el Día 60 de supervivencia o subir el Refugio). Te permite escuchar y leer boletines nocturnos de Elena, Doña Concha, Don Chui y El Tuerto.
              </div>
            </div>

            <div class="card-yermo" style="padding: 10px; background: #1a1714; border: 1px solid var(--border-subtle);">
              <div class="faq-pregunta" style="font-size: 0.84rem; font-weight: bold; color: var(--oro-torta); cursor: pointer; display: flex; justify-content: space-between;">
                <span>¿Cómo configuro la frecuencia de mis Sendas?</span>
                <span>▼</span>
              </div>
              <div class="faq-respuesta hidden" style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 8px; line-height: 1.45; border-top: 1px dashed var(--border-subtle); padding-top: 6px;">
                Al crear o tocar una senda puedes definir su frecuencia semanal (2x, 3x, 5x o diario). El sistema evalúa tu semana flexiblemente sin exigirte días fijos obligatorios si tu trabajo o rutina cambian.
              </div>
            </div>
          </div>
        `;

      case 'instalacion':
        return `
          <div class="card-yermo" style="border-left: 3px solid #4ade80; background: rgba(0,0,0,0.3); margin-bottom: 12px;">
            <h4 style="color: #4ade80; font-size: 0.92rem; margin-bottom: 4px;">📲 Instalar en Pantalla Principal (PWA)</h4>
            <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45;">
              Instala UPROTA como una aplicación nativa en tu teléfono o computadora para abrirla en pantalla completa con un solo toque y sin barra de navegación.
            </p>
            <button id="btn-accion-instalar" class="btn-yermo" style="width: 100%; margin-top: 10px; padding: 9px; font-size: 0.84rem; background: var(--oro-torta); color: #000; font-weight: bold; cursor: pointer; border: none; border-radius: var(--radius-sm);">
              📲 Instalar / Añadir Atajo al Inicio
            </button>
          </div>

          <div class="card-yermo" style="background: rgba(0,0,0,0.2);">
            <h4 style="font-size: 0.84rem; color: var(--text-primary); margin-bottom: 6px;">⚙️ Estado Técnico del Sistema:</h4>
            <div style="font-size: 0.78rem; font-family: var(--font-mono); color: var(--text-secondary); line-height: 1.6;">
              <div>• <strong>Versión:</strong> UPROTA v2.3</div>
              <div>• <strong>Compilación:</strong> 2026.08.30-prod</div>
              <div>• <strong>Almacenamiento:</strong> IndexedDB Local (Persistente)</div>
              <div>• <strong>Caché Offline:</strong> Service Worker Activo (v2.3)</div>
              <div>• <strong>Motor de Audio:</strong> Web Audio API Chiptune (0 KB)</div>
            </div>
          </div>
        `;

      case 'creditos':
        return `
          <div class="card-yermo" style="border-left: 3px solid var(--oro-torta); background: rgba(0,0,0,0.4); margin-bottom: 12px;">
            <h4 style="color: var(--oro-torta-glow); font-size: 0.92rem; margin-bottom: 4px;">🤝 Manifiesto de Cooperación Humano + IA</h4>
            <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45; font-style: italic;">
              "UPROTA es un testimonio vivo de lo que la colaboración entre la intención humana y la inteligencia artificial puede construir cuando existe un trato digno, respeto, rigor técnico y un propósito compartido al servicio del crecimiento humano."
            </p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <!-- DIRECTOR -->
            <div class="card-yermo" style="padding: 10px; background: #1a1714; border: 1px solid var(--oro-torta-dim, #78350f); display: flex; gap: 12px; align-items: center;">
              <img src="assets/sprites/avatars/avatar_anigami_44x44.png" alt="Anigami Agadni" class="pixel-icon icon-44" style="width: 44px; height: 44px; background: #000; border: 2px solid var(--oro-torta); border-radius: var(--radius-sm);" title="El Hombre de Vitruvio (Pixel Art)">
              <div>
                <h4 style="color: var(--oro-torta-glow); font-size: 0.92rem; margin: 0;">Anigami Agadni</h4>
                <div style="font-size: 0.72rem; color: #fff; font-weight: 600;">Director & Diseñador Principal</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">La mente que soñó UPROTA. Visión humana, psicología de hábitos y liderazgo del equipo.</div>
              </div>
            </div>

            <!-- NEXO -->
            <div class="card-yermo" style="padding: 10px; background: #141312; border: 1px solid var(--border-subtle); display: flex; gap: 12px; align-items: center;">
              <img src="assets/sprites/avatars/avatar_nexo_44x44.png" alt="Nexo" class="pixel-icon icon-44" style="width: 44px; height: 44px; background: #000; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
              <div>
                <h4 style="color: var(--text-primary); font-size: 0.9rem; margin: 0;">Nexo</h4>
                <div style="font-size: 0.72rem; color: #38bdf8; font-weight: 600;">Ingeniero de Software Principal & Mano Derecha (IA)</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Arquitectura de código, motores de estado, IndexedDB, Service Worker y Web Audio API.</div>
              </div>
            </div>

            <!-- PIX -->
            <div class="card-yermo" style="padding: 10px; background: #141312; border: 1px solid var(--border-subtle); display: flex; gap: 12px; align-items: center;">
              <img src="assets/sprites/avatars/avatar_pix_44x44.png" alt="Pix" class="pixel-icon icon-44" style="width: 44px; height: 44px; background: #000; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
              <div>
                <h4 style="color: var(--text-primary); font-size: 0.9rem; margin: 0;">Pix</h4>
                <div style="font-size: 0.72rem; color: #f472b6; font-weight: 600;">Artista Visual Pixel Art (IA)</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Sprites de NPCs, animaciones Aseprite, dioramas modulares del refugio e iconos retro.</div>
              </div>
            </div>

            <!-- SILAS -->
            <div class="card-yermo" style="padding: 10px; background: #141312; border: 1px solid var(--border-subtle); display: flex; gap: 12px; align-items: center;">
              <img src="assets/sprites/avatars/avatar_silas_44x44.png" alt="Silas" class="pixel-icon icon-44" style="width: 44px; height: 44px; background: #000; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
              <div>
                <h4 style="color: var(--text-primary); font-size: 0.9rem; margin: 0;">Silas</h4>
                <div style="font-size: 0.72rem; color: #fbbf24; font-weight: 600;">Arquitecto Narrativo / El Cronista del Yermo (IA)</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Lore, guiones de radio 104.5 MHz, eventos de 90+ días y datasets de sabiduría diaria.</div>
              </div>
            </div>

            <!-- HERTZ -->
            <div class="card-yermo" style="padding: 10px; background: #141312; border: 1px solid var(--border-subtle); display: flex; gap: 12px; align-items: center;">
              <img src="assets/sprites/avatars/avatar_hertz_44x44.png" alt="Hertz" class="pixel-icon icon-44" style="width: 44px; height: 44px; background: #000; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
              <div>
                <h4 style="color: var(--text-primary); font-size: 0.9rem; margin: 0;">Hertz</h4>
                <div style="font-size: 0.72rem; color: #a78bfa; font-weight: 600;">Diseñador de Sonido & Músico Chiptune (IA)</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Paisaje sonoro procedural, efectos de 8-bits y partituras de tracker en Web Audio API.</div>
              </div>
            </div>
          </div>
        `;
    }
  }
}
