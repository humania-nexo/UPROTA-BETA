const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;
const DB_FILE = path.join(__dirname, '..', 'config', 'chat_historial.json');

let mensajes = [];
if (fs.existsSync(DB_FILE)) {
  try { mensajes = JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch(e) { mensajes = []; }
}

function guardar() {
  fs.writeFileSync(DB_FILE, JSON.stringify(mensajes, null, 2), 'utf8');
}

const HTML = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>UPROTA - Sala de Chat Local</title>
  <style>
    * {box-sizing:border-box;margin:0;padding:0;font-family:sans-serif;}
    body {background:#121110;color:#f5f2eb;display:flex;justify-content:center;height:100vh;}
    .container {width:100%;max-width:850px;height:100vh;display:flex;flex-direction:column;background:#1a1816;border:-left:2px solid #38342f;border-right:2px solid #38342f;}
    .head {padding:16px 20px;background:#24211e;border-bottom:2px solid #38342f;display:flex;justify-content:space-between;}
    .head h1 {font-size:1.1rem;color:#f59e0b;}
    .box {flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;}
    .msg {padding:10px 14px;border-radius:8px;max-width:83%;font-size:0.93rem;line-height:1.45;}
    .msg-Director {align-self:flex-end;background:#b45309;color:#fff;}
    .msg-Nexo {align-self:flex-start;background:#1e293b;border-left:3px solid #38bdf8;color:#f1f5f9;}
    .msg-Pix {align-self:flex-start;background:#3b1d1d;border-left:3px solid #f87171;color:#fef2f2;}
    .msg-Silas {align-self:flex-start;background:#2e1065;border-left:3px solid #c084fc;color:#faf5ff;}
    .inputs {padding:14px;background:#24211e;border-top:2px solid #38342f;display:flex;gap:8px;}
    input {flex:1;padding:10px 14px;background:#121110;border:1px solid #4f4a43;color:#fff;border-radius:6px;font-size:0.95rem;}
    select {padding:10px;background:#121110;border:1px solid #4f4a43;color:#f59e0b;font-weight:bold;border-radius:6px;}
    button {padding:10px 20px;background:#d97706;border:none;border-radius:6px;color:#fff;font-weight:bold;cursor:pointer;}
    </style>
</head>
<body>
  <div class="container">
    <div class="head">
      <h1>’쏉️ UPROTA DEV TEAM — SALA LOCAL</h1>
      <span style="color:#4ade80;">● En Línea (http://localhost:4000)</span>
    </div>
    <div class="box" id="box"></div>
    <div class="inputs">
      <select id="autor">
        <option value="Director">” Dario / Director</option>
        <option value="Nexo">🤭 Nexo (Código)</option>
        <option value="Pix">🎨 Pix (Arte)</option>
        <option value="Silas">📜 Silas (Lore)</option>
      </select>
      <input type="text" id="texto" placeholder="Escribe tu mensaje al equipo..." autofocus>
      <button onclick="enviar()">Enviar</button>
    </div>
  </div>

  <script>
    let ultimoId = 0;
    async function cargar() {
      try {
        const res = await fetch('/api/mensajes?desde=' + ultimoId);
        const data = await res.json();
        if (data && data.length > 0) {
          data.forEach(m => {
            const div = document.createElement('div');
            let clase = 'msg msg-' + m.autor;
            div.className = clase;
            div.innerHTML = '<div style="font-size:0.78rem;font-weight:bold;margin-bottom:4px;">' + m.autor + ' (' + (m.hora || '') + ')</div><div>' + m.texto.replace(/\n/g, '<br>') + '</div>';
            document.getElementById('box').appendChild(div);
            ultimoId = Math.max(ultimoId, m.id);
          });
          document.getElementById('box').scrollTop = document.getElementById('box').scrollHeight;
        }
      } catch(e) {}
    }

    async function enviar() {
      const input = document.getElementById('texto');
      const autor = document.getElementById('autor').value;
      const texto = input.value.trim();
      if (!texto) return;
      input.value = '';
      await fetch('/api/mensajes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ autor, texto })
      });
      cargar();
    }

    document.getElementById('texto').addEventListener('keypress', (ev) => {
      if (ev.key === 'Enter') enviar();
    });

    load = cargar;
    setInterval(cargar, 1000);
    cargar();
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost:' + PORT);

  if (req.method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(HTML);
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/mensajes') {
    const desde = parseInt(url.searchParams.get('desde') || '0', 10);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mensajes.filter(m => m.id > desde)));
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/mensajes') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const nuevo = {
          id: mensajes.length + 1,
          autor: data.autor || 'Director',
          texto: data.texto || '',
          hora: new Date().toLocaleTimeString('es-ES', { hour: '2d-digit', minute: '2-digit' }),
          fecha: new Date().toISOString()
        };
        mensajes.push(nuevo);
        guardar();
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(nuevo));
      } catch(e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, () => console.log('Servidor de Chat Local UPROTA iniciado en http://localhost:' + PORT));