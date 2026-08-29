/**
 * Componente: Modal de Sabiduría Diaria (Don Chui y Biblia)
 * Aparece en el Paso 1 de apertura de la app si hay objetos activos.
 */

import { SabiduriaDiariaEngine } from '../mundo/sabiduria_diaria.js';
import { estadoApp } from '../core/estado.js';

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
          <span class="sabiduria-avatar">${data.icono}</span>
          <div class="sabiduria-titulos">
            <h2>${data.nombreObjeto}</h2>
            <span>Sabiduría Diaria &bull; +1 ${data.pilar.toUpperCase()}</span>
          </div>
        </div>

        <div class="sabiduria-cuerpo-box">
          <div class="sabiduria-referencia">${data.mensaje.referencia}</div>
          <div class="sabiduria-texto">"${data.mensaje.texto}"</div>
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
      }, 600);
    }
  }

  static iniciar() {
    this.pasoActual = 0;
    this.crearOverlay();
    this.mostrarPaso(this.pasoActual);
  }

  static crearOverlay() {
    if (this.overlayEl) this.overlayEl.remove();

    this.overlayEl = document.createElement('div');
    this.overlayEl.className = 'tour-overlay';
    this.overlayEl.innerHTML = `
      <div class="tour-spotlight-box" id="tour-spotlight"></div>
      <div class="tour-tooltip-card" id="tour-tooltip"></div>
    `;
    document.body.appendChild(this.overlayEl);
  }

  static mostrarPaso(index) {
    if (index >= this.pasos.length) {
      this.finalizar();
      return;
    }

    const paso = this.pasos[index];
    const targetEl = document.querySelector(paso.selector);
    const spotlight = this.overlayEl.querySelector('#tour-spotlight');
    const tooltip = this.overlayEl.querySelector('#tour-tooltip');

    if (!targetEl) {
      this.pasoActual++;
      this.mostrarPaso(this.pasoActual);
      return;
    }

    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      const rect = targetEl.getBoundingClientRect();
      const padding = 6;

      spotlight.style.top = `${Math.max(0, rect.top - padding)}px`;
      spotlight.style.left = `${Math.max(0, rect.left - padding)}px`;
      spotlight.style.width = `${rect.width + padding * 2}px`;
      spotlight.style.height = `${rect.height + padding * 2}px`;

      const espacioAbajo = window.innerHeight - rect.bottom;
      const tooltipArriba = espacioAbajo < 200 && rect.top > 200;
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
        tooltip.style.bottom = `${window.innerHeight - rect.top + 12}px`;
      } else {
        tooltip.style.bottom = 'auto';
        tooltip.style.top = `${rect.bottom + 12}px`;
      }

      tooltip.querySelector('#btn-tour-saltar').addEventListener('click', () => this.finalizar());
      tooltip.querySelector('#btn-tour-siguiente').addEventListener('click', () => {
        this.pasoActual++;
        this.mostrarPaso(this.pasoActual);
      });
    }, 200);
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

