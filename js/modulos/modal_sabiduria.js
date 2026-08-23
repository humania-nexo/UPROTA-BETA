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
