/**
 * splash_screen.js — Secuencia Cinemática de Apertura y Pantalla de Título
 * SAPIENSIA Clan: "La Travesía en la Cresta" (Fase 1)
 * UPROTA: "La Forja de las 6 Letras & Título" (Fase 2)
 *
 * Desarrollado con Pixel Art de Pix y Audio Procedural a 0 KB de Hertz.
 */

import { audioProcedural } from '../core/audio_procedural.js';

export class SplashScreen {
  static mostrarSiEsNecesario(onCompletado) {
    const contenedor = document.createElement('div');
    contenedor.id = 'splash-container';
    contenedor.className = 'splash-overlay';

    contenedor.innerHTML = `
      <div class="splash-inner">
        <!-- FASE 1: SAPIENSIA CLAN (LA TRAVESÍA EN LA CRESTA) -->
        <div id="splash-fase-clan" class="splash-fase activa">
          <!-- BOTÓN DISCRETO PARA SALTAR (SOLO EN LA INTRO DEL CLAN) -->
          <button id="btn-skip-splash" class="splash-skip-btn" title="Saltar intro">Saltar ➔</button>

          <div class="splash-canvas-wrapper">
            <img id="splash-frame-img" src="assets/sprites/splash_cinematica/splash_frame01_cenital.png" alt="SAPIENSIA Clan" class="splash-frame pixel-art">
          </div>
          <div id="splash-clan-brand" class="splash-brand-text opacity-0">
            <h2 class="splash-title">SAPIENSIA CLAN</h2>
            <p class="splash-subtitle">Sapiens + IA • Taller Independiente</p>
          </div>
        </div>

        <!-- FASE 2: UPROTA (LA FORJA DE LAS 6 LETRAS & PANTALLA DE TÍTULO) -->
        <div id="splash-fase-uprota" class="splash-fase hidden">
          <div class="splash-canvas-wrapper splash-uprota-wrapper">
            <img id="uprota-frame-img" src="assets/sprites/splash_cinematica/uprota_clan_f01.png" alt="UPROTA" class="splash-frame splash-frame-uprota pixel-art">
          </div>
          <div id="uprota-intro-actions" class="uprota-actions-wrapper opacity-0">
            <p class="uprota-tagline">Tu vida real es tu fortaleza</p>
            <button id="btn-entrar-refugio" class="btn-entrar-pulse">
              <span>ENTRAR AL REFUGIO</span>
              <span class="btn-arrow">➔</span>
            </button>
            <div class="uprota-version-tag">v3.8 • SAPIENSIA Clan</div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(contenedor);

    let saltado = false;
    let timerId = null;

    const finalizar = () => {
      if (saltado) return;
      saltado = true;
      if (timerId) clearTimeout(timerId);

      contenedor.classList.add('fade-out');
      setTimeout(() => {
        if (contenedor.parentNode) {
          contenedor.parentNode.removeChild(contenedor);
        }
        if (typeof onCompletado === 'function') {
          onCompletado();
        }
      }, 400);
    };

    // Saltar con el botón o teclado (Escape / Espacio)
    const btnSkip = contenedor.querySelector('#btn-skip-splash');
    btnSkip.addEventListener('click', (e) => {
      e.stopPropagation();
      finalizar();
    });

    const keyListener = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        window.removeEventListener('keydown', keyListener);
        finalizar();
      }
    };
    window.addEventListener('keydown', keyListener);

    // --- SECUENCIA DE ANIMACIÓN ---
    const ejecutarSecuencia = async () => {
      // Disparar audio procedural de Hertz si está habilitado
      try {
        audioProcedural.playSplashScreenSapiensia();
      } catch (err) {
        console.warn('Audio pendiente de interacción');
      }

      const imgClan = contenedor.querySelector('#splash-frame-img');
      const brandClan = contenedor.querySelector('#splash-clan-brand');

      // Frames Fase 1 (SAPIENSIA Clan - 9 cuadros)
      const framesClan = [
        { src: 'assets/sprites/splash_cinematica/splash_frame01_cenital.png', t: 0 },
        { src: 'assets/sprites/splash_cinematica/splash_frame02_cenital_remando.png', t: 300 },
        { src: 'assets/sprites/splash_cinematica/splash_frame03_giro_orbital_45.png', t: 600 },
        { src: 'assets/sprites/splash_cinematica/splash_frame04_perfil_tormenta.png', t: 900 },
        { src: 'assets/sprites/splash_cinematica/splash_frame05_cresta_subida.png', t: 1200 },
        { src: 'assets/sprites/splash_cinematica/splash_frame06_cresta_climax.png', t: 1500 },
        { src: 'assets/sprites/splash_cinematica/splash_frame07_impact_flash.png', t: 1800 },
        { src: 'assets/sprites/splash_cinematica/splash_frame08_freeze_shift.png', t: 1900 },
        { src: 'assets/sprites/splash_cinematica/splash_frame09_isotipo_flat.png', t: 2000 }
      ];

      framesClan.forEach(f => {
        setTimeout(() => {
          if (!saltado && imgClan) {
            imgClan.src = f.src;
          }
        }, f.t);
      });

      // Mostrar texto de SAPIENSIA Clan en el congelamiento Flat Design
      setTimeout(() => {
        if (!saltado && brandClan) {
          brandClan.classList.remove('opacity-0');
          brandClan.classList.add('fade-in');
        }
      }, 2000);

      // Transición a Fase 2 (UPROTA - 2.8s)
      setTimeout(() => {
        if (saltado) return;

        const faseClan = contenedor.querySelector('#splash-fase-clan');
        const faseUprota = contenedor.querySelector('#splash-fase-uprota');

        if (faseClan && faseUprota) {
          faseClan.classList.add('fade-out');
          setTimeout(() => {
            faseClan.classList.add('hidden');
            faseUprota.classList.remove('hidden');
            faseUprota.classList.add('fade-in');

            // Disparar Audio de la Forja de UPROTA
            try {
              audioProcedural.playIntroForjaUprota();
            } catch (e) {}

            // Frames Fase 2 (UPROTA - 10 cuadros)
            const imgUprota = contenedor.querySelector('#uprota-frame-img');
            const actionsUprota = contenedor.querySelector('#uprota-intro-actions');

            const framesUprota = [
              { src: 'assets/sprites/splash_cinematica/uprota_clan_f01.png', t: 0 },
              { src: 'assets/sprites/splash_cinematica/uprota_clan_f02.png', t: 120 },
              { src: 'assets/sprites/splash_cinematica/uprota_clan_f03.png', t: 240 },
              { src: 'assets/sprites/splash_cinematica/uprota_clan_f04.png', t: 360 },
              { src: 'assets/sprites/splash_cinematica/uprota_clan_f05.png', t: 500 }, // Impacto de unión
              { src: 'assets/sprites/splash_cinematica/uprota_clan_f06.png', t: 800 }, // Saludo
              { src: 'assets/sprites/splash_cinematica/uprota_clan_f07.png', t: 1100 },
              { src: 'assets/sprites/splash_cinematica/uprota_clan_f08.png', t: 1300 }, // Dispersión
              { src: 'assets/sprites/splash_cinematica/uprota_clan_f09.png', t: 1450 },
              { src: 'assets/sprites/splash_cinematica/uprota_clan_f10.png', t: 1600 }  // Título Limpio
            ];

            framesUprota.forEach(fu => {
              setTimeout(() => {
                if (!saltado && imgUprota) {
                  imgUprota.src = fu.src;
                }
              }, fu.t);
            });

            // Revelar botón interactivo de entrada
            setTimeout(() => {
              if (!saltado && actionsUprota) {
                actionsUprota.classList.remove('opacity-0');
                actionsUprota.classList.add('fade-in');

                const btnEntrar = contenedor.querySelector('#btn-entrar-refugio');
                if (btnEntrar) {
                  btnEntrar.addEventListener('click', () => {
                    audioProcedural.playTone(523.25, 'triangle', 0.15, 0.2);
                    finalizar();
                  });
                }
              }
            }, 1700);

          }, 300);
        }
      }, 2900);
    };

    ejecutarSecuencia();
  }
}
