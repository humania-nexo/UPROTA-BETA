# UPROTA - Radio del Yermo v2.0
### Documento Maestro - Lore, Mecánica y Sistema de Conocimiento Real
Actualizado con segmento educativo y desbloqueo por conocimiento

---

## 1. QUÉ ES LA RADIO AHORA

Antes era un buzón de notificaciones narrativas. Ahora es **el corazón del Yermo que sigue vivo**.

Es la prueba de que no estás solo. Mientras tú cuidas tu refugio, alguien en otro refugio prendió su radio, alguien aprendió a hacer un filtro de agua y lo compartió, alguien cuenta que sobrevivió porque tú le diste de comer hace 40 días.

Funciona como app de notificaciones que el jugador abre cuando quiere, pero ahora con 5 tipos de contenido y con botón ▶️ TTS vinculado al motor de voz del teléfono. No autoplay. El jugador decide escuchar.

**Desbloqueo:** Refugio Nivel 2.
> "Entre los escombros encuentras algo que aún funciona: una radio de baterías, oxidada, antena intacta. Esa noche, entre estática, escuchas una voz humana por primera vez en semanas."

Al desbloquear, input único:
> "¿De qué ciudad vienes, Prota? El Yermo también tiene memoria."
> Input -> "Mazatlán" -> "YERMO MAZATLÁN RADIO"

Se guarda en `config_jugador.nombre_ciudad`.

---

## 2. LOS 5 TIPOS DE CONTENIDO (con TTS)

### TIPO 1: Noticias del Yermo (Lore aleatorio)
Clima, polvo rojo, rumores fitolantros, estaciones caídas.
- Frecuencia: 40% de la programación
- No depende del jugador, da sensación de mundo vivo
- Ejemplo TTS:
> "YERMO MAZATLÁN RADIO. Si nos escuchas, aguanta la señal. Viento del norte trae polvo rojo esta semana. Cierren bien las cisternas."

### TIPO 2: Anuncio de Posibles Eventos (Pre-evento)
No es spoiler, es rumor. Prepara al jugador sin decirle cuándo.
- Frecuencia: 15%
- Validado por nivel del refugio
- Ejemplo:
> "YERMO MAZATLÁN RADIO. Nos reportan movimiento cerca del sector norte. Mercenarios vieron humo de un refugio pequeño. Si ese eres tú, Prota, refuerza la entrada. No sabemos cuándo pasarán."
Efecto mecánico: +5% probabilidad de evento mercenario en próximos 7 días. Jugador siente que la radio sirve para prepararse.

### TIPO 3: Ecos de Decisiones Pasadas (Consecuencia tardía)
Sistema `ecos_pendientes`. Revelación silenciosa, sin cartel de "elegiste mal".
- Frecuencia: 15% - nunca 2 seguidos, siempre con lore entre medio
- Tabla:
```sql
ecos_pendientes: id, decision_tomada, condicion_desbloqueo, texto_transmision, activado, fecha_liberado
```
- Ejemplo Lutier Camino A (entregado a autoridad):
> "YERMO MAZATLÁN RADIO. Mencionan de pasada a un director de orquesta itinerante que reunía músicos por el Yermo, hasta que dejó de saberse de él tras ser detenido en un sector cercano. Una lástima."
El jugador que lo entregó sabe quién es. El juego no lo acusa.

- Ejemplo Testimonio de ayuda:
> "YERMO MAZATLÁN RADIO. Una oyente llamó. Dice que hace semanas, un refugio le dio de comer sin conocerla. Gracias a eso llegó un día más lejos. No dio nombre. Dijo que quien la ayudó lo sabría."

### TIPO 4: Fragmentos de Lore Profundo + Micro-relatos Motivacionales
Historias de 60-90 segundos que no avanzan gameplay, pero sostienen el espíritu.
- Frecuencia: 15%
- Presentado por Doña Concha o El Lutier si está en tu refugio
- Ejemplo:
> "Doña Concha cuenta que antes del Colapso, su abuela decía: 'Un refugio no se mide por sus muros, mijo. Se mide por lo que se atreve a dejar salir cuando ya está listo.' No sé por qué me acordé de eso hoy."

Mecánica: +1 🔥 moral por 24h si lo escuchas completo (incentivo a escuchar).

### TIPO 5: NO DEJES QUE EL YERMO APAGUE TU LUZ (Conocimiento Real)
**NUEVO - Segmento educativo.** Presentado a las 19:00 hora del Yermo, con intro fija y TTS grave.

Intro TTS oficial:
> "Buenas noches, Yermo... son las diecinueve horas en Yermo [CIUDAD] Radio... y en nuestro segmento... 'No dejes que el Yermo apague tu luz'... hoy tenemos..."

Cada programa:
- 1 habilidad práctica real del mundo real, explicada paso a paso como en radio post-apocalíptica
- 1 micro-relato de 2 líneas de alguien que la usó para sobrevivir
- Desbloquea tecnología en el juego NO por recursos, sino por haber adquirido el conocimiento

