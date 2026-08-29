/**
 * Archivo Principal de Entrada (Bootstrap y Orquestación) — UPROTA v1.0
 */

import { estadoApp } from './core/estado.js';
import { VistaTablon } from './modulos/vista_tablon.js';
import { VistaRefugio } from './modulos/vista_refugio.js';
import { VistaMisiones } from './modulos/vista_misiones.js';
import { VistaComunicacion } from './modulos/vista_comunicacion.js';
import { VistaHogar } from './modulos/vista_hogar.js';
import { ModalSabiduria, TourGuiado, ModalBitacoraMatutina } from './modulos/modal_sabiduria.js';
import { ModalOnboarding } from './modulos/modal_onboarding.js';

class App {
  constructor() {
    this.tabActual = 'tablon';
    this.vistas = {};
  }

  async iniciar() {
    console.log('Iniciando UPROTA v1.0...');

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

    // 3. Abrir pop-up de Sabiduría Diaria si corresponde
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

    const btnGuia = document.getElementById('btn-abrir-guia');
    if (btnGuia) {
      btnGuia.addEventListener('click', () => {
        TourGuiado.iniciar();
      });
    }
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
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.iniciar();
});
