/**
 * Vista: Misiones Diarias (1 por día real)
 * Exploración Tipo A con riesgo vs Recolección Tipo B segura.
 */

import { estadoApp } from '../core/estado.js';
import { MisionesEngine } from '../mundo/misiones_engine.js';

export class VistaMisiones {
  constructor(contenedor) {
    this.contenedor = contenedor;
  }

  render(estado) {
    const infoNivel = estadoApp.infoNivelRefugio;
    const misionHecha = estado.misionRealizadaHoy;

    this.contenedor.innerHTML = `
      <div class="card-yermo">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <h3 style="font-size: 1rem; color: var(--text-primary);">🧭 Patrulla y Salidas del Yermo</h3>
          <span style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--oro-torta);">1 Misión / Día Real</span>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45;">
          El Yermo no recompensa el farmeo compulsivo. Tu cuerpo y el monte necesitan descanso. Sal una vez al día a explorar o recolectar suministros.
        </p>
      </div>

      ${misionHecha ? `
        <div class="card-yermo" style="text-align: center; border-color: var(--border-strong); background: rgba(0, 0, 0, 0.4);">
          <div style="font-size: 2rem; margin-bottom: 6px;">🏕️</div>
          <h4 style="color: var(--text-primary); margin-bottom: 4px;">Ya patrullaste hoy, Prota</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
            El Yermo descansa. Guarda tus herramientas, cuida tu fuego y regresa mañana para una nueva salida.
          </p>
        </div>
      ` : `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <!-- OPCIÓN 1: TIPO A EXPLORACIÓN CON RIESGO -->
          <div class="card-yermo" style="border-left: 3px solid var(--accent-rust);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <h4 style="font-size: 0.9rem; color: var(--text-primary);">🏚️ Explorar Ruinas del Sector Norte</h4>
              <span style="font-size: 0.7rem; color: var(--pilar-cuerpo-light); font-family: var(--font-mono);">Tipo A &bull; Riesgo Leve</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 10px;">
              Casas abandonadas y talleres. Posibilidad de encontrar herramientas raras, sal o café de trueque.
            </p>
            <button id="btn-mision-tipo-a" class="btn-yermo-primary" style="width: 100%;">
              Iniciar Exploración
            </button>
          </div>

          <!-- OPCIÓN 2: TIPO B MADERA SEGURA -->
          <div class="card-yermo" style="border-left: 3px solid var(--pilar-taller);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <h4 style="font-size: 0.9rem; color: var(--text-primary);">🌲 Recolección: Bosquecito Tras el Cerro</h4>
              <span style="font-size: 0.7rem; color: var(--pilar-taller-light); font-family: var(--font-mono);">Tipo B &bull; Segura</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 10px;">
              Corte de tablas y recolección de leña seca. Sin riesgo de heridas.
            </p>
            <button id="btn-mision-tipo-b-madera" class="btn-yermo-secondary" style="width: 100%;">
              Recolectar Madera
            </button>
          </div>

          <!-- OPCIÓN 3: TIPO B AGUA SEGURA -->
          <div class="card-yermo" style="border-left: 3px solid var(--pilar-mente);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <h4 style="font-size: 0.9rem; color: var(--text-primary);">💧 Acarreo: Riachuelo Cercano</h4>
              <span style="font-size: 0.7rem; color: var(--pilar-mente-light); font-family: var(--font-mono);">Tipo B &bull; Segura</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 10px;">
              Acarreo de 10L de agua en cubetas. Sin riesgo.
            </p>
            <button id="btn-mision-tipo-b-agua" class="btn-yermo-secondary" style="width: 100%;">
              Acarrear Agua
            </button>
          </div>
        </div>
      `}
    `;

    this.vincularEventos(estado, infoNivel);
  }

  vincularEventos(estado, infoNivel) {
    const btnA = this.contenedor.querySelector('#btn-mision-tipo-a');
    const btnBMadera = this.contenedor.querySelector('#btn-mision-tipo-b-madera');
    const btnBAgua = this.contenedor.querySelector('#btn-mision-tipo-b-agua');

    const procesarResultado = async (resultado) => {
      estado.misionRealizadaHoy = true;

      if (resultado.recursosGanados) {
        if (resultado.recursosGanados.tablas) estado.recursos.tablas = (estado.recursos.tablas || 0) + resultado.recursosGanados.tablas;
        if (resultado.recursosGanados.aguaLitros) estado.recursos.aguaLitros = (estado.recursos.aguaLitros || 0) + resultado.recursosGanados.aguaLitros;
      }

      if (resultado.itemsRecogidos && resultado.itemsRecogidos.length > 0) {
        resultado.itemsRecogidos.forEach(item => {
          estado.bolsa.items.push(item);
        });
        estado.bolsa.pesoActualKg = Math.min(infoNivel.capacidadBolsaKg, estado.bolsa.pesoActualKg + (resultado.pesoTotalCargadoKg || 1));
      }

      await estadoApp.guardar();
      alert(`${resultado.mensaje}\n${resultado.itemsDejadosPorPeso?.length > 0 ? `(Dejaste ${resultado.itemsDejadosPorPeso.length} ítems por peso de bolsa)` : ''}`);
    };

    if (btnA) {
      btnA.addEventListener('click', () => {
        const esDorado = estadoApp.infoPilares.esDorado;
        const res = MisionesEngine.ejecutarMision('tipo_a', 'Casas del sector norte', infoNivel.capacidadBolsaKg, esDorado);
        procesarResultado(res);
      });
    }

    if (btnBMadera) {
      btnBMadera.addEventListener('click', () => {
        const res = MisionesEngine.ejecutarMision('tipo_b_madera', null, infoNivel.capacidadBolsaKg);
        procesarResultado(res);
      });
    }

    if (btnBAgua) {
      btnBAgua.addEventListener('click', () => {
        const res = MisionesEngine.ejecutarMision('tipo_b_agua', null, infoNivel.capacidadBolsaKg);
        procesarResultado(res);
      });
    }
  }
}
