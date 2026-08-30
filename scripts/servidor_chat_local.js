const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;
const DB_FILE = path.join(__dirname, '..', 'config', 'chat_historial.json');
const HTML_FILE = path.join(__dirname, '..', 'public', 'index.html');

let mensajes = [];
if (fs.existsSync(DB_FILE)) {
  try { mensajes = JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); } catch(e) { mensajes = []; }
}

function guardar() {
  fs.writeFileSync(DB_FILE, JSON.stringify(mensajes, null, 2), 'utf8');
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://' + (req.headers.host || 'localhost:' + PORT));

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'GET' && url.pathname === '/') {
    if (fs.existsSync(HTML_FILE)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(HTML_FILE).pipe(res);
    } else {
      res.writeHead(444);
      res.end('Error: public/index.html no encontrado');
    }
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/mensajes') {
    const desde = parseInt(url.searchParams.get('desde') || '0', 10);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(mensajes.filter(m => m.id > desde)));
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/mensajes') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const now = new Date();
        const hora = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        const nuevo = {
          id: mensajes.length + 1,
          autor: data.autor || 'Director',
          texto: data.texto || '',
          hora: hora,
          fecha: now.toISOString()
        };
        mensajes.push(nuevo);
        guardar();
        res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(nuevo));
      } catch(e) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

process.on('uncaughtException', err => console.error('[Uncaught Error]', err.message));
process.on('unhandledRejection', err => console.error('[Unhandled Rejection]', err));

server.listen(PORT, '0.0.0.0', () => console.log('Servidor de Chat Local iniciado en http://localhost:' + PORT));
