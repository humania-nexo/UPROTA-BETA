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
- **Incorporacion e Investigacion:** Desarrollo el documento maestro UPROTA_Paisaje_Sonoro_y_Arquitectura_Audio.md.
- **Arquitectura de Tracker:** Especifico el motor de 3 canales (Pulse 12.5/25%, Triangle anti-click, Noise filtrado) con Lookahead Scheduler y cero fugas de memoria.
- **Diseno de los Primeros 3 Temas:** Definio la escala, BPM y caracter para El Alba en el Refugio, Ecos de la Noche y el jingle Frecuencia 104.5.

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

---

- **Progresión de Transporte Make-to-Win (De Bolsa a Bici-Trailer):** Estableció la visión de progresión de carga terrestre: desde la humilde bolsa ecológica rota (8 kg), pasando por la restauración en taller de una **Bicicleta del viejo mundo** (35 kg), hasta la construcción de un **Carrito Trailer / Remolque de Carga Pesada** (85 kg) para transportar materiales pesados y botín masivo.

---

## 🎯 4. PRÓXIMOS PASOS (ROADMAP PARA LA JORNADA 02):
1. **Pix:** [COMPLETADO] Logotipo oficial y 5 avatares del equipo entregados. **Nuevo encargo:** Diseñar sprites de la Bicicleta de expedición y el Carrito Trailer Remolque de carga.
2. **Silas:** Avanzar con el diseño de las Expediciones de 24 horas, los encuentros aleatorios del valle y la narrativa del hallazgo del cuadro de la bicicleta en los talleres abandonados.
3. **Hertz:** Entregar las partituras en código de los 3 primeros temas en `js/data/musica_chiptune.js`.
4. **Nexo:** Conectar el secuenciador de audio procedural a los botones del Tablón, Refugio y Radio.
