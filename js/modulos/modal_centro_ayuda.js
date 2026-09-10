import { audioProcedural } from '../core/audio_procedural.js';
import { ModoFiestaEngine } from './modo_fiesta.js';
import { estadoApp } from '../core/estado.js';

/**
 * Modal: Centro de Ayuda, Información, Instalador PWA, FAQ y Créditos Oficiales
 * UPROTA v2.9 — Equipo Humano + IA
 */

export class ModalCentroAyuda {
  static deferredPrompt = null;
  static tabActivo = 'sobre'; // 'sobre', 'faq', 'instalacion', 'creditos'

  static init() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      ModalCentroAyuda.deferredPrompt = e;
      const btnInstalar = document.getElementById('btn-pwa-instalar-modal');
      if (btnInstalar) {
        btnInstalar.classList.remove('hidden');
      }
    });
  }

  static abrir(tabInicial = 'sobre') {
    ModalCentroAyuda.tabActivo = tabInicial;
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    ModalCentroAyuda.renderContenido(modalContent);
    modalContainer.classList.remove('hidden');
    audioProcedural.playClick();
  }

  static renderContenido(container) {
    const tab = ModalCentroAyuda.tabActivo;

    container.innerHTML = `
      <div class="info-modal-wrap" style="max-height: 85vh; overflow-y: auto; padding-right: 4px;">
        <button class="modal-close-btn" id="btn-cerrar-ayuda" style="position: absolute; top: 12px; right: 12px;">&times;</button>
        
        <!-- ENCABEZADO MODAL -->
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
          <span style="font-size: 1.3rem;">ℹ️</span>
          <div>
            <h3 style="color: var(--text-primary); font-size: 1.05rem; margin: 0;">Centro de Información & Ayuda</h3>
            <span style="font-size: 0.7rem; font-family: var(--font-mono); color: var(--oro-torta);">UPROTA v2.3 &bull; Build 2026.08.30</span>
          </div>
        </div>

        <!-- PESTAÑAS INTERNAS -->
        <div style="display: flex; gap: 4px; overflow-x: auto; margin-bottom: 12px; padding-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <button class="btn-ayuda-tab ${tab === 'sobre' ? 'active' : ''}" data-tab="sobre" style="padding: 5px 8px; font-size: 0.72rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: ${tab === 'sobre' ? 'var(--oro-torta)' : '#1f1c19'}; color: ${tab === 'sobre' ? '#000' : '#fff'}; font-weight: bold; cursor: pointer; white-space: nowrap;">
            📖 Sobre UPROTA
          </button>
          <button class="btn-ayuda-tab ${tab === 'respaldo' ? 'active' : ''}" data-tab="respaldo" style="padding: 5px 8px; font-size: 0.72rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: ${tab === 'respaldo' ? 'var(--oro-torta)' : '#1f1c19'}; color: ${tab === 'respaldo' ? '#000' : '#fff'}; font-weight: bold; cursor: pointer; white-space: nowrap;">
            💾 Respaldo
          </button>
          <button class="btn-ayuda-tab ${tab === 'faq' ? 'active' : ''}" data-tab="faq" style="padding: 5px 8px; font-size: 0.72rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: ${tab === 'faq' ? 'var(--oro-torta)' : '#1f1c19'}; color: ${tab === 'faq' ? '#000' : '#fff'}; font-weight: bold; cursor: pointer; white-space: nowrap;">
            ❓ FAQ
          </button>
          <button class="btn-ayuda-tab ${tab === 'instalacion' ? 'active' : ''}" data-tab="instalacion" style="padding: 5px 8px; font-size: 0.72rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: ${tab === 'instalacion' ? 'var(--oro-torta)' : '#1f1c19'}; color: ${tab === 'instalacion' ? '#000' : '#fff'}; font-weight: bold; cursor: pointer; white-space: nowrap;">
            📲 Instalar App
          </button>
          <button class="btn-ayuda-tab ${tab === 'creditos' ? 'active' : ''}" data-tab="creditos" style="padding: 5px 8px; font-size: 0.72rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: ${tab === 'creditos' ? 'var(--oro-torta)' : '#1f1c19'}; color: ${tab === 'creditos' ? '#000' : '#fff'}; font-weight: bold; cursor: pointer; white-space: nowrap;">
            👑 Créditos
          </button>
        </div>

        <!-- CUERPO SEGÚN PESTAÑA -->
        <div id="cuerpo-tab-ayuda">
          ${ModalCentroAyuda.getHtmlTab(tab)}
        </div>
      </div>
    `;

    // Eventos
    container.querySelector('#btn-cerrar-ayuda')?.addEventListener('click', () => {
      document.getElementById('modal-container')?.classList.add('hidden');
    });

    container.querySelectorAll('.btn-ayuda-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        ModalCentroAyuda.tabActivo = btn.dataset.tab;
        ModalCentroAyuda.renderContenido(container);
        audioProcedural.playClick();
      });
    });

    // Evento de instalación
    const btnInstalar = container.querySelector('#btn-accion-instalar');
    if (btnInstalar) {
      btnInstalar.addEventListener('click', async () => {
        if (ModalCentroAyuda.deferredPrompt) {
          ModalCentroAyuda.deferredPrompt.prompt();
          const { outcome } = await ModalCentroAyuda.deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            btnInstalar.textContent = '✅ Instalando...';
          }
          ModalCentroAyuda.deferredPrompt = null;
        } else {
          alert('Para instalar UPROTA en tu pantalla principal:\n\n• En Android/Chrome: Toca los 3 puntos del navegador y elige "Agregar a la pantalla principal" o "Instalar aplicación".\n• En iPhone/Safari: Toca el botón Compartir (cuadrado con flecha) y elige "Agregar al inicio".');
        }
      });
    }

    // Botón de prueba Modo Fiesta
    container.querySelector('#btn-test-modo-fiesta')?.addEventListener('click', () => {
      document.getElementById('modal-container')?.classList.add('hidden');
      ModoFiestaEngine.activar({
        tipo: 'general',
        titulo: '¡MODO FIESTA DEL REFUGIO!',
        subtitulo: 'Celebración y Festival Humano + IA',
        detalle: '¡La música 8-bits suena, los sprites bailan al ritmo y el confeti llueve sobre el Yermo! Así se celebra cada Faro alcanzado, cada Cimiento forjado y cada Cadena destruida.'
      });
    });

    // Botón de Tabula Rasa / Renacer en el Punto Cero
    container.querySelector('#btn-abrir-tabula-rasa')?.addEventListener('click', () => {
      const modalContainer = document.getElementById('modal-container');
      const modalContent = document.getElementById('modal-content');
      if (!modalContainer || !modalContent) return;

      modalContent.innerHTML = `
        <div class="info-modal-wrap" style="text-align: center; padding: 20px 14px; border: 2px solid #ef4444; background: #140d0c; border-radius: var(--radius-md); box-shadow: 0 0 30px rgba(239, 68, 68, 0.35);">
          <div style="margin-bottom: 8px;">
            <img src="assets/sprites/emojis/emociones/emoji_fuego_ardiente.png" alt="Fuego" class="pixel-icon icon-48" style="width: 48px; height: 48px; image-rendering: pixelated;">
          </div>

          <span style="font-size: 0.72rem; font-family: var(--font-mono); color: #fca5a5; text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">
            TABULA RASA &bull; EL ARTE DE VOLVER A EMPEZAR
          </span>

          <h2 style="color: #fee2e2; font-size: 1.25rem; margin-top: 4px; margin-bottom: 8px; font-family: var(--font-serif);">
            ¿Deseas Renacer en el Día 1?
          </h2>

          <!-- CITA BÍBLICA / ESTOICA DE ALIENTO -->
          <div class="card-yermo" style="background: rgba(0,0,0,0.6); border-left: 3px solid #f59e0b; text-align: left; padding: 12px; margin-bottom: 12px;">
            <p style="font-size: 0.82rem; color: #fef08a; line-height: 1.5; font-style: italic; margin: 0 0 6px 0;">
              «Porque siete veces cae el justo, y vuelve a levantarse...»
              <span style="font-size: 0.72rem; color: var(--text-muted); display: block; font-style: normal; margin-top: 2px;">— Proverbios 24:16 (Mateo 18:22: "Hasta setenta veces siete")</span>
            </p>
            <p style="font-size: 0.80rem; color: #e7e5e4; line-height: 1.5; margin: 0;">
              Volver a empezar <strong>no es un fracaso: es el acto más valiente</strong> de quien se niega a rendirse. Si perdiste el ritmo una semana o un mes, no cargues con la culpa. Tu refugio te recibe de nuevo con la frente en alto y el fuego renovado.
            </p>
          </div>

          <!-- ADVERTENCIA TÉCNICA -->
          <p style="font-size: 0.76rem; color: #fca5a5; line-height: 1.4; margin-bottom: 12px;">
            ⚠️ <strong>Atención:</strong> Esta acción purgará todo tu progreso actual (hábitos, días acumulados, faros, recursos y mochilas) para entregarte un lienzo 100% limpio.
          </p>

          <div style="margin-bottom: 14px; text-align: left;">
            <label style="font-size: 0.76rem; color: var(--text-secondary); display: block; margin-bottom: 4px;">
              Escribe la palabra <strong>RENACER</strong> para confirmar:
            </label>
            <input type="text" id="input-confirmar-renacer" class="card-yermo" style="width: 100%; padding: 8px; color: #fff; background: var(--bg-surface); text-transform: uppercase; font-family: var(--font-mono); text-align: center; border: 1px solid rgba(239, 68, 68, 0.5);" placeholder="RENACER">
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <button id="btn-ejecutar-renacer" class="btn-yermo-primary" style="width: 100%; padding: 10px; font-size: 0.88rem; background: #dc2626; border: none; color: #fff; font-weight: bold; cursor: pointer; border-radius: var(--radius-sm); opacity: 0.6;" disabled>
              🔥 Purgar Memoria y Renacer en el Día 1
            </button>
            <button id="btn-cancelar-renacer" class="btn-yermo-secondary" style="width: 100%; padding: 8px; font-size: 0.82rem; cursor: pointer;">
              🛡️ Cancelar y Continuar Luchando
            </button>
          </div>
        </div>
      `;

      modalContainer.classList.remove('hidden');

      const inputConfirm = modalContent.querySelector('#input-confirmar-renacer');
      const btnRenacer = modalContent.querySelector('#btn-ejecutar-renacer');
      const btnCancelar = modalContent.querySelector('#btn-cancelar-renacer');

      inputConfirm?.addEventListener('input', (e) => {
        const val = e.target.value.trim().toUpperCase();
        if (val === 'RENACER') {
          btnRenacer.disabled = false;
          btnRenacer.style.opacity = '1';
        } else {
          btnRenacer.disabled = true;
          btnRenacer.style.opacity = '0.6';
        }
      });

      btnRenacer?.addEventListener('click', async () => {
        btnRenacer.textContent = '⏳ Purgando refugio y renaciendo...';
        btnRenacer.disabled = true;
        await estadoApp.reiniciarProgresoCompleto();
      });

      btnCancelar?.addEventListener('click', () => {
        modalContainer.classList.add('hidden');
        audioProcedural.playClick();
      });
    });

    // --- PESTAÑA RESPALDO: SNAPSHOTS AUTOMÁTICOS, EXPORTAR & IMPORTAR ---
    const btnCrearSnapshot = container.querySelector('#btn-crear-snapshot-manual');
    if (btnCrearSnapshot) {
      btnCrearSnapshot.addEventListener('click', async () => {
        const dia = estadoApp.datos.perfil?.diaSupervivencia || 1;
        estadoApp.crearSnapshotAutomatico(`Punto de Restauración Manual — Día ${dia}`, 'manual');
        await estadoApp.guardar();
        audioProcedural.playCheckSenda();
        ModalCentroAyuda.renderContenido(container);
      });
    }

    container.querySelectorAll('.btn-descargar-snapshot').forEach(btn => {
      btn.addEventListener('click', () => {
        const snapId = btn.dataset.snapid;
        const nombre = estadoApp.descargarSnapshotJSON(snapId);
        if (nombre) {
          audioProcedural.playCheckSenda();
          alert(`📥 Respaldo automático descargado como ${nombre} en tu carpeta de Descargas.`);
        }
      });
    });

    container.querySelectorAll('.btn-restaurar-snapshot').forEach(btn => {
      btn.addEventListener('click', async () => {
        const snapId = btn.dataset.snapid;
        if (confirm('⚠️ ¿Deseas restaurar tu refugio a este punto de guardado automático? Se sobrescribirá el estado actual con los datos de ese snapshot.')) {
          try {
            await estadoApp.restaurarSnapshotAutomatico(snapId);
            audioProcedural.playFanfarriaFaro();
            alert('✅ ¡Refugio restaurado con éxito!');
            setTimeout(() => window.location.reload(), 800);
          } catch (err) {
            alert('Error al restaurar: ' + err.message);
          }
        }
      });
    });

    const btnExportar = container.querySelector('#btn-exportar-partida');
    const msgExportar = container.querySelector('#msg-exportar-exito');
    if (btnExportar) {
      btnExportar.addEventListener('click', async () => {
        try {
          btnExportar.disabled = true;
          const archivo = await estadoApp.exportarRespaldoJSON();
          if (msgExportar) {
            msgExportar.style.display = 'block';
            msgExportar.innerHTML = `✅ Respaldo descargado como <strong>${archivo}</strong> en tu carpeta de Descargas.`;
          }
          audioProcedural.playCheckSenda();
        } catch (err) {
          alert('Error al exportar: ' + err.message);
        } finally {
          btnExportar.disabled = false;
        }
      });
    }

    const btnActivarInput = container.querySelector('#btn-activar-input-respaldo');
    const inputRespaldo = container.querySelector('#input-archivo-respaldo');
    const msgImportar = container.querySelector('#msg-importar-estado');

    if (btnActivarInput && inputRespaldo) {
      btnActivarInput.addEventListener('click', () => {
        inputRespaldo.click();
      });

      inputRespaldo.addEventListener('change', async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (msgImportar) {
          msgImportar.style.display = 'block';
          msgImportar.style.color = '#38bdf8';
          msgImportar.textContent = '⏳ Leyendo y validando archivo de respaldo...';
        }

        const reader = new FileReader();
        reader.onload = async (evento) => {
          try {
            const contenido = evento.target.result;
            await estadoApp.importarRespaldoJSON(contenido);
            if (msgImportar) {
              msgImportar.style.color = '#4ade80';
              msgImportar.innerHTML = '✅ ¡Refugio restaurado con éxito! Recargando...';
            }
            audioProcedural.playFanfarriaFaro();
            setTimeout(() => window.location.reload(), 1200);
          } catch (err) {
            if (msgImportar) {
              msgImportar.style.color = '#f87171';
              msgImportar.textContent = '❌ ' + err.message;
            }
          }
        };
        reader.onerror = () => {
          if (msgImportar) {
            msgImportar.style.color = '#f87171';
            msgImportar.textContent = '❌ Error al leer el archivo en este dispositivo.';
          }
        };
        reader.readAsText(file);
      });
    }

    // Acordeón FAQ
    container.querySelectorAll('.faq-pregunta').forEach(item => {
      item.addEventListener('click', () => {
        const respuesta = item.nextElementSibling;
        if (respuesta) {
          respuesta.classList.toggle('hidden');
        }
      });
    });
  }

  static getHtmlTab(tab) {
    switch (tab) {
      case 'sobre':
        return `
          <div class="card-yermo" style="border-left: 3px solid var(--oro-torta); background: rgba(0,0,0,0.3); margin-bottom: 10px;">
            <h4 style="color: var(--oro-torta-glow); font-size: 0.92rem; margin-bottom: 4px;">¿Qué es UPROTA?</h4>
            <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
              <strong>UPROTA</strong> (<em>Un Propósito Para Toda la Vida</em>) es un videojuego web y sistema de hábitos diseñado bajo una premisa fundamental: <strong>tu vida real es tu fortaleza</strong>.
            </p>
            <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5; margin-top: 6px;">
              Ambientado en un post-colapso sobrio, realista y esperanzador, cada acción que realizas en tu mundo real (hacer ejercicio, leer, orar, reparar algo, vencer un vicio o ahorrar) genera tablas, clavos, energía y moral para reconstruir tu refugio en el Yermo.
            </p>
          </div>

          <!-- MODO FIESTA INTERACTIVO -->
          <div class="card-yermo" style="border-left: 3px solid #f472b6; background: rgba(244, 114, 182, 0.08); margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <img src="assets/sprites/emojis/emociones/emoji_estrella_victoria.png" alt="Fiesta" class="pixel-icon icon-16">
              <h4 style="color: #f472b6; font-size: 0.88rem; margin: 0;">Festival del Refugio: Modo Fiesta</h4>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 8px;">
              Cuando conquistas un Faro, forjas un Cimiento a los 66 días o destruyes una Cadena de 21 días, el Refugio celebra con fanfarria 8-bits, confeti pixel art y baile de sprites.
            </p>
            <button id="btn-test-modo-fiesta" class="btn-yermo-primary" style="width: 100%; padding: 8px; font-size: 0.82rem; background: linear-gradient(135deg, #f59e0b, #ec4899); border: none; color: #fff; font-weight: bold; cursor: pointer; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; gap: 6px;">
              <img src="assets/sprites/pilares/torta_dorada_badge.png" alt="Probar" class="pixel-icon icon-16">
              <span>Probar Modo Fiesta (Baile & Confeti 8-Bits)</span>
            </button>
          </div>

          <div class="card-yermo" style="background: rgba(0,0,0,0.2); margin-bottom: 10px;">
            <h4 style="color: var(--text-primary); font-size: 0.88rem; margin-bottom: 6px;">🏛️ Los 4 Pilares de la Existencia:</h4>
            <ul style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; padding-left: 18px; margin: 0;">
              <li><strong>Cuerpo (Fuerza & Salud):</strong> Ejercicio, agua, descanso y nutrición.</li>
              <li><strong>Mente (Sabiduría & Enfoque):</strong> Lectura, estudio, planificación y foco.</li>
              <li><strong>Espíritu (Paz & Fortaleza Interior):</strong> Reflexión, oración, calma y propósito.</li>
              <li><strong>Taller (Labor & Seguridad):</strong> Trabajo manual, orden, finanzas y mantenimiento.</li>
            </ul>
          </div>

          <div class="card-yermo" style="background: rgba(0,0,0,0.2); margin-bottom: 10px;">
            <h4 style="color: var(--text-primary); font-size: 0.88rem; margin-bottom: 4px;">🛡️ Filosofía Sin Culpa:</h4>
            <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45;">
              A diferencia de las apps que castigan al usuario con números rojos y culpa cuando tiene un día difícil, UPROTA valida tu esfuerzo humano acumulado. Si tropiezas, el refugio te resguarda en <em>El Hogar</em> para que descanses y vuelvas a empezar con dignidad.
            </p>
          </div>

          <!-- ZONA DE TABULA RASA / VOLVER A EMPEZAR -->
          <div class="card-yermo" style="border-left: 3px solid #ef4444; background: rgba(239, 68, 68, 0.08); margin-top: 14px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <img src="assets/sprites/emojis/emociones/emoji_fuego_ardiente.png" alt="Fuego" class="pixel-icon icon-16">
              <h4 style="color: #fca5a5; font-size: 0.88rem; margin: 0;">Zona de Renacimiento: Tabula Rasa</h4>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 8px;">
              ¿Perdiste el rumbo o deseas comenzar de nuevo con el lienzo en blanco? Volver a empezar es de valientes. Puedes purgar la memoria del refugio y renacer desde el Día 1 con dignidad y sin culpa.
            </p>
            <button id="btn-abrir-tabula-rasa" class="btn-yermo-secondary" style="width: 100%; padding: 8px; font-size: 0.82rem; border-color: rgba(239, 68, 68, 0.4); color: #fca5a5; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
              <img src="assets/sprites/emojis/emociones/emoji_abrazo_refugio.png" alt="Abrazo" class="pixel-icon icon-16">
              <span>Volver a Empezar desde Cero (Día 1)</span>
            </button>
          </div>
        `;

      case 'respaldo': {
        const snapshots = estadoApp.datos.respaldosAutomaticos || [];
        return `
          <div class="card-yermo" style="border-left: 3px solid var(--oro-torta); background: rgba(0,0,0,0.3); margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <img src="assets/sprites/items/caja_expedicion.png" alt="Respaldo" class="pixel-icon icon-20">
              <h4 style="color: var(--oro-torta-glow); font-size: 0.92rem; margin: 0;">Soberanía y Seguridad de tu Refugio</h4>
            </div>
            <p style="font-size: 0.80rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
              En UPROTA tu progreso dura <strong>365 a 730 días reales</strong>. Tus datos viven exclusivamente en la memoria de este dispositivo y nunca se envían a servidores externos. Cuentas con <strong>guardados automáticos trimestrales</strong> y exportación manual libre.
            </p>
          </div>

          <!-- TARJETA 0: GUARDADOS AUTOMÁTICOS TRIMESTRALES (AUTO-SNAPSHOTS) -->
          <div class="card-yermo" style="background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.4); padding: 12px; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-size: 1.2rem;">⏱️</span>
                <h4 style="color: #d8b4fe; font-size: 0.88rem; margin: 0;">Guardados Automáticos del Sistema</h4>
              </div>
              <button id="btn-crear-snapshot-manual" class="btn-yermo-secondary" style="font-size: 0.70rem; padding: 3px 8px; border-color: #c084fc; color: #e9d5ff; cursor: pointer;" title="Guarda un snapshot del momento actual">
                + Crear Punto Ahora
              </button>
            </div>
            
            <p style="font-size: 0.76rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 8px;">
              UPROTA genera automáticamente <strong>puntos de restauración cada 3 meses (Día 90, 180, 270, 365)</strong> y en hitos de Cimientos/Faros. Si alguna vez olvidas hacer una copia manual, puedes descargar o restaurar cualquiera de estos puntos:
            </p>

            ${snapshots.length === 0 ? `
              <div style="text-align: center; padding: 8px; background: rgba(0,0,0,0.3); border-radius: var(--radius-sm); font-size: 0.74rem; color: var(--text-muted);">
                Aún no hay snapshots automáticos registrados. Se generarán automáticamente al cerrar cada estación o puedes pulsar "+ Crear Punto Ahora".
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 6px;">
                ${snapshots.map(snap => `
                  <div class="card-yermo" style="background: rgba(0,0,0,0.5); padding: 8px 10px; border: 1px solid rgba(192, 132, 252, 0.25); display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-size: 0.78rem; font-weight: bold; color: #fef08a;">
                        ${snap.motivo || `Día ${snap.diaSupervivencia}`}
                      </div>
                      <div style="font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-mono);">
                        ${snap.fecha} &bull; ${snap.resumen || `Día ${snap.diaSupervivencia}`}
                      </div>
                    </div>
                    <div style="display: flex; gap: 6px;">
                      <button class="btn-descargar-snapshot btn-yermo-secondary" data-snapid="${snap.id}" style="font-size: 0.70rem; padding: 4px 6px; border-color: #38bdf8; color: #38bdf8; cursor: pointer;" title="Descargar este archivo .json">
                        📥 Bajar
                      </button>
                      <button class="btn-restaurar-snapshot btn-yermo-primary" data-snapid="${snap.id}" style="font-size: 0.70rem; padding: 4px 6px; background: #9333ea; border: none; color: #fff; cursor: pointer;" title="Restaurar el juego a este punto">
                        🔄 Cargar
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <!-- TARJETA 1: EXPORTAR PARTIDA -->
          <div class="card-yermo" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); padding: 12px; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <img src="assets/sprites/pilares/torta_dorada_badge.png" alt="Guardar" class="pixel-icon icon-16">
              <h4 style="color: #38bdf8; font-size: 0.88rem; margin: 0;">1. Guardar Copia Manual (.json / .uprota)</h4>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 8px;">
              Genera un archivo <code>.json</code> con todo tu avance (perfil, días, faros, inventario, vehículos y construcciones).
            </p>
            <div style="background: rgba(0,0,0,0.4); border-left: 2px solid #38bdf8; padding: 8px; font-size: 0.74rem; color: #bae6fd; line-height: 1.45; margin-bottom: 10px;">
              📍 <strong>¿Dónde se descarga el archivo?</strong><br>
              Se guardará automáticamente en la carpeta <strong>Descargas (Downloads)</strong> de tu teléfono o PC. Te recomendamos guardarlo en tu Google Drive, iCloud o enviártelo a tu propio chat de WhatsApp/Telegram para tenerlo siempre a salvo.
            </div>
            <button id="btn-exportar-partida" class="btn-yermo-primary" style="width: 100%; padding: 10px; font-size: 0.82rem; background: #0284c7; border: none; color: #fff; font-weight: bold; cursor: pointer; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; gap: 6px;">
              <span>💾 Descargar Copia de Seguridad (.json)</span>
            </button>
            <div id="msg-exportar-exito" style="display: none; font-size: 0.74rem; color: #4ade80; margin-top: 6px; text-align: center;"></div>
          </div>

          <!-- TARJETA 2: IMPORTAR PARTIDA -->
          <div class="card-yermo" style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); padding: 12px; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <img src="assets/sprites/emojis/emociones/emoji_bandera_hito.png" alt="Cargar" class="pixel-icon icon-16">
              <h4 style="color: #4ade80; font-size: 0.88rem; margin: 0;">2. Cargar Partida / Restaurar Respaldo</h4>
            </div>
            <p style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 8px;">
              ¿Cambiaste de teléfono o limpiaste el navegador? Selecciona tu archivo de respaldo <code>.json</code> desde la memoria local de tu dispositivo o desde tu nube (Drive/iCloud/Archivos).
            </p>
            
            <input type="file" id="input-archivo-respaldo" accept=".json" style="display: none;">
            <button id="btn-activar-input-respaldo" class="btn-yermo-secondary" style="width: 100%; padding: 10px; font-size: 0.82rem; border-color: #22c55e; color: #4ade80; font-weight: bold; cursor: pointer; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; gap: 6px;">
              <span>📂 Seleccionar Archivo y Restaurar Refugio</span>
            </button>
            <div id="msg-importar-estado" style="display: none; font-size: 0.74rem; margin-top: 6px; text-align: center;"></div>
          </div>
        `;
      }

      case 'faq':
        return `
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div class="card-yermo" style="padding: 10px; background: #1a1714; border: 1px solid var(--border-subtle);">
              <div class="faq-pregunta" style="font-size: 0.84rem; font-weight: bold; color: var(--oro-torta); cursor: pointer; display: flex; justify-content: space-between;">
                <span>¿Qué pasa si olvido hacer un respaldo manual?</span>
                <span>▼</span>
              </div>
              <div class="faq-respuesta hidden" style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 8px; line-height: 1.45; border-top: 1px dashed var(--border-subtle); padding-top: 6px;">
                No te preocupes. UPROTA cuenta con un <strong>sistema de Guardado Automático Trimestral</strong> que genera puntos de restauración en tu navegador cada 3 meses (Día 90, 180, 270, 365) y en cada gran hito (Cimientos y Faros). Puedes consultarlos, descargarlos o restaurarlos en la pestaña <strong>💾 Respaldo</strong>.
              </div>
            </div>

            <div class="card-yermo" style="padding: 10px; background: #1a1714; border: 1px solid var(--border-subtle);">
              <div class="faq-pregunta" style="font-size: 0.84rem; font-weight: bold; color: var(--oro-torta); cursor: pointer; display: flex; justify-content: space-between;">
                <span>¿Cómo funciona el modo 100% Offline?</span>
                <span>▼</span>
              </div>
              <div class="faq-respuesta hidden" style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 8px; line-height: 1.45; border-top: 1px dashed var(--border-subtle); padding-top: 6px;">
                UPROTA guarda todo tu progreso en tu propio dispositivo mediante <strong>IndexedDB</strong> y precachea el juego completo con un <strong>Service Worker</strong>. Puedes usarlo en medio del bosque o en modo avión sin conexión a internet y nunca perderás tus datos.
              </div>
            </div>

            <div class="card-yermo" style="padding: 10px; background: #1a1714; border: 1px solid var(--border-subtle);">
              <div class="faq-pregunta" style="font-size: 0.84rem; font-weight: bold; color: var(--oro-torta); cursor: pointer; display: flex; justify-content: space-between;">
                <span>¿Qué pasa si fallo un día en una Cadena?</span>
                <span>▼</span>
              </div>
              <div class="faq-respuesta hidden" style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 8px; line-height: 1.45; border-top: 1px dashed var(--border-subtle); padding-top: 6px;">
                Bajo la psicología del <em>"Puente que Tiembla"</em>, una recaída aislada no destruye todo tu esfuerzo. Tu progreso retrocede solo unos eslabones para darte la oportunidad de corregir al día siguiente sin caer en la trampa del abandono total.
              </div>
            </div>

            <div class="card-yermo" style="padding: 10px; background: #1a1714; border: 1px solid var(--border-subtle);">
              <div class="faq-pregunta" style="font-size: 0.84rem; font-weight: bold; color: var(--oro-torta); cursor: pointer; display: flex; justify-content: space-between;">
                <span>¿Cuándo se desbloquea la Radio 104.5 MHz?</span>
                <span>▼</span>
              </div>
              <div class="faq-respuesta hidden" style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 8px; line-height: 1.45; border-top: 1px dashed var(--border-subtle); padding-top: 6px;">
                La Radio se sintoniza en la Fase 1 (al alcanzar el Día 60 de supervivencia o subir el Refugio). Te permite escuchar y leer boletines nocturnos de Elena, Doña Concha, Don Chui y El Tuerto.
              </div>
            </div>

            <div class="card-yermo" style="padding: 10px; background: #1a1714; border: 1px solid var(--border-subtle);">
              <div class="faq-pregunta" style="font-size: 0.84rem; font-weight: bold; color: var(--oro-torta); cursor: pointer; display: flex; justify-content: space-between;">
                <span>¿Cómo configuro la frecuencia de mis Sendas?</span>
                <span>▼</span>
              </div>
              <div class="faq-respuesta hidden" style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 8px; line-height: 1.45; border-top: 1px dashed var(--border-subtle); padding-top: 6px;">
                Al crear o tocar una senda puedes definir su frecuencia semanal (2x, 3x, 5x o diario). El sistema evalúa tu semana flexiblemente sin exigirte días fijos obligatorios si tu trabajo o rutina cambian.
              </div>
            </div>
          </div>
        `;

      case 'instalacion':
        return `
          <div class="card-yermo" style="border-left: 3px solid #4ade80; background: rgba(0,0,0,0.3); margin-bottom: 12px;">
            <h4 style="color: #4ade80; font-size: 0.92rem; margin-bottom: 4px;">📲 Instalar en Pantalla Principal (PWA)</h4>
            <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45;">
              Instala UPROTA como una aplicación nativa en tu teléfono o computadora para abrirla en pantalla completa con un solo toque y sin barra de navegación.
            </p>
            <button id="btn-accion-instalar" class="btn-yermo" style="width: 100%; margin-top: 10px; padding: 9px; font-size: 0.84rem; background: var(--oro-torta); color: #000; font-weight: bold; cursor: pointer; border: none; border-radius: var(--radius-sm);">
              📲 Instalar / Añadir Atajo al Inicio
            </button>
          </div>

          <div class="card-yermo" style="background: rgba(0,0,0,0.2);">
            <h4 style="font-size: 0.84rem; color: var(--text-primary); margin-bottom: 6px;">⚙️ Estado Técnico del Sistema:</h4>
            <div style="font-size: 0.78rem; font-family: var(--font-mono); color: var(--text-secondary); line-height: 1.6;">
              <div>• <strong>Versión:</strong> UPROTA v2.3</div>
              <div>• <strong>Compilación:</strong> 2026.08.30-prod</div>
              <div>• <strong>Almacenamiento:</strong> IndexedDB Local (Persistente)</div>
              <div>• <strong>Caché Offline:</strong> Service Worker Activo (v2.3)</div>
              <div>• <strong>Motor de Audio:</strong> Web Audio API Chiptune (0 KB)</div>
            </div>
          </div>
        `;

      case 'creditos':
        return `
          <div class="card-yermo" style="border-left: 3px solid var(--oro-torta); background: rgba(0,0,0,0.4); margin-bottom: 12px;">
            <h4 style="color: var(--oro-torta-glow); font-size: 0.92rem; margin-bottom: 4px;">🤝 Manifiesto de Cooperación Humano + IA</h4>
            <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.45; font-style: italic;">
              "UPROTA es un testimonio vivo de lo que la colaboración entre la intención humana y la inteligencia artificial puede construir cuando existe un trato digno, respeto, rigor técnico y un propósito compartido al servicio del crecimiento humano."
            </p>
          </div>

          <div style="display: flex; flex-direction: column; gap: 8px;">
            <!-- DIRECTOR -->
            <div class="card-yermo" style="padding: 10px; background: #1a1714; border: 1px solid var(--oro-torta-dim, #78350f); display: flex; gap: 12px; align-items: center;">
              <img src="assets/sprites/avatars/avatar_anigami_44x44.png" alt="Anigami Agadni" class="pixel-icon icon-44" style="width: 44px; height: 44px; background: #000; border: 2px solid var(--oro-torta); border-radius: var(--radius-sm);" title="El Hombre de Vitruvio (Pixel Art)">
              <div>
                <h4 style="color: var(--oro-torta-glow); font-size: 0.92rem; margin: 0;">Anigami Agadni</h4>
                <div style="font-size: 0.72rem; color: #fff; font-weight: 600;">Director & Diseñador Principal</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">La mente que soñó UPROTA. Visión humana, psicología de hábitos y liderazgo del equipo.</div>
              </div>
            </div>

            <!-- NEXO -->
            <div class="card-yermo" style="padding: 10px; background: #141312; border: 1px solid var(--border-subtle); display: flex; gap: 12px; align-items: center;">
              <img src="assets/sprites/avatars/avatar_nexo_44x44.png" alt="Nexo" class="pixel-icon icon-44" style="width: 44px; height: 44px; background: #000; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
              <div>
                <h4 style="color: var(--text-primary); font-size: 0.9rem; margin: 0;">Nexo</h4>
                <div style="font-size: 0.72rem; color: #38bdf8; font-weight: 600;">Ingeniero de Software Principal & Mano Derecha (IA)</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Arquitectura de código, motores de estado, IndexedDB, Service Worker y Web Audio API.</div>
              </div>
            </div>

            <!-- PIX -->
            <div class="card-yermo" style="padding: 10px; background: #141312; border: 1px solid var(--border-subtle); display: flex; gap: 12px; align-items: center;">
              <img src="assets/sprites/avatars/avatar_pix_44x44.png" alt="Pix" class="pixel-icon icon-44" style="width: 44px; height: 44px; background: #000; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
              <div>
                <h4 style="color: var(--text-primary); font-size: 0.9rem; margin: 0;">Pix</h4>
                <div style="font-size: 0.72rem; color: #f472b6; font-weight: 600;">Artista Visual Pixel Art (IA)</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Sprites de NPCs, animaciones Aseprite, dioramas modulares del refugio e iconos retro.</div>
              </div>
            </div>

            <!-- SILAS -->
            <div class="card-yermo" style="padding: 10px; background: #141312; border: 1px solid var(--border-subtle); display: flex; gap: 12px; align-items: center;">
              <img src="assets/sprites/avatars/avatar_silas_44x44.png" alt="Silas" class="pixel-icon icon-44" style="width: 44px; height: 44px; background: #000; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
              <div>
                <h4 style="color: var(--text-primary); font-size: 0.9rem; margin: 0;">Silas</h4>
                <div style="font-size: 0.72rem; color: #fbbf24; font-weight: 600;">Arquitecto Narrativo / El Cronista del Yermo (IA)</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Lore, guiones de radio 104.5 MHz, eventos de 90+ días y datasets de sabiduría diaria.</div>
              </div>
            </div>

            <!-- HERTZ -->
            <div class="card-yermo" style="padding: 10px; background: #141312; border: 1px solid var(--border-subtle); display: flex; gap: 12px; align-items: center;">
              <img src="assets/sprites/avatars/avatar_hertz_44x44.png" alt="Hertz" class="pixel-icon icon-44" style="width: 44px; height: 44px; background: #000; border: 1px solid var(--border-subtle); border-radius: var(--radius-sm);">
              <div>
                <h4 style="color: var(--text-primary); font-size: 0.9rem; margin: 0;">Hertz</h4>
                <div style="font-size: 0.72rem; color: #a78bfa; font-weight: 600;">Diseñador de Sonido & Músico Chiptune (IA)</div>
                <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 2px;">Paisaje sonoro procedural, efectos de 8-bits y partituras de tracker en Web Audio API.</div>
              </div>
            </div>
          </div>
        `;
    }
  }
}
