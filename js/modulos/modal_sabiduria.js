/**
 * Componente: Modal de Sabiduría Diaria (Don Chui y Biblia)
 * Aparece en el Paso 1 de apertura de la app si hay objetos activos.
 */

import { SabiduriaDiariaEngine } from '../mundo/sabiduria_diaria.js';
import { estadoApp } from '../core/estado.js';
import { CadenasEngine } from '../core/cadenas_engine.js';

export class ModalSabiduria {
  static mostrarSiCorresponde() {
    const estado = estadoApp.datos;
    if (estado.sabiduriaVistoHoy || estado.objetosSabiduriaActivos.length === 0) {
      return;
    }

    const primerObjId = estado.objetosSabiduriaActivos[0];
    const data = SabiduriaDiariaEngine.obtenerMensajeDelDia(primerObjId);
    if (!data) return;

    this.abrirModal(data);
  }

  static abrirModal(data) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="sabiduria-modal-wrap">
        <button class="modal-close-btn" id="btn-cerrar-sabiduria">&times;</button>
        
        <div class="sabiduria-header">
          <img src="assets/sprites/npcs/don_chui_hablando.png" alt="Don Chui" class="pixel-icon icon-48" style="width: 44px; height: 44px; border: 2px solid var(--oro-torta); border-radius: var(--radius-sm); background: #000;">
          <div class="sabiduria-titulos">
            <h2>${data.nombreObjeto}</h2>
            <span>Sabiduría Diaria &bull; +1 ${data.pilar.toUpperCase()}</span>
          </div>
        </div>

        <div class="sabiduria-cuerpo-box">
          <div class="sabiduria-referencia">${data.mensaje.referencia}</div>
          <div class="sabiduria-texto">"${data.mensaje.texto}"</div>
          ${(data.mensaje.notaChui || data.mensaje.notaElena || data.mensaje.notaConcha) ? `
            <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed var(--border-subtle); font-size: 0.78rem; color: #fed7aa; font-style: italic;">
              ${data.mensaje.notaChui || data.mensaje.notaElena || data.mensaje.notaConcha}
            </div>
          ` : ''}
        </div>

