# UPROTA - Sistema de Radio del Yermo
### Documento de Diseño - Mecánica de Notificaciones Narrativas

---

## 1. QUÉ ES Y POR QUÉ EXISTE

La Radio es el canal por el cual el Yermo le habla al Prota de vuelta. Hasta este punto, el jugador solo actúa y recibe resultados inmediatos (recursos, texto épico, eventos). La Radio introduce algo distinto: **consecuencias que llegan tarde, desde fuera del refugio**, dándole al mundo la sensación de que sigue existiendo incluso cuando el jugador no está mirando.

Funciona como un botón de notificaciones dentro de la app — el jugador la "sintoniza" cuando quiere, no interrumpe el flujo del juego.

---

## 2. DESBLOQUEO

**Condición:** Refugio Nivel 2.

Es un umbral temprano pero no inmediato — el jugador ya tiene algo de estabilidad (más que el Punto Cero), pero todavía no ha vivido lo suficiente como para tener muchos ecos pendientes que contar. Esto evita que la radio se sienta vacía al desbloquearse (muy pronto, sin nada que decir) o abrumadora (muy tarde, con demasiado acumulado de golpe).

**Momento de desbloqueo — evento único:**

> "Entre los escombros de una casa vieja, encuentras algo que aún funciona: una radio de baterías, algo oxidada, pero con la antena intacta. Esa noche, entre estática, escuchas una voz humana por primera vez en semanas."

---

## 3. PERSONALIZACIÓN — EL NOMBRE DE LA ESTACIÓN

Al desbloquearla, antes de escuchar la primera transmisión, se le pide al jugador un solo dato:

```
"Antes de que la señal se estabilice del todo... ¿de qué ciudad
vienes, Prota? El Yermo también tiene memoria de lo que fue
antes del Colapso."

[Input de texto libre] → ej. "Mazatlán"
```

Con ese dato, la estación se nombra automáticamente:

```
"YERMO [CIUDAD] RADIO"
→ ej. "YERMO MAZATLÁN RADIO"
```

Este nombre aparece en el botón de notificaciones y en el encabezado de cada transmisión. Es un dato simple de capturar (un solo input, una sola vez) pero con alto impacto emocional: ancla el mundo ficticio a la ciudad real del jugador, sin necesitar generación de contenido dinámico por IA — el nombre se inserta en plantillas de texto ya escritas.

```sql
-- Se guarda una sola vez, en la tabla de progreso general
CREATE TABLE config_jugador (
  clave TEXT PRIMARY KEY,
  valor TEXT
);
-- ej. INSERT INTO config_jugador VALUES ('nombre_ciudad', 'Mazatlán');
```

---

## 4. FUNCIONAMIENTO COMO BOTÓN DE NOTIFICACIONES

Una vez desbloqueada, la Radio vive como un ícono fijo en la interfaz (ej. 📻), con un indicador visual (punto o número) cuando hay transmisiones nuevas disponibles — igual que cualquier bandeja de notificaciones.

**El jugador la abre cuando quiere.** No hay interrupciones forzadas ni ventanas emergentes obligatorias — coherente con el principio de que el usuario nunca es interrumpido salvo en los momentos ya definidos en el resto del sistema (Capa 4 del motor invisible, El Hogar).

**Al abrirla, se muestra una lista de transmisiones**, ordenadas de más reciente a más antigua, cada una con:
- Encabezado con el nombre de la estación.
- Fecha/día del Yermo en que se transmitió.
- Texto de la transmisión.
- Ícono de tipo de contenido (lore, evento, eco personal).

---

## 5. TIPOS DE CONTENIDO

