/**
 * Vista: Misiones y Exploración Asíncrona (Resolución al día siguiente)
 */

import { estadoApp } from '../core/estado.js';

export class VistaMisiones {
  constructor(contenedor) {
    this.contenedor = contenedor;
  }

  render(estado) {
    const hayInforme = !!estado.informeMisionPendiente;
    const enCurso = !!estado.misionDespachadaHoy;

    this.contenedor.innerHTML = `
      <div style="text-align: center; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 2px;">
          <img src="assets/sprites/ui/tab_misiones.png" alt="Misiones" class="pixel-icon icon-24">
          <h2 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin: 0;">
            Expediciones del Yermo
          </h2>
        </div>
        <span style="font-size: 0.76rem; color: var(--text-muted);">
          1 misión por día real &bull; El Prota explora y regresa con los resultados al amanecer
        </span>
      </div>

      <!-- ESTADO 1: HAY UN INFORME PENDIENTE POR REVISAR -->
      ${hayInforme ? `
        <div class="card-yermo" style="background: rgba(217, 119, 6, 0.12); border: 2px solid var(--oro-torta); margin-bottom: 16px; text-align: center; padding: 16px;">
          <div style="margin-bottom: 8px;">
            <img src="assets/sprites/items/caja_expedicion.png" alt="Expedición" class="pixel-icon icon-48">
          </div>
          <h3 style="font-size: 1.05rem; color: var(--oro-torta-glow); margin-bottom: 4px;">¡El Prota ha Regresado del Yermo!</h3>
          <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 12px;">
            La expedición despachada ayer ha concluido. Revisa la bitácora para ver el botín, posibles heridas y los recursos recolectados.
          </p>
          <button id="btn-ver-informe-mision" class="btn-yermo-primary" style="width: 100%; padding: 10px; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <img src="assets/sprites/pilares/pilar_mente.png" alt="Bitácora" class="pixel-icon icon-16">
            <span>Ver Informe de Expedición y Reclamar Botín</span>
          </button>
        </div>
      ` : ''}

      <!-- ESTADO 2: PROTA EN CURSO -->
      ${!hayInforme && enCurso ? `
        <div class="card-yermo" style="background: rgba(0,0,0,0.4); border-left: 3px solid var(--pilar-mente); margin-bottom: 16px; text-align: center; padding: 18px;">
          <div style="margin-bottom: 8px;">
            <img src="assets/sprites/ui/tab_misiones.png" alt="Misiones" class="pixel-icon icon-32">
          </div>
          <h3 style="font-size: 1.05rem; color: var(--pilar-mente-light); margin-bottom: 4px;">Prota en Expedición...</h3>
          <div style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 8px;">
            Destino: <strong>${estado.misionDespachadaHoy.destino || 'El Yermo'}</strong> (${estado.misionDespachadaHoy.tipo === 'tipo_a' ? 'Exploración de Ruinas' : 'Recolección Segura'}).
          </div>
          <p style="font-size: 0.76rem; color: var(--text-muted);">
            El camino toma todo el día y la noche. Vuelve mañana al amanecer para recibir el informe de bitácora y desembarcar la mochila.
          </p>
        </div>
      ` : ''}

      <!-- ESTADO 3: DISPONIBLE PARA ELEGIR MISIÓN DE HOY -->
      ${!hayInforme && !enCurso ? `
        <div class="misiones-grid">
          <!-- TIPO A: EXPLORACIÓN -->
          <div class="card-yermo" style="border-left: 3px solid var(--accent-rust); margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div>
                <span style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--accent-rust-light); text-transform: uppercase;">Tipo A &bull; Ruinas Peligrosas</span>
                <h4 style="font-size: 0.95rem; color: var(--text-primary); margin-top: 2px;">Casas del Sector Norte</h4>
              </div>
              <span class="slots-counter">Riesgo Leve</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 10px; line-height: 1.4;">
              Rebusca en cajones y armarios abandonados. Alta probabilidad de objetos de trueque (café, cables, sal) pero riesgo de raspaduras en el monte.
            </p>
            <button class="btn-yermo-primary btn-despachar-mision" style="width: 100%; padding: 8px;" data-mision-tipo="tipo_a" data-mision-destino="Casas del Sector Norte">
              Despachar Expedición (Resultado Mañana)
            </button>
          </div>

