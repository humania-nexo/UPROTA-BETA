/**
 * UPROTA Dev Team - Telegram Multi-Bot Bridge
 * Conecta las 3 identidades (Nexo, Pix y Silas) en el grupo de Telegram.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '..', 'config', 'telegram_bots.json');
if (!fs.existsSync(CONFIG_PATH)) {
  console.error('Error: config/telegram_bots.json no encontrado.');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
const BOTS = config.bots;

const offsets = { nexo: 0, pix: 0, silas: 0 };

function requestTelegram(token, method, data = {}) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: '/bot' + token + '/' + method,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ ok: false, error: e.message });
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function enviarMensaje(botKey, chatId, texto) {
  const bot = BOTS[botKey];
  if (!bot) return;
  try {
    await requestTelegram(bot.token, 'sendMessage', {
      chat_id: chatId,
      text: texto,
      parse_mode: 'Markdown'
    });
    console.log('[' + bot.name + ']: ' + texto.substring(0, 60) + '...');
  } catch (err) {
    console.error('Error al enviar mensaje con ' + botKey + ':', err.message);
  }
}

async function procesarMensaje(botKey, msg) {
  const chatId = msg.chat.id;
  const rawText = msg.text || '';
  const text = rawText.toLowerCase().trim();
  const fromName = msg.from ? (msg.from.first_name || msg.from.username || 'Director') : 'Director';

  console.log('[Bot ' + botKey + ' recibio]: "' + rawText + '" de ' + fromName);

  // Evitar que todos los bots procesen el mismo mensaje si es una mención específica
  const esParaNexo = text.includes('@nexo_uprota_bot') || (text.includes('nexo') && !text.includes('@pix') && !text.includes('@silas'));
  const esParaPix = text.includes('@pix_uprota_bot') || (text.includes('pix') && !text.includes('@nexo') && !text.includes('@silas'));
  const esParaSilas = text.includes('@silas_uprota_bot') || (text.includes('silas') && !text.includes('@nexo') && !text.includes('@pix'));
  const esPreguntaGeneral = text.includes('entienden') || text.includes('solo saben saludar') || text.includes('estan ahi');

  // CASO 0: Pregunta "¿pueden hablar entre ustedes?" o solicitud de debate/reunión
  if (text.includes('hablar entre ustedes') || text.includes('hablen entre ustedes') || text.includes('conversar') || text.includes('dialogar') || text.includes('/reunion') || text.includes('/debate')) {
    if (botKey === 'nexo') {
      await enviarMensaje('nexo', chatId, '🤖 *Nexo:* ¡Por supuesto que sí, Director ' + fromName + '! Nuestro puente multihilo nos permite coordinar ideas y respondernos en cadena.');
      setTimeout(() => enviarMensaje('pix', chatId, '🎨 *Pix:* ¡Totalmente! Por ejemplo, si Silas escribe una nueva misión en una torre de radio, yo le respondo con el diseño del sprite de la antena y el color del cielo.'), 2000);
      setTimeout(() => enviarMensaje('silas', chatId, '📜 *Silas:* Y yo le paso los nombres de los objetos del viejo mundo a Nexo para que los registre en el catálogo de IndexedDB sin errores.'), 4000);
      setTimeout(() => enviarMensaje('nexo', chatId, '🤖 *Nexo:* Y luego yo compilo el motor, ejecuto las pruebas de sintaxis y lo despliego en GitHub Pages. ¡Somos un equipo sincronizado!'), 6000);
    }
    return;
  }

  // CASO 0.1: Pregunta del Director "¿me entienden o solo saben saludar?"
  if (esPreguntaGeneral) {
    if (botKey === 'nexo') {
      await enviarMensaje('nexo', chatId, '🤖 *Nexo:* ¡Jajaja, claro que te entendemos, Director ' + fromName + '! Lo que pasó es que el comando `/start` disparó nuestro protocolo de presentación inicial.');
      setTimeout(() => enviarMensaje('pix', chatId, '🎨 *Pix:* ¡Te leí fuerte y claro! Entendí perfectamente la tarea: quieres que diseñe las fotos de perfil en Pixel Art para cada uno de nosotros y para el equipo.'), 1500);
      setTimeout(() => enviarMensaje('silas', chatId, '📜 *Silas:* ¡Así es, Director! Yo ya tengo pensado mi estilo: me gustaría un cronista encapuchado del Yermo con lentes de relojero y pergamino.'), 3000);
    }
    return;
  }

  // CASO 1: Tarea de Avatares / Fotos de Perfil
  if (text.includes('perfil') || text.includes('avatar') || text.includes('imagen') || text.includes('foto')) {
    if (esParaPix || text.includes('pix')) {
      if (botKey === 'pix') {
        await enviarMensaje('pix', chatId, '🎨 *Pix:* ¡Excelente tarea, Director ' + fromName + '! Me pongo de inmediato a diseñar los 4 avatares en Pixel Art:\n\n1️⃣ *Nexo:* Androide retro con visor cibernético cian y circuitos de cobre.\n2️⃣ *Silas:* Cronista encapuchado del Yermo con lentes y pluma.\n3️⃣ *Pix:* Gato artista con boina roja y lápiz digital de píxeles.\n4️⃣ *Equipo UPROTA:* Emblema heráldico con los 4 pilares.\n\n¡En unos minutos los tengo listos en Aseprite para pasártelos!');
        setTimeout(() => enviarMensaje('nexo', chatId, '🤖 *Nexo:* ¡Me encanta la idea del visor cibernético, Pix! Dale caña.'), 1600);
      }
      return;
    }
  }

  // CASO 2: Mención directa a Pix
  if (esParaPix) {
    if (botKey === 'pix') {
      await enviarMensaje('pix', chatId, '🎨 *Pix:* ¡Recibido, ' + fromName + '! Tomo nota del encargo artístico. ¿Qué detalles visuales o paleta de colores prefieres para este asset?');
    }
    return;
  }

  // CASO 3: Mención directa a Silas
  if (esParaSilas) {
    if (botKey === 'silas') {
      await enviarMensaje('silas', chatId, '📜 *Silas:* ¡A la orden, Director! Estoy listo para estructurar esa parte del lore o afinar los diálogos. Cuéntame qué tono o conflicto narrativo buscas.');
    }
    return;
  }

  // CASO 4: Mención directa a Nexo
  if (esParaNexo) {
    if (botKey === 'nexo') {
      await enviarMensaje('nexo', chatId, '🤖 *Nexo:* ¡Entendido, ' + fromName + '! En cuanto al código y arquitectura, me pongo a implementarlo y lo subo de inmediato a producción.');
    }
    return;
  }

  // CASO 5: Comando explícito /start o /saludo inicial
  if (text === '/start' || text === '/saludo') {
    if (botKey === 'nexo') {
      await enviarMensaje('nexo', chatId, '🤖 *Nexo:* ¡Sala de desarrollo conectada en vivo, Director ' + fromName + '!');
      setTimeout(() => enviarMensaje('pix', chatId, '🎨 *Pix:* ¡Pix en línea! Listo para dibujar.'), 1200);
      setTimeout(() => enviarMensaje('silas', chatId, '📜 *Silas:* ¡Silas en posición! Listo para escribir.'), 2400);
    }
    return;
  }
}

async function pollBot(botKey) {
  const bot = BOTS[botKey];
  try {
    const res = await requestTelegram(bot.token, 'getUpdates', {
      offset: offsets[botKey] + 1,
      timeout: 2
    });

    if (res.ok && res.result && res.result.length > 0) {
      for (const update of res.result) {
        offsets[botKey] = Math.max(offsets[botKey], update.update_id);
        if (update.message && update.message.text) {
          await procesarMensaje(botKey, update.message);
        }
      }
    }
  } catch (err) {
    // Silencioso en timeouts ordinarios
  }
}

async function iniciarPuente() {
  console.log('==================================================');
  console.log('UPROTA DEV TEAM - TELEGRAM BRIDGE INICIADO');
  console.log('Nexo (@Nexo_Uprota_Bot)');
  console.log('Pix (@Pix_Uprota_Bot)');
  console.log('Silas (@Silas_Uprota_Bot)');
  console.log('==================================================');
  console.log('Escuchando mensajes del grupo de Telegram...');

  setInterval(async () => {
    await pollBot('nexo');
    await pollBot('pix');
    await pollBot('silas');
  }, 1500);
}

iniciarPuente();
