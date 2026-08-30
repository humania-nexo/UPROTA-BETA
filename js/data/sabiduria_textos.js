/**
 * Catálogo de Sabiduría Diaria (Textos, Manuales y Versículos de Dominio Público)
 * Vincula: Objetos de Sabiduría Diaria (Don Chui, Biblia, etc.)
 */

export const OBJETOS_SABIDURIA = {
  BIBLIA_DON_CHUI: {
    id: 'obj_biblia_chui',
    nombre: 'Biblia de Don Chui',
    pilar: 'espiritu',
    puntosPilar: 1,
    icono: '📖',
    npcOrigen: 'Don Chui',
    botonTexto: 'Amén',
    desc: 'Un ejemplar gastado con notas a lápiz en los márgenes. Entrega final de Don Chui que revela la fuente de su paz y fortaleza incansable.',
    mensajes: [
      {
        referencia: 'Salmo 23:1-3',
        texto: '«El Señor es mi pastor; nada me faltará. En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará. Confortará mi alma.»',
        notaChui: 'Nota al margen de Don Chui: "Aun en el pedregal más seco, si vas con el Patrón, el alma tiene sombra fresca."'
      },
      {
        referencia: 'Salmo 27:1',
        texto: '«El Señor es mi luz y mi salvación; ¿de quién temeré? El Señor es la fortaleza de mi vida; ¿de quién he de atemorizarme?»',
        notaChui: 'Nota al margen: "Cuando caiga la noche y el viento sacuda las láminas del techo, acuérdate de quién te sostiene en pie."'
      },
      {
        referencia: 'Salmo 46:1-2',
        texto: '«Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones. Por tanto, no temeremos, aunque la tierra sea removida.»',
        notaChui: 'Nota al margen: "Se cayeron los puentes de fierro y las ciudades, pero el suelo donde pisas firme sigue sostenido por Él."'
      },
      {
        referencia: 'Salmo 91:1-2',
        texto: '«El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente. Diré yo al Señor: Esperanza mía, y castillo mío; mi Dios, en quien confiaré.»',
        notaChui: 'Nota al margen: "El mejor refugio no son cuatro tablas con púas; es la paz que nadie en el Yermo te puede arrebatar."'
      },
      {
        referencia: 'Salmo 121:1-2',
        texto: '«Alzaré mis ojos a los montes; ¿de dónde vendrá mi socorro? Mi socorro viene del Señor, que hizo los cielos y la tierra.»',
        notaChui: 'Nota al margen: "Cuando te duelan las piernas de cargar leña, levanta la vista. No estás solo en esta quebrada."'
      },
      {
        referencia: 'Proverbios 3:5-6',
        texto: '«Confía en el Señor con todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.»',
        notaChui: 'Nota al margen: "No te aceleres queriendo arreglarlo todo de golpe. Deja que el Patrón marque la ruta de hoy."'
      },
      {
        referencia: 'Isaías 40:29-31',
        texto: '«Él da esfuerzo al cansado, y multiplica las fuerzas al que no tiene ningunas... los que esperan en el Señor tendrán nuevas fuerzas; levantarán alas como las águilas.»',
        notaChui: 'Nota al margen: "Hasta el buey viejo afloja el paso, pero si te falta aire, el Patrón te renueva el aliento."'
      },
      {
        referencia: 'Josué 1:9',
        texto: '«Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque el Señor tu Dios estará contigo en dondequiera que vayas.»',
        notaChui: 'Nota al margen: "Para salir al monte a buscar comida se necesita valor, pero más valor se necesita para volver a empezar sin quejarse."'
      },
      {
        referencia: 'Lamentaciones 3:22-23',
        texto: '«Por la misericordia del Señor no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.»',
        notaChui: 'Nota al margen: "Ayer tropezaste o se te rompió una vasija. Hoy amaneció sol de nuevo. Cada alba es borrón y cuenta nueva."'
      },
      {
        referencia: 'Mateo 6:34',
        texto: '«Así que, no os afanéis por el día de mañana, porque el día de mañana traerá su afán. Basta a cada día su propio mal.»',
        notaChui: 'Nota al margen: "Una tarea a la vez, Prota. El agua de hoy, la leña de hoy. No cargues la semana entera en la espalda."'
      },
      {
        referencia: 'Filipenses 4:12-13',
        texto: '«Sé vivir humildemente, y sé tener abundancia; en todo y por todo estoy enseñado... Todo lo puedo en Cristo que me fortalece.»',
        notaChui: 'Nota al margen: "Con una lata de frijol o con banquete, el corazón agradecido nunca pasa hambre de verdad."'
      },
      {
        referencia: 'Proverbios 16:3',
        texto: '«Encomienda al Señor tus obras, y tus pensamientos serán afirmados.»',
        notaChui: 'Nota al margen: "Antes de darle el primer martillazo al leño, pide dirección. El trabajo con propósito dura el doble."'
      }
    ]
  },

  MANUAL_AGUA_FUEGO: {
    id: 'obj_manual_supervivencia_1',
    nombre: 'Manual I: Primeros Pasos (Copiado a mano)',
    pilar: 'mente',
    puntosPilar: 1,
    icono: '📜',
    npcOrigen: 'Don Chui',
    botonTexto: 'Leído',
    desc: 'Notas prácticas sobre fuego por fricción, filtrado por capas y hervido a borbotones.',
    mensajes: [
      {
        referencia: 'La Ley del Husillo y la Muesca',
        texto: 'El fuego por fricción no nace de la furia, sino del ritmo parejo. La muesca en V debe entrar un tercio al hoyuelo para juntar polvito negro ardiente sin ahogarlo.'
      },
      {
        referencia: 'La Trampa del Agua Cristalina',
        texto: 'El agua que sale del filtro de arena y carbón parece pura, pero los microbios invisibles siguen vivos. Cinco minutos de borbotones francos en la lata es la única garantía de no enfermar.'
      },
      {
        referencia: 'El Nido de Dos Capas',
        texto: 'Prepara tu ovillo de yesca antes de girar el vástago: paja gruesa por fuera para dar estructura, pelusa de cardo batida al centro para recibir la brasa caliente.'
      },
      {
        referencia: 'Salmuera y Llantén',
        texto: 'Nunca laves una herida de monte con alcohol puro: una cucharadita de sal en agua hervida y un emplasto de llantén machacado cierran la piel limpia.'
      }
    ]
  },

  MANUAL_CONSOLIDACION: {
    id: 'obj_manual_supervivencia_2',
    nombre: 'Manual II: Consolidación (Copiado a mano)',
    pilar: 'mente',
    puntosPilar: 1,
    icono: '📐',
    npcOrigen: 'Don Chui',
    botonTexto: 'Leído',
    desc: 'Técnicas de trampas de vereda, velas de sebo, curado con sal y afilado de cuchillos.',
    mensajes: [
      {
        referencia: 'Veredas y Lazos de Alambre',
        texto: 'Los conejos caminan por túneles de hierba. Cuelga el lazo a cuatro dedos del suelo; el animal empuja con su propio paso y la trampa hace el resto.'
      },
      {
        referencia: 'La Regla de la Carne Curada',
        texto: 'Quita toda la grasa antes de salar la carne. La grasa se enrancia; la fibra magra salada y secada al sol resiste semanas de camino.'
      },
      {
        referencia: 'El Sebo que Alumbra',
        texto: 'El sebo de las presas colado con mecha de torzal de algodón da tres horas de lumbre limpia sin humo negro para trabajar de noche.'
      }
    ]
  }
};

