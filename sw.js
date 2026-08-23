/**
 * Service Worker — UPROTA v1.0
 * Caché local-first para funcionamiento 100% offline.
 */

const CACHE_NAME = 'uprota-cache-v1.2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/main.css',
  './css/torta.css',
  './css/tablon.css',
  './css/refugio.css',
  './css/popups.css',
  './js/app.js',
  './js/core/db.js',
  './js/core/estado.js',
  './js/core/pilares_engine.js',
  './js/core/sendas_engine.js',
  './js/core/cadenas_engine.js',
  './js/core/faros_engine.js',
  './js/mundo/refugio_engine.js',
  './js/mundo/misiones_engine.js',
  './js/mundo/comunicacion.js',
  './js/mundo/sabiduria_diaria.js',
  './js/modulos/vista_tablon.js',
  './js/modulos/vista_refugio.js',
  './js/modulos/vista_misiones.js',
  './js/modulos/vista_comunicacion.js',
  './js/modulos/vista_hogar.js',
  './js/modulos/modal_sabiduria.js',
  './js/modulos/modal_onboarding.js',
  './js/modulos/modal_info.js',
  './js/data/items_botin.js',
  './js/data/sabiduria_textos.js',
  './js/data/frases_estoicas.js',
  './js/data/niveles_refugio.js'
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
        keys.map((k) => {
          if (k !== CACHE_NAME) return caches.delete(k);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
