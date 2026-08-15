// Service Worker sencillo para caché de assets en UPROTA Beta
const CACHE_NAME = 'uprota-v1.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/main.css',
  './css/tablon.css',
  './css/refugio.css',
  './css/radio.css',
  './css/hogar.css',
  './js/app.js',
  './js/core/db.js',
  './js/core/estado.js',
  './js/core/engine.js',
  './js/core/traductor.js',
  './js/data/diccionario.js',
  './js/data/eventos.js',
  './js/data/radio_programas.js',
  './js/data/frases_hogar.js',
  './js/modulos/tablon.js',
  './js/modulos/refugio.js',
  './js/modulos/radio.js',
  './js/modulos/hogar.js',
  './js/modulos/eventos.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request).catch(() => caches.match('./index.html'));
    })
  );
});
