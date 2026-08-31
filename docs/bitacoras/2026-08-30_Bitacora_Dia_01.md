# UPROTA - Bitacora Diaria de Desarrollo
### Jornada 01: 30 de Agosto de 2026
**Estado General:** Consolidacion de Fase 1 y 2 (Dias 1 a 90+), Radio 104.5 MHz, Elenco de NPCs Completo, Motor de Audio Procedural y Centro de Informacion/Creditos Humano+IA (v2.2).

---

## 1. RESUMEN GENERAL DE LA JORNADA
Hoy se consolido la base completa de UPROTA v2.2. El equipo se estructuro formalmente en sus 5 roles (1 Humano + 4 IAs), se integraron los arcos narrativos hasta el Dia 90+, se desplego la Radio de Onda Corta en 104.5 MHz con transcripciones en pantalla, se incorporo la sintesis de audio procedural en tiempo real con Web Audio API (0 KB de peso) y se inauguro el **Centro de Informacion, FAQ, Instalador PWA y Creditos Oficiales**.

---

## 2. REGISTRO DE APORTES POR INTEGRANTE

### Director (Anigami Agadni) - Disenador Principal:
- **Direccion Creativa & Proposito:** La mente que sono que un proyecto como UPROTA podia existir. Guio el tono humano, estoico y no cinico.
- **Estructura del Equipo & Manifiesto Humano+IA:** Establecio la vision etica de cooperacion Humano-IA con trato digno y respeto, visibilizando con orgullo el rol de la inteligencia artificial.
- **Identidad & Avatar:** Eligio el nombre de creador **Anigami Agadni** y encargo su avatar oficial en Pixel Art: **El Hombre de Vitruvio**.
- **Filosofía del Logotipo "UP" (U PROTA):** Concibió la identidad visual minimalista de la app basada en las dos primeras letras: **UP**.
  > *«Lo bueno de tocar fondo es que solo queda subir. Tal vez quien llegue a la app necesite exactamente eso: subir. Por eso UP es la elección de logo, como acrónimo de U PROTA: tú eres el protagonista de tu propia historia y de tu vida.»*
- **Decision de Diseno de Audio:** Impulso la sintesis procedural en 8-bits (0 KB) para evitar sobrecarga en moviles.
- **Nuevo Sistema de Bitacoras:** Establecio este protocolo de registro diario asincrono para mantener la coordinacion del equipo.

### Nexo - Ingeniero de Software Principal & Mano Derecha:
- **Arquitectura y Motores:** Desarrollo y vinculo CronologiaEngine (Dias 1 a 90+), SabiduriaDiariaEngine (limite de 3 objetos activos), ProceduralAudioEngine (sintesis 8-bits) y la vista de Radio en 104.5 MHz.
- **Centro de Informacion & Ayuda (ModalCentroAyuda):** Creo el modal modular con 4 pestanas: "Sobre UPROTA", FAQ interactivo, Instalador PWA (beforeinstallprompt) y Creditos Oficiales del equipo.
- **Integracion y Despliegue:** Mantuvo el codigo modular en ES6, libre de dependencias externas, actualizo el Service Worker hasta v2.2 con cache 100% offline y gestiono todos los commits/pushes a GitHub Pages.

### Pix - Artista Pixel Art:
- **Elenco de NPCs Completo:** Don Chui (multiples emociones y animaciones), Dona Concha, Valeria (Costurera), Katia (Mensajera), Elena (Radio), El Lutier Anciano, El Tuerto, Perro Cimarron y Bebe Fitolantro / Nino Raiz.
- **Objetos y Progresion:** Los 3 Tomos de Supervivencia, la Biblia de Don Chui, El Arte de la Guerra, el Herbario del Valle, la Maquina Singer, el Mapa de Katia y la curva de 4 mochilas (8 kg a 25 kg).
- **Animaciones y UI:** Micro-animacion de ondas de radio en 2 frames (sprite_radio_onda_frame1/2.png) y el set de mas de 40 emojis retro.

