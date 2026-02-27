'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface MusicPlayerProps {
    src: string;
    volume?: number;
    loop?: boolean;
    autoFadeIn?: boolean;
}

export default function MusicPlayer({ src, volume = 0.3, loop = true, autoFadeIn = true }: MusicPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [audioReady, setAudioReady] = useState(false);

    // Only show the player once audio is confirmed loadable
    useEffect(() => {
        const audio = new Audio();
        audio.preload = 'auto';

        audio.addEventListener('canplaythrough', () => {
            setAudioReady(true);
            audioRef.current = audio;
            audio.loop = loop;
        });

        // Silently ignore load failures — no console noise
        audio.addEventListener('error', () => {
            setAudioReady(false);
        });

        audio.src = src;

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, [src, loop]);

    const startPlaying = useCallback(() => {
        if (audioRef.current && !isPlaying && audioReady) {
            audioRef.current.volume = autoFadeIn ? 0 : volume;
            audioRef.current.play().then(() => {
                setIsPlaying(true);
                if (autoFadeIn && audioRef.current) {
                    let currentVol = 0;
                    const fadeInterval = setInterval(() => {
                        currentVol += 0.01;
                        if (audioRef.current && currentVol <= volume) {
                            audioRef.current.volume = currentVol;
                        } else {
                            clearInterval(fadeInterval);
                        }
                    }, 40);
                }
            }).catch(() => { });
        }
    }, [isPlaying, volume, autoFadeIn, audioReady]);

    useEffect(() => {
        if (!hasInteracted && audioReady) {
            const handleInteraction = () => {
                setHasInteracted(true);
                startPlaying();
                document.removeEventListener('touchstart', handleInteraction);
                document.removeEventListener('click', handleInteraction);
            };

            document.addEventListener('touchstart', handleInteraction, { once: true });
            document.addEventListener('click', handleInteraction, { once: true });

            return () => {
                document.removeEventListener('touchstart', handleInteraction);
                document.removeEventListener('click', handleInteraction);
            };
        }
    }, [hasInteracted, startPlaying, audioReady]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().catch(() => { });
                setIsPlaying(true);
            }
        }
    };

    // Completely hidden when no audio file available
    if (!audioReady) return null;

    return (
        <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Mute music' : 'Play music'}
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
                transition: 'all 0.3s ease',
                WebkitTapHighlightColor: 'transparent',
            }}
        >
            {isPlaying ? '🎵' : '🔇'}
        </button>
    );
}
