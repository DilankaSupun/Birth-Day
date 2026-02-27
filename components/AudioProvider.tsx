'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { playSoftClick } from '@/lib/sounds';

// Allow any page to pause/resume the background music
declare global {
    interface Window {
        __pauseBgMusic?: () => void;
        __resumeBgMusic?: () => void;
    }
}

export default function AudioProvider({ children }: { children: React.ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Create audio element
        const audio = new Audio('/audio/Ed Sheeran - Perfect (Lyrics).mp3');
        audio.loop = true;
        audio.volume = 0.10;
        audio.preload = 'auto';

        audio.addEventListener('canplaythrough', () => {
            setReady(true);
            audioRef.current = audio;
        });

        // Silently ignore if file doesn't exist
        audio.addEventListener('error', () => setReady(false));

        return () => { audio.pause(); audio.src = ''; };
    }, []);

    // Expose pause/resume globally
    useEffect(() => {
        window.__pauseBgMusic = () => {
            if (audioRef.current && !audioRef.current.paused) {
                audioRef.current.pause();
                setPlaying(false);
            }
        };
        window.__resumeBgMusic = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().catch(() => { });
                setPlaying(true);
            }
        };
        return () => {
            delete window.__pauseBgMusic;
            delete window.__resumeBgMusic;
        };
    }, []);

    // Auto-play on first interaction
    useEffect(() => {
        if (!ready) return;

        const handleInteraction = () => {
            if (audioRef.current) {
                audioRef.current.volume = 0;
                audioRef.current.play().then(() => {
                    setPlaying(true);
                    // Fade in
                    let vol = 0;
                    const fade = setInterval(() => {
                        vol += 0.01;
                        if (audioRef.current && vol <= 0.05) {
                            audioRef.current.volume = vol;
                        } else clearInterval(fade);
                    }, 40);
                }).catch(() => { });
            }
        };

        document.addEventListener('touchstart', handleInteraction, { once: true });
        document.addEventListener('click', handleInteraction, { once: true });
        return () => {
            document.removeEventListener('touchstart', handleInteraction);
            document.removeEventListener('click', handleInteraction);
        };
    }, [ready]);

    const toggle = () => {
        if (!audioRef.current) return;
        playSoftClick();
        if (playing) {
            audioRef.current.pause();
            setPlaying(false);
        } else {
            audioRef.current.play().catch(() => { });
            setPlaying(true);
        }
    };

    return (
        <>
            {children}
            {ready && (
                <button
                    onClick={toggle}
                    aria-label={playing ? 'Mute' : 'Play'}
                    style={{
                        position: 'fixed',
                        top: '16px',
                        right: '16px',
                        zIndex: 1000,
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'rgba(13, 27, 42, 0.7)',
                        border: '1px solid rgba(74, 158, 255, 0.3)',
                        color: '#a8d4ff',
                        fontSize: '1.2rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        backdropFilter: 'blur(10px)',
                        WebkitTapHighlightColor: 'transparent',
                    }}
                >
                    {playing ? '🎵' : '🔇'}
                </button>
            )}
        </>
    );
}
