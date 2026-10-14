// Audio utility using Web Audio API and Web Speech API

class SoundManager {
  constructor() {
    this.muted = false;
    this.audioCtx = null;

    try {
      const storedMute = localStorage.getItem('deutsch_decode_muted');
      if (storedMute !== null) {
        this.muted = storedMute === 'true';
      }
    } catch {
      // localStorage may be disabled
    }
  }

  getAudioContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  toggleMute() {
    this.muted = !this.muted;
    try {
      localStorage.setItem('deutsch_decode_muted', this.muted);
    } catch {
      // ignore
    }
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Play button click sound
  playClick() {
    if (this.muted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext unavailable
    }
  }

  // Play pleasant success chime (C5 -> E5 -> G5)
  playSuccess() {
    if (this.muted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
      });
    } catch {
      // AudioContext unavailable
    }
  }

  // Play gentle error tone
  playError() {
    if (this.muted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(180, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } catch {
      // AudioContext unavailable
    }
  }

  // Play victory fanfare upon completing game
  playVictory() {
    if (this.muted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      // Fanfare notes: G4, C5, E5, G5, hold C6
      const melody = [
        { f: 392.00, d: 0.12, t: 0.0 },
        { f: 523.25, d: 0.12, t: 0.14 },
        { f: 659.25, d: 0.12, t: 0.28 },
        { f: 783.99, d: 0.25, t: 0.42 },
        { f: 659.25, d: 0.12, t: 0.70 },
        { f: 1046.50, d: 0.60, t: 0.84 }
      ];

      melody.forEach(n => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(n.f, ctx.currentTime + n.t);

        gain.gain.setValueAtTime(0.2, ctx.currentTime + n.t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.t + n.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + n.t);
        osc.stop(ctx.currentTime + n.t + n.d);
      });
    } catch {
      // AudioContext unavailable
    }
  }

  // German Text-to-Speech using de-DE
  speakGerman(text) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis is not supported on this browser.');
      return false;
    }

    try {
      // Clean word formatting (e.g. remove trailing punctuation for cleaner pronunciation)
      const cleanText = text.replace(/[?!.]/g, '').trim();

      window.speechSynthesis.cancel(); // Stop any pending utterance
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'de-DE';
      utterance.rate = 0.88; // Slightly slower for language learners

      // Try to find a high quality German voice
      const voices = window.speechSynthesis.getVoices();
      const germanVoice = voices.find(v => v.lang.startsWith('de') || v.lang.includes('DE'));
      if (germanVoice) {
        utterance.voice = germanVoice;
      }

      window.speechSynthesis.speak(utterance);
      return true;
    } catch (err) {
      console.warn('TTS error:', err);
      return false;
    }
  }
}

export const soundManager = new SoundManager();