Estructura de cada programa:
```
Título: Cómo hacer velas de 8 horas con aceite usado
Nivel requerido: Refugio 1
Guion TTS: 150-200 palabras, lenguaje simple, sin tecnicismos
Materiales en juego para construir: 1 aceite + 1 lata + mecha de tela
Bonus al construir: +2 luz, -10% consumo moral noche
Historia motivacional: "La niña del sector 4 hizo una con aceite de sardinas y su mamá pudo coserle un abrigo de noche. Dice que la luz no era mucho, pero alcanzaba para no sentirse sola."
```

Árbol de conocimiento (progresivo, de básico a sistema cerrado):

**NIVEL 1 - Supervivencia Inmediata (Refugio 1-2)**
1. Velas de aceite usado
2. Filtro de agua con arena, carbón y tela (botella PET cortada)
3. Recolector de lluvia con lona y cubeta + filtro básico

**NIVEL 2 - Autosuficiencia (Refugio 2-3)**
4. Gallinero vertical con tarimas recicladas
5. Humus de lombriz con desperdicios de cocina
6. Cultivo en botellas PET vertical
7. Conserva de alimentos en sal / secado solar

**NIVEL 3 - Sistema Cerrado (Refugio 3-4)**
8. Riego por goteo flotante que cae sobre tanques de humus (ciclo cerrado: agua -> plantas -> humus -> plantas)
9. Acuaponía básica: peces + lechugas (excremento peces = abono)
10. Horno solar con caja y aluminio

Regla de desbloqueo:
- Escuchar programa completo (TTS hasta el final) marca `conocimiento_adquirido = true`
- Solo entonces aparece el Cimiento en tu lista de construcción, aunque tengas recursos
- Mensaje: "Ahora sabes cómo hacerlo. No es solo tener madera, es saber qué hacer con ella."

Esto significa: tecnología desbloqueada por conocimiento REAL, no solo por nivel. Jugador en vida real aprendió algo útil.

---

## 3. LÓGICA DE ENTREGA Y TTS

**Dosificación:**
- Máximo 2 transmisiones nuevas por semana del Yermo (tiempo de juego)
- Nunca 2 ecos de decisiones seguidos
- Orden de rotación sugerida: Lore -> Conocimiento -> Eco -> Lore -> Motivacional -> Pre-evento
- Cola: `ecos_pendientes` con `fecha_condicion_cumplida` y `liberado`

**TTS vinculado a teléfono:**
```js
// js/utils/tts.js
function hablarYermo(texto, velocidad = 0.9) {
  speechSynthesis.cancel();
  const msg = new SpeechSynthesisUtterance(texto);
  msg.lang = 'es-MX';
  msg.rate = velocidad; // 0.9 lento, locutor viejo
  msg.pitch = 0.8;
  // Efecto estática: reproducir mp3 de 0.8s antes
  const estatica = new Audio('assets/static.mp3');
  estatica.volume = 0.3;
  estatica.play();
  setTimeout(() => speechSynthesis.speak(msg), 600);
}
```
- Botón ▶️ al lado de cada transmisión
- Si el usuario pausa, se guarda timestamp para continuar
- No autoplay para respetar principio "nunca interrumpir"

---

## 4. POR QUÉ ESTE SISTEMA GANA

1. **Fallout tiene Yermo Capital con música. Nosotros tenemos Yermo [TU CIUDAD] con conocimiento que te puede salvar en la vida real.** Nadie hace eso.
2. **Habitica te da sombrero. UPROTA te enseña a hacer un filtro de agua y luego te deja construirlo en tu refugio porque ya sabes.**
3. **Reutiliza tabla `ecos_pendientes` para todo: decisiones, testimonios, pre-eventos y programas de conocimiento.** Un sistema, 5 contenidos.
4. **TTS nativo = offline, gratis, con voz del propio teléfono. Funciona en BETA sin pagar APIs.**
5. **Cierre narrativo perfecto con tu filosofía: cada NPC tiene arco y se va, pero el conocimiento se queda. El Lutier se va de gira, pero lo que te enseñó de música (moral) y lo que aprendiste en radio (velas, agua) se queda contigo.**

---

## 5. PRÓXIMOS PASOS PARA BETA

Para BETA, implementar 3 programas piloto de conocimiento:

1. **Programa 001 - Velas de aceite** (Nivel 1)
2. **Programa 002 - Filtro de agua PET** (Nivel 1) 
3. **Programa 003 - Humus de lombriz** (Nivel 2)

Con eso validamos:
- TTS con botón play
- Desbloqueo por conocimiento
- Intro "No dejes que el Yermo apague tu luz"

Luego, 1 programa nuevo por semana como si fuera serie real.

Este documento reemplaza a Sistema de Radio del Yermo v1. Es el canon para v2.
