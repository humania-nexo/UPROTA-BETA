# Desarrollé un juego rítmico Web retro (Bust a Groove / PaRappa) con 0 KB de dependencias usando Vanilla JS y Web Audio procedural

¡Hola dev community!

Quería compartir un proyecto experimental que terminamos recientemente para nuestro universo transmedia: **«El Centinela del Ritmo»**.

### 🎯 El Reto Técnico: Cero dependencias y cero archivos de audio externos
La mayoría de juegos web modernos pesan entre 20MB y 100MB debido a frameworks y pistas MP3/WAV pesadas. Nuestro objetivo fue construir un minijuego rítmico completo que pesara **menos de 80 KB en total** y funcionara fluido a 60-120 FPS en cualquier smartphone sin instalar nada:

1. **Audio Síntesis 100% Procedural (Web Audio API - 0 KB):**
   - No hay ni un solo archivo `.mp3` o `.ogg`. Toda la pista de música funk/breakbeat (bombo, caja, sintetizador FM de bajo, arpegios y fanfarria) se sintetiza en tiempo real mediante nodos osciladores (`sine`, `triangle`, `square`, `sawtooth`) y envolventes ADSR matemáticas.
   
2. **Timing sin Drift (AudioContext vs requestAnimationFrame):**
   - El bucle de renderizado se desacopla del motor rítmico. Usamos `AudioContext.currentTime` como reloj maestro para que las caídas de frames del navegador jamás desincronicen las notas de las flechas.

3. **Arquitectura Vanilla JS + Canvas:**
   - Highway simétrico de 4 carriles direccionales, feedback visual elástico y soporte táctil ergonómico con `touch-action: manipulation` para cero latencia táctil en móviles.

🎮 Pueden jugarlo directamente en el navegador aquí:
👉 **[https://humania-nexo.github.io/centinela-del-ritmo/](https://humania-nexo.github.io/centinela-del-ritmo/)**

El código está abierto y publicado en GitHub. ¡Cualquier feedback sobre síntesis de audio o optimización de renderizado en Canvas es más que bienvenido!
