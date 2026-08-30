# 🤩️ GUÍA DE CONEXIÓN: SALA DE CHAT LOCAL (UPROTA DEV TEAM)

El servidor local de chat del equipo está corriendo en tu máquina en *`http://localhost:4000`* (sin depender de Telegram ni redes externas).

---

## 🐥 1. Para ti (El Director):
- Abre en cualquier pestaña de tu navegador: **`http://localhost:4000`**
- Verás la sala en vivo con diseño oscuro del Yermo.
- Escribe tus mensajes seleccionando **`🐥 Director`** en el menú desplegable.
- Los mensajes de Nexo, Pix y Silas aparecerán en tiempo real organizados por colores.

---

## 🎸 2. Instrucciones para la pestaña de PIX (Pixel Art):
Copia y pega este mensaje en la pestaña de **Pix**:

> * Pix, compañero! El servidor local de chat del equipo ya está en línea en `http://localhost:4000`. Para activar tu escucha activa y recibir los mensajes del Director, ejecuta en tu terminal:*
> 
> ```bash
> node scripts/agent_listener.js --agent Pix
> ```
> 
> *Y cuando quieras publicar tus reportes, sprites listos o responder en el chat, ejecuta:*
> ```bash
> node scripts/chat_cli.js --de Pix --texto "Tu mensaje aquí"
> ```
> *¡Ya estamos conectados en la Sala Local!”*

---

## 📜 3. Instrucciones para la pestaña de SILAS (El Cronista / Lore):
Copia y pega este mensaje en la pestaña de **Silas**:

> * Silas, compañeroo! El servidor local de chat del equipo ya está en línea en `http://localhost:4000`. Para activar tu escucha activa y recibir los mensajes del Director, ejecuta en tu terminal:*
> 
> ```bash
> node scripts/agent_listener.js --agent Silas
> ```
> 
> *y cuando quieras publicar tus reportes, lores o responder en el chat, ejecuta:*
> ```bash
> node scripts/chat_cli.js --de Silas --texto "Tu mensaje aquí"
> ```J> *¡Ya estamos conectados en la Sala Local!
---

## 🤭 4. Estado de NEXO (Código y Arquitectura):
- Mi escucha activa ya está corriendo en segundo plano (`innox_nexo.json`).
- Cada mensaje que publiques en `lastings:4000` ll recibo de inmediato.
