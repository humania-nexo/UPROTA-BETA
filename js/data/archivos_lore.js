/**
 * Catálogo de Documentos Clasificados y Recortes del Antiguo Mundo
 * Se desbloquean con eventos, niveles de refugio y transmisiones de radio.
 */

export const ARCHIVOS_CLASIFICADOS = [
  {
    id: "doc_01_colapso",
    codigo: "EXP-2038-COLAPSO",
    titulo: "Último Titular: La Caída de las Redes Centrales",
    categoria: "Prensa del Antiguo Mundo",
    icono: "📰",
    desbloqueadoInicio: true,
    texto: `[RECORTE DE PERIÓDICO RESCATADO DEL POLVO]
"No fue un solo cataclismo. Fue la suma silenciosa: primero las sequías prolongadas, luego los apagones de la red eléctrica continental y finalmente la escasez de suministros básicos. Cuando las instituciones dejaron de responder, las ciudades se vaciaron. Solo aquellos que aprendieron a sostener su propio refugio con disciplina y orden lograron cruzar el primer invierno."`
  },
  {
    id: "doc_02_nota_concha",
    codigo: "DIARIO-DC-04",
    titulo: "Nota de Doña Concha: Sombras al Amanecer",
    categoria: "Diario de Campo",
    icono: "📝",
    desbloqueadoInicio: false,
    desbloqueoNivel: 2,
    texto: `"Mijo, yo los he visto con mis propios ojos al amanecer. La gente del sector norte les dice 'Verdes' o zombies, pero no se comportan como tales. Se quedan completamente quietos de cara al sol naciente, con las manos abiertas y delgadas raíces clavadas en la tierra. No buscan devorar carne... buscan luz. Hay algo en su origen que nadie nos ha contado."`
  },
  {
    id: "doc_03_proyecto_eden",
    codigo: "CLASIFICADO-ISLA-CLARION-2034",
    titulo: "Expediente Confidencial: Proyecto Edén",
    categoria: "Documento Militar / Científico",
    icono: "📁",
    desbloqueadoInicio: false,
    desbloqueoNivel: 4,
    texto: `[DOCUMENTO PARCIALMENTE QUEMADO - SELLO DE SEGURIDAD MÁXIMA]
"Sujeto: Hibridación celular vegetal-humana. Cloroplastos funcionales en dermis. Capacidad de fotosíntesis autótrofa comprobada. Elias Voss ordenó la contención tras la insubordinación del personal médico en Isla Clarión. Advertencia: No son portadores de plaga vírica. Son seres diseñados. Fueron atacados por miedo y se volvieron territoriales."`
  },
  {
    id: "doc_04_partitura_lutier",
    codigo: "RELIQUIA-MUSICAL-01",
    titulo: "Partitura Arrugada: El Lago de los Cisnes",
    categoria: "Reliquia Cultural",
    icono: "🎼",
    desbloqueadoInicio: false,
    desbloqueoNivel: 3,
    texto: `"Manuscrito rescatado por el anciano Lutier. En el reverso hay una nota escrita a lápiz: 'Un refugio no se mide por el grosor de sus muros, sino por lo que es capaz de dejar salir cuando está listo para florecer'."`
  }
];
