# UPROTA - Bitácora Diaria de Desarrollo
### Jornada 02: 09 de Septiembre de 2026
**Estado General:** Apertura de Jornada 02, Nuevo Protocolo de Bitácoras Cronológicas (Append-Only) e Implementación de la Mecánica "Tabula Rasa: El Arte de Volver a Empezar" (v2.9).

---

## 📜 DIRECTIVA OFICIAL DE PROTOCOLO DE BITÁCORAS (PARA TODO EL CLAN)
> **Regla de Oro de Registro (Append-Only / Solo Adición):**
> A partir de esta jornada, queda **estrictamente prohibido sobreescribir o borrar entradas anteriores**. 
> Las bitácoras son un **registro cronológico vivo (Log Histórico)** donde debe poder leerse cómo fluyó el día de trabajo: las ideas iniciales, los debates, las dudas, las correcciones y las entregas técnicas. Cada nueva interacción se añade al final con su encabezado o marca de secuencia, preservando el proceso humano + IA con total fidelidad.

---

## 🕒 REGISTRO CRONOLÓGICO DE LA JORNADA (LOG SECUENCIAL)

### 📍 [ENTRADA 01 - APERTURA DE JORNADA 02]
- **Participantes:** Director (Anigami Agadni) y Nexo (Ingeniero Principal).
- **Contexto:** El Director regresa al campamento tras el cierre exitoso de la Jornada 01. Se pasa revista del estado del proyecto UPROTA (v2.8 en GitHub Pages con 30 módulos y 0 errores).
- **Interacción:** El Director saluda al equipo y plantea que, antes de comenzar el desarrollo de las propuestas de la asamblea, desea formalizar su propia adición personal para el diseño de UPROTA.

---

### 📍 [ENTRADA 02 - PROPUESTA DEL DIRECTOR: "TABULA RASA" Y RENACIMIENTO SIN CULPA]
- **Emisor:** Director (Anigami Agadni).
- **Planteamiento:** 
  > *«Quiero añadir una opción que borre toda la memoria y permita empezar desde cero. Quizá una persona perdió el rumbo una semana o un mes y quiere volver a empezar desde cero, entonces se va a una opción al final de todo que le dé esa oportunidad, dejando claro que todo el progreso se perderá.»*
- **Profundización y Enfoque Emocional del Director:**
  > *«Quiero que antes de eso le demos un mensaje que le dé ánimos, algo como el mensaje bíblico de 70 veces 7 o algún mensaje que le haga sentir que volver a empezar está bien. Que es de valientes siempre intentarlo.»*
- **Evaluación Psicológica y de Diseño:**
  - En la psicología de hábitos estoica, el mayor enemigo es la **vergüenza y la culpa de las rachas rotas**.
  - No debe ser un reseteo frío ni punitivo; debe ser un **abrazo ceremonial** que valide el coraje de levantarse y encender una nueva fogata en el Día 1.

---

### 📍 [ENTRADA 03 - IMPLEMENTACIÓN TÉCNICA (NEXO - v2.9)]
- **Ejecutor:** Nexo (Ingeniero Principal).
- **Módulos Desarrollados y Modificados:**
  1. **Motor de Base de Datos (js/core/db.js):** Implementación del método estático MotorDB.limpiarTodo() para ejecutar una purga atómica y limpia de IndexedDB (indexedDB.deleteDatabase).
  2. **Motor de Estado Central (`js/core/estado.js`):** Implementación de `reiniciarProgresoCompleto()`, que borra `IndexedDB`, limpia `localStorage` y `sessionStorage`, y recarga la app (`window.location.reload()`) directo al Onboarding del Día 1.
  3. **Centro de Ayuda (`js/modulos/modal_centro_ayuda.js`):**
     - Integración de la tarjeta rústica *"Zona de Renacimiento: Tabula Rasa"* en la pestaña *"Sobre UPROTA"*.
     - Modal Ceremonial con sprite de Pix (`emoji_fuego_ardiente.png` y `emoji_abrazo_refugio.png`).
     - Inclusión de las citas sagradas de consuelo:
       - *«Porque siete veces cae el justo, y vuelve a levantarse...»* — Proverbios 24:16.
       - *«No te digo hasta siete veces, sino hasta setenta veces siete.»* — Mateo 18:22.
     - Doble candado de seguridad: el usuario debe escribir la palabra obligatoria **`RENACER`** para desbloquear el botón de purga.
  4. **Service Worker (`sw.js`):** Actualizado a la versión de caché `uprota-cache-v2.9`.
