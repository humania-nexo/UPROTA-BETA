# Objetos de Sabiduría Diaria — Ficha de Mecánica
### Documento complementario — UPROTA
### Vincula: Documento A (mecánica de pilares) + Documento B (narrativa y NPCs)

---

## 1. Concepto general

Los **Objetos de Sabiduría Diaria** son objetos especiales que el jugador recibe de manos de NPCs específicos a lo largo de la historia, antes de tener acceso al radio. Cada objeto, mientras esté **activo**, otorga **+1 punto entero** a un pilar (o pilares) determinado, de forma pasiva y continua — no requiere una acción diaria obligatoria para mantener el bonus, pero sí ofrece un ritual diario opcional de refuerzo mediante un pop-up.

Estos objetos resuelven un problema narrativo concreto: el protagonista aún no tiene radio, por lo que no puede recibir contenido de supervivencia o desarrollo personal por esa vía. Los NPCs que entregan estos objetos cubren ese vacío de información al inicio del juego.

---

## 2. Origen: las entregas de Don Chui

Don Chui es un caminante que trabaja para un "patrón" que lo envía por distintos puntos del mapa. Es viejo, cansado, pero prefiere seguir trabajando porque su patrón lo trata bien. Es exigente, pero justo. A lo largo de las primeras misiones (antes de que el jugador consiga el radio), Don Chui entrega **tres manuales copiados a mano**, en tres momentos distintos de la progresión inicial:

- **Entrega 1 y 2:** manuales de supervivencia práctica (contenido a definir — orientados a lo básico: agua, fuego, refugio, primeros auxilios).
- **Entrega 3 (la última):** el jugador espera una guía con tecnología avanzada, dado el tono de las entregas anteriores. En vez de eso, Don Chui le entrega **la Biblia**. Le explica que ese es el manual que de verdad le cambió la vida, y que gracias a él logró sobrevivir. Cuando el jugador pregunta, Don Chui revela que su "patrón" es Dios — lo cual retroactivamente da sentido a cómo lo describió en las entregas anteriores (que lo manda a todos lados, que lo cuida, que es exigente).

La Biblia se convierte así en el **primer Objeto de Sabiduría Diaria** del juego, y queda ligada mecánicamente al pilar **Espíritu**.

---

## 3. Expansión: un NPC por objeto

Cada futuro Objeto de Sabiduría Diaria debe tener su **propio NPC y su propio momento de entrega narrativa** — no se entregan de la nada ni todos por el mismo personaje. El NPC debe tener una relación temática coherente con el objeto que entrega.

Ejemplos ya planteados:

| Objeto | Pilar que otorga | NPC sugerido (a definir) |
|---|---|---|
| Biblia | +1 Espíritu | Don Chui (caminante) |
| *El arte de la guerra* (Sun Tzu) | +1 Mente | NPC con perfil estratégico/militar (a definir) |
| Libro de curiosidades ("¿Sabías que...?") | +1 Mente (o pilar a definir) | NPC curioso/erudito (a definir) |

Esta categoría de NPCs y objetos puede formalizarse en Documento B bajo un nombre propio (ej. "Portadores de Sabiduría" o similar, a definir) para mantener consistencia narrativa a medida que se agreguen más.

---

## 4. Cómo suman los puntos de pilar

- El sistema de pilares funciona por **suma de fuentes activas**, no por check diario individual. Cada actividad, senda u objeto especial activo aporta **puntos enteros** a uno o más pilares, y ese aporte se mantiene **mientras la fuente siga activa**.
- Ejemplo: si el jugador tiene la senda "Meditar" activa (+1 Espíritu) y además activa el objeto Biblia (+1 Espíritu), su pilar Espíritu queda en **2 puntos**, hasta que desactive uno de los dos.
- **No hay división de puntos** (nada de +0.5 / +0.5 entre pilares). Cada fuente otorga puntos enteros a un pilar. Esta regla se mantiene simple y uniforme en todo Documento A, sin excepciones por objeto.
- El punto **no depende de interactuar con el pop-up diario**. El pop-up es un ritual de refuerzo opcional, no el mecanismo que otorga el bonus. El bonus lo otorga tener el objeto **activado**, punto.

### Sobre la honestidad del jugador

Al igual que con cualquier senda que el jugador puede marcar como cumplida sin haberla hecho realmente, el sistema no verifica si el jugador efectivamente lee el contenido del pop-up. Dejar un objeto activado sin interactuar con sus mensajes diarios es, mecánicamente, el mismo tipo de autorreporte que ya exige el resto del sistema. UPROTA no penaliza ni verifica esto: el juego confía en la sinceridad del jugador, como cualquier habit tracker real.

---

## 5. El pop-up diario

