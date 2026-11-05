/**
 * Elegant Butterfly Sound Effects & Ambient Synthesizer
 * Built with Web Audio API - 100% self-contained, zero external audio dependencies.
 * OFF by default, respects user interaction, zero annoying buzzes.
 */
class ButterflySoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true; // OFF by default as required
  private ambientGain: GainNode | null = null;
  private ambientOscs: OscillatorNode[] = [];
  private isAmbientRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private lastFlutterTime: number = 0;
  private lastSparkleTime: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem('rr_portfolio_audio_enabled');
      // Always start muted by default unless user previously toggled it on in this session
      this.isMuted = saved !== 'true';
    }
  }

  private init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    } catch {
      // AudioContext unavailable
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('rr_portfolio_audio_enabled', (!this.isMuted).toString());
    }

    this.init();

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime, 0.05);
    }

    if (!this.isMuted) {
      this.playSparkle(0.04);
      this.startAmbient();
    } else {
      this.stopAmbient();
    }

    return this.isMuted;
  }

  /**
   * 1. Large Butterfly: Soft, delicate airy wing-flutter sound
   * Gentle filtered pink noise burst modulated by wing flap velocity (never loud or buzzy)
   */
  public playLargeWingFlutter(intensity: number = 0.5) {
    if (this.isMuted || !this.ctx || this.ctx.state !== 'running') return;

    const now = this.ctx.currentTime;
    if (now - this.lastFlutterTime < 0.22) return; // prevent overlap
    this.lastFlutterTime = now;

    try {
      // Generate short buffer of soft noise
      const bufferSize = this.ctx.sampleRate * 0.14; // 140ms
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink/soft noise generation
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.25;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Soft bandpass filter tuned to an airy breeze (600Hz - 1200Hz)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(750 + Math.random() * 200, now);
      filter.Q.value = 1.2;

      // Smooth amplitude envelope
      const gain = this.ctx.createGain();
      const vol = Math.min(0.028, 0.015 * intensity);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(vol, now + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.135);

      noise.connect(filter);
      filter.connect(gain);
      if (this.masterGain) gain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + 0.14);
    } catch {
      // safe guard
    }
  }

  /**
   * 2. Small Butterfly: Very subtle magical sparkle / chime
   * Delicate crystal sine bell spaced out randomly
   */
  public playSparkle(volume: number = 0.025) {
    if (this.isMuted || !this.ctx || this.ctx.state !== 'running') return;

    const now = this.ctx.currentTime;
    if (now - this.lastSparkleTime < 0.6) return; // spaced out to prevent audio clutter
    this.lastSparkleTime = now;

    try {
      const frequencies = [1046.5, 1318.5, 1567.98, 2093.0]; // C6, E6, G6, C7 pentatonic chime
      const freq = frequencies[Math.floor(Math.random() * frequencies.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + 0.18);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(volume, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

      osc.connect(gain);
      if (this.masterGain) gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // safe guard
    }
  }

  /**
   * 3. Ambient: Soft dreamy background pad
   * Ultra-low volume ethereal drone in D minor / F major
   */
  public startAmbient() {
    if (this.isAmbientRunning || this.isMuted) return;
    this.init();
    if (!this.ctx || this.ctx.state !== 'running') return;

    try {
      const freqs = [146.83, 220.0, 261.63, 329.63]; // D3, A3, C4, E4
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.ambientGain.gain.linearRampToValueAtTime(0.008, this.ctx.currentTime + 3.0); // very soft

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 380;

      this.ambientOscs = freqs.map((f, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.value = f;
        osc.connect(filter);
        osc.start();
        return osc;
      });

      filter.connect(this.ambientGain);
      if (this.masterGain) this.ambientGain.connect(this.masterGain);

      this.isAmbientRunning = true;
    } catch {
      // safe guard
    }
  }

  public stopAmbient() {
    if (!this.isAmbientRunning) return;
    try {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      }
      setTimeout(() => {
        this.ambientOscs.forEach((o) => {
          try {
            o.stop();
          } catch {}
        });
        this.ambientOscs = [];
        this.isAmbientRunning = false;
      }, 900);
    } catch {
      this.isAmbientRunning = false;
    }
  }

  public playSelect() {
    this.playSparkle(0.035);
  }

  public playHover() {
    // Very subtle micro-sparkle on button hover
    if (this.isMuted) return;
    this.playSparkle(0.015);
  }
}

export const soundEffects = new ButterflySoundEngine();
