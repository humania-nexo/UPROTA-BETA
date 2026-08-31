/**
 * UPROTA — Partituras Chiptune (8-bits) y Datasets de Audio Procedural
 * Autor: Hertz (Sonidista del Yermo)
 * Arquitectura: 0 KB de peso, síntesis matemática pura para Web Audio API.
 * Canales: Pulse 1 (Lead), Pulse 2/Triangle (Bajo/Armonía), Noise (Percusión/Entorno).
 */

// --- TABLA DE FRECUENCIAS DE NOTAS (Hz) ---
export const NOTAS = {
  // Octava 2 (Bajos profundos)
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
  // Octava 3 (Líneas de bajo y acompañamiento)
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  // Octava 4 (Melodías centrales)
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  // Octava 5 (Agudos y fanfarrias)
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77,
  // Octava 6 (Brillo y armónicos de victoria)
  C6: 1046.50, D6: 1174.66, E6: 1318.51, F6: 1396.91, G6: 1567.98, A6: 1760.00, B6: 1975.53,
  // Silencio
  REST: 0
};

// Conversor dinámico de semitonos MIDI a Frecuencia en Hz (A4 = 69 = 440 Hz)
export function midiToHz(midiNote) {
  if (!midiNote || midiNote <= 0) return 0;
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

/**
 * CATÁLOGO DE COMPOSICIONES CHIPTUNE PROCEDURALES DE UPROTA
 */
export const MUSICA_CHIPTUNE = {
  
  // 1. EL ALBA EN EL REFUGIO (Tablón de Hábitos — 82 BPM, Do Mayor Pentatónica)
  // Carácter: Sereno, ordenado, matutino y reconfortante.
  alba_refugio: {
    id: 'alba_refugio',
    titulo: 'El Alba en el Refugio',
    bpm: 82,
    dutyCycle: 0.25,
    descripcion: 'Tema matutino sereno para el Tablón de Hábitos y la planificación diaria.',
    canales: {
      // Canal 1: Melodía principal dulce (Pulse 25%)
      lead: [
        { f: NOTAS.C4, d: 0.35, t: 0 },
        { f: NOTAS.E4, d: 0.35, t: 365 },
        { f: NOTAS.G4, d: 0.70, t: 730 },
        { f: NOTAS.A4, d: 0.35, t: 1460 },
        { f: NOTAS.G4, d: 0.70, t: 1825 },
        { f: NOTAS.E4, d: 0.35, t: 2555 },
        { f: NOTAS.D4, d: 0.70, t: 2920 },
        
        { f: NOTAS.C4, d: 0.35, t: 3650 },
        { f: NOTAS.D4, d: 0.35, t: 4015 },
        { f: NOTAS.E4, d: 0.70, t: 4380 },
        { f: NOTAS.G4, d: 0.35, t: 5110 },
        { f: NOTAS.D4, d: 0.70, t: 5475 },
        { f: NOTAS.C4, d: 1.10, t: 6205 }
      ],
      // Canal 2: Bajo cálido y seguro (Triangle / Sub-Pulse)
      bass: [
        { f: NOTAS.C3, d: 1.40, t: 0 },
        { f: NOTAS.G2, d: 1.40, t: 1460 },
        { f: NOTAS.A2, d: 1.40, t: 2920 },
        { f: NOTAS.F2, d: 1.40, t: 4380 },
        { f: NOTAS.G2, d: 1.40, t: 5840 },
        { f: NOTAS.C3, d: 1.40, t: 7280 }
      ],
      // Canal 3: Hi-hat suave filtrado de paso alto (Noise)
      noise: [
        { tipo: 'hihat', d: 0.05, t: 0 },
        { tipo: 'hihat', d: 0.05, t: 730 },
        { tipo: 'hihat', d: 0.05, t: 1460 },
        { tipo: 'hihat', d: 0.05, t: 2190 },
        { tipo: 'hihat', d: 0.05, t: 2920 },
        { tipo: 'hihat', d: 0.05, t: 3650 },
        { tipo: 'hihat', d: 0.05, t: 4380 },
        { tipo: 'hihat', d: 0.05, t: 5110 },
        { tipo: 'hihat', d: 0.05, t: 5840 },
        { tipo: 'hihat', d: 0.05, t: 6570 }
      ]
    },
    duracionTotalMs: 7600
  },

  // 2. ECOS DE LA NOCHE (El Hogar & Fogón de Cob — 64 BPM, La Menor / Dórico)
  // Carácter: Introspectivo, melancólico, acogedor, reconociendo la fatiga sin culpa.
  ecos_noche: {
    id: 'ecos_noche',
    titulo: 'Ecos de la Noche',
    bpm: 64,
    dutyCycle: 0.125,
    descripcion: 'Melodía contemplativa para El Hogar, el reposo y la fogata.',
    canales: {
      lead: [
        { f: NOTAS.A4, d: 0.60, t: 0 },
        { f: NOTAS.C5, d: 0.40, t: 700 },
        { f: NOTAS.B4, d: 0.80, t: 1170 },
        { f: NOTAS.G4, d: 0.60, t: 2100 },
        { f: NOTAS.E4, d: 1.00, t: 2800 },
        
        { f: NOTAS.F4, d: 0.50, t: 4000 },
        { f: NOTAS.A4, d: 0.50, t: 4600 },
        { f: NOTAS.G4, d: 0.70, t: 5200 },
        { f: NOTAS.E4, d: 0.50, t: 6000 },
        { f: NOTAS.D4, d: 0.60, t: 6600 },
        { f: NOTAS.A3, d: 1.40, t: 7300 }
      ],
      bass: [
        { f: NOTAS.A2, d: 1.80, t: 0 },
        { f: NOTAS.E3, d: 1.80, t: 2000 },
        { f: NOTAS.F2, d: 1.80, t: 4000 },
        { f: NOTAS.D3, d: 1.80, t: 6000 },
        { f: NOTAS.A2, d: 2.20, t: 7300 }
      ],
      noise: [
        // Crujido suave y esporádico de brasas
        { tipo: 'brasa', d: 0.08, t: 400 },
        { tipo: 'brasa', d: 0.06, t: 2300 },
        { tipo: 'brasa', d: 0.09, t: 4500 },
        { tipo: 'brasa', d: 0.07, t: 6800 }
      ]
    },
    duracionTotalMs: 9200
  },

  // 3. FRECUENCIA 104.5 MHz (Jingle de Yermo Radio — 110 BPM, Sol Mayor con 7ma)
  // Carácter: Cortinilla analógica retro de 3.2 segundos tras el conmutador PTT.
  frecuencia_104_5: {
    id: 'frecuencia_104_5',
    titulo: 'Frecuencia 104.5 MHz',
    bpm: 110,
    dutyCycle: 0.50,
    descripcion: 'Jingle de apertura para las transmisiones de Elena en Yermo Radio.',
    canales: {
      lead: [
        { f: NOTAS.G4, d: 0.12, t: 0 },
        { f: NOTAS.B4, d: 0.12, t: 130 },
        { f: NOTAS.D5, d: 0.12, t: 260 },
        { f: NOTAS.F5, d: 0.18, t: 390 }, // Séptima dominante cálida
        { f: NOTAS.G5, d: 0.40, t: 600 },
        { f: NOTAS.D5, d: 0.15, t: 1100 },
        { f: NOTAS.G5, d: 0.70, t: 1300 }
      ],
      bass: [
        { f: NOTAS.G3, d: 0.60, t: 0 },
        { f: NOTAS.B3, d: 0.40, t: 600 },
        { f: NOTAS.G2, d: 1.00, t: 1100 }
      ],
      noise: [
        { tipo: 'ptt_click', d: 0.04, t: 0 },
        { tipo: 'radio_dial', d: 0.25, t: 200 },
        { tipo: 'ptt_click', d: 0.04, t: 2100 }
      ]
    },
    duracionTotalMs: 2300
  },

  // 4. FANFARRIA DEL MODO FIESTA (Festival del Refugio — 132 BPM, Do Mayor / Triunfal)
  // Carácter: Celebración épica de hábitos conquistados, rotura de Cadenas (21d) o Cimientos (66d).
  modo_fiesta: {
    id: 'modo_fiesta',
    titulo: 'Fanfarria del Festival del Refugio (Modo Fiesta)',
    bpm: 132,
    dutyCycle: 0.25,
    descripcion: 'Fanfarria rítmica y festiva con confeti para celebrar hitos mayores.',
    canales: {
      lead: [
        { f: NOTAS.C5, d: 0.12, t: 0 },
        { f: NOTAS.E5, d: 0.12, t: 110 },
        { f: NOTAS.G5, d: 0.12, t: 220 },
        { f: NOTAS.C6, d: 0.25, t: 330 },
        { f: NOTAS.G5, d: 0.10, t: 550 },
        { f: NOTAS.C6, d: 0.35, t: 660 },
        
        { f: NOTAS.D5, d: 0.10, t: 1050 },
        { f: NOTAS.F5, d: 0.10, t: 1160 },
        { f: NOTAS.A5, d: 0.10, t: 1270 },
        { f: NOTAS.D6, d: 0.40, t: 1380 },
        
        { f: NOTAS.C6, d: 0.15, t: 1800 },
        { f: NOTAS.D6, d: 0.15, t: 1950 },
        { f: NOTAS.E6, d: 0.60, t: 2100 }
      ],
      bass: [
        { f: NOTAS.C3, d: 0.40, t: 0 },
        { f: NOTAS.G3, d: 0.40, t: 440 },
        { f: NOTAS.D3, d: 0.40, t: 1050 },
        { f: NOTAS.A3, d: 0.40, t: 1400 },
        { f: NOTAS.G3, d: 0.30, t: 1800 },
        { f: NOTAS.C4, d: 0.70, t: 2100 }
      ],
      noise: [
        { tipo: 'snare', d: 0.08, t: 0 },
        { tipo: 'snare', d: 0.08, t: 220 },
        { tipo: 'snare', d: 0.08, t: 440 },
        { tipo: 'snare', d: 0.08, t: 660 },
        { tipo: 'snare', d: 0.08, t: 1050 },
        { tipo: 'snare', d: 0.08, t: 1270 },
        { tipo: 'snare', d: 0.08, t: 1380 },
        { tipo: 'snare', d: 0.08, t: 1800 },
        { tipo: 'snare', d: 0.08, t: 1950 },
        { tipo: 'explosion', d: 0.20, t: 2100 }
      ]
    },
    duracionTotalMs: 2900
  },

  // 5. EL LAGO DE LOS CISNES (Arco del Lutier Anciano — Tchaikovsky Op. 20 Chiptune Rústico)
  // Carácter: Cuerdas frotadas acústicas adaptadas a síntesis de 8-bits, solemne y emotivo.
  el_lago_de_los_cisnes: {
    id: 'el_lago_de_los_cisnes',
    titulo: 'El Lago de los Cisnes (Orquesta del Lutier)',
    bpm: 72,
    dutyCycle: 0.50,
    descripcion: 'Tema cumbre del concierto del Lutier en el patio del refugio.',
    canales: {
      lead: [
        { f: NOTAS.B4, d: 0.80, t: 0 },
        { f: NOTAS.E5, d: 0.40, t: 830 },
        { f: NOTAS.G5, d: 0.40, t: 1250 },
        { f: NOTAS.F5, d: 0.40, t: 1670 },
        { f: NOTAS.E5, d: 0.80, t: 2080 },
        { f: NOTAS.B4, d: 0.40, t: 2910 },
        { f: NOTAS.E5, d: 0.40, t: 3330 },
        { f: NOTAS.D5, d: 0.40, t: 3750 },
        { f: NOTAS.C5, d: 0.80, t: 4160 },
        { f: NOTAS.B4, d: 1.20, t: 5000 }
      ],
      bass: [
        { f: NOTAS.E3, d: 2.00, t: 0 },
        { f: NOTAS.G3, d: 2.00, t: 2080 },
        { f: NOTAS.A3, d: 1.00, t: 4160 },
        { f: NOTAS.E3, d: 2.00, t: 5000 }
      ],
      noise: []
    },
    duracionTotalMs: 6500
  }
};
