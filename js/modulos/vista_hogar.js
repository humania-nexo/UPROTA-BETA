/**
 * Vista: El Hogar (Validación radical sin culpa, Cuaderno del Náufrago & Cápsulas de Tiempo)
 * UPROTA v3.0 — Silas, Pix, Hertz & Nexo
 */

import { FRASES_HOGAR } from '../data/frases_estoicas.js';
import { DISPARADORES_MICRO_JOURNALING, PLANTILLAS_CAPSULAS_TIEMPO } from '../data/cuaderno_naufrago_textos.js';
import { OBJETOS_SABIDURIA } from '../data/sabiduria_textos.js';
import { SabiduriaDiariaEngine } from '../mundo/sabiduria_diaria.js';
import { audioProcedural } from '../core/audio_procedural.js';
import { estadoApp } from '../core/estado.js';

export class VistaHogar {
  constructor(contenedor) {
    this.contenedor = contenedor;
    this.verHistorialDiario = false;
  }

  render(estado) {
    const valIndex = Math.floor(Math.random() * FRASES_HOGAR.VALIDACIONES.length);
    const luzIndex = Math.floor(Math.random() * FRASES_HOGAR.LUZ_PRESTADA.length);
    const sabIndex = Math.floor(Math.random() * FRASES_HOGAR.SABIDURIA_ESTOICA.length);

    const validacion = FRASES_HOGAR.VALIDACIONES[valIndex];
    const luz = FRASES_HOGAR.LUZ_PRESTADA[luzIndex];
    const sabiduria = FRASES_HOGAR.SABIDURIA_ESTOICA[sabIndex];

    const fechaHoy = new Date().toISOString().split('T')[0];
    const diaNum = estado.perfil?.diaSupervivencia || 1;
    const dispIndex = (diaNum - 1) % DISPARADORES_MICRO_JOURNALING.length;
    const disparador = DISPARADORES_MICRO_JOURNALING[dispIndex] || DISPARADORES_MICRO_JOURNALING[0];

    const entradasDiario = estado.diarioNaufrago || [];
    const entradaHoy = entradasDiario.find(e => e.fecha === fechaHoy);
    const capsulas = estado.capsulasTiempo || [];

    this.contenedor.innerHTML = `
      <!-- CABECERA DEL HOGAR -->
      <div style="text-align: center; margin-bottom: 16px; background-image: url('assets/sprites/fondos/bg_noche_estrellada.png'); background-repeat: repeat; background-size: 64px 64px; padding: 18px 12px; border-radius: var(--radius-lg); border: 1px solid rgba(192, 132, 252, 0.3); box-shadow: 0 4px 20px rgba(0,0,0,0.8);">
        <div style="margin-bottom: 6px;">
          <img src="assets/sprites/ui/tab_hogar.png" alt="El Hogar" class="pixel-icon icon-32" style="width: 36px; height: 36px;">
        </div>
        <h2 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--oro-torta-glow); margin: 0;">El Hogar del Yermo</h2>
        <span style="font-size: 0.76rem; color: #e9d5ff;">Espacio de resguardo, calor, reflexión y validación radical</span>
      </div>

      <!-- SECCIÓN 1: EL CUADERNO DEL NÁUFRAGO (MICRO-JOURNALING) -->
      <div class="card-yermo" style="border-left: 3px solid #f59e0b; background: rgba(245, 158, 11, 0.06); padding: 14px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="assets/sprites/items/item_cuaderno_naufrago.png" alt="Cuaderno" class="pixel-icon icon-24" style="width: 24px; height: 24px;">
            <div>
              <h3 style="color: var(--oro-torta-glow); font-size: 0.95rem; margin: 0;">El Cuaderno del Náufrago</h3>
              <span style="font-size: 0.70rem; color: var(--text-muted); font-family: var(--font-mono);">Micro-Journaling Nocturno &bull; Día ${diaNum}</span>
            </div>
          </div>
          ${entradasDiario.length > 0 ? `
            <button id="btn-toggle-historial-diario" class="btn-yermo-secondary" style="font-size: 0.72rem; padding: 4px 8px;">
              ${this.verHistorialDiario ? 'Ocultar' : `Bitácora (${entradasDiario.length})`}
            </button>
          ` : ''}
        </div>

        <div style="background: rgba(0,0,0,0.4); border-radius: var(--radius-sm); padding: 10px; margin-bottom: 10px;">
          <span style="font-size: 0.72rem; color: #f59e0b; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Disparador de Hoy:</span>
          <p style="font-size: 0.84rem; color: #fef08a; font-weight: 500; line-height: 1.45; margin: 4px 0 6px 0;">
            "${disparador.pregunta}"
          </p>
          <span style="font-size: 0.72rem; color: var(--text-secondary); font-style: italic; display: block;">
            ${disparador.citaGuia}
          </span>
        </div>

        <div style="margin-bottom: 8px;">
          <textarea id="input-diario-texto" rows="3" class="card-yermo" style="width: 100%; padding: 8px; font-size: 0.82rem; color: #fff; background: #16120e; line-height: 1.4; border: 1px solid rgba(245, 158, 11, 0.3); resize: vertical;" placeholder="Escribe 3 líneas sinceras para cerrar tu noche...">${entradaHoy ? entradaHoy.texto : ''}</textarea>
        </div>

        <button id="btn-guardar-diario" class="btn-yermo-primary" style="width: 100%; padding: 8px; font-size: 0.82rem; background: #d97706; border: none; color: #fff; font-weight: bold; cursor: pointer; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; gap: 6px;">
          <img src="assets/sprites/items/item_cuaderno_naufrago.png" alt="Guardar" class="pixel-icon icon-16">
          <span>${entradaHoy ? 'Actualizar Reflexión de Hoy' : 'Asentar en el Cuaderno'}</span>
        </button>
        <div id="msg-diario-feedback" style="display: none; font-size: 0.74rem; color: #4ade80; margin-top: 6px; text-align: center;"></div>

        <!-- HISTORIAL PLEGABLE DE ENTRADAS DEL CUADERNO -->
        ${this.verHistorialDiario ? `
          <div style="margin-top: 12px; border-top: 1px dashed rgba(245, 158, 11, 0.3); padding-top: 10px; display: flex; flex-direction: column; gap: 8px; max-height: 200px; overflow-y: auto;">
            ${entradasDiario.map(e => `
              <div style="background: rgba(0,0,0,0.5); padding: 8px; border-radius: var(--radius-sm); border-left: 2px solid var(--oro-torta);">
                <div style="display: flex; justify-content: space-between; font-size: 0.70rem; color: var(--oro-torta); font-family: var(--font-mono); margin-bottom: 4px;">
                  <span>Día ${e.diaSupervivencia}</span>
                  <span>${e.fecha}</span>
                </div>
                <p style="font-size: 0.78rem; color: #e7e5e4; line-height: 1.4; margin: 0;">${e.texto}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- SECCIÓN 2: CÁPSULAS DE TIEMPO AL YO DEL FUTURO -->
      <div class="card-yermo" style="border-left: 3px solid #a855f7; background: rgba(168, 85, 247, 0.06); padding: 14px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <img src="assets/sprites/items/ui_capsula_tiempo_sellada.png" alt="Cápsula" class="pixel-icon icon-24" style="width: 24px; height: 24px;">
            <div>
              <h3 style="color: #d8b4fe; font-size: 0.95rem; margin: 0;">Cápsulas de Tiempo</h3>
              <span style="font-size: 0.70rem; color: var(--text-muted);">Cartas selladas para tus futuros triunfos</span>
            </div>
          </div>
          <button id="btn-nueva-capsula" class="btn-yermo-primary" style="font-size: 0.72rem; padding: 4px 8px; background: #9333ea; border: none; color: #fff; font-weight: bold; cursor: pointer;">
            + Sellar Carta
          </button>
        </div>

        <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 10px;">
          Escribe una carta a tu "yo del futuro". Quedará sellada y solo se revelará cuando alcances tu Cimiento (66 días) o Faro (180 días).
        </p>

        <!-- LISTA DE CÁPSULAS -->
        ${capsulas.length === 0 ? `
          <div style="text-align: center; padding: 12px; background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); font-size: 0.76rem; color: var(--text-muted);">
            No tienes cartas selladas activas. ¡Sella tu primera promesa para un Cimiento o Faro!
          </div>
        ` : `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${capsulas.map(c => {
              const listaParaAbrir = diaNum >= c.diaObjetivo || !c.sellada;
              return `
                <div class="card-yermo" style="background: rgba(0,0,0,0.4); padding: 10px; border: 1px solid ${c.sellada ? 'rgba(168, 85, 247, 0.4)' : '#4ade80'};">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <img src="${c.sellada ? 'assets/sprites/items/ui_capsula_tiempo_sellada.png' : 'assets/sprites/emojis/emociones/emoji_estrella_victoria.png'}" alt="Icono" class="pixel-icon icon-16">
                      <strong style="color: ${c.sellada ? '#d8b4fe' : '#4ade80'}; font-size: 0.82rem;">
                        ${c.tipo === 'cimiento' ? 'Carta de Cimiento (66 Días)' : c.tipo === 'faro' ? 'Pacto de Faro (180 Días)' : 'Promesa Personal'}
                      </strong>
                    </div>
                    <span style="font-size: 0.70rem; font-family: var(--font-mono); color: var(--text-muted);">
                      ${c.sellada ? `Abre en Día ${c.diaObjetivo}` : 'Desellada'}
                    </span>
                  </div>
                  
                  ${c.sellada ? `
                    <p style="font-size: 0.76rem; color: var(--text-secondary); line-height: 1.35; margin: 4px 0 8px 0; font-style: italic;">
                      🔒 "Carta sellada con tus motivos y promesas. Faltan ${Math.max(0, c.diaObjetivo - diaNum)} días para desbloquearla."
                    </p>
                    ${listaParaAbrir ? `
                      <button class="btn-abrir-capsula btn-yermo-primary" data-id="${c.id}" style="width: 100%; padding: 6px; font-size: 0.78rem; background: #22c55e; border: none; color: #fff; font-weight: bold; cursor: pointer;">
                        ✨ ¡Desellar y Leer Carta Cumplida!
                      </button>
                    ` : ''}
                  ` : `
                    <div style="background: rgba(0,0,0,0.6); padding: 8px; border-radius: var(--radius-sm); border-left: 2px solid #4ade80; margin-top: 6px;">
                      <p style="font-size: 0.78rem; color: #fef08a; line-height: 1.4; margin: 0 0 6px 0; font-style: italic;">
                        "${c.texto}"
                      </p>
                      <span style="font-size: 0.70rem; color: var(--text-muted); display: block;">
                        ${c.tipo === 'cimiento' ? PLANTILLAS_CAPSULAS_TIEMPO.CIMIENTO_66D.mensajeAperturaDonChui : PLANTILLAS_CAPSULAS_TIEMPO.FARO_180D.mensajeAperturaElena}
                      </span>
                    </div>
                  `}
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <!-- SECCIÓN 3: BIBLIOTECA DE SABIDURÍA UNIVERSAL (10 OBRAS CLÁSICAS) -->
      <div class="card-yermo" style="border-left: 3px solid #38bdf8; background: rgba(56, 189, 248, 0.06); padding: 14px; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.4rem;">📚</span>
            <div>
              <h3 style="color: #bae6fd; font-size: 0.95rem; margin: 0;">Biblioteca de Sabiduría Universal</h3>
              <span style="font-size: 0.70rem; color: var(--text-muted); font-family: var(--font-mono);">
                Equipados: ${(estado.objetosSabiduriaActivos || []).length} / 2 Libros (+1 Permanente c/u)
              </span>
            </div>
          </div>
          <button id="btn-ayuda-sabiduria" class="btn-yermo-secondary" style="font-size: 0.72rem; padding: 4px 8px; border-color: #38bdf8; color: #bae6fd; cursor: pointer; display: flex; align-items: center; gap: 4px;">
            ℹ️ ¿Cómo funciona?
          </button>
        </div>

        <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 10px;">
          Equipa hasta <strong>2 libros activos</strong>. Cada uno otorga un <strong>+1 permanente a su Pilar</strong> mientras esté equipado, impactando directamente tu <strong>Torta de Equilibrio</strong> y brindándote su aforismo al amanecer.
        </p>

        <!-- GRID DE LOS 10 LIBROS -->
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${Object.values(OBJETOS_SABIDURIA).map(libro => {
            const activo = (estado.objetosSabiduriaActivos || []).includes(libro.id);
            const esMente = libro.pilar === 'mente';
            const bgBadge = esMente ? 'rgba(3, 105, 161, 0.25)' : 'rgba(126, 34, 206, 0.25)';
            const borderBadge = esMente ? '#38bdf8' : '#c084fc';
            const colorBadge = esMente ? '#7dd3fc' : '#e9d5ff';
            const iconoPilar = esMente ? '📜' : '🔥';

            return `
              <div class="card-yermo" style="background: ${activo ? 'rgba(56, 189, 248, 0.12)' : 'rgba(0,0,0,0.4)'}; border: 1px solid ${activo ? '#38bdf8' : 'var(--border-subtle)'}; padding: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 1.3rem;">${libro.icono}</span>
                    <div>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <strong style="color: #fff; font-size: 0.86rem;">${libro.nombre}</strong>
                        ${activo ? '<span style="background: #0284c7; color: #fff; font-size: 0.62rem; font-weight: 800; padding: 1px 5px; border-radius: 4px; font-family: var(--font-mono);">EQUIPADO</span>' : ''}
                      </div>
                      <span style="font-size: 0.70rem; color: var(--text-muted); font-style: italic;">${libro.autor}</span>
                    </div>
                  </div>
                  <button class="btn-toggle-libro-sabiduria ${activo ? 'btn-yermo-secondary' : 'btn-yermo-primary'}" data-id="${libro.id}" style="font-size: 0.72rem; padding: 4px 10px; white-space: nowrap; ${activo ? 'background: rgba(239, 68, 68, 0.18); border: 1px solid #ef4444; color: #fca5a5;' : 'background: #0284c7; border: 1px solid #38bdf8; color: #fff; font-weight: bold;'} cursor: pointer;" title="${activo ? 'Toca para desequipar este libro' : 'Toca para equipar este libro'}">
                    ${activo ? '✕ Desequipar' : '+ Equipar'}
                  </button>
                </div>

                <!-- BADGE EXPLICATIVO DEL PILAR -->
                <div style="margin-bottom: 6px;">
                  <span style="display: inline-flex; align-items: center; gap: 4px; background: ${bgBadge}; border: 1px solid ${borderBadge}; color: ${colorBadge}; font-size: 0.68rem; font-weight: 700; padding: 2px 8px; border-radius: 10px; font-family: var(--font-mono);">
                    ${iconoPilar} +1 PERMANENTE A ${libro.pilar.toUpperCase()} (Afecta Torta)
                  </span>
                </div>

                <p style="font-size: 0.74rem; color: var(--text-secondary); line-height: 1.35; margin: 0;">
                  ${libro.desc}
                </p>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- SECCIÓN 4: LAS 4 CAPAS DE VALIDACIÓN HISTÓRICAS -->
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

      <!-- PIE DE HOGAR -->
      <div style="margin-top: 20px; text-align: center;">
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">
          Tu refugio está seguro. Vuelve al Tablón cuando te sientas listo.
        </p>
        <button id="btn-volver-tablon-desde-hogar" class="btn-yermo-primary" style="width: 100%;">
          Regresar al Tablón Principal
        </button>
      </div>
    `;

    this.vincularEventos(estado, disparador);
  }

  vincularEventos(estado, disparador) {
    // 1. Guardar Micro-Journaling
    const btnGuardarDiario = this.contenedor.querySelector('#btn-guardar-diario');
    const inputDiario = this.contenedor.querySelector('#input-diario-texto');
    const msgDiario = this.contenedor.querySelector('#msg-diario-feedback');

    if (btnGuardarDiario && inputDiario) {
      btnGuardarDiario.addEventListener('click', async () => {
        const texto = inputDiario.value.trim();
        if (!texto) {
          alert('Escribe unas palabras sinceras antes de guardar en tu cuaderno.');
          return;
        }
        await estadoApp.guardarEntradaDiario(disparador.id, texto, disparador.pilar);
        audioProcedural.playCheckSenda();
        if (msgDiario) {
          msgDiario.style.display = 'block';
          msgDiario.textContent = '✅ Asentado en el Cuaderno del Náufrago.';
          setTimeout(() => {
            msgDiario.style.display = 'none';
            this.render(estadoApp.datos);
          }, 1000);
        }
      });
    }

    // 2. Toggle historial diario
    const btnToggleHistorial = this.contenedor.querySelector('#btn-toggle-historial-diario');
    if (btnToggleHistorial) {
      btnToggleHistorial.addEventListener('click', () => {
        this.verHistorialDiario = !this.verHistorialDiario;
        this.render(estadoApp.datos);
        audioProcedural.playClick();
      });
    }

    // 3. Crear Nueva Cápsula de Tiempo (Modal)
    const btnNuevaCapsula = this.contenedor.querySelector('#btn-nueva-capsula');
    if (btnNuevaCapsula) {
      btnNuevaCapsula.addEventListener('click', () => {
        this.mostrarModalNuevaCapsula(estado);
      });
    }

    // 4. Abrir Cápsula cumplida
    this.contenedor.querySelectorAll('.btn-abrir-capsula').forEach(btn => {
      btn.addEventListener('click', async () => {
        const capsulaId = btn.dataset.id;
        await estadoApp.abrirCapsulaTiempo(capsulaId);
        audioProcedural.playFanfarriaFaro();
        this.render(estadoApp.datos);
      });
    });

    // 5. Toggle Libros de Sabiduría Activos (máx. 2)
    this.contenedor.querySelectorAll('.btn-toggle-libro-sabiduria').forEach(btn => {
      btn.addEventListener('click', async () => {
        const libroId = btn.dataset.id;
        const activos = estadoApp.datos.objetosSabiduriaActivos || [];
        if (activos.includes(libroId)) {
          // Desactivar
          estadoApp.datos.objetosSabiduriaActivos = activos.filter(id => id !== libroId);
          await estadoApp.guardar();
          audioProcedural.playClick();
          this.render(estadoApp.datos);
        } else {
          // Intentar activar con tope de 2
          const res = SabiduriaDiariaEngine.intentarActivarObjeto(activos, libroId);
          if (!res.exito) {
            alert(res.razon);
            audioProcedural.playError();
            return;
          }
          estadoApp.datos.objetosSabiduriaActivos = res.objetosActivos;
          await estadoApp.guardar();
          audioProcedural.playSubirNivel();
          this.render(estadoApp.datos);
        }
      });
    });

    // 6. Botón de Ayuda: Objetos de Sabiduría
    const btnAyudaSabiduria = this.contenedor.querySelector('#btn-ayuda-sabiduria');
    if (btnAyudaSabiduria) {
      btnAyudaSabiduria.addEventListener('click', () => {
        audioProcedural.playClick();
        this.mostrarModalAyudaSabiduria();
      });
    }

    // 7. Volver al Tablón
    const btnVolver = this.contenedor.querySelector('#btn-volver-tablon-desde-hogar');
    if (btnVolver) {
      btnVolver.addEventListener('click', () => {
        document.querySelector('[data-tab="tablon"]').click();
      });
    }
  }

  mostrarModalAyudaSabiduria() {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="info-modal-wrap" style="text-align: left; padding: 18px 14px; max-height: 85vh; overflow-y: auto;">
        <button class="modal-close-btn" id="btn-cerrar-modal-ayuda-sabiduria" style="position: absolute; top: 12px; right: 12px;">&times;</button>
        
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <span style="font-size: 1.6rem;">📚</span>
          <div>
            <h3 style="color: #38bdf8; font-size: 1.05rem; margin: 0;">Objetos de Sabiduría & Pilares</h3>
            <span style="font-size: 0.70rem; color: var(--text-muted); font-family: var(--font-mono);">Guía de Mecánicas del Refugio</span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.78rem; line-height: 1.45; color: var(--text-secondary);">
          <div class="card-yermo" style="background: rgba(56, 189, 248, 0.08); border-left: 3px solid #38bdf8; padding: 10px;">
            <strong style="color: #bae6fd; display: block; margin-bottom: 4px; font-size: 0.82rem;">1. ¿Qué son y cómo funcionan?</strong>
            Son las 10 grandes obras clásicas de la humanidad (Biblia, Epicteto, Marco Aurelio, Sun Tzu, Nietzsche, Musashi, etc.). Puedes equipar hasta <strong>2 libros activos</strong> en tu baúl.
          </div>

          <div class="card-yermo" style="background: rgba(168, 85, 247, 0.08); border-left: 3px solid #c084fc; padding: 10px;">
            <strong style="color: #e9d5ff; display: block; margin-bottom: 4px; font-size: 0.82rem;">2. Puntos Permanentes a los Pilares (+1 Fijo)</strong>
            Cada libro equipado <strong>NO suma +1 diario</strong>, sino un <strong>+1 punto permanente</strong> al pilar correspondiente (<strong>📜 Mente</strong> o <strong>🔥 Espíritu</strong>) mientras lo mantengas equipado.
          </div>

          <div class="card-yermo" style="background: rgba(234, 179, 8, 0.08); border-left: 3px solid #eab308; padding: 10px;">
            <strong style="color: #fef08a; display: block; margin-bottom: 4px; font-size: 0.82rem;">3. Impacto en la Torta de Equilibrio</strong>
            El punto de cada libro equipado se suma al cálculo de la <strong>Torta de 21 Días</strong>. Junto a tus <strong>Sendas activas</strong> (hábitos que desbloqueas al subir de nivel tu refugio), este punto modifica de inmediato tus porcentajes para ayudarte a balancear y forjar la <strong>Torta Dorada</strong> (20%-30% por pilar).
          </div>

          <div class="card-yermo" style="background: rgba(34, 197, 94, 0.08); border-left: 3px solid #22c55e; padding: 10px;">
            <strong style="color: #86efac; display: block; margin-bottom: 4px; font-size: 0.82rem;">4. Aforismos Matutinos</strong>
            Al iniciar cada jornada en el Yermo, tus libros equipados te desplegarán un aforismo, proverbio o versículo seleccionado para darte enfoque, templanza y claridad mental.
          </div>
        </div>

        <button id="btn-entendido-ayuda-sabiduria" class="btn-yermo-primary" style="width: 100%; padding: 10px; margin-top: 14px; font-size: 0.84rem; background: #0284c7; border-color: #38bdf8; font-weight: bold; cursor: pointer;">
          ✨ Comprendido
        </button>
      </div>
    `;

    modalContainer.classList.remove('hidden');

    const cerrar = () => {
      audioProcedural.playClick();
      modalContainer.classList.add('hidden');
    };

    modalContent.querySelector('#btn-cerrar-modal-ayuda-sabiduria')?.addEventListener('click', cerrar);
    modalContent.querySelector('#btn-entendido-ayuda-sabiduria')?.addEventListener('click', cerrar);
  }

  mostrarModalNuevaCapsula(estado) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="info-modal-wrap" style="text-align: left; padding: 18px 14px;">
        <button class="modal-close-btn" id="btn-cerrar-modal-capsula" style="position: absolute; top: 12px; right: 12px;">&times;</button>
        
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
          <img src="assets/sprites/items/ui_capsula_tiempo_sellada.png" alt="Cápsula" class="pixel-icon icon-24">
          <h3 style="color: #d8b4fe; font-size: 1.05rem; margin: 0;">Sellar Carta al Yo del Futuro</h3>
        </div>

        <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 12px;">
          Escribe tus motivos, miedos y compromisos actuales. La carta quedará sellada herméticamente y solo podrás leerla cuando alcances la meta.
        </p>

        <div style="margin-bottom: 10px;">
          <label style="font-size: 0.76rem; color: var(--text-secondary); display: block; margin-bottom: 4px;">Tipo de Meta / Duración:</label>
          <select id="select-tipo-capsula" class="card-yermo" style="width: 100%; padding: 8px; color: #fff; background: var(--bg-surface);">
            <option value="cimiento" data-dias="66">Carta de Cimiento (Meta: 66 Días)</option>
            <option value="faro" data-dias="180">Pacto de Faro (Meta: 180 Días)</option>
            <option value="personal" data-dias="30">Promesa Mensual (Meta: 30 Días)</option>
          </select>
        </div>

        <div style="margin-bottom: 14px;">
          <label style="font-size: 0.76rem; color: var(--text-secondary); display: block; margin-bottom: 4px;">Tu Carta Sellada:</label>
          <textarea id="texto-nueva-capsula" rows="4" class="card-yermo" style="width: 100%; padding: 8px; font-size: 0.82rem; color: #fff; background: #16120e; line-height: 1.4; resize: vertical;" placeholder="${PLANTILLAS_CAPSULAS_TIEMPO.CIMIENTO_66D.placeholder}"></textarea>
        </div>

        <button id="btn-confirmar-sellar-capsula" class="btn-yermo-primary" style="width: 100%; padding: 10px; font-size: 0.84rem; background: #9333ea; border: none; color: #fff; font-weight: bold; cursor: pointer; border-radius: var(--radius-sm);">
          🔒 Sellar Carta en el Baúl del Refugio
        </button>
      </div>
    `;

    modalContainer.classList.remove('hidden');

    const selectTipo = modalContent.querySelector('#select-tipo-capsula');
    const textareaTexto = modalContent.querySelector('#texto-nueva-capsula');
    const btnConfirmar = modalContent.querySelector('#btn-confirmar-sellar-capsula');
    const btnCerrar = modalContent.querySelector('#btn-cerrar-modal-capsula');

    selectTipo?.addEventListener('change', () => {
      if (selectTipo.value === 'cimiento') textareaTexto.placeholder = PLANTILLAS_CAPSULAS_TIEMPO.CIMIENTO_66D.placeholder;
      else if (selectTipo.value === 'faro') textareaTexto.placeholder = PLANTILLAS_CAPSULAS_TIEMPO.FARO_180D.placeholder;
      else textareaTexto.placeholder = 'Escribe tus promesas y reflexiones aquí...';
    });

    btnConfirmar?.addEventListener('click', async () => {
      const texto = textareaTexto.value.trim();
      if (!texto) {
        alert('Escribe el contenido de tu carta antes de sellarla.');
        return;
      }
      const tipo = selectTipo.value;
      const opt = selectTipo.options[selectTipo.selectedIndex];
      const dias = parseInt(opt.dataset.dias || '66', 10);

      await estadoApp.crearCapsulaTiempo(tipo, dias, texto);
      audioProcedural.playClick();
      modalContainer.classList.add('hidden');
      this.render(estadoApp.datos);
    });

    btnCerrar?.addEventListener('click', () => {
      modalContainer.classList.add('hidden');
      audioProcedural.playClick();
    });
  }
}
