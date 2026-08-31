/**
 * Vista: Tablón Principal (Torta de 21 Días, Sendas, Cadenas y Faros)
 */

import { estadoApp } from '../core/estado.js';
import { SendasEngine } from '../core/sendas_engine.js';
import { CadenasEngine } from '../core/cadenas_engine.js';
import { FarosEngine } from '../core/faros_engine.js';
import { RefugioMundoEngine } from '../mundo/refugio_engine.js';
import { ModalInfo } from './modal_info.js';
import { ModalSelectorGlifos } from '../core/emojis_engine.js';
import { ModoFiestaEngine } from './modo_fiesta.js';

export class VistaTablon {
  constructor(contenedor) {
    this.contenedor = contenedor;
  }

  obtenerIconoDefaultSenda(s) {
    if (s.icono) return s.icono;
    const n = (s.nombreLore || s.nombre || '').toLowerCase();
    if (n.includes('trotar') || n.includes('correr') || n.includes('ejercicio') || n.includes('patrullar')) return 'assets/sprites/emojis/habitos/emoji_correr.png';
    if (n.includes('leer') || n.includes('libro') || n.includes('estudiar') || n.includes('plano')) return 'assets/sprites/emojis/habitos/emoji_pergamino.png';
    if (n.includes('orar') || n.includes('meditar') || n.includes('gratitud') || n.includes('fuego')) return 'assets/sprites/emojis/habitos/emoji_llama_calma.png';
    if (n.includes('plato') || n.includes('regar') || n.includes('limpieza') || n.includes('utensilio')) return 'assets/sprites/emojis/habitos/emoji_platos.png';
    if (n.includes('pesa') || n.includes('gym')) return 'assets/sprites/emojis/habitos/emoji_pesas.png';
    if (n.includes('agua')) return 'assets/sprites/emojis/habitos/emoji_agua_vaso.png';
    
    // Por pilar
    const pilarMap = {
      cuerpo: 'assets/sprites/pilares/pilar_cuerpo.png',
      mente: 'assets/sprites/pilares/pilar_mente.png',
      espiritu: 'assets/sprites/pilares/pilar_espiritu.png',
      taller: 'assets/sprites/pilares/pilar_taller.png'
    };
    return pilarMap[s.pilar] || 'assets/sprites/mecanicas/mecanica_senda.png';
  }

