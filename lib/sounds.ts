// Web Audio API synthesized sound effects — no audio files needed!
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
    if (!audioContext) {
        audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    return audioContext;
}

// Sparkle / magical unlock sound
export function playSparkle() {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        [0, 0.08, 0.16, 0.24].forEach((delay, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(800 + i * 200, now + delay);
            osc.frequency.exponentialRampToValueAtTime(2000 + i * 300, now + delay + 0.15);

            gain.gain.setValueAtTime(0.08, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.2);

            osc.start(now + delay);
            osc.stop(now + delay + 0.25);
        });
    } catch (e) {
        console.log('Audio not available:', e);
    }
}

// Soft click sound
export function playSoftClick() {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

        osc.start(now);
        osc.stop(now + 0.12);
    } catch (e) {
        console.log('Audio not available:', e);
    }
}

// Whoosh / page transition
export function playWhoosh() {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        const bufferSize = ctx.sampleRate * 0.3;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.3;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(500, now);
        filter.frequency.exponentialRampToValueAtTime(2000, now + 0.15);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.3);
        filter.Q.value = 1;

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(now);
        noise.stop(now + 0.35);
    } catch (e) {
        console.log('Audio not available:', e);
    }
}

// Heartbeat thump
export function playHeartbeat() {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        [0, 0.25].forEach((delay, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(i === 0 ? 80 : 60, now + delay);
            osc.frequency.exponentialRampToValueAtTime(40, now + delay + 0.15);

            gain.gain.setValueAtTime(i === 0 ? 0.15 : 0.1, now + delay);
            gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.2);

            osc.start(now + delay);
            osc.stop(now + delay + 0.25);
        });
    } catch (e) {
        console.log('Audio not available:', e);
    }
}

// Celebration / confetti chime
export function playCelebration() {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        const notes = [523, 659, 784, 1047, 1318];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.1);

            gain.gain.setValueAtTime(0.08, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);

            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.5);
        });
    } catch (e) {
        console.log('Audio not available:', e);
    }
}

// Error / wrong password buzz
export function playError() {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.setValueAtTime(150, now + 0.1);

        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.start(now);
        osc.stop(now + 0.25);
    } catch (e) {
        console.log('Audio not available:', e);
    }
}

// Dodge / NO button escape sound
export function playDodge() {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        osc.start(now);
        osc.stop(now + 0.2);
    } catch (e) {
        console.log('Audio not available:', e);
    }
}

// Envelope open sound
export function playEnvelopeOpen() {
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime;

        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.15;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = 3000;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.04, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(now);
        noise.stop(now + 0.25);

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now + 0.1);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
        gain.gain.setValueAtTime(0.06, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now + 0.1);
        osc.stop(now + 0.45);
    } catch (e) {
        console.log('Audio not available:', e);
    }
}

// Happy Birthday melody — full song, synthesized piano-like tone
export function playHappyBirthday(): () => void {
    const oscillators: OscillatorNode[] = [];
    try {
        const ctx = getAudioContext();
        const now = ctx.currentTime + 0.1;

        // Note frequencies (Hz)
        const NOTE: Record<string, number> = {
            C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
            G4: 392.00, A4: 440.00, B4: 493.88,
            C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46,
            G5: 783.99, A5: 880.00,
        };

        // Happy Birthday melody: [note, duration in beats]
        // Tempo: ~100 bpm → 1 beat = 0.6s
        const BPM = 100;
        const BEAT = 60 / BPM;
        const song: [string, number][] = [
            ['G4', 0.75], ['G4', 0.25], ['A4', 1], ['G4', 1], ['C5', 1], ['B4', 2],
            ['G4', 0.75], ['G4', 0.25], ['A4', 1], ['G4', 1], ['D5', 1], ['C5', 2],
            ['G4', 0.75], ['G4', 0.25], ['G5', 1], ['E5', 1], ['C5', 1], ['B4', 1], ['A4', 2],
            ['F5', 0.75], ['F5', 0.25], ['E5', 1], ['C5', 1], ['D5', 1], ['C5', 3],
        ];

        let t = now;
        song.forEach(([note, beats]) => {
            const freq = NOTE[note];
            const dur = beats * BEAT;

            // Triangle oscillator (body of the note)
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t);
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(0.12, t + 0.02);
            gain.gain.setValueAtTime(0.1, t + dur * 0.7);
            gain.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.95);
            osc.start(t);
            osc.stop(t + dur);
            oscillators.push(osc);

            // Sine oscillator (harmonic shimmer)
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(freq * 2, t);
            gain2.gain.setValueAtTime(0.03, t);
            gain2.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.8);
            osc2.start(t);
            osc2.stop(t + dur);
            oscillators.push(osc2);

            t += dur;
        });
    } catch (e) {
        console.log('Audio not available:', e);
    }

    // Return a stop function so the page can clean up
    return () => {
        oscillators.forEach((o) => {
            try { o.stop(); } catch (_) { /* already stopped */ }
        });
    };
}
