# Sistema de Comunicación — Progresión por Fases
### Documento complementario — UPROTA
### Vincula: Documento B (narrativa/mundo), con impacto en Documento A (desbloqueo de contenido y mecánicas)

---

## 1. Concepto general

La comunicación dentro de UPROTA no está disponible desde el inicio. El jugador avanza a través de **tres fases tecnológicas**, cada una desbloqueada por progreso material real dentro de la historia (no por decisión arbitraria de diseño). Cada fase amplía qué tipo de información puede recibir el jugador y, más adelante, qué tipo de participación puede tener.

| Fase | Nombre | Tipo de flujo | Requisito de desbloqueo |
|---|---|---|---|
| 0 | Silencio inicial | Ninguno (solo NPCs presenciales) | Estado inicial del juego |
| 1 | Radio de onda corta | Unidireccional, solo audio | Encontrar/reparar la radio |
| 2 | WAN local | Unidireccional, audio + visual | Bioenergía + banco de baterías + laptop/computadora + acceso a la estación radial |
| 3 | Red participativa | Bidireccional, moderada | A futuro — no definida aún (ver sección 5) |

---

## 2. Fase 0 — Silencio inicial

Antes de tener cualquier dispositivo de comunicación, el jugador depende exclusivamente de **NPCs que llegan al refugio** con temas específicos. Esta fase cubre el vacío informativo inicial y es donde entran en juego los Objetos de Sabiduría Diaria y personajes como Don Chui.

- No hay canal de comunicación remota.
- Toda la información llega en persona, cara a cara.
- El jugador no puede iniciar contacto — solo recibe visitas.

---

## 3. Fase 1 — Radio de onda corta

Al encontrar (o reparar) la radio, se desbloquea el primer sistema de comunicación remota.

### Características técnicas y de diseño

- **Un solo canal.** El jugador no elige entre múltiples emisoras — recibe lo que transmite la estación.
- **Unidireccional.** El jugador solo recibe, no puede responder ni transmitir.
- **Solo audio.** No hay imágenes, videos ni diagramas — todo el contenido debe poder explicarse verbalmente.
- **Contenido típico:** boletines, historias, entrevistas (candidato: entrevistas a Don Chui sobre crafteo), avisos de la comunidad, indicaciones generales.

### Limitación narrativa aprovechable

El hecho de que sea *solo sonido* es una restricción real que ya condiciona qué tipo de contenido puede enseñarse en esta fase — cualquier explicación técnica compleja (diagramas de crafteo avanzado, por ejemplo) queda naturalmente reservada para la Fase 2, sin necesidad de justificarlo aparte.

---

## 4. Fase 2 — WAN local

Cuando el jugador ha avanzado lo suficiente en su progreso material, se desbloquea la posibilidad de conectarse a una **red inalámbrica local (WAN)** que la estación radial está construyendo activamente como proyecto propio.

### Requisitos previos (progreso material del jugador)

- Generador de bioenergía funcional.
- Banco de baterías.
- Laptop o computadora conseguida/reparada.
- Desplazamiento físico hasta la estación radial (reciben coordenadas para llegar).

### Cómo se desbloquea narrativamente

- La estación radial anuncia por el canal de radio que están configurando routers para expandir la red.
- Animan a la gente que ya tiene el equipo necesario a **llevar sus propios routers** para configurarlos y sumarse a la red — la expansión de la WAN depende del esfuerzo físico y material de la propia comunidad de sobrevivientes, no es un desbloqueo automático.
- Se entregan coordenadas de la estación para que el jugador pueda ir a conectarse.

### Qué cambia respecto a la Fase 1

- **Sigue siendo unidireccional** — el jugador recibe, no participa (todavía).
- Pero ahora el contenido puede ser **visual**: enlaces a videos, diagramas, imágenes.
- Esto habilita contenido más técnico y detallado (crafteo avanzado, tutoriales visuales, mapas) que antes era imposible de transmitir solo por audio.

---

## 5. Fase 3 — Red participativa (futuro, no definida)

Etapa conceptual a futuro. La idea de origen es que el jugador pueda no solo recibir sino **participar**: subir su propio progreso, escribir, ver contenido de otros.

### Punto de partida de la idea

Unirse a una WAN sin poder participar no tiene mucho sentido — el objetivo a resolver más adelante es cómo estructurar esa participación sin que se vuelva caótica o de tono inadecuado para el resto del juego.

### Referencia de modelo a explorar

Se mencionó como referencia el modelo de **SoloLearn**: una app de aprendizaje donde los participantes pueden opinar, competir y participar dentro de una estructura moderada y con temas direccionados, en vez de un flujo libre sin filtro.

### Preguntas abiertas (a resolver en una sesión de diseño futura)

- ¿El contenido de otros "Protas" es generado por jugadores reales, o son NPCs simulados que dan sensación de comunidad?
- ¿Cómo se filtran y direccionan los temas para evitar el caos de un foro sin moderación?
- ¿Qué se mantiene unidireccional (boletines oficiales, contenido de la estación) incluso después de que la Fase 3 esté activa, versus qué se vuelve bidireccional (progreso propio, comentarios, competencias)?
- ¿Existe algún tipo de sistema de reputación o verificación, o el anonimato total es parte de la propuesta?

Esta fase queda como **nota de desarrollo a futuro**, sin comprometer decisiones de arquitectura todavía.

---

## 6. Resumen de la progresión

```
Fase 0: Silencio inicial
  └─ Solo NPCs presenciales (Don Chui, etc.)

Fase 1: Radio de onda corta
  └─ Unidireccional · Solo audio · Un canal

Fase 2: WAN local
  └─ Unidireccional · Audio + Visual · Requiere bioenergía + batería + laptop + router propio

Fase 3: Red participativa (futuro)
  └─ Bidireccional · Moderada · Modelo de referencia: SoloLearn · Sin definir aún
```

---

## 7. Pendientes a definir

- [ ] Contenido específico transmitido en Fase 1 (temas de los primeros boletines/entrevistas).
- [ ] Diseño de la mecánica de "llevar tu propio router" (¿es un ítem craftable/encontrable con requisitos propios?).
- [ ] Qué contenido visual específico se desbloquea primero en Fase 2.
- [ ] Arquitectura de la Fase 3 (ver preguntas abiertas en sección 5) — pendiente de sesión de diseño futura.