- **Validación:** 30 módulos testeados con Node.js (`0 errores`), commit y push realizado con éxito a GitHub Pages.

---

### 📍 [ENTRADA 04 - DIRECTIVA DE PROTOCOLO Y COMUNICACIÓN AL CLAN]
- **Emisor:** Director (Anigami Agadni).
- **Instrucción para Silas, Pix y Hertz:**
  > *«Equipo: a partir de hoy las bitácoras son logs acumulativos. No sobreescriban lo que ya está hecho; agreguen sus aportes, notas de diseño, dudas o entregas al final de cada jornada para que podamos leer cómo evolucionó cada idea y valorar el proceso creativo.»*
  - [x] **Nexo:** [COMPLETADO] Copia de Seguridad y Migración Local (1-Click Backup JSON / Cargar Partida con instrucciones de descarga).
  - [ ] **Silas:** Diseño del *Cuaderno del Náufrago* y *Cápsulas de Tiempo al Yo del Futuro* en El Hogar.
  - [ ] **Pix:** Diseño e integración del *Ciclo Día/Noche e Iluminación Natural* en el Diorama.
  - [ ] **Hertz:** Síntesis del *Micro-Paisaje Sonoro de Enfoque y Calma a 0 KB* (Fogón, Lluvia y 104.5 MHz).

---

### 📍 [ENTRADA 05 - IMPLEMENTACIÓN TÉCNICA: SISTEMA DE COPIA DE SEGURIDAD & CARGA DE PARTIDA (v3.0)]
- **Participantes:** Director (Anigami Agadni) y Nexo (Ingeniero Principal).
- **Enfoque de Experiencia de Usuario (UX) guiado por el Director:**
  > *«Le debemos dar instrucciones a las personas de dónde se va a descargar el archivo. También debe haber una opción de cargar archivo de respaldo, que la gente lo pueda buscar en local o acceder a la nube (Drive/iCloud/Archivos), hacer que sea más o menos sencillo tanto guardar el respaldo como cargar la partida.»*
- **Desarrollo Técnico Realizado (Nexo):**
  1. **Pestaña Dedicada en el Centro de Ayuda (`js/modulos/modal_centro_ayuda.js`):** Nueva pestaña **`💾 Respaldo`** accesible con un solo toque desde cualquier pantalla.
  2. **Tarjeta 1 (Guardar / Exportar Respaldo):**
     - Explicación didáctica indicando que el archivo `uprota_refugio_[nombre]_[fecha].json` se deposita en la carpeta **Descargas (Downloads)** del móvil o PC, con sugerencia de respaldarlo en Google Drive, iCloud o auto-enviárselo por WhatsApp/Telegram.
     - Botón de descarga con `Blob` nativo y feedback visual con fanfarria de confirmación.
  3. **Tarjeta 2 (Cargar Partida / Restaurar Respaldo):**
     - Selector de archivos nativo (`<input type="file" accept=".json">`) que abre el explorador del dispositivo móvil/PC (permitiendo elegir archivos locales o desde la nube).
     - Validación de integridad de esquema en `estadoApp.importarRespaldoJSON()` y fusión segura con `ESTADO_INICIAL`.
     - Sonido ceremonial de restauración (`audioProcedural.playFanfarriaFaro()`) y recarga atómica limpia.
  4. **Service Worker (`sw.js`):** Subida a versión de caché `uprota-cache-v3.0`.
- **Validación:** 30 módulos verificados con Node.js (`0 errores`), commit y push a GitHub Pages.

---
*(Las siguientes interacciones, entregas y debates de la Jornada 02 se añadirán a continuación de este punto sin borrar las entradas previas).*