  obtenerIconoDefaultCadena(c) {
    if (c.icono) return c.icono;
    const n = (c.nombreLore || c.nombre || '').toLowerCase();
    if (n.includes('celular') || n.includes('telefono') || n.includes('pantalla') || n.includes('redes')) return 'assets/sprites/emojis/habitos/emoji_celular_alerta.png';
    if (n.includes('fumar') || n.includes('cigarro') || n.includes('vapear') || n.includes('polvo rojo')) return 'assets/sprites/emojis/habitos/emoji_cigarro_apagado.png';
    if (n.includes('procrastinar') || n.includes('desidia') || n.includes('inercia')) return 'assets/sprites/emojis/habitos/emoji_reloj_arena.png';
    if (n.includes('azucar') || n.includes('refresco') || n.includes('dulce')) return 'assets/sprites/emojis/habitos/emoji_dulce_procesado.png';
    if (n.includes('alcohol') || n.includes('bebida') || n.includes('copa')) return 'assets/sprites/emojis/habitos/emoji_copa_licor.png';
    return 'assets/sprites/mecanicas/cadena_firme.png';
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
            <img src="${pilares.esDorado ? 'assets/sprites/pilares/torta_dorada_badge.png' : 'assets/sprites/pilares/torta_dorada_badge.png'}" alt="Torta" class="pixel-icon icon-20">
            <span>Torta de Equilibrio</span>
            <button class="btn-info-glifo" data-info-key="torta_equilibrio" title="Información vida real" style="background:none;border:none;cursor:pointer;padding:0;">
              <img src="assets/sprites/ui/ico_info.png" alt="Info" class="pixel-icon icon-16">
            </button>
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
              <img src="assets/sprites/pilares/pilar_cuerpo.png" alt="Cuerpo" class="pixel-icon icon-20">
              <span class="pilar-nombre">Cuerpo</span>
            </div>
            <span class="pilar-porcentaje">${Math.round(pilares.porcentajes.cuerpo)}%</span>
          </div>
          <div class="pilar-card pilar-mente">
            <div class="pilar-info-left">
              <img src="assets/sprites/pilares/pilar_mente.png" alt="Mente" class="pixel-icon icon-20">
              <span class="pilar-nombre">Mente</span>
            </div>
            <span class="pilar-porcentaje">${Math.round(pilares.porcentajes.mente)}%</span>
          </div>
          <div class="pilar-card pilar-espiritu">
            <div class="pilar-info-left">
              <img src="assets/sprites/pilares/pilar_espiritu.png" alt="Espíritu" class="pixel-icon icon-20">
              <span class="pilar-nombre">Espíritu</span>
            </div>
            <span class="pilar-porcentaje">${Math.round(pilares.porcentajes.espiritu)}%</span>
          </div>
          <div class="pilar-card pilar-taller">
            <div class="pilar-info-left">
              <img src="assets/sprites/pilares/pilar_taller.png" alt="Taller" class="pixel-icon icon-20">
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
        <div style="background: rgba(180, 83, 9, 0.15); border: 1px solid var(--accent-rust); border-radius: var(--radius-sm); padding: 8px 12px; margin-bottom: 12px; font-size: 0.78rem; color: #fed7aa; display: flex; align-items: center; gap: 8px;">
          <img src="assets/sprites/mecanicas/cadena_tiembla.png" alt="Aviso" class="pixel-icon icon-20">
          <div><strong>Piso mínimo:</strong> El Yermo te anima a sostener al menos 1 senda en cada pilar. Te falta: <em>${piso.pilaresFaltantes.join(', ')}</em>.</div>
        </div>
      ` : ''}

      <!-- SECCIÓN: SENDAS (HÁBITOS POSITIVOS) -->
      <div class="seccion-tablon-head">
        <div class="seccion-tablon-titulo">
          <img src="assets/sprites/mecanicas/mecanica_senda.png" alt="Sendas" class="pixel-icon icon-20">
          <span>Sendas Activas</span>
          <button class="btn-info-glifo" data-info-key="sendas" title="Información vida real" style="background:none;border:none;cursor:pointer;padding:0;">
            <img src="assets/sprites/ui/ico_info.png" alt="Info" class="pixel-icon icon-16">
          </button>
        </div>
        <span class="slots-counter">${estado.sendas.length}/${infoRefugio.maxSendas} Slots</span>
      </div>

      <div class="sendas-list">
        ${estado.sendas.length === 0 ? `
          <div class="card-yermo" style="text-align: center; color: var(--text-muted); font-size: 0.84rem;">
            No hay sendas activas. Crea tu primera senda para fortalecer tu refugio.
          </div>
        ` : estado.sendas.map((s, index) => `
          <div class="senda-card pilar-${s.pilar}" style="display: flex; align-items: center; gap: 10px;">
            <img src="${this.obtenerIconoDefaultSenda(s)}" alt="Icono" class="emoji-pixel" style="width: 22px; height: 22px; cursor: pointer;" title="Toca para ver detalles">
            <div class="senda-main-info" style="flex: 1;">
              <span class="senda-nombre">${s.nombreLore || s.nombre}</span>
              ${s.accionReal && s.nombreLore ? `<span style="font-size: 0.72rem; color: #fed7aa; display: block; margin-top: 1px;">⚙️ Real: ${s.accionReal}</span>` : ''}
              <span class="senda-meta">+1 ${s.pilar.toUpperCase()} &bull; Racha: ${s.rachaActual || 0}d &bull; (${s.diasTotales || 0}/66d)</span>
            </div>
            <button class="btn-check-item ${s.cumplidaHoy ? 'checked' : ''}" data-senda-idx="${index}">
              ${s.cumplidaHoy ? '<img src="assets/sprites/ui/ico_check_ok.png" alt="OK" class="pixel-icon icon-16">' : ''}
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
        <div class="card-yermo" style="text-align: center; color: var(--text-muted); font-size: 0.76rem; margin-bottom: 18px; border-style: dashed; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <img src="assets/sprites/ui/ico_candado.png" alt="Bloqueado" class="pixel-icon icon-16">
          <span><strong>Slots de Sendas al tope (${estado.sendas.length}/${infoRefugio.maxSendas}):</strong> Mantén constancia con tus sendas actuales y mejora tu refugio para habilitar más espacios.</span>
        </div>
      `}

      <!-- SECCIÓN: CADENAS (MALOS HÁBITOS A ROMPER) -->
      <div class="seccion-tablon-head">
        <div class="seccion-tablon-titulo">
          <img src="assets/sprites/mecanicas/cadena_firme.png" alt="Cadenas" class="pixel-icon icon-20">
          <span>Cadenas a Romper</span>
          <button class="btn-info-glifo" data-info-key="cadenas" title="Información vida real" style="background:none;border:none;cursor:pointer;padding:0;">
            <img src="assets/sprites/ui/ico_info.png" alt="Info" class="pixel-icon icon-16">
          </button>
        </div>
        <span class="slots-counter">${estado.cadenas.length}/${infoRefugio.maxCadenas} Slots</span>
      </div>

      <div class="cadenas-list">
        ${estado.cadenas.length === 0 ? `
          <div class="card-yermo" style="text-align: center; color: var(--text-muted); font-size: 0.84rem;">
            Sin cadenas atadas. Añade un hábito que quieras soltar (21 días continuos).
          </div>
        ` : estado.cadenas.map((c, index) => `
          <div class="cadena-card ${c.estadoPuente === 'tiembla' ? 'tiembla' : ''}" style="display: flex; align-items: center; gap: 10px;">
            <img src="${this.obtenerIconoDefaultCadena(c)}" alt="Icono" class="emoji-pixel" style="width: 22px; height: 22px; cursor: pointer;" title="Toca para ver o editar">
            <div class="cadena-main-info" style="flex: 1; cursor: pointer;">
              <span class="senda-nombre">${c.nombreLore || c.nombre}</span>
              ${c.accionReal && c.nombreLore ? `<span style="font-size: 0.72rem; color: #fca5a5; display: block; margin-top: 1px;">⛓️ Mal hábito: ${c.accionReal}</span>` : ''}
              <span class="senda-meta">Días libre: ${c.diasLimpiosConsecutivos || 0}/21 &bull; ${c.estadoPuente === 'tiembla' ? '⚠️ Puente tiembla' : 'Paso firme'}</span>
            </div>
            <button class="btn-check-item ${c.reportadaHoy ? 'checked' : ''}" data-cadena-idx="${index}" title="Toca para reporte sincero (Día Limpio o Recaída)">
              ${c.reportadaHoy ? '<img src="assets/sprites/ui/ico_check_ok.png" alt="OK" class="pixel-icon icon-16">' : ''}
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
        <div class="card-yermo" style="text-align: center; color: var(--text-muted); font-size: 0.76rem; margin-bottom: 18px; border-style: dashed; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <img src="assets/sprites/ui/ico_candado.png" alt="Bloqueado" class="pixel-icon icon-16">
          <span><strong>Slots de Cadenas al tope (${estado.cadenas.length}/${infoRefugio.maxCadenas}):</strong> Rompe una cadena actual o sube el nivel de tu refugio para atar otra.</span>
        </div>
      `}

      <!-- SECCIÓN: FAROS (AHORRO Y PROYECTOS) -->
      <div class="seccion-tablon-head">
        <div class="seccion-tablon-titulo">
          <img src="assets/sprites/mecanicas/faro_encendido.png" alt="Faros" class="pixel-icon icon-20">
          <span>Faros y Metas</span>
          <button class="btn-info-glifo" data-info-key="faro_ahorro" title="Información vida real" style="background:none;border:none;cursor:pointer;padding:0;">
            <img src="assets/sprites/ui/ico_info.png" alt="Info" class="pixel-icon icon-16">
          </button>
        </div>
        <span class="slots-counter">${estado.faros.length}/${infoRefugio.maxFaros} Slots</span>
      </div>

      <div class="faros-list">
        ${infoRefugio.maxFaros === 0 ? `
          <div class="card-yermo" style="text-align: center; color: var(--text-muted); font-size: 0.82rem; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <img src="assets/sprites/ui/ico_candado.png" alt="Bloqueado" class="pixel-icon icon-16">
            <span>Función no disponible por ahora. Concéntrate en tus primeros pasos.</span>
          </div>
        ` : estado.faros.length === 0 ? `
          <div class="card-yermo" style="text-align: center; color: var(--text-muted); font-size: 0.84rem;">
            Sin faros encendidos. Activa tu Faro de Ahorro regular (5% a 6 meses).
          </div>
        ` : estado.faros.map((f, index) => `
          <div class="faro-card">
            <div class="faro-header">
              <span class="faro-titulo" style="display: flex; align-items: center; gap: 6px;">
                <img src="${f.icono || 'assets/sprites/mecanicas/faro_encendido.png'}" alt="Faro" class="emoji-pixel">
                <span>${f.nombre}</span>
              </span>
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
        <div class="card-yermo" style="text-align: center; color: var(--text-muted); font-size: 0.76rem; border-style: dashed; display: flex; align-items: center; justify-content: center; gap: 6px;">
          <img src="assets/sprites/ui/ico_candado.png" alt="Bloqueado" class="pixel-icon icon-16">
          <span><strong>Slots de Faros al tope (${estado.faros.length}/${infoRefugio.maxFaros}):</strong> Mejora tu refugio para habilitar más metas.</span>
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

  vincularEventos(estado) {
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
          const diasTotalesPrevios = senda.diasTotales || 0;
          senda.diasCumplidos = (senda.diasCumplidos || 0) + 1;
          senda.diasTotales = (senda.diasTotales || 0) + 1;
          senda.rachaActual = (senda.rachaActual || 0) + 1;
          senda.fallosSeguidos = 0;

          // Hito 66 Días: Hábito Forjado a Cimiento
          if (senda.diasTotales >= 66 && diasTotalesPrevios < 66) {
            ModoFiestaEngine.activar({
              tipo: 'senda',
              titulo: '¡CIMIENTO FORJADO EN HIERRO!',
              subtitulo: senda.nombreLore || senda.nombre,
              detalle: `¡66 días de constancia real! La ciencia de hábitos demuestra que "${senda.accionReal || senda.nombre}" ya no te cuesta fuerza de voluntad: se ha convertido en un Cimiento indestructible de tu identidad.`
            });
          }

          // Solo recarga energía si el generador ya fue aprendido y construido (Nivel 5)
          if (senda.pilar === 'cuerpo' && estado.bioenergia?.biciGeneradorConstruido) {
            estado.bioenergia = RefugioMundoEngine.recargarBioenergia(estado.bioenergia, 35);
          }
          estado.recursos.tablas = (estado.recursos.tablas || 0) + 1;
        } else {
          // Desmarcar (-1 seguro)
          senda.diasCumplidos = Math.max(0, (senda.diasCumplidos || 1) - 1);
          senda.diasTotales = Math.max(0, (senda.diasTotales || 1) - 1);
          senda.rachaActual = Math.max(0, (senda.rachaActual || 1) - 1);

          if (senda.pilar === 'cuerpo' && estado.bioenergia?.biciGeneradorConstruido) {
            estado.bioenergia.nivelCarga = Math.max(0, (estado.bioenergia.nivelCarga || 0) - 35);
          }
          estado.recursos.tablas = Math.max(0, (estado.recursos.tablas || 1) - 1);
        }

        senda.tasaFallos = senda.diasTotales > 0 ? (senda.diasFallados || 0) / senda.diasTotales : 0;

        await estadoApp.guardar();
      });
    });

    // Clic en la tarjeta de Senda para abrir Detalle y Configuración
    this.contenedor.querySelectorAll('.senda-card .senda-main-info, .senda-card > img').forEach(el => {
      el.addEventListener('click', () => {
        const card = el.closest('.senda-card');
        const btn = card.querySelector('[data-senda-idx]');
        if (btn) {
          const idx = Number(btn.getAttribute('data-senda-idx'));
          this.abrirModalDetalleSenda(idx, estado.sendas[idx]);
        }
      });
    });

    // Clic en la tarjeta de Cadena para abrir Detalle y Configuración (Lore, Real, Figura, Eliminar)
    this.contenedor.querySelectorAll('.cadena-card .cadena-main-info, .cadena-card > img').forEach(el => {
      el.addEventListener('click', () => {
        const card = el.closest('.cadena-card');
        const btn = card.querySelector('[data-cadena-idx]');
        if (btn) {
          const idx = Number(btn.getAttribute('data-cadena-idx'));
          this.abrirModalDetalleCadena(idx, estado.cadenas[idx]);
        }
      });
    });

    // Clic en botón Check de Cadena para abrir Reporte Sincero (Limpio vs Recaída)
    this.contenedor.querySelectorAll('.btn-check-item[data-cadena-idx]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = Number(btn.getAttribute('data-cadena-idx'));
        this.abrirModalReporteCadena(idx, estado.cadenas[idx]);
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
    let iconoSeleccionado = this.obtenerIconoDefaultSenda(senda);

    modalContent.innerHTML = `
      <div class="modal-crear-wrap">
        <button class="modal-close-btn" id="btn-cerrar-modal">&times;</button>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
          <img id="img-preview-senda" src="${iconoSeleccionado}" alt="Senda" class="emoji-pixel" style="width: 28px; height: 28px;">
          <div>
            <h3 style="color: var(--text-primary); font-size: 1.1rem; margin: 0;">${senda.nombreLore || senda.nombre}</h3>
            <div style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--pilar-${senda.pilar}-light); text-transform: uppercase;">
              Pilar: +1 ${senda.pilar}
            </div>
          </div>
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

        <!-- FIGURA PIXEL ART -->
        <div style="margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.3); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img id="img-mini-glifo" src="${iconoSeleccionado}" alt="Glifo" class="emoji-pixel" style="width: 22px; height: 22px;">
            <span style="font-size: 0.8rem; color: var(--text-secondary);">Figura de la Senda</span>
          </div>
          <button type="button" id="btn-cambiar-glifo" class="btn-yermo-secondary" style="padding: 4px 10px; font-size: 0.74rem;">
            Elegir Figura (200 Emojis)
          </button>
        </div>

        <!-- DUALIDAD LORE & VIDA REAL -->
        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.78rem; color: var(--oro-torta-glow); font-weight: 600;">Bautizo en el Yermo (Lore):</label>
          <input type="text" id="input-edit-senda-lore" class="card-yermo" style="width: 100%; margin-top: 2px; padding: 6px 8px; color: #fff; background: var(--bg-surface);" value="${senda.nombreLore || senda.nombre}">
        </div>

        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.78rem; color: var(--text-muted);">Hábito en la Vida Real (Acción):</label>
          <input type="text" id="input-edit-senda-real" class="card-yermo" style="width: 100%; margin-top: 2px; padding: 6px 8px; color: #fed7aa; background: var(--bg-surface);" placeholder="Ej: Lavar platos, trotar 30 min..." value="${senda.accionReal || senda.nombre}">
        </div>

        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.78rem; color: var(--text-muted);">Frecuencia Objetivo:</label>
          <select id="select-edit-frecuencia" class="card-yermo" style="width: 100%; margin-top: 2px; padding: 6px 8px; color: #fff; background: var(--bg-surface);">
            <option value="diario" ${senda.tipoFrecuencia === 'diario' ? 'selected' : ''}>Diario (Todos los días)</option>
            <option value="dias_fijos" ${senda.tipoFrecuencia === 'dias_fijos' ? 'selected' : ''}>Días Fijos de la Semana (L, M, V...)</option>
            <option value="veces_semana" ${senda.tipoFrecuencia === 'veces_semana' ? 'selected' : ''}>Veces por Semana Flexible (Ej: 3x/sem)</option>
          </select>
        </div>

        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.78rem; color: var(--text-muted);">Horario Sugerido:</label>
          <select id="select-edit-horario" class="card-yermo" style="width: 100%; margin-top: 2px; padding: 6px 8px; color: #fff; background: var(--bg-surface);">
            <option value="cualquiera" ${senda.horarioObjetivo === 'cualquiera' ? 'selected' : ''}>Cualquier momento</option>
            <option value="manana" ${senda.horarioObjetivo === 'manana' ? 'selected' : ''}>Mañana (Al despertar)</option>
            <option value="tarde" ${senda.horarioObjetivo === 'tarde' ? 'selected' : ''}>Tarde (Media jornada)</option>
            <option value="noche" ${senda.horarioObjetivo === 'noche' ? 'selected' : ''}>Noche (Antes de dormir)</option>
          </select>
        </div>

        <div style="margin-bottom: 14px;">
          <label style="font-size: 0.78rem; color: var(--text-muted);">Nota / Disparador del Hábito:</label>
          <input type="text" id="input-edit-senda-nota" class="card-yermo" style="width: 100%; margin-top: 2px; padding: 6px 8px; color: #fff; background: var(--bg-surface);" placeholder="Ej: Después del café de la mañana..." value="${senda.notaMotivacion || ''}">
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

    // Abrir Selector de Glifos
    modalContent.querySelector('#btn-cambiar-glifo').addEventListener('click', () => {
      ModalSelectorGlifos.abrir((nuevaRuta) => {
        iconoSeleccionado = nuevaRuta;
        modalContent.querySelector('#img-preview-senda').src = nuevaRuta;
        modalContent.querySelector('#img-mini-glifo').src = nuevaRuta;
      }, iconoSeleccionado);
    });

    modalContent.querySelector('#btn-guardar-cambios-senda').addEventListener('click', async () => {
      const nuevoLore = modalContent.querySelector('#input-edit-senda-lore').value.trim();
      const nuevaReal = modalContent.querySelector('#input-edit-senda-real').value.trim();
      const nuevaFrec = modalContent.querySelector('#select-edit-frecuencia').value;
      const nuevoHorario = modalContent.querySelector('#select-edit-horario').value;
      const nuevaNota = modalContent.querySelector('#input-edit-senda-nota').value.trim();

      if (nuevoLore || nuevaReal) {
        senda.nombreLore = nuevoLore || nuevaReal;
        senda.accionReal = nuevaReal || nuevoLore;
        senda.nombre = senda.nombreLore;
        senda.icono = iconoSeleccionado;
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

    let iconoSeleccionado = 'assets/sprites/emojis/habitos/emoji_correr.png';

    modalContent.innerHTML = `
      <div class="modal-crear-wrap">
        <button class="modal-close-btn" id="btn-cerrar-modal">&times;</button>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <img src="assets/sprites/mecanicas/mecanica_senda.png" alt="Senda" class="pixel-icon icon-20">
          <h3 style="margin: 0; color: var(--text-primary);">Trazar Nueva Senda</h3>
        </div>
        
        <!-- FIGURA PIXEL ART -->
        <div style="margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.3); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img id="img-crear-glifo" src="${iconoSeleccionado}" alt="Glifo" class="emoji-pixel" style="width: 24px; height: 24px;">
            <span style="font-size: 0.8rem; color: var(--text-secondary);">Figura Asignada</span>
          </div>
          <button type="button" id="btn-crear-cambiar-glifo" class="btn-yermo-secondary" style="padding: 4px 10px; font-size: 0.74rem;">
            Elegir Figura (200 Emojis)
          </button>
        </div>

        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.78rem; color: var(--oro-torta-glow); font-weight: 600;">Bautizo en el Yermo (Lore):</label>
          <input type="text" id="input-senda-lore" class="card-yermo" style="width: 100%; margin-top: 2px; padding: 6px 8px; color: #fff; background: var(--bg-surface);" placeholder="Ej: Purificar utensilios del refugio...">
        </div>

        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.78rem; color: var(--text-muted);">Acción en la Vida Real (Hábito Común):</label>
          <input type="text" id="input-senda-real" class="card-yermo" style="width: 100%; margin-top: 2px; padding: 6px 8px; color: #fed7aa; background: var(--bg-surface);" placeholder="Ej: Lavar los platos después de cenar...">
        </div>

        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.78rem; color: var(--text-muted);">Asignar a 1 Pilar Absoluto:</label>
          <select id="select-senda-pilar" class="card-yermo" style="width: 100%; margin-top: 2px; padding: 6px 8px; color: #fff; background: var(--bg-surface);">
            <option value="cuerpo">Cuerpo (Salud, Movimiento, Deporte)</option>
            <option value="mente">Mente (Lectura, Estudio, Concentración)</option>
            <option value="espiritu">Espíritu (Vida interior, Calma, Oración)</option>
            <option value="taller">Taller (Trabajo manual, Reparar, Cuidar)</option>
          </select>
        </div>

        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.78rem; color: var(--text-muted);">Frecuencia Objetivo:</label>
          <select id="select-senda-frecuencia" class="card-yermo" style="width: 100%; margin-top: 2px; padding: 6px 8px; color: #fff; background: var(--bg-surface);">
            <option value="diario">Diario (7 días a la semana)</option>
            <option value="dias_fijos">Días Fijos de la Semana (L-M-V...)</option>
            <option value="veces_semana">Veces por Semana Flexible (Ej: 3x/sem)</option>
          </select>
        </div>

        <div style="margin-bottom: 14px;">
          <label style="font-size: 0.78rem; color: var(--text-muted);">Horario Sugerido:</label>
          <select id="select-senda-horario" class="card-yermo" style="width: 100%; margin-top: 2px; padding: 6px 8px; color: #fff; background: var(--bg-surface);">
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

    modalContent.querySelector('#btn-crear-cambiar-glifo').addEventListener('click', () => {
      ModalSelectorGlifos.abrir((nuevaRuta) => {
        iconoSeleccionado = nuevaRuta;
        modalContent.querySelector('#img-crear-glifo').src = nuevaRuta;
      }, iconoSeleccionado);
    });

    modalContent.querySelector('#btn-guardar-senda').addEventListener('click', async () => {
      const lore = modalContent.querySelector('#input-senda-lore').value.trim();
      const real = modalContent.querySelector('#input-senda-real').value.trim();
      const pilar = modalContent.querySelector('#select-senda-pilar').value;
      const frecuencia = modalContent.querySelector('#select-senda-frecuencia').value;
      const horario = modalContent.querySelector('#select-senda-horario').value;
      
      const nombreFinal = lore || real;
      if (!nombreFinal) return;

      try {
        await estadoApp.agregarSenda(nombreFinal, pilar);
        const nueva = estadoApp.datos.sendas[estadoApp.datos.sendas.length - 1];
        if (nueva) {
          nueva.nombreLore = lore || real;
          nueva.accionReal = real || lore;
          nueva.icono = iconoSeleccionado;
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

    let iconoSeleccionado = 'assets/sprites/emojis/habitos/emoji_cigarro_apagado.png';

    modalContent.innerHTML = `
      <div class="modal-crear-wrap">
        <button class="modal-close-btn" id="btn-cerrar-modal">&times;</button>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <img src="assets/sprites/mecanicas/cadena_firme.png" alt="Cadena" class="pixel-icon icon-20">
          <h3 style="margin: 0; color: var(--text-primary);">Atar Nueva Cadena (21 Días)</h3>
        </div>
        
        <!-- FIGURA PIXEL ART -->
        <div style="margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.3); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img id="img-crear-cadena-glifo" src="${iconoSeleccionado}" alt="Glifo" class="emoji-pixel" style="width: 24px; height: 24px;">
            <span style="font-size: 0.8rem; color: var(--text-secondary);">Figura de la Cadena</span>
          </div>
          <button type="button" id="btn-cadena-cambiar-glifo" class="btn-yermo-secondary" style="padding: 4px 10px; font-size: 0.74rem;">
            Elegir Figura (200 Emojis)
          </button>
        </div>

        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.78rem; color: var(--oro-torta-glow); font-weight: 600;">Bautizo en el Yermo (Lore):</label>
          <input type="text" id="input-cadena-lore" class="card-yermo" style="width: 100%; margin-top: 2px; padding: 6px 8px; color: #fff; background: var(--bg-surface);" placeholder="Ej: Inhalar polvo rojo, atadura al cristal...">
        </div>

        <div style="margin-bottom: 14px;">
          <label style="font-size: 0.78rem; color: var(--text-muted);">Mal Hábito en la Vida Real:</label>
          <input type="text" id="input-cadena-real" class="card-yermo" style="width: 100%; margin-top: 2px; padding: 6px 8px; color: #fca5a5; background: var(--bg-surface);" placeholder="Ej: Fumar cigarrillos, desvelo con celular...">
        </div>

        <button id="btn-guardar-cadena" class="btn-yermo-primary" style="width: 100%; padding: 12px;">
          Comenzar Desafío 21 Días
        </button>
      </div>
    `;

    const cerrar = () => modalContainer.classList.add('hidden');
    modalContent.querySelector('#btn-cerrar-modal').addEventListener('click', cerrar);

    modalContent.querySelector('#btn-cadena-cambiar-glifo').addEventListener('click', () => {
      ModalSelectorGlifos.abrir((nuevaRuta) => {
        iconoSeleccionado = nuevaRuta;
        modalContent.querySelector('#img-crear-cadena-glifo').src = nuevaRuta;
      }, iconoSeleccionado);
    });

    modalContent.querySelector('#btn-guardar-cadena').addEventListener('click', async () => {
      const lore = modalContent.querySelector('#input-cadena-lore').value.trim();
      const real = modalContent.querySelector('#input-cadena-real').value.trim();
      const nombreFinal = lore || real;
      if (!nombreFinal) return;

      try {
        await estadoApp.agregarCadena(nombreFinal);
        const nueva = estadoApp.datos.cadenas[estadoApp.datos.cadenas.length - 1];
        if (nueva) {
          nueva.nombreLore = lore || real;
          nueva.accionReal = real || lore;
          nueva.icono = iconoSeleccionado;
          await estadoApp.guardar();
        }
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

  abrirModalDetalleCadena(idx, cadena) {
    if (!cadena) return;
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    let iconoSeleccionado = this.obtenerIconoDefaultCadena(cadena);

    modalContent.innerHTML = `
      <div class="modal-crear-wrap">
        <button class="modal-close-btn" id="btn-cerrar-modal">&times;</button>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
          <img id="img-preview-cadena" src="${iconoSeleccionado}" alt="Cadena" class="emoji-pixel" style="width: 28px; height: 28px;">
          <div>
            <h3 style="color: var(--text-primary); font-size: 1.1rem; margin: 0;">${cadena.nombreLore || cadena.nombre}</h3>
            <div style="font-size: 0.72rem; font-family: var(--font-mono); color: #fca5a5; text-transform: uppercase;">
              Desafío de Ruptura &bull; 21 Días
            </div>
          </div>
        </div>

        <!-- BARRA DE DÍAS LIMPIOS -->
        <div class="card-yermo" style="background: rgba(0,0,0,0.35); padding: 10px; margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 4px;">
            <span>Progreso de Ruptura:</span>
            <strong style="color: var(--oro-torta-glow);">${cadena.diasLimpiosConsecutivos || 0}/21 Días (${Math.min(100, Math.round(((cadena.diasLimpiosConsecutivos || 0) / 21) * 100))}%)</strong>
          </div>
          <div style="background: rgba(0,0,0,0.5); height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 6px;">
            <div style="width: ${Math.min(100, Math.round(((cadena.diasLimpiosConsecutivos || 0) / 21) * 100))}%; background: #22c55e; height: 100%;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-muted);">
            <span>Estado del puente: ${cadena.estadoPuente === 'tiembla' ? '⚠️ Tiembla (Recaída reciente)' : '✅ Firme'}</span>
            <span>Recaídas históricas: ${cadena.totalRecaidas || 0}</span>
          </div>
        </div>

        <!-- FIGURA PIXEL ART -->
        <div style="margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.3); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img id="img-mini-cadena-glifo" src="${iconoSeleccionado}" alt="Glifo" class="emoji-pixel" style="width: 22px; height: 22px;">
            <span style="font-size: 0.8rem; color: var(--text-secondary);">Figura de la Cadena</span>
          </div>
          <button type="button" id="btn-cambiar-cadena-glifo" class="btn-yermo-secondary" style="padding: 4px 10px; font-size: 0.74rem;">
            Elegir Figura (200 Emojis)
          </button>
        </div>

        <!-- DUALIDAD LORE & VIDA REAL -->
        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.78rem; color: var(--oro-torta-glow); font-weight: 600;">Bautizo en el Yermo (Lore):</label>
          <input type="text" id="input-edit-cadena-lore" class="card-yermo" style="width: 100%; margin-top: 2px; padding: 6px 8px; color: #fff; background: var(--bg-surface);" value="${cadena.nombreLore || cadena.nombre}">
        </div>

        <div style="margin-bottom: 14px;">
          <label style="font-size: 0.78rem; color: var(--text-muted);">Mal Hábito en la Vida Real:</label>
          <input type="text" id="input-edit-cadena-real" class="card-yermo" style="width: 100%; margin-top: 2px; padding: 6px 8px; color: #fca5a5; background: var(--bg-surface);" placeholder="Ej: Fumar cigarrillos, refrescos..." value="${cadena.accionReal || cadena.nombre}">
        </div>

        <div style="display: flex; gap: 8px;">
          <button id="btn-guardar-cambios-cadena" class="btn-yermo-primary" style="flex: 2; padding: 10px;">
            Guardar Cambios
          </button>
          <button id="btn-eliminar-cadena" class="btn-yermo-secondary" style="flex: 1; padding: 10px; color: #fca5a5; border-color: rgba(239, 68, 68, 0.4);">
            Desatar Cadena
          </button>
        </div>
      </div>
    `;

    const cerrar = () => modalContainer.classList.add('hidden');
    modalContent.querySelector('#btn-cerrar-modal').addEventListener('click', cerrar);

    // Selector de Glifos
    modalContent.querySelector('#btn-cambiar-cadena-glifo').addEventListener('click', () => {
      ModalSelectorGlifos.abrir((nuevaRuta) => {
        iconoSeleccionado = nuevaRuta;
        modalContent.querySelector('#img-preview-cadena').src = nuevaRuta;
        modalContent.querySelector('#img-mini-cadena-glifo').src = nuevaRuta;
      }, iconoSeleccionado);
    });

    // Guardar Cambios
    modalContent.querySelector('#btn-guardar-cambios-cadena').addEventListener('click', async () => {
      const nuevoLore = modalContent.querySelector('#input-edit-cadena-lore').value.trim();
      const nuevaReal = modalContent.querySelector('#input-edit-cadena-real').value.trim();

      if (nuevoLore || nuevaReal) {
        cadena.nombreLore = nuevoLore || nuevaReal;
        cadena.accionReal = nuevaReal || nuevoLore;
        cadena.nombre = cadena.nombreLore;
        cadena.icono = iconoSeleccionado;
        await estadoApp.guardar();
        cerrar();
      }
    });

    // Eliminar / Desatar
    modalContent.querySelector('#btn-eliminar-cadena').addEventListener('click', async () => {
      if (confirm(`¿Deseas desatar la cadena "${cadena.nombre}"?`)) {
        estadoApp.datos.cadenas.splice(idx, 1);
        await estadoApp.guardar();
        cerrar();
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
          <img src="assets/sprites/mecanicas/cadena_firme.png" alt="Cadena" class="pixel-icon icon-24">
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
          <div style="font-size: 0.74rem; color: ${cadena.estadoPuente === 'tiembla' ? '#fca5a5' : 'var(--text-muted)'}; display: flex; align-items: center; gap: 6px;">
            <img src="${cadena.estadoPuente === 'tiembla' ? 'assets/sprites/mecanicas/cadena_tiembla.png' : 'assets/sprites/mecanicas/cadena_firme.png'}" alt="Estado" class="pixel-icon icon-16">
            <span>Estado: <strong>${cadena.estadoPuente === 'tiembla' ? 'El puente tiembla (Recaída reciente)' : 'Paso firme en el puente'}</strong></span>
          </div>
        </div>

        <div style="font-size: 0.82rem; color: var(--text-primary); font-weight: 600; margin-bottom: 8px;">
          ¿Cómo transcurrió tu día hoy?
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px;">
          <button id="btn-reporte-limpio" class="btn-yermo-primary" style="background: #15803d; border-color: #22c55e; padding: 10px; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <img src="assets/sprites/ui/ico_check_ok.png" alt="OK" class="pixel-icon icon-16">
            <span>Me mantuve libre hoy (Día Limpio +1)</span>
          </button>
          <button id="btn-reporte-recaida" class="btn-yermo-secondary" style="background: rgba(239, 68, 68, 0.15); border-color: rgba(239, 68, 68, 0.5); color: #fca5a5; padding: 10px; font-size: 0.85rem; display: flex; align-items: center; justify-content: center; gap: 8px;">
            <img src="assets/sprites/mecanicas/cadena_tiembla.png" alt="Alerta" class="pixel-icon icon-16">
            <span>Tuve una recaída hoy (Sinceridad sin culpa)</span>
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
      const diasPrevios = cadena.diasLimpiosConsecutivos || 0;
      const res = CadenasEngine.registrarDia(cadena, false);
      estadoApp.datos.cadenas[idx] = res.cadena;
      cadena.reportadaHoy = true;
      await estadoApp.guardar();
      cerrar();

      if (res.cadena.diasLimpiosConsecutivos >= 21 && diasPrevios < 21) {
        ModoFiestaEngine.activar({
          tipo: 'cadena',
          titulo: '¡CADENA ROTA Y DESTRUIDA!',
          subtitulo: cadena.nombreLore || cadena.nombre,
          detalle: `¡Has completado 21 días limpios consecutivos! Has cruzado el Puente que Tiembla y vencido a "${cadena.accionReal || cadena.nombre}". ¡El Refugio celebra con alegría tu libertad!`
        });
      }
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
