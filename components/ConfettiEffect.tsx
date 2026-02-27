'use client';

import { useCallback } from 'react';
import confetti from 'canvas-confetti';

export function useConfetti() {
    const fireConfetti = useCallback(() => {
        const duration = 5000;
        const end = Date.now() + duration;
        const colors = ['#4a9eff', '#6db3f8', '#a8d4ff', '#ff6b9d', '#ffd700'];

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.7 },
                colors,
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.7 },
                colors,
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();

        // Big burst
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 100,
                origin: { x: 0.5, y: 0.5 },
                colors,
                startVelocity: 30,
                gravity: 0.8,
            });
        }, 500);
    }, []);

    return fireConfetti;
}

export default function ConfettiEffect({ fire }: { fire: boolean }) {
    const fireConfetti = useConfetti();

    if (fire) {
        // Trigger on mount
        setTimeout(fireConfetti, 100);
    }

    return null;
}