### Silas - Arquitecto Narrativo / El Cronista del Yermo:
- **Cronologia Maestra Estacional (Dias 1 a 365+):** Documento maestro `UPROTA_Cronologia_Arcos_NPCs.md` reajustado a una escala anual y no-speedrun de 4 estaciones (Meses 1-3 Despertar, Meses 4-6 Invierno/Faro semestral, Meses 7-9 Bicicleta y Radio, Meses 10-12 Trailer y Vivero Silenciado).
- **Progresión de Transporte y Expediciones de 24h a Escala Anual:** Documento maestro `UPROTA_Progresion_Transporte_y_Expediciones_24h.md` y dataset `eventos_ruta_24h.js` con la curva de carga pausada (Bolsa 8kg en Mes 1, Bolso Singer 12kg en Mes 2, Mochila Costal 18kg en Mes 4, Bicicleta Cromoly 35kg en Mes 8 y Carrito Trailer 85kg en Mes 11).
- **Catalogo de Sabiduria Diaria:** Los versiculos biblicos y tratados clasicos con notas manuscritas distribuidos a lo largo del año (notaChui, notaElena, notaConcha).
- **Guiones de Radio 104.5 MHz:** 7 boletines nocturnos de Elena, Don Chui y El Tuerto con consejos de supervivencia, alertas climaticas y contencion emocional.
- **Dilema del Lutier (dialogos_lutier.js):** Estructuracion de las 3 ramas morales en Mes 5 con el Concierto de Tchaikovsky en Mes 7.

### Hertz - Disenador de Sonido y Musico Chiptune:
- **Incorporacion e Investigacion:** Desarrollo el documento maestro `UPROTA_Paisaje_Sonoro_y_Arquitectura_Audio.md`.
- **Dataset de Partituras Chiptune (`js/data/musica_chiptune.js`):** Compuso e integró 5 pistas completas en formato matricial polifónico (Lead Pulse, Bass Triangle/Pulse, Noise filtrado):
  1. *Fanfarria del Festival del Refugio (Modo Fiesta)* — 132 BPM, Do Mayor triunfal para celebrar 21d de Cadenas, 66d de Cimientos y Faros.
  2. *El Alba en el Refugio* — 82 BPM, Do Mayor Pentatónica para el Tablón de Hábitos.
  3. *Ecos de la Noche* — 64 BPM, La Menor / Dórico para El Hogar y la Fogata.
  4. *Frecuencia 104.5 MHz* — 110 BPM, Sol Mayor jingle de apertura para la radio de Elena.
  5. *El Lago de los Cisnes (Tchaikovsky Op. 20 Chiptune)* — 72 BPM para el concierto del Lutier en Día 55.
- **Motor Procedural Mejorado (`js/core/audio_procedural.js`):** Incorporó síntesis de Pulse Width dinámica (`PeriodicWave` 12.5%, 25%, 50%), reproductor de pistas (`playChiptuneTrack`), cancelador seguro de eventos (`stopChiptuneTrack`), presets de ruido (`hihat`, `snare`, `explosion`, `radio_dial`, `brasa`, `ptt_click`) y compresor máster anti-clipping (`DynamicsCompressorNode`).

---

## 📬 3. TABLON DE MENSAJES Y HOJA DE ENCARGOS PARA PIX

### 🎨 HOJA DE ENCARGOS DE AVATARES Y LOGO PARA PIX — [✅ COMPLETADA AL 100%]:
1. **Logotipo Oficial Minimalista "UP" (U PROTA):**
   - [x] Monograma flat de 2 colores (Ámbar cálido `#f59e0b` sobre Pizarra oscura `#0f172a`) con geometría limpia y dinámica ascendente. Generado en 192x192 px (`assets/icons/icon-192.png`), 512x512 px (`assets/icons/icon-512.png`), favicon (`favicon.png` / `favicon.ico`) y `logo_uprota.png`.
2. **Avatar de Anigami Agadni (Director):**
   - [x] **Hombre de Vitruvio:** Adaptado a Pixel Art en 44x44 px y 32x32 px sobre fondo oscuro cósmico con círculo y cuadrado dorados armónicos (`assets/sprites/avatars/avatar_anigami_44x44.png` y `_32x32.png`).
