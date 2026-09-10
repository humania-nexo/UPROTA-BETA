/**
 * Archivo Principal de Entrada (Bootstrap y Orquestación) — UPROTA v3.4
 */

import { estadoApp } from './core/estado.js';
import { audioProcedural } from './core/audio_procedural.js';
import { VistaTablon } from './modulos/vista_tablon.js';
import { VistaRefugio } from './modulos/vista_refugio.js';
import { VistaMisiones } from './modulos/vista_misiones.js';
import { VistaComunicacion } from './modulos/vista_comunicacion.js';
import { VistaHogar } from './modulos/vista_hogar.js';
import { ModalSabiduria, TourGuiado, ModalBitacoraMatutina } from './modulos/modal_sabiduria.js';
import { ModalOnboarding } from './modulos/modal_onboarding.js';
import { ModalCentroAyuda } from './modulos/modal_centro_ayuda.js';

class App {
  constructor() {
    this.tabActual = 'tablon';
    this.vistas = {};
  }

  async iniciar() {
    console.log('Iniciando UPROTA v3.4...');

    // Inicializar listener de instalación PWA
    ModalCentroAyuda.init();

    // Instanciar vistas
    this.vistas = {
      tablon: new VistaTablon(document.getElementById('vista-tablon')),
      refugio: new VistaRefugio(document.getElementById('vista-refugio')),
      misiones: new VistaMisiones(document.getElementById('vista-misiones')),
      comunicacion: new VistaComunicacion(document.getElementById('vista-comunicacion')),
      hogar: new VistaHogar(document.getElementById('vista-hogar'))
    };

    // Exponer app globalmente
    window.app = this;

    // Vincular navegación
    this.vincularNavegacion();

    // Inicializar IndexedDB y suscribir vistas al estado central
    await estadoApp.inicializar();
    estadoApp.suscribir((estado) => this.actualizarVistas(estado));

    // 1. Abrir Onboarding si es la primera vez
    ModalOnboarding.mostrarSiEsNecesario();

    // 2. Abrir Bitácora Matutina si cambió de día real
    ModalBitacoraMatutina.mostrarSiCorresponde();

    // 3. Abrir Versículo / Sabiduría Diaria
    ModalSabiduria.mostrarSiCorresponde();

    // 4. Verificar si corresponde el Tour Guiado
    TourGuiado.verificarYIniciar();

    // Registrar Service Worker
    this.registrarServiceWorker();
  }

