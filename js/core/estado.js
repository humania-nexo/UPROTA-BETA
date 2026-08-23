/**
 * Gestor Central de Estado Reactivo (Store)
 * Desacoplado, modular y persistente en IndexedDB.
 */

import { MotorDB } from './db.js';
import { PilaresEngine } from './pilares_engine.js';
import { NIVELES_REFUGIO } from '../data/niveles_refugio.js';

export class EstadoApp {
  static CLAVE_ESTADO = 'uprota_estado_global';

  constructor() {
    this.suscriptores = [];
    this.datos = this.generarEstadoInicial();
  }

  generarEstadoInicial() {
    return {
      perfil: {
        nombre: 'Prota',
        ciudad: 'Yermo Central',
        fechaInicio: new Date().toISOString().split('T')[0],
        onboardingCompletado: false
      },
      nivelRefugio: 0,
      recursos: {
        tablas: 5,
        clavos: 4,
        provisiones: 2,
        aguaLitros: 3,
        moral: 10
      },
      bolsa: {
        tipo: 'Bolsa ecológica rota',
        capacidadKg: 8.0,
        pesoActualKg: 1.2,
        espaciosMax: 6,
        items: [
          { id: 'item_001', nombre: 'Clavos oxidados', pesoKg: 0.5, cantidad: 4 },
          { id: 'item_008', nombre: 'Tabla de pino suelta', pesoKg: 1.2, cantidad: 2 }
        ]
      },
      bioenergia: {
        nivelCarga: 80, // 0 a 100%
        biciGeneradorConstruido: false,
        lucesLedEncendidas: true,
        radioEncendida: false
      },
      comunicacion: {
        fase: 0, // 0: Silencio, 1: Radio onda corta, 2: WAN local
        frecuenciaSintonizada: 104.5,
        estacionesDisponibles: ['104.5 Yermo Libre'],
        transmisionesEscuchadas: []
      },
      sendas: [],
      cimientos: [],
      cadenas: [],
      faros: [],
      objetosSabiduriaActivos: ['obj_biblia_chui'], // Biblia de Don Chui activa por defecto
      objetosSabiduriaInventario: ['obj_biblia_chui'],
      sabiduriaVistoHoy: false,
      misionRealizadaHoy: false,
      ultimaFechaAcceso: new Date().toISOString().split('T')[0]
    };
  }

  async inicializar() {
    try {
      const guardado = await MotorDB.obtener('estado_app', EstadoApp.CLAVE_ESTADO);
      if (guardado) {
        // Fusionar con estado inicial para compatibilidad si hay nuevas propiedades
        this.datos = { ...this.generarEstadoInicial(), ...guardado };
      } else {
        await this.guardar();
      }
      this.verificarCambioDeDia();
    } catch (e) {
      console.warn('Iniciando con estado en memoria por error en DB:', e);
    }
    this.notificar();
  }

  verificarCambioDeDia() {
    const hoy = new Date().toISOString().split('T')[0];
    if (this.datos.ultimaFechaAcceso !== hoy) {
      this.datos.ultimaFechaAcceso = hoy;
      this.datos.sabiduriaVistoHoy = false;
      this.datos.misionRealizadaHoy = false;
      // Drenaje leve natural de batería si no hubo pedaleo
      this.datos.bioenergia.nivelCarga = Math.max(10, this.datos.bioenergia.nivelCarga - 15);
      this.guardar();
    }
  }

  async guardar() {
    await MotorDB.guardar('estado_app', EstadoApp.CLAVE_ESTADO, this.datos);
    this.notificar();
  }

  suscribir(fn) {
    this.suscriptores.push(fn);
    fn(this.datos);
  }

  notificar() {
    this.suscriptores.forEach(fn => fn(this.datos));
  }

  // --- MÉTODOS DE MUTACIÓN ---

  get infoPilares() {
    // Filtrar objetos de sabiduría activos
    const objetosActivosData = this.datos.objetosSabiduriaActivos.map(id => {
      if (id === 'obj_biblia_chui') return { id, pilar: 'espiritu' };
      if (id === 'obj_manual_supervivencia_1') return { id, pilar: 'mente' };
      return { id, pilar: 'espiritu' };
    });

    return PilaresEngine.calcularEquilibrio(this.datos.sendas, objetosActivosData);
  }

  get infoNivelRefugio() {
    return NIVELES_REFUGIO[this.datos.nivelRefugio] || NIVELES_REFUGIO[0];
  }

  async agregarSenda(nombre, pilar, frecuencia = 'diario', rigor = 'flexible') {
    const limite = this.infoNivelRefugio.maxSendas;
    if (this.datos.sendas.length >= limite) {
      throw new Error(`Tu refugio Nivel ${this.datos.nivelRefugio} solo permite ${limite} sendas activas.`);
    }

    const nuevaSenda = {
      id: `senda_${Date.now()}`,
      nombre,
      pilar, // 'cuerpo', 'mente', 'espiritu', 'taller'
      frecuencia,
      rigor,
      fechaCreacion: new Date().toISOString().split('T')[0],
      diasTotales: 0,
      diasCumplidos: 0,
      diasFallados: 0,
      rachaActual: 0,
      fallosSeguidos: 0,
      cumplidaHoy: false
    };

    this.datos.sendas.push(nuevaSenda);
    await this.guardar();
    return nuevaSenda;
  }

  async agregarCadena(nombre) {
    const limite = this.infoNivelRefugio.maxCadenas;
    if (this.datos.cadenas.length >= limite) {
      throw new Error(`Tu refugio Nivel ${this.datos.nivelRefugio} solo permite ${limite} cadenas activas.`);
    }

    const nuevaCadena = {
      id: `cadena_${Date.now()}`,
      nombre,
      fechaCreacion: new Date().toISOString().split('T')[0],
      diasRegistrados: 0,
      diasLimpiosConsecutivos: 0,
      recaidasConsecutivas: 0,
      totalRecaidas: 0,
      estadoPuente: 'firme',
      reportadaHoy: false
    };

    this.datos.cadenas.push(nuevaCadena);
    await this.guardar();
    return nuevaCadena;
  }

  async agregarFaro(faroObjeto) {
    const limite = this.infoNivelRefugio.maxFaros;
    if (this.datos.faros.length >= limite) {
      throw new Error(`Tu refugio Nivel ${this.datos.nivelRefugio} solo permite ${limite} faros activos.`);
    }

    this.datos.faros.push(faroObjeto);
    await this.guardar();
  }
}

export const estadoApp = new EstadoApp();
