// "Perfect" by Ed Sheeran — Instrumental Piano Version
// Synthesized using Web Audio API (chord progression + melody)
// Key of G major, 6/8 time feel

let musicContext: AudioContext | null = null;
let musicPlaying = false;
let scheduledTimeout: ReturnType<typeof setTimeout> | null = null;

function getMusicContext(): AudioContext {
    if (!musicContext) {
        musicContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    if (musicContext.state === 'suspended') {
        musicContext.resume();
    }
    return musicContext;
}

// Note frequencies
const NOTE: Record<string, number> = {
    'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F#3': 185.00, 'G3': 196.00,
    'A3': 220.00, 'B3': 246.94,
    'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F#4': 369.99, 'G4': 392.00,
    'A4': 440.00, 'B4': 493.88,
    'C5': 523.25, 'D5': 587.33, 'E5': 659.26, 'F#5': 739.99, 'G5': 783.99,
    'A5': 880.00, 'B5': 987.77,
};

// Piano-like tone with envelope
function playNote(ctx: AudioContext, freq: number, start: number, duration: number, vol: number) {
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Two detuned oscillators for richer tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, start);
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq, start);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, start);
    filter.frequency.exponentialRampToValueAtTime(600, start + duration);

    // Piano-like envelope: quick attack, slow decay
    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(vol, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(vol * 0.6, start + duration * 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + duration + 0.05);
    osc2.start(start);
    osc2.stop(start + duration + 0.05);
}

// Soft pad chord for background warmth
function playPad(ctx: AudioContext, freqs: number[], start: number, duration: number, vol: number) {
    freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(vol, start + duration * 0.3);
        gain.gain.linearRampToValueAtTime(vol * 0.7, start + duration * 0.7);
        gain.gain.linearRampToValueAtTime(0, start + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + duration + 0.05);
    });
}

// Arpeggio pattern for a chord (6/8 feel)
function playArpeggio(ctx: AudioContext, notes: string[], start: number, beatLen: number, vol: number) {
    // Pattern: root, 3rd, 5th, 3rd, 5th, high root (6 notes per bar)
    const pattern = [0, 1, 2, 1, 2, 1];
    pattern.forEach((idx, i) => {
        const noteFreq = NOTE[notes[idx % notes.length]];
        if (noteFreq) {
            playNote(ctx, noteFreq, start + i * beatLen, beatLen * 1.5, vol);
        }
    });
}

// "Perfect" melody (simplified main theme, Key of G)
interface MelodyNote { note: string; beats: number; }

const VERSE_MELODY: MelodyNote[] = [
    // "I found a love for me"
    { note: 'B4', beats: 1 }, { note: 'B4', beats: 0.5 }, { note: 'B4', beats: 0.5 },
    { note: 'A4', beats: 0.5 }, { note: 'G4', beats: 1.5 },
    { note: 'A4', beats: 1 }, { note: 'G4', beats: 1 },
    // "Darling just dive right in"
    { note: 'B4', beats: 1 }, { note: 'B4', beats: 0.5 }, { note: 'B4', beats: 0.5 },
    { note: 'B4', beats: 0.5 }, { note: 'A4', beats: 0.5 }, { note: 'G4', beats: 1.5 },
    { note: 'A4', beats: 0.5 }, { note: 'B4', beats: 0.5 }, { note: 'A4', beats: 0.5 }, { note: 'G4', beats: 1.5 },
];

const CHORUS_MELODY: MelodyNote[] = [
    // "Baby, I'm dancing in the dark"
    { note: 'D5', beats: 1 }, { note: 'D5', beats: 0.5 }, { note: 'D5', beats: 0.5 },
    { note: 'D5', beats: 0.5 }, { note: 'E5', beats: 0.5 }, { note: 'D5', beats: 1 },
    { note: 'B4', beats: 1 }, { note: 'A4', beats: 1 },
    // "with you between my arms"
    { note: 'B4', beats: 1 }, { note: 'B4', beats: 0.5 }, { note: 'B4', beats: 0.5 },
    { note: 'A4', beats: 0.5 }, { note: 'G4', beats: 1.5 },
    { note: 'G4', beats: 1 }, { note: 'A4', beats: 1 },
    // "Barefoot on the grass"
    { note: 'D5', beats: 1 }, { note: 'D5', beats: 0.5 }, { note: 'D5', beats: 0.5 },
    { note: 'E5', beats: 0.5 }, { note: 'D5', beats: 1.5 },
    { note: 'B4', beats: 1 }, { note: 'A4', beats: 1 },
    // "listening to our favourite song"
    { note: 'B4', beats: 0.5 }, { note: 'B4', beats: 0.5 }, { note: 'B4', beats: 0.5 },
    { note: 'B4', beats: 0.5 }, { note: 'A4', beats: 0.5 }, { note: 'G4', beats: 1.5 },
    { note: 'E4', beats: 1 }, { note: 'D4', beats: 2 },
];

