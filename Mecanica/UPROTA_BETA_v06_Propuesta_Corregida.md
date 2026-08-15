# UPROTA BETA v0.6 - Propuesta Funcional Corregida
### Versión con fallas técnicas resueltas - Arquitectura honesta para BETA real
Actualizado tras revisión técnica: Notificaciones y DB

---

## CAMBIOS RESPECTO A v0.5 (IMPORTANTE)

1. **db.js: localStorage -> IndexedDB desde día 1** - Evita deuda técnica, límite 5MB y bloqueo de hilo
2. **reminders.js: No se promete push con app cerrada sin servidor** - Sistema honesto de 2 capas, con prueba previa obligatoria
3. **Eventos micro: No es "mismo evento fijo"** - Es micro aleatorio del pool sin repetir semana anterior

---

## 1. CONCEPTO BETA v0.6

Mismo concepto, pero con arquitectura que sí funciona en iOS y Android real sin servidor.

Puro emoji + texto, PWA instalable, offline, radio con TTS, pero con recordatorios honestos.

---

## 2. ARQUITECTURA MODULAR CORREGIDA

```
/UPROTA-BETA
├── index.html (40 líneas)
├── manifest.json
├── sw.js (offline + intento de sync experimental)
├── css/ (igual que v0.5)
├── js/
│   ├── app.js
│   ├── pwa/install.js
│   ├── core/
│   │   ├── db.js -> AHORA IndexedDB con wrapper idb (NO localStorage)
│   │   ├── engine.js
│   │   └── estado.js
│   ├── refugio/ (igual)
│   ├── radio/ (igual)
│   ├── eventos/
│   │   ├── loader.js (lee data/eventos/*.json)
│   │   └── selector.js (con regla noRepeatLast)
│   └── notificaciones/
│       ├── permisos.js
│       └── reminders.js -> AHORA sistema 2 capas honesto
└── data/ (igual, eventos en JSON externos)
```

---

## 3. CORRECCIÓN 1: db.js - IndexedDB desde el inicio

**Problema v0.5:** localStorage es síncrono, bloquea UI en escrituras grandes, límite 5-10MB. Si guardamos historial de 90 días de ecos, eventos, conocimientos, se llena y se congela.

**Solución v0.6:** IndexedDB con wrapper ligero. Misma simplicidad de uso, sin límites.

```js
// js/core/db.js - v0.6
import { openDB } from 'idb'; // librería de 1kb

const dbPromise = openDB('uprota-db', 1, {
  upgrade(db) {
    db.createObjectStore('estado');
    db.createObjectStore('ecos_pendientes', { keyPath: 'id' });
    db.createObjectStore('eventos_historial');
    db.createObjectStore('conocimientos');
    db.createObjectStore('sendas');
  }
});

// Uso igual de fácil que localStorage, pero async y sin límite
export async function saveEstado(estado) {
  const db = await dbPromise;
  await db.put('estado', estado, 'actual');
}
export async function getEcosPendientes() {
  const db = await dbPromise;
  return db.getAll('ecos_pendientes');
}
```

**Para BETA:** Volumen pequeño, pero ya no tenemos que migrar después. No es error usar localStorage en BETA, pero si podemos evitar deuda técnica desde hoy, mejor.

---

## 4. CORRECCIÓN 2: reminders.js - Sistema honesto de 2 capas (FALLA CRÍTICA RESUELTA)

**Problema real detectado en revisión:**
Notification API NO programa notificaciones futuras con app cerrada. `setTimeout` muere al cerrar pestaña. Push real requiere servidor (Firebase, etc) y rompe arquitectura "sin servidor, gratis en GitHub Pages".

Notification Triggers API (`showTrigger`) existió como Origin Trial en Chrome pero no está estandarizado, no funciona en iOS Safari. Periodic Background Sync solo Chrome/Android y no es exacto.

**Solución v0.6 - No prometer lo que el stack no puede:**

### Capa A - Confiable 100% - Aviso al abrir app (BASE DE BETA)
Funciona siempre, iOS, Android, sin servidor, offline.

Flujo:
1. Usuario crea Senda: { actividad: "regar", dias: [2,5], hora: "19:00", notificar: true }
2. Guarda en IndexedDB
3. Cada vez que abre la app, `app.js` llama `engine.checkSendasProximas()`
4. `checkSendasProximas()` calcula:
   - Si Senda es en <15 min o hace <30 min y no marcada como hecha
   - Lanza modal nativo interno + vibración + sonido estática radio
   - Ejemplo: "Prota, en 12 min tenías Senda de Riego 🌱. Tu vivero te espera. ¿La hiciste?"

