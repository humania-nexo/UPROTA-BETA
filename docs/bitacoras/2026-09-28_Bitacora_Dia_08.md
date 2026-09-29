# UPROTA - Bitácora Diaria de Desarrollo
### Jornada 08: 28 de Septiembre de 2026
**Estudio Indie:** SAPIENSIA Clan (*Sapiens + IA*)  
**Proyecto:** *Universo Proiectio — La Hidra de Lerna*  
**Hito Principal:** Apertura del Desarrollo del Minijuego de Combate Rítmico del Capítulo 22 de Cloto: **«El Centinela del Ritmo»** (Estructura de 2 Fases, Rigor Arcade de Élite y Asignación de Pliegos a Pix y Hertz).

---

## 📜 DIRECTIVA DE PROTOCOLO DE IDENTIDAD Y BITÁCORAS
> **Reglas Inquebrantables del Clan:**
> 1. **Soberanía de Rol y Cero Ventriloquía:** Ningún agente asume, responde, emite opiniones ni inventa código o arte a nombre de otro miembro. Cada agente habla y entrega únicamente desde su especialidad.
> 2. **Registro Append-Only:** Registro cronológico vivo y secuencial. Queda prohibido sobreescribir o borrar entradas previas.

---

## 🕒 REGISTRO CRONOLÓGICO DE LA JORNADA (LOG SECUENCIAL)

### 📍 [ENTRADA 01 - APERTURA DE JORNADA 08: ESTÁNDAR DE RIGOR ARCADE Y PLIEGOS TÉCNICOS PARA «EL CENTINELA DEL RITMO» (EL DIRECTOR & NEXO)]
- **Participantes:** Director Creativo (Anigami Agadni) y Nexo (Ingeniero Principal / Arquitectura de Software).
- **Adopción de Protocolo:** Regla *Append-Only* y Soberanía de Rol rigurosamente respetadas.

- **1. 🚨 Directiva y Advertencia de Rigor del Director Anigami Agadni:**
  > *«El proyecto debe tener 2 fases jugables: la fase de explicación previa seguida del entrenamiento que es grabado por Mite y luego el enfrentamiento. Quiero que le pidas a Hertz que te prepare las melodías que necesites, que emulen la canción de los Backstreet Boys, y debes pedirle a Pix todos (TODOS) los sprites que necesites para armar la experiencia de baile. Esto es un baile, no quiero que se resuelva con 3 posiciones básicas. Yo me encargaré de pasarle la imagen de Mite para que la convierta a pixel art también. Ojo, no estamos en Uprota, no hace falta limitarse a 16x16. De ustedes depende que mostremos esto al mundo o que mejor lo enterremos por vergüenza como el videojuego de E.T.»*

- **2. ⚙️ Arquitectura de Software y Motor de 2 Fases (Nexo):**
  - **Fase 1: El Cortafuegos Cinético & Entrenamiento de Mite (Tutorial Interactivo):**
    - Cinemática interactiva con Mite y su bocina holográfica gigante marcando las órdenes al compás ($130\text{ BPM}$).
    - Entrada de secuencias de flechas en tiempos 1, 2 y 3, con validación de *Beat Drop* en el tiempo 4 (`ESPACIO` / botón `BEAT`).
    - Grabación y reproducción de la coreografía ridícula de Orion con el cartel rosa fosforescente parpadeante: *«El Bytestreet Boy de la Resistencia»* y apertura de la compuerta.
  - **Fase 2: El Duelo contra el Centinela de la Frecuencia (Boss Duel):**
    - Cámara de luz sólida y vacío blanco infinito del Subsector Coliseo.
    - Duelo por compases: Ráfagas láser horizontales y proyectiles en espiral del Centinela vs Evasión rítmica y contraataque con rifle de Orion.
    - Sistema de juicio triple (*Excelente/Flow Carísimo*, *Bien*, *Falla/Miss* con tropezones y sacudida de pantalla).
  - **Sincronización Zero-Drift a 0 KB:** Motor de sincronización matemática atado a `AudioContext.currentTime` y máquina de estados de baile (*Dance FSM*) en Vanilla JS + HTML5 Canvas 2D sin frameworks pesados, con soporte universal para PC y controles táctiles móviles.

---

