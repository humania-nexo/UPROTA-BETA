/**
 * Vista: Tablón Principal (Torta de 21 Días, Sendas, Cadenas y Faros)
 */

import { estadoApp } from '../core/estado.js';
import { SendasEngine } from '../core/sendas_engine.js';
import { CadenasEngine } from '../core/cadenas_engine.js';
import { FarosEngine } from '../core/faros_engine.js';
import { RefugioMundoEngine } from '../mundo/refugio_engine.js';
import { ModalInfo } from './modal_info.js';

export class VistaTablon {
  constructor(contenedor) {
    this.contenedor = contenedor;
  }

  render(estado) {
    const pilares = estadoApp.infoPilares;
    const infoRefugio = estadoApp.infoNivelRefugio;
    const piso = SendasEngine.verificarPisoMinimo(estado.sendas);

    this.contenedor.innerHTML = `
      <!-- TORTA DE EQUILIBRIO DE 21 DÍAS -->
      <div class="torta-container ${pilares.esDorado ? 'es-dorada' : ''}">
        <div class="torta-header">
          <div class="torta-titulo">
            <span>${pilares.esDorado ? '🌟' : '⚖️'}</span>
            <span>Torta de Equilibrio</span>
            <button class="btn-info-glifo" data-info-key="torta_equilibrio" title="Información vida real" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:0.85rem;">ℹ️</button>
          </div>
          <div class="torta-badge-ventana">Ventana 21 Días</div>
        </div>

        <div class="torta-visual-wrap">
          ${this.renderSvgTorta(pilares.porcentajes)}
          <div class="torta-centro">
            <span class="torta-centro-puntos">${pilares.totalPuntos}</span>
            <span class="torta-centro-label">${pilares.esDorado ? 'Dorado' : 'Puntos'}</span>
          </div>
        </div>

        <div class="pilares-grid">
          <div class="pilar-card pilar-cuerpo">
            <div class="pilar-info-left">
              <span>🏃</span>
              <span class="pilar-nombre">Cuerpo</span>
            </div>
            <span class="pilar-porcentaje">${Math.round(pilares.porcentajes.cuerpo)}%</span>
          </div>
          <div class="pilar-card pilar-mente">
            <div class="pilar-info-left">
              <span>📜</span>
              <span class="pilar-nombre">Mente</span>
            </div>
            <span class="pilar-porcentaje">${Math.round(pilares.porcentajes.mente)}%</span>
          </div>
          <div class="pilar-card pilar-espiritu">
            <div class="pilar-info-left">
              <span>🔥</span>
              <span class="pilar-nombre">Espíritu</span>
            </div>
            <span class="pilar-porcentaje">${Math.round(pilares.porcentajes.espiritu)}%</span>
          </div>
          <div class="pilar-card pilar-taller">
            <div class="pilar-info-left">
              <span>🛠️</span>
              <span class="pilar-nombre">Taller</span>
            </div>
            <span class="pilar-porcentaje">${Math.round(pilares.porcentajes.taller)}%</span>
          </div>
        </div>

        ${pilares.bonos.length > 0 ? `
          <div class="bonos-list">
            ${pilares.bonos.map(b => `
              <div class="bono-chip ${pilares.esDorado ? 'dorado' : ''}">
                <strong>${b.titulo}:</strong> ${b.desc}
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- AVISO DE PISO MÍNIMO 1-1-1-8 SI FALTA ALGÚN PILAR -->
      ${!piso.cumplePiso ? `
        <div style="background: rgba(180, 83, 9, 0.15); border: 1px solid var(--accent-rust); border-radius: var(--radius-sm); padding: 8px 12px; margin-bottom: 12px; font-size: 0.78rem; color: #fed7aa;">
          ⚠️ <strong>Piso mínimo:</strong> El Yermo te anima a sostener al menos 1 senda en cada pilar. Te falta: <em>${piso.pilaresFaltantes.join(', ')}</em>.
        </div>
      ` : ''}

      <!-- SECCIÓN: SENDAS (HÁBITOS POSITIVOS) -->
      <div class="seccion-tablon-head">
        <div class="seccion-tablon-titulo">
          <span>🏃</span>
          <span>Sendas Activas</span>
        </div>
        <span class="slots-counter">${estado.sendas.length}/${infoRefugio.maxSendas} Slots</span>
      </div>

      <div class="sendas-list">
        ${estado.sendas.length === 0 ? `
          <div class="card-yermo" style="text-align: center; color: var(--text-muted); font-size: 0.84rem;">
            No hay sendas activas. Crea tu primera senda para fortalecer tu refugio.
          </div>
        ` : estado.sendas.map((s, index) => `
          <div class="senda-card pilar-${s.pilar}">
            <div class="senda-main-info">
              <span class="senda-nombre">${s.nombre}</span>
              <span class="senda-meta">+1 ${s.pilar.toUpperCase()} &bull; Racha: ${s.rachaActual || 0}d &bull; (${s.diasTotales || 0}/66d)</span>
            </div>
            <button class="btn-check-item ${s.cumplidaHoy ? 'checked' : ''}" data-senda-idx="${index}">
              ${s.cumplidaHoy ? '✓' : ''}
            </button>
          </div>
        `).join('')}
      </div>

      <button id="btn-nueva-senda" class="btn-yermo-secondary" style="width: 100%; margin-bottom: 18px;">
        + Trazar Nueva Senda
      </button>

      <!-- SECCIÓN: CADENAS (MALOS HÁBITOS A ROMPER) -->
      <div class="seccion-tablon-head">
        <div class="seccion-tablon-titulo">
          <span>⛓️</span>
          <span>Cadenas a Romper</span>
          <button class="btn-info-glifo" data-info-key="cadenas" title="Información vida real" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:0.85rem;">ℹ️</button>
        </div>
        <span class="slots-counter">${estado.cadenas.length}/${infoRefugio.maxCadenas} Slots</span>
      </div>

      <div class="cadenas-list">
        ${estado.cadenas.length === 0 ? `
          <div class="card-yermo" style="text-align: center; color: var(--text-muted); font-size: 0.84rem;">
            Sin cadenas atadas. Añade un hábito que quieras soltar (21 días continuos).
          </div>
        ` : estado.cadenas.map((c, index) => `
          <div class="cadena-card ${c.estadoPuente === 'tiembla' ? 'tiembla' : ''}">
            <div class="senda-main-info">
              <span class="senda-nombre">${c.nombre}</span>
              <span class="senda-meta">Días libre: ${c.diasLimpiosConsecutivos || 0}/21 &bull; ${c.estadoPuente === 'tiembla' ? '⚠️ Puente tiembla' : 'Paso firme'}</span>
            </div>
            <button class="btn-check-item ${c.reportadaHoy ? 'checked' : ''}" data-cadena-idx="${index}">
              ${c.reportadaHoy ? '✓' : ''}
            </button>
          </div>
        `).join('')}
      </div>

      <button id="btn-nueva-cadena" class="btn-yermo-secondary" style="width: 100%; margin-bottom: 18px;">
        + Atar Nueva Cadena
      </button>

      <!-- SECCIÓN: FAROS (AHORRO Y PROYECTOS) -->
      <div class="seccion-tablon-head">
        <div class="seccion-tablon-titulo">
          <span>🕯️</span>
          <span>Faros y Metas</span>
          <button class="btn-info-glifo" data-info-key="faro_ahorro" title="Información vida real" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:0.85rem;">ℹ️</button>
        </div>
        <span class="slots-counter">${estado.faros.length}/${infoRefugio.maxFaros} Slots</span>
      </div>

      <div class="faros-list">
        ${estado.faros.length === 0 ? `
          <div class="card-yermo" style="text-align: center; color: var(--text-muted); font-size: 0.84rem;">
            Sin faros encendidos. Activa tu Faro de Ahorro regular (5% a 6 meses).
          </div>
        ` : estado.faros.map((f, index) => `
          <div class="faro-card">
            <div class="faro-header">
              <span class="faro-titulo">${f.nombre}</span>
              <span class="slots-counter">${f.tipoModalidad === 'tiempo' ? '6 Meses (5%)' : `$${f.montoAcumulado}/$${f.montoMeta}`}</span>
            </div>
            <div class="faro-progreso-barra-wrap">
              <div class="faro-progreso-barra" style="width: ${f.tipoModalidad === 'tiempo' ? Math.min(100, (f.checkpointsLogrados / 12) * 100) : (f.porcentajeCompletado || 0)}%;"></div>
            </div>
            <div class="faro-meta-row">
              <span>${f.tipoModalidad === 'tiempo' ? `${f.checkpointsLogrados} checkpoints logrados` : `${Math.round(f.porcentajeCompletado || 0)}% completado`}</span>
              <button class="btn-yermo-secondary" style="padding: 2px 8px; font-size: 0.72rem;" data-faro-idx="${index}">+ Aportar</button>
            </div>
          </div>
        `).join('')}
      </div>

      <button id="btn-nuevo-faro" class="btn-yermo-secondary" style="width: 100%;">
        + Encender Faro
      </button>
    `;

    this.vincularEventos(estado);
  }

  renderSvgTorta(p) {
    const c = p.cuerpo;
    const m = p.mente;
    const e = p.espiritu;
    const t = p.taller;

    const r = 70;
    const circ = 2 * Math.PI * r;

    const sC = (c / 100) * circ;
    const sM = (m / 100) * circ;
    const sE = (e / 100) * circ;
    const sT = (t / 100) * circ;

    const oC = 0;
    const oM = -sC;
    const oE = -(sC + sM);
    const oT = -(sC + sM + sE);

    return `
      <svg class="torta-svg" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r="${r}" fill="none" stroke="var(--pilar-cuerpo)" stroke-width="20" stroke-dasharray="${sC} ${circ}" stroke-dashoffset="${oC}" />
        <circle cx="80" cy="80" r="${r}" fill="none" stroke="var(--pilar-mente)" stroke-width="20" stroke-dasharray="${sM} ${circ}" stroke-dashoffset="${oM}" />
        <circle cx="80" cy="80" r="${r}" fill="none" stroke="var(--pilar-espiritu)" stroke-width="20" stroke-dasharray="${sE} ${circ}" stroke-dashoffset="${oE}" />
        <circle cx="80" cy="80" r="${r}" fill="none" stroke="var(--pilar-taller)" stroke-width="20" stroke-dasharray="${sT} ${circ}" stroke-dashoffset="${oT}" />
      </svg>
    `;
  }

  vincularEventos(estado) {
    // Check de Sendas
    this.contenedor.querySelectorAll('[data-senda-idx]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = Number(btn.getAttribute('data-senda-idx'));
        const senda = estado.sendas[idx];
        if (!senda) return;

        senda.cumplidaHoy = !senda.cumplidaHoy;
        const res = SendasEngine.registrarCumplimiento(senda, senda.cumplidaHoy);
        estado.sendas[idx] = res.senda;

        if (senda.cumplidaHoy) {
          // Si es Cuerpo, recargar bioenergía
          if (senda.pilar === 'cuerpo') {
            estado.bioenergia = RefugioMundoEngine.recargarBioenergia(estado.bioenergia, 35);
          }
          estado.recursos.tablas = (estado.recursos.tablas || 0) + 1;
        }

        await estadoApp.guardar();
      });
    });

