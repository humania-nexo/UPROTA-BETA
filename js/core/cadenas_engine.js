/**
 * Motor de Cadenas (Documento A - Sección 4)
 * Romper malos hábitos a los 21 días continuos.
 * Manejo de recaídas: "El puente que tiembla" (1-2 recaídas aisladas) vs Activación de El Hogar (3+ recaídas).
 */

export class CadenasEngine {
  /**
   * Registra el estado diario de una cadena ("no caí" vs "caí hoy").
   */
  static registrarDia(cadena, recaidaHoy, notaContexto = '') {
    const c = { ...cadena };
    c.diasRegistrados = (c.diasRegistrados || 0) + 1;

    if (!recaidaHoy) {
      // Día de victoria
      c.diasLimpiosConsecutivos = (c.diasLimpiosConsecutivos || 0) + 1;
      c.recaidasConsecutivas = 0;

      // Verificar si la cadena se rompió definitivamente (21 días continuos)
      if (c.diasLimpiosConsecutivos >= 21) {
        return {
          cadena: c,
          rotaDefinitiva: true,
          mensaje: `⛓️✨ ¡Has roto la cadena de "${c.nombre}"! 21 días de constancia. El aire del refugio es más puro.`
        };
      }

      return {
        cadena: c,
        rotaDefinitiva: false,
        estadoPuente: 'firme',
        mensaje: `Día ${c.diasLimpiosConsecutivos}/21 libre de "${c.nombre}". Paso firme.`
      };
    } else {
      // Recaída honesta (sin castigo destructivo de recursos)
      c.recaidasConsecutivas = (c.recaidasConsecutivas || 0) + 1;
      c.totalRecaidas = (c.totalRecaidas || 0) + 1;
      c.ultimaNota = notaContexto;

      if (c.recaidasConsecutivas <= 2) {
        // "El puente que tiembla": 1-2 recaídas aisladas no destruyen la racha completa
        return {
          cadena: c,
          rotaDefinitiva: false,
          estadoPuente: 'tiembla',
          mensaje: `El puente tiembla con "${c.nombre}", pero no se cae. Mañana puedes volver a pisar firme.`
        };
      } else {
        // 3+ recaídas consecutivas -> Enviar a El Hogar para contención y validación
        return {
          cadena: c,
          rotaDefinitiva: false,
          estadoPuente: 'requiere_hogar',
          activarHogar: true,
          mensaje: `El camino está pesado con "${c.nombre}". El Hogar te espera con calor y sin juicio.`
        };
      }
    }
  }
}
