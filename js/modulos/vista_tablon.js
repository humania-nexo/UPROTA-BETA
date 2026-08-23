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

      <!-- BOTÓN / AVISO DE NUEVA SENDA -->
      ${estado.sendas.length < infoRefugio.maxSendas ? `
        <button id="btn-nueva-senda" class="btn-yermo-secondary" style="width: 100%; margin-bottom: 18px;">
          + Trazar Nueva Senda (${estado.sendas.length}/${infoRefugio.maxSendas})
        </button>
      ` : `
        <div class="card-yermo" style="text-align: center; color: var(--text-muted); font-size: 0.76rem; margin-bottom: 18px; border-style: dashed;">
          🔒 <strong>Slots de Sendas al tope (${estado.sendas.length}/${infoRefugio.maxSendas}):</strong> Mantén constancia con tus sendas actuales y mejora tu refugio para habilitar más espacios.
        </div>
      `}

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

      <!-- BOTÓN / AVISO DE NUEVA CADENA -->
      ${estado.cadenas.length < infoRefugio.maxCadenas ? `
        <button id="btn-nueva-cadena" class="btn-yermo-secondary" style="width: 100%; margin-bottom: 18px;">
          + Atar Nueva Cadena (${estado.cadenas.length}/${infoRefugio.maxCadenas})
        </button>
      ` : `
        <div class="card-yermo" style="text-align: center; color: var(--text-muted); font-size: 0.76rem; margin-bottom: 18px; border-style: dashed;">
          🔒 <strong>Slots de Cadenas al tope (${estado.cadenas.length}/${infoRefugio.maxCadenas}):</strong> Rompe una cadena actual o sube el nivel de tu refugio para atar otra.
        </div>
      `}

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
        ${infoRefugio.maxFaros === 0 ? `
          <div class="card-yermo" style="text-align: center; color: var(--text-muted); font-size: 0.82rem;">
            🔒 Función no disponible por ahora. Concéntrate en tus primeros pasos.
          </div>
        ` : estado.faros.length === 0 ? `
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

      <!-- BOTÓN / AVISO DE NUEVO FARO -->
      ${infoRefugio.maxFaros === 0 ? '' : estado.faros.length < infoRefugio.maxFaros ? `
        <button id="btn-nuevo-faro" class="btn-yermo-secondary" style="width: 100%;">
          + Encender Faro (${estado.faros.length}/${infoRefugio.maxFaros})
        </button>
      ` : `
        <div class="card-yermo" style="text-align: center; color: var(--text-muted); font-size: 0.76rem; border-style: dashed;">
          🔒 <strong>Slots de Faros al tope (${estado.faros.length}/${infoRefugio.maxFaros}):</strong> Mejora tu refugio para habilitar más metas.
        </div>
      `}
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

    // Check de Sendas (Suma/Resta 1 con seguridad)
    this.contenedor.querySelectorAll('[data-senda-idx]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const idx = Number(btn.getAttribute('data-senda-idx'));
        const senda = estado.sendas[idx];
        if (!senda) return;

        const nuevoEstado = !senda.cumplidaHoy;
        senda.cumplidaHoy = nuevoEstado;

        if (nuevoEstado) {
          // Marcar (+1)
          senda.diasCumplidos = (senda.diasCumplidos || 0) + 1;
          senda.diasTotales = (senda.diasTotales || 0) + 1;
          senda.rachaActual = (senda.rachaActual || 0) + 1;
          senda.fallosSeguidos = 0;

          if (senda.pilar === 'cuerpo') {
            estado.bioenergia = RefugioMundoEngine.recargarBioenergia(estado.bioenergia, 35);
          }
          estado.recursos.tablas = (estado.recursos.tablas || 0) + 1;
        } else {
          // Desmarcar (-1 seguro)
          senda.diasCumplidos = Math.max(0, (senda.diasCumplidos || 1) - 1);
          senda.diasTotales = Math.max(0, (senda.diasTotales || 1) - 1);
          senda.rachaActual = Math.max(0, (senda.rachaActual || 1) - 1);

          if (senda.pilar === 'cuerpo') {
            estado.bioenergia.nivelCarga = Math.max(0, (estado.bioenergia.nivelCarga || 0) - 35);
          }
          estado.recursos.tablas = Math.max(0, (estado.recursos.tablas || 1) - 1);
        }

        senda.tasaFallos = senda.diasTotales > 0 ? (senda.diasFallados || 0) / senda.diasTotales : 0;

        await estadoApp.guardar();
      });
    });

    // Clic en Cadena para Reporte Sincero (Limpio vs Recaída)
    this.contenedor.querySelectorAll('.cadena-card').forEach((card, index) => {
      card.addEventListener('click', () => {
        const cadena = estado.cadenas[index];
        if (cadena) {
          this.abrirModalReporteCadena(index, cadena);
        }
      });
    });

    // Clic en la tarjeta de Senda para abrir Detalle y Configuración
    this.contenedor.querySelectorAll('.senda-main-info').forEach(info => {
      info.addEventListener('click', () => {
        const card = info.closest('.senda-card');
        const btn = card.querySelector('[data-senda-idx]');
        if (btn) {
          const idx = Number(btn.getAttribute('data-senda-idx'));
          this.abrirModalDetalleSenda(idx, estado.sendas[idx]);
        }
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

  abrirModalDetalleSenda(idx, senda) {
    if (!senda) return;
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    const progreso66 = Math.min(100, Math.round(((senda.diasTotales || 0) / 66) * 100));
    const tasaFallosPct = Math.round((senda.tasaFallos || 0) * 100);

    modalContent.innerHTML = `
      <div class="modal-crear-wrap">
        <button class="modal-close-btn" id="btn-cerrar-modal">&times;</button>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="font-size: 1.4rem;">${senda.pilar === 'cuerpo' ? '🏃' : senda.pilar === 'mente' ? '📜' : senda.pilar === 'espiritu' ? '🔥' : '🛠️'}</span>
          <h3 style="color: var(--text-primary); font-size: 1.1rem;">${senda.nombre}</h3>
        </div>
        <div style="font-size: 0.76rem; font-family: var(--font-mono); color: var(--pilar-${senda.pilar}-light); margin-bottom: 12px; text-transform: uppercase;">
          Pilar Asignado: +1 ${senda.pilar}
        </div>

        <!-- BARRA DE FORJADO A CIMIENTO (66 DÍAS) -->
        <div class="card-yermo" style="background: rgba(0,0,0,0.35); padding: 10px; margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 4px;">
            <span>Forjado a Cimiento:</span>
            <strong style="color: var(--oro-torta-glow);">${senda.diasTotales || 0}/66 Días (${progreso66}%)</strong>
          </div>
          <div style="background: rgba(0,0,0,0.5); height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
            <div style="width: ${progreso66}%; background: var(--oro-torta); height: 100%;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-muted);">
            <span>Racha actual: ${senda.rachaActual || 0} días</span>
            <span>Tasa de fallos: ${tasaFallosPct}% (Tope: 25%)</span>
          </div>
        </div>

        <!-- CONFIGURACIÓN DE FRECUENCIA -->
        <div style="margin-bottom: 12px;">
          <label style="font-size: 0.8rem; color: var(--text-muted);">Nombre del Hábito:</label>
          <input type="text" id="input-edit-senda-nombre" class="card-yermo" style="width: 100%; margin-top: 4px; padding: 8px; color: #fff; background: var(--bg-surface);" value="${senda.nombre}">
        </div>

        <div style="margin-bottom: 12px;">
          <label style="font-size: 0.8rem; color: var(--text-muted);">Frecuencia Objetivo:</label>
          <select id="select-edit-frecuencia" class="card-yermo" style="width: 100%; margin-top: 4px; padding: 8px; color: #fff; background: var(--bg-surface);">
            <option value="diario" ${senda.tipoFrecuencia === 'diario' ? 'selected' : ''}>Diario (Todos los días)</option>
            <option value="dias_fijos" ${senda.tipoFrecuencia === 'dias_fijos' ? 'selected' : ''}>Días Fijos de la Semana (L, M, V...)</option>
            <option value="veces_semana" ${senda.tipoFrecuencia === 'veces_semana' ? 'selected' : ''}>Veces por Semana Flexible (Ej: 3x/sem)</option>
          </select>
        </div>

        <div style="margin-bottom: 12px;">
          <label style="font-size: 0.8rem; color: var(--text-muted);">Horario Sugerido / Momento del Día:</label>
          <select id="select-edit-horario" class="card-yermo" style="width: 100%; margin-top: 4px; padding: 8px; color: #fff; background: var(--bg-surface);">
            <option value="cualquiera" ${senda.horarioObjetivo === 'cualquiera' ? 'selected' : ''}>Cualquier momento</option>
            <option value="manana" ${senda.horarioObjetivo === 'manana' ? 'selected' : ''}>Mañana (Al despertar)</option>
            <option value="tarde" ${senda.horarioObjetivo === 'tarde' ? 'selected' : ''}>Tarde (Media jornada)</option>
            <option value="noche" ${senda.horarioObjetivo === 'noche' ? 'selected' : ''}>Noche (Antes de dormir)</option>
          </select>
        </div>

        <div style="margin-bottom: 16px;">
          <label style="font-size: 0.8rem; color: var(--text-muted);">Nota / Disparador del Hábito:</label>
          <input type="text" id="input-edit-senda-nota" class="card-yermo" style="width: 100%; margin-top: 4px; padding: 8px; color: #fff; background: var(--bg-surface);" placeholder="Ej: Después del café de la mañana..." value="${senda.notaMotivacion || ''}">
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="btn-guardar-cambios-senda" class="btn-yermo-primary" style="flex: 2; padding: 10px;">
            Guardar Cambios
          </button>
          <button id="btn-eliminar-senda" class="btn-yermo-secondary" style="flex: 1; padding: 10px; color: #fca5a5; border-color: rgba(239, 68, 68, 0.4);">
            Eliminar
          </button>
        </div>
      </div>
    `;

    const cerrar = () => modalContainer.classList.add('hidden');
    modalContent.querySelector('#btn-cerrar-modal').addEventListener('click', cerrar);

    modalContent.querySelector('#btn-guardar-cambios-senda').addEventListener('click', async () => {
      const nuevoNombre = modalContent.querySelector('#input-edit-senda-nombre').value.trim();
      const nuevaFrec = modalContent.querySelector('#select-edit-frecuencia').value;
      const nuevoHorario = modalContent.querySelector('#select-edit-horario').value;
      const nuevaNota = modalContent.querySelector('#input-edit-senda-nota').value.trim();

      if (nuevoNombre) {
        senda.nombre = nuevoNombre;
        senda.tipoFrecuencia = nuevaFrec;
        senda.horarioObjetivo = nuevoHorario;
        senda.notaMotivacion = nuevaNota;
        await estadoApp.guardar();
        cerrar();
      }
    });

    modalContent.querySelector('#btn-eliminar-senda').addEventListener('click', async () => {
      if (confirm(`¿Seguro que deseas eliminar la senda "${senda.nombre}"?`)) {
        estadoApp.datos.sendas.splice(idx, 1);
        await estadoApp.guardar();
        cerrar();
      }
    });

    modalContainer.classList.remove('hidden');
  }

  abrirModalCrearSenda() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-crear-wrap">
        <button class="modal-close-btn" id="btn-cerrar-modal">&times;</button>
        <h3 style="margin-bottom: 12px; color: var(--text-primary);">🏃 Trazar Nueva Senda</h3>
        
        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.8rem; color: var(--text-muted);">Nombre del Hábito:</label>
          <input type="text" id="input-senda-nombre" class="card-yermo" style="width: 100%; margin-top: 4px; padding: 8px; color: #fff; background: var(--bg-surface);" placeholder="Ej: Correr 20 min, Leer 10 páginas, Orar...">
        </div>

        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.8rem; color: var(--text-muted);">Asignar a 1 Pilar Absoluto:</label>
          <select id="select-senda-pilar" class="card-yermo" style="width: 100%; margin-top: 4px; padding: 8px; color: #fff; background: var(--bg-surface);">
            <option value="cuerpo">🏃 Cuerpo (Salud, Movimiento, Deporte)</option>
            <option value="mente">📜 Mente (Lectura, Estudio, Concentración)</option>
            <option value="espiritu">🔥 Espíritu (Vida interior, Calma, Oración)</option>
            <option value="taller">🛠️ Taller (Trabajo manual, Reparar, Dibujar)</option>
          </select>
        </div>

        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.8rem; color: var(--text-muted);">Frecuencia / Días de Ejecución:</label>
          <select id="select-senda-frecuencia" class="card-yermo" style="width: 100%; margin-top: 4px; padding: 8px; color: #fff; background: var(--bg-surface);">
            <option value="diario">Diario (7 días a la semana)</option>
            <option value="dias_fijos">Días Fijos de la Semana (L-M-V...)</option>
            <option value="veces_semana">Veces por Semana Flexible (Ej: 3x/sem)</option>
          </select>
        </div>

        <div style="margin-bottom: 14px;">
          <label style="font-size: 0.8rem; color: var(--text-muted);">Horario / Momento del Día:</label>
          <select id="select-senda-horario" class="card-yermo" style="width: 100%; margin-top: 4px; padding: 8px; color: #fff; background: var(--bg-surface);">
            <option value="cualquiera">Cualquier momento del día</option>
            <option value="manana">Mañana (Al despertar)</option>
            <option value="tarde">Tarde (Media jornada)</option>
            <option value="noche">Noche (Antes de dormir)</option>
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
      const frecuencia = modalContent.querySelector('#select-senda-frecuencia').value;
      const horario = modalContent.querySelector('#select-senda-horario').value;
      if (!nombre) return;

      try {
        await estadoApp.agregarSenda(nombre, pilar);
        // Asignar parámetros extra
        const nueva = estadoApp.datos.sendas[estadoApp.datos.sendas.length - 1];
        if (nueva) {
          nueva.tipoFrecuencia = frecuencia;
          nueva.horarioObjetivo = horario;
          await estadoApp.guardar();
        }
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

  abrirModalReporteCadena(idx, cadena) {
    if (!cadena) return;
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="modal-crear-wrap">
        <button class="modal-close-btn" id="btn-cerrar-modal">&times;</button>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span style="font-size: 1.4rem;">⛓️</span>
          <h3 style="color: var(--text-primary); font-size: 1.1rem;">${cadena.nombre}</h3>
        </div>
        <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 14px;">
          Desafío de 21 días continuos para romper el mal hábito. Sé honesto contigo mismo.
        </p>

        <!-- ESTADO ACTUAL -->
        <div class="card-yermo" style="background: rgba(0,0,0,0.35); padding: 12px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 6px;">
            <span>Días Limpios:</span>
            <strong style="color: var(--oro-torta-glow);">${cadena.diasLimpiosConsecutivos || 0}/21 Días</strong>
          </div>
          <div style="background: rgba(0,0,0,0.5); height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
            <div style="width: ${Math.min(100, Math.round(((cadena.diasLimpiosConsecutivos || 0) / 21) * 100))}%; background: #22c55e; height: 100%;"></div>
          </div>
          <div style="font-size: 0.74rem; color: ${cadena.estadoPuente === 'tiembla' ? '#fca5a5' : 'var(--text-muted)'};">
            Estado: <strong>${cadena.estadoPuente === 'tiembla' ? '⚠️ El puente tiembla (Recaída reciente)' : 'Paso firme en el puente'}</strong>
          </div>
        </div>

        <div style="font-size: 0.82rem; color: var(--text-primary); font-weight: 600; margin-bottom: 8px;">
          ¿Cómo transcurrió tu día hoy?
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
          <button id="btn-reporte-limpio" class="btn-yermo-primary" style="background: #15803d; border-color: #22c55e; padding: 10px; font-size: 0.85rem;">
            ✓ Me mantuve libre hoy (Día Limpio +1)
          </button>
          <button id="btn-reporte-recaida" class="btn-yermo-secondary" style="background: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.5); color: #fca5a5; padding: 10px; font-size: 0.85rem;">
            ⚠️ Tuve una recaída hoy (Sinceridad sin culpa)
          </button>
        </div>

        <button id="btn-desatar-cadena" class="btn-yermo-secondary" style="width: 100%; font-size: 0.72rem; padding: 6px; color: var(--text-muted);">
          Desatar / Eliminar esta Cadena
        </button>
      </div>
    `;

    const cerrar = () => modalContainer.classList.add('hidden');
    modalContent.querySelector('#btn-cerrar-modal').addEventListener('click', cerrar);

    // Reporte Limpio
    modalContent.querySelector('#btn-reporte-limpio').addEventListener('click', async () => {
      const res = CadenasEngine.registrarDia(cadena, false);
      estadoApp.datos.cadenas[idx] = res.cadena;
      cadena.reportadaHoy = true;
      await estadoApp.guardar();
      cerrar();
    });

    // Reporte Recaída
    modalContent.querySelector('#btn-reporte-recaida').addEventListener('click', async () => {
      const res = CadenasEngine.registrarDia(cadena, true);
      estadoApp.datos.cadenas[idx] = res.cadena;
      cadena.reportadaHoy = true;

      if (res.activarHogar) {
        estadoApp.datos.hogarDesbloqueado = true;
      }

      await estadoApp.guardar();
      cerrar();

      if (res.activarHogar) {
        alert('Has tenido 3 recaídas consecutivas. Se ha encendido una luz en El Hogar para que puedas resguardarte y volver a empezar sin culpa.');
        document.querySelector('[data-tab="hogar"]')?.click();
      }
    });

    // Eliminar
    modalContent.querySelector('#btn-desatar-cadena').addEventListener('click', async () => {
      if (confirm(`¿Deseas desatar la cadena "${cadena.nombre}"?`)) {
        estadoApp.datos.cadenas.splice(idx, 1);
        await estadoApp.guardar();
        cerrar();
      }
    });

    modalContainer.classList.remove('hidden');
  }
}
