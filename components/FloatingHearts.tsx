'use client';

import { useEffect, useState } from 'react';

interface Heart {
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

export default function FloatingHearts({ count = 15 }: { count?: number }) {
    const [hearts, setHearts] = useState<Heart[]>([]);

    useEffect(() => {
        const generated: Heart[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: Math.random() * 16 + 10,
            duration: Math.random() * 10 + 15,
            delay: Math.random() * 15,
            opacity: Math.random() * 0.3 + 0.1,
        }));
        setHearts(generated);
    }, [count]);

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
                overflow: 'hidden',
            }}
        >
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    style={{
                        position: 'absolute',
                        left: `${heart.left}%`,
                        bottom: '-50px',
                        fontSize: `${heart.size}px`,
                        opacity: heart.opacity,
                        animation: `heart-float ${heart.duration}s linear ${heart.delay}s infinite`,
                        color: '#4a9eff',
                        filter: 'blur(0.5px)',
                    }}
                >
                    💙
                </div>
            ))}
        </div>
    );
}
