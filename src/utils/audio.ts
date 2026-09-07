// Web Audio API Synthesizer for rich Egyptian Slot Sound Effects & Ambient Music

class SoundEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = false;
  private musicInterval: any = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (enabled) {
      this.startAmbientEgyptianMusic();
    } else {
      this.stopAmbientEgyptianMusic();
    }
  }

  public playSpinStart() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {
      // Audio not permitted yet
    }
  }

  public playReelTick() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(160 + Math.random() * 40, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {}
  }

  public playReelStop(reelIndex: number) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const baseFreq = 120 + reelIndex * 25;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.12);
      
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {}
  }

  public playScatterAnticipation() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.4);
      
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.45);
    } catch {}
  }

  public playLineWin() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.08);
        osc.stop(this.ctx.currentTime + i * 0.08 + 0.25);
      });
    } catch {}
  }

  public playBigWin() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Ancient Egyptian Phrygian dominant arpeggio: D4, Eb4, F#4, G4, A4, Bb4, C5, D5
      const notes = [293.66, 311.13, 369.99, 392.00, 440.00, 466.16, 523.25, 587.33];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.09 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.09);
        osc.stop(this.ctx.currentTime + idx * 0.09 + 0.4);
      });
    } catch {}
  }

  public playJackpotChime() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const chords = [587.33, 739.99, 880.00, 1174.66]; // D Major Egyptian fanfare
      chords.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.8);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 1.8);
      });
    } catch {}
  }

  public playCoin() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1318.51, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {}
  }

  public playButtonClick() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {}
  }

  public playBonusTrigger() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Mystic Gong resonance
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(110, this.ctx.currentTime);
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(220, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);
      osc1.start();
      osc2.start();
      osc1.stop(this.ctx.currentTime + 2.5);
      osc2.stop(this.ctx.currentTime + 2.5);
    } catch {}
  }

  private startAmbientEgyptianMusic() {
    this.stopAmbientEgyptianMusic();
    if (!this.musicEnabled) return;

    // Soft mystical Egyptian harp / Ney flute scale loop (D Phrygian Dominant)
    const scale = [293.66, 311.13, 369.99, 392.00, 440.00, 466.16];
    let step = 0;

    this.musicInterval = setInterval(() => {
      if (!this.musicEnabled || !this.soundEnabled) return;
      this.init();
      if (!this.ctx) return;

      try {
        const freq = scale[step % scale.length];
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 1.2);
        step = (step + 1) % (scale.length * 2);
      } catch {}
    }, 1400);
  }

  private stopAmbientEgyptianMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

export const sound = new SoundEngine();
export const audioEngine = sound;
