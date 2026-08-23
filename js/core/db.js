/**
 * Módulo de Base de Datos Nativa (IndexedDB)
 * Cumple con Regla 9 de Reglas Técnicas: manejo de errores y persistencia 100% local-first.
 */

const DB_NOMBRE = 'uprota_db_v1';
const DB_VERSION = 1;

export class MotorDB {
  static dbInstancia = null;

  static async abrir() {
    if (this.dbInstancia) return this.dbInstancia;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NOMBRE, DB_VERSION);

      request.onupgradeneeded = (evento) => {
        const db = evento.target.result;

        // Tienda de estado general
        if (!db.objectStoreNames.contains('estado_app')) {
          db.createObjectStore('estado_app', { keyPath: 'id' });
        }

        // Tienda de historial diario (ventana de 21 días)
        if (!db.objectStoreNames.contains('historial_dias')) {
          db.createObjectStore('historial_dias', { keyPath: 'fecha' });
        }

        // Tienda de bitácora y eventos
        if (!db.objectStoreNames.contains('bitacora')) {
          db.createObjectStore('bitacora', { keyPath: 'id', autoIncrement: true });
        }
      };

      request.onsuccess = (evento) => {
        this.dbInstancia = evento.target.result;
        resolve(this.dbInstancia);
      };

      request.onerror = (evento) => {
        console.error('Error crítico al abrir IndexedDB:', evento.target.error);
        reject(evento.target.error);
      };
    });
  }

  static async obtener(tienda, clave) {
    const db = await this.abrir();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(tienda, 'readonly');
      const store = tx.objectStore(tienda);
      const req = store.get(clave);

      req.onsuccess = () => resolve(req.result ? req.result.datos : null);
      req.onerror = () => reject(req.error);
    });
  }

  static async guardar(tienda, clave, datos) {
    const db = await this.abrir();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(tienda, 'readwrite');
      const store = tx.objectStore(tienda);
      const req = store.put({ id: clave, fecha: clave, datos });

      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  static async obtenerTodos(tienda) {
    const db = await this.abrir();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(tienda, 'readonly');
      const store = tx.objectStore(tienda);
      const req = store.getAll();

      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }
}
