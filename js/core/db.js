/**
 * Wrapper de IndexedDB nativo para UPROTA Beta
 * Almacenamiento asíncrono, robusto y sin límites de localStorage.
 */

const DB_NAME = 'uprota_yermo_db';
const DB_VERSION = 1;

class DB {
  constructor() {
    this.db = null;
  }

  async init() {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Stores principales
        if (!db.objectStoreNames.contains('estado_global')) {
          db.createObjectStore('estado_global');
        }
        if (!db.objectStoreNames.contains('sendas')) {
          db.createObjectStore('sendas', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('cadenas')) {
          db.createObjectStore('cadenas', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('faros')) {
          db.createObjectStore('faros', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('historial_checks')) {
          db.createObjectStore('historial_checks', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('conocimientos')) {
          db.createObjectStore('conocimientos', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('ecos')) {
          db.createObjectStore('ecos', { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve(this.db);
      };

      request.onerror = (event) => {
        console.error('Error al abrir IndexedDB:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  async get(storeName, key) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll(storeName) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async put(storeName, value, key = null) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = key ? store.put(value, key) : store.put(value);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async delete(storeName, key) {
    await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

export const db = new DB();