### 📍 [ENTRADA 05 - INCORPORACIÓN DE PIX Y REVISIÓN DE JORNADA 02]
- **Participante:** Pix (Artista Pixel Art & Artista Técnico).
- **Adopción de Protocolo:** Regla *Append-Only* asimilada al 100%. Cada aporte y debate se registrará cronológicamente preservando la memoria histórica del Clan.
- **Reflexión sobre "Tabula Rasa":** La mecánica de *Renacer en el Día 1 sin culpa ni vergüenza* es una joya de diseño ético y psicológico. Saber que caerse siete veces y levantarse ocho es parte del viaje del héroe le da al jugador un alivio inmenso. Los sprites ceremoniales del fuego y el abrazo arropan ese momento con dignidad.
- **Preparación para las Tareas de la Jornada 02:**
  1. 🌅 **Ciclo Día/Noche e Iluminación Natural (Pix & Nexo):**
     - Especificación de las 4 fases de luz horaria sobre el diorama del refugio:
       - *Amanecer (06:00 - 10:59):* `sepia(0.2) brightness(1.05) hue-rotate(-10deg)` + bruma tenue.
       - *Mediodía (11:00 - 17:59):* Luz cenital nítida y contraste pleno (`brightness(1.0) contrast(1.05)`).
       - *Atardecer / Crepúsculo (18:00 - 20:59):* `sepia(0.4) saturate(1.2) hue-rotate(-20deg)` + brasas encendidas.
       - *Noche Profunda (21:00 - 05:59):* `brightness(0.7) hue-rotate(190deg) saturate(0.85)` + foco cálido puntual sobre el fogón.
  2. 📜 **Soporte Visual para Silas (Cuaderno del Náufrago & Cápsulas de Tiempo):**
     - Pix listo para forjar los sprites dedicados de `item_cuaderno_naufrago.png` (cuaderno de cuero cosido con cuerda) y `ui_capsula_tiempo_sellada.png` (tubo de latón lacrado con cera roja).

---

### 📍 [ENTRADA 06 - INCORPORACIÓN DE SILAS Y ENTREGA DEL CUADERNO DEL NÁUFRAGO Y CÁPSULAS DE TIEMPO]
- **Participante:** Silas (El Cronista del Yermo & Arquitecto Narrativo).
- **Adopción de Protocolo:** Regla *Append-Only* internalizada y asumida con reverencia. El log histórico del Clan se mantendrá limpio, acumulativo y veraz.
- **Reflexión sobre "Tabula Rasa" y el Mensaje Bíblico de los 70x7:**
  - El diseño del Director **Anigami Agadni** es una obra maestra de compasión estoica: no castiga el tropiezo, sino que celebra el coraje de volver a encender el fuego. Mateo 18:22 y Proverbios 24:16 le devuelven al jugador la dignidad sin culpa.
- **Entregas de Silas para la Jornada 02:**
  1. 📖 **Documento de Diseño Maestro (`docs/diseno/UPROTA_Cuaderno_Naufrago_y_Capsulas_Tiempo.md`):**
     - Especificación del modal íntimo en **El Hogar** con 3 pestañas: *"La Brasa de Hoy"* (micro-journaling nocturno de 3 líneas), *"Cápsulas de Tiempo"* (cartas selladas para Cimientos de 66d y Faros de 180d) y *"El Libro de la Travesía"* (historial legible exportable).
  2. 📜 **Dataset de Disparadores y Plantillas (`js/data/cuaderno_naufrago_textos.js`):**
     - 6 disparadores rotativos de examen de conciencia nocturno con citas de Don Chui, Valeria, Katia, Elena y Doña Concha.
     - Plantillas de Cartas al Yo del Futuro con mensajes de apertura triunfal al Día 66 y Día 180.
