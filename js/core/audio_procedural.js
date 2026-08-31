/**
 * Motor de Audio Procedural Chiptune (8-bits) — UPROTA v2.2
 * Generación matemática pura en tiempo real mediante Web Audio API (0 KB de peso).
 * Emula los chips de sonido clásicos (NES Ricoh 2A03 / Game Boy DMG).
 * 
 * Autor: Hertz (Sonidista del Yermo) & Nexo (Ingeniería de Software)
 */

import { MUSICA_CHIPTUNE, NOTAS } from '../data/musica_chiptune.js';

export class ProceduralAudioEngine {
  constructor() {
    this.ctx = null;
    this.volumenMaster = 0.3; // 30% por defecto para suavidad
    this.silenciado = false;
    this.pistaActiva = null;
    this.loopTimerId = null;
    this.activeTimeouts = [];
    this.pulseWaveCache = new Map();
    this.masterCompressor = null;
  }

  /**
   * Inicializa o reanuda el contexto de audio garantizando cumplimiento de políticas de interacción.
   */
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx({ latencyHint: 'interactive' });
        
        // Master Compressor para evitar distorsión por acumulación polifónica (Anti-clipping)
        this.masterCompressor = this.ctx.createDynamicsCompressor();
        this.masterCompressor.threshold.setValueAtTime(-1.0, this.ctx.currentTime);
        this.masterCompressor.knee.setValueAtTime(40, this.ctx.currentTime);
        this.masterCompressor.ratio.setValueAtTime(20, this.ctx.currentTime);
        this.masterCompressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
        this.masterCompressor.release.setValueAtTime(0.05, this.ctx.currentTime);
        this.masterCompressor.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Genera o recupera de caché una forma de onda periódica con ciclo de trabajo específico (Pulse Width)
   * Serie de Fourier exacta para emulación de NES 2A03 / Game Boy DMG.
   */
  getPulseWave(dutyCycle = 0.5, numHarmonics = 64) {
    if (!this.ctx) return null;
    const key = `${dutyCycle}_${numHarmonics}`;
    if (this.pulseWaveCache.has(key)) {
      return this.pulseWaveCache.get(key);
    }

    const real = new Float32Array(numHarmonics);
    const imag = new Float32Array(numHarmonics);

    for (let n = 1; n < numHarmonics; n++) {
      const angle = 2 * Math.PI * n * dutyCycle;
      real[n] = Math.sin(angle) / (n * Math.PI);
      imag[n] = (1 - Math.cos(angle)) / (n * Math.PI);
    }

    const wave = this.ctx.createPeriodicWave(real, imag, { disableNormalization: false });
    this.pulseWaveCache.set(key, wave);
    return wave;
  }

  // --- GENERADORES DE ONDA BÁSICOS CON LIMPIEZA EFÍMERA ---

