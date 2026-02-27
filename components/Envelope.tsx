'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playEnvelopeOpen } from '@/lib/sounds';

export default function Envelope() {
    const [isOpen, setIsOpen] = useState(false);

    const letterContent = [
        'Dear Bubu,',
        '',
        'I don\'t know how 3 years, 4 months, and 23 days passed so fast.',
        'It feels like yesterday when you first walked into my life.',
        'Since then, my world turned softer… calmer… brighter.',
        '',
        'You are not just my girlfriend.',
        'You are my peace.',
        'My safe place.',
        'My favorite notification.',
        'My dream I never want to wake up from.',
        '',
        'Even if miles separate us…',
        'Nothing can separate our hearts.',
        '',
        'If loving you is a dream…',
        'Please don\'t ever wake me up.',
        '',
        'And today, I want to thank the two people',
        'who brought the most beautiful soul into this world.',
        'Because of them, I found you.',
        'And finding you was finding everything.',
        '',
        '— Yours, always 💙',
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="envelope"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, rotateX: 90 }}
                        transition={{ duration: 0.6 }}
                        onClick={() => { playEnvelopeOpen(); setIsOpen(true); }}
                        style={{
                            width: 'min(320px, 85vw)',
                            height: '220px',
                            position: 'relative',
                            cursor: 'none',
                            perspective: '1000px',
                        }}
                    >
                        {/* Envelope body */}
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(145deg, #1a2a4a, #0d1b2a)',
                                borderRadius: '8px',
                                border: '1px solid rgba(74, 158, 255, 0.3)',
                                boxShadow: '0 0 30px rgba(74, 158, 255, 0.15), inset 0 0 30px rgba(74, 158, 255, 0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                gap: '12px',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 0 50px rgba(74, 158, 255, 0.3), inset 0 0 30px rgba(74, 158, 255, 0.1)';
                                e.currentTarget.style.borderColor = 'rgba(74, 158, 255, 0.6)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 0 30px rgba(74, 158, 255, 0.15), inset 0 0 30px rgba(74, 158, 255, 0.05)';
                                e.currentTarget.style.borderColor = 'rgba(74, 158, 255, 0.3)';
                            }}
                        >
                            {/* Envelope flap */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '50%',
                                    background: 'linear-gradient(to bottom, #1e3358, transparent)',
                                    clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
                                    borderRadius: '8px 8px 0 0',
                                }}
                            />

                            {/* Heart seal */}
                            <div
                                style={{
                                    fontSize: '2rem',
                                    zIndex: 2,
                                    animation: 'pulse-glow 2s ease infinite',
                                    filter: 'drop-shadow(0 0 10px rgba(74, 158, 255, 0.5))',
                                }}
                            >
                                💙
                            </div>

                            <p
                                className="font-dancing"
                                style={{
                                    color: 'rgba(168, 212, 255, 0.7)',
                                    fontSize: '1rem',
                                    zIndex: 2,
                                }}
                            >
                                Tap to open my heart…
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="letter"
                        initial={{ opacity: 0, y: 60, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        style={{
                            maxWidth: 'min(600px, 90vw)',
                            width: '100%',
                            background: 'linear-gradient(145deg, rgba(26, 42, 74, 0.8), rgba(13, 27, 42, 0.9))',
                            borderRadius: '16px',
                            padding: 'clamp(24px, 5vw, 48px)',
                            border: '1px solid rgba(74, 158, 255, 0.2)',
                            boxShadow: '0 0 40px rgba(74, 158, 255, 0.1)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Decorative corner */}
                        <div
                            style={{
                                position: 'absolute',
                                top: '-1px',
                                right: '-1px',
                                width: '80px',
                                height: '80px',
                                background: 'linear-gradient(225deg, rgba(74, 158, 255, 0.15), transparent)',
                                borderRadius: '0 16px 0 0',
                            }}
                        />

                        {letterContent.map((line, index) => (
                            <motion.p
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                className={index === 0 || index === letterContent.length - 1 ? 'font-dancing' : ''}
                                style={{
                                    fontSize: index === 0 ? 'clamp(1.3rem, 3vw, 1.6rem)' : line === '' ? '0.5rem' : 'clamp(0.9rem, 2vw, 1.05rem)',
                                    color: index === 0
                                        ? '#6db3f8'
                                        : index === letterContent.length - 1
                                            ? '#4a9eff'
                                            : 'rgba(232, 240, 255, 0.85)',
                                    lineHeight: line === '' ? 1 : 1.8,
                                    fontWeight: index === 0 ? 600 : 300,
                                    letterSpacing: index === 0 ? '1px' : '0.3px',
                                }}
                            >
                                {line || '\u00A0'}
                            </motion.p>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