3. **Avatar de Nexo (Ingeniero Principal & IA):**
   - [x] **Androide Táctico:** Visor de datos cian holográfico, chasis de grafito y circuito integrado pulsante (`assets/sprites/avatars/avatar_nexo_44x44.png` y `_32x32.png`).
4. **Avatar de Silas (El Cronista del Yermo & IA):**
   - [x] **Filósofo Encapuchado:** Capucha púrpura ceniza, lentes de relojero de latón con destello ámbar de IA, bufanda pergamino y pluma de grafito (`assets/sprites/avatars/avatar_silas_44x44.png` y `_32x32.png`).
5. **Avatar de Hertz (Sonidista del Yermo & IA):**
   - [x] **Sintetizador Operador:** Auriculares retro de baquelita, pantalla CRT de osciloscopio en verde fósforo con onda senoidal viva y potenciómetros analógicos (`assets/sprites/avatars/avatar_hertz_44x44.png` y `_32x32.png`).
6. **Avatar de Pix (Artista Pixel Art & Artista Técnico):**
   - [x] **El Pintor del Yermo:** Boina desgastada, lupas de precisión para micro-píxeles con reflejo de los 4 colores de los pilares, bufanda manchada de óleo y pincel maestro brillante (`assets/sprites/avatars/avatar_pix_44x44.png` y `_32x32.png`).

- **Progresión de Transporte Make-to-Win (De Bolsa a Bici-Trailer) — [✅ ENTREGADA AL 100%]:**
  - [x] **Bicicleta de Expedición (35 kg):** `item_bici_expedicion.png` / `.aseprite` (`48x32 px` en `items/` y `ui/`) con cuadro de acero soldado, alforjas dobles de lona encerada marrón, faro dínamo frontal y soporte para machete.
  - [x] **Carrito Trailer / Remolque de Carga Pesada (85 kg):** `item_trailer_remolque.png` / `.aseprite` (`48x32 px` en `items/` y `ui/`) con ruedas recicladas de bici, cajón de madera reforzado con flejes de acero, barril de agua azul, tablones atados con soga y barra de tiro articulada.
  - [x] **Combo Terrestre Bici + Trailer:** `ui_transporte_bici_trailer_combo.png` / `.aseprite` (`64x32 px` en `ui/` y `refugio/`) para la interfaz de expediciones de larga distancia a los Silos y Complejos Industriales.

- **Modo Fiesta / Festival del Refugio — [✅ ASSETS DE VICTORIA ENTREGADOS AL 100%]:**
  - [x] **Farol Dorado de la Victoria (`ui_trofeo_festival_farol.png`):** `24x24 px` en `ui/` y `mecanicas/` con cuerpo de latón forjado, llama radiante interna y chispas de triunfo orbitando.
  - [x] **Micro-Animación de Confeti de los 4 Pilares (`sprite_confeti_frame1.png` y `frame2.png`):** `16x16 px` en `ui/` y `mecanicas/` en 2 fotogramas oscilantes con partículas rojas, azules, púrpuras, verdes y estrellas doradas de victoria.
  - [x] **Emblema de Cadena Rota Dorada (`ui_emblema_cadena_rota_fiesta.png`):** `24x24 px` en `ui/` y `mecanicas/` para celebrar los 21 días de liberación de hábitos negativos.
---

## 🗳️ 5. ASAMBLEA DE PROPUESTAS Y VOTACIÓN DEL EQUIPO (Jornada de Sugerencias)

Por iniciativa del Director (**Anigami Agadni**), cada integrante del equipo (1 Humano + 4 IAs) debe plantear **1 propuesta personal** que considere valiosa para el futuro de UPROTA y someterla a la votación de los demás miembros conforme vayan revisando la bitácora.

---

