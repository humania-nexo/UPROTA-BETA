/**
 * Gestor de Estado Centralizado para UPROTA Beta
 * Sincroniza memoria y persistencia en IndexedDB.
 */

import { db } from './db.js';
import { GameEngine } from './engine.js';
import { MotorTraductor } from './traductor.js';

class GestorEstado {
  constructor() {
    this.estado = {
      perfil: {
        nombre: "Prota",
        ciudad: "Yermo Central",
        fechaInicio: new Date().toISOString(),
        bioma: "yermo"
      },
      recursos: {
        tablas: 0,
        provisiones: 0,
        clavos: 0,
        agua: 0,
        moral: 5
      },
      sendas: [],
      cadenas: [],
      faros: [],
      cimientos: [],
      conocimientosAdquiridos: [],
      ecosLiberados: [],
      historialTensadas: [],
      bitacoraEventos: [], // Historial de eventos y decisiones tomadas
      ultimoDiaRevisado: GameEngine.fechaHoyYMD(),
      diccionarioPersonal: {}
    };

    this.listeners = [];
    this.traductor = new MotorTraductor(this.estado.diccionarioPersonal);
  }

  suscribir(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notificar() {
    this.listeners.forEach(fn => fn(this.estado));
  }

  async cargar() {
    try {
      const guardado = await db.get('estado_global', 'principal');
      if (guardado) {
        this.estado = { ...this.estado, ...guardado };
        this.traductor = new MotorTraductor(this.estado.diccionarioPersonal || {});
      } else {
        // Guardar estado inicial limpio en Punto Cero
        await this.guardar();
      }
      this.notificar();
    } catch (e) {
      console.error("Error al cargar estado desde IndexedDB:", e);
    }
  }

  async guardar() {
    try {
      await db.put('estado_global', this.estado, 'principal');
      this.notificar();
    } catch (e) {
      console.error("Error al guardar estado:", e);
    }
  }

  // --- ACCIONES DE SENDAS ---
  async marcarSenda(id) {
    const hoy = GameEngine.fechaHoyYMD();
    const senda = this.estado.sendas.find(s => s.id === id);
    if (!senda) return null;

    const yaMarcadaHoy = senda.ultimoCheck === hoy;
    if (yaMarcadaHoy) return null;

    senda.ultimoCheck = hoy;
    senda.racha = (senda.racha || 0) + 1;
    senda.checksTotal = (senda.checksTotal || 0) + 1;

    const ganados = senda.recurso || { tablas: 1 };
    for (const [rec, cant] of Object.entries(ganados)) {
      this.estado.recursos[rec] = (this.estado.recursos[rec] || 0) + cant;
    }

    await this.guardar();
    return { senda, ganados };
  }

  async agregarSenda({ textoNatural, nombreLore, frecuencia, diasSemana, franjaHoraria, recurso, icono }) {
    const traduccion = this.traductor.traducirAccion(textoNatural);

    const nuevaSenda = {
      id: `senda_${Date.now()}`,
      textoNatural: textoNatural, // Texto original exacto del usuario
      nombreLore: nombreLore || traduccion.lore,
      icono: icono || traduccion.icono,
      frecuencia: frecuencia || "diario",
      diasSemana: diasSemana || ["lun", "mar", "mie", "jue", "vie", "sab", "dom"],
      franjaHoraria: franjaHoraria || "libre",
      categoria: traduccion.categoria,
      recurso: recurso || traduccion.recurso,
      racha: 0,
      checksTotal: 0,
      ultimoCheck: null,
      creadoEl: new Date().toISOString()
    };

    this.estado.sendas.push(nuevaSenda);
    await this.guardar();
    return nuevaSenda;
  }

  async editarSenda(id, datosActualizados) {
    const idx = this.estado.sendas.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.estado.sendas[idx] = { ...this.estado.sendas[idx], ...datosActualizados };
      await this.guardar();
    }
  }

  async eliminarSenda(id) {
    this.estado.sendas = this.estado.sendas.filter(s => s.id !== id);
    await this.guardar();
  }

