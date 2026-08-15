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
        ciudad: "Mazatlán",
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
        // Datos iniciales de demostración si es primera vez
        await this.inicializarDatosPorDefecto();
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

  async inicializarDatosPorDefecto() {
    this.estado.sendas = [
      {
        id: "senda_1",
        nombreOriginal: "Hacer ejercicio 20min",
        nombreLore: "Patrulla del perímetro",
        icono: "🏃",
        frecuencia: "2x", // 2x por semana
        categoria: "cuerpo",
        recurso: { provisiones: 3, agua: 1 },
        racha: 0,
        checksSemana: 0,
        ultimoCheck: null
      },
      {
        id: "senda_2",
        nombreOriginal: "Lavar los platos",
        nombreLore: "Purificar utensilios del clan",
        icono: "🥣",
        frecuencia: "diario",
        categoria: "hogar",
        recurso: { tablas: 2, moral: 1 },
        racha: 0,
        checksSemana: 0,
        ultimoCheck: null
      }
    ];

    this.estado.cadenas = [
      {
        id: "cadena_1",
        nombreOriginal: "Refresco",
        nombreLore: "Jarabe Corrosivo",
        icono: "🥤",
        recaidasMes: 0,
        ultimaRecaida: null
      }
    ];

    this.estado.faros = [
      {
        id: "faro_1",
        nombreLore: "Fortificar Cisterna Principal",
        metaMonto: 5000,
        actualMonto: 1500,
        unidad: "$",
        icono: "🪙"
      }
    ];

    await this.guardar();
  }

  // Acciones de Sendas
  async marcarSenda(id) {
    const hoy = GameEngine.fechaHoyYMD();
    const senda = this.estado.sendas.find(s => s.id === id);
    if (!senda) return null;

    const yaMarcadaHoy = senda.ultimoCheck === hoy;
    if (yaMarcadaHoy) return null; // Ya se marcó hoy

    // Actualizar senda
    senda.ultimoCheck = hoy;
    senda.racha = (senda.racha || 0) + 1;
    senda.checksSemana = (senda.checksSemana || 0) + 1;

    // Entregar recursos
    const ganados = senda.recurso || { tablas: 1 };
    for (const [rec, cant] of Object.entries(ganados)) {
      this.estado.recursos[rec] = (this.estado.recursos[rec] || 0) + cant;
    }

    await this.guardar();
    return { senda, ganados };
  }

  async agregarSenda(nombreOriginal, frecuencia = "diario", nombreLore = null, icono = null, recursos = null) {
    const traduccion = this.traductor.traducirAccion(nombreOriginal);
    const nuevaSenda = {
      id: `senda_${Date.now()}`,
      nombreOriginal,
      nombreLore: nombreLore || traduccion.lore,
      icono: icono || traduccion.icono,
      frecuencia,
      categoria: traduccion.categoria,
      recurso: recursos || traduccion.recurso,
      racha: 0,
      checksSemana: 0,
      ultimoCheck: null
    };

    this.estado.sendas.push(nuevaSenda);
    await this.guardar();
    return nuevaSenda;
  }

  // Acciones de Cadenas (Tensadas)
  async registrarCadenaTensada(id) {
    const hoy = GameEngine.fechaHoyYMD();
    const ahoraISO = new Date().toISOString();
    const cadena = this.estado.cadenas.find(c => c.id === id);
    if (!cadena) return null;

    cadena.recaidasMes = (cadena.recaidasMes || 0) + 1;
    cadena.ultimaRecaida = hoy;

    // Registrar en historial para auto-evidencia
    this.estado.historialTensadas.push({
      cadenaId: id,
      cadenaNombre: cadena.nombreLore,
      fecha: hoy,
      timestamp: ahoraISO
    });

    // Otorgar +5 de Claridad / Moral por volver y admitirlo
    this.estado.recursos.moral = (this.estado.recursos.moral || 0) + 2;

    await this.guardar();
    return cadena;
  }

  // Acciones de Conocimiento / Radio
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
    this.estado.perfil.ciudad = ciudad || "Mazatlán";
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
