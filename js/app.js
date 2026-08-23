/**
 * Archivo Principal de Entrada (Bootstrap y Orquestación) — UPROTA v1.0
 */

import { estadoApp } from './core/estado.js';
import { VistaTablon } from './modulos/vista_tablon.js';
import { VistaRefugio } from './modulos/vista_refugio.js';
import { VistaMisiones } from './modulos/vista_misiones.js';
import { VistaComunicacion } from './modulos/vista_comunicacion.js';
import { VistaHogar } from './modulos/vista_hogar.js';
import { ModalSabiduria } from './modulos/modal_sabiduria.js';
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

    // Vincular navegación
    this.vincularNavegacion();

    // Inicializar IndexedDB y suscribir vistas al estado central
    await estadoApp.inicializar();
    estadoApp.suscribir((estado) => this.actualizarVistas(estado));

    // Abrir Onboarding si es la primera vez
    ModalOnboarding.mostrarSiEsNecesario();

    // Abrir pop-up de Sabiduría Diaria si corresponde
    ModalSabiduria.mostrarSiCorresponde();

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
    const resBateria = document.getElementById('res-bateria');

    if (resTablas) resTablas.textContent = estado.recursos.tablas;
    if (resClavos) resClavos.textContent = estado.recursos.clavos;
    if (resProv) resProv.textContent = estado.recursos.provisiones;
    if (resAgua) resAgua.textContent = `${estado.recursos.aguaLitros}L`;
    if (resBateria) resBateria.textContent = `${estado.bioenergia.nivelCarga}%`;

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
