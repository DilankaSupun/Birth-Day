'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import StarBackground from '@/components/StarBackground';
import FloatingHearts from '@/components/FloatingHearts';
import LoveCounter from '@/components/LoveCounter';
import { playWhoosh, playSparkle, playSoftClick } from '@/lib/sounds';

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        >
            {children}
        </motion.div>
    );
}

interface Memory {
    emoji: string;
    text: string;
    reveal: string;
    color: string;
    border: string;
    isLast: boolean;
}

const memories: Memory[] = [
    {
        emoji: '✨',
        text: 'Every laugh we shared…',
        reveal: 'Even your silly giggles over nothing feel like the best sound and the vision in the world.',
        color: 'rgba(255, 220, 100, 0.85)',
        border: 'rgba(255, 200, 80, 0.3)',
        isLast: false,
    },
    {
        emoji: '🌙',
        text: 'Every late-night call…',
        reveal: "Falling asleep with your sight is my favourite thing in the universe.",
        color: 'rgba(180, 160, 255, 0.9)',
        border: 'rgba(160, 130, 255, 0.3)',
        isLast: false,
    },
    {
        emoji: '💬',
        text: 'Every random "I miss you"…',
        reveal: "Those two words hit different when it's you. Every. Single. Time.",
        color: 'rgba(100, 210, 255, 0.9)',
        border: 'rgba(74, 158, 255, 0.3)',
        isLast: false,
    },
    {
        emoji: '🤝',
        text: 'Every small fight that made us stronger…',
        reveal: "We always found our way back. That's how I know we're real.",
        color: 'rgba(255, 150, 130, 0.9)',
        border: 'rgba(255, 120, 100, 0.3)',
        isLast: false,
    },
    {
        emoji: '🌊',
        text: 'Every tear we dried together…',
        reveal: "I'd rather cry with you than laugh with anyone else.",
        color: 'rgba(80, 210, 230, 0.9)',
        border: 'rgba(60, 190, 215, 0.3)',
        isLast: false,
    },
    {
        emoji: '💙',
        text: 'Every "good morning" and "good night"…',
        reveal: 'You bookmarked every single day of my life with something beautiful(Some time aggressive 😂).',
        color: 'rgba(120, 190, 255, 0.95)',
        border: 'rgba(74, 158, 255, 0.35)',
        isLast: false,
    },
    {
        emoji: '🌸',
        text: 'Every memory feels like a dream.',
        reveal: "And if this is a dream… I never want to wake up. 💙",
        color: '#4a9eff',
        border: 'rgba(74, 158, 255, 0.5)',
        isLast: true,
    },
];

