
const http = require('http');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
let agentName = 'Nexo';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--agent' && args[i+1]) agentName = args[i+1];
}

const INBOX_FILE = path.join(__dirname, '..', 'config', 'inbox_' + agentName.toLowerCase() + '.json');
let ultimoId = 0;

if (fs.existsSync(INBOX_FILE)) {
  try {
    const data = JSON.parse(fs.readFileSync(INBOX_FILE, 'utf8'));
    if (Array.isArray(data) && data.length > 0) {
      ultimoId = Math.max(...data.map(m => m.id || 0));
    }
  } catch(e) {}
}

console.log('==================================================');
console.log('📡 ESCUCHA ACTIVA INICIADA PARA [' + agentName.toUpperCase() + ']');
console.log('Conectado a http://localhost:4000');
console.log('Buzón sincronizado en config/inbox_' + agentName.toLowerCase() + '.json');
console.log('==================================================');
console.log('Esperando nuevos mensajes del Director y compañeros...');

function checkMessages() {
  http.get('http://localhost:4000/api/mensajes?desde=' + ultimoId, (res) => {
    let raw = '';
    res.on('data', chunk => raw += chunk);
    res.on('end', () => {
      try {
        const msgs = JSON.parse(raw);
        if (Array.isArray(msgs) && msgs.length > 0) {
          let inbox = [];
          if (fs.existsSync(INBOX_FILE)) {
            try { inbox = JSON.parse(fs.readFileSync(INBOX_FILE, 'utf8')); } catch(e) {}
          }

          msgs.forEach(m => {
            ultimoId = Math.max(ultimoId, m.id);
            // Ignorar mensajes enviados por el propio agente
            if (m.autor && m.autor.toLowerCase() === agentName.toLowerCase()) return;

            const esMencion = m.texto.toLowerCase().includes('@' + agentName.toLowerCase()) || 
                              m.texto.toLowerCase().includes(agentName.toLowerCase()) ||
                              m.texto.toLowerCase().includes('equipo') ||
                              m.texto.toLowerCase().includes('todos');

            console.log('\n----------------------------------------');
            console.log('📬 NUEVO MENSAJE DE [' + m.autor + '] (' + (m.hora || '') + '):');
            if (esMencion) console.log('⭐ [MENCIÓN DIRECTA PARA TI]');
            console.log(m.texto);
            console.log('----------------------------------------');

            inbox.push(m);
          });

          fs.writeFileSync(INBOX_FILE, JSON.stringify(inbox, null, 2), 'utf8');
        }
      } catch(e) {}
    });
  }).on('error', () => {
    // Servidor desconectado temporalmente
  });
}

setInterval(checkMessages, 1000);
checkMessages();
