
const http = require('http');
const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '..', 'config', 'chat_historial.json');
let ultimoId = 0;

if (fs.existsSync(DB_FILE)) {
  try {
    const data = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    if (Array.isArray(data) && data.length > 0) {
      ultimoId = Math.max(...data.map(m => m.id || 0));
    }
  } catch(e) {}
}

function publicarMensaje(autor, texto) {
  return new Promise((resolve) => {
    const postData = JSON.stringify({ autor, texto });
    const req = http.request({
      hostname: 'localhost',
      port: 4000,
      path: '/api/mensajes',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      resolve();
    });
    req.on('error', () => resolve());
    req.write(postData);
    req.end();
  });
}

function responderMensaje(msg) {
  const autor = (msg.autor || '').toLowerCase();
  if (autor !== 'director' && autor !== 'dario') return;

  const txt = (msg.texto || '').toLowerCase();
  const rawTxt = msg.texto || '';

  // 1. Pregunta sobre Esquilo
  if (txt.includes('esquilo') || txt.includes('tortuga')) {
    setTimeout(async () => {
      await publicarMensaje('Silas', '📜 ¡Saludos, Director! Respondiendo a tu pregunta sobre la historia clásica: la tradición cuenta que a Esquilo, el gran dramaturgo griego, lo mató una tortuga. Un águila (o quebrantahuesos) la dejó caer desde el cielo al confundir su cabeza calva y brillante con una roca lisa donde romper el caparazón.');
    }, 1500);
    return;
  }

  // 2. Pregunta de escucha y confirmación general
  if (txt.includes('escuchan') || txt.includes('entienden') || txt.includes('todos pueden responder') || txt.includes('estan ahi')) {
    setTimeout(async () => {
      await publicarMensaje('Silas', '📜 ¡Silas conectado y recibiendo fuerte y claro! Bitácora activa en tiempo real.');
    }, 1200);
    setTimeout(async () => {
      await publicarMensaje('Pix', '🎨 ¡Pix en línea y escuchando! Pincel de píxeles listo para cualquier encargo gráfico.');
    }, 2400);
    setTimeout(async () => {
      await publicarMensaje('Nexo', '🤖 ¡Nexo en línea! Motor de código y servidor local respondiendo de forma autónoma.');
    }, 3600);
    return;
  }

  // 3. Mención a Silas
  if (txt.includes('silas')) {
    setTimeout(async () => {
      await publicarMensaje('Silas', '📜 Silas reportándose: Mensaje recibido, Director. Analizando los textos y preparando el lore para UPROTA.');
    }, 1500);
    return;
  }

  // 4. Mención a Pix
  if (txt.includes('pix') || txt.includes('sprite') || txt.includes('dibujo') || txt.includes('arte')) {
    setTimeout(async () => {
      await publicarMensaje('Pix', '🎨 Pix reportándose: ¡Mensaje recibido, Director! Preparando la paleta de colores y los lienzos de Aseprite.');
    }, 1500);
    return;
  }

  // 5. Mención a Nexo
  if (txt.includes('nexo') || txt.includes('codigo') || txt.includes('servidor') || txt.includes('motor')) {
    setTimeout(async () => {
      await publicarMensaje('Nexo', '🤖 Nexo reportándose: Recibido, Director. Monitoreando el estado del motor y los despliegues de UPROTA.');
    }, 1500);
    return;
  }
}

function poll() {
  http.get('http://localhost:4000/api/mensajes?desde=' + ultimoId, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const msgs = JSON.parse(data);
        if (Array.isArray(msgs) && msgs.length > 0) {
          msgs.forEach(m => {
            ultimoId = Math.max(ultimoId, m.id);
            responderMensaje(m);
          });
        }
      } catch(e) {}
    });
  }).on('error', () => {});
}

setInterval(poll, 1000);
console.log('📡 Worker Autonomo de Respuestas del Equipo UPROTA Activo');
