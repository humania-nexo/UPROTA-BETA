/**
 * Eventos del Yermo (Tier 0 y 1)
 * Diseñados para añadir narrativa sin castigos destructivos.
 */

export const EVENTOS_YERMO = [
  {
    id: "evento_zorro_01",
    tier: 0,
    nombre: "Noche del Zorro",
    tipo: "micro",
    icono: "🦊",
    descripcion: "Un zorro del Yermo merodeó el perímetro buscando comida cerca de tus provisiones.",
    condicion: (estado) => estado.recursos.provisiones > 0,
    opciones: [
      {
        texto: "Ahuyentarlo con antorcha",
        costo: { moral: 1 },
        recompensa: { tablas: 1 },
        resultado: "El zorro huyó hacia las dunas. Encontraste un trozo de madera seca cerca de su escondite."
      },
      {
        texto: "Dejarle una pequeña ración",
        costo: { provisiones: 1 },
        recompensa: { moral: 2 },
        resultado: "El animal comió en silencio y se marchó en paz. Tu refugio se siente un poco más sereno."
      }
    ]
  },
  {
    id: "evento_lluvia_01",
    tier: 0,
    nombre: "Lluvia Bendita",
    tipo: "micro",
    icono: "🌧️",
    descripcion: "Una llovizna inesperada rompe el calor abrasador del Yermo.",
    condicion: () => true,
    opciones: [
      {
        texto: "Extender lonas de recolección",
        costo: {},
        recompensa: { agua: 4, moral: 1 },
        resultado: "Lograste captar agua pura en tus recipientes. La cisterna respira."
      }
    ]
  },
  {
    id: "evento_saqueador_01",
    tier: 1,
    nombre: "El Caminante Hambriento",
    tipo: "dilema",
    icono: "🎒",
    descripcion: "Un hombre exhausto con ropas raídas se detiene a la entrada de tu refugio. Pide un trago de agua y algo de comer.",
    condicion: (estado) => estado.recursos.provisiones >= 2 && estado.recursos.agua >= 1,
    opciones: [
      {
        texto: "Compartir provisiones (1 Comida, 1 Agua)",
        costo: { provisiones: 1, agua: 1 },
        recompensa: { clavos: 3, moral: 2 },
        ecoId: "eco_caminante_agradecido",
        resultado: "El hombre come con gratitud. A cambio, te entrega un puñado de clavos que rescató en el camino antes de seguir."
      },
      {
        texto: "Negar ayuda amablemente",
        costo: {},
        recompensa: {},
        resultado: "El hombre asiente con tristeza y sigue su rumbo. 'Entiendo, amigo. Tiempos duros'."
      }
    ]
  },
  {
    id: "evento_anciano_lutier_01",
    tier: 1,
    nombre: "El Anciano y la Madera",
    tipo: "dilema",
    icono: "🎻",
    descripcion: "Llega un anciano con una bolsa vacía. Pide una donación de 5 tablas de madera para reconstruir instrumentos y reunir a músicos del Yermo.",
    condicion: (estado) => estado.recursos.tablas >= 5,
    opciones: [
      {
        texto: "Donar 5 tablas de madera",
        costo: { tablas: 5 },
        recompensa: { moral: 4 },
        ecoId: "eco_lutier_donacion",
        resultado: "El anciano sonríe con ojos brillantes: 'Te prometo que esto volverá a sonar'. Guarda la madera y parte hacia el este."
      },
      {
        texto: "Guardar la madera para tus defensas",
        costo: {},
        recompensa: {},
        ecoId: "eco_lutier_negado",
        resultado: "El anciano suspira suavemente: 'Cada quien cuida lo suyo primero, mijo'. Se despide respetuosamente."
      }
    ]
  }
];
