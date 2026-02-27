'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [clicking, setClicking] = useState(false);
    const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

    useEffect(() => {
        // Check if touch device
        if ('ontouchstart' in window) return;

        const handleMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleDown = (e: MouseEvent) => {
            setClicking(true);
            // Add sparkle on click
            const id = Date.now();
            setSparkles((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
            setTimeout(() => {
                setSparkles((prev) => prev.filter((s) => s.id !== id));
            }, 800);
        };

        const handleUp = () => setClicking(false);

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mousedown', handleDown);
        window.addEventListener('mouseup', handleUp);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mousedown', handleDown);
            window.removeEventListener('mouseup', handleUp);
        };
    }, []);

    return (
        <>
            <div
                className={`custom-cursor ${clicking ? 'clicking' : ''}`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                }}
            />
            {sparkles.map((sparkle) => (
                <div
                    key={sparkle.id}
                    style={{
                        position: 'fixed',
                        left: sparkle.x - 10,
                        top: sparkle.y - 10,
                        width: 20,
                        height: 20,
                        pointerEvents: 'none',
                        zIndex: 10001,
                    }}
                >
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                backgroundColor: '#4a9eff',
                                top: '50%',
                                left: '50%',
                                animation: `sparkle-${i} 0.8s ease-out forwards`,
                                boxShadow: '0 0 6px #4a9eff',
                            }}
                        />
                    ))}
                </div>
            ))}
            <style jsx>{`
        @keyframes sparkle-0 { to { transform: translate(-15px, -15px); opacity: 0; } }
        @keyframes sparkle-1 { to { transform: translate(15px, -15px); opacity: 0; } }
        @keyframes sparkle-2 { to { transform: translate(-18px, 5px); opacity: 0; } }
        @keyframes sparkle-3 { to { transform: translate(18px, 5px); opacity: 0; } }
        @keyframes sparkle-4 { to { transform: translate(-5px, -20px); opacity: 0; } }
        @keyframes sparkle-5 { to { transform: translate(5px, 18px); opacity: 0; } }
      `}</style>
        </>
    );
}