          <!-- TIPO B: RECOLECCIÓN MADERA -->
          <div class="card-yermo" style="border-left: 3px solid var(--pilar-taller); margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div>
                <span style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--pilar-taller-light); text-transform: uppercase;">Tipo B &bull; Seguro</span>
                <h4 style="font-size: 0.95rem; color: var(--text-primary); margin-top: 2px;">Quebrada de Palets</h4>
              </div>
              <span class="slots-counter">Sin Riesgo</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 10px; line-height: 1.4;">
              Desarmar maderas y tarimas viejas en el arroyo seco. Trae 3 tablas seguras y leña para el fogón del refugio.
            </p>
            <button class="btn-yermo-secondary btn-despachar-mision" style="width: 100%; padding: 8px; display: flex; align-items: center; justify-content: center; gap: 6px;" data-mision-tipo="tipo_b_madera" data-mision-destino="Bosquecito tras el cerro">
              <img src="assets/sprites/recursos/recurso_tablas.png" alt="Tablas" class="pixel-icon icon-16">
              <span>Recolectar Madera (Resultado Mañana)</span>
            </button>
          </div>

          <!-- TIPO B: RECOLECCIÓN AGUA -->
          <div class="card-yermo" style="border-left: 3px solid var(--pilar-mente); margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
              <div>
                <span style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--pilar-mente-light); text-transform: uppercase;">Tipo B &bull; Vital</span>
                <h4 style="font-size: 0.95rem; color: var(--text-primary); margin-top: 2px;">Acarreo de Agua al Riachuelo</h4>
              </div>
              <span class="slots-counter">Sin Riesgo</span>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 10px; line-height: 1.4;">
              Caminar con garrafones y cubetas hacia el cauce bajo del arroyo. Trae 8L de agua (requiere filtrado y hervor).
            </p>
            <button class="btn-yermo-secondary btn-despachar-mision" style="width: 100%; padding: 8px; display: flex; align-items: center; justify-content: center; gap: 6px;" data-mision-tipo="tipo_b_agua" data-mision-destino="Riachuelo cercano">
              <img src="assets/sprites/recursos/recurso_agua.png" alt="Agua" class="pixel-icon icon-16">
              <span>Acarrear Agua (Resultado Mañana)</span>
            </button>
          </div>
        </div>
      ` : ''}
    `;

    this.vincularEventos(estado);
  }

  vincularEventos(estado) {
    // Botón para ver informe pendiente
    const btnVerInforme = this.contenedor.querySelector('#btn-ver-informe-mision');
    if (btnVerInforme) {
      btnVerInforme.addEventListener('click', () => {
        this.mostrarModalInforme(estado.informeMisionPendiente);
      });
    }

    // Botones para despachar misión
    this.contenedor.querySelectorAll('.btn-despachar-mision').forEach(btn => {
      btn.addEventListener('click', async () => {
        const tipo = btn.getAttribute('data-mision-tipo');
        const destino = btn.getAttribute('data-mision-destino');

        estadoApp.datos.misionDespachadaHoy = {
          tipo,
          destino,
          fechaDespacho: new Date().toISOString().split('T')[0]
        };

        await estadoApp.guardar();
      });
    });
  }

  mostrarModalInforme(informe) {
    if (!informe) return;

    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="informe-mision-wrap">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <img src="assets/sprites/pilares/pilar_mente.png" alt="Bitacora" class="pixel-icon icon-20">
            <h3 style="font-size: 1.15rem; color: var(--oro-torta-glow); margin: 0;">Bitácora de Expedición</h3>
          </div>
          <span class="slots-counter">${informe.estadoSalud}</span>
        </div>

        <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
          Destino explorado: <strong>${informe.nombreDestino}</strong>
        </div>

        <!-- LOG NARRATIVO -->
        <div class="card-yermo" style="background: rgba(0,0,0,0.4); border-left: 3px solid var(--accent-rust); margin-bottom: 12px; font-size: 0.82rem; line-height: 1.5;">
          ${informe.logNarrativo.map(l => `<p style="margin-bottom: 6px;">${l}</p>`).join('')}
        </div>

        <!-- RECURSOS Y BOTÍN -->
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">
          <img src="assets/sprites/items/caja_expedicion.png" alt="Botin" class="pixel-icon icon-16">
          <span>Botín Transportado (${informe.pesoTotalKg || 0} kg):</span>
        </div>
        
        <div class="card-yermo" style="background: var(--bg-surface); padding: 8px; margin-bottom: 14px; font-size: 0.8rem;">
          ${informe.itemsRecogidos && informe.itemsRecogidos.length > 0 ? `
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${informe.itemsRecogidos.map(item => `
                <li style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed var(--border-subtle);">
                  <span>${item.nombre}</span>
                  <span style="color: var(--oro-torta-glow);">${item.pesoKg} kg (Trueque: ${item.valorTrueque || 1})</span>
                </li>
              `).join('')}
            </ul>
          ` : '<span style="color: var(--text-muted);">Sin objetos sueltos. Solo recursos básicos.</span>'}

          ${informe.recursosGanados ? `
            <div style="margin-top: 8px; padding-top: 6px; border-top: 1px solid var(--border-subtle); display: flex; gap: 12px; color: #a7f3d0; font-weight: 600; flex-wrap: wrap;">
              ${informe.recursosGanados.tablas ? `<span style="display: flex; align-items: center; gap: 4px;"><img src="assets/sprites/recursos/recurso_tablas.png" alt="Tablas" class="pixel-icon icon-16"> +${informe.recursosGanados.tablas} Tablas</span>` : ''}
              ${informe.recursosGanados.clavos ? `<span style="display: flex; align-items: center; gap: 4px;"><img src="assets/sprites/recursos/recurso_clavos.png" alt="Clavos" class="pixel-icon icon-16"> +${informe.recursosGanados.clavos} Clavos</span>` : ''}
              ${informe.recursosGanados.aguaLitros ? `<span style="display: flex; align-items: center; gap: 4px;"><img src="assets/sprites/recursos/recurso_agua.png" alt="Agua" class="pixel-icon icon-16"> +${informe.recursosGanados.aguaLitros}L Agua</span>` : ''}
            </div>
          ` : ''}
        </div>

        <button id="btn-reclamar-informe" class="btn-yermo-primary" style="width: 100%; padding: 12px; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <img src="assets/sprites/ui/ico_check_ok.png" alt="OK" class="pixel-icon icon-16">
          <span>Guardar en Refugio y Continuar</span>
        </button>
      </div>
    `;

    modalContent.querySelector('#btn-reclamar-informe').addEventListener('click', async () => {
      // Depositar recursos
      if (informe.recursosGanados) {
        if (informe.recursosGanados.tablas) estadoApp.datos.recursos.tablas += informe.recursosGanados.tablas;
        if (informe.recursosGanados.clavos) estadoApp.datos.recursos.clavos += informe.recursosGanados.clavos;
        if (informe.recursosGanados.aguaLitros) estadoApp.datos.recursos.aguaLitros += informe.recursosGanados.aguaLitros;
      }

      // Depositar ítems en bolsa si caben
      if (informe.itemsRecogidos) {
        informe.itemsRecogidos.forEach(item => {
          estadoApp.datos.bolsa.items.push(item);
        });
      }

      // Limpiar informe pendiente para habilitar la misión de hoy
      estadoApp.datos.informeMisionPendiente = null;
      await estadoApp.guardar();

      modalContainer.classList.add('hidden');
    });

    modalContainer.classList.remove('hidden');
  }
}
