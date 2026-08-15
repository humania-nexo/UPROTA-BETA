/**
 * Módulo de UI: El Hogar (Luz cuando las cosas se tensan)
 * Diseñado con validación radical, sin culpa y con auto-evidencia histórica.
 */

import { FRASES_HOGAR, VALIDACIONES_CADENA } from '../data/frases_hogar.js';
import { GameEngine } from '../core/engine.js';

export class HogarModulo {
  constructor(contenedor) {
    this.contenedor = contenedor;
  }

  render(estado) {
    const validacion = VALIDACIONES_CADENA[Math.floor(Math.random() * VALIDACIONES_CADENA.length)];
    const cita = FRASES_HOGAR[Math.floor(Math.random() * FRASES_HOGAR.length)];
    const diaNum = GameEngine.calcularDiasDesdeInicio(estado.perfil.fechaInicio);
    const totalSendas = estado.sendas.length;
    const totalCadenas = estado.cadenas.length;
    const historialTensadas = estado.historialTensadas || [];

    this.contenedor.innerHTML = `
      <div class="hogar-container">
        <!-- Tarjeta Principal del Hogar -->
        <div class="hogar-hero">
          <div class="hogar-tag">Refugio Interior</div>
          <h2 class="hogar-titulo">El Hogar</h2>

          <!-- CAPA 1: Validación Radical -->
          <div class="hogar-validacion">
            ${validacion}
          </div>

          <!-- CAPA 2: Luz Prestada -->
          <div class="hogar-cita-box">
            <p class="hogar-cita-texto">"${cita.frase}"</p>
            <div class="hogar-cita-autor">— ${cita.autor}</div>
          </div>
        </div>

        <!-- CAPA 3: Boletín de Luz (Auto-Evidencia) -->
        <div class="boletin-luz-box">
          <div class="boletin-titulo">
            <span>🕯️</span> Boletín de Luz y Progreso Real
          </div>
          <div class="boletin-contenido">
            <div class="boletin-stat-row">
              <span>Días resistiendo en el Yermo:</span>
              <strong>Día ${diaNum}</strong>
            </div>
            <div class="boletin-stat-row">
              <span>Sendas activas en forja:</span>
              <strong>${totalSendas} senderos</strong>
            </div>
            <div class="boletin-stat-row">
              <span>Cadenas vigiladas:</span>
              <strong>${totalCadenas} hábitos</strong>
            </div>
            <div class="boletin-stat-row">
              <span>Registro de honestidad:</span>
              <strong>${historialTensadas.length} regresos a la fogata</strong>
            </div>

            <p style="margin-top: 14px; font-size: 0.84rem; color: var(--text-secondary); line-height: 1.5;">
              Cada vez que vuelves aquí y admites que el día estuvo pesado, no estás perdiendo terreno. Estás fortaleciendo la honestidad contigo mismo. El refugio nunca se cierra para quien decide seguir.
            </p>
          </div>
        </div>

        <div class="hogar-footer-legal">
          Si la niebla se queda muchos días seguidos, hablar con alguien de confianza o un profesional es también una misión legendaria. No tienes que cruzar el Yermo solo.
        </div>
      </div>
    `;
  }
}
