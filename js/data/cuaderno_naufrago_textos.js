/**
 * Dataset de Preguntas Reflexivas y Plantillas de Cápsulas de Tiempo
 * Vincula: UPROTA_Cuaderno_Naufrago_y_Capsulas_Tiempo.md + El Hogar
 */

export const DISPARADORES_MICRO_JOURNALING = [
  {
    id: 'disp_01',
    pilar: 'espiritu',
    pregunta: '¿Qué pequeño esfuerzo hiciste hoy que nadie vio, pero que te hizo sentir digno?',
    citaGuia: '«El honor no se mide por aplausos, sino por la mirada limpia al espejo al anochecer.» — Don Chui'
  },
  {
    id: 'disp_02',
    pilar: 'mente',
    pregunta: 'Si hoy tropezaste o diste un paso en falso, ¿con qué palabra de compasión vas a cerrar la noche?',
    citaGuia: '«Setenta veces siete vuelve a levantarse el que camina con propósito.» — Proverbios 24:16'
  },
  {
    id: 'disp_03',
    pilar: 'taller',
    pregunta: '¿Qué leño pusiste hoy en tu fogata para que tu mente no pase frío?',
    citaGuia: '«Una sola tarea bien rematada vale más que diez proyectos empezados con ruido.» — Valeria'
  },
  {
    id: 'disp_04',
    pilar: 'cuerpo',
    pregunta: '¿Cómo respondió tu cuerpo hoy al esfuerzo físico, y qué agradeces de él?',
    citaGuia: '«El cuerpo es la única casa que tenemos en esta tierra; cuídalo con paso parejo.» — Katia'
  },
  {
    id: 'disp_05',
    pilar: 'mente',
    pregunta: '¿Qué peso que no te correspondía cargar lograste soltar hoy para caminar más liviano?',
    citaGuia: '«En el Yermo, cargar rencores es como cargar piedras en la mochila: solo te cansa a ti.» — Elena'
  },
  {
    id: 'disp_06',
    pilar: 'espiritu',
    pregunta: 'Nombra una sola cosa simple por la que hoy valió la pena estar vivo.',
    citaGuia: '«El agua fresca, la sombra del mezquite y el aire limpio no cobran peaje.» — Doña Concha'
  }
];

export const PLANTILLAS_CAPSULAS_TIEMPO = {
  CIMIENTO_66D: {
    tipo: 'cimiento',
    duracionDias: 66,
    titulo: 'Carta al Yo de los 66 Días',
    placeholder: 'Escribe aquí por qué estás encendiendo este Cimiento hoy, qué miedos tienes y qué esperas recordar cuando abras esta carta al Día 66...',
    mensajeAperturaDonChui: '«Mijo, si estás leyendo esto, es porque no aflojaste cuando el lomo dolía. Tómate un respiro y mira el camino andado. El Patrón bendice la constancia silenciosa.»'
  },
  FARO_180D: {
    tipo: 'faro',
    duracionDias: 180,
    titulo: 'Pacto del Faro Semestral',
    placeholder: 'Consigna aquí tus promesas más sagradas para estos seis meses de travesía...',
    mensajeAperturaElena: '«Sierra-Uno reportando en 104.5 MHz. Medio año de disciplina ininterrumpida. Tu refugio ya no es una choza frágil; es una fortaleza que alumbra a todo el valle. Felicitaciones.»'
  }
};
