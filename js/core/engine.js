/**
 * Motor de Reglas y Cálculo de UPROTA
 * Maneja la progresión de los 10 Niveles de Refugio y límites de slots (Make to Win).
 */

export class GameEngine {
  // Catálogo completo de los 10 Niveles de Refugio
  static NIVELES_REFUGIO = [
    {
      nivel: 0,
      nombre: "Punto Cero",
      icono: "🏚️",
      requisitoTexto: "Inicio",
      requisitos: { tablas: 0, clavos: 0, provisiones: 0, agua: 0 },
      maxSendas: 3,
      maxFaros: 1,
      descripcion: "Cuatro tablas y lámina oxidada. El punto honesto desde donde todo se reconstruye con disciplina.",
      clima: "Viento áspero del Yermo. El primer paso empieza hoy."
    },
    {
      nivel: 1,
      nombre: "Refugio Básico",
      icono: "⛺",
      requisitoTexto: "10 Tablas + 5 Provisiones",
      requisitos: { tablas: 10, provisiones: 5 },
      maxSendas: 5,
      maxFaros: 1,
      descripcion: "Paredes de madera apuntaladas. Tienes un techo seguro donde recuperar el aliento tras patrullar.",
      clima: "Noches frías en el desierto. La fogata arde con fuerza."
    },
    {
      nivel: 2,
      nombre: "Refugio Asegurado",
      icono: "🛖",
      requisitoTexto: "25 Tablas + 10 Clavos + 10 Provisiones",
      requisitos: { tablas: 25, clavos: 10, provisiones: 10 },
      maxSendas: 7,
      maxFaros: 2,
      descripcion: "Puerta reforzada con cerrojo de clavos y antena de radio sintonizada. El Yermo sabe que estás aquí.",
      clima: "Polvo rojo en el horizonte. La radio acompaña el silencio."
    },
    {
      nivel: 3,
      nombre: "Refugio Autosuficiente",
      icono: "🏡",
      requisitoTexto: "45 Tablas + 25 Clavos + 20 Agua",
      requisitos: { tablas: 45, clavos: 25, agua: 20 },
      maxSendas: 9,
      maxFaros: 2,
      descripcion: "Pozo de agua operativo y defensas consolidadas. Tus hábitos forjados sostienen tu vida diaria.",
      clima: "Calor seco. La cisterna contiene reservas confiables."
    },
    {
      nivel: 4,
      nombre: "Fortaleza Humilde",
      icono: "🏘️",
      requisitoTexto: "70 Tablas + 40 Clavos + 30 Provisiones",
      requisitos: { tablas: 70, clavos: 40, provisiones: 30 },
      maxSendas: 11,
      maxFaros: 3,
      descripcion: "Cerca perimetral de alambre y huerto protegido. Las caravanas miran tu refugio con respeto.",
      clima: "Viento calmo. La estabilidad empieza a dar frutos."
    },
    {
      nivel: 5,
      nombre: "Puesto de Intercambio",
      icono: "🏕️",
      requisitoTexto: "100 Tablas + 60 Clavos + 50 Provisiones + 40 Agua",
      requisitos: { tablas: 100, clavos: 60, provisiones: 50, agua: 40 },
      maxSendas: 13,
      maxFaros: 3,
      descripcion: "Un punto de encuentro seguro en el mapa del Yermo. Viajeros y aliados se acercan a comerciar.",
      clima: "Días templados. La comunidad comienza a florecer."
    },
    {
      nivel: 6,
      nombre: "Bastión Protegido",
      icono: "🏰",
      requisitoTexto: "140 Tablas + 80 Clavos + 70 Provisiones + 60 Agua",
      requisitos: { tablas: 140, clavos: 80, provisiones: 70, agua: 60 },
      maxSendas: 15,
      maxFaros: 4,
      descripcion: "Muros dobles de madera noble y metal recuperado. Nada penetra tus defensas sin tu permiso.",
      clima: "Vientos fuertes. Tu estructura resiste sin crujir."
    },
    {
      nivel: 7,
      nombre: "Comunidad del Oasis",
      icono: "🌴",
      requisitoTexto: "190 Tablas + 110 Clavos + 100 Provisiones + 80 Agua",
      requisitos: { tablas: 190, clavos: 110, provisiones: 100, agua: 80 },
      maxSendas: 17,
      maxFaros: 4,
      descripcion: "Sistemas de riego cerrados y suelo fértil. Has transformado un desierto en un oasis de vida.",
      clima: "Lluvias regulares. La tierra respira vida nueva."
    },
    {
      nivel: 8,
      nombre: "Santuario del Yermo",
      icono: "🏛️",
      requisitoTexto: "250 Tablas + 150 Clavos + 130 Provisiones + 100 Agua",
      requisitos: { tablas: 250, clavos: 150, provisiones: 130, agua: 100 },
      maxSendas: 19,
      maxFaros: 5,
      descripcion: "Un símbolo de civilización renacida. El conocimiento y la música resuenan en todo el valle.",
      clima: "Cielo despejado. El Yermo ya no parece tan hostil."
    },
    {
      nivel: 9,
      nombre: "Faro de Esperanza",
      icono: "🌟",
      requisitoTexto: "320 Tablas + 200 Clavos + 170 Provisiones + 130 Agua",
      requisitos: { tablas: 320, clavos: 200, provisiones: 170, agua: 130 },
      maxSendas: 21,
      maxFaros: 5,
      descripcion: "Una torre iluminada que guía a los perdidos en la noche. Tu disciplina es leyenda en la región.",
      clima: "Viento sereno. Tu luz se divisa a kilómetros."
    },
    {
      nivel: 10,
      nombre: "La Ciudadela Libre",
      icono: "👑",
      requisitoTexto: "400 Tablas + 260 Clavos + 220 Provisiones + 160 Agua",
      requisitos: { tablas: 400, clavos: 260, provisiones: 220, agua: 160 },
      maxSendas: 23,
      maxFaros: 6,
      descripcion: "La cumbre de la resiliencia humana. Un hogar inquebrantable construido con cada plato lavado, cada carrera y cada día ganado.",
      clima: "Paz absoluta. Eres el auténtico Prota de tu historia."
    }
  ];

  static calcularNivelRefugio(recursos = {}) {
    const { tablas = 0, clavos = 0, provisiones = 0, agua = 0 } = recursos;

    let nivelAlcanzado = this.NIVELES_REFUGIO[0];

    for (let i = this.NIVELES_REFUGIO.length - 1; i >= 0; i--) {
      const n = this.NIVELES_REFUGIO[i];
      const req = n.requisitos;

      const cumpleTablas = tablas >= (req.tablas || 0);
      const cumpleClavos = clavos >= (req.clavos || 0);
      const cumpleProv = provisiones >= (req.provisiones || 0);
      const cumpleAgua = agua >= (req.agua || 0);

      if (cumpleTablas && cumpleClavos && cumpleProv && cumpleAgua) {
        nivelAlcanzado = n;
        break;
      }
    }

    const siguienteNivel = this.NIVELES_REFUGIO[nivelAlcanzado.nivel + 1] || null;

    return {
      ...nivelAlcanzado,
      siguienteNivel
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
