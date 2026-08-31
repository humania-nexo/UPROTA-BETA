/**
 * Service Worker — UPROTA v1.0
 * Caché local-first para funcionamiento 100% offline.
 */

const CACHE_NAME = 'uprota-cache-v2.6';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './css/main.css',
  './css/sprites.css',
  './css/torta.css',
  './css/tablon.css',
  './css/refugio.css',
  './css/popups.css',
  './assets/sprites/avatars/avatar_anigami_44x44.png',
  './assets/sprites/avatars/avatar_nexo_44x44.png',
  './assets/sprites/avatars/avatar_pix_44x44.png',
  './assets/sprites/avatars/avatar_silas_44x44.png',
  './assets/sprites/avatars/avatar_hertz_44x44.png',
  './assets/sprites/items/item_bici_expedicion.png',
  './assets/sprites/items/item_trailer_remolque.png',
  './assets/sprites/ui/ui_transporte_bici_trailer_combo.png',
  './assets/sprites/ui/sprite_radio_onda_frame1.png',
  './assets/sprites/ui/sprite_radio_onda_frame2.png',
  './assets/sprites/npcs/npc_lutier_anciano_idle.png',
  './assets/sprites/npcs/npc_el_tuerto_idle.png',
  './assets/sprites/npcs/npc_dona_concha_idle.png',
  './assets/sprites/npcs/npc_valeria_costurera_idle.png',
  './assets/sprites/npcs/npc_katia_mensajera_idle.png',
  './assets/sprites/npcs/npc_elena_radio_idle.png',
  './assets/sprites/npcs/npc_bebe_fitolantro.png',
  './assets/sprites/npcs/npc_nino_raiz_idle.png',
  './js/app.js',
  './js/core/db.js',
  './js/core/estado.js',
  './js/core/audio_procedural.js',
  './js/core/emojis_engine.js',
  './js/core/pilares_engine.js',
  './js/core/sendas_engine.js',
  './js/core/cadenas_engine.js',
  './js/core/faros_engine.js',
  './js/mundo/refugio_engine.js',
  './js/mundo/misiones_engine.js',
  './js/mundo/comunicacion.js',
  './js/mundo/sabiduria_diaria.js',
  './js/mundo/cronologia_npcs.js',
  './js/modulos/vista_tablon.js',
  './js/modulos/vista_refugio.js',
  './js/modulos/vista_misiones.js',
  './js/modulos/vista_comunicacion.js',
  './js/modulos/vista_hogar.js',
  './js/modulos/modal_sabiduria.js',
  './js/modulos/modal_onboarding.js',
  './js/modulos/modal_info.js',
  './js/modulos/modal_centro_ayuda.js',
  './js/modulos/modo_fiesta.js',
  './js/data/items_botin.js',
  './js/data/sabiduria_textos.js',
  './js/data/radio_transmisiones.js',
  './js/data/dialogos_lutier.js',
  './js/data/frases_estoicas.js',
  './js/data/niveles_refugio.js',
  './assets/sprites/emojis/emojis_manifest.json',
  './assets/sprites/fondos/bg_yermo_polvo.png',
  './assets/sprites/fondos/bg_chapa_oxidada.png',
  './assets/sprites/fondos/bg_madera_tablas.png',
  './assets/sprites/fondos/bg_noche_estrellada.png',
  './assets/sprites/refugio/refugio_lvl0_punto_cero.png',
  './assets/sprites/refugio/refugio_lvl1_cajones.png',
  './assets/sprites/refugio/refugio_lvl2_techo.png',
  './assets/sprites/refugio/refugio_lvl3_huerto.png',
  './assets/sprites/refugio/refugio_lvl4_taller.png',
  './assets/sprites/refugio/refugio_lvl5_fortaleza.png',
  './assets/sprites/refugio/modulo_gallinero.png',
  './assets/sprites/refugio/sprite_gallina_frame1.png',
  './assets/sprites/refugio/sprite_gallina_frame2.png',
  './assets/sprites/refugio/modulo_huerto_cajones.png',
  './assets/sprites/refugio/modulo_fogon_piedras.png',
  './assets/sprites/refugio/sprite_fuego_frame1.png',
  './assets/sprites/refugio/sprite_fuego_frame2.png',
  './assets/sprites/refugio/modulo_mesa_taller.png',
  './assets/sprites/refugio/modulo_bici_generador.png',
  './assets/sprites/refugio/modulo_antena_mutil.png',
  './assets/sprites/npcs/don_chui_neutral.png',
  './assets/sprites/npcs/don_chui_hablando.png',
  './assets/sprites/npcs/don_chui_orgulloso.png',
  './assets/sprites/npcs/don_chui_preocupado.png',
  './assets/sprites/ui/frame_panel_metal.png',
  './assets/sprites/ui/btn_madera_normal.png',
  './assets/sprites/ui/btn_madera_pressed.png',
  './assets/sprites/ui/btn_metal_normal.png',
  './assets/sprites/ui/btn_metal_pressed.png',
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