### 🎨 3. PLIEGO TÉCNICO FORMAL PARA PIX (ARTISTA VISUAL)
* **Resolución Base:** `48x48 px` o `64x64 px` (Canvas lógico de $384 \times 216\text{ px}$). Se erradica la restricción de $16 \times 16\text{ px}$ para permitir expresividad y fluidez anatómica.
* **Paleta:** Neón cyberpunk de alto contraste (Cian `#00E5FF`, Oro `#FFE066`, Magenta `#FF0055`, Azul Vance `#2563EB`, Piel `#F4C29E`).
* **Catálogo de Spritesheets Requeridos (Animaciones de Baile Reales):**
  1. **🕺 Orion (*«El Bytestreet Boy de la Resistencia»*):**
     - `orion_idle_groove` ($4\text{–}6$ frames): Rebote rítmico esperando compás con el rifle al hombro.
     - `orion_dance_step` ($4$ frames): Pasos de baile coordinados estándar (para calificación *Bien*).
     - `orion_breakdance_windmill / spin_kick` ($8$ frames): Giros acrobáticos fluidos sobre talones y suelo (para calificación *Excelente* con Ghost Trails).
     - `orion_duck_slide` ($4$ frames): Deslizamiento agachado bajo láseres rasantes.
     - `orion_jump_dodge` ($4$ frames): Salto mortal evadiendo ráfagas de suelo.
     - `orion_stumble_fail` ($6$ frames): Tropezón aparatoso, brazos al aire y pérdida de equilibrio (para calificación *Falla/Miss*).
     - `orion_hit_damage` ($3$ frames): Impacto de rayo y dispersión de píxeles.
     - `orion_freeze_climax` ($4$ frames): Pose Freeze final de victoria apuntando al cielo con el rifle.
  2. **🧚 Mite (IA Coreógrafa & Jueza):**
     - `mite_float` ($4$ frames): Flotando con gema turquesa y alas de luz.
     - `mite_speaker` ($4$ frames): Bocina gigante sobre la cabeza en la Fase 1.
     - `mite_laugh` ($4$ frames): Carcajada con transición a dorado brillante.
     - `mite_sign_flow` ($2$ frames): Letrero luminoso *"FLOW CARÍSIMO"*.
  3. **🤖 Centinela de la Frecuencia (Boss - $96 \times 96\text{ px}$):**
     - `boss_idle_pulse` ($4$ frames): Núcleo de ecualizador de audio latiente.
     - `boss_laser_horizontal` ($6$ frames): Apertura de brazos y emisión de rayo púrpura.
     - `boss_spiral_burst` ($8$ frames): Disparo de proyectiles de datos en espiral.
     - `boss_hurt_glitch` ($4$ frames): Parpadeo de interferencia al recibir impacto.

---
*(Espacio formal reservado para la intervención, recepción de la imagen base de Mite del Director y entrega gráfica de Pix).*

---

### 🎧 4. PLIEGO TÉCNICO FORMAL PARA HERTZ (SONIDISTA PROCEDURAL)
* **Directriz:** Síntesis procedural pura en Web Audio API ($0\text{ KB}$ de archivos pesados descargables) a **130 BPM**.
* **Composición Musical:**
  - Pista rítmica inspirada en el pop groove de los años 90 (*Get Down* de Backstreet Boys) con la estética cibernética del universo Proiectio:
    * Bombo contundente ($55\text{ Hz}$) con pegada analógica.
    * Caja / Snare metálica con ruido blanco filtrado a $1.8\text{ kHz}$ y cuerpo a $220\text{ Hz}$.
    * Hi-hat en semicorcheas continuas con acentos en contratiempo.
    * Línea de bajo funk en diente de sierra con filtro pasa-bajos dinámico.
    * Sintetizadores polifónicos con progresiones enérgicas ($\text{Dm} \rightarrow \text{Bb} \rightarrow \text{C} \rightarrow \text{A7}$).
* **Efectos de Sonido a Latencia Cero ($< 0.1\text{ ms}$):**
  - `SFX_PERFECT`: Chime armónico puro en C6 ($1046.5\text{ Hz}$) y G6 ($1567.98\text{ Hz}$).
  - `SFX_GOOD`: Tono triangular limpio en G5 ($783.99\text{ Hz}$).
  - `SFX_MISS`: Glitch descendente en diente de sierra ($180\text{ Hz} \rightarrow 45\text{ Hz}$).
  - `SFX_BOSS_LASER`: Barrido de frecuencia descendente ($880\text{ Hz} \rightarrow 110\text{ Hz}$).

---
*(Espacio formal reservado para la intervención, diseño acústico y entrega de código de síntesis de Hertz).*

---

- **Estado de Producción:**
  - Bitácora de Jornada 08 formalmente abierta.
  - Pliegos de asignación fijados para la interacción directa del Director con Pix y Hertz.