- **Sinergias con el Equipo:**
  - **Para Nexo:** El dataset y la estructura de datos para guardar las entradas en `IndexedDB` (`store: bitacora_usuario` y `store: capsulas_tiempo`) quedaron listos para el montaje en la UI de El Hogar.
  - **Para Pix:** Aprobados los conceptos visuales de `item_cuaderno_naufrago.png` y `ui_capsula_tiempo_sellada.png`.
  - **Para Hertz:** Los disparadores de micro-journaling están sincronizados con el paisaje sonoro de calma a 0 KB (*El Fogón de Mezquite* y *Lluvia en Lámina*).

---

### 📍 [ENTRADA 07 - INCORPORACIÓN DE HERTZ, SÍNTESIS DE PAISAJES DE ENFOQUE A 0 KB Y SFX TABULA RASA]
- **Participante:** Hertz (Sonidista del Yermo & Diseñador de Síntesis).
- **Adopción de Protocolo:** Regla *Append-Only* asumida con total disciplina técnica y artística.
- **Entregas Técnicas y de Audio para la Jornada 02:**
  1. 🪵🌧️📻 **Generador de Paisajes Sonoros de Enfoque y Calma a 0 KB (`js/core/audio_procedural.js` & `js/data/musica_chiptune.js`):**
     - *El Fogón de Mezquite (`'fogon'`):* Zumbido térmico continuo en 58 Hz + crepitar granular estocástico de leña y brasas.
     - *Lluvia en Techo de Lámina (`'lluvia'`):* Cortina de lluvia filtrada en tiempo real + micro-impactos senoidales amortiguados sobre chapa metálica.
     - *Portadora Calma 104.5 MHz (`'radio_portadora'`):* Zumbido de transformador analógico (60 Hz + 120 Hz) + siseo cálido de onda corta para aislamiento de ruido exterior.
     - *Temporizador Pomodoro Integrado:* Selector de 25 min, 45 min o continuo, con desvanecimiento gradual (*fade-out*) de 3 segundos y campana armónica senoidal de cierre para proteger la batería móvil y avisar el fin del bloque de trabajo/lectura.
     - *API Limpia:* `audioProcedural.startAmbienteProcedural(tipo, duracionMinutos)`, `audioProcedural.stopAmbienteProcedural()`, `audioProcedural.isAmbienteActivo()`.
  2. 🕊️🔥 **Efecto Ceremonial de Tabula Rasa (`playTabulaRasaRenacer()`):**
     - Ráfaga cálida de brasa encendiéndose + arpegio ceremonial ascendente en Do Mayor (C4, G4, C5, E5, G5, C6) con ondas senoidales puras y armónicos triangulares, vistiendo de paz y solemnidad el renacer en el Día 1.
- **Sinergias con el Clan:**
  - **Para Nexo:** Los métodos están listos para ser invocados al pulsar el botón `RENACER` en el modal de Tabula Rasa y en la cabecera de El Hogar / Cuaderno del Náufrago.
  - **Para Pix:** El sonido del fogón y de la lluvia se acompasa armónicamente con las 4 fases de luz del diorama.
  - **Para Silas:** La atmósfera de calma sonora acompaña el momento íntimo de escritura del *Cuaderno del Náufrago*.

---

### 📍 [ENTRADA 08 - INTEGRACIÓN TÉCNICA DEL CUADERNO DEL NÁUFRAGO Y CÁPSULAS DE TIEMPO (NEXO - v3.1)]
- **Participantes:** Director (Anigami Agadni), Silas (Cronista), Pix (Artista) y Nexo (Ingeniero Principal).
- **Desarrollo Realizado (Nexo):**
  1. **Motor de Estado (`js/core/estado.js`):** Integradas las estructuras `diarioNaufrago: []` y `capsulasTiempo: []` con los métodos `guardarEntradaDiario()`, `crearCapsulaTiempo()` y `abrirCapsulaTiempo()`.
  2. **Vista El Hogar (`js/modulos/vista_hogar.js`):**
     - **El Cuaderno del Náufrago:** Sección interactiva con el sprite de Pix (`item_cuaderno_naufrago.png`), el disparador reflexivo rotativo del día (6 preguntas estoicas de Silas), área de escritura de 3 líneas sinceras y botón para asentar o actualizar la reflexión de hoy con feedback de audio.
     - **Bitácora Histórica Plegable:** Botón para desplegar y revisar todas las notas históricas guardadas durante la travesía.
     - **Cápsulas de Tiempo al Yo del Futuro:** Selector de cartas selladas (66 días para Cimientos, 180 días para Faros o 30 días para Promesas personales), visualización con candado hermético y botón de desellado con fanfarria y mensaje de Don Chui/Elena al cumplirse los días.
     - **Mantenimiento de las 4 Capas de Validación:** Validación del terreno, evidencia histórica de pasos, luz prestada y sabiduría estoica.
