/**
 * UPROTA Beta v1.0 - Entrada Principal
 * Inicializa estado, módulos y enrutamiento entre vistas.
 */

import { estadoApp } from './core/estado.js';
import { GameEngine } from './core/engine.js';
import { TablonModulo } from './modulos/tablon.js';
import { RefugioModulo } from './modulos/refugio.js';
import { RadioModulo } from './modulos/radio.js';
import { HogarModulo } from './modulos/hogar.js';
import { EventosModulo } from './modulos/eventos.js';

class App {
  constructor() {
    this.vistaActual = 'tablon';

    // Contenedores de vistas
    this.elemVistaTablon = document.getElementById('vista-tablon');
    this.elemVistaRefugio = document.getElementById('vista-refugio');
    this.elemVistaRadio = document.getElementById('vista-radio');
    this.elemVistaHogar = document.getElementById('vista-hogar');

    // Inicializar Módulos
    this.moduloTablon = new TablonModulo(this.elemVistaTablon, () => this.cambiarVista('hogar'));
    this.moduloRefugio = new RefugioModulo(this.elemVistaRefugio);
    this.moduloRadio = new RadioModulo(this.elemVistaRadio);
    this.moduloHogar = new HogarModulo(this.elemVistaHogar);
    this.moduloEventos = new EventosModulo();
  }

  async init() {
    // Configurar navegación
    this.vincularNavegacion();

    // Suscribir renderizado al estado
    estadoApp.suscribir((estado) => {
      this.actualizarHeader(estado);
      this.renderVistaActual(estado);
    });

    // Cargar datos persistidos
    await estadoApp.cargar();

    // Registrar Service Worker para PWA
    this.registrarServiceWorker();
  }

  vincularNavegacion() {
    // Botones de navegación inferior
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const vista = e.currentTarget.dataset.vista;
        this.cambiarVista(vista);
      });
    });

    // Botón superior de El Hogar
    const btnHogarHeader = document.getElementById('btn-abrir-hogar');
    if (btnHogarHeader) {
      btnHogarHeader.addEventListener('click', () => {
        this.cambiarVista('hogar');
      });
    }
  }

  cambiarVista(nombreVista) {
    this.vistaActual = nombreVista;

    // Actualizar botones de nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
      if (btn.dataset.vista === nombreVista) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Actualizar contenedores de vista
    document.querySelectorAll('.vista-seccion').forEach(sec => {
      sec.classList.remove('active');
    });

    const target = document.getElementById(`vista-${nombreVista}`);
    if (target) {
      target.classList.add('active');
    }

    this.renderVistaActual(estadoApp.estado);
  }

  renderVistaActual(estado) {
    switch (this.vistaActual) {
      case 'tablon':
        this.moduloTablon.render(estado);
        break;
      case 'refugio':
        this.moduloRefugio.render(estado);
        break;
      case 'radio':
        this.moduloRadio.render(estado);
        break;
      case 'hogar':
        this.moduloHogar.render(estado);
        break;
    }
  }

  actualizarHeader(estado) {
    const infoNivel = GameEngine.calcularNivelRefugio(estado.recursos, estado.cimientos);
    const diaNum = GameEngine.calcularDiasDesdeInicio(estado.perfil.fechaInicio);

    // Header info
    const elemIcono = document.getElementById('header-refugio-icon');
    const elemNombre = document.getElementById('header-refugio-nombre');
    const elemDia = document.getElementById('header-refugio-dia');

    if (elemIcono) elemIcono.textContent = infoNivel.icono;
    if (elemNombre) elemNombre.textContent = `Refugio: ${infoNivel.nombre}`;
    if (elemDia) elemDia.textContent = `Día ${diaNum}`;

    // Recursos
    const r = estado.recursos;
    const elTablas = document.getElementById('rec-tablas');
    const elProv = document.getElementById('rec-provisiones');
    const elClavos = document.getElementById('rec-clavos');
    const elAgua = document.getElementById('rec-agua');
    const elMoral = document.getElementById('rec-moral');

    if (elTablas) elTablas.textContent = r.tablas || 0;
    if (elProv) elProv.textContent = r.provisiones || 0;
    if (elClavos) elClavos.textContent = r.clavos || 0;
    if (elAgua) elAgua.textContent = r.agua || 0;
    if (elMoral) elMoral.textContent = r.moral || 0;
  }

  registrarServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(err => {
          console.log('SW registration note:', err);
        });
      });
    }
  }
}

// Iniciar aplicación
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