| Tipo | Qué es | De dónde sale |
| :--- | :--- | :--- |
| **Lore general** | Noticias sobre el estado del Yermo, clima, rumores de fitolantros, fragmentos de historia del mundo | Contenido fijo, rotativo, no depende de las decisiones del jugador |
| **Eventos de la región** | "Se reporta actividad cerca del sector norte", ecos de asedios o tributos que ya vivió el jugador | Ligado a eventos que el jugador ya jugó, como confirmación de que el mundo "se enteró" |
| **Ecos de decisiones** | Revelaciones tardías de decisiones morales tomadas semanas atrás (ej. el destino del Lutier) | Tabla `ecos_pendientes`, se disparan una sola vez cuando se cumple la condición asociada |
| **Testimonios de ayuda** | Alguien a quien el jugador ayudó (un NPC de paso, alguien que pidió comida) llama a la radio para contar que sobrevivió gracias a eso | Se genera automáticamente cada vez que el jugador ayuda a un NPC de paso; entra a la cola de ecos con una condición de tiempo |

---

## 6. LÓGICA DE ENTREGA — POR QUÉ NO SE VACÍA TODO DE GOLPE

Si el jugador ayudó a diez personas en 90 días, no se le debe entregar los diez testimonios apenas prenda la radio por primera vez — se sentiría como vaciar una bandeja de notificaciones, no como escuchar una estación real.

**Regla de dosificación:**
- Máximo 1-2 transmisiones nuevas disponibles por semana del Yermo (tiempo de juego, no tiempo real).
- Se mezclan contenidos: nunca dos "ecos de decisiones" seguidos sin al menos una noticia de lore general entre medio, para que se sienta como programación variada y no como una lista de resultados.
- Los ecos con condición cumplida entran a una cola (`ecos_pendientes` con `activado = false` pero condición ya satisfecha) y se liberan de a poco según esta regla, no todos el mismo día que se cumple la condición.

```sql
CREATE TABLE ecos_pendientes (
  id INTEGER PRIMARY KEY,
  tipo TEXT, -- 'decision' | 'testimonio' | 'evento'
  condicion_desbloqueo TEXT,
  fecha_condicion_cumplida TEXT, -- NULL hasta que se cumple
  texto_transmision TEXT,
  liberado BOOLEAN DEFAULT 0,
  fecha_liberado TEXT
);
```

Cada vez que el jugador abre la Radio, el sistema revisa si ya toca liberar un nuevo eco de la cola (según la regla de 1-2 por semana), y si es así, lo agrega a la lista de transmisiones disponibles.

---

## 7. EJEMPLOS DE GUION POR TIPO

**Lore general:**
> "YERMO MAZATLÁN RADIO. Si nos escuchas, aguanta la señal. El viento del norte trae polvo rojo esta semana. Cierren bien las cisternas."

**Evento de la región:**
> "YERMO MAZATLÁN RADIO. Se confirma actividad fitolantro cerca del sector que ya conoces. Nada nuevo que no hayas visto de cerca, Prota."

**Eco de decisión (Lutier — Camino B, utilitario):**
> "YERMO MAZATLÁN RADIO. Nos llega un reporte curioso: un grupo de sobrevivientes viaja por el Yermo llevando música a los asentamientos, contra todo pronóstico. Dicen que empezó con un solo hombre y un puñado de madera. No sabemos más detalles."

**Testimonio de ayuda:**
> "YERMO MAZATLÁN RADIO. Una oyente llamó esta noche. Dice que hace unas semanas, un refugio le dio de comer sin conocerla. Dice que gracias a eso llegó un día más lejos. No dio su nombre. Dijo que quien la ayudó lo sabría."

---

## 8. POR QUÉ ESTE SISTEMA FUNCIONA CON EL RESTO YA CONSTRUIDO

No requiere IA generativa ni contenido dinámico complejo — son plantillas de texto ya escritas, con un solo dato variable (el nombre de ciudad) insertado por sustitución simple. Reutiliza la misma tabla de `ecos_pendientes` que ya se definió para el NPC del Lutier, así que no es un sistema nuevo desde cero, es la extensión natural de un mecanismo que ya existía. Y como el jugador decide cuándo escuchar, nunca compite con la regla de "nunca interrumpir salvo en los momentos ya definidos" que rige el resto de UPROTA.
