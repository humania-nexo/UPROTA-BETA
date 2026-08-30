/**
 * Motor de Audio Procedural Chiptune (8-bits) — UPROTA v1.0
 * Generación matemática pura en tiempo real mediante Web Audio API (0 KB de peso).
 * Inspirado en los chips de sonido clásicos (NES Ricoh 2A03 / Game Boy DMG).
 */

export class ProceduralAudioEngine {
  constructor() {
    this.ctx = null;
    this.volumenMaster = 0.3; // 30% por defecto para suavidad
    this.silenciado = false;
    this.ambienteActivo = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- GENERADORES DE ONDA BÁSICOS ---

  playTone(freq, type = 'square', duration = 0.1, gainVal = 0.2, attack = 0.01, decay = 0.09) {
    if (this.silenciado) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(gainVal * this.volumenMaster, now + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Ruido blanco procedural para percusión y efectos de entorno
  playNoise(duration = 0.15, gainVal = 0.15, isLowPass = false) {
    if (this.silenciado) return;
    this.init();
    if (!this.ctx) return;

    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(gainVal * this.volumenMaster, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    if (isLowPass) {
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      whiteNoise.connect(filter);
      filter.connect(gain);
    } else {
      whiteNoise.connect(gain);
    }

    gain.connect(this.ctx.destination);
    whiteNoise.start(now);
  }

  // --- EFECTOS DE SONIDO DEL SISTEMA (SFX 8-BIT) ---

  // 1. Click sutil de UI / Botón
  playClick() {
    this.playTone(520, 'square', 0.03, 0.12, 0.005, 0.025);
  }

  // 2. Cumplimiento de Senda (Arpegio ascendente estilo Zelda / Pokémon)
  playCheckSenda() {
    const notas = [330, 392, 523.25, 659.25]; // Mi, Sol, Do, Mi
    notas.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'square', 0.09, 0.18);
      }, idx * 60);
    });
  }

  // 3. Cadena Rota / Recaída (Tono descendente con peso)
  playCadenaRecaida() {
    const notas = [220, 196, 174.61, 130.81]; // La, Sol, Fa, Do grave
    notas.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sawtooth', 0.18, 0.22);
      }, idx * 90);
    });
  }

  // 4. Faro Alcanzado / Hito Dorado (Fanfarria 8-bit majestuosa)
  playFanfarriaFaro() {
    const acorde = [
      { f: 261.63, t: 0 },   // Do
      { f: 329.63, t: 100 }, // Mi
      { f: 392.00, t: 200 }, // Sol
      { f: 523.25, t: 300 }, // Do agudo
      { f: 659.25, t: 450 }, // Mi agudo
      { f: 783.99, t: 600 }  // Sol brillante
    ];
    acorde.forEach(item => {
      setTimeout(() => {
        this.playTone(item.f, 'triangle', 0.28, 0.25);
        this.playTone(item.f * 2, 'square', 0.22, 0.12);
      }, item.t);
    });
  }

  // 5. Estática y Sintonía de Radio 104.5 MHz
  playSintoniaRadio() {
    this.playNoise(0.25, 0.18);
    setTimeout(() => this.playTone(880, 'sine', 0.08, 0.15), 180);
    setTimeout(() => this.playTone(1760, 'sine', 0.06, 0.10), 260);
  }

  // 6. Martilleo de Taller / Construcción de Módulo
  playGolpeTaller() {
    this.playNoise(0.08, 0.25, true);
    this.playTone(180, 'square', 0.06, 0.2);
  }
}

export const audioProcedural = new ProceduralAudioEngine();
