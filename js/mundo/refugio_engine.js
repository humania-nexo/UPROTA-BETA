/**
 * Motor del Refugio y Bioenergía (Documento B - Secciones 2.2, 2.3, 12)
 * Bioenergía a Pedal/Manivela: El esfuerzo físico real carga la batería del refugio.
 * Restauración de herramientas (30% -> 80% con vinagre -> 100% con electrólisis).
 */

import { NIVELES_REFUGIO } from '../data/niveles_refugio.js';

export class RefugioMundoEngine {
  /**
   * Carga la batería del refugio cuando el jugador cumple una Senda de Cuerpo (o giro de manivela Taller).
   */
  static recargarBioenergia(estadoBioenergia, incremento = 35) {
    const nuevaCarga = Math.min(100, estadoBioenergia.nivelCarga + incremento);
    return {
      ...estadoBioenergia,
      nivelCarga: nuevaCarga
    };
  }

  /**
   * Valida si el refugio puede subir al siguiente nivel según sus recursos acumulados.
   */
  static puedeSubirNivel(nivelActual, recursos) {
    const sigNivel = nivelActual + 1;
    if (sigNivel >= NIVELES_REFUGIO.length) return { posible: false, razon: 'Nivel máximo alcanzado.' };

    const req = NIVELES_REFUGIO[sigNivel].requisitos;
    const falta = [];

    if (req.tablas && (recursos.tablas || 0) < req.tablas) {
      falta.push(`${req.tablas - (recursos.tablas || 0)} Tablas`);
    }
    if (req.clavos && (recursos.clavos || 0) < req.clavos) {
      falta.push(`${req.clavos - (recursos.clavos || 0)} Clavos`);
    }
    if (req.provisiones && (recursos.provisiones || 0) < req.provisiones) {
      falta.push(`${req.provisiones - (recursos.provisiones || 0)} Provisiones`);
    }
    if (req.aguaLitros && (recursos.aguaLitros || 0) < req.aguaLitros) {
      falta.push(`${req.aguaLitros - (recursos.aguaLitros || 0)}L Agua`);
    }

    return {
      posible: falta.length === 0,
      siguienteInfo: NIVELES_REFUGIO[sigNivel],
      faltantes: falta
    };
  }
}

export class DioramaEngine {
  static render(estado) {
    const nivel = estado.nivelRefugio || 0;
    const modulos = estado.modulosRefugioConstruidos || [];
    const bioenergia = estado.bioenergia || {};
    const radioActiva = estado.comunicacion?.fase >= 1;

    // Sprite de estructura base según nivel
    const spritesBase = [
      'assets/sprites/refugio/refugio_lvl0_punto_cero.png',
      'assets/sprites/refugio/refugio_lvl1_cajones.png',
      'assets/sprites/refugio/refugio_lvl2_techo.png',
      'assets/sprites/refugio/refugio_lvl3_huerto.png',
      'assets/sprites/refugio/refugio_lvl4_taller.png',
      'assets/sprites/refugio/refugio_lvl5_fortaleza.png'
    ];
    const spriteBase = spritesBase[Math.min(spritesBase.length - 1, nivel)];

    // Módulos activos
    const tieneFogon = nivel >= 1 || modulos.includes('fogon');
    const tieneHuerto = nivel >= 3 || modulos.includes('huerto_cajones');
    const tieneGallinero = nivel >= 4 || modulos.includes('gallinero_vertical');
    const tieneTaller = nivel >= 4 || modulos.includes('mesa_taller');
    const tieneEnergia = bioenergia.biciGeneradorConstruido || nivel >= 5 || modulos.includes('bici_generador');
    const tieneAntena = radioActiva || nivel >= 2 || modulos.includes('antena_radio');

    return `
      <div class="diorama-stage-container">
        <!-- CAPA 1: ESTRUCTURA BASE -->
        <img src="${spriteBase}" alt="Estructura Base Refugio" class="diorama-layer diorama-base-layer">

        <!-- SLOT SUPERIOR: ANTENA DE TELECOMUNICACIONES -->
        ${tieneAntena ? `
          <div class="diorama-slot slot-antena" title="Antena de Radio Onda Corta (104.5 MHz)">
            <img src="assets/sprites/refugio/modulo_antena_mutil.png" alt="Antena" class="diorama-sprite-modulo sprite-antena">
          </div>
        ` : ''}

        <!-- SLOT IZQUIERDO: GALLINERO VERTICAL CON GALLINA ANIMADA -->
        ${tieneGallinero ? `
          <div class="diorama-slot slot-gallinero" title="Gallinero Vertical">
            <img src="assets/sprites/refugio/modulo_gallinero.png" alt="Gallinero" class="diorama-sprite-modulo">
            <div class="gallina-animada-frame" title="Gallina ponedora"></div>
          </div>
        ` : ''}

        <!-- SLOT INFERIOR IZQUIERDO: HUERTO EN CAJONES -->
        ${tieneHuerto ? `
          <div class="diorama-slot slot-huerto" title="Cajones de Cultivo y Siembra">
            <img src="assets/sprites/refugio/modulo_huerto_cajones.png" alt="Huerto" class="diorama-sprite-modulo">
          </div>
        ` : ''}

        <!-- SLOT DERECHO: MESA DE TRABAJO Y TALLER -->
        ${tieneTaller ? `
          <div class="diorama-slot slot-taller" title="Mesa de Carpintería y Herramientas">
            <img src="assets/sprites/refugio/modulo_mesa_taller.png" alt="Taller" class="diorama-sprite-modulo">
          </div>
        ` : ''}

        <!-- SLOT MEDIO DERECHO: BICI-GENERADOR -->
        ${tieneEnergia ? `
          <div class="diorama-slot slot-energia" title="Bici-Generador y Acumulador">
            <img src="assets/sprites/refugio/modulo_bici_generador.png" alt="Bici-Generador" class="diorama-sprite-modulo ${bioenergia.nivelCarga > 0 ? 'energia-activa' : ''}">
          </div>
        ` : ''}

        <!-- SLOT FRONTAL: FOGÓN CON LLAMA ANIMADA -->
        ${tieneFogon ? `
          <div class="diorama-slot slot-fogon" title="Fogón de Supervivencia">
            <img src="assets/sprites/refugio/modulo_fogon_piedras.png" alt="Fogón" class="diorama-sprite-modulo">
            <div class="fuego-animado-frame" title="Llama encendida"></div>
          </div>
        ` : ''}
      </div>
    `;
  }
}