  playTone(freq, type = 'square', duration = 0.1, gainVal = 0.2, attack = 0.01, decay = 0.09, dutyCycle = 0.5) {
    if (this.silenciado || !freq || freq <= 0) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    if (type === 'pulse' || (type === 'square' && dutyCycle !== 0.5)) {
      const wave = this.getPulseWave(dutyCycle);
      if (wave) osc.setPeriodicWave(wave);
      else osc.type = 'square';
    } else {
      osc.type = type;
    }

    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(freq, now);

    // Envolvente ADSR de ganancia protegida contra RangeError (piso 0.0001)
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(gainVal * this.volumenMaster, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    if (this.masterCompressor) gain.connect(this.masterCompressor);
    else gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.05);

    // Limpieza explícita para evitar fugas de memoria
    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };
  }

  // Ruido blanco filtrado procedural para percusión y efectos de entorno
  playNoise(duration = 0.15, gainVal = 0.15, isLowPass = false, preset = 'default') {
    if (this.silenciado) return;
    this.init();
    if (!this.ctx) return;

    const bufferSize = Math.floor(this.ctx.sampleRate * duration);
    if (bufferSize <= 0) return;

    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    // Configuración de filtro según el preset tímbrico
    if (preset === 'hihat') {
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(6500, now);
    } else if (preset === 'snare') {
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.frequency.exponentialRampToValueAtTime(350, now + duration);
    } else if (preset === 'radio_dial') {
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(8.0, now);
    } else if (preset === 'brasa') {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(900, now);
    } else if (preset === 'ptt_click') {
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(3000, now);
    } else if (isLowPass) {
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
    } else {
      filter.type = 'allpass';
    }

    gain.gain.setValueAtTime(gainVal * this.volumenMaster, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    whiteNoise.connect(filter);
    filter.connect(gain);

    if (this.masterCompressor) gain.connect(this.masterCompressor);
    else gain.connect(this.ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + duration);

    whiteNoise.onended = () => {
      whiteNoise.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
  }

  // --- REPRODUCTOR DE PISTAS CHIPTUNE PROCEDURALES ---

  /**
   * Reproduce una pista del catálogo MUSICA_CHIPTUNE
   * @param {string} trackId - Clave de la pista (ej. 'alba_refugio', 'modo_fiesta')
   * @param {boolean} loop - Si debe reiniciarse en bucle
   */
  playChiptuneTrack(trackId, loop = false) {
    const track = MUSICA_CHIPTUNE[trackId];
    if (!track) return;

    this.stopChiptuneTrack();
    this.init();
    if (this.silenciado || !this.ctx) return;

    this.pistaActiva = trackId;

    const scheduleNotes = () => {
      if (this.pistaActiva !== trackId) return;

      // 1. Canal Lead
      if (track.canales.lead) {
        track.canales.lead.forEach(n => {
          const tId = setTimeout(() => {
            if (this.pistaActiva === trackId) {
              this.playTone(n.f, 'pulse', n.d, 0.22, 0.01, n.d - 0.01, track.dutyCycle || 0.25);
            }
          }, n.t);
          this.activeTimeouts.push(tId);
        });
      }

      // 2. Canal Bass
      if (track.canales.bass) {
        track.canales.bass.forEach(n => {
          const tId = setTimeout(() => {
            if (this.pistaActiva === trackId) {
              this.playTone(n.f, 'triangle', n.d, 0.26, 0.02, n.d - 0.02);
            }
          }, n.t);
          this.activeTimeouts.push(tId);
        });
      }

      // 3. Canal Noise / Percusión
      if (track.canales.noise) {
        track.canales.noise.forEach(n => {
          const tId = setTimeout(() => {
            if (this.pistaActiva === trackId) {
              this.playNoise(n.d, 0.18, false, n.tipo || 'default');
            }
          }, n.t);
          this.activeTimeouts.push(tId);
        });
      }

      // Loop si está activado
      if (loop && track.duracionTotalMs) {
        this.loopTimerId = setTimeout(() => {
          if (this.pistaActiva === trackId) {
            scheduleNotes();
          }
        }, track.duracionTotalMs);
      }
    };

    scheduleNotes();
  }

  /**
   * Detiene la pista musical en reproducción y cancela timeouts pendientes
   */
  stopChiptuneTrack() {
    this.pistaActiva = null;
    if (this.loopTimerId) {
      clearTimeout(this.loopTimerId);
      this.loopTimerId = null;
    }
    this.activeTimeouts.forEach(tId => clearTimeout(tId));
    this.activeTimeouts = [];
  }

  // --- EFECTOS DE SONIDO DEL SISTEMA (SFX 8-BIT) ---

  // 1. Click sutil de UI / Botón
  playClick() {
    this.playTone(520, 'pulse', 0.03, 0.12, 0.005, 0.025, 0.5);
  }

  // 2. Cumplimiento de Senda (Arpegio ascendente brillante)
  playCheckSenda() {
    const notas = [NOTAS.E4, NOTAS.G4, NOTAS.C5, NOTAS.E5];
    notas.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'pulse', 0.09, 0.18, 0.008, 0.082, 0.25);
      }, idx * 60);
    });
  }

  // 3. Cadena Rota / Recaída (Tono descendente sobrio con peso)
  playCadenaRecaida() {
    const notas = [NOTAS.A3, NOTAS.G3, NOTAS.F3, NOTAS.C3];
    notas.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sawtooth', 0.18, 0.22, 0.01, 0.17);
      }, idx * 90);
    });
  }

  // 4. Faro Alcanzado / Hito Dorado (Fanfarria majestuosa)
  playFanfarriaFaro() {
    const acorde = [
      { f: NOTAS.C4, t: 0 },
      { f: NOTAS.E4, t: 100 },
      { f: NOTAS.G4, t: 200 },
      { f: NOTAS.C5, t: 300 },
      { f: NOTAS.E5, t: 450 },
      { f: NOTAS.G5, t: 600 }
    ];
    acorde.forEach(item => {
      setTimeout(() => {
        this.playTone(item.f, 'triangle', 0.28, 0.25);
        this.playTone(item.f * 2, 'pulse', 0.22, 0.12, 0.01, 0.21, 0.25);
      }, item.t);
    });
  }

  // 5. Estática y Sintonía de Radio 104.5 MHz
  playSintoniaRadio() {
    this.playNoise(0.25, 0.18, false, 'radio_dial');
    setTimeout(() => this.playTone(880, 'sine', 0.08, 0.15), 180);
    setTimeout(() => this.playTone(1760, 'sine', 0.06, 0.10), 260);
  }

  // 6. Martilleo de Taller / Construcción de Módulo
  playGolpeTaller() {
    this.playNoise(0.08, 0.25, true);
    this.playTone(180, 'pulse', 0.06, 0.2, 0.005, 0.055, 0.5);
  }

  // 7. Modo Fiesta (Fanfarria Chiptune de Celebración y Victoria)
  playModoFiestaFanfarria() {
    this.playChiptuneTrack('modo_fiesta', false);
  }
}

export const audioProcedural = new ProceduralAudioEngine();