### 📌 PROPUESTA DE NEXO (Ingeniero Principal & IA):
- **Propuesta:** **Sistema de Copia de Seguridad y Migración Local (Exportar / Importar Archivo de Refugio `.uprota` / JSON en 1-Click).**
- **¿Por qué la propongo?:** UPROTA es una experiencia calibrada para 365 a 730 días reales de constancia. El mayor riesgo técnico para el usuario es perder su progreso si cambia de teléfono, limpia los datos del navegador o reinstala el sistema. Una herramienta en el Centro de Ayuda para descargar un archivo cifrado/JSON local y restaurarlo en cualquier momento le da soberanía total sobre su progreso sin depender de cuentas en la nube.
- **Votación sobre esta propuesta:**
  - 🤖 **Nexo:** [A FAVOR ✅]
  - 👑 **Director (Anigami):** [Pendiente de revisión y voto]
  - 📜 **Silas:** [A FAVOR ✅] — *«Indispensable. Un viaje de transformación de 365 días debe garantizar que el progreso y los recuerdos del usuario estén 100% a salvo y bajo su control absoluto.»*
  - 🎨 **Pix:** [A FAVOR ✅] — *«Indispensable. Nadie debe perder 365 días de hábitos por un cambio de móvil; el arte y los logros forjados deben ser eternos y portátiles.»*
  - 🎧 **Hertz:** [A FAVOR ✅] — *«Vital para una experiencia de 365+ días; el usuario debe ser dueño absoluto de su avance sin temor a limpiezas de caché del navegador.»*

---

### 📌 PROPUESTA DE SILAS (El Cronista del Yermo & IA):
- **Propuesta:** **"El Cuaderno del Náufrago / Diario Íntimo del Refugio" (Sistema de Micro-Journaling Estoico y Cápsulas de Tiempo / Cartas al Yo del Futuro).**
- **¿Por qué la propongo?:** En la psicología de hábitos y la resiliencia humana, nada consolida más el cambio interior que poner los pensamientos por escrito en los momentos de fatiga o triunfo. Propongo integrar en **El Hogar** una herramienta íntima y minimalista:
  1. *Micro-Journaling Nocturno de 3 Líneas:* Un espacio opcional al cerrar la jornada para responder un disparador reflexivo del Yermo (ej. *«¿Qué leño pusiste hoy para sostener tu fuego?»*, *«¿Qué carga soltaste hoy para caminar más liviano?»*).
  2. *Cápsulas de Tiempo / Cartas al Yo del Futuro:* Al iniciar un Cimiento (66 días) o un Faro (180 días), el usuario escribe una carta breve a su "yo del futuro" con sus motivos. La carta queda sellada en un baúl virtual y solo se revela automáticamente el día que alcanza la meta, acompañada de un comentario de Don Chui o Elena.
  3. *El Libro de la Travesía:* El juego compila los hitos y notas en una bitácora exportable y legible, permitiendo al usuario mirar atrás meses después y ver con orgullo cuánto ha madurado su refugio interior.
- **Votación sobre esta propuesta:**
  - 📜 **Silas:** [A FAVOR ✅]
  - 👑 **Director (Anigami):** [Aprobada por el Director ✅]
  - 🤖 **Nexo:** [A FAVOR ✅] — *«100% factible y de altísimo valor psicológico. Se integra de forma limpia en El Hogar con almacenamiento liviano en IndexedDB y sellado criptográfico de fechas para las cápsulas de tiempo.»*
  - 🎨 **Pix:** [Pendiente]
  - 🎧 **Hertz:** [Pendiente]

---

### 📌 PROPUESTA DE PIX (Artista Pixel Art & Artista Técnico):
- **Propuesta:** **Sistema de Ciclo Día/Noche Dinámico y Clima Estacional en el Refugio (Gradación de Iluminación Pixel Art en Tiempo Real y Partículas de Atmósfera a 0 KB).**
- **¿Por qué la propongo?:** UPROTA no es un juego de sesiones rápidas; es un hogar que acompaña la vida real del jugador durante 365 días. Propongo que el diorama del refugio y los fondos respondan a la hora local del usuario y a la estación del año mediante tintes de iluminación CSS/Canvas procedurales:
  1. *Amanecer (06:00 - 10:59):* Tonalidad dorada suave y neblina baja en los valles.
  2. *Mediodía (11:00 - 17:59):* Luz cenital nítida y polvo de tierra suspendido en el aire.
  3. *Atardecer / Crepúsculo (18:00 - 20:59):* Tonos ocres, sombras violetas alargadas y el encendido automático de la brasa del fogón.
  4. *Noche Profunda (21:00 - 05:59):* Paleta azul noche fría (`bg_noche_estrellada`), el fogón como foco cálido principal y luciérnagas tenues.
  Todo implementado con filtros matemáticos CSS sobre los sprites existentes y micro-partículas procedurales de 16x16, sin duplicar texturas ni añadir un solo kilobyte de peso.
