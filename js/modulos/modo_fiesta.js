import { audioProcedural } from '../core/audio_procedural.js';

export class ModoFiestaEngine {
  static activo = false;
  static canvasConfeti = null;
  static ctxConfeti = null;
  static animFrame = null;
  static particulas = [];

  static activar(config = {}) {
    const {
      tipo = 'general',
      titulo = '¡VICTORIA EN EL YERMO!',
      subtitulo = '¡Un Hito Histórico ha sido Conquistado!',
      detalle = 'Tu constancia diaria ha dejado una huella imborrable en la reconstrucción del Refugio.'
    } = config;

    ModoFiestaEngine.activo = true;
    audioProcedural.playModoFiestaFanfarria();

    document.body.classList.add('modo-fiesta-activo');
    ModoFiestaEngine.iniciarConfetiPixel();
    ModoFiestaEngine.mostrarModalCelebracion({ tipo, titulo, subtitulo, detalle });

    setTimeout(() => {
      document.body.classList.remove('modo-fiesta-activo');
    }, 12000);
  }

  static iniciarConfetiPixel() {
    ModoFiestaEngine.detenerConfetiPixel();

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas-confeti-fiesta';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    const colores = ['#f59e0b', '#38bdf8', '#4ade80', '#f472b6', '#fbbf24', '#a855f7', '#ffffff', '#ef4444'];
    const particulas = [];

    for (let i = 0; i < 110; i++) {
      particulas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: Math.floor(Math.random() * 5) + 4,
        color: colores[Math.floor(Math.random() * colores.length)],
        velX: (Math.random() - 0.5) * 4,
        velY: Math.random() * 3.5 + 2,
        rot: Math.random() * 360,
        velRot: (Math.random() - 0.5) * 8
      });
    }

    ModoFiestaEngine.canvasConfeti = canvas;
    ModoFiestaEngine.ctxConfeti = ctx;
    ModoFiestaEngine.particulas = particulas;

    function animar() {
      if (!ModoFiestaEngine.canvasConfeti) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particulas.forEach(p => {
        p.x += p.velX;
        p.y += p.velY;
        p.rot += p.velRot;

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      ModoFiestaEngine.animFrame = requestAnimationFrame(animar);
    }

    animar();
  }

  static detenerConfetiPixel() {
    if (ModoFiestaEngine.animFrame) {
      cancelAnimationFrame(ModoFiestaEngine.animFrame);
      ModoFiestaEngine.animFrame = null;
    }
    const canvas = document.getElementById('canvas-confeti-fiesta');
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
    ModoFiestaEngine.canvasConfeti = null;
    ModoFiestaEngine.ctxConfeti = null;
  }

  static mostrarModalCelebracion({ tipo, titulo, subtitulo, detalle }) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    if (!modalContainer || !modalContent) return;

    const iconosPorTipo = {
      faro: '🌟⛵',
      cadena: '⛓️💥',
      senda: '🏛️✨',
      general: '🎉👑'
    };

    const icono = iconosPorTipo[tipo] || '🎉✨';

    modalContent.innerHTML = `
      <div class="info-modal-wrap fiesta-modal-card" style="text-align: center; padding: 24px 16px; border: 3px solid var(--oro-torta); box-shadow: 0 0 35px rgba(245, 158, 11, 0.45); background: #12100e; border-radius: var(--radius-md);">
        <div style="font-size: 2.8rem; margin-bottom: 8px;" class="fiesta-icono-rebotante">
          ${icono}
        </div>
        
        <span style="font-size: 0.72rem; font-family: var(--font-mono); color: var(--oro-torta); text-transform: uppercase; letter-spacing: 2px; font-weight: bold;">
          ¡FESTIVAL DEL REFUGIO &bull; MODO FIESTA!
        </span>

        <h2 style="color: var(--oro-torta-glow); font-size: 1.35rem; margin-top: 4px; margin-bottom: 4px; font-family: var(--font-serif);">
          ${titulo}
        </h2>
        
        <div style="font-size: 0.92rem; color: #fff; font-weight: bold; margin-bottom: 14px;">
          ${subtitulo}
        </div>

        <div class="card-yermo" style="background: rgba(0,0,0,0.5); border-left: 3px solid var(--oro-torta); text-align: left; padding: 12px; margin-bottom: 16px;">
          <p style="font-size: 0.82rem; color: #e7e5e4; line-height: 1.55; margin: 0;">
            ${detalle}
          </p>
        </div>

        <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 18px; font-size: 1.4rem;">
          <span>👑</span>
          <span>🤖</span>
          <span>🎨</span>
          <span>📜</span>
          <span>🎧</span>
        </div>

        <button id="btn-cerrar-modo-fiesta" class="btn-yermo-primary" style="width: 100%; padding: 12px; font-size: 0.92rem; font-weight: bold; cursor: pointer; border: none; border-radius: var(--radius-sm); background: var(--oro-torta); color: #000;">
          ¡Honor y Fuerza! Que Continúe la Fiesta
        </button>
      </div>
    `;

    modalContainer.classList.remove('hidden');

    modalContent.querySelector('#btn-cerrar-modo-fiesta')?.addEventListener('click', () => {
      modalContainer.classList.add('hidden');
      ModoFiestaEngine.detenerConfetiPixel();
      document.body.classList.remove('modo-fiesta-activo');
      audioProcedural.playClick();
    });
  }
}
