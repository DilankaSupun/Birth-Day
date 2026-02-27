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