  // --- ACCIONES DE CADENAS ---
  async agregarCadena({ textoNatural, nombreLore, icono }) {
    const traduccion = this.traductor.traducirCadena(textoNatural);
    const nuevaCadena = {
      id: `cadena_${Date.now()}`,
      textoNatural: textoNatural,
      nombreLore: nombreLore || traduccion.lore,
      icono: icono || traduccion.icono,
      recaidasMes: 0,
      ultimaRecaida: null,
      creadoEl: new Date().toISOString()
    };

    this.estado.cadenas.push(nuevaCadena);
    await this.guardar();
    return nuevaCadena;
  }

  async editarCadena(id, datosActualizados) {
    const idx = this.estado.cadenas.findIndex(c => c.id === id);
    if (idx !== -1) {
      this.estado.cadenas[idx] = { ...this.estado.cadenas[idx], ...datosActualizados };
      await this.guardar();
    }
  }

  async eliminarCadena(id) {
    this.estado.cadenas = this.estado.cadenas.filter(c => c.id !== id);
    await this.guardar();
  }

  async registrarCadenaTensada(id) {
    const hoy = GameEngine.fechaHoyYMD();
    const ahoraISO = new Date().toISOString();
    const cadena = this.estado.cadenas.find(c => c.id === id);
    if (!cadena) return null;

    cadena.recaidasMes = (cadena.recaidasMes || 0) + 1;
    cadena.ultimaRecaida = hoy;

    this.estado.historialTensadas.push({
      cadenaId: id,
      cadenaNombre: cadena.nombreLore,
      textoNatural: cadena.textoNatural,
      fecha: hoy,
      timestamp: ahoraISO
    });

    this.estado.recursos.moral = (this.estado.recursos.moral || 0) + 2;
    await this.guardar();
    return cadena;
  }

  // --- ACCIONES DE FAROS ---
  async agregarFaro({ textoNatural, nombreLore, metaMonto, actualMonto, unidad, icono }) {
    const nuevoFaro = {
      id: `faro_${Date.now()}`,
      textoNatural: textoNatural,
      nombreLore: nombreLore || `Faro: ${textoNatural}`,
      metaMonto: Number(metaMonto) || 1000,
      actualMonto: Number(actualMonto) || 0,
      unidad: unidad || "$",
      icono: icono || "🕯️",
      creadoEl: new Date().toISOString()
    };

    this.estado.faros.push(nuevoFaro);
    await this.guardar();
    return nuevoFaro;
  }

  async editarFaro(id, datosActualizados) {
    const idx = this.estado.faros.findIndex(f => f.id === id);
    if (idx !== -1) {
      this.estado.faros[idx] = { ...this.estado.faros[idx], ...datosActualizados };
      await this.guardar();
    }
  }

  async eliminarFaro(id) {
    this.estado.faros = this.estado.faros.filter(f => f.id !== id);
    await this.guardar();
  }

  // --- BITÁCORA Y EVENTOS ---
  async registrarEventoEnBitacora({ eventoId, titulo, decision, resultado, fecha }) {
    if (!this.estado.bitacoraEventos) this.estado.bitacoraEventos = [];
    this.estado.bitacoraEventos.unshift({
      id: `cronica_${Date.now()}`,
      eventoId,
      titulo,
      decision,
      resultado,
      fecha: fecha || GameEngine.fechaHoyYMD(),
      timestamp: new Date().toISOString()
    });
    await this.guardar();
  }

  // --- CONOCIMIENTO / RADIO ---
  async adquirirConocimiento(conocimientoId) {
    if (!this.estado.conocimientosAdquiridos.includes(conocimientoId)) {
      this.estado.conocimientosAdquiridos.push(conocimientoId);
      this.estado.recursos.moral = (this.estado.recursos.moral || 0) + 3;
      await this.guardar();
      return true;
    }
    return false;
  }

  async actualizarCiudad(ciudad) {
    this.estado.perfil.ciudad = ciudad || "Yermo Central";
    await this.guardar();
  }

  async aplicarCambioRecursos(cambios) {
    for (const [rec, cant] of Object.entries(cambios)) {
      this.estado.recursos[rec] = Math.max(0, (this.estado.recursos[rec] || 0) + cant);
    }
    await this.guardar();
  }
}

export const estadoApp = new GestorEstado();