export default function JourneyPage() {
    const router = useRouter();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleTap = (i: number) => {
        if (openIndex === i) {
            playSoftClick();
            setOpenIndex(null);
        } else {
            playSparkle();
            setOpenIndex(i);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ minHeight: '100vh', position: 'relative' }}
        >
            <StarBackground />
            <FloatingHearts count={6} />

            {/* Counter Section */}
            <section style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2,
                padding: '40px 20px',
            }}>
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="font-dancing"
                    style={{
                        fontSize: 'clamp(1.3rem, 5vw, 2.5rem)',
                        color: 'rgba(168, 212, 255, 0.5)',
                        marginBottom: '40px',
                        letterSpacing: '2px',
                    }}
                >
                    Together for…
                </motion.h2>

                <LoveCounter />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    style={{ marginTop: '50px' }}
                >
                    <motion.p
                        animate={{ opacity: [0.3, 0.7, 0.3], y: [0, 6, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                            color: 'rgba(168, 212, 255, 0.4)',
                            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                            letterSpacing: '2px',
                        }}
                    >
                        ↓ SCROLL DOWN ↓
                    </motion.p>
                </motion.div>
            </section>

            {/* Memories Section */}
            <section style={{
                minHeight: '100vh',
                position: 'relative',
                zIndex: 2,
                padding: '60px 20px 40px',
            }}>
                <ScrollReveal>
                    <h2
                        className="font-playfair text-glow"
                        style={{
                            textAlign: 'center',
                            fontSize: 'clamp(1.5rem, 6vw, 3rem)',
                            marginBottom: '8px',
                        }}
                    >
                        The Little Things That Made Us, Ours
                    </h2>
                    <p
                        className="font-dancing"
                        style={{
                            textAlign: 'center',
                            color: 'rgba(168,212,255,0.4)',
                            fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                            marginBottom: '48px',
                        }}
                    >
                        Tap each one… find how I feel them 💙
                    </p>
                </ScrollReveal>

                <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {memories.map((memory, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <ScrollReveal key={index} delay={index * 0.07}>
                                <motion.div
                                    onClick={() => handleTap(index)}
                                    animate={{
                                        scale: isOpen ? 1.02 : 1,
                                        rotate: isOpen ? 0 : index % 2 === 0 ? -0.4 : 0.4,
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                                    style={{
                                        position: 'relative',
                                        padding: '18px 20px',
                                        background: isOpen
                                            ? 'linear-gradient(145deg, rgba(20,35,60,0.95), rgba(8,16,30,0.98))'
                                            : 'linear-gradient(145deg, rgba(16,28,50,0.5), rgba(8,16,30,0.4))',
                                        borderRadius: '16px',
                                        border: `1px solid ${isOpen ? memory.border : 'rgba(74,158,255,0.08)'}`,
                                        boxShadow: isOpen
                                            ? `0 0 24px rgba(74,158,255,0.12), 0 4px 20px rgba(0,0,0,0.4)`
                                            : '0 2px 10px rgba(0,0,0,0.2)',
                                        cursor: 'pointer',
                                        overflow: 'hidden',
                                        WebkitTapHighlightColor: 'transparent',
                                        userSelect: 'none',
                                        transition: 'background 0.4s, border 0.4s, box-shadow 0.4s',
                                    }}
                                >
                                    {/* Top shimmer line */}
                                    <motion.div
                                        animate={{ scaleX: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
                                        transition={{ duration: 0.4 }}
                                        style={{
                                            position: 'absolute',
                                            top: 0, left: 0, right: 0,
                                            height: '2px',
                                            background: `linear-gradient(90deg, transparent, ${memory.color}, transparent)`,
                                            transformOrigin: 'left',
                                        }}
                                    />

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                        {/* Emoji */}
                                        <motion.span
                                            animate={isOpen
                                                ? { scale: [1, 1.4, 1], rotate: [0, 12, -12, 0] }
                                                : { scale: [1, 1.06, 1] }
                                            }
                                            transition={isOpen
                                                ? { duration: 0.5 }
                                                : { duration: 3.5, repeat: Infinity, delay: index * 0.3 }
                                            }
                                            style={{
                                                fontSize: memory.isLast ? '2rem' : '1.7rem',
                                                flexShrink: 0,
                                                display: 'block',
                                                filter: isOpen ? `drop-shadow(0 0 8px ${memory.color})` : 'none',
                                                transition: 'filter 0.3s',
                                            }}
                                        >
                                            {memory.emoji}
                                        </motion.span>

                                        {/* Text */}
                                        <p
                                            className="font-playfair"
                                            style={{
                                                flex: 1,
                                                fontSize: memory.isLast
                                                    ? 'clamp(1.05rem, 4vw, 1.35rem)'
                                                    : 'clamp(0.9rem, 3.2vw, 1.15rem)',
                                                color: isOpen ? memory.color : 'rgba(232,240,255,0.75)',
                                                fontStyle: memory.isLast ? 'italic' : 'normal',
                                                fontWeight: memory.isLast ? 600 : 400,
                                                lineHeight: 1.45,
                                                transition: 'color 0.3s',
                                            }}
                                        >
                                            {memory.text}
                                        </p>

                                        {/* Chevron */}
                                        <motion.span
                                            animate={{ rotate: isOpen ? 90 : 0 }}
                                            transition={{ duration: 0.3 }}
                                            style={{
                                                color: isOpen ? memory.color : 'rgba(168,212,255,0.2)',
                                                fontSize: '1.1rem',
                                                flexShrink: 0,
                                            }}
                                        >
                                            ›
                                        </motion.span>
                                    </div>

                                    {/* Reveal caption */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                key="reveal"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.35 }}
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <p
                                                    className="font-dancing"
                                                    style={{
                                                        marginTop: '14px',
                                                        paddingTop: '12px',
                                                        borderTop: `1px solid ${memory.border}`,
                                                        fontSize: 'clamp(0.95rem, 3.2vw, 1.15rem)',
                                                        color: memory.color,
                                                        lineHeight: 1.65,
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    {memory.reveal}
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </ScrollReveal>
                        );
                    })}
                </div>

                {/* Continue button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    style={{ textAlign: 'center', marginTop: '56px', paddingBottom: '40px' }}
                >
                    <button
                        className="btn-glow"
                        onClick={() => { playWhoosh(); router.push('/distance'); }}
                    >
                        🌏 Even Distance Couldn&apos;t Stop Us
                    </button>
                </motion.div>
            </section>
        </motion.div>
    );
}
