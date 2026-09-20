/**
 * Motor de Audio Procedural Chiptune (8-bits) — UPROTA v3.8
 * Generación matemática pura en tiempo real mediante Web Audio API (0 KB de peso).
 * Emula los chips de sonido clásicos (NES Ricoh 2A03 / Game Boy DMG), paisajes de calma y cinemáticas de apertura.
 * 
 * Autor: Hertz (Sonidista del Yermo) & Nexo (Ingeniería de Software)
 */

import { MUSICA_CHIPTUNE, NOTAS, PAISAJES_AMBIENTALES_ENFOQUE } from '../data/musica_chiptune.js';

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
    
    // Control de Paisajes Ambientales Procedurales Continuos (Enfoque / Calma)
    this.ambienteActivo = null;
    this.ambienteNodes = [];
    this.ambienteIntervals = [];
    this.ambientePomodoroTimer = null;
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
    } else if (preset === 'oleaje') {
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, now);
      filter.Q.setValueAtTime(1.2, now);
    } else if (preset === 'viento') {
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.setValueAtTime(1.8, now);
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

  // --- PAISAJES AMBIENTALES PROCEDURALES DE ENFOQUE Y CALMA (0 KB) ---

  /**
   * Inicia un paisaje sonoro continuo procedural para sesiones de concentración o descanso
   * @param {'fogon'|'lluvia'|'radio_portadora'} tipo - Identificador del paisaje
   * @param {number} duracionMinutos - 0 para continuo, o minutos (ej. 25 min Pomodoro)
   */
  startAmbienteProcedural(tipo = 'fogon', duracionMinutos = 0) {
    this.stopAmbienteProcedural();
    this.init();
    if (this.silenciado || !this.ctx) return;

    this.ambienteActivo = tipo;
    const now = this.ctx.currentTime;
    const config = PAISAJES_AMBIENTALES_ENFOQUE[tipo] || PAISAJES_AMBIENTALES_ENFOQUE.fogon;
    const baseGainVal = config.gananciaSugerida || 0.2;

    const masterAmbienteGain = this.ctx.createGain();
    masterAmbienteGain.gain.setValueAtTime(0.0001, now);
    masterAmbienteGain.gain.linearRampToValueAtTime(baseGainVal * this.volumenMaster, now + 1.5);
    masterAmbienteGain.connect(this.masterCompressor || this.ctx.destination);
    this.ambienteNodes.push(masterAmbienteGain);

    if (tipo === 'fogon') {
      const oscCalor = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      oscCalor.type = 'triangle';
      oscCalor.frequency.setValueAtTime(58, now);
      oscGain.gain.setValueAtTime(0.12, now);
      oscCalor.connect(oscGain);
      oscGain.connect(masterAmbienteGain);
      oscCalor.start(now);
      this.ambienteNodes.push(oscCalor, oscGain);

      const intervalCrackle = setInterval(() => {
        if (this.ambienteActivo !== 'fogon') return;
        const r = Math.random();
        if (r > 0.35) {
          const popDuration = 0.03 + Math.random() * 0.05;
          const popGain = 0.08 + Math.random() * 0.16;
          this.playNoise(popDuration, popGain, true, 'brasa');
        }
      }, 220);
      this.ambienteIntervals.push(intervalCrackle);

    } else if (tipo === 'lluvia') {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const rainSource = this.ctx.createBufferSource();
      rainSource.buffer = buffer;
      rainSource.loop = true;

      const rainFilter = this.ctx.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.setValueAtTime(1600, now);
      rainFilter.Q.setValueAtTime(0.8, now);

      const rainGain = this.ctx.createGain();
      rainGain.gain.setValueAtTime(0.35, now);

      rainSource.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(masterAmbienteGain);
      rainSource.start(now);
      this.ambienteNodes.push(rainSource, rainFilter, rainGain);

      const intervalDrops = setInterval(() => {
        if (this.ambienteActivo !== 'lluvia') return;
        if (Math.random() > 0.4) {
          const dropFreq = 1200 + Math.random() * 1400;
          this.playTone(dropFreq, 'sine', 0.025, 0.08, 0.002, 0.023);
        }
      }, 160);
      this.ambienteIntervals.push(intervalDrops);

    } else if (tipo === 'radio_portadora') {
      const osc60 = this.ctx.createOscillator();
      const osc120 = this.ctx.createOscillator();
      const gainHum = this.ctx.createGain();

      osc60.type = 'sine';
      osc60.frequency.setValueAtTime(60, now);
      osc120.type = 'sine';
      osc120.frequency.setValueAtTime(120, now);

      gainHum.gain.setValueAtTime(0.15, now);
      osc60.connect(gainHum);
      osc120.connect(gainHum);
      gainHum.connect(masterAmbienteGain);

      osc60.start(now);
      osc120.start(now);
      this.ambienteNodes.push(osc60, osc120, gainHum);

      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      const noiseSrc = this.ctx.createBufferSource();
      noiseSrc.buffer = buffer;
      noiseSrc.loop = true;

      const qsbFilter = this.ctx.createBiquadFilter();
      qsbFilter.type = 'bandpass';
      qsbFilter.frequency.setValueAtTime(1200, now);
      qsbFilter.Q.setValueAtTime(6.0, now);

      noiseSrc.connect(qsbFilter);
      qsbFilter.connect(masterAmbienteGain);
      noiseSrc.start(now);
      this.ambienteNodes.push(noiseSrc, qsbFilter);
    }

    // Temporizador de Enfoque Pomodoro (Auto-apagado)
    if (duracionMinutos > 0) {
      const duracionMs = duracionMinutos * 60 * 1000;
      this.ambientePomodoroTimer = setTimeout(() => {
        this.stopAmbienteProcedural();
        this.playTone(NOTAS.C5, 'sine', 0.8, 0.2, 0.01, 0.79);
        setTimeout(() => this.playTone(NOTAS.G5, 'sine', 1.2, 0.18, 0.01, 1.19), 300);
      }, duracionMs);
    }
  }

  /**
   * Detiene el paisaje ambiental con rampa de salida suave y libera los nodos Web Audio
   */
  stopAmbienteProcedural() {
    this.ambienteActivo = null;

    if (this.ambientePomodoroTimer) {
      clearTimeout(this.ambientePomodoroTimer);
      this.ambientePomodoroTimer = null;
    }

    this.ambienteIntervals.forEach(intId => clearInterval(intId));
    this.ambienteIntervals = [];

    if (this.ambienteNodes && this.ambienteNodes.length > 0 && this.ctx) {
      const now = this.ctx.currentTime;
      this.ambienteNodes.forEach(node => {
        try {
          if (node.gain && node.gain.linearRampToValueAtTime) {
            node.gain.linearRampToValueAtTime(0.0001, now + 0.3);
          }
          if (node.stop) {
            node.stop(now + 0.35);
          }
          setTimeout(() => {
            if (node.disconnect) node.disconnect();
          }, 400);
        } catch (e) {
          // Captura silenciosa de nodos ya detenidos
        }
      });
    }
    this.ambienteNodes = [];
  }

  isAmbienteActivo() {
    return this.ambienteActivo !== null;
  }

  // --- REPRODUCTOR DE PISTAS CHIPTUNE PROCEDURALES ---

  playChiptuneTrack(trackId, loop = false) {
    const track = MUSICA_CHIPTUNE[trackId];
    if (!track) return;

    this.stopChiptuneTrack();
    this.init();
    if (this.silenciado || !this.ctx) return;

    this.pistaActiva = trackId;

    const scheduleNotes = () => {
      if (this.pistaActiva !== trackId) return;

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

  playClick() {
    this.playTone(520, 'pulse', 0.03, 0.12, 0.005, 0.025, 0.5);
  }

  playCheckSenda() {
    const notas = [NOTAS.E4, NOTAS.G4, NOTAS.C5, NOTAS.E5];
    notas.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'pulse', 0.09, 0.18, 0.008, 0.082, 0.25);
      }, idx * 60);
    });
  }

  playCadenaRecaida() {
    const notas = [NOTAS.A3, NOTAS.G3, NOTAS.F3, NOTAS.C3];
    notas.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sawtooth', 0.18, 0.22, 0.01, 0.17);
      }, idx * 90);
    });
  }

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

  playSintoniaRadio() {
    this.playNoise(0.25, 0.18, false, 'radio_dial');
    setTimeout(() => this.playTone(880, 'sine', 0.08, 0.15), 180);
    setTimeout(() => this.playTone(1760, 'sine', 0.06, 0.10), 260);
  }

  playGolpeTaller() {
    this.playNoise(0.08, 0.25, true);
    this.playTone(180, 'pulse', 0.06, 0.2, 0.005, 0.055, 0.5);
  }

  playModoFiestaFanfarria() {
    this.playChiptuneTrack('modo_fiesta', false);
  }

  playTabulaRasaRenacer() {
    this.init();
    if (this.silenciado || !this.ctx) return;

    this.playNoise(0.35, 0.15, true, 'brasa');

    const renacerNotas = [
      { f: NOTAS.C4, t: 150, d: 0.6 },
      { f: NOTAS.G4, t: 350, d: 0.7 },
      { f: NOTAS.C5, t: 550, d: 0.8 },
      { f: NOTAS.E5, t: 750, d: 0.9 },
      { f: NOTAS.G5, t: 950, d: 1.0 },
      { f: NOTAS.C6, t: 1200, d: 1.6 }
    ];

    renacerNotas.forEach(n => {
      setTimeout(() => {
        this.playTone(n.f, 'sine', n.d, 0.20, 0.02, n.d - 0.02);
        this.playTone(n.f * 0.5, 'triangle', n.d, 0.15, 0.04, n.d - 0.04);
      }, n.t);
    });
  }

  // --- CINEMÁTICAS DE APERTURA: SAPIENSIA CLAN & UPROTA INTRO ---

  /**
   * Cinemática 1: "La Travesía en la Cresta" (Splash Screen Oficial de SAPIENSIA Clan)
   * Sincronizada con la Cue Sheet de 2.4 segundos de Pix (Entrada 23).
   */
  playSplashScreenSapiensia() {
    this.init();
    if (this.silenciado || !this.ctx) return;

    // Fase 1 (0.0s – 0.6s): Vista cenital, chapoteo rítmico dual y crujido de maderas
    this.playNoise(0.12, 0.18, true, 'oleaje');
    this.playTone(65, 'triangle', 0.4, 0.15, 0.02, 0.38);
    setTimeout(() => {
      this.playNoise(0.14, 0.22, true, 'oleaje');
      this.playTone(55, 'triangle', 0.4, 0.18, 0.02, 0.38);
    }, 320);

    // Fase 2 (0.6s – 1.2s): Giro orbital 2.5D, lluvia inclinada y viento marino
    setTimeout(() => {
      this.playNoise(0.60, 0.24, false, 'viento');
      this.playTone(48, 'triangle', 0.6, 0.22, 0.05, 0.55);
    }, 600);

    // Fase 3 (1.2s – 1.8s): Ascenso vertical y suspensión en la cresta (Barrido tonal y tensión)
    setTimeout(() => {
      if (this.ctx) {
        const now = this.ctx.currentTime;
        const sweepOsc = this.ctx.createOscillator();
        const sweepGain = this.ctx.createGain();
        sweepOsc.type = 'sine';
        sweepOsc.frequency.setValueAtTime(140, now);
        sweepOsc.frequency.exponentialRampToValueAtTime(520, now + 0.55);

        sweepGain.gain.setValueAtTime(0.0001, now);
        sweepGain.gain.linearRampToValueAtTime(0.20 * this.volumenMaster, now + 0.1);
        sweepGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.58);

        sweepOsc.connect(sweepGain);
        sweepGain.connect(this.masterCompressor || this.ctx.destination);
        sweepOsc.start(now);
        sweepOsc.stop(now + 0.60);
      }
    }, 1200);

    // Fase 4 (1.8s – 1.9s): Impact Flash (Golpe seco / sub-kick de reseteo)
    setTimeout(() => {
      this.playTone(90, 'triangle', 0.10, 0.35, 0.002, 0.098);
      this.playNoise(0.08, 0.25, true, 'snare');
    }, 1800);

    // Fase 5 (1.9s – 2.4s): Freeze Shift a Flat Design (Arpegio triunfal en Do Mayor)
    setTimeout(() => {
      const arpegioDoMayor = [
        { f: NOTAS.E5, t: 0, d: 0.12 },
        { f: NOTAS.G5, t: 80, d: 0.12 },
        { f: NOTAS.C6, t: 160, d: 0.16 },
        { f: NOTAS.E6, t: 260, d: 0.45 }
      ];

      arpegioDoMayor.forEach(n => {
        setTimeout(() => {
          this.playTone(n.f, 'pulse', n.d, 0.24, 0.005, n.d - 0.005, 0.25);
        }, n.t);
      });

      // Cola armónica senoidal pura de paz
      setTimeout(() => {
        this.playTone(NOTAS.C5, 'sine', 0.8, 0.18, 0.02, 0.78);
        this.playTone(NOTAS.G4, 'triangle', 0.8, 0.12, 0.02, 0.78);
      }, 300);
    }, 1900);
  }

  /**
   * Cinemática 2: "La Forja de las 6 Letras" (Secuencia de Título UPROTA)
   * Sincronizada con los 10 cuadros clave de Pix (Entrada 22).
   */
  playIntroForjaUprota() {
    this.init();
    if (this.silenciado || !this.ctx) return;

    // 1. Trote rítmico del Clan empujando las letras (Cuadros 1 a 4: 0.0s - 0.7s)
    const pasos = [0, 130, 260, 390, 520, 650];
    pasos.forEach((t, i) => {
      setTimeout(() => {
        this.playNoise(0.04, 0.12, true, 'brasa');
        this.playTone(140 + (i % 2) * 30, 'triangle', 0.05, 0.10, 0.005, 0.045);
      }, t);
    });

    // 2. Colisión monolítica y destello de unión (Cuadro 5: 0.8s)
    setTimeout(() => {
      this.playNoise(0.12, 0.30, true, 'snare');
      this.playTone(220, 'pulse', 0.18, 0.28, 0.005, 0.175, 0.5);
      this.playTone(440, 'triangle', 0.25, 0.22, 0.005, 0.245);
    }, 800);

    // 3. Saludo triunfal del Clan (Cuadros 6 y 7: 1.1s)
    setTimeout(() => {
      this.playTone(NOTAS.G4, 'pulse', 0.15, 0.18, 0.01, 0.14, 0.25);
      setTimeout(() => this.playTone(NOTAS.C5, 'pulse', 0.25, 0.22, 0.01, 0.24, 0.25), 100);
    }, 1100);

    // 4. Dispersión en polvo dorado y título limpio UPROTA (Cuadros 8 a 10: 1.5s)
    setTimeout(() => {
      this.playNoise(0.40, 0.16, false, 'hihat');
      this.playTone(NOTAS.C5, 'sine', 0.7, 0.18, 0.02, 0.68);
    }, 1500);
  }

  // --- SÍNTESIS SONORA PROCEDURAL: RELIQUIAS DE LA BODEGA DEL CLAN (HERTZ & NEXO) ---

  /**
   * Reliquia 1: Las Hojas del Poeta (Los Textos del Poeta)
   * Cascada senoidal amortiguada en tríada menor nostálgica (440–659 Hz) con pasar de hojas.
   */
  playReliquiaPoeta() {
    this.init();
    if (this.silenciado || !this.ctx) return;

    // Micro-chasquido orgánico (pasar de hojas / papel arrugado)
    this.playNoise(0.09, 0.14, true, 'brasa');
    setTimeout(() => this.playNoise(0.06, 0.10, false, 'hihat'), 40);

    // Tríada menor nostálgica amortiguada (A4 - C5 - E5)
    const triada = [
      { f: 440.00, t: 30, d: 0.7, g: 0.18 },
      { f: 523.25, t: 110, d: 0.8, g: 0.16 },
      { f: 659.25, t: 200, d: 1.1, g: 0.20 }
    ];

    triada.forEach(n => {
      setTimeout(() => {
        this.playTone(n.f, 'sine', n.d, n.g, 0.02, n.d - 0.02);
      }, n.t);
    });
  }

  /**
   * Reliquia 2: Placa de Telemetría DHARMA-01 (VELA)
   * Portadora cósmica a 432 Hz con barrido de radiofrecuencia y pulso cuántico a 1.2 UA de Júpiter.
   */
  playReliquiaDharma() {
    this.init();
    if (this.silenciado || !this.ctx) return;

    // Barrido de sintonía cósmica (QSB estelar)
    this.playNoise(0.35, 0.18, false, 'radio_dial');

    // Frecuencia sagrada 432 Hz y quinta espacial
    setTimeout(() => {
      this.playTone(432, 'sine', 1.2, 0.20, 0.05, 1.15);
      this.playTone(648, 'sine', 0.9, 0.12, 0.08, 0.82);
    }, 120);

    // Bleep de telemetría cuántica
    setTimeout(() => {
      this.playTone(1728, 'sine', 0.08, 0.08, 0.005, 0.075);
    }, 450);
  }

  /**
   * Reliquia 3: El Arnés de la Unidad 0047-B (EUTHANASYS)
   * Micro-click neumático de inserción precisa que resuelve en quinta armónica brillante.
   */
  playReliquiaArnesCarmen() {
    this.init();
    if (this.silenciado || !this.ctx) return;

    // Click mecánico/neumático de acople
    this.playNoise(0.04, 0.22, true, 'ptt_click');
    this.playTone(180, 'pulse', 0.04, 0.16, 0.002, 0.038, 0.5);

    // Resolución en quinta armónica brillante de inserción perfecta
    setTimeout(() => {
      this.playTone(440, 'triangle', 0.22, 0.18, 0.005, 0.215);
      this.playTone(660, 'sine', 0.35, 0.22, 0.01, 0.34);
    }, 40);
  }

  playSubirNivel() {
    this.playFanfarriaFaro();
  }

  playError() {
    this.playCadenaRecaida();
  }
}

export const audioProcedural = new ProceduralAudioEngine();
