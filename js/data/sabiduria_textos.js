/**
 * Catálogo Maestro de Objetos de Sabiduría Universal (Dominio Público)
 * 10 Grandes Obras de Filosofía, Espiritualidad y Estrategia Humana
 * Regla: Máximo 2 libros activos simultáneamente (+1 Mente o +1 Espíritu por libro).
 */

export const OBJETOS_SABIDURIA = {
  // 1. LA SANTA BIBLIA (ESPÍRITU)
  BIBLIA: {
    id: 'obj_biblia',
    nombre: 'La Santa Biblia',
    autor: 'Textos Sagrados',
    pilar: 'espiritu',
    puntosPilar: 1,
    icono: '📖',
    botonTexto: 'Amén',
    desc: 'Salmos de amparo, proverbios de prudencia y evangelios de amor y consuelo para fortalecer el espíritu humano.',
    mensajes: [
      {
        referencia: 'Salmo 23:1-3',
        texto: '«El Señor es mi pastor; nada me faltará. En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará. Confortará mi alma.»'
      },
      {
        referencia: 'Proverbios 24:16',
        texto: '«Porque siete veces cae el justo, y vuelve a levantarse; mas los impíos caerán en el mal.»'
      },
      {
        referencia: 'Salmo 91:1-2',
        texto: '«El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente. Diré yo al Señor: Esperanza mía, y castillo mío; mi Dios, en quien confiaré.»'
      },
      {
        referencia: 'Mateo 6:34',
        texto: '«Así que no os afanéis por el día de mañana, porque el día de mañana traerá su afán. Basta a cada día su propio mal.»'
      },
      {
        referencia: 'Isaías 40:29',
        texto: '«Él da esfuerzo al cansado, y multiplica las fuerzas al que no tiene ningunas.»'
      },
      {
        referencia: 'Proverbios 16:32',
        texto: '«Mejor es el que tarda en airarse que el fuerte; y el que se enseñorea de su espíritu, que el que toma una ciudad.»'
      },
      {
        referencia: 'Filipenses 4:13',
        texto: '«Todo lo puedo en Cristo que me fortalece.»'
      }
    ]
  },

  // 2. MEDITACIONES — MARCO AURELIO (ESPÍRITU)
  MEDITACIONES_MARCO_AURELIO: {
    id: 'obj_meditaciones_marco_aurelio',
    nombre: 'Meditaciones',
    autor: 'Marco Aurelio',
    pilar: 'espiritu',
    puntosPilar: 1,
    icono: '🏛️',
    botonTexto: 'Asimilado',
    desc: 'Diario íntimo del emperador filósofo sobre la fortaleza interior, el deber, la impermanencia y la serenidad ante la adversidad.',
    mensajes: [
      {
        referencia: 'Libro IV, 3',
        texto: '«En ninguna parte puede hallar el hombre un retiro más apacible y tranquilo que en la intimidad de su propia alma.»'
      },
      {
        referencia: 'Libro VIII, 47',
        texto: '«Si te afliges por una causa externa, no es ella lo que te perturba, sino tu propio juicio sobre ella; y borrar ese juicio está en tu poder.»'
      },
      {
        referencia: 'Libro II, 1',
        texto: '«Al amanecer, dite a ti mismo: Hoy me toparé con el indiscreto, el ingrato, el insolente. Ninguno puede dañarme porque conozco la naturaleza del bien.»'
      },
      {
        referencia: 'Libro VII, 18',
        texto: '«¿El pepino es amargo? Tíralo. ¿Hay zarzas en el camino? Desvíate. Basta eso. No añadas: ¿Por qué habrán sido creadas estas cosas en el mundo?»'
      },
      {
        referencia: 'Libro V, 16',
        texto: '«El alma se tiñe del color de sus propios pensamientos.»'
      }
    ]
  },

  // 3. ENQUIRIDIÓN / MANUAL DE VIDA — EPICTETO (MENTE)
  ENQUIRIDION_EPICTETO: {
    id: 'obj_enquiridion_epicteto',
    nombre: 'Manual de Vida (Enquiridión)',
    autor: 'Epicteto',
    pilar: 'mente',
    puntosPilar: 1,
    icono: '📜',
    botonTexto: 'Entendido',
    desc: 'La brújula estoica de la dicotomía del control: distinguir con lucidez quirúrgica lo que depende de ti de lo que escapa a tu dominio.',
    mensajes: [
      {
        referencia: 'Capítulo I',
        texto: '«De las cosas que existen, unas dependen de nosotros y otras no. De nosotros dependen el juicio, el impulso, el deseo y la aversión; en una palabra, nuestros propios actos.»'
      },
      {
        referencia: 'Capítulo V',
        texto: '«No son las cosas las que atormentan a los hombres, sino los principios y opiniones que los hombres se forman acerca de las cosas.»'
      },
      {
        referencia: 'Capítulo VIII',
        texto: '«No pretendas que las cosas ocurran como tú deseas; desea más bien que se produzcan tal como se producen, y vivirás en paz.»'
      },
      {
        referencia: 'Capítulo XII',
        texto: '«Si quieres progresar, soporta con paciencia que te tomen por ignorante o insensato respecto a las cosas externas.»'
      }
    ]
  },

  // 4. CARTAS A LUCILIO — SÉNECA (ESPÍRITU)
  CARTAS_LUCILIO_SENECA: {
    id: 'obj_cartas_lucilio_seneca',
    nombre: 'Cartas a Lucilio',
    autor: 'Lucio Anneo Séneca',
    pilar: 'espiritu',
    puntosPilar: 1,
    icono: '✉️',
    botonTexto: 'Interiorizado',
    desc: 'Consejos epistolares sobre el uso consciente del tiempo, la amistad sincera, la moderación y la preparación serena ante la fatiga.',
    mensajes: [
      {
        referencia: 'Carta I',
        texto: '«Reclama tu derecho sobre ti mismo; junta y conserva el tiempo que hasta ahora te quitaban, te sustraían o se te escapaba.»'
      },
      {
        referencia: 'Carta XIII',
        texto: '«Hay más cosas que nos asustan que cosas que nos hieren; y sufrimos más a menudo por nuestra imaginación que por la realidad.»'
      },
      {
        referencia: 'Carta II',
        texto: '«No es pobre el que tiene poco, sino el que codicia más. El alma que se contenta con lo necesario es verdaderamente rica.»'
      },
      {
        referencia: 'Carta LXXI',
        texto: '«No hay viento favorable para el que no sabe a qué puerto se encamina.»'
      }
    ]
  },

  // 5. EL ARTE DE LA GUERRA — SUN TZU (MENTE)
  ARTE_GUERRA_SUN_TZU: {
    id: 'obj_arte_guerra_sun_tzu',
    nombre: 'El Arte de la Guerra',
    autor: 'Sun Tzu',
    pilar: 'mente',
    puntosPilar: 1,
    icono: '⚔️',
    botonTexto: 'Comprendido',
    desc: 'Tratado de estrategia, anticipación, economía de fuerzas y victoria mediante la disciplina mental y el silencio.',
    mensajes: [
      {
        referencia: 'Capítulo III: Estrategia',
        texto: '«El supremo arte de la guerra consiste en someter al enemigo sin necesidad de combatir.»'
      },
      {
        referencia: 'Capítulo III: Conocimiento',
        texto: '«Si conoces al enemigo y te conoces a ti mismo, no debes temer el resultado de cien batallas.»'
      },
      {
        referencia: 'Capítulo VI: Anticipación',
        texto: '«El que llega primero al terreno y aguarda, estará descansado; el que llega tarde y se precipita a la lucha, estará exhausto.»'
      },
      {
        referencia: 'Capítulo VII: Maniobra',
        texto: '«Sé rápido como el viento, silencioso como el bosque, agresivo como el fuego e inconmovible como una montaña.»'
      }
    ]
  },

  // 6. TAO TE CHING — LAO TSÉ (ESPÍRITU)
  TAO_TE_CHING_LAO_TSE: {
    id: 'obj_tao_te_ching',
    nombre: 'Tao Te Ching',
    autor: 'Lao Tsé',
    pilar: 'espiritu',
    puntosPilar: 1,
    icono: '☯️',
    botonTexto: 'En Armonía',
    desc: 'La sabiduría oriental del flujo natural, la no-resistencia (Wu Wei), la humildad del agua y la fuerza de lo sutil.',
    mensajes: [
      {
        referencia: 'Capítulo 8: El Agua',
        texto: '«La suprema bondad es como el agua. El agua beneficia a todas las cosas sin competir con ellas, y se acomoda en los lugares que los hombres desprecian.»'
      },
      {
        referencia: 'Capítulo 64: El Comienzo',
        texto: '«Un árbol tan grueso que apenas puede abrazarse nace de un brote diminuto. Un viaje de mil leguas comienza con un solo paso.»'
      },
      {
        referencia: 'Capítulo 33: Maestría',
        texto: '«Conocer a los demás es sabiduría; conocerse a uno mismo es iluminación. Vencer a otros requiere fuerza; vencerse a uno mismo requiere verdadero poder.»'
      },
      {
        referencia: 'Capítulo 76: Flexibilidad',
        texto: '«Al nacer, el hombre es flexible y suave; al morir, es rígido y duro. Lo flexible y suave pertenece a la vida; lo rígido y duro pertenece a la muerte.»'
      }
    ]
  },

  // 7. EL LIBRO DE LOS CINCO ANILLOS — MIYAMOTO MUSASHI (MENTE)
  CINCO_ANILLOS_MUSASHI: {
    id: 'obj_cinco_anillos_musashi',
    nombre: 'El Libro de los Cinco Anillos',
    autor: 'Miyamoto Musashi',
    pilar: 'mente',
    puntosPilar: 1,
    icono: '🗡️',
    botonTexto: 'Enfocado',
    desc: 'Tratado del legendario espadachín japonés sobre la atención inquebrantable, la precisión técnica, el ritmo y la ausencia de dudas.',
    mensajes: [
      {
        referencia: 'Libro de la Tierra',
        texto: '«No hagas nada que no sea útil. Observa diez mil cosas y conócete a ti mismo a través de tu disciplina diaria.»'
      },
      {
        referencia: 'Libro del Agua',
        texto: '«Mantén tu mente en calma tanto en la tranquilidad como en el fragor de la batalla. Ni apresures tu paso ni te quedes rezagado.»'
      },
      {
        referencia: 'Libro del Fuego',
        texto: '«Percibe aquello que no puede verse con los ojos; comprende el ritmo de los acontecimientos antes de que se manifiesten.»'
      },
      {
        referencia: 'Libro del Vacío',
        texto: '«Pule tu corazón y tu mente día a día; cuando no haya rastro de confusión ni vanidad, tu acción será directa y natural.»'
      }
    ]
  },

  // 8. HAGAKURE: EL CAMINO DEL SAMURÁI — YAMAMOTO TSUNETOMO (ESPÍRITU)
  HAGAKURE_TSUNETOMO: {
    id: 'obj_hagakure',
    nombre: 'Hagakure (El Camino del Samurái)',
    autor: 'Yamamoto Tsunetomo',
    pilar: 'espiritu',
    puntosPilar: 1,
    icono: '🌸',
    botonTexto: 'Con Honor',
    desc: 'Aforismos sobre la rectitud moral, el deber incondicional, la lealtad y la claridad mental de vivir cada jornada con entrega total.',
    mensajes: [
      {
        referencia: 'Capítulo I',
        texto: '«La rectitud se forja en los detalles cotidianos. No hay nada fuera del momento presente; quien vive con plena entrega ahora, cumple con su deber.»'
      },
      {
        referencia: 'Capítulo II',
        texto: '«La victoria sobre uno mismo es el fundamento de toda excelencia. Si superas tus flaquezas de ayer, hoy serás un hombre más firme.»'
      },
      {
        referencia: 'Capítulo V',
        texto: '«La discreción en el hablar y la sobriedad en el porte son los escudos que protegen la dignidad en tiempos difíciles.»'
      }
    ]
  },

  // 9. EL ARTE DE LA PRUDENCIA — BALTASAR GRACIÁN (MENTE)
  ARTE_PRUDENCIA_GRACIAN: {
    id: 'obj_arte_prudencia_gracian',
    nombre: 'El Arte de la Prudencia',
    autor: 'Baltasar Gracián',
    pilar: 'mente',
    puntosPilar: 1,
    icono: '🎭',
    botonTexto: 'Prudente',
    desc: '300 aforismos de agudeza, temple, discreción, discernimiento de caracteres y sabiduría práctica para sortear las dificultades del mundo.',
    mensajes: [
      {
        referencia: 'Aforismo 2',
        texto: '«Carácter y entendimiento: son los dos polos de la excelencia humana; uno sin el otro es solo media felicidad. No basta saber, es preciso saber obrar con temple.»'
      },
      {
        referencia: 'Aforismo 3',
        texto: '«Llevar las cosas con suspensión: el misterio en las resoluciones mantiene el respeto ajeno. La sencillez abierta en todo momento expone tu refugio a miradas indiscretas.»'
      },
      {
        referencia: 'Aforismo 48',
        texto: '«Hombre con fondo: tanto tienes de persona cuanto tienes de profundidad. Lo superficial se agota en el primer golpe; lo profundo sostiene los temporales.»'
      },
      {
        referencia: 'Aforismo 130',
        texto: '«Hacer y hacer parecer: las cosas no pasan por lo que son, sino por lo que parecen. Valer y saber mostrarlo es valer dos veces.»'
      }
    ]
  },

  // 10. HUMANO, DEMASIADO HUMANO — FRIEDRICH NIETZSCHE (MENTE)
  HUMANO_DEMASIADO_HUMANO: {
    id: 'obj_humano_demasiado_humano',
    nombre: 'Humano, Demasiado Humano',
    autor: 'Friedrich Nietzsche',
    pilar: 'mente',
    puntosPilar: 1,
    icono: '⚡',
    botonTexto: 'Superado',
    desc: 'Aforismos libres sobre el auto-examen riguroso, la superación del autoengaño, la forja de la voluntad y la conquista de la independencia intelectual.',
    mensajes: [
      {
        referencia: 'Aforismo 230: El Caminante',
        texto: '«El que ha alcanzado la libertad de la razón no puede sentirse en la tierra más que como un caminante, aunque no un caminante que viaja hacia una meta final, pues no la hay.»'
      },
      {
        referencia: 'Aforismo 283: La Voluntad',
        texto: '«El valor de una conquista no se mide por lo que se obtiene, sino por el esfuerzo y el temple que costó alcanzarla.»'
      },
      {
        referencia: 'Aforismo 499: Los Amigos',
        texto: '«No busques la compañía que te adula y debilita tus defensas; busca al camarada que exige de ti tu máxima nobleza y rigor.»'
      },
      {
        referencia: 'Aforismo 588: La Paciencia',
        texto: '«El dominio de sí en las cosas pequeñas es la única escuela donde se forja la fortaleza para las grandes pruebas de la vida.»'
      }
    ]
  }
};