  vincularNavegacion() {
    const botones = document.querySelectorAll('[data-tab]');
    botones.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');
        this.cambiarTab(tab);
      });
    });

    const btnHogarTop = document.getElementById('btn-ir-hogar-top');
    if (btnHogarTop) {
      btnHogarTop.addEventListener('click', () => this.cambiarTab('hogar'));
    }

    const btnAmbiente = document.getElementById('btn-ambiente-top');
    if (btnAmbiente) {
      btnAmbiente.addEventListener('click', () => {
        this.mostrarModalAmbienteSonoro();
      });
    }

    const btnCentroAyuda = document.getElementById('btn-centro-ayuda');
    if (btnCentroAyuda) {
      btnCentroAyuda.addEventListener('click', () => {
        ModalCentroAyuda.abrir('sobre');
      });
    }

    const btnGuia = document.getElementById('btn-abrir-guia');
    if (btnGuia) {
      btnGuia.addEventListener('click', () => {
        TourGuiado.iniciar();
      });
    }
  }

  mostrarModalAmbienteSonoro() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    const activo = audioProcedural.isAmbienteActivo();

    modalContent.innerHTML = `
      <div class="info-modal-wrap" style="text-align: left; padding: 18px 14px;">
        <button class="modal-close-btn" id="btn-cerrar-modal-ambiente" style="position: absolute; top: 12px; right: 12px;">&times;</button>
        
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <img src="assets/sprites/emojis/emociones/emoji_fuego_ardiente.png" alt="Ambiente" class="pixel-icon icon-24">
          <h3 style="color: var(--oro-torta-glow); font-size: 1.05rem; margin: 0;">Paisajes Sonoros de Enfoque (0 KB)</h3>
        </div>
        <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 12px;">
          Sintetizados en tiempo real mediante Web Audio API para aislarte del ruido, concentrarte al estudiar/trabajar o calmar la mente antes de dormir.
        </p>

        <!-- SELECCIÓN DE PAISAJE -->
        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px;">
          <button class="btn-ambiente-card" data-tipo="fogon" style="display: flex; align-items: center; gap: 10px; padding: 10px; background: ${activo === 'fogon' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(0,0,0,0.4)'}; border: 1px solid ${activo === 'fogon' ? '#f59e0b' : 'var(--border-subtle)'}; border-radius: var(--radius-sm); color: #fff; cursor: pointer; text-align: left; width: 100%;">
            <span style="font-size: 1.4rem;">🪵</span>
            <div>
              <strong style="font-size: 0.84rem; color: #fef08a; display: block;">El Fogón de Mezquite</strong>
              <span style="font-size: 0.72rem; color: var(--text-muted);">Zumbido térmico cálido y crepitar estocástico de brasas.</span>
            </div>
          </button>

          <button class="btn-ambiente-card" data-tipo="lluvia" style="display: flex; align-items: center; gap: 10px; padding: 10px; background: ${activo === 'lluvia' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(0,0,0,0.4)'}; border: 1px solid ${activo === 'lluvia' ? '#38bdf8' : 'var(--border-subtle)'}; border-radius: var(--radius-sm); color: #fff; cursor: pointer; text-align: left; width: 100%;">
            <span style="font-size: 1.4rem;">🌧️</span>
            <div>
              <strong style="font-size: 0.84rem; color: #bae6fd; display: block;">Lluvia en Techo de Lámina</strong>
              <span style="font-size: 0.72rem; color: var(--text-muted);">Cortina continua y gotas suaves amortiguadas.</span>
            </div>
          </button>

          <button class="btn-ambiente-card" data-tipo="radio_portadora" style="display: flex; align-items: center; gap: 10px; padding: 10px; background: ${activo === 'radio_portadora' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(0,0,0,0.4)'}; border: 1px solid ${activo === 'radio_portadora' ? '#a855f7' : 'var(--border-subtle)'}; border-radius: var(--radius-sm); color: #fff; cursor: pointer; text-align: left; width: 100%;">
            <span style="font-size: 1.4rem;">📻</span>
            <div>
              <strong style="font-size: 0.84rem; color: #e9d5ff; display: block;">Portadora Calma 104.5 MHz</strong>
              <span style="font-size: 0.72rem; color: var(--text-muted);">Zumbido analógico de onda corta y aislamiento total.</span>
            </div>
          </button>
        </div>

        <!-- TEMPORIZADOR POMODORO -->
        <div style="margin-bottom: 14px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: var(--radius-sm);">
          <label style="font-size: 0.74rem; color: var(--text-secondary); display: block; margin-bottom: 6px;">
            ⏱️ Temporizador de Apagado Automático:
          </label>
          <div style="display: flex; gap: 6px;">
            <button class="btn-timer-opt" data-min="0" style="flex: 1; padding: 6px 4px; font-size: 0.72rem; background: var(--bg-surface); border: 1px solid var(--oro-torta); color: #fff; border-radius: var(--radius-sm); cursor: pointer;">Continuo</button>
            <button class="btn-timer-opt" data-min="25" style="flex: 1; padding: 6px 4px; font-size: 0.72rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); color: #fff; border-radius: var(--radius-sm); cursor: pointer;">25 min (Pomodoro)</button>
            <button class="btn-timer-opt" data-min="45" style="flex: 1; padding: 6px 4px; font-size: 0.72rem; background: var(--bg-surface); border: 1px solid var(--border-subtle); color: #fff; border-radius: var(--radius-sm); cursor: pointer;">45 min (Estudio)</button>
          </div>
        </div>

        ${activo ? `
          <button id="btn-detener-ambiente" class="btn-yermo-secondary" style="width: 100%; padding: 10px; font-size: 0.82rem; border-color: #ef4444; color: #fca5a5; font-weight: bold; cursor: pointer; border-radius: var(--radius-sm);">
            ⏹️ Detener Paisaje Sonoro
          </button>
        ` : ''}
      </div>
    `;

    modalContainer.classList.remove('hidden');

    let duracionSeleccionada = 0;

    modalContent.querySelectorAll('.btn-timer-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        modalContent.querySelectorAll('.btn-timer-opt').forEach(b => b.style.borderColor = 'var(--border-subtle)');
        btn.style.borderColor = 'var(--oro-torta)';
        duracionSeleccionada = parseInt(btn.dataset.min || '0', 10);
      });
    });

    modalContent.querySelectorAll('.btn-ambiente-card').forEach(card => {
      card.addEventListener('click', () => {
        const tipo = card.dataset.tipo;
        audioProcedural.startAmbienteProcedural(tipo, duracionSeleccionada);
        modalContainer.classList.add('hidden');
        audioProcedural.playClick();
      });
    });

    modalContent.querySelector('#btn-detener-ambiente')?.addEventListener('click', () => {
      audioProcedural.stopAmbienteProcedural();
      modalContainer.classList.add('hidden');
    });

    modalContent.querySelector('#btn-cerrar-modal-ambiente')?.addEventListener('click', () => {
      modalContainer.classList.add('hidden');
      audioProcedural.playClick();
    });
  }

  cambiarTab(nuevoTab) {
    this.tabActual = nuevoTab;

    // Actualizar botones inferiores
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === nuevoTab);
    });

    // Actualizar paneles visibles
    document.querySelectorAll('.vista-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const panelActivo = document.getElementById(`vista-${nuevoTab}`);
    if (panelActivo) {
      panelActivo.classList.add('active');
      if (this.vistas[nuevoTab]) {
        this.vistas[nuevoTab].render(estadoApp.datos);
      }
    }
  }

  actualizarVistas(estado) {
    // Actualizar barra de cabecera
    const nombreElem = document.getElementById('header-prota-nombre');
    const nivelElem = document.getElementById('header-refugio-nivel');
    if (nombreElem) nombreElem.textContent = estado.perfil.nombre;
    if (nivelElem) nivelElem.textContent = `Nivel ${estado.nivelRefugio} - ${estadoApp.infoNivelRefugio.nombre}`;

    // Actualizar chips de recursos
    const resTablas = document.getElementById('res-tablas');
    const resClavos = document.getElementById('res-clavos');
    const resProv = document.getElementById('res-provisiones');
    const resAgua = document.getElementById('res-agua');
    if (resTablas) resTablas.textContent = estado.recursos.tablas;
    if (resClavos) resClavos.textContent = estado.recursos.clavos;
    if (resProv) resProv.textContent = estado.recursos.provisiones;
    if (resAgua) resAgua.textContent = `${estado.recursos.aguaLitros}L`;

    // Visibilidad dinámica de pestañas (Sin spoilers)
    const btnRadio = document.getElementById('nav-btn-radio');
    if (btnRadio) {
      btnRadio.classList.toggle('hidden', (estado.comunicacion?.fase || 0) < 1);
    }

    const btnHogarTop = document.getElementById('btn-ir-hogar-top');
    const btnHogarNav = document.getElementById('nav-btn-hogar');
    const mostrarHogar = !!estado.hogarDesbloqueado;
    if (btnHogarTop) btnHogarTop.classList.toggle('hidden', !mostrarHogar);
    if (btnHogarNav) btnHogarNav.classList.toggle('hidden', !mostrarHogar);

    // Renderizar vista actual activa
    if (this.vistas[this.tabActual]) {
      this.vistas[this.tabActual].render(estado);
    }
  }

  registrarServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('Service Worker de UPROTA registrado con éxito.'))
        .catch(err => console.warn('Fallo al registrar Service Worker:', err));
    }

    // Exponer herramientas de prueba para el equipo y el Director
    window.UPROTA_TEST = {
      avanzarDias: async (n = 1) => {
        estadoApp.datos.perfil.diaSupervivencia = (estadoApp.datos.perfil.diaSupervivencia || 1) + n;
        await estadoApp.guardar();
        console.log(`⏩ Avanzados ${n} días. Día actual de supervivencia: ${estadoApp.datos.perfil.diaSupervivencia}`);
      },
      darRecursos: async (tablas = 50, clavos = 40, prov = 25, agua = 30) => {
        estadoApp.datos.recursos.tablas += tablas;
        estadoApp.datos.recursos.clavos += clavos;
        estadoApp.datos.recursos.provisiones += prov;
        estadoApp.datos.recursos.aguaLitros += agua;
        await estadoApp.guardar();
        console.log('📦 Recursos de prueba agregados al almacén.');
      },
      desbloquearRadio: async () => {
        estadoApp.datos.comunicacion.fase = 1;
        await estadoApp.guardar();
        console.log('📻 Radio 104.5 MHz desbloqueada.');
      },
      desbloquearHogar: async () => {
        estadoApp.datos.hogarDesbloqueado = true;
        await estadoApp.guardar();
        console.log('🔥 El Hogar desbloqueado.');
      }
    };
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.iniciar();
});
