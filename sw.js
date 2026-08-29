/**
 * Service Worker — UPROTA v1.0
 * Caché local-first para funcionamiento 100% offline.
 */

const CACHE_NAME = 'uprota-cache-v1.3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/main.css',
  './css/sprites.css',
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
  './js/data/niveles_refugio.js',
  './assets/sprites/recursos/recurso_tablas.png',
  './assets/sprites/recursos/recurso_clavos.png',
  './assets/sprites/recursos/recurso_provisiones.png',
  './assets/sprites/recursos/recurso_agua.png',
  './assets/sprites/pilares/pilar_cuerpo.png',
  './assets/sprites/pilares/pilar_mente.png',
  './assets/sprites/pilares/pilar_espiritu.png',
  './assets/sprites/pilares/pilar_taller.png',
  './assets/sprites/pilares/torta_dorada_badge.png',
  './assets/sprites/ui/tab_tablon.png',
  './assets/sprites/ui/tab_refugio.png',
  './assets/sprites/ui/tab_misiones.png',
  './assets/sprites/ui/tab_radio.png',
  './assets/sprites/ui/tab_hogar.png',
  './assets/sprites/ui/ico_info.png',
  './assets/sprites/ui/ico_check_ok.png',
  './assets/sprites/ui/ico_candado.png',
  './assets/sprites/mecanicas/mecanica_senda.png',
  './assets/sprites/mecanicas/mecanica_cimiento.png',
  './assets/sprites/mecanicas/cadena_firme.png',
  './assets/sprites/mecanicas/cadena_tiembla.png',
  './assets/sprites/mecanicas/cadena_rota.png',
  './assets/sprites/mecanicas/faro_apagado.png',
  './assets/sprites/mecanicas/faro_encendido.png',
  './assets/sprites/items/caja_expedicion.png',
  './assets/sprites/items/item_cuchillo_mellado.png',
  './assets/sprites/items/item_cafe_solubil.png',
  './assets/sprites/items/item_cables_cobre.png',
  './assets/sprites/items/item_sal_grano.png',
  './assets/sprites/items/item_yesca_natural.png',
  './assets/sprites/items/item_biblia_don_chui.png'
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
