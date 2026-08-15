/**
 * Módulo de UI: Tablón (Checklist Diario de 20 Segundos)
 */

import { estadoApp } from '../core/estado.js';
import { GameEngine } from '../core/engine.js';
import { MotorTraductor } from '../core/traductor.js';

export class TablonModulo {
  constructor(contenedor, onAccionHogar) {
    this.contenedor = contenedor;
    this.onAccionHogar = onAccionHogar;
    this.traductor = new MotorTraductor();
  }

  render(estado) {
    const hoy = GameEngine.fechaHoyYMD();
    const diaNum = GameEngine.calcularDiasDesdeInicio(estado.perfil.fechaInicio);

    this.contenedor.innerHTML = `
      <div class="tablon-header">
        <div class="tablon-title-wrap">
          <h1>Tablón del Refugio</h1>
          <span class="tablon-subtitle">Día ${diaNum} en el Yermo &bull; ${hoy}</span>
        </div>
        <button id="btn-nueva-senda" class="btn-crear-senda">
          <span>+</span> Forjar Senda
        </button>
      </div>

      <!-- SECCIÓN 1: SENDAS (Hábitos a Forjar) -->
      <section class="tablon-seccion">
        <div class="seccion-header">
          <span class="seccion-titulo">🏃 Sendas a Forjar</span>
          <span class="seccion-sub">Checklist diario</span>
        </div>
        <div class="sendas-grid">
          ${estado.sendas.map(senda => {
            const cumplidoHoy = senda.ultimoCheck === hoy;
            const recursosTexto = Object.entries(senda.recurso || {})
              .map(([rec, cant]) => `${this.getEmojiRecurso(rec)} x${cant}`)
              .join(' ');

            return `
              <div class="card-item ${cumplidoHoy ? 'cumplido' : ''}" data-id="${senda.id}">
                <div class="card-main">
                  <button class="check-trigger btn-check-senda" data-id="${senda.id}" ${cumplidoHoy ? 'disabled' : ''}>
                    ${cumplidoHoy ? '✓' : ''}
                  </button>
                  <div class="card-info">
                    <div class="card-nombre-lore">${senda.icono || '⛺'} ${senda.nombreLore}</div>
                    <div class="card-nombre-real">
                      <span>${senda.nombreOriginal}</span>
                      <span class="tag-freq">${senda.frecuencia}</span>
                    </div>
                  </div>
                </div>
                <div class="card-meta">
                  <span>Racha: <strong>${senda.racha || 0}</strong> días</span>
                  <span class="card-recompensa">+${recursosTexto}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- SECCIÓN 2: CADENAS A ROMPER -->
      <section class="tablon-seccion">
        <div class="seccion-header">
          <span class="seccion-titulo">⛓️ Cadenas a Romper</span>
          <span class="seccion-sub">Sin culpa ni juicio</span>
        </div>
        <div class="cadenas-grid">
          ${estado.cadenas.map(cadena => {
            return `
              <div class="card-item card-cadena" data-id="${cadena.id}">
                <div class="card-main">
                  <div class="card-info">
                    <div class="card-nombre-lore">${cadena.icono || '⛓️'} ${cadena.nombreLore}</div>
                    <div class="card-nombre-real">
                      <span>Hábito a dejar: ${cadena.nombreOriginal}</span>
                    </div>
                  </div>
                  <button class="btn-cadena-tensa btn-marcar-cadena" data-id="${cadena.id}">
                    Hoy se tensó
                  </button>
                </div>
                <div class="card-meta">
                  <span>Tensadas este mes: <strong>${cadena.recaidasMes || 0}</strong></span>
                  <span style="color: var(--accent-amber-light);">El puente resiste</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- SECCIÓN 3: FAROS (Metas y Ahorro) -->
      ${estado.faros.length > 0 ? `
        <section class="tablon-seccion">
          <div class="seccion-header">
            <span class="seccion-titulo">🕯️ Faros de Rumbo</span>
            <span class="seccion-sub">Metas de largo alcance</span>
          </div>
          <div class="faros-grid">
            ${estado.faros.map(faro => {
              const porcentaje = Math.min(100, Math.round((faro.actualMonto / faro.metaMonto) * 100));
              return `
                <div class="card-item card-faro">
                  <div class="card-info">
                    <div class="card-nombre-lore">${faro.icono || '🪙'} ${faro.nombreLore}</div>
                    <div class="faro-stats">
                      <span>${faro.unidad}${faro.actualMonto} de ${faro.unidad}${faro.metaMonto}</span>
                      <span>${porcentaje}%</span>
                    </div>
                    <div class="barra-progreso-wrap">
                      <div class="barra-progreso" style="width: ${porcentaje}%;"></div>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      ` : ''}
    `;

    this.vincularEventos();
  }

  vincularEventos() {
    // Check en Sendas
    this.contenedor.querySelectorAll('.btn-check-senda').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.dataset.id;
        const resultado = await estadoApp.marcarSenda(id);
        if (resultado) {
          this.mostrarFeedbackRecompensa(resultado);
        }
      });
    });

    // Registrar Cadena Tensada
    this.contenedor.querySelectorAll('.btn-marcar-cadena').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.currentTarget.dataset.id;
        await estadoApp.registrarCadenaTensada(id);
        if (this.onAccionHogar) {
          this.onAccionHogar();
        }
      });
    });

    // Abrir Modal Nueva Senda
    const btnNuevaSenda = this.contenedor.querySelector('#btn-nueva-senda');
    if (btnNuevaSenda) {
      btnNuevaSenda.addEventListener('click', () => this.abrirModalNuevaSenda());
    }
  }

  mostrarFeedbackRecompensa({ senda, ganados }) {
    const banner = document.getElementById('banner-notificacion');
    if (!banner) return;

    const premios = Object.entries(ganados)
      .map(([r, c]) => `${this.getEmojiRecurso(r)} +${c}`)
      .join(', ');

    banner.innerHTML = `<strong>¡Avance en el Yermo!</strong> ${senda.nombreLore} cumplido (${premios})`;
    banner.classList.remove('hidden');

    setTimeout(() => {
      banner.classList.add('hidden');
    }, 3500);
  }

  abrirModalNuevaSenda() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <h2 style="font-size: 1.1rem; margin-bottom: 12px; color: var(--text-primary);">Bautizar Nueva Senda</h2>
      <div class="form-group">
        <label for="input-nombre-real">Acción cotidiana en el mundo real:</label>
        <input type="text" id="input-nombre-real" class="form-input" placeholder="Ej: Leer 15 min, Tomar agua, Hacer yoga..." autofocus>
      </div>

      <div class="form-group">
        <label for="select-frecuencia">Frecuencia objetivo:</label>
        <select id="select-frecuencia" class="form-select">
          <option value="diario">Diario</option>
          <option value="2x/semana">2 veces por semana</option>
          <option value="3x/semana">3 veces por semana</option>
          <option value="5x/semana">5 veces por semana</option>
        </select>
      </div>

      <div class="traduccion-preview">
        <div class="traduccion-preview-title">Traducción al Yermo:</div>
        <div class="traduccion-preview-lore" id="preview-lore">Escribe una acción para traducir...</div>
      </div>

      <div class="modal-actions">
        <button id="btn-cancelar-modal" class="btn-secondary" style="flex: 1;">Cancelar</button>
        <button id="btn-guardar-senda" class="btn-primary" style="flex: 2;">Forjar en el Tablón</button>
      </div>
    `;

    const inputNombre = modalContent.querySelector('#input-nombre-real');
    const previewLore = modalContent.querySelector('#preview-lore');
    const btnGuardar = modalContent.querySelector('#btn-guardar-senda');
    const btnCancelar = modalContent.querySelector('#btn-cancelar-modal');

    inputNombre.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val) {
        const trans = this.traductor.traducirAccion(val);
        previewLore.innerHTML = `${trans.icono} <strong>${trans.lore}</strong>`;
      } else {
        previewLore.textContent = 'Escribe una acción para traducir...';
      }
    });

    btnCancelar.addEventListener('click', () => {
      modalContainer.classList.add('hidden');
    });

    btnGuardar.addEventListener('click', async () => {
      const nombreReal = inputNombre.value.trim();
      const frecuencia = modalContent.querySelector('#select-frecuencia').value;
      if (!nombreReal) return;

      await estadoApp.agregarSenda(nombreReal, frecuencia);
      modalContainer.classList.add('hidden');
    });

    modalContainer.classList.remove('hidden');
  }

  getEmojiRecurso(tipo) {
    const mapa = {
      tablas: '🪵',
      provisiones: '🥕',
      clavos: '🔩',
      agua: '💧',
      moral: '🔥'
    };
    return mapa[tipo] || '📦';
  }
}