    // Crear Senda
    const btnSenda = this.contenedor.querySelector('#btn-nueva-senda');
    if (btnSenda) {
      btnSenda.addEventListener('click', () => this.abrirModalCrearSenda());
    }

    // Crear Cadena
    const btnCadena = this.contenedor.querySelector('#btn-nueva-cadena');
    if (btnCadena) {
      btnCadena.addEventListener('click', () => this.abrirModalCrearCadena());
    }

    // Crear Faro
    const btnFaro = this.contenedor.querySelector('#btn-nuevo-faro');
    if (btnFaro) {
      btnFaro.addEventListener('click', () => this.abrirModalCrearFaro());
    }

    // Botones de Información ℹ️ (Puente a la Vida Real)
    this.contenedor.querySelectorAll('.btn-info-glifo').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const key = btn.getAttribute('data-info-key');
        ModalInfo.abrir(key);
      });
    });
  }

  abrirModalCrearSenda() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-crear-wrap">
        <button class="modal-close-btn" id="btn-cerrar-modal">&times;</button>
        <h3 style="margin-bottom: 12px; color: var(--text-primary);">🏃 Trazar Nueva Senda</h3>
        
        <div style="margin-bottom: 12px;">
          <label style="font-size: 0.8rem; color: var(--text-muted);">Nombre del Hábito:</label>
          <input type="text" id="input-senda-nombre" class="card-yermo" style="width: 100%; margin-top: 4px; padding: 8px; color: #fff; background: var(--bg-surface);" placeholder="Ej: Correr 20 min, Leer 10 páginas, Orar...">
        </div>

        <div style="margin-bottom: 14px;">
          <label style="font-size: 0.8rem; color: var(--text-muted);">Asignar a 1 Pilar Absoluto:</label>
          <select id="select-senda-pilar" class="card-yermo" style="width: 100%; margin-top: 4px; padding: 8px; color: #fff; background: var(--bg-surface);">
            <option value="cuerpo">🏃 Cuerpo (Salud, Movimiento, Deporte)</option>
            <option value="mente">📜 Mente (Lectura, Estudio, Concentración)</option>
            <option value="espiritu">🔥 Espíritu (Vida interior, Calma, Oración)</option>
            <option value="taller">🛠️ Taller (Trabajo manual, Reparar, Dibujar)</option>
          </select>
        </div>

        <button id="btn-guardar-senda" class="btn-yermo-primary" style="width: 100%; padding: 12px;">
          Guardar Senda (+1 Pilar)
        </button>
      </div>
    `;

    const cerrar = () => modalContainer.classList.add('hidden');
    modalContent.querySelector('#btn-cerrar-modal').addEventListener('click', cerrar);

    modalContent.querySelector('#btn-guardar-senda').addEventListener('click', async () => {
      const nombre = modalContent.querySelector('#input-senda-nombre').value.trim();
      const pilar = modalContent.querySelector('#select-senda-pilar').value;
      if (!nombre) return;

      try {
        await estadoApp.agregarSenda(nombre, pilar);
        cerrar();
      } catch (e) {
        alert(e.message);
      }
    });

    modalContainer.classList.remove('hidden');
  }

  abrirModalCrearCadena() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-crear-wrap">
        <button class="modal-close-btn" id="btn-cerrar-modal">&times;</button>
        <h3 style="margin-bottom: 12px; color: var(--text-primary);">⛓️ Atar Nueva Cadena (Mal Hábito)</h3>
        
        <div style="margin-bottom: 14px;">
          <label style="font-size: 0.8rem; color: var(--text-muted);">¿Qué hábito quieres romper (21 días continuos)?:</label>
          <input type="text" id="input-cadena-nombre" class="card-yermo" style="width: 100%; margin-top: 4px; padding: 8px; color: #fff; background: var(--bg-surface);" placeholder="Ej: Fumar, Refresco con azúcar, Scroll infinito...">
        </div>

        <button id="btn-guardar-cadena" class="btn-yermo-primary" style="width: 100%; padding: 12px;">
          Comenzar Desafío 21 Días
        </button>
      </div>
    `;

    const cerrar = () => modalContainer.classList.add('hidden');
    modalContent.querySelector('#btn-cerrar-modal').addEventListener('click', cerrar);

    modalContent.querySelector('#btn-guardar-cadena').addEventListener('click', async () => {
      const nombre = modalContent.querySelector('#input-cadena-nombre').value.trim();
      if (!nombre) return;

      try {
        await estadoApp.agregarCadena(nombre);
        cerrar();
      } catch (e) {
        alert(e.message);
      }
    });

    modalContainer.classList.remove('hidden');
  }

  abrirModalCrearFaro() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-crear-wrap">
        <button class="modal-close-btn" id="btn-cerrar-modal">&times;</button>
        <h3 style="margin-bottom: 12px; color: var(--text-primary);">🕯️ Encender Faro</h3>
        
        <div style="margin-bottom: 12px;">
          <label style="font-size: 0.8rem; color: var(--text-muted);">Modalidad de Faro:</label>
          <select id="select-faro-tipo" class="card-yermo" style="width: 100%; margin-top: 4px; padding: 8px; color: #fff; background: var(--bg-surface);">
            <option value="tiempo">Modalidad 1: Ahorro Regular (6 Meses, 5% Ingreso Fijo)</option>
            <option value="monto">Modalidad 2: Meta Específica por Monto (Ej. Bici, Curso)</option>
          </select>
        </div>

        <div id="wrap-faro-monto" style="display: none; margin-bottom: 12px;">
          <label style="font-size: 0.8rem; color: var(--text-muted);">Nombre del Proyecto y Monto:</label>
          <input type="text" id="input-faro-nombre-monto" class="card-yermo" style="width: 100%; margin-top: 4px; padding: 8px; color: #fff; background: var(--bg-surface);" placeholder="Ej: Bicicleta de montaña">
          <input type="number" id="input-faro-meta-monto" class="card-yermo" style="width: 100%; margin-top: 4px; padding: 8px; color: #fff; background: var(--bg-surface);" placeholder="Monto objetivo (Ej: 200)">
        </div>

        <button id="btn-guardar-faro" class="btn-yermo-primary" style="width: 100%; padding: 12px;">
          Encender Faro
        </button>
      </div>
    `;

    const selectTipo = modalContent.querySelector('#select-faro-tipo');
    const wrapMonto = modalContent.querySelector('#wrap-faro-monto');

    selectTipo.addEventListener('change', () => {
      wrapMonto.style.display = selectTipo.value === 'monto' ? 'block' : 'none';
    });

    const cerrar = () => modalContainer.classList.add('hidden');
    modalContent.querySelector('#btn-cerrar-modal').addEventListener('click', cerrar);

    modalContent.querySelector('#btn-guardar-faro').addEventListener('click', async () => {
      const tipo = selectTipo.value;
      let nuevoFaro;

      if (tipo === 'tiempo') {
        nuevoFaro = FarosEngine.crearFaroAhorroTiempo('quincenal');
      } else {
        const nombre = modalContent.querySelector('#input-faro-nombre-monto').value.trim() || 'Proyecto Meta';
        const meta = Number(modalContent.querySelector('#input-faro-meta-monto').value) || 100;
        nuevoFaro = FarosEngine.crearFaroMonto(nombre, meta);
      }

      try {
        await estadoApp.agregarFaro(nuevoFaro);
        cerrar();
      } catch (e) {
        alert(e.message);
      }
    });

    modalContainer.classList.remove('hidden');
  }
}
