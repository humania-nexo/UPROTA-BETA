/**
 * Vista: El Hogar (Validación radical sin culpa)
 * Las 4 capas: Validación, Evidencia histórica, Luz prestada y Sabiduría estoica.
 */

import { FRASES_HOGAR } from '../data/frases_estoicas.js';

export class VistaHogar {
  constructor(contenedor) {
    this.contenedor = contenedor;
  }

  render(estado) {
    const valIndex = Math.floor(Math.random() * FRASES_HOGAR.VALIDACIONES.length);
    const luzIndex = Math.floor(Math.random() * FRASES_HOGAR.LUZ_PRESTADA.length);
    const sabIndex = Math.floor(Math.random() * FRASES_HOGAR.SABIDURIA_ESTOICA.length);

    const validacion = FRASES_HOGAR.VALIDACIONES[valIndex];
    const luz = FRASES_HOGAR.LUZ_PRESTADA[luzIndex];
    const sabiduria = FRASES_HOGAR.SABIDURIA_ESTOICA[sabIndex];

    this.contenedor.innerHTML = `
      <div style="text-align: center; margin-bottom: 16px;">
        <div style="font-size: 2.2rem; margin-bottom: 4px;">🕯️</div>
        <h2 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--oro-torta-glow);">El Hogar del Yermo</h2>
        <span style="font-size: 0.76rem; color: var(--text-muted);">Espacio de resguardo, calor y validación radical</span>
      </div>

      <div class="hogar-wrap">
        <!-- CAPA 1: VALIDACIÓN -->
        <div class="hogar-capa-box">
          <div class="hogar-capa-titulo">Capa 1 &bull; Validación del Terreno</div>
          <div class="hogar-capa-texto">${validacion}</div>
        </div>

        <!-- CAPA 2: EVIDENCIA HISTÓRICA -->
        <div class="hogar-capa-box">
          <div class="hogar-capa-titulo">Capa 2 &bull; Evidencia de tus Pasos</div>
          <div class="hogar-capa-texto">
            Has sostenido tu camino durante <strong>${estado.sendas.reduce((acc, s) => acc + (s.diasCumplidos || 0), 0)} pasos cumplidos</strong> desde el inicio. El esfuerzo acumulado no desaparece por una noche de tormenta.
          </div>
        </div>

        <!-- CAPA 3: LUZ PRESTADA -->
        <div class="hogar-capa-box">
          <div class="hogar-capa-titulo">Capa 3 &bull; Luz Prestada</div>
          <div class="hogar-capa-texto">${luz}</div>
        </div>

        <!-- CAPA 4: SABIDURÍA PRESTADA (ESTOICA) -->
        <div class="hogar-capa-box" style="border-left-color: var(--pilar-espiritu);">
          <div class="hogar-capa-titulo" style="color: var(--pilar-espiritu-light);">${sabiduria.autor}</div>
          <div class="hogar-capa-texto" style="font-style: italic; color: #fef08a;">
            "${sabiduria.texto}"
          </div>
        </div>
      </div>

      <div style="margin-top: 20px; text-align: center;">
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
          Tu refugio está seguro. Vuelve al Tablón cuando te sientas listo.
        </p>
        <button id="btn-volver-tablon-desde-hogar" class="btn-yermo-primary" style="width: 100%;">
          Regresar al Tablón Principal
        </button>
      </div>
    `;

    const btnVolver = this.contenedor.querySelector('#btn-volver-tablon-desde-hogar');
    if (btnVolver) {
      btnVolver.addEventListener('click', () => {
        document.querySelector('[data-tab="tablon"]').click();
      });
    }
  }
}
