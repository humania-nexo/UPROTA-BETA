/**
 * Programas y Transmisiones de Radio Yermo
 * Incluye segmentos educativos de conocimiento real y ecos de decisiones.
 */

export const PROGRAMAS_RADIO = [
  {
    id: "prog_001_velas",
    tipo: "conocimiento",
    titulo: "Programa 001: Velas de Aceite Usado",
    tag: "Supervivencia Básica",
    guion: "Buenas noches, Yermo. En nuestro segmento 'No dejes que el Yermo apague tu luz', hoy aprenderemos a hacer velas caseras de larga duración. No necesitas cera: usa una lata limpia o frasco pequeño, vierte aceite vegetal usado o grasa colada. Como mecha, usa una tira de tela de algodón 100% enrollada o cuerda natural. Sujétala con un alambre o clip en el fondo. Una sola lata pequeña te dará hasta 8 horas de luz limpia y calor constante.",
    conocimientoId: "velas_aceite",
    desbloqueo: {
      nombre: "Lámpara de Aceite",
      icono: "🕯️",
      descripcion: "Reduce el consumo de moral durante la noche y otorga luz al refugio."
    }
  },
  {
    id: "prog_002_filtro_agua",
    tipo: "conocimiento",
    titulo: "Programa 002: Filtro de Agua por Gravedad",
    tag: "Agua y Salud",
    guion: "Transmisión de supervivencia. Para purificar agua turbia sin electricidad: corta el fondo de una botella plástica grande. En la boca coloca algodón o tela tupida. Luego añade capas sucesivas en este orden: carbón vegetal triturado (clave para atrapar toxinas y malos olores), una capa de arena fina lavada, luego arena gruesa y finalmente gravilla o piedras pequeñas en la parte superior. Vierte el agua despacio; saldrá cristalina y lista para hervir.",
    conocimientoId: "filtro_agua",
    desbloqueo: {
      nombre: "Filtro de Gravedad",
      icono: "🧪",
      descripcion: "Aumenta la eficiencia de recolección de agua pura de lluvia."
    }
  },
  {
    id: "prog_003_humus",
    tipo: "conocimiento",
    titulo: "Programa 003: Compostaje y Humus en Espacios Pequeños",
    tag: "Autosuficiencia",
    guion: "Atención agricultores del Yermo. La tierra seca puede revivir. En una caja o cubeta con orificios de drenaje, alterna capas de restos secos como cartón sin tinta y hojas con restos húmedos de cocina como cáscaras de verdura y café. Mantén la humedad como una esponja escurrida. En pocas semanas obtendrás tierra fértil llena de nutrientes para cultivar sin depender de fertilizantes químicos.",
    conocimientoId: "humus_lombriz",
    desbloqueo: {
      nombre: "Cisterna con Huerto",
      icono: "🌱",
      descripcion: "Genera provisiones pasivas cada semana si se mantiene el riego."
    }
  },
  {
    id: "noticia_01_polvo_rojo",
    tipo: "lore",
    titulo: "Boletín Meteorológico",
    tag: "Clima del Yermo",
    guion: "Si nos escuchas, aguanta la señal. Viento del norte trae polvo rojo esta semana. Aseguren bien los toldos y tapen las cisternas. No dejen herramientas a la intemperie.",
    conocimientoId: null
  },
  {
    id: "noticia_02_rumor_verdes",
    tipo: "lore",
    titulo: "Observaciones del Sector Este",
    tag: "Naturaleza del Yermo",
    guion: "Exploradores confirman que hacia el este, donde se han visto figuras verdes, la tierra no está muerta. Hay brotes silvestres y humedad en el suelo. Algo distinto está ocurriendo allá afuera.",
    conocimientoId: null
  }
];

export const ECOS_RADIO = {
  eco_lutier_donacion: {
    tipo: "eco",
    titulo: "Reporte de Música Itinerante",
    tag: "Eco de Decisión",
    guion: "Nos llega un reporte curioso desde los sectores del sur: un grupo de sobrevivientes viaja por los caminos llevando música de violines a los refugios aislados. Dicen que empezó con un solo hombre y un puñado de madera donada. La música sigue viva."
  },
  eco_lutier_negado: {
    tipo: "eco",
    titulo: "Aviso de Seguridad en el Camino",
    tag: "Eco de Decisión",
    guion: "Se reporta tranquilidad en los puestos de control del sector. Un anciano que intentaba conseguir material para instrumentos fue visto siguiendo su camino hacia el norte en solitario."
  },
  eco_caminante_agradecido: {
    tipo: "eco",
    titulo: "Llamada de Agradecimiento Anónima",
    tag: "Testimonio del Yermo",
    guion: "Una llamada corta en nuestra frecuencia: una persona dice que hace unos días un refugio generoso le dio comida y agua sin hacer preguntas. Dice que gracias a eso llegó con vida a su destino. Quien lo ayudó, sabe quién es."
  }
};
