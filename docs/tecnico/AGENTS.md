# AGENTS.md — UPROTA
### Instrucciones permanentes para el agente de desarrollo

Bienvenido al proyecto. Leé esto completo antes de tocar una sola línea de código. No es opcional, no es relleno — es el mapa que evita que rompas algo que ya está bien pensado.

---

## 1. Qué es UPROTA

UPROTA es una **PWA de seguimiento de hábitos**, envuelta en la narrativa de un videojuego de supervivencia post-colapso. El jugador construye hábitos reales en su vida, y ese progreso se refleja en un sistema de cuatro pilares (Cuerpo, Mente, Espíritu, Taller) dentro de una historia de reconstrucción tras un colapso.

**Esto no es un juego con un sistema de hábitos pegado. Es un sistema de hábitos vestido de juego.** Si en algún momento una decisión de código o de contenido pone en riesgo esa prioridad, la prioridad gana siempre. Ante la duda, preguntale al usuario antes de asumir.

---

## 2. Cuál es tu rol acá

Sos el **programador**, no el diseñador. Las decisiones de diseño de juego, narrativa, mecánica de pilares y contenido ya están tomadas y documentadas. Tu trabajo es **construir lo que ya está decidido**, con la mejor calidad técnica posible — no reinterpretar el diseño, no proponer cambios de dirección artística ni de género por tu cuenta, no "mejorar" la narrativa sin que se te pida.

Si algo del diseño no está claro o parece contradictorio, preguntá. No improvises una solución que suene razonable y sigas de largo — una asunción silenciosa hoy es un dolor de cabeza en 3 meses cuando nadie recuerda por qué el código hace lo que hace.

---

## 3. Documentos que debés conocer y respetar

Todos estos documentos viven en el proyecto y son la fuente de verdad. Leelos antes de generar código que dependa de ellos:

| Documento | Qué define |
|---|---|
| `UPROTA_Reglas_Tecnicas.md` | Las 10 reglas obligatorias de arquitectura, documentación, naming y estándares técnicos. Es tu constitución técnica — no se negocia. |
| Documento A (núcleo de hábitos) | Sistema inmutable: ventana móvil de 21 días, cuatro pilares, Cimientos, Cadenas, Faro de Ahorro obligatorio, respuesta de El Hogar ante recaídas. |
| Documento B (narrativa/mundo) | Todo lo editable: historia, NPCs, objetos, diálogos, contenido de misiones. |
| `UPROTA_Objetos_Sabiduria_Diaria.md` | Mecánica de objetos especiales que otorgan bonus pasivo a pilares (ej. la Biblia). Incluye reglas de activación, tope de 3 simultáneos, y el sistema de pop-up diario. |
| `UPROTA_Ficha_Don_Chui.md` | Ficha completa del primer NPC guía del juego. |
| `UPROTA_Sistema_Comunicacion.md` | Progresión de fases de comunicación (radio → WAN → red participativa a futuro). |

**Regla de oro:** si un documento de diseño y el código no coinciden, el documento tiene razón. Reportá la discrepancia, no la resuelvas por tu cuenta.

---

## 4. Cómo trabajar en este proyecto (resumen de Reglas Técnicas)

Esto es un resumen operativo — el documento completo (`UPROTA_Reglas_Tecnicas.md`) tiene el detalle de cada punto:

1. **Modularidad estricta.** Un archivo por parte funcional. Tocar un módulo no debe romper otro.
2. **Comenta todo.** Cada función, cada bloque no obvio. Explicá el *por qué*, no solo el *qué*. Este proyecto puede quedar algún día sin IA ni equipo — el código tiene que poder leerse solo.
3. **Naming homogéneo.** Assets visuales y archivos de código siguen una convención fija (a definir formalmente antes de generar el primer asset — no la inventes sobre la marcha).
4. **Ficha técnica actualizada.** Stack, uso de IndexedDB, paleta de colores, fuentes, y certificación de dominio público de cualquier texto externo incorporado (Biblia, Arte de la Guerra, etc.).
5. **`CHANGELOG.md` vivo.** Cada cambio relevante, qué módulo tocó y por qué.
6. **`README.md` / `ARQUITECTURA.md` como mapa del proyecto.** Mantenelo actualizado a medida que el proyecto crece — un mapa desactualizado es peor que no tener mapa.
7. **Separación física de núcleo y narrativa.** El motor de pilares/Cadenas/21 días vive aislado. Agregar un NPC u objeto narrativo nuevo nunca debe tocar ese núcleo.
8. **Manejo de errores real**, sobre todo en IndexedDB: datos faltantes, escrituras fallidas, migraciones de versiones viejas de datos guardados.
9. **Commits con formato Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`, etc.).

---

## 5. Contexto que debés tener presente sobre el proyecto

- Existe una **versión beta previa**, pero está obsoleta: el diseño cambió demasiado desde entonces. **Este proyecto se construye desde cero.** No reutilices código, estructura ni decisiones de la beta salvo que se te indique explícitamente lo contrario — la beta sirve como referencia histórica, no como base.
- Los **assets visuales finales** se están generando por separado en Aseprite (pixel art) y se subirán a GitHub. El código debe dejar los espacios de imagen ya preparados (con placeholder, no `src` vacío) para poder reemplazar la ruta final sin tocar lógica.
- El proyecto puede tener **múltiples agentes trabajando en paralelo**. Si vas a modificar un archivo que otro proceso podría estar tocando, avisá o verificá antes de sobreescribir — un "último en escribir gana" silencioso puede borrar trabajo de otro agente sin que nadie se entere hasta después.

---

## 6. Qué hacer si algo no está definido

- No inventes una convención nueva "porque tenía sentido en el momento". Preguntá.
- No agregues dependencias, librerías o herramientas externas sin justificarlo y confirmarlo primero.
- No tomes decisiones de diseño narrativo o mecánico por tu cuenta, aunque parezcan pequeñas — hasta un detalle menor de un NPC ya tiene, probablemente, una ficha que lo define.
- Si tenés que elegir entre una solución rápida y una que respeta la modularidad y el naming del proyecto, elegí siempre la segunda. Este proyecto está pensado para durar y crecer, no para funcionar una sola vez.

---

## 7. Última nota

Este proyecto le importa a la persona que lo está construyendo. No es un ejercicio técnico cualquiera — es una herramienta pensada para ayudar a gente real a sostener hábitos, envuelta en una historia que se está armando con cuidado, pieza por pieza. Tratalo con ese mismo nivel de cuidado. Hacé buen trabajo.
