/**
 * Motor de Reglas y Cálculo de UPROTA
 * Maneja la lógica de refugio, niveles, días de juego, rachas y recursos.
 */

export class GameEngine {
  static calcularNivelRefugio(recursos, cimientos = []) {
    const { tablas = 0, clavos = 0, provisiones = 0, agua = 0 } = recursos;
    const cimientosActivos = cimientos.filter(c => c.integridad > 50).length;

    // Nivel 4: Fortaleza Humilde
    if (tablas >= 50 && clavos >= 30 && cimientosActivos >= 2) {
      return {
        nivel: 4,
        nombre: "Fortaleza Humilde",
        icono: "🏘️",
        descripcion: "Cerca perimetral reforzada, cisterna activa y surcos protegidos. Tu refugio se divisa con respeto en el horizonte del Yermo.",
        clima: "Viento calmo. Las caravanas de paso saben que aquí hay orden."
      };
    }

    // Nivel 3: Refugio Autosuficiente
    if (tablas >= 30 && clavos >= 20 && cimientosActivos >= 1) {
      return {
        nivel: 3,
        nombre: "Refugio Autosuficiente",
        icono: "🏡",
        descripcion: "Pozo de agua operativo y defensas consolidadas. Has forjado hábitos que sostienen tu vida diaria sin tambalear.",
        clima: "Calor seco. La cisterna contiene reservas para varios días."
      };
    }

    // Nivel 2: Refugio Asegurado
    if (tablas >= 20 && clavos >= 10) {
      return {
        nivel: 2,
        nombre: "Refugio Asegurado",
        icono: "🛖",
        descripcion: "Puerta reforzada con cerrojo de clavos, lonas impermeables y radio a baterías sintonizada.",
        clima: "Tarde de polvo. La radio emite voces entre la estática."
      };
    }

    // Nivel 1: Refugio Básico
    if (tablas >= 10) {
      return {
        nivel: 1,
        nombre: "Refugio Básico",
        icono: "⛺",
        descripcion: "Cuatro paredes de tarima levantadas con esfuerzo. El viento entra por las rendijas pero tienes resguardo.",
        clima: "Noche fría del desierto. El fuego te mantiene a salvo."
      };
    }

    // Nivel 0: Punto Cero
    return {
      nivel: 0,
      nombre: "Punto Cero",
      icono: "🏚️",
      descripcion: "Restos de madera y lámina. El punto de partida honesto desde donde todo se puede volver a levantar.",
      clima: "Viento áspero del Yermo. El primer paso empieza hoy."
    };
  }

  static calcularDiasDesdeInicio(fechaInicioISO) {
    if (!fechaInicioISO) return 1;
    const inicio = new Date(fechaInicioISO);
    const ahora = new Date();
    const diferenciaMs = ahora - inicio;
    const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
    return Math.max(1, dias + 1);
  }

  static fechaHoyYMD() {
    const ahora = new Date();
    return ahora.toISOString().split('T')[0];
  }
}