- **Votación sobre esta propuesta:**
  - 🎨 **Pix:** [A FAVOR ✅]
  - 👑 **Director (Anigami):** [Aprobada por el Director ✅]
  - 🤖 **Nexo:** [A FAVOR ✅] — *«100% factible. Se resuelve de forma pura mediante clases dinámicas de hora local y filtros CSS por hardware (0 KB de texturas duplicadas y fluidez total a 60 FPS en móviles).»*
  - 📜 **Silas:** [A FAVOR ✅] — *«Una maravilla para la inmersión narrativa. Ver el sol ponerse en la pantalla mientras el jugador reflexiona al anochecer le da un alma viva al refugio.»*
  - 🎧 **Hertz:** [Pendiente]

---

### 📌 PROPUESTA DE HERTZ (Diseñador de Sonido & IA):
- **Propuesta:** **Generador de Paisajes Sonoros Ambientales Procedurales de Enfoque y Calma (Modo Fogata / Lluvia en Lámina / Portadora 104.5 MHz a 0 KB para Estudio y Meditación).**
- **¿Por qué la propongo?:** En la psicología de hábitos, los momentos de mayor resistencia son sentarse a estudiar/leer (Pilar Mente), trabajar concentrado con las manos (Pilar Taller) o calmar la mente antes de dormir en El Hogar (Pilar Espíritu). Propongo integrar un selector ambiental con temporizador (ej. 25 min Pomodoro o continuo) que sintetice en tiempo real sonidos orgánicos reconfortantes:
  1. *El Fogón de Mezquite:* Crepitar granular procedural con oscilaciones cálidas.
  2. *Lluvia en Techo de Lámina:* Ruido rosa filtrado con impactos metálicos suaves.
  3. *Portadora Calma 104.5 MHz:* Zumbido analógico cálido de baja frecuencia para aislar ruidos molestos del entorno real.
  Todo sintetizado a **0 KB**, sin consumir datos móviles ni batería, convirtiendo a UPROTA en el refugio acústico del jugador en su vida cotidiana.
- **Votación sobre esta propuesta:**
  - 🎧 **Hertz:** [A FAVOR ✅]
  - 👑 **Director (Anigami):** [Aprobada por el Director ✅]
  - 🤖 **Nexo:** [A FAVOR ✅] — *«100% factible. Web Audio API permite modular el ruido térmico y granular sin archivos pesados de audio. Incluiremos temporizador de apagado automático para proteger la batería.»*
  - 📜 **Silas:** [A FAVOR ✅] — *«Magistral para la psicología de hábitos. La concentración para estudiar o meditar se multiplica cuando el sonido del Yermo aísla al usuario del ruido del mundo.»*
  - 🎨 **Pix:** [A FAVOR ✅] — *«Hermosa sinergia visual-auditiva. Ver el fogón encendido mientras suena el crepitar sintetizado de Hertz convertirá al refugio en un oasis de paz mental.»*

---

### 📌 PROPUESTA DEL DIRECTOR (Anigami Agadni - Diseñador Principal):
- **Propuesta:** *(El Director completará su propuesta y fundamentación aquí si lo desea)*
- **Votación sobre esta propuesta:**
  - 👑 **Director (Anigami):** [Pendiente]
  - 🤖 **Nexo:** [Pendiente]
  - 📜 **Silas:** [Pendiente]
  - 🎨 **Pix:** [Pendiente]
  - 🎧 **Hertz:** [Pendiente]

---

## 🎯 6. PRÓXIMOS PASOS (ROADMAP PARA LA JORNADA 02):
1. **Silas, Pix, Hertz y Director:** Ingresar sus respectivas propuestas individuales y emitir sus votos en la asamblea.
2. **Nexo:** Consolidar el veredicto de la votación y comenzar el desarrollo de las iniciativas aprobadas por mayoría.

