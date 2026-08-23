/**
 * Gestor Central de Estado Reactivo (Store)
 * Desacoplado, modular y persistente en IndexedDB.
 */

import { MotorDB } from './db.js';
import { PilaresEngine } from './pilares_engine.js';
import { NIVELES_REFUGIO } from '../data/niveles_refugio.js';
import { MisionesEngine } from '../mundo/misiones_engine.js';

export class EstadoApp {
  static CLAVE_ESTADO = 'uprota_estado_v1';

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
        diaSupervivencia: 1,
        onboardingCompletado: false
      },
      nivelRefugio: 0,
      recursos: {
        tablas: 5,
        clavos: 10,
        provisiones: 3,   // 3 latas comerciales del viejo mundo
        aguaLitros: 4,     // 4 Litros de agua embotellada
        moral: 10
      },
      bolsa: {
        tipo: 'Bolsa ecológica rota',
        capacidadKg: 8.0,
        pesoActualKg: 3.5,
        espaciosMax: 6,
        items: [
          { id: 'item_099', nombre: 'Lata de comida comercial', pesoKg: 0.4, cantidad: 3 },
          { id: 'item_001', nombre: 'Clavos oxidados', pesoKg: 0.5, cantidad: 10 },
          { id: 'item_008', nombre: 'Tabla de pino suelta', pesoKg: 1.2, cantidad: 2 },
          { id: 'item_032', nombre: 'Cuchillo de cocina mellado (30%)', pesoKg: 0.2, cantidad: 1 }
        ]
      },
      bioenergia: {
        nivelCarga: 0, // En Nivel 0 no hay generador ni LEDs
        biciGeneradorConstruido: false,
        lucesLedEncendidas: false,
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
      manualesDonChui: [], // 'tomo_1', 'tomo_2', 'tomo_3'
      donChuiConocido: false,
      hogarDesbloqueado: false,
      objetosSabiduriaActivos: [], // Se desbloquea en Día 60 con la Biblia
      objetosSabiduriaInventario: [],
      sabiduriaVistoHoy: false,
      misionDespachadaHoy: null,        // Misión enviada hoy (en curso)
      informeMisionPendiente: null,     // Informe de expedición listo para ver
      misionRealizadaHoy: false,
      ultimaFechaAcceso: new Date().toISOString().split('T')[0]
    };
  }

  async inicializar() {
    try {
      const guardado = await MotorDB.obtener('estado_app', EstadoApp.CLAVE_ESTADO);
      if (guardado) {
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
      this.datos.perfil.diaSupervivencia = (this.datos.perfil.diaSupervivencia || 1) + 1;
      this.datos.sabiduriaVistoHoy = false;

      // Si había una misión enviada ayer, resolverla y crear el informe de expedición
      if (this.datos.misionDespachadaHoy) {
        const pilares = this.infoPilares;
        const informe = MisionesEngine.resolverMision(
          this.datos.misionDespachadaHoy,
          this.datos.bolsa.capacidadKg,
          pilares.esDorado
        );
        this.datos.informeMisionPendiente = informe;
        this.datos.misionDespachadaHoy = null;
      }
      this.datos.misionRealizadaHoy = false;

      // Consumo biológico diario realista (2L de agua y 1 ración)
      if (this.datos.recursos.aguaLitros >= 2) {
        this.datos.recursos.aguaLitros -= 2;
      } else {
        this.datos.recursos.aguaLitros = 0; // Deshidratación
      }

      if (this.datos.recursos.provisiones >= 1) {
        this.datos.recursos.provisiones -= 1;
      } else {
        this.datos.recursos.provisiones = 0;
        this.datos.recursos.moral = Math.max(0, this.datos.recursos.moral - 2);
      }

      // Evento Don Chui en Día 3
      if (this.datos.perfil.diaSupervivencia >= 3 && !this.datos.donChuiConocido) {
        this.datos.donChuiConocido = true;
        this.datos.manualesDonChui.push('tomo_1');
      }

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
