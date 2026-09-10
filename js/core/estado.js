/**
 * Gestor Central de Estado Reactivo (Store)
 * Desacoplado, modular y persistente en IndexedDB.
 */

import { MotorDB } from './db.js';
import { PilaresEngine } from './pilares_engine.js';
import { NIVELES_REFUGIO } from '../data/niveles_refugio.js';
import { MisionesEngine } from '../mundo/misiones_engine.js';
import { CronologiaEngine } from '../mundo/cronologia_npcs.js';
import { OBJETOS_SABIDURIA } from '../data/sabiduria_textos.js';

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
      diarioNaufrago: [],
      capsulasTiempo: [],
      respaldosAutomaticos: [], // Snapshots automáticos cada 90 días e hitos clave
      manualesDonChui: [], // 'tomo_1', 'tomo_2', 'tomo_3'
      donChuiConocido: false,
      hogarDesbloqueado: false,
      objetosSabiduriaActivos: [], // Se desbloquea en Día 60 con la Biblia
      objetosSabiduriaInventario: [],
      sabiduriaVistoHoy: false,
      misionDespachadaHoy: null,        // Misión enviada hoy (en curso)
      informeMisionPendiente: null,     // Informe de expedición listo para ver
      misionRealizadaHoy: false,
      bitacoraPendienteAyer: false,
      fechaUltimaBitacora: new Date().toISOString().split('T')[0],
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
      if (this.datos.perfil.onboardingCompletado) {
        this.datos.bitacoraPendienteAyer = true;
      }
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

      // Evaluación de triggers y eventos cronológicos (Días 1 a 90+)
      CronologiaEngine.evaluarProgreso(this.datos);

      // Verificación de guardados automáticos trimestrales e hitos
      this.verificarSnapshotsTrimestrales();

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
    // Mapeo dinámico de objetos de sabiduría activos según catálogo
    const objetosActivosData = (this.datos.objetosSabiduriaActivos || []).map(id => {
      const obj = Object.values(OBJETOS_SABIDURIA).find(o => o.id === id);
      return { id, pilar: obj ? obj.pilar : 'espiritu' };
    });

    return PilaresEngine.calcularEquilibrio(this.datos.sendas, objetosActivosData);
  }

  get infoNivelRefugio() {
    return NIVELES_REFUGIO[this.datos.nivelRefugio] || NIVELES_REFUGIO[0];
  }

  async agregarSenda(nombre, pilar, frecuencia = 'diario', horarioObjetivo = 'cualquiera') {
    const limite = this.infoNivelRefugio.maxSendas;
    if (this.datos.sendas.length >= limite) {
      throw new Error(`Tu refugio Nivel ${this.datos.nivelRefugio} solo permite ${limite} sendas activas.`);
    }

    const nuevaSenda = {
      id: `senda_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      nombre,
      pilar, // 'cuerpo', 'mente', 'espiritu', 'taller'
      tipoFrecuencia: frecuencia,
      frecuencia,
      horarioObjetivo,
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

  async exportarRespaldoJSON() {
    const jsonStr = JSON.stringify(this.datos, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const nombreLimpio = (this.datos.perfil?.nombre || 'prota').toLowerCase().replace(/\s+/g, '_');
    const fecha = new Date().toISOString().split('T')[0];
    const nombreArchivo = `uprota_refugio_${nombreLimpio}_${fecha}.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return nombreArchivo;
  }

  async importarRespaldoJSON(contenidoTexto) {
    let datosNuevos;
    try {
      datosNuevos = JSON.parse(contenidoTexto);
    } catch (err) {
      throw new Error('El archivo seleccionado no tiene un formato JSON válido.');
    }

    if (!datosNuevos || typeof datosNuevos !== 'object' || !datosNuevos.perfil) {
      throw new Error('El archivo no es una copia de seguridad válida de UPROTA.');
    }

    // Fusión segura con el estado inicial para preservar integridad si faltaran claves nuevas
    const estadoRestaurado = {
      ...ESTADO_INICIAL,
      ...datosNuevos,
      perfil: { ...ESTADO_INICIAL.perfil, ...datosNuevos.perfil },
      recursos: { ...ESTADO_INICIAL.recursos, ...datosNuevos.recursos },
      bolsa: { ...ESTADO_INICIAL.bolsa, ...datosNuevos.bolsa },
      bioenergia: { ...ESTADO_INICIAL.bioenergia, ...datosNuevos.bioenergia },
      comunicacion: { ...ESTADO_INICIAL.comunicacion, ...datosNuevos.comunicacion }
    };

    this.datos = estadoRestaurado;
    await this.guardar();
    return true;
  }

  verificarSnapshotsTrimestrales() {
    if (!this.datos.respaldosAutomaticos) this.datos.respaldosAutomaticos = [];
    const dia = this.datos.perfil?.diaSupervivencia || 1;

    // Hitos trimestrales: Día 90, 180, 270, 365 y múltiplos
    if ((dia >= 90 && dia % 90 === 0) || dia === 365) {
      const yaExiste = this.datos.respaldosAutomaticos.some(s => s.diaSupervivencia === dia && s.tipo === 'trimestral');
      if (!yaExiste) {
        const estacion = Math.floor(dia / 90) || 1;
        this.crearSnapshotAutomatico(`Snapshot Trimestral — Día ${dia} (Cierre de Estación ${estacion})`, 'trimestral');
      }
    }
  }

  crearSnapshotAutomatico(motivo = 'Respaldo Automático del Refugio', tipo = 'trimestral') {
    if (!this.datos.respaldosAutomaticos) this.datos.respaldosAutomaticos = [];
    const dia = this.datos.perfil?.diaSupervivencia || 1;
    const fecha = new Date().toISOString().split('T')[0];

    const snapshot = {
      id: `snap_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      fecha,
      diaSupervivencia: dia,
      tipo,
      motivo,
      resumen: `Nivel ${this.datos.nivelRefugio} • ${this.datos.sendas?.length || 0} Sendas • ${this.datos.recursos?.tablas || 0} Tablas`,
      datosJSON: JSON.stringify(this.datos)
    };

    // Mantener hasta los últimos 8 snapshots
    this.datos.respaldosAutomaticos.unshift(snapshot);
    if (this.datos.respaldosAutomaticos.length > 8) {
      this.datos.respaldosAutomaticos = this.datos.respaldosAutomaticos.slice(0, 8);
    }
    return snapshot;
  }

  async restaurarSnapshotAutomatico(snapshotId) {
    if (!this.datos.respaldosAutomaticos) return false;
    const snap = this.datos.respaldosAutomaticos.find(s => s.id === snapshotId);
    if (!snap || !snap.datosJSON) {
      throw new Error('No se encontró el punto de restauración solicitado.');
    }
    return this.importarRespaldoJSON(snap.datosJSON);
  }

  descargarSnapshotJSON(snapshotId) {
    if (!this.datos.respaldosAutomaticos) return null;
    const snap = this.datos.respaldosAutomaticos.find(s => s.id === snapshotId);
    if (!snap || !snap.datosJSON) return null;

    const nombreArchivo = `UPROTA_Respaldo_Auto_Dia_${snap.diaSupervivencia}_${snap.fecha}.json`;
    const blob = new Blob([snap.datosJSON], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    return nombreArchivo;
  }

  async guardarEntradaDiario(disparadorId, texto, pilar = 'mente') {
    if (!this.datos.diarioNaufrago) this.datos.diarioNaufrago = [];
    const fecha = new Date().toISOString().split('T')[0];
    const entrada = {
      id: `diario_${Date.now()}`,
      fecha,
      diaSupervivencia: this.datos.perfil?.diaSupervivencia || 1,
      disparadorId,
      texto,
      pilar
    };
    const idx = this.datos.diarioNaufrago.findIndex(e => e.fecha === fecha);
    if (idx >= 0) {
      this.datos.diarioNaufrago[idx] = entrada;
    } else {
      this.datos.diarioNaufrago.unshift(entrada);
    }
    await this.guardar();
    return entrada;
  }

  async crearCapsulaTiempo(tipo, metaDias, texto) {
    if (!this.datos.capsulasTiempo) this.datos.capsulasTiempo = [];
    const capsula = {
      id: `capsula_${Date.now()}`,
      tipo,
      metaDias,
      fechaCreacion: new Date().toISOString().split('T')[0],
      diaCreacion: this.datos.perfil?.diaSupervivencia || 1,
      diaObjetivo: (this.datos.perfil?.diaSupervivencia || 1) + metaDias,
      texto,
      sellada: true,
      leida: false,
      fechaApertura: null
    };
    this.datos.capsulasTiempo.push(capsula);
    await this.guardar();
    return capsula;
  }

  async abrirCapsulaTiempo(capsulaId) {
    if (!this.datos.capsulasTiempo) return null;
    const capsula = this.datos.capsulasTiempo.find(c => c.id === capsulaId);
    if (capsula) {
      capsula.sellada = false;
      capsula.leida = true;
      capsula.fechaApertura = new Date().toISOString().split('T')[0];
      await this.guardar();
    }
    return capsula;
  }

  async reiniciarProgresoCompleto() {
    try {
      await MotorDB.limpiarTodo();
    } catch (e) {
      console.warn('Error purgando DB:', e);
    }
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (e) {}
    window.location.reload();
  }
}

export const estadoApp = new EstadoApp();