        <div style="display: flex; gap: 8px; justify-content: flex-end;">
          <button id="btn-confirmar-sabiduria" class="btn-yermo-primary" style="width: 100%; padding: 12px;">
            ${data.botonTexto}
          </button>
        </div>
      </div>
    `;

    const cerrar = async () => {
      estadoApp.datos.sabiduriaVistoHoy = true;
      await estadoApp.guardar();
      modalContainer.classList.add('hidden');
    };

    modalContent.querySelector('#btn-confirmar-sabiduria').addEventListener('click', cerrar);
    modalContent.querySelector('#btn-cerrar-sabiduria').addEventListener('click', cerrar);

    modalContainer.classList.remove('hidden');
  }
}

export class TourGuiado {
  static pasoActual = 0;
  static overlayEl = null;

  static pasos = [
    {
      selector: '.torta-container',
      titulo: 'Torta de Equilibrio',
      icono: 'assets/sprites/pilares/torta_dorada_badge.png',
      texto: 'Mide la armonía entre tus 4 pilares en las últimas 3 semanas. Sostener los cuatro activos desbloquea la Torta Dorada y bonos de expedición.'
    },
    {
      selector: '.sendas-list',
      titulo: 'Sendas Activas',
      icono: 'assets/sprites/mecanicas/mecanica_senda.png',
      texto: 'Tus hábitos positivos diarios. Toca el botón de check cada día para sumar cumplimiento diario y ganar tablas de madera para tu refugio.'
    },
    {
      selector: '.cadenas-list',
      titulo: 'Cadenas a Romper',
      icono: 'assets/sprites/mecanicas/cadena_firme.png',
      texto: 'Los malos hábitos a erradicar en 21 días. Toca la tarjeta cada noche para tu reporte sincero: día limpio o recaída con puente que tiembla.'
    },
    {
      selector: '.bottom-nav',
      titulo: 'Navegación del Yermo',
      icono: 'assets/sprites/ui/tab_misiones.png',
      texto: 'Viaja entre el Tablón de hábitos, tu Refugio evolutivo, las Expediciones diarias de 24h, la Radio de Don Chui y el resguardo de El Hogar.'
    },
    {
      selector: '.recursos-grid',
      titulo: 'Almacén de Recursos',
      icono: 'assets/sprites/recursos/recurso_tablas.png',
      texto: 'Tus tablas, clavos, provisiones y agua pura. Úsalos para mejorar tu base y no desfallecer ante el desgaste en el Yermo.'
    }
  ];

  static async verificarYIniciar() {
    const perfil = estadoApp.datos.perfil;
    if (perfil.onboardingCompletado && !perfil.tourCompletado) {
      setTimeout(() => {
        this.iniciar();
      }, 700);
    }
  }

  static iniciar() {
    this.pasoActual = 0;
    if (window.app && typeof window.app.cambiarTab === 'function') {
      window.app.cambiarTab('tablon');
    }
    setTimeout(() => {
      this.crearOverlay();
      this.mostrarPaso(this.pasoActual);
    }, 150);
  }

  static crearOverlay() {
    if (this.overlayEl) this.overlayEl.remove();

    this.overlayEl = document.createElement('div');
    this.overlayEl.className = 'tour-overlay';
    this.overlayEl.style.opacity = '1';
    this.overlayEl.innerHTML = `
      <div class="tour-spotlight-box" id="tour-spotlight"></div>
      <div class="tour-tooltip-card" id="tour-tooltip"></div>
    `;
    document.body.appendChild(this.overlayEl);
  }

  static mostrarPaso(index, reintentos = 0) {
    if (index >= this.pasos.length) {
      this.finalizar();
      return;
    }

    if (!this.overlayEl) {
      this.crearOverlay();
    }

    const paso = this.pasos[index];
    const targetEl = document.querySelector(paso.selector);
    const spotlight = this.overlayEl.querySelector('#tour-spotlight');
    const tooltip = this.overlayEl.querySelector('#tour-tooltip');

    if (!targetEl) {
      if (reintentos < 3) {
        setTimeout(() => this.mostrarPaso(index, reintentos + 1), 300);
        return;
      }
      this.pasoActual++;
      this.mostrarPaso(this.pasoActual);
      return;
    }

    try {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (e) {}

    setTimeout(() => {
      const rect = targetEl.getBoundingClientRect();
      const padding = 8;

      spotlight.style.top = `${Math.max(0, rect.top - padding)}px`;
      spotlight.style.left = `${Math.max(0, rect.left - padding)}px`;
      spotlight.style.width = `${rect.width + padding * 2}px`;
      spotlight.style.height = `${rect.height + padding * 2}px`;

      const espacioAbajo = window.innerHeight - rect.bottom;
      const tooltipArriba = espacioAbajo < 220 && rect.top > 200;
      const esUltimo = index === this.pasos.length - 1;

      tooltip.innerHTML = `
        <div class="tour-tooltip-header">
          <div class="tour-tooltip-title">
            <img src="${paso.icono}" alt="Paso" class="pixel-icon icon-20">
            <span>${paso.titulo}</span>
          </div>
          <span class="tour-tooltip-step">${index + 1} / ${this.pasos.length}</span>
        </div>
        <p class="tour-tooltip-body">${paso.texto}</p>
        <div class="tour-tooltip-actions">
          <button id="btn-tour-saltar" class="btn-yermo-secondary" style="padding: 4px 10px; font-size: 0.74rem; color: var(--text-muted);">
            Saltar Guía
          </button>
          <button id="btn-tour-siguiente" class="btn-yermo-primary" style="padding: 6px 14px; font-size: 0.8rem;">
            ${esUltimo ? '¡Comenzar Supervivencia! ➔' : 'Siguiente ➔'}
          </button>
        </div>
      `;

      tooltip.style.left = '50%';
      tooltip.style.transform = 'translateX(-50%)';

      if (tooltipArriba) {
        tooltip.style.top = 'auto';
        tooltip.style.bottom = `${Math.max(10, window.innerHeight - rect.top + 14)}px`;
      } else {
        tooltip.style.bottom = 'auto';
        tooltip.style.top = `${Math.max(10, rect.bottom + 14)}px`;
      }

      tooltip.querySelector('#btn-tour-saltar').addEventListener('click', () => this.finalizar());
      tooltip.querySelector('#btn-tour-siguiente').addEventListener('click', () => {
        this.pasoActual++;
        this.mostrarPaso(this.pasoActual);
      });
    }, 280);
  }

  static async finalizar() {
    if (this.overlayEl) {
      this.overlayEl.style.opacity = '0';
      setTimeout(() => {
        if (this.overlayEl) this.overlayEl.remove();
        this.overlayEl = null;
      }, 300);
    }

    estadoApp.datos.perfil.tourCompletado = true;
    await estadoApp.guardar();
  }
}

if (typeof window !== 'undefined') {
  window.TourGuiado = TourGuiado;
}

export class ModalBitacoraMatutina {
  static mostrarSiCorresponde() {
    const estado = estadoApp.datos;
    const hoy = new Date().toISOString().split('T')[0];

    // Solo si completó onboarding y hay bitácora pendiente o cambió el día
    if (!estado.perfil.onboardingCompletado) return;

    if (estado.bitacoraPendienteAyer || (estado.fechaUltimaBitacora && estado.fechaUltimaBitacora < hoy)) {
      setTimeout(() => {
        this.abrirModal();
      }, 500);
    }
  }

  static abrirModal() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    const estado = estadoApp.datos;
    const sendas = estado.sendas || [];
    const cadenas = estado.cadenas || [];

    // Respuestas temporales
    const respuestasSendas = {};
    sendas.forEach((s, idx) => {
      respuestasSendas[idx] = false;
    });

    const respuestasCadenas = {};
    cadenas.forEach((c, idx) => {
      respuestasCadenas[idx] = 'libre';
    });

    modalContent.innerHTML = `
      <div class="modal-crear-wrap" style="max-height: 85vh; overflow-y: auto;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <img src="assets/sprites/pilares/pilar_mente.png" alt="Bitácora" class="pixel-icon icon-24">
          <h3 style="font-size: 1.15rem; color: var(--oro-torta-glow); margin: 0;">
            Amanecer en el Refugio
          </h3>
        </div>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 14px; line-height: 1.4;">
          Bitácora del día anterior. Tómate un instante para registrar con honestidad cómo transcurrió tu jornada de ayer.
        </p>

