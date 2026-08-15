/**
 * Módulo de UI: Tablón (Checklist Diario y Límites de Ranuras Make-to-Win)
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
    const infoRefugio = GameEngine.calcularNivelRefugio(estado.recursos);

    const totalLabores = (estado.sendas.length + estado.cadenas.length + estado.faros.length);
    const numSendas = estado.sendas.length;
    const maxSendas = infoRefugio.maxSendas;
    const numFaros = estado.faros.length;
    const maxFaros = infoRefugio.maxFaros;

    this.contenedor.innerHTML = `
      <div class="tablon-header">
        <div class="tablon-title-wrap">
          <h1>Tablón de Labores</h1>
          <span class="tablon-subtitle">Día ${diaNum} &bull; ${estado.perfil.nombre} &bull; Refugio Nv.${infoRefugio.nivel}</span>
        </div>
        <div class="header-tablon-btns">
          <button id="btn-menu-crear" class="btn-crear-senda">
            <span>+</span> Nueva Labor
          </button>
        </div>
      </div>

      <!-- ZERO STATE: Si no hay labores creadas -->
      ${totalLabores === 0 ? this.renderZeroState() : ''}

      <!-- SECCIÓN 1: SENDAS A FORJAR -->
      <section class="tablon-seccion">
        <div class="seccion-header">
          <span class="seccion-titulo">
            🏃 Sendas a Forjar
            <span class="badge-slots ${numSendas >= maxSendas ? 'lleno' : ''}">
              ${numSendas}/${maxSendas} ranuras
            </span>
          </span>
          <span class="seccion-sub">Toca la tarjeta para configurar</span>
        </div>

        ${estado.sendas.length > 0 ? `
          <div class="sendas-grid">
            ${estado.sendas.map(senda => {
              const cumplidoHoy = senda.ultimoCheck === hoy;
              const recursosTexto = Object.entries(senda.recurso || {})
                .map(([rec, cant]) => `${this.getEmojiRecurso(rec)} x${cant}`)
                .join(' ');

              return `
                <div class="card-item card-senda-item ${cumplidoHoy ? 'cumplido' : ''}" data-id="${senda.id}">
                  <div class="card-main">
                    <button class="check-trigger btn-check-senda" data-id="${senda.id}" ${cumplidoHoy ? 'disabled' : ''} title="Marcar como cumplida">
                      ${cumplidoHoy ? '✓' : ''}
                    </button>
                    <div class="card-info btn-abrir-config-senda" data-id="${senda.id}">
                      <div class="card-nombre-lore">${senda.icono || '⛺'} ${senda.nombreLore}</div>
                      <div class="card-nombre-real">
                        <span class="texto-natural-label">"${senda.textoNatural}"</span>
                        <span class="tag-freq">${this.formatearFrecuencia(senda)}</span>
                        ${senda.franjaHoraria && senda.franjaHoraria !== 'libre' ? `<span class="tag-franja">${this.getIconoFranja(senda.franjaHoraria)}</span>` : ''}
                      </div>
                    </div>
                  </div>
                  <div class="card-meta btn-abrir-config-senda" data-id="${senda.id}">
                    <span>Racha: <strong>${senda.racha || 0}</strong> d &bull; Total: <strong>${senda.checksTotal || 0}</strong></span>
                    <span class="card-recompensa">+${recursosTexto}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : (totalLabores > 0 ? `
          <div class="slot-vacio-aviso" id="btn-crear-senda-directo">
            + Forjar una Senda (${numSendas}/${maxSendas} disponibles)
          </div>
        ` : '')}
      </section>

      <!-- SECCIÓN 2: CADENAS A ROMPER -->
      ${estado.cadenas.length > 0 ? `
        <section class="tablon-seccion">
          <div class="seccion-header">
            <span class="seccion-titulo">⛓️ Cadenas a Romper</span>
            <span class="seccion-sub">Sin culpa ni números rojos</span>
          </div>
          <div class="cadenas-grid">
            ${estado.cadenas.map(cadena => {
              return `
                <div class="card-item card-cadena" data-id="${cadena.id}">
                  <div class="card-main">
                    <div class="card-info btn-abrir-config-cadena" data-id="${cadena.id}">
                      <div class="card-nombre-lore">${cadena.icono || '⛓️'} ${cadena.nombreLore}</div>
                      <div class="card-nombre-real">
                        <span class="texto-natural-label">"${cadena.textoNatural}"</span>
                      </div>
                    </div>
                    <button class="btn-cadena-tensa btn-marcar-cadena" data-id="${cadena.id}">
                      Hoy se tensó
                    </button>
                  </div>
                  <div class="card-meta btn-abrir-config-cadena" data-id="${cadena.id}">
                    <span>Tensadas este mes: <strong>${cadena.recaidasMes || 0}</strong></span>
                    <span style="color: var(--accent-amber-light);">⚙️ Configurar</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>
      ` : ''}

      <!-- SECCIÓN 3: FAROS (Metas de Ahorro / Rumbo) -->
      <section class="tablon-seccion">
        <div class="seccion-header">
          <span class="seccion-titulo">
            🕯️ Faros de Rumbo
            <span class="badge-slots ${numFaros >= maxFaros ? 'lleno' : ''}">
              ${numFaros}/${maxFaros} ranuras
            </span>
          </span>
          <span class="seccion-sub">Metas de largo plazo</span>
        </div>

        ${estado.faros.length > 0 ? `
          <div class="faros-grid">
            ${estado.faros.map(faro => {
              const porcentaje = Math.min(100, Math.round((faro.actualMonto / faro.metaMonto) * 100)) || 0;
              return `
                <div class="card-item card-faro btn-abrir-config-faro" data-id="${faro.id}">
                  <div class="card-info">
                    <div class="card-nombre-lore">${faro.icono || '🕯️'} ${faro.nombreLore}</div>
                    <div class="card-nombre-real" style="margin-bottom: 6px;">
                      <span class="texto-natural-label">"${faro.textoNatural}"</span>
                    </div>
                    <div class="faro-stats">
                      <span>${faro.unidad}${faro.actualMonto} / ${faro.unidad}${faro.metaMonto}</span>
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
        ` : (totalLabores > 0 ? `
          <div class="slot-vacio-aviso" id="btn-crear-faro-directo">
            + Fijar un Faro (${numFaros}/${maxFaros} disponibles)
          </div>
        ` : '')}
      </section>
    `;

    this.vincularEventos(infoRefugio);
  }

  renderZeroState() {
    return `
      <div class="zero-state-card">
        <div class="zero-state-icon">🏕️</div>
        <h3>Tu Refugio está en Punto Cero</h3>
        <p>Inicias con <strong>3 ranuras de Senda</strong> y <strong>1 ranura de Faro</strong>. A medida que cumplas tus labores y acumules recursos, tu refugio subirá de nivel desbloqueando más espacio.</p>
        
        <div class="zero-state-actions">
          <button id="btn-zero-senda" class="btn-primary">
            🏃 Forjar Primera Senda
          </button>
          <button id="btn-zero-cadena" class="btn-secondary">
            ⛓️ Añadir Cadena a Romper
          </button>
          <button id="btn-zero-faro" class="btn-secondary">
            🕯️ Fijar un Faro / Meta
          </button>
        </div>

        <div class="zero-state-suggestions">
          <div class="sugg-title">O añade una labor de auxilio inicial con 1 toque:</div>
          <div class="sugg-chips">
            <button class="chip-sugg" data-tarea="Trotar o caminar 20 min">🏃 Patrulla de caminata</button>
            <button class="chip-sugg" data-tarea="Lavar los platos de hoy">🥣 Purificar utensilios</button>
            <button class="chip-sugg" data-tarea="Leer 15 min">📜 Decodificar manuales</button>
            <button class="chip-sugg" data-tarea="Tomar 2L de agua">💧 Ración de agua</button>
          </div>
        </div>
      </div>
    `;
  }

  vincularEventos(infoRefugio) {
    // Check rápido en sendas
    this.contenedor.querySelectorAll('.btn-check-senda').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        const resultado = await estadoApp.marcarSenda(id);
        if (resultado) {
          this.mostrarFeedbackRecompensa(resultado);
        }
      });
    });

    // Botón Cadena Tensada
    this.contenedor.querySelectorAll('.btn-marcar-cadena').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        await estadoApp.registrarCadenaTensada(id);
        if (this.onAccionHogar) {
          this.onAccionHogar();
        }
      });
    });

    // Tocar tarjeta para CONFIGURAR / EDITAR
    this.contenedor.querySelectorAll('.btn-abrir-config-senda').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.abrirModalConfigSenda(id);
      });
    });

    this.contenedor.querySelectorAll('.btn-abrir-config-cadena').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.abrirModalConfigCadena(id);
      });
    });

    this.contenedor.querySelectorAll('.btn-abrir-config-faro').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.abrirModalConfigFaro(id);
      });
    });

    // Intentar crear con validación de límite
    const intentarCrearSenda = () => {
      if (estadoApp.estado.sendas.length >= infoRefugio.maxSendas) {
        this.mostrarModalLimiteAlcanzado('senda', infoRefugio);
      } else {
        this.abrirModalCrearSenda();
      }
    };

    const intentarCrearFaro = () => {
      if (estadoApp.estado.faros.length >= infoRefugio.maxFaros) {
        this.mostrarModalLimiteAlcanzado('faro', infoRefugio);
      } else {
        this.abrirModalCrearFaro();
      }
    };

    const btnCrear = this.contenedor.querySelector('#btn-menu-crear');
    if (btnCrear) {
      btnCrear.addEventListener('click', () => this.abrirMenuTipoCreacion(infoRefugio));
    }

    const btnZeroSenda = this.contenedor.querySelector('#btn-zero-senda');
    if (btnZeroSenda) btnZeroSenda.addEventListener('click', intentarCrearSenda);

    const btnZeroCadena = this.contenedor.querySelector('#btn-zero-cadena');
    if (btnZeroCadena) btnZeroCadena.addEventListener('click', () => this.abrirModalCrearCadena());

    const btnZeroFaro = this.contenedor.querySelector('#btn-zero-faro');
    if (btnZeroFaro) btnZeroFaro.addEventListener('click', intentarCrearFaro);

    const btnSendaDirecto = this.contenedor.querySelector('#btn-crear-senda-directo');
    if (btnSendaDirecto) btnSendaDirecto.addEventListener('click', intentarCrearSenda);

    const btnFaroDirecto = this.contenedor.querySelector('#btn-crear-faro-directo');
    if (btnFaroDirecto) btnFaroDirecto.addEventListener('click', intentarCrearFaro);

    // Chips de sugerencia rápida
    this.contenedor.querySelectorAll('.chip-sugg').forEach(chip => {
      chip.addEventListener('click', async (e) => {
        if (estadoApp.estado.sendas.length >= infoRefugio.maxSendas) {
          this.mostrarModalLimiteAlcanzado('senda', infoRefugio);
          return;
        }
        const texto = e.currentTarget.dataset.tarea;
        await estadoApp.agregarSenda({ textoNatural: texto });
      });
    });
  }

  // Modal cuando se alcanza el límite de ranuras
  mostrarModalLimiteAlcanzado(tipo, infoRefugio) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    const esSenda = tipo === 'senda';
    const sig = infoRefugio.siguienteNivel;

    let reqTexto = "¡Has alcanzado la cima de la Ciudadela!";
    if (sig) {
      reqTexto = Object.entries(sig.requisitos)
        .map(([r, c]) => `${this.getEmojiRecurso(r)} ${c}`)
        .join(' &bull; ');
    }

    modalContent.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 2.4rem; margin-bottom: 8px;">🛖⚠️</div>
        <h2 style="font-size: 1.2rem; color: #fbbf24; margin-bottom: 8px;">
          Límite de Ranuras Alcanzado (${esSenda ? infoRefugio.maxSendas : infoRefugio.maxFaros} max)
        </h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">
          Tu refugio actual (<strong>Nivel ${infoRefugio.nivel}: ${infoRefugio.nombre}</strong>) solo puede sostener ${esSenda ? infoRefugio.maxSendas : infoRefugio.maxFaros} ${esSenda ? 'sendas' : 'faros'} sin dispersar tu energía.
        </p>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-strong); border-radius: var(--radius-md); padding: 14px; text-align: left; margin-bottom: 16px;">
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--accent-amber-light); font-weight: 700; margin-bottom: 4px;">
            🏗️ Cómo desbloquear más ranuras (Make-to-Win):
          </div>
          <div style="font-size: 0.84rem; color: var(--text-primary); line-height: 1.4;">
            Cumple tus labores actuales para reunir materiales y subir tu refugio a <strong>Nivel ${sig ? sig.nivel : 10}: ${sig ? sig.nombre : 'Máximo'}</strong> (+2 ranuras de Senda).
          </div>
          ${sig ? `
            <div style="font-size: 0.78rem; font-family: var(--font-mono); color: var(--accent-amber-light); margin-top: 8px; border-top: 1px dashed var(--border-subtle); padding-top: 6px;">
              Requisitos: ${reqTexto}
            </div>
          ` : ''}
        </div>

        <button id="btn-cerrar-limite" class="btn-primary" style="width: 100%;">
          Entendido, a forjar con disciplina
        </button>
      </div>
    `;

    modalContent.querySelector('#btn-cerrar-limite').addEventListener('click', () => {
      modalContainer.classList.add('hidden');
    });

    modalContainer.classList.remove('hidden');
  }

  // --- MENÚ Y MODALES DE CREACIÓN ---
  abrirMenuTipoCreacion(infoRefugio) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <h2 style="font-size: 1.15rem; margin-bottom: 14px; color: var(--text-primary);">¿Qué deseas forjar?</h2>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <button id="btn-elegir-senda" class="btn-primary" style="justify-content: flex-start; padding: 12px 16px;">
          🏃 <strong>Senda (Hábito Positivo)</strong> [${estadoApp.estado.sendas.length}/${infoRefugio.maxSendas}]
        </button>
        <button id="btn-elegir-cadena" class="btn-secondary" style="justify-content: flex-start; padding: 12px 16px;">
          ⛓️ <strong>Cadena a Romper (Hábito a Dejar)</strong>
        </button>
        <button id="btn-elegir-faro" class="btn-secondary" style="justify-content: flex-start; padding: 12px 16px;">
          🕯️ <strong>Faro de Rumbo (Meta de Ahorro)</strong> [${estadoApp.estado.faros.length}/${infoRefugio.maxFaros}]
        </button>
      </div>
      <div class="modal-actions" style="margin-top: 14px;">
        <button id="btn-cerrar-menu-crear" class="btn-secondary" style="width: 100%;">Cancelar</button>
      </div>
    `;

    modalContent.querySelector('#btn-cerrar-menu-crear').addEventListener('click', () => modalContainer.classList.add('hidden'));

    modalContent.querySelector('#btn-elegir-senda').addEventListener('click', () => {
      if (estadoApp.estado.sendas.length >= infoRefugio.maxSendas) {
        this.mostrarModalLimiteAlcanzado('senda', infoRefugio);
      } else {
        this.abrirModalCrearSenda();
      }
    });

    modalContent.querySelector('#btn-elegir-cadena').addEventListener('click', () => this.abrirModalCrearCadena());

    modalContent.querySelector('#btn-elegir-faro').addEventListener('click', () => {
      if (estadoApp.estado.faros.length >= infoRefugio.maxFaros) {
        this.mostrarModalLimiteAlcanzado('faro', infoRefugio);
      } else {
        this.abrirModalCrearFaro();
      }
    });

    modalContainer.classList.remove('hidden');
  }

  abrirModalCrearSenda(textoInicial = "") {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <h2 style="font-size: 1.15rem; margin-bottom: 12px; color: var(--text-primary);">Forjar Nueva Senda</h2>

      <div class="form-group">
        <label for="input-texto-natural">Labor cotidiana en tu lenguaje natural:</label>
        <input type="text" id="input-texto-natural" class="form-input" value="${textoInicial}" placeholder="Ej: Trotar 20 min en las mañanas..." autofocus>
      </div>

      <div class="traduccion-preview">
        <div class="traduccion-preview-title">Traducción Épica al Yermo:</div>
        <div class="traduccion-preview-lore" id="preview-lore">Escribe una acción arriba...</div>
      </div>

      <div class="form-group" style="margin-top: 12px;">
        <label for="select-frecuencia">Frecuencia:</label>
        <select id="select-frecuencia" class="form-select">
          <option value="diario">Todos los días</option>
          <option value="dias_fijos">Días específicos de la semana</option>
          <option value="2x/semana">Flexible: 2 veces por semana</option>
          <option value="3x/semana">Flexible: 3 veces por semana</option>
          <option value="5x/semana">Flexible: 5 veces por semana</option>
        </select>
      </div>

      <div id="grupo-dias-semana" class="form-group hidden">
        <label>Selecciona los días:</label>
        <div class="dias-selector-grid">
          <label class="dia-btn"><input type="checkbox" value="lun" checked> L</label>
          <label class="dia-btn"><input type="checkbox" value="mar" checked> M</label>
          <label class="dia-btn"><input type="checkbox" value="mie" checked> M</label>
          <label class="dia-btn"><input type="checkbox" value="jue" checked> J</label>
          <label class="dia-btn"><input type="checkbox" value="vie" checked> V</label>
          <label class="dia-btn"><input type="checkbox" value="sab"> S</label>
          <label class="dia-btn"><input type="checkbox" value="dom"> D</label>
        </div>
      </div>

      <div class="form-group">
        <label for="select-franja">Franja Horaria Preferida:</label>
        <select id="select-franja" class="form-select">
          <option value="libre">⏱️ Cualquier Momento</option>
          <option value="manana">🌅 Alba / Mañana</option>
          <option value="tarde">☀️ Cenit / Tarde</option>
          <option value="noche">🌙 Ocaso / Noche</option>
        </select>
      </div>

      <div class="modal-actions">
        <button id="btn-cancelar-senda" class="btn-secondary" style="flex: 1;">Cancelar</button>
        <button id="btn-guardar-senda-nueva" class="btn-primary" style="flex: 2;">Añadir al Tablón</button>
      </div>
    `;

    const inputTexto = modalContent.querySelector('#input-texto-natural');
    const previewLore = modalContent.querySelector('#preview-lore');
    const selectFreq = modalContent.querySelector('#select-frecuencia');
    const grupoDias = modalContent.querySelector('#grupo-dias-semana');

    const actualizarPreview = () => {
      const val = inputTexto.value.trim();
      if (val) {
        const trans = this.traductor.traducirAccion(val);
        previewLore.innerHTML = `${trans.icono} <strong>${trans.lore}</strong>`;
      } else {
        previewLore.textContent = 'Escribe una acción arriba...';
      }
    };

    inputTexto.addEventListener('input', actualizarPreview);
    actualizarPreview();

    selectFreq.addEventListener('change', (e) => {
      if (e.target.value === 'dias_fijos') {
        grupoDias.classList.remove('hidden');
      } else {
        grupoDias.classList.add('hidden');
      }
    });

    modalContent.querySelector('#btn-cancelar-senda').addEventListener('click', () => modalContainer.classList.add('hidden'));

    modalContent.querySelector('#btn-guardar-senda-nueva').addEventListener('click', async () => {
      const texto = inputTexto.value.trim();
      if (!texto) return;

      const freq = selectFreq.value;
      const franja = modalContent.querySelector('#select-franja').value;
      let dias = [];
      if (freq === 'dias_fijos') {
        grupoDias.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => dias.push(cb.value));
      }

      await estadoApp.agregarSenda({
        textoNatural: texto,
        frecuencia: freq,
        diasSemana: dias,
        franjaHoraria: franja
      });

      modalContainer.classList.add('hidden');
    });

    modalContainer.classList.remove('hidden');
  }

  // --- MODAL DE CONFIGURACIÓN / EDICIÓN DETALLADA DE SENDA ---
  abrirModalConfigSenda(sendaId) {
    const senda = estadoApp.estado.sendas.find(s => s.id === sendaId);
    if (!senda) return;

    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="config-header">
        <div style="font-size: 0.75rem; color: var(--accent-amber-light); text-transform: uppercase; font-weight: 700;">
          Configuración de Labor
        </div>
        <h2 style="font-size: 1.15rem; color: var(--text-primary); margin: 4px 0 12px 0;">
          ${senda.icono || '⛺'} ${senda.nombreLore}
        </h2>
      </div>

      <div class="lenguaje-natural-box">
        <span class="ln-tag">Tu labor en lenguaje natural:</span>
        <div class="ln-texto">"${senda.textoNatural}"</div>
      </div>

      <div class="form-group" style="margin-top: 14px;">
        <label for="edit-nombre-lore">Nombre Épico en el Yermo:</label>
        <input type="text" id="edit-nombre-lore" class="form-input" value="${senda.nombreLore}">
      </div>

      <div class="form-group">
        <label for="edit-frecuencia">Frecuencia:</label>
        <select id="edit-frecuencia" class="form-select">
          <option value="diario" ${senda.frecuencia === 'diario' ? 'selected' : ''}>Todos los días</option>
          <option value="dias_fijos" ${senda.frecuencia === 'dias_fijos' ? 'selected' : ''}>Días específicos</option>
          <option value="2x/semana" ${senda.frecuencia === '2x/semana' ? 'selected' : ''}>Flexible: 2 veces por semana</option>
          <option value="3x/semana" ${senda.frecuencia === '3x/semana' ? 'selected' : ''}>Flexible: 3 veces por semana</option>
          <option value="5x/semana" ${senda.frecuencia === '5x/semana' ? 'selected' : ''}>Flexible: 5 veces por semana</option>
        </select>
      </div>

      <div class="form-group">
        <label for="edit-franja">Franja Horaria:</label>
        <select id="edit-franja" class="form-select">
          <option value="libre" ${senda.franjaHoraria === 'libre' ? 'selected' : ''}>⏱️ Cualquier Momento</option>
          <option value="manana" ${senda.franjaHoraria === 'manana' ? 'selected' : ''}>🌅 Alba / Mañana</option>
          <option value="tarde" ${senda.franjaHoraria === 'tarde' ? 'selected' : ''}>☀️ Cenit / Tarde</option>
          <option value="noche" ${senda.franjaHoraria === 'noche' ? 'selected' : ''}>🌙 Ocaso / Noche</option>
        </select>
      </div>

      <div class="stats-labor-box">
        <div class="stat-item-mini">
          <span>Racha activa:</span>
          <strong>${senda.racha || 0} días</strong>
        </div>
        <div class="stat-item-mini">
          <span>Cumplidas en total:</span>
          <strong>${senda.checksTotal || 0} veces</strong>
        </div>
      </div>

      <div class="modal-actions" style="margin-top: 16px;">
        <button id="btn-eliminar-senda" class="btn-secondary" style="color: var(--accent-red-soft); flex: 1;">
          🗑️ Eliminar
        </button>
        <button id="btn-guardar-config-senda" class="btn-primary" style="flex: 2;">
          💾 Guardar Cambios
        </button>
      </div>
    `;

    modalContent.querySelector('#btn-guardar-config-senda').addEventListener('click', async () => {
      const nuevoLore = modalContent.querySelector('#edit-nombre-lore').value.trim();
      const nuevaFreq = modalContent.querySelector('#edit-frecuencia').value;
      const nuevaFranja = modalContent.querySelector('#edit-franja').value;

      await estadoApp.editarSenda(sendaId, {
        nombreLore: nuevoLore || senda.nombreLore,
        frecuencia: nuevaFreq,
        franjaHoraria: nuevaFranja
      });

      modalContainer.classList.add('hidden');
    });

    modalContent.querySelector('#btn-eliminar-senda').addEventListener('click', async () => {
      if (confirm(`¿Descartar la labor "${senda.textoNatural}" del Tablón?`)) {
        await estadoApp.eliminarSenda(sendaId);
        modalContainer.classList.add('hidden');
      }
    });

    modalContainer.classList.remove('hidden');
  }

  // --- CREAR Y CONFIGURAR CADENAS ---
  abrirModalCrearCadena() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <h2 style="font-size: 1.15rem; margin-bottom: 12px; color: var(--text-primary);">Añadir Cadena a Romper</h2>
      <div class="form-group">
        <label for="input-cadena-texto">Hábito a dejar (lenguaje natural):</label>
        <input type="text" id="input-cadena-texto" class="form-input" placeholder="Ej: Fumar, tomar refresco, desvelarme en redes..." autofocus>
      </div>
      <div class="traduccion-preview">
        <div class="traduccion-preview-title">Traducción Épica:</div>
        <div class="traduccion-preview-lore" id="preview-cadena-lore">Escribe el hábito arriba...</div>
      </div>
      <div class="modal-actions" style="margin-top: 16px;">
        <button id="btn-cancelar-cad" class="btn-secondary" style="flex: 1;">Cancelar</button>
        <button id="btn-guardar-cad" class="btn-primary" style="flex: 2;">Añadir al Tablón</button>
      </div>
    `;

    const inputTxt = modalContent.querySelector('#input-cadena-texto');
    const preview = modalContent.querySelector('#preview-cadena-lore');

    inputTxt.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val) {
        const trans = this.traductor.traducirCadena(val);
        preview.innerHTML = `${trans.icono} <strong>${trans.lore}</strong>`;
      }
    });

    modalContent.querySelector('#btn-cancelar-cad').addEventListener('click', () => modalContainer.classList.add('hidden'));
    modalContent.querySelector('#btn-guardar-cad').addEventListener('click', async () => {
      const txt = inputTxt.value.trim();
      if (!txt) return;
      await estadoApp.agregarCadena({ textoNatural: txt });
      modalContainer.classList.add('hidden');
    });

    modalContainer.classList.remove('hidden');
  }

  abrirModalConfigCadena(cadenaId) {
    const cadena = estadoApp.estado.cadenas.find(c => c.id === cadenaId);
    if (!cadena) return;

    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <h2 style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 10px;">
        ${cadena.icono || '⛓️'} ${cadena.nombreLore}
      </h2>
      <div class="lenguaje-natural-box">
        <span class="ln-tag">Hábito a dejar:</span>
        <div class="ln-texto">"${cadena.textoNatural}"</div>
      </div>
      <div class="form-group" style="margin-top: 12px;">
        <label for="edit-cadena-lore">Nombre Épico:</label>
        <input type="text" id="edit-cadena-lore" class="form-input" value="${cadena.nombreLore}">
      </div>
      <div class="modal-actions" style="margin-top: 16px;">
        <button id="btn-eliminar-cad" class="btn-secondary" style="color: var(--accent-red-soft); flex: 1;">🗑️ Eliminar</button>
        <button id="btn-guardar-cad-edit" class="btn-primary" style="flex: 2;">💾 Guardar</button>
      </div>
    `;

    modalContent.querySelector('#btn-guardar-cad-edit').addEventListener('click', async () => {
      const lore = modalContent.querySelector('#edit-cadena-lore').value.trim();
      await estadoApp.editarCadena(cadenaId, { nombreLore: lore });
      modalContainer.classList.add('hidden');
    });

    modalContent.querySelector('#btn-eliminar-cad').addEventListener('click', async () => {
      if (confirm(`¿Eliminar la cadena "${cadena.textoNatural}"?`)) {
        await estadoApp.eliminarCadena(cadenaId);
        modalContainer.classList.add('hidden');
      }
    });

    modalContainer.classList.remove('hidden');
  }

  // --- CREAR Y CONFIGURAR FAROS ---
  abrirModalCrearFaro() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <h2 style="font-size: 1.15rem; margin-bottom: 12px; color: var(--text-primary);">Fijar Nuevo Faro de Rumbo</h2>
      <div class="form-group">
        <label for="input-faro-texto">Meta o Ahorro en lenguaje natural:</label>
        <input type="text" id="input-faro-texto" class="form-input" placeholder="Ej: Ahorrar para una laptop, fondo de emergencia..." autofocus>
      </div>
      <div class="form-group">
        <label for="input-faro-meta">Monto o Meta Numérica Total:</label>
        <input type="number" id="input-faro-meta" class="form-input" placeholder="5000">
      </div>
      <div class="form-group">
        <label for="input-faro-actual">Avance actual acumulado:</label>
        <input type="number" id="input-faro-actual" class="form-input" placeholder="0" value="0">
      </div>
      <div class="modal-actions" style="margin-top: 16px;">
        <button id="btn-cancelar-faro" class="btn-secondary" style="flex: 1;">Cancelar</button>
        <button id="btn-guardar-faro" class="btn-primary" style="flex: 2;">Fijar Faro</button>
      </div>
    `;

    modalContent.querySelector('#btn-cancelar-faro').addEventListener('click', () => modalContainer.classList.add('hidden'));
    modalContent.querySelector('#btn-guardar-faro').addEventListener('click', async () => {
      const txt = modalContent.querySelector('#input-faro-texto').value.trim();
      const meta = modalContent.querySelector('#input-faro-meta').value;
      const act = modalContent.querySelector('#input-faro-actual').value;
      if (!txt || !meta) return;

      await estadoApp.agregarFaro({
        textoNatural: txt,
        metaMonto: meta,
        actualMonto: act
      });
      modalContainer.classList.add('hidden');
    });

    modalContainer.classList.remove('hidden');
  }

  abrirModalConfigFaro(faroId) {
    const faro = estadoApp.estado.faros.find(f => f.id === faroId);
    if (!faro) return;

    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <h2 style="font-size: 1.15rem; color: var(--text-primary); margin-bottom: 8px;">
        ${faro.icono || '🕯️'} ${faro.nombreLore}
      </h2>
      <div class="lenguaje-natural-box">
        <span class="ln-tag">Meta de largo plazo:</span>
        <div class="ln-texto">"${faro.textoNatural}"</div>
      </div>
      <div class="form-group" style="margin-top: 12px;">
        <label for="edit-faro-actual">Actualizar Avance Numérico:</label>
        <input type="number" id="edit-faro-actual" class="form-input" value="${faro.actualMonto}">
      </div>
      <div class="form-group">
        <label for="edit-faro-meta">Meta Total:</label>
        <input type="number" id="edit-faro-meta" class="form-input" value="${faro.metaMonto}">
      </div>
      <div class="modal-actions" style="margin-top: 16px;">
        <button id="btn-eliminar-faro" class="btn-secondary" style="color: var(--accent-red-soft); flex: 1;">🗑️ Eliminar</button>
        <button id="btn-guardar-faro-edit" class="btn-primary" style="flex: 2;">💾 Actualizar Faro</button>
      </div>
    `;

    modalContent.querySelector('#btn-guardar-faro-edit').addEventListener('click', async () => {
      const act = modalContent.querySelector('#edit-faro-actual').value;
      const meta = modalContent.querySelector('#edit-faro-meta').value;
      await estadoApp.editarFaro(faroId, { actualMonto: Number(act), metaMonto: Number(meta) });
      modalContainer.classList.add('hidden');
    });

    modalContent.querySelector('#btn-eliminar-faro').addEventListener('click', async () => {
      if (confirm(`¿Eliminar el faro "${faro.textoNatural}"?`)) {
        await estadoApp.eliminarFaro(faroId);
        modalContainer.classList.add('hidden');
      }
    });

    modalContainer.classList.remove('hidden');
  }

  // --- HELPERS VISUALES ---
  formatearFrecuencia(senda) {
    if (senda.frecuencia === 'dias_fijos' && senda.diasSemana) {
      return senda.diasSemana.join(', ').toUpperCase();
    }
    return senda.frecuencia || 'diario';
  }

  getIconoFranja(franja) {
    const mapa = {
      manana: '🌅 Alba',
      tarde: '☀️ Cenit',
      noche: '🌙 Ocaso',
      libre: ''
    };
    return mapa[franja] || '';
  }

  mostrarFeedbackRecompensa({ senda, ganados }) {
    const banner = document.getElementById('banner-notificacion');
    if (!banner) return;

    const premios = Object.entries(ganados)
      .map(([r, c]) => `${this.getEmojiRecurso(r)} +${c}`)
      .join(', ');

    banner.innerHTML = `<strong>¡Labor Cumplida!</strong> ${senda.nombreLore} (${premios})`;
    banner.classList.remove('hidden');

    setTimeout(() => {
      banner.classList.add('hidden');
    }, 3500);
  }

  getEmojiRecurso(tipo) {
    const mapa = { tablas: '🪵', provisiones: '🥕', clavos: '🔩', agua: '💧', moral: '🔥' };
    return mapa[tipo] || '📦';
  }
}