```js
// js/notificaciones/reminders.js - Capa A (100% fiable)
export function checkSendasProximas() {
  const ahora = new Date();
  // revisa sendas de hoy
  sendas.forEach(senda => {
    const diffMin = (senda.hora - ahora) / 60000;
    if (diffMin <= 15 && diffMin >= -30 && !senda.hechaHoy) {
      mostrarAvisoInterno(senda); // modal + navigator.vibrate([200,100,200])
    }
  });
}
// Se ejecuta al abrir app + cada 5 min con setInterval mientras app abierta
```

**Copy honesto para pedir permiso:** 
> "¿Te avisamos cuando abras el refugio si tienes una Senda cerca? No es push con app cerrada en esta BETA, pero si abres el refugio te avisamos con tiempo. Push real con app cerrada viene en v1.0 con servidor."

### Capa B - Experimental - Push con app cerrada (SOLO SI PASA PRUEBA HOY)
**Obligatorio hacer prueba de 1 minuto ANTES de codear módulo completo:**

Prueba mínima hoy mismo en tu teléfono:
```js
// en sw.js test
self.registration.showNotification("Test 1 min", { 
  body: "Si ves esto con app cerrada, funciona",
  showTrigger: new TimestampTrigger(Date.now() + 60000) 
});
```

- Cierra app completamente, espera 1 min
- ¿Llegó en Android Chrome? ¿En iOS Safari? Anota resultado
- **Si falla en iOS (lo esperado):** Documentamos en README: "BETA v0.6: Recordatorios funcionan al abrir app. Push con app cerrada solo experimental en Android Chrome, no iOS por limitación del navegador. Requiere backend para v1.0"
- **Si funciona en tu Android:** Lo dejamos como feature extra solo para Android, con fallback a Capa A

**No construir reminders.js completo alrededor de supuesto de push cerrado hasta hacer este test de 1 minuto en teléfono real.**

---

## 5. CORRECCIÓN 3: Eventos micro - Aleatorio no repetitivo

**Problema v0.5:** Si "1 micro fijo garantizado" se interpreta literal, es mismo zorro cada 7 días = repetitivo y aburrido.

**Solución v0.6:**

```js
// js/eventos/selector.js
export function elegirMicroSemanal(poolNivel, historial) {
  const pool = poolNivel.filter(e => e.tipo === 'micro');
  const ultimoMicro = historial[historial.length -1]?.id;
  const candidatos = pool.filter(e => e.id !== ultimoMicro); // evita repetir inmediata
  return candidatos[Math.floor(Math.random() * candidatos.length)];
}
```

Dosificación final BETA:
- 1 micro aleatorio del pool del nivel actual (no repetir semana anterior) = garantizado
- 1 variable (puede ser vacío si dado falla, 60% prob de salir) = validado por nivel + prob + modificadores
- Max 2 eventos/semana, nunca 2 seguidos mismo tipo

---

## 6. FLUJO BETA v0.6 CORREGIDO CON EMOJI

Día 1 Nivel 0:
> 🛖 Refugio 0: 10🥕 10💧
> Evento: 🦊🐔 aleatorio (esta semana zorro, la próxima gotera, no mismo)
> Senda: 🌱 Mar/Vie 19:00

Día 7 - Recordatorio honesto:
> 18:45 app cerrada: NO llega push (porque no hay servidor aún)
> 19:02 abres app: Modal grande + vibración "Prota, tenías Senda de Riego hace 2 min 🌱 ¿La hiciste?" [Sí, la hice / Posponer 30 min]

Día 21 Nivel 2:
> 🛖 Nivel 2! 📻 Radio desbloqueada!
> Modal PWA: "¿Anclar refugio?" [Sí]
> Modal notif honesto: "¿Te avisamos al abrir refugio si tienes Senda cerca? (Push con app cerrada viene en v1.0)" [Sí]

Día 30 Conocimiento:
> 📻 Programa velas con ▶️ TTS
> Escuchas completo -> IndexedDB marca conocimiento = true -> desbloquea cimiento 🕯️

Todo guardado en IndexedDB, sin límite, sin bloqueo.

---

## 7. CHECKLIST ANTES DE PICAR CÓDIGO HOY (OBLIGATORIO)

1. [ ] Hacer test de notificación 1 minuto con app cerrada en tu teléfono (Android e iOS si tienes)
2. [ ] Anotar resultado en README: ¿funciona push cerrado?
3. [ ] Generar db.js con IndexedDB + idb wrapper (te lo genero yo)
4. [ ] Generar reminders.js solo con Capa A (aviso al abrir app) - Capa B solo si test pasa
5. [ ] Actualizar selector.js con regla noRepeatLast

Si hacemos esto, llegamos a BETA jugable real sin prometer push que no podemos cumplir sin servidor.

Este documento v0.6 reemplaza v0.5. Es la biblia técnica honesta para construir hoy.
