# GDD: EL CENTINELA DEL RITMO (MINIJUEGO DE COMBATE RÍTMICO 2D PIXEL ART)
## Universo Proiectio — Libro 1: CLOTO (Capítulo 22)
### Inspiración Mecánica: *Bust a Groove* / *Dance Dance Revolution* / *PaRappa the Rapper* meets Cyberpunk Boss Duel

---

## 1. FICHA TÉCNICA
* **Título del Minijuego:** *El Centinela del Ritmo (The Frequency Sentinel)*
* **Enlace Canónico:** [Capítulo 22 — El Centinela del Ritmo](file:///C:/Users/Snow/.gemini/antigravity/scratch/PROIECTIO/LIBROS/LIBRO%201%20CLOTO/Cap_22%20el%20centinela%20del%20ritmo.md)
* **Ubicación en el Lore:** Servidor Caído del Subsector Coliseo (Dimensión Virtual de Proiectio).
* **Personajes en Escena:** 
  * 🕺 **Orion:** Soldado de la resistencia con su rifle al hombro y su insólito apodo: *«El Bytestreet Boy de la Resistencia»*.
  * 🧚 **Mite:** IA de asistencia, coreógrafa implacable y jueza de Flow (bocina flotante y grading de precisión).
  * 🤖 **Centinela de la Frecuencia (Boss):** Coloso de luz sólida, fibra óptica y núcleo percusivo con ráfagas láser en pulsos de compás.
* **Banda Sonora Canónica:** *Get Down (You're the One for Me)* — Backstreet Boys / Chiptune Electro-Pop 130 BPM.
* **Estilo Visual:** Pixel Art 16-bits / Neo-Geo arcade (Paleta de neón púrpura, cian Vance, vacío blanco y baldosas de datos).
* **Motor:** Vanilla JS + HTML5 Canvas 2D + Web Audio API (0 KB de dependencias externas, 60–120 FPS).

---

## 2. NARRATIVA Y CONTEXTO
En el Capítulo 22 de *Cloto*, Orion debe secuestrar un nodo de procesamiento abandonado para alojar de forma remota el Hiper-lazo de Pandora. El acceso está bloqueado por un **Cortafuegos Cinético** y vigilado por el **Centinela de la Frecuencia**.

Como la IA del Centinela anticipa cualquier cálculo militar balístico lineal, Mite obliga a Orion a calibrar su combate a través de la danza y la sincronía musical: el ritmo y los pasos fuera de norma actúan como una anomalía cuántica indetectable para el algoritmo corporativo.

---

## 3. FASES DE GAMEPLAY (ESTRUCTURA BUST A GROOVE)

```
┌─────────────────────────────────────────────────────────────┐
│ FASE 1: ENTRENAMIENTO DE CALIBRACIÓN CON MITE (TUTORIAL)     │
│  - Mite marca pautas con su bocina flotante.                │
│  - Secuencias de flechas: [↓] Agáchate, [↑] Salta, [←/→] Gira │
│  - Grabación del "Flow" y desbloqueo del Cortafuegos.       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ FASE 2: DUELO CONTRA EL CENTINELA DE LA FRECUENCIA (BOSS)    │
│  - 4 Compases del Centinela (Ataque Láser / Ráfaga Espiral)  │
│  - 4 Compases de Respuesta de Orion (Evasión & Contragolpe) │
│  - Barra de Tensión / Flow Meter (0% a 100%)                │
│  - Modo Climax: "Get Down Overdrive" a 130 BPM               │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. MECÁNICAS DE JUEGO (CORE LOOP)

### A. Sistema de Entrada Rítmica (*Arrow Input Buffer*):
1. **La Barra de Tiempo (Beat Bar):**
   - Una barra inferior marca 4 tiempos por compás ($1, 2, 3, 4$).
   - Durante los tiempos 1, 2 y 3, el jugador ingresa una secuencia de flechas direccionales (`←`, `↑`, `↓`, `→` o `WASD`).
   - En el **Tiempo 4 (The Beat Drop)**, el jugador pulsa la tecla de acción / espacio (`ESPACIO` o `[X]`) para validar el paso.

2. **Calificación de Precisión (Timings):**
   * 🌟 **PERFECT (±30 ms):** +100 Puntos, Orion ejecuta un paso acrobático con estela holográfica, esquiva el láser por milímetros y carga la barra de anomalía. Mite grita: *«¡Ding-Pum! ¡Flow de Nivel 7!»*.
   * ✨ **GREAT (±70 ms):** +50 Puntos, evasión estándar.
   * ⚠️ **EARLY / LATE (±120 ms):** +20 Puntos, tropiezo leve.
   * ❌ **MISS:** 0 Puntos, el láser o proyectil golpea a Orion (-15% HP), lluvia de píxeles grises. Mite reclama: *«¡Demasiado lento, usuario #4092!»*.

### B. Progresión de Dificultad por Rondas:
* **Ronda 1 (Láseres Horizontales):** Secuencias de 2 a 3 flechas (`[↓] + [↓] + [ESPACIO]`).
* **Ronda 2 (Proyectiles en Espiral):** Secuencias de 4 flechas con giros (`[←] + [↓] + [→] + [↑] + [ESPACIO]`).
* **Ronda 3 (Tormenta Polirrítmica del Núcleo):** Secuencias de 5 a 6 flechas a contra-tiempo con cambio de BPM.

### C. HUD y Medidores:
* **Barra de Boss (Centinela):** Resistencia del núcleo de luz sólida (100% $\rightarrow$ 0%).
* **Barra de Vida de Orion:** Integridad del avatar en el servidor.
* **Flow Gauge (Barra de Mite):** Multiplicador de combo ($x1, x2, x4$). Al llenarse al 100%, activa el **Super-Paso de la Resistencia**, disparando una ráfaga con el rifle sincronizada con una pirueta breakdance.

---

## 5. ESPECIFICACIONES PARA PIX (DIRECCIÓN VISUAL / PIXEL ART)
* **Sprites de Orion (32x32 / 48x48 px):**
  * `idle_rifle`: Pose de espera táctica botando al ritmo del beat.
  * `duck_slide`: Deslizamiento agachado bajo los lásers.
  * `spin_kick`: Giro breakdance sobre los talones.
  * `jump_dodge`: Salto mortal evadiendo ráfagas de suelo.
  * `hit_stumble`: Tropezón con pérdida de píxeles y sacudida de cabeza.
  * `triumph_pose`: Pose de *«Bytestreet Boy»* apuntando al cielo mientras Mite flota con su letrero parpadeante.
* **Sprite de Mite (16x16 / 24x24 px):**
  * Animaciones flotantes: bocina gigante sobre la cabeza, letrero luminoso *"FLOW CARÍSIMO"*, carcajadas de cambio de color (turquesa $\rightarrow$ rojo $\rightarrow$ dorado).
* **Sprite del Centinela de la Frecuencia (96x96 px o multipartes):**
  * Núcleo latiente estilo ecualizador de audio, brazos de cables de fibra óptica y proyectores láser púrpura.
* **Fondos y Efectos:**
  * Baldosas de datos que se desmoronan en el abismo.
  * Scanlines CRT, flashes de neón púrpura y círculos concéntricos de ecualizador en el suelo.

---

## 6. ESPECIFICACIONES PARA HERTZ (DISEÑO SONORO)
* **Síntesis Chiptune de Batería (Web Audio API):**
  * Bombo contundente a 55 Hz (onda senoidal con caída de tono rápida).
  * Caja / Snare metálica con ruido blanco filtrado a 2.4 kHz.
  * Arpegios de bajo funk en onda de pulso 25% (*duty cycle* estilo Game Boy / NES).
* **Feedback de Acierto / Error:**
  * *Perfect:* Chime brillante en 432 Hz / 864 Hz.
  * *Miss:* Glitch de estática y zumbido de error del Centinela.
