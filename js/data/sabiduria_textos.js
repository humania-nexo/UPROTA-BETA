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
    desc: 'Un ejemplar gastado con notas en los márgenes. Entrega final de Don Chui que revela la fuente de su paz y fortaleza.',
    mensajes: [
      {
        referencia: 'Salmo 23:1-3',
        texto: 'El Señor es mi pastor; nada me faltará. En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará. Confortará mi alma.'
      },
      {
        referencia: 'Salmo 27:1',
        texto: 'El Señor es mi luz y mi salvación; ¿de quién temeré? El Señor es la fortaleza de mi vida; ¿de quién he de atemorizarme?'
      },
      {
        referencia: 'Salmo 46:1-2',
        texto: 'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones. Por tanto, no temeremos, aunque la tierra sea removida.'
      },
      {
        referencia: 'Salmo 91:1-2',
        texto: 'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente. Diré yo al Señor: Esperanza mía, y castillo mío; mi Dios, en quien confiaré.'
      },
      {
        referencia: 'Salmo 121:1-2',
        texto: 'Alzaré mis ojos a los montes; ¿de dónde vendrá mi socorro? Mi socorro viene del Señor, que hizo los cielos y la tierra.'
      },
      {
        referencia: 'Proverbios 3:5-6',
        texto: 'Confía en el Señor con todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.'
      },
      {
        referencia: 'Isaías 40:29-31',
        texto: 'Él da esfuerzo al cansado, y multiplica las fuerzas al que no tiene ningunas... los que esperan en el Señor tendrán nuevas fuerzas; levantarán alas como las águilas.'
      }
    ]
  },

  MANUAL_AGUA_FUEGO: {
    id: 'obj_manual_supervivencia_1',
    nombre: 'Manual I: Agua y Fuego (Copiado a mano)',
    pilar: 'mente',
    puntosPilar: 1,
    icono: '📜',
    npcOrigen: 'Don Chui',
    botonTexto: 'Leído',
    desc: 'Notas prácticas sobre filtrado de sedimentos, hervido y yescas del monte.',
    mensajes: [
      {
        referencia: 'Regla del Fuego Seguro',
        texto: 'El fuego con lupa solo sirve entre 11am y 3pm con sol cenital. Cuida tu yesca seca como si fuera pólvora: si se moja con el rocío, ni mil chispas la prenderán.'
      },
      {
        referencia: 'La Trampa del Agua Clara',
        texto: 'El agua clara no siempre es agua limpia. Filtrar con carbón y arena quita el lodo, pero solo los 5 minutos de borbotones en la olla matan a los parásitos invisibles.'
      }
    ]
  }
};