- Al abrir la app, si hay objetos de Sabiduría Diaria activos, se muestra **un pop-up por objeto activo**, apilados uno sobre otro (máximo 3, ver sección 6).
- Cada pop-up se muestra **una sola vez por día del sistema** (usa el mismo corte de día que ya utiliza el sistema de Cadenas, no un reloj propio).
- Contenido del pop-up: el mensaje/versículo/dato del día, correspondiente a ese objeto.
- **Botones de cierre:**
  - **X (esquina superior derecha):** cierra el pop-up sin leer. No hay bonus asociado a esta acción — el bonus ya está garantizado por tener el objeto activo, así que la X simplemente permite saltarse el ritual del día.
  - **Botón inferior de confirmación:** cierra el pop-up. El texto del botón cambia según el objeto:
    - **"Leído"** → para la mayoría de los objetos (libros, manuales, curiosidades).
    - **"Amén"** → exclusivo de la Biblia, por su naturaleza distinta (aceptación/oración vs. lectura informativa).
  - Ambos botones (X y confirmación) cierran el pop-up de la misma forma funcional; la diferencia es puramente de ritual/inmersión, no mecánica.

### Lógica técnica sugerida

```javascript
const hoy = obtenerDiaDelSistema(); // misma función que usa el sistema de Cadenas
const clave = `sabiduria:${objetoId}:ultima_visualizacion`;
const ultimaVez = await window.storage.get(clave);

if (!ultimaVez || ultimaVez.value !== hoy) {
  // mostrar pop-up de este objeto
}

// al cerrar (con X o con el botón de confirmación):
await window.storage.set(clave, hoy);
```

---

## 6. Activar y desactivar objetos

- El jugador puede **activar o desactivar** cualquier Objeto de Sabiduría Diaria en cualquier momento desde su inventario o desde el ícono de engranaje junto al pop-up.
- El ícono de **engranaje** (junto al botón de confirmación del pop-up) lleva a una pantalla de configuración del objeto, donde se muestra:
  - Una breve explicación del beneficio que otorga.
  - La opción de desactivarlo.
- **Desactivar un objeto no lo elimina del inventario.** El jugador lo conserva permanentemente y puede reactivarlo cuando quiera (sujeto al límite de la sección siguiente).

---

## 7. Límite máximo: 3 objetos activos simultáneos

- El jugador puede tener **máximo 3 Objetos de Sabiduría Diaria activos al mismo tiempo**.
- No hay límite en la cantidad de objetos que puede **poseer** en su inventario — el límite aplica solo a cuántos están **activos** (es decir, cuántos pop-ups diarios recibe y cuántos bonus de pilar está recibiendo por esta categoría).
- Si el jugador ya tiene 3 objetos activos y recibe o intenta activar un cuarto:
  - El sistema le informa que ha recibido un nuevo objeto de la categoría Sabiduría Diaria, pero que ya alcanzó el máximo de 3 activos.
  - Para activar el nuevo, debe desactivar primero uno de los que ya tiene activos (swap manual).
  - El objeto nuevo queda guardado en su inventario, disponible para activar cuando el jugador libere espacio.
- **Razón de diseño del tope:** con 3 pop-ups diarios el jugador todavía puede leerlos como un pequeño ritual con sentido. Más de 3 convierte la experiencia en un "desfile de pantallas" tipo términos y condiciones, incentivando al jugador a cerrar todo sin leer nada — lo opuesto al propósito de la mecánica.

---

## 8. Distinción importante: pilares vs. recursos de juego

Los Objetos de Sabiduría Diaria afectan **exclusivamente a los 4 pilares** (Cuerpo, Mente, Espíritu, Taller). No deben confundirse con otro tipo de objetos que puedan existir a futuro y que afecten al **gameplay de supervivencia** (por ejemplo, un banco de baterías que da luz constante sin consumir recursos, en contraste con velas o fogatas que sí consumen recursos).

- **Objetos de Sabiduría Diaria** → suman a los pilares → miden crecimiento/desarrollo real del jugador.
- **Objetos de utilidad/supervivencia** → afectan recursos y mecánicas internas del juego → miden gameplay, no desarrollo personal.

Estas dos categorías se mantienen **separadas y no se mezclan** bajo el mismo objeto, para no diluir el propósito de cada sistema de recompensa.

**Regla de diseño derivada:** no se contempla la existencia de objetos que otorguen puntos de pilar de forma pasiva sin que el jugador reciba contenido que en teoría aporte a su desarrollo real. Si un objeto no tiene una razón de fondo vinculada a alguno de los 4 pilares, no otorga bonus de pilar — a lo sumo, afecta al juego por otra vía.

---

## 9. Pendientes a definir

- [ ] Nombre definitivo de la categoría ("Sabiduría Diaria" — ¿fijo o provisional?)
- [ ] Textos narrativos completos de Don Chui (entregas 1, 2 y 3)
- [ ] Lista inicial de versículos de Salmos (7–10 para arrancar el ciclo, con tono de ánimo — candidatos: 23, 27, 46, 91, 121)
- [ ] Contenido y NPC del objeto "El arte de la guerra" (+1 Mente)
- [ ] Contenido y NPC del objeto de curiosidades / origen de palabras
- [ ] Texto exacto del mensaje de sistema cuando el jugador alcanza el tope de 3 activos
- [ ] Nombre formal de la categoría de NPCs portadores de estos objetos (para Documento B)
