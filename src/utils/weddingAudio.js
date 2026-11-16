/**
 * Wedding Audio Engine - Exclusively for "Tum Mile - Love Reprise"
 * 
 * Auto-plays seamlessly on website load and first interaction!
 */

class WeddingAudioEngine {
  constructor() {
    this.audioElement = null;
    this.ctx = null;
    this.isPlaying = false;
    this.isSynthesized = false;
    this.synthTimeout = null;
    this.listeners = new Set();
    this.hasInteracted = false;
  }

  init() {
    if (!this.audioElement && typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.audioElement.src = '/audio/tum-mile.mp3';
      this.audioElement.loop = true;
      this.audioElement.preload = 'auto';

      this.audioElement.addEventListener('playing', () => {
        this.isPlaying = true;
        this.notify();
      });

      this.audioElement.addEventListener('pause', () => {
        this.isPlaying = false;
        this.notify();
      });

      this.audioElement.addEventListener('error', (e) => {
        console.warn('Local MP3 playback note:', e);
      });
    }

    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notify() {
    this.listeners.forEach(cb => cb({ isPlaying: this.isPlaying }));
  }

  // Attempt automatic start immediately and on first user gesture
  autoStartOnFirstGesture() {
    this.init();

    // 1. Try immediate direct play (works if browser allows or in PWA / restored tab)
    this.play().catch(() => {
      // Browser blocked silent autoplay -> attach listener to start on very first user tap/click/scroll
      const startPlayback = () => {
        if (!this.isPlaying) {
          this.play();
        }
        window.removeEventListener('click', startPlayback);
        window.removeEventListener('touchstart', startPlayback);
        window.removeEventListener('scroll', startPlayback);
        window.removeEventListener('keydown', startPlayback);
      };

      window.addEventListener('click', startPlayback, { once: true, passive: true });
      window.addEventListener('touchstart', startPlayback, { once: true, passive: true });
      window.addEventListener('scroll', startPlayback, { once: true, passive: true });
      window.addEventListener('keydown', startPlayback, { once: true, passive: true });
    });
  }

  async play() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      await this.ctx.resume().catch(() => {});
    }

    if (this.audioElement) {
      try {
        await this.audioElement.play();
        this.isPlaying = true;
        this.notify();
        return;
      } catch (err) {
        // Fallback: If browser restricts HTML5 media, start high-fidelity acoustic melody
        this.startTumMileSynth();
      }
    } else {
      this.startTumMileSynth();
    }
  }

  pause() {
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopTumMileSynth();
    this.isPlaying = false;
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  // Chime effect for buttons
  playRoyalChime() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [587.33, 739.99, 880, 1174.66];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = this.ctx.currentTime + (idx * 0.08);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.85);
      });
    } catch {}
  }

  // Soulful melody notes of "Tum Mile" (Raag / acoustic acoustic notes)
  // "Tu hi meri hai saari wafa... Tum mile toh jadoo chha gaya..."
  startTumMileSynth() {
    try {
      this.init();
      if (!this.ctx) return;
      this.isPlaying = true;
      this.isSynthesized = true;
      this.notify();

      const melody = [
        { f: 392.00, d: 0.6 }, // G4 - Tum
        { f: 440.00, d: 0.7 }, // A4 - mi-
        { f: 523.25, d: 1.0 }, // C5 - le
        { f: 493.88, d: 0.6 }, // B4 - toh
        { f: 440.00, d: 0.8 }, // A4 - ja-
        { f: 392.00, d: 0.6 }, // G4 - doo
        { f: 369.99, d: 0.9 }, // F#4 - chha
        { f: 392.00, d: 1.2 }, // G4 - ga-ya
        { f: 0, d: 0.4 },      // pause
        { f: 392.00, d: 0.6 }, // G4 - Tum
        { f: 440.00, d: 0.7 }, // A4 - mi-
        { f: 523.25, d: 1.0 }, // C5 - le
        { f: 493.88, d: 0.6 }, // B4 - toh
        { f: 440.00, d: 0.8 }, // A4 - jee-
        { f: 392.00, d: 0.6 }, // G4 - na
        { f: 440.00, d: 0.9 }, // A4 - aa
        { f: 392.00, d: 1.4 }, // G4 - ga-ya
        { f: 0, d: 0.5 },
      ];

      let noteIdx = 0;

      const playNext = () => {
        if (!this.isPlaying || !this.isSynthesized || !this.ctx) return;

        const note = melody[noteIdx];
        noteIdx = (noteIdx + 1) % melody.length;

        if (note.f > 0) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(note.f, this.ctx.currentTime);

          gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + note.d);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + note.d + 0.05);
        }

        this.synthTimeout = setTimeout(playNext, (note.d + 0.1) * 1000);
      };

      playNext();
    } catch {}
  }

  stopTumMileSynth() {
    this.isSynthesized = false;
    if (this.synthTimeout) {
      clearTimeout(this.synthTimeout);
      this.synthTimeout = null;
    }
  }
}

export const weddingAudio = new WeddingAudioEngine();
