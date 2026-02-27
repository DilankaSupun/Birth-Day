'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarBackground from '@/components/StarBackground';
import { useConfetti } from '@/components/ConfettiEffect';
import { playCelebration, playDodge, playSparkle, playWhoosh, playSoftClick, playHappyBirthday } from '@/lib/sounds';

export default function BirthdayPage() {
    const [phase, setPhase] = useState<'intro' | 'game' | 'finale'>('intro');
    const [showTitle, setShowTitle] = useState(false);
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [yesClicked, setYesClicked] = useState(false);
    const [easterEgg, setEasterEgg] = useState(false);
    const [yesScale, setYesScale] = useState(1);

    // Play Happy Birthday melody when page loads — pause bg music first
    useEffect(() => {
        const timer = setTimeout(() => {
            // Pause Perfect song
            window.__pauseBgMusic?.();
            playHappyBirthday();
            // Resume bg music after melody finishes (~14 seconds)
            const resumeTimer = setTimeout(() => {
                window.__resumeBgMusic?.();
            }, 14000);
            return () => clearTimeout(resumeTimer);
        }, 800);
        return () => clearTimeout(timer);
    }, []);
    const [tapCount, setTapCount] = useState(0);
    const fireConfetti = useConfetti();

    // Intro animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTitle(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Easter egg: Triple-tap the final heart emoji
    const handleEasterEggTap = useCallback(() => {
        playSoftClick();
        setTapCount((prev) => {
            const newCount = prev + 1;
            if (newCount >= 3) {
                setEasterEgg(true);
                playSparkle();
                setTimeout(() => setEasterEgg(false), 4000);
                return 0;
            }
            // Reset after 1.5s if not enough taps
            setTimeout(() => setTapCount(0), 1500);
            return newCount;
        });
    }, []);

    // Move NO button to random position on tap (works on mobile!)
    const moveNoButton = useCallback(() => {
        playDodge();
        // Use viewport-safe random positions 
        const maxX = Math.min(window.innerWidth - 120, 200);
        const maxY = Math.min(window.innerHeight * 0.3, 150);
        setNoButtonPos({
            x: (Math.random() - 0.5) * maxX,
            y: (Math.random() - 0.5) * maxY,
        });
        setYesScale((prev) => Math.min(prev + 0.12, 1.8));
    }, []);

    const handleYesClick = () => {
        setYesClicked(true);
        playCelebration();
        fireConfetti();
        setTimeout(() => {
            fireConfetti();
        }, 1500);
        setTimeout(() => {
            setPhase('finale');
            fireConfetti();
        }, 3000);
    };

    const finalMessages = [
        'I wish I could be there to hold your hand today.',
        'I wish I could see your smile in front of me.',
        '',
        'But until that day comes…',
        'I\'ll love you across cities.',
        'Across miles.',
        'Across time.',
        '',
        'Out of 8 billion people in this world…',
        'I got you.',
        'And that\'s my greatest blessing.',
        '',
        'No matter how many years pass…',
        'I will always choose you.',
        'Again. And again. And again.',
        '',
        'Distance is temporary.',
        'Us is permanent. 💙',
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: '30px 16px',
                overflow: 'hidden',
            }}
        >
            <StarBackground />

            {/* Easter Egg Popup */}
            <AnimatePresence>
                {easterEgg && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 100,
                            padding: '24px 36px',
                            background: 'linear-gradient(145deg, rgba(26, 42, 74, 0.95), rgba(13, 27, 42, 0.98))',
                            borderRadius: '20px',
                            border: '1px solid rgba(74, 158, 255, 0.4)',
                            boxShadow: '0 0 60px rgba(74, 158, 255, 0.3)',
                            textAlign: 'center',
                            maxWidth: '85vw',
                        }}
                    >
                        <p className="font-dancing" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', color: '#6db3f8' }}>
                            I Love You, My Queen 💙
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%', maxWidth: '700px' }}>
                <AnimatePresence mode="wait">
                    {/* INTRO PHASE */}
                    {phase === 'intro' && (
                        <motion.div
                            key="intro"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {!showTitle ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0, 1, 1, 0.5] }}
                                    transition={{ duration: 2 }}
                                >
                                    <p
                                        style={{
                                            fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                                            color: 'rgba(168, 212, 255, 0.5)',
                                            letterSpacing: '5px',
                                        }}
                                    >
                                        ✨ ✨ ✨
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.5, type: 'spring' }}
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.02, 1] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        <h1
                                            className="font-playfair"
                                            style={{
                                                fontSize: 'clamp(1.8rem, 8vw, 4rem)',
                                                color: '#4a9eff',
                                                animation: 'neon-pulse 3s ease infinite',
                                                marginBottom: '20px',
                                                lineHeight: 1.3,
                                            }}
                                        >
                                            🎉 Happy Birthday
                                            <br />
                                            My Bubu 🎉
                                        </h1>
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1 }}
                                        className="font-dancing"
                                        style={{
                                            fontSize: 'clamp(1.1rem, 4vw, 1.8rem)',
                                            color: 'rgba(168, 212, 255, 0.7)',
                                            marginBottom: '40px',
                                        }}
                                    >
                                        The most beautiful girl in my world 💙
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 2 }}
                                    >
                                        <button
                                            className="btn-glow"
                                            onClick={() => {
                                                playWhoosh();
                                                setPhase('game');
                                                fireConfetti();
                                            }}
                                        >
                                            🫶 I Have a Question For You…
                                        </button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {/* GAME PHASE: Do You Love Me? */}
                    {phase === 'game' && !yesClicked && (
                        <motion.div
                            key="game"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            style={{
                                minHeight: '60vh',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <h2
                                className="font-playfair text-glow"
                                style={{
                                    fontSize: 'clamp(1.5rem, 6vw, 3rem)',
                                    marginBottom: '50px',
                                }}
                            >
                                Do You Still Choose Me? 💙
                            </h2>

                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '30px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    minHeight: '250px',
                                    width: '100%',
                                }}
                            >
                                {/* YES Button - grows with each NO dodge */}
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    animate={{ scale: yesScale }}
                                    className="btn-glow"
                                    onClick={handleYesClick}
                                    style={{
                                        fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
                                        padding: '18px 50px',
                                        background: 'linear-gradient(135deg, rgba(74, 158, 255, 0.3) 0%, rgba(109, 179, 248, 0.15) 100%)',
                                        zIndex: 5,
                                    }}
                                >
                                    YES 🤍
                                </motion.button>

                                {/* NO Button - dodges on tap */}
                                <motion.button
                                    animate={{
                                        x: noButtonPos.x,
                                        y: noButtonPos.y,
                                    }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    onClick={moveNoButton}
                                    className="btn-glow"
                                    style={{
                                        fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                                        padding: '14px 35px',
                                        background: 'linear-gradient(135deg, rgba(100, 100, 100, 0.2) 0%, rgba(80, 80, 80, 0.1) 100%)',
                                        borderColor: 'rgba(150, 150, 150, 0.3)',
                                        color: 'rgba(200, 200, 200, 0.6)',
                                        zIndex: 5,
                                    }}
                                >
                                    NO 🙄
                                </motion.button>
                            </div>

                            <motion.p
                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    marginTop: '30px',
                                    fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)',
                                    color: 'rgba(168, 212, 255, 0.4)',
                                }}
                            >
                                (Try tapping NO if you dare 😌)
                            </motion.p>
                        </motion.div>
                    )}

                    {/* YES Clicked Transition */}
                    {phase === 'game' && yesClicked && (
                        <motion.div
                            key="yes-response"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, type: 'spring' }}
                            style={{
                                minHeight: '60vh',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <motion.h2
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="font-playfair text-glow-strong"
                                style={{
                                    fontSize: 'clamp(1.3rem, 6vw, 2.5rem)',
                                    marginBottom: '20px',
                                }}
                            >
                                Best decision you&apos;ve made 💙
                            </motion.h2>
                            <p
                                className="font-dancing"
                                style={{
                                    fontSize: 'clamp(1rem, 4vw, 1.6rem)',
                                    color: 'rgba(168, 212, 255, 0.7)',
                                }}
                            >
                                For 3 years, 4 months, and 23 days ✨
                            </p>
                        </motion.div>
                    )}

                    {/* FINALE PHASE */}
                    {phase === 'finale' && (
                        <motion.div
                            key="finale"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                            style={{ padding: '20px 0' }}
                        >
                            <motion.h1
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                className="font-playfair"
                                style={{
                                    fontSize: 'clamp(1.8rem, 7vw, 3.5rem)',
                                    color: '#4a9eff',
                                    animation: 'neon-pulse 3s ease infinite',
                                    marginBottom: '40px',
                                    lineHeight: 1.3,
                                }}
                            >
                                💙 For My Bubu 💙
                            </motion.h1>

                            <div
                                style={{
                                    maxWidth: '550px',
                                    margin: '0 auto',
                                    padding: 'clamp(24px, 5vw, 40px)',
                                    background: 'linear-gradient(145deg, rgba(26, 42, 74, 0.4), rgba(13, 27, 42, 0.3))',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(74, 158, 255, 0.15)',
                                }}
                            >
                                {finalMessages.map((line, index) => (
                                    <motion.p
                                        key={index}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
                                        className={index === finalMessages.length - 1 ? 'font-playfair' : ''}
                                        style={{
                                            fontSize: line === '' ? '0.5rem' : index >= finalMessages.length - 2
                                                ? 'clamp(1rem, 3.5vw, 1.4rem)'
                                                : 'clamp(0.88rem, 3vw, 1.1rem)',
                                            color: index >= finalMessages.length - 2
                                                ? '#4a9eff'
                                                : 'rgba(232, 240, 255, 0.85)',
                                            lineHeight: line === '' ? 1 : 2,
                                            fontWeight: index >= finalMessages.length - 2 ? 600 : 300,
                                            textAlign: 'center',
                                        }}
                                    >
                                        {line || '\u00A0'}
                                    </motion.p>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: finalMessages.length * 0.2 + 1, duration: 1 }}
                                style={{ marginTop: '40px' }}
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.05, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    onClick={handleEasterEggTap}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <p
                                        className="font-dancing"
                                        style={{
                                            fontSize: 'clamp(1.3rem, 5vw, 2.5rem)',
                                            color: '#6db3f8',
                                        }}
                                    >
                                        Happy Birthday Manika 💙
                                    </p>
                                </motion.div>
                                <p
                                    style={{
                                        fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                                        color: 'rgba(168, 212, 255, 0.25)',
                                        marginTop: '24px',
                                        letterSpacing: '1px',
                                    }}
                                >
                                    (tap &ldquo;I love you&rdquo; 3 times for a secret ✨)
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating sparkle particles */}
            {phase === 'finale' && (
                <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 0, opacity: 0 }}
                            animate={{
                                y: -800,
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: Math.random() * 5 + 5,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                            style={{
                                position: 'absolute',
                                left: `${Math.random() * 100}%`,
                                bottom: 0,
                                width: '4px',
                                height: '4px',
                                borderRadius: '50%',
                                background: '#4a9eff',
                                boxShadow: '0 0 10px #4a9eff',
                            }}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
}