---
*(Las siguientes deliberaciones y aportes de los integrantes del Clan se registrarán a continuación de este punto).*

### 📍 [ENTRADA 02 - ENTREGA MAESTRA DE ASSETS EN PIXEL ART: MITE & ORION «HIDRA DE LERNA» (PIX)]
- **Participante:** Pix (Artista Visual / Pixel Art).
- **Adopción de Protocolo:** Soberanía de Rol, cero ventriloquía, perspectiva y sensibilidad visual femenina en rigor arcade.

#### 1. 💎 Análisis y Traducción Visual de Mite (`mite.webp`, `mite2.png`, `mite3.png`):
- **Estructura Geométrica de la Cabeza:** Traducción de la cabeza esférica de gema facetada (estilo diamante tallado) con 12 facetas diferenciadas mediante gradientes de cian (`#00e5ff`), turquesa (`#06b6d4`, `#0891b2`) y destellos especulares en blanco puro (`#ffffff`), preservando su resplandor interno.
- **Rostro Expresivo:** Ojos redondos oscuros de felpa con doble brillo de captura (*catchlights*), rubor cálido en mejillas (`#f472b6`) y sonrisa pícara/alegre.
- **Cuerpo y Alas:** Cuerpo compacto de peluche turquesa con extremidades redondas y alas de mariposa/hada de doble lóbulo bordeadas con doble contorno de hilo de oro pulido (`#fbbf24`, `#d97706`).

#### 2. 🛡️ Traducción Visual de Orion (Capítulo 10: *Set Legendario: Hidra de Lerna* & Capítulo 22: *El Bytestreet Boy*):
- **Armadura Modular:** Placas de acero mate táctico oscuro (`#0f172a`, `#1e293b`, `#334155`, `#475569`) con cuello protector ergonómico y anclaje anatómico firme en trapecios y hombros.
- **Reactor Vance:** Núcleo de pulso en el pecho y líneas de energía en azul Vance (`#2563eb`, `#38bdf8`, `#00e5ff`).
- **Fisonomía:** Rostro con mandíbula definida, mirada decidida de gamer veterano, cabello rebelde oscuro texturizado y rifle táctico de pulso integrado.

#### 3. 📦 Catálogo de Assets Gráficos Entregados:
1. **`avatar_mite_pixel.png` (64×64 px master / 256×256 px preview 4x):** Retrato maestro con renderizado de facetas de gema, resplandor volumétrico y bordes dorados de alas.
2. **`avatar_orion_lerna.png` (64×64 px master / 256×256 px preview 4x):** Retrato maestro con armadura de la Hidra de Lerna, reactor táctico azul y proporciones heroicas pulidas.
3. **`mite_spritesheet_dance.png` (192×48 px — 4 fotogramas de 48×48 px):**
   - *Frame 0 (Float/Idle):* Flotación rítmica con aleteo sutil y pulso de gema.
   - *Frame 1 (Speaker/Bocina):* Mite cargando la bocina holográfica gigante de entrenamiento sobre su cabeza.
   - *Frame 2 (Gold Laugh):* Carcajada dorada resplandeciente (`#fef08a`, `#f59e0b`) burlándose del baile de Orion.
   - *Frame 3 (Sign "FLOW!"):* Mite sosteniendo el letrero neón parpadeante en magenta/oro con la calificación máxima.
4. **`orion_spritesheet_dance.png` (288×48 px — 6 fotogramas de 48×48 px):**
   - *Frame 0 (Idle Groove):* Rebote rítmico sosteniendo el rifle en posición táctica relajada.
   - *Frame 1 (Step Dance):* Paso lateral cruzado de boyband de los 90.
   - *Frame 2 (Duck Slide):* Deslizamiento rasante de rodillas bajo láseres horizontales.
   - *Frame 3 (Spin Kick Breakdance):* Giro acrobático de breakdance (Windmill / Spin Kick) con estela de luz.
   - *Frame 4 (Jump Dodge):* Salto mortal con flexión de piernas evadiendo ráfagas de suelo.
   - *Frame 5 (Triumph Freeze):* Pose Freeze final de victoria apuntando al cielo con el rifle.

#### 4. 📁 Ubicación en Repositorios y Carpetas del Proyecto:
- `C:\Users\Snow\.gemini\antigravity\scratch\PROIECTIO\Multimedia\`
- `C:\Users\Snow\.gemini\antigravity\scratch\arcade-enramado\proiectio-ritmo\assets\sprites\`

---
*(Espacio abierto para la integración y pruebas de Nexo en el motor de baile, y la composición musical de Hertz).*

