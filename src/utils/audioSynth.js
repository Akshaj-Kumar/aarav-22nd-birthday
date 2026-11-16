/**
 * Web Audio API Synth & Sound Effects Engine
 * 
 * Works 100% offline with zero dependencies!
 * Generates futuristic sci-fi sound effects and an upbeat synthwave birthday melody
 * so the experience is never silent even if an external audio file isn't uploaded yet.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlayingMusic = false;
    this.synthLoopInterval = null;
    this.currentStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sci-fi click / button press
  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio fallback silent
    }
  }

  // Card Flip Sound
  playCardFlip() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {}
  }

  // Candle Extinguish / Whoosh Sound
  playBlowCandles() {
    try {
      this.init();
      if (!this.ctx) return;
      // White noise buffer for wind/breath sound
      const bufferSize = this.ctx.sampleRate * 0.6;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.5);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.55);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + 0.55);

      // Follow with celebratory fanfare
      setTimeout(() => this.playFanfare(), 400);
    } catch {}
  }

  // Celebratory Fanfare Chime
  playFanfare() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = this.ctx.currentTime + (idx * 0.1);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.65);
      });
    } catch {}
  }

  // Box Unlock / Epic Explosion Sound
  playBoxUnlock() {
    try {
      this.init();
      if (!this.ctx) return;
      // Low sub bass drop
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.9);

      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.95);

      // High futuristic shimmer
      this.playFanfare();
    } catch {}
  }

  // Quiz correct chime
  playQuizSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [659.25, 880, 1174.66]; // E5, A5, D6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const time = this.ctx.currentTime + (i * 0.08);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 0.4);
      });
    } catch {}
  }

  // Synthesized Cyberpunk / Upbeat Synthwave Birthday Music Generator
  startSynthMusic() {
    try {
      this.init();
      if (!this.ctx || this.isPlayingMusic) return;
      this.isPlayingMusic = true;

      // Chord progression: C - Am - F - G (futuristic synth bass + arpeggio)
      const bassProgression = [130.81, 110.00, 87.31, 98.00]; // C3, A2, F2, G2
      const melodyNotes = [
        [261.63, 329.63, 392.00, 523.25], // C major
        [220.00, 261.63, 329.63, 440.00], // A minor
        [174.61, 220.00, 261.63, 349.23], // F major
        [196.00, 246.94, 293.66, 392.00], // G major
      ];

      this.currentStep = 0;
      const bpm = 124;
      const stepTime = (60 / bpm) / 2; // 16th/8th rhythm

      this.synthLoopInterval = setInterval(() => {
        if (!this.isPlayingMusic || !this.ctx) return;

        const chordIdx = Math.floor((this.currentStep / 8) % 4);
        const subStep = this.currentStep % 8;

        // Bass kick / pluck on 0 and 4
        if (subStep === 0 || subStep === 4) {
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          bassOsc.type = 'sawtooth';
          bassOsc.frequency.setValueAtTime(bassProgression[chordIdx], this.ctx.currentTime);

          bassGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
          bassGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

          bassOsc.connect(bassGain);
          bassGain.connect(this.ctx.destination);

          bassOsc.start();
          bassOsc.stop(this.ctx.currentTime + 0.3);
        }

        // Arpeggiated melody note
        const currentChord = melodyNotes[chordIdx];
        const noteFreq = currentChord[subStep % currentChord.length];
        
        const leadOsc = this.ctx.createOscillator();
        const leadGain = this.ctx.createGain();
        leadOsc.type = 'sine';
        leadOsc.frequency.setValueAtTime(noteFreq, this.ctx.currentTime);

        leadGain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        leadGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

        leadOsc.connect(leadGain);
        leadGain.connect(this.ctx.destination);

        leadOsc.start();
        leadOsc.stop(this.ctx.currentTime + 0.22);

        this.currentStep++;
      }, stepTime * 1000);

    } catch (e) {
      console.warn("Synth audio loop error:", e);
    }
  }

  stopSynthMusic() {
    this.isPlayingMusic = false;
    if (this.synthLoopInterval) {
      clearInterval(this.synthLoopInterval);
      this.synthLoopInterval = null;
    }
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      this.stopSynthMusic();
      return false;
    } else {
      this.startSynthMusic();
      return true;
    }
  }
}

export const soundEngine = new SoundEngine();