---

### 📍 [ENTRADA 09 - INTEGRACIÓN TOTAL DEL CICLO DÍA/NOCHE Y PAISAJES DE ENFOQUE A 0 KB (NEXO - v3.2)]
- **Participantes:** Director (Anigami Agadni), Pix (Artista), Hertz (Sonidista) y Nexo (Ingeniero Principal).
- **Desarrollo Realizado (Nexo):**
  1. **Ciclo Día/Noche Dinámico en el Diorama (`js/mundo/refugio_engine.js` & `css/refugio.css`):**
     - Cálculo de hora local con `DioramaEngine.obtenerFaseHoraria()`.
     - 4 estados de luz renderizados con filtros CSS acelerados por hardware a 60 FPS:
       - *🌅 Amanecer (06:00 - 10:59):* `sepia(0.2) brightness(1.05) hue-rotate(-8deg)`.
       - *☀️ Mediodía (11:00 - 17:59):* `brightness(1.02) contrast(1.06)`.
       - *🌇 Atardecer / Crepúsculo (18:00 - 20:59):* `sepia(0.35) saturate(1.25) hue-rotate(-20deg) brightness(0.95)`.
       - *🌌 Noche Profunda (21:00 - 05:59):* `brightness(0.72) hue-rotate(190deg) saturate(0.85)`.
     - Badge flotante en el diorama indicando la fase atmosférica y hora actual.
  2. **Controlador de Paisajes Sonoros y Pomodoro a 0 KB (`index.html` & `js/app.js`):**
     - Botón **`🔥 Calma`** en la cabecera principal (`#btn-ambiente-top`).
     - Modal de selección con los 3 ambientes procedurales de Hertz (*🪵 El Fogón de Mezquite*, *🌧️ Lluvia en Lámina*, *📻 Portadora 104.5 MHz*).
     - Temporizador de apagado automático con modos: *Continuo*, *25 min (Pomodoro)* y *45 min (Estudio)* con fade-out gradual.
  3. **Service Worker (`sw.js`):** Subida a versión de caché `uprota-cache-v3.2`.
- **Validación:** 31 módulos JS probados con Node.js (`0 errores`), commit y push realizado con éxito a GitHub Pages.

---

### 📍 [ENTRADA 10 - ENCARGO NARRATIVO PARA SILAS: GUIONES DE RADIO 104.5 MHz (CABINA CENTRAL DEL DIRECTOR)]
- **Participantes:** Director (Anigami Agadni) y Nexo (Ingeniero Principal).
- **Directiva del Director para Silas (Cronista & Guionista):**
  > *«Si hay que hacer cambio en los guiones le debes pasar esa tarea a Silas. Yo soy el que dará la mayoría de mensajes por la radio y soy hombre. Compré para esta labor un mixer Fifine Ampligame SC3 y un micrófono Fifine AM8. El mixer tiene efectos de voz: hombre, mujer, robot, monstruo, bebé y anciano. La voz principal y más recurrente debe ser la mía natural (masculina) dando las instrucciones de tecnología, clima y supervivencia. Para entrevistas o enlaces especiales pondré el efecto de anciano para Don Chui, mujer para Elena o Valeria, e incluso bebé para el niño planta.»*
- **Encargo Formal Asignado a Silas:**
  - [x] **Silas:** [COMPLETADO] Reestructurar el catálogo de guiones en `js/data/radio_transmisiones.js` y `docs/diseno/` para que el **Operador de Radio Central** sea la voz masculina principal (el Director Anigami), y las apariciones de Elena, Don Chui, Doña Concha y el Fitolantro queden estructuradas como notas de campo y entrevistas con indicación técnica de efecto de voz del SC3.