        <!-- SECCIÓN 1: SENDAS DE AYER -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <img src="assets/sprites/mecanicas/mecanica_senda.png" alt="Sendas" class="pixel-icon icon-16">
            <span>1. Sendas Positivas de Ayer:</span>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${sendas.length === 0 ? '<div style="font-size: 0.76rem; color: var(--text-muted);">No había sendas activas ayer.</div>' : sendas.map((s, idx) => `
              <div class="card-yermo item-senda-bitacora" data-sidx="${idx}" style="display: flex; align-items: center; justify-content: space-between; padding: 8px 10px; cursor: pointer; border: 1px solid var(--border-subtle);">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <img src="${s.icono || 'assets/sprites/mecanicas/mecanica_senda.png'}" alt="Icono" class="emoji-pixel" style="width: 20px; height: 20px;">
                  <div>
                    <div style="font-size: 0.82rem; color: var(--text-primary); font-weight: 600;">${s.nombreLore || s.nombre}</div>
                    ${s.accionReal ? `<div style="font-size: 0.7rem; color: #fed7aa;">${s.accionReal}</div>` : ''}
                  </div>
                </div>
                <button type="button" class="btn-check-item btn-toggle-senda-bitacora" data-sidx="${idx}" style="width: 28px; height: 28px;">
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECCIÓN 2: CADENAS DE AYER -->
        <div style="margin-bottom: 18px;">
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <img src="assets/sprites/mecanicas/cadena_firme.png" alt="Cadenas" class="pixel-icon icon-16">
            <span>2. Cadenas a Romper en Ayer:</span>
          </div>

          <div style="display: flex; flex-direction: column; gap: 10px;">
            ${cadenas.length === 0 ? '<div style="font-size: 0.76rem; color: var(--text-muted);">No había cadenas atadas ayer.</div>' : cadenas.map((c, idx) => `
              <div class="card-yermo" style="padding: 8px 10px; border: 1px solid var(--border-subtle);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                  <img src="${c.icono || 'assets/sprites/mecanicas/cadena_firme.png'}" alt="Icono" class="emoji-pixel" style="width: 20px; height: 20px;">
                  <div>
                    <div style="font-size: 0.82rem; color: var(--text-primary); font-weight: 600;">${c.nombreLore || c.nombre}</div>
                    ${c.accionReal ? `<div style="font-size: 0.7rem; color: #fca5a5;">${c.accionReal}</div>` : ''}
                  </div>
                </div>
                <div style="display: flex; gap: 6px;">
                  <button type="button" class="btn-opcion-cadena-bitacora active-libre" data-cidx="${idx}" data-val="libre" style="flex: 1; padding: 6px 4px; font-size: 0.74rem; border-radius: var(--radius-sm); border: 1px solid #22c55e; background: rgba(34, 197, 94, 0.2); color: #86efac; cursor: pointer;">
                    ✅ Día Libre (+1)
                  </button>
                  <button type="button" class="btn-opcion-cadena-bitacora" data-cidx="${idx}" data-val="recaida" style="flex: 1; padding: 6px 4px; font-size: 0.74rem; border-radius: var(--radius-sm); border: 1px solid rgba(239, 68, 68, 0.4); background: rgba(0,0,0,0.3); color: var(--text-muted); cursor: pointer;">
                    ⚠️ Recaída sincera
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <button id="btn-sellar-bitacora" class="btn-yermo-primary" style="width: 100%; padding: 12px; font-size: 0.9rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <img src="assets/sprites/ui/ico_check_ok.png" alt="OK" class="pixel-icon icon-16">
          <span>Sellar Bitácora y Abrir Nuevo Día</span>
        </button>
      </div>
    `;

    // Vincular toggle de Sendas
    modalContent.querySelectorAll('.item-senda-bitacora, .btn-toggle-senda-bitacora').forEach(el => {
      el.addEventListener('click', () => {
        const sidx = el.getAttribute('data-sidx');
        const btn = modalContent.querySelector(`.btn-toggle-senda-bitacora[data-sidx="${sidx}"]`);
        respuestasSendas[sidx] = !respuestasSendas[sidx];
        if (respuestasSendas[sidx]) {
          btn.classList.add('checked');
          btn.innerHTML = '<img src="assets/sprites/ui/ico_check_ok.png" alt="OK" class="pixel-icon icon-16">';
        } else {
          btn.classList.remove('checked');
          btn.innerHTML = '';
        }
      });
    });

    // Vincular opciones de Cadenas
    modalContent.querySelectorAll('.btn-opcion-cadena-bitacora').forEach(btn => {
      btn.addEventListener('click', () => {
        const cidx = btn.getAttribute('data-cidx');
        const val = btn.getAttribute('data-val');
        respuestasCadenas[cidx] = val;

        const container = btn.closest('.card-yermo');
        container.querySelectorAll('.btn-opcion-cadena-bitacora').forEach(b => {
          b.style.background = 'rgba(0,0,0,0.3)';
          b.style.borderColor = 'var(--border-subtle)';
          b.style.color = 'var(--text-muted)';
        });

        if (val === 'libre') {
          btn.style.background = 'rgba(34, 197, 94, 0.2)';
          btn.style.borderColor = '#22c55e';
          btn.style.color = '#86efac';
        } else {
          btn.style.background = 'rgba(239, 68, 68, 0.2)';
          btn.style.borderColor = '#ef4444';
          btn.style.color = '#fca5a5';
        }
      });
    });

    // Sellar Bitácora
    modalContent.querySelector('#btn-sellar-bitacora').addEventListener('click', async () => {
      // 1. Procesar Sendas
      sendas.forEach((s, idx) => {
        const cumplida = !!respuestasSendas[idx];
        if (cumplida) {
          s.diasCumplidos = (s.diasCumplidos || 0) + 1;
          s.diasTotales = (s.diasTotales || 0) + 1;
          s.rachaActual = (s.rachaActual || 0) + 1;
          s.fallosSeguidos = 0;
          estadoApp.datos.recursos.tablas = (estadoApp.datos.recursos.tablas || 0) + 1;
        } else {
          s.diasFallados = (s.diasFallados || 0) + 1;
          s.diasTotales = (s.diasTotales || 0) + 1;
          s.rachaActual = 0;
          s.fallosSeguidos = (s.fallosSeguidos || 0) + 1;
        }
        s.tasaFallos = s.diasTotales > 0 ? (s.diasFallados || 0) / s.diasTotales : 0;
        s.cumplidaHoy = false;
      });

      // 2. Procesar Cadenas
      let activarHogar = false;
      cadenas.forEach((c, idx) => {
        const huboRecaida = respuestasCadenas[idx] === 'recaida';
        const res = CadenasEngine.registrarDia(c, huboRecaida);
        estadoApp.datos.cadenas[idx] = res.cadena;
        c.reportadaHoy = false;
        if (res.activarHogar) activarHogar = true;
      });

      if (activarHogar) {
        estadoApp.datos.hogarDesbloqueado = true;
      }

      // 3. Marcar bitácora completada
      const hoy = new Date().toISOString().split('T')[0];
      estadoApp.datos.bitacoraPendienteAyer = false;
      estadoApp.datos.fechaUltimaBitacora = hoy;
      estadoApp.datos.ultimaFechaAcceso = hoy;

      await estadoApp.guardar();
      modalContainer.classList.add('hidden');

      // 4. Si había expedición pendiente, abrir informe de inmediato
      if (estadoApp.datos.informeMisionPendiente) {
        setTimeout(() => {
          const vistaMisiones = window.app?.vistas?.misiones;
          if (vistaMisiones) {
            vistaMisiones.mostrarModalInforme(estadoApp.datos.informeMisionPendiente);
          }
        }, 300);
      }
    });

    modalContainer.classList.remove('hidden');
  }
}



