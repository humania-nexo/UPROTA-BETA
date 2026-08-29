/**
 * Componente: Modal del Puente Informativo (Icono ℹ️)
 * Explica con transparencia cómo cada mecánica del Yermo se aplica a la vida real sin romper la inmersión.
 */

export const INFO_VIDA_REAL = {
  torta_equilibrio: {
    titulo: 'La Torta de Equilibrio (Ventana Móvil de 21 Días)',
    porQueJuego: 'Mide la armonía entre tus cuatro pilares activos en los últimos 21 días para otorgar bonos de exploración.',
    vidaReal: 'En psicología del comportamiento, medir el progreso sobre una ventana móvil reciente evita la frustración de comparar tu presente con rachas pasadas. Fomenta que cuides tu cuerpo, mente, espíritu y labor manual hoy, sin obsesionarte con el pasado.'
  },
  faro_ahorro: {
    titulo: 'El Faro de Ahorro Semestral (Regla del 5%)',
    porQueJuego: 'Nace tras el incidente del almacén en el Día 7 para protegerte de adversidades imprevistas.',
    vidaReal: 'Sembrar el hábito del ahorro no se logra imponiendo metas irreales del 50%. Apartar un 5% innegociable de tus ingresos fijos durante 6 meses construye una muralla psicológica de seguridad financiera ante emergencias imprevistas.'
  },
  el_hogar: {
    titulo: 'El Hogar (Validación Radical sin Culpa)',
    porQueJuego: 'Un espacio de calor y resguardo que se activa cuando tropiezas o pasas días difíciles.',
    vidaReal: 'Las aplicaciones tradicionales castigan al usuario rompiendo rachas con números rojos, generando culpa y abandono. La ciencia de la autocompasión demuestra que reconocer la dificultad y validar el esfuerzo acumulado es lo que realmente permite volver a empezar.'
  },
  cadenas: {
    titulo: 'Cadenas y el Puente que Tiembla (21 Días)',
    porQueJuego: 'Rompe malos hábitos en 21 días continuos sin castigo destructivo por 1-2 recaídas aisladas.',
    vidaReal: 'Dejar un mal hábito (azúcar, fumar, procrastinar) rara vez es un camino perfecto. Tratar una recaída aislada como un "temblor en el puente" en vez de una catástrofe evita el efecto de abandono total y refuerza el compromiso al día siguiente.'
  },
  sendas: {
    titulo: 'Sendas Activas y el Forjado de Cimientos (66 Días)',
    porQueJuego: 'Sostienen la energía de tu refugio y forjan cimientos inamovibles tras 66 días de práctica.',
    vidaReal: 'La neurociencia (University College London) demuestra que un hábito positivo promedio tarda 66 días en volverse automático. El sistema permite frecuencias flexibles (2x, 3x, 5x o diario) para adaptarse a la vida real sin la frustración de rachas rígidas.'
  },
  expediciones: {
    titulo: 'Expediciones y Misiones Asíncronas (1 por Día)',
    porQueJuego: 'Despachas una misión hoy y el Prota regresa con el botín y la bitácora al amanecer del día siguiente.',
    vidaReal: 'Diseñado contra la adicción a pantallas y dopamina instantánea. En lugar de mantenerte horas atrapado en la app, UPROTA fomenta que cierres el teléfono, atiendas tu día real y regreses mañana a revisar el fruto de tu constancia.'
  }
};

export class ModalInfo {
  static abrir(claveInfo) {
    const info = INFO_VIDA_REAL[claveInfo];
    if (!info) return;

    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="info-modal-wrap">
        <button class="modal-close-btn" id="btn-cerrar-info">&times;</button>
        
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <img src="assets/sprites/ui/ico_info.png" alt="Info" class="pixel-icon icon-24">
          <h3 style="color: var(--text-primary); font-size: 1.05rem;">${info.titulo}</h3>
        </div>

        <div class="card-yermo" style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--oro-torta); margin-bottom: 10px;">
          <div style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--oro-torta-glow); margin-bottom: 2px;">EN EL YERMO (JUEGO):</div>
          <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.45;">${info.porQueJuego}</p>
        </div>

        <div class="card-yermo" style="background: rgba(0,0,0,0.3); border-left: 3px solid var(--pilar-mente); margin-bottom: 16px;">
          <div style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--pilar-mente-light); margin-bottom: 2px;">EN TU VIDA REAL:</div>
          <p style="font-size: 0.84rem; color: #f5f2eb; line-height: 1.5;">${info.vidaReal}</p>
        </div>

        <button id="btn-entendido-info" class="btn-yermo-primary" style="width: 100%; padding: 10px; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <img src="assets/sprites/ui/ico_check_ok.png" alt="OK" class="pixel-icon icon-16">
          <span>Entendido (Volver al Yermo)</span>
        </button>
      </div>
    `;

    const cerrar = () => modalContainer.classList.add('hidden');
    modalContent.querySelector('#btn-cerrar-info').addEventListener('click', cerrar);
    modalContent.querySelector('#btn-entendido-info').addEventListener('click', cerrar);

    modalContainer.classList.remove('hidden');
  }
}