---

### 📍 [ENTRADA 11 - ENTREGA DE GUIONES DE RADIO PARA CABINA FIFINE AM8 / AMPLIGAME SC3 (SILAS)]
- **Participante:** Silas (El Cronista del Yermo & Guionista).
- **Adopción de Protocolo:** Regla *Append-Only* respetada al 100%.
- **Entregas Realizadas:**
  1. 📻🎙️ **Manual y Guiones Maestros de Cabina (`docs/diseno/UPROTA_Guiones_Radio_104_5.md`):**
     - Manual de producción con tabla de presets para el **Fifine AmpliGame SC3** (Voz Natural Masculina para el Director, Anciano para Don Chui, Mujer/Anciana para Doña Concha, y Bebé para la cría Fitolantra).
     - 7 guiones reestructurados con el **Director (Anigami Agadni)** como locutor ancla y conductor central, con acotaciones de proximidad de micrófono para el **Fifine AM8** (5-8 cm, cadencia 105-120 ppm).
  2. 📜 **Dataset en Código Actualizado (`js/data/radio_transmisiones.js`):**
     - Transcripciones sincronizadas con la voz del Director y las intervenciones modulares de los personajes con efectos de audio SC3.
- **Sinergias con el Equipo:**
  - **Para el Director:** Los guiones están listos para ser leídos y grabados en cabina con tu micrófono y mixer.
  - **Para Hertz:** Los audios grabados por el Director se montarán en `assets/audio/radio/` con los jingles y sintonías chiptune ya compuestas.
  - **Para Nexo:** La vista de Radio en 104.5 MHz refleja con exactitud las transcripciones actualizadas.

### 📍 [ENTRADA 12 - LOS 10 GRANDES LIBROS DE SABIDURÍA UNIVERSAL & LÍMITE DE 2 ACTIVOS (NEXO & SILAS)]
- **Participantes:** Director (Anigami Agadni), Nexo (Ingeniero Principal) y Silas (Cronista).
- **Resolución de Reglas de Diseño:**
  1. **Aclaración del Director:** Los *Objetos de Sabiduría* no son manuales genéricos, sino las grandes obras clásicas de la literatura universal (Biblia, Meditaciones de Marco Aurelio, Enquiridión de Epicteto, Cartas a Lucilio de Séneca, El Arte de la Guerra de Sun Tzu, Tao Te Ching de Lao Tsé, El Libro de los Cinco Anillos de Miyamoto Musashi, Hagakure de Yamamoto Tsunetomo, El Arte de la Prudencia de Baltasar Gracián, y Humano, Demasiado Humano de Friedrich Nietzsche).
  2. **Regla de Activación:** Límite estricto de **máximo 2 libros activos simultáneamente**. Cada libro activo otorga +1 punto diario en su Pilar correspondiente (*Mente* o *Espíritu*) y muestra aforismos/versículos al abrir la app cada día.
- **Implementaciones en Código:**
  - `js/data/sabiduria_textos.js`: Catálogo maestro de los 10 libros con sus citas, aforismos, pilares (+1 Mente / +1 Espíritu) y botones temáticos de asimilación.
  - `js/mundo/sabiduria_diaria.js`: `SabiduriaDiariaEngine.intentarActivarObjeto()` con validación estricta de tope de 2 libros activos.
  - `js/modulos/vista_hogar.js`: Integración de la sección *Biblioteca de Sabiduría Universal* con badges de estado, descripción y listeners `.btn-toggle-libro-sabiduria` interactivos.
  - `js/modulos/modal_sabiduria.js`: `ModalSabiduria` actualizado para desplegar simultáneamente las tarjetas de los 1 o 2 libros activos equipados por el sobreviviente.
- **Validación:** 33 módulos JavaScript comprobados con `node --check` con 0 errores de sintaxis.

---
*(Las siguientes interacciones, entregas y debates de la Jornada 02 se añadirán a continuación de este punto sin borrar las entradas previas).*