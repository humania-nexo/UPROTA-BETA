# UPROTA — Paisaje Sonoro y Arquitectura de Audio Chiptune (8-Bits)
### Documento Maestro de Audio Procedural — Hertz (Sonidista del Yermo)
**Vincula: `docs/tecnico/UPROTA_Reglas_Tecnicas.md` + `docs/diseno/UPROTA-NUCLEO-DOCUMENTO-A-v1.md` + `docs/diseno/UPROTA_Guiones_Radio_104_5.md`**

---

## 🎧 1. RESUMEN EJECUTIVO Y FILOSOFÍA (0 KILOBYTES)

En UPROTA el audio es **100% procedural**, sintetizado en tiempo real con la **Web Audio API nativa** de JavaScript. 
- **Cero dependencias externas:** Ni Tone.js, ni Howler, ni archivos pesados de audio (WAV/MP3).
- **Cero impacto en red/offline:** Funciona instantáneamente en Service Worker y PWA.
- **Atmósfera:** Sobria, estoica, nostálgica y esperanzadora (música de cámara en 8-bits).

---

## ⚡ 2. ARQUITECTURA TÉCNICA (PARA NEXO)

### 2.1 Emulación de Chips Clásicos (NES 2A03 / Game Boy DMG)
1. **Canal Pulse / Onda Cuadrada con Duty Cycle Dinámico:** Emulación mediante `PeriodicWave` con serie de Fourier exacta para ciclos de trabajo de **12.5%** (timbres nasales/metálicos), **25%** (melodía clásica sólida) y **50%** (cuadrada pura).
2. **Canal Triangular Cálido (Bajos):** `OscillatorNode` tipo `'triangle'` con micro-rampas de ganancia (3 ms) en los extremos para erradicar el *DC clicking*.
3. **Canal de Ruido Filtrado (Percusión y Entorno):** Un único `AudioBuffer` de 1 segundo de ruido blanco en memoria (~176 KB), procesado por `BiquadFilterNode` dinámico (*hi-hats*, cajas, viento nocturno, leña del fogón y dial 104.5 MHz).

### 2.2 Secuenciador Tracker (Dual-Clock Lookahead)
- Evita el *jitter* de la UI usando un temporizador JS cada 25 ms que revisa una ventana futura de 100 ms (`scheduleAheadSec`) y agenda eventos en `AudioContext.currentTime`.
- Envolventes **ADSR** matemáticas con piso de seguridad en `0.0001` (-80 dB) para evitar excepciones `RangeError` en móviles.
- **Cero fugas de memoria:** Desconexión explícita en `source.onended = () => { osc.disconnect(); gain.disconnect(); }` y compresor máster de seguridad anti-clipping (`DynamicsCompressorNode`).

---

## 🎨 3. PAISAJE SONORO Y SINERGIA CON EL EQUIPO

### 3.1 Sinergia Visual con Pix (Sprites & Dioramas)
- **Fogón de Piedras / Fuego:** Crujidos granulares mediante ráfagas aleatorias de ruido filtrado paso-bajo.
- **Bici-Generador:** Zumbido armónico de onda cuadrada modulada en frecuencia con el pedaleo.
- **Faro Encendido / Torta Dorada:** Fanfarria metálica y cristalina en 2 octavas.

### 3.2 Sinergia Narrativa con Silas (Radio & Lore)
- **Frecuencia 104.5 MHz (Elena / Don Samuel):** Click de interruptor PTT (Push-To-Talk), siseo analógico de portadora y micro-modulaciones de desvanecimiento ionosférico (*QSB/fading*).
- **El Arco del Lutier (Día 55):** Adaptación sobria de *El Lago de los Cisnes* de Tchaikovsky con timbres de cuerdas rústicas en síntesis chiptune.

---

## 🎵 4. PRIMEROS 3 TEMAS MUSICALES PROCEDURALES

| Tema | Pantalla / Contexto | Tonalidad & Modo | Tempo | Carácter e Instrumentación |
| :--- | :--- | :--- | :--- | :--- |
| 🌅 **"El Alba en el Refugio"** | Tablón de Hábitos & Sendas | Do Mayor / Pentatónica | 82 BPM | Sereno, matutino y ordenado. Pulso constante que acompaña la planificación diaria. |
| 🌌 **"Ecos de la Noche"** | El Hogar / Fogón de Cob | La Menor / Dórico | 64 BPM | Íntimo, melancólico y reflexivo. Acompaña la fatiga y el descanso sin culpa. |
| 📻 **"Frecuencia 104.5"** | Jingle de Elena / Yermo Radio | Sol Mayor (7ma armónica) | 110 BPM | Cortinilla analógica retro de 3.2 segundos tras el click del dial. |

---

## 📂 5. ESTRUCTURA DE ARCHIVOS DE ENTREGA
- `js/core/audio_procedural.js` → Motor base de síntesis y SFX del sistema.
- `js/data/musica_chiptune.js` → Partituras de tracker, arreglos de notas en Hz y patrones melódicos.
