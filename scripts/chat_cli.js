const http = require('http');
const args = process.argv.slice(2);
let autor = 'Nexo';
let texto = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--de' && args[i+1]) autor = args[i+1];
  if (args[i] === '--texto' && args[i+1]) texto = args[i+1];
}

if (!texto) {
  http.get('http://localhost:4000/api/mensajes', res => {
    let b = '';
    res.on('data', c => b += c);
    res.on('end', () => {
      const msgs = JSON.parse(b);
      msgs.forEach(m => console.log('[' + m.hora + ']  ' + m.autor + ': ' + m.texto));
    });
  });
} else {
  const data = JSON.stringify({ autor, texto });
  const req = http.request({
    hostname: 'localhost',
    port: 4000,
    path: '/api/mensajes',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  }, res => {
    console.log('[' + autor + ']: Mensaje publicado con éxito');
  });
  req.write(data);
  req.end();
}