// Chord progressions
const VERSE_CHORDS = [
    ['G3', 'B3', 'D4'],  // G
    ['E3', 'G3', 'B3'],  // Em
    ['C3', 'E3', 'G3'],  // C
    ['D3', 'F#3', 'A3'], // D
];

const CHORUS_CHORDS = [
    ['E3', 'G3', 'B3'],  // Em
    ['C3', 'E3', 'G3'],  // C
    ['G3', 'B3', 'D4'],  // G
    ['D3', 'F#3', 'A3'], // D
    ['E3', 'G3', 'B3'],  // Em
    ['C3', 'E3', 'G3'],  // C
    ['G3', 'B3', 'D4'],  // G
    ['D3', 'F#3', 'A3'], // D
];

function playSection(
    ctx: AudioContext,
    startTime: number,
    chords: string[][],
    melody: MelodyNote[],
    barDuration: number,
) {
    const beatLen = barDuration / 6; // 6/8 time

    // Play chords (arpeggiated)
    chords.forEach((chord, i) => {
        const chordStart = startTime + i * barDuration;
        playArpeggio(ctx, chord, chordStart, beatLen, 0.035);
        // Soft pad underneath
        const padFreqs = chord.map((n) => NOTE[n] * 0.5); // one octave lower
        playPad(ctx, padFreqs, chordStart, barDuration, 0.015);
    });

    // Play melody on top
    let melodyTime = startTime;
    melody.forEach((m) => {
        const dur = m.beats * beatLen;
        playNote(ctx, NOTE[m.note], melodyTime, dur * 0.9, 0.05);
        melodyTime += dur;
    });

    return chords.length * barDuration;
}

function scheduleFullSong() {
    if (!musicPlaying || !musicContext) return;

    const ctx = musicContext;
    const now = ctx.currentTime + 0.1;
    const barDuration = 3.2; // seconds per bar (slow, romantic tempo)

    let time = now;

    // Intro: just chords (2 bars)
    VERSE_CHORDS.slice(0, 2).forEach((chord, i) => {
        const beatLen = barDuration / 6;
        playArpeggio(ctx, chord, time + i * barDuration, beatLen, 0.03);
        const padFreqs = chord.map((n) => NOTE[n] * 0.5);
        playPad(ctx, padFreqs, time + i * barDuration, barDuration, 0.012);
    });
    time += 2 * barDuration;

    // Verse
    const verseDur = playSection(ctx, time, VERSE_CHORDS, VERSE_MELODY, barDuration);
    time += verseDur;

    // Small pause
    time += barDuration * 0.5;

    // Chorus
    const chorusDur = playSection(ctx, time, CHORUS_CHORDS, CHORUS_MELODY, barDuration);
    time += chorusDur;

    // Gentle ending chord
    playPad(ctx, [NOTE['G3'], NOTE['B3'], NOTE['D4']], time, barDuration * 2, 0.02);
    time += barDuration * 2;

    // Total duration — schedule next loop
    const totalMs = (time - now) * 1000;
    scheduledTimeout = setTimeout(() => {
        if (musicPlaying) scheduleFullSong();
    }, totalMs - 500);
}

export function startAmbientMusic() {
    if (musicPlaying) return;
    try {
        getMusicContext();
        musicPlaying = true;
        scheduleFullSong();
    } catch (e) {
        console.log('Music not available:', e);
    }
}

export function stopAmbientMusic() {
    musicPlaying = false;
    if (scheduledTimeout) {
        clearTimeout(scheduledTimeout);
        scheduledTimeout = null;
    }
    if (musicContext) {
        musicContext.close().catch(() => { });
        musicContext = null;
    }
}

export function isAmbientPlaying() {
    return musicPlaying;
}
