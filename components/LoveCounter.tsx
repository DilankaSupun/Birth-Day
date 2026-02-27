'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function LoveCounter() {
    const [totalDays, setTotalDays] = useState(0);
    const [totalHours, setTotalHours] = useState(0);
    const [displayDays, setDisplayDays] = useState(0);

    useEffect(() => {
        // Relationship start: approximately 3 years, 4 months, 23 days before Feb 28, 2026
        // That would be around October 5, 2022
        const startDate = new Date(2022, 9, 5); // Oct 5, 2022
        const now = new Date();
        const diffMs = now.getTime() - startDate.getTime();
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        setTotalDays(days);
        setTotalHours(hours);
    }, []);

    // Animate counter
    useEffect(() => {
        if (totalDays === 0) return;
        let current = 0;
        const step = Math.ceil(totalDays / 60);
        const interval = setInterval(() => {
            current += step;
            if (current >= totalDays) {
                current = totalDays;
                clearInterval(interval);
            }
            setDisplayDays(current);
        }, 30);
        return () => clearInterval(interval);
    }, [totalDays]);

    const units = [
        { value: '3', label: 'Years' },
        { value: '4', label: 'Months' },
        { value: '23', label: 'Days' },
    ];

    return (
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '40px',
                    flexWrap: 'wrap',
                    marginBottom: '40px',
                }}
            >
                {units.map((unit, index) => (
                    <motion.div
                        key={unit.label}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.3, duration: 0.8, ease: 'easeOut' }}
                        style={{
                            textAlign: 'center',
                            padding: '20px',
                        }}
                    >
                        <div
                            className="font-playfair text-glow-strong"
                            style={{
                                fontSize: 'clamp(3rem, 8vw, 5rem)',
                                fontWeight: 700,
                                color: '#4a9eff',
                                lineHeight: 1,
                            }}
                        >
                            {unit.value}
                        </div>
                        <div
                            style={{
                                fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                                color: 'rgba(168, 212, 255, 0.7)',
                                marginTop: '8px',
                                letterSpacing: '3px',
                                textTransform: 'uppercase',
                            }}
                        >
                            {unit.label}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                style={{
                    marginTop: '20px',
                }}
            >
                <p
                    style={{
                        fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
                        color: 'rgba(168, 212, 255, 0.6)',
                        marginBottom: '8px',
                    }}
                >
                    That&apos;s <span style={{ color: '#4a9eff', fontWeight: 600 }}>{displayDays.toLocaleString()}+</span> days of loving you.
                </p>
                <p
                    style={{
                        fontSize: 'clamp(0.85rem, 2vw, 1rem)',
                        color: 'rgba(168, 212, 255, 0.4)',
                    }}
                >
                    {totalHours.toLocaleString()}+ hours of having you in my heart.
                </p>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="font-dancing"
                style={{
                    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
                    color: '#6db3f8',
                    marginTop: '40px',
                    fontStyle: 'italic',
                }}
            >
                &ldquo;And I still get butterflies.&rdquo;
            </motion.p>
        </div>
    );
}
