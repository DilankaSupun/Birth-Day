'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarBackground from '@/components/StarBackground';
import { useConfetti } from '@/components/ConfettiEffect';
import { playCelebration, playDodge, playSparkle, playWhoosh, playSoftClick, playHappyBirthday } from '@/lib/sounds';

export default function BirthdayPage() {
    const [phase, setPhase] = useState<'question' | 'birthday' | 'cake' | 'finale'>('question');
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [yesScale, setYesScale] = useState(1);
    const [easterEgg, setEasterEgg] = useState(false);
    const [tapCount, setTapCount] = useState(0);
    const [candlesBlown, setCandlesBlown] = useState(false);
    const [blowHint, setBlowHint] = useState(false);
    const [swipeStart, setSwipeStart] = useState<number | null>(null);
    const [isBlowing, setIsBlowing] = useState(false);
    const cakeRef = useRef<HTMLDivElement>(null);
    const fireConfetti = useConfetti();

    // Show blow hint after 2.5s on cake phase
    useEffect(() => {
        if (phase === 'cake') {
            const t = setTimeout(() => setBlowHint(true), 2500);
            return () => clearTimeout(t);
        }
    }, [phase]);

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
            setTimeout(() => setTapCount(0), 1500);
            return newCount;
        });
    }, []);

    // Move NO button on tap
    const moveNoButton = useCallback(() => {
        playDodge();
        const maxX = Math.min(window.innerWidth - 120, 200);
        const maxY = Math.min(window.innerHeight * 0.3, 150);
        setNoButtonPos({
            x: (Math.random() - 0.5) * maxX,
            y: (Math.random() - 0.5) * maxY,
        });
        setYesScale((prev) => Math.min(prev + 0.12, 1.8));
    }, []);

    // When YES is clicked → go to birthday, start music + confetti
    const handleYesClick = () => {
        playCelebration();
        fireConfetti();
        setTimeout(() => fireConfetti(), 800);
        setTimeout(() => fireConfetti(), 1800);
        setPhase('birthday');
        // Start happy birthday melody after short delay
        setTimeout(() => {
            window.__pauseBgMusic?.();
            playHappyBirthday();
            setTimeout(() => {
                window.__resumeBgMusic?.();
            }, 14000);
        }, 600);
    };

    // Swipe down or tap to blow candles
    const handleTouchStart = (e: React.TouchEvent) => {
        setSwipeStart(e.touches[0].clientY);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (swipeStart === null) return;
        const delta = e.changedTouches[0].clientY - swipeStart;
        // Swipe down ≥ 40px = blow
        if (delta >= 40) {
            triggerBlow();
        }
        setSwipeStart(null);
    };

    const triggerBlow = () => {
        if (candlesBlown) return;
        setIsBlowing(true);
        playSparkle();
        setTimeout(() => {
            setCandlesBlown(true);
            setIsBlowing(false);
            fireConfetti();
            setTimeout(() => {
                setPhase('finale');
                setTimeout(() => fireConfetti(), 600);
            }, 1800);
        }, 600);
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

    // Continuous confetti on birthday phase
    useEffect(() => {
        if (phase !== 'birthday') return;
        const interval = setInterval(() => {
            fireConfetti();
        }, 3000);
        return () => clearInterval(interval);
    }, [phase, fireConfetti]);

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

                    {/* ── PHASE 1: QUESTION ── */}
                    {phase === 'question' && (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.8 }}
                            style={{
                                minHeight: '70vh',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {/* Curious lead-in */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="font-dancing"
                                style={{
                                    fontSize: 'clamp(1rem, 3.5vw, 1.3rem)',
                                    color: 'rgba(168, 212, 255, 0.55)',
                                    marginBottom: '12px',
                                    letterSpacing: '1px',
                                }}
                            >
                                Psst… are you curious what's in my heart? 🤫
                            </motion.p>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="font-playfair text-glow"
                                style={{
                                    fontSize: 'clamp(1.5rem, 6vw, 3rem)',
                                    marginBottom: '16px',
                                    lineHeight: 1.4,
                                }}
                            >
                                Do You Still Choose Me? 💙
                            </motion.h2>

                            {/* Cheeky disturbing hint */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1, duration: 0.8 }}
                                className="font-dancing"
                                style={{
                                    fontSize: 'clamp(0.85rem, 3vw, 1.1rem)',
                                    color: 'rgba(168, 212, 255, 0.4)',
                                    marginBottom: '48px',
                                    fontStyle: 'italic',
                                }}
                            >
                                (Warning: clicking YES may cause permanent happiness 😌)
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.4, duration: 0.8 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '30px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    minHeight: '220px',
                                    width: '100%',
                                }}
                            >
                                {/* YES Button */}
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

                                {/* NO Button – dodges */}
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
                            </motion.div>

                            <motion.p
                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    marginTop: '24px',
                                    fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)',
                                    color: 'rgba(168, 212, 255, 0.4)',
                                }}
                            >
                                (Try tapping NO if you dare 😌)
                            </motion.p>
                        </motion.div>
                    )}

                    {/* ── PHASE 2: HAPPY BIRTHDAY ── */}
                    {phase === 'birthday' && (
                        <motion.div
                            key="birthday"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, type: 'spring' }}
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
                                transition={{ delay: 0.8 }}
                                className="font-dancing"
                                style={{
                                    fontSize: 'clamp(1.1rem, 4vw, 1.8rem)',
                                    color: 'rgba(168, 212, 255, 0.7)',
                                    marginBottom: '50px',
                                }}
                            >
                                The most beautiful girl in my world 💙
                            </motion.p>

                            {/* Cake with candles */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                onClick={triggerBlow}
                                onTouchStart={handleTouchStart}
                                onTouchEnd={handleTouchEnd}
                                ref={cakeRef}
                                style={{ cursor: 'pointer', userSelect: 'none', WebkitTapHighlightColor: 'transparent' }}
                            >
                                <CakeWithCandles blown={candlesBlown} isBlowing={isBlowing} />
                            </motion.div>

                            <AnimatePresence>
                                {!candlesBlown && (
                                    <motion.p
                                        key="hint"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: blowHint ? [0.4, 0.8, 0.4] : 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1.5, repeat: blowHint ? Infinity : 0 }}
                                        style={{
                                            marginTop: '20px',
                                            fontSize: 'clamp(0.8rem, 2.5vw, 0.95rem)',
                                            color: 'rgba(168, 212, 255, 0.5)',
                                        }}
                                    >
                                        👆 Tap the cake or swipe down to blow the candles 🕯️
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* ── PHASE 3: CAKE BLOWING (handled within birthday phase above) ── */}

                    {/* ── PHASE 4: FINALE – For My Bubu ── */}
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
                                    (tap &ldquo;Happy Birthday&rdquo; 3 times for a secret ✨)
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Continuous floating flakes on birthday + finale */}
            {(phase === 'birthday' || phase === 'finale') && (
                <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: 0, opacity: 0 }}
                            animate={{
                                y: -900,
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: Math.random() * 5 + 5,
                                repeat: Infinity,
                                delay: Math.random() * 6,
                            }}
                            style={{
                                position: 'absolute',
                                left: `${Math.random() * 100}%`,
                                bottom: 0,
                                width: i % 3 === 0 ? '5px' : '3px',
                                height: i % 3 === 0 ? '5px' : '3px',
                                borderRadius: '50%',
                                background: i % 4 === 0 ? '#ff6b9d' : i % 4 === 1 ? '#ffd700' : i % 4 === 2 ? '#4a9eff' : '#a8d4ff',
                                boxShadow: `0 0 ${i % 3 === 0 ? '12px' : '8px'} currentColor`,
                            }}
                        />
                    ))}
                </div>
            )}
        </motion.div>
    );
}

// ── Cake Component ──
function CakeWithCandles({ blown, isBlowing }: { blown: boolean; isBlowing: boolean }) {
    const candles = [0, 1, 2, 3, 4]; // 5 candles

    return (
        <div style={{ display: 'inline-block', position: 'relative' }}>
            {/* Candles row above cake */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '18px', marginBottom: '4px' }}>
                {candles.map((i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Flame */}
                        <AnimatePresence>
                            {!blown && (
                                <motion.div
                                    key={`flame-${i}`}
                                    initial={{ opacity: 1, scaleY: 1 }}
                                    exit={isBlowing ? { opacity: 0, scaleY: 0, y: -10, transition: { delay: i * 0.08, duration: 0.3 } } : { opacity: 0 }}
                                    animate={{
                                        scaleX: [1, 1.2, 0.9, 1.1, 1],
                                        scaleY: [1, 1.15, 0.95, 1.1, 1],
                                        x: [0, 1, -1, 0.5, 0],
                                    }}
                                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                                    style={{
                                        width: '10px',
                                        height: '16px',
                                        background: 'radial-gradient(ellipse at 50% 80%, #fff176 0%, #ffb300 40%, #ff6d00 80%, transparent 100%)',
                                        borderRadius: '50% 50% 30% 30%',
                                        filter: 'blur(0.5px) drop-shadow(0 0 6px #ffb300)',
                                        transformOrigin: 'bottom center',
                                        marginBottom: '2px',
                                    }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Smoke after blown */}
                        <AnimatePresence>
                            {blown && (
                                <motion.div
                                    key={`smoke-${i}`}
                                    initial={{ opacity: 0.7, y: 0, scaleX: 0.5 }}
                                    animate={{ opacity: 0, y: -30, scaleX: [0.5, 1.5, 0.8] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, delay: i * 0.1 }}
                                    style={{
                                        width: '8px',
                                        height: '20px',
                                        background: 'linear-gradient(to top, rgba(200,200,200,0.6), transparent)',
                                        borderRadius: '50%',
                                        marginBottom: '2px',
                                    }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Candle stick */}
                        <div
                            style={{
                                width: '10px',
                                height: '40px',
                                background: `linear-gradient(180deg, ${
                                    ['#ff6b9d', '#4a9eff', '#ffd700', '#a8d4ff', '#ff9f43'][i]
                                } 0%, ${
                                    ['#c0396a', '#2a6ab0', '#d4900a', '#4a7aaa', '#d4700a'][i]
                                } 100%)`,
                                borderRadius: '3px 3px 2px 2px',
                                boxShadow: blown ? 'none' : `0 0 8px ${['#ff6b9d88', '#4a9eff88', '#ffd70088', '#a8d4ff88', '#ff9f4388'][i]}`,
                                transition: 'box-shadow 0.5s ease',
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Cake body */}
            <div
                style={{
                    width: 'clamp(180px, 50vw, 260px)',
                    background: 'linear-gradient(180deg, #1a2b5e 0%, #0d1b3e 100%)',
                    borderRadius: '12px 12px 8px 8px',
                    border: '2px solid rgba(74, 158, 255, 0.4)',
                    boxShadow: '0 0 30px rgba(74, 158, 255, 0.2), 0 8px 30px rgba(0,0,0,0.5)',
                    position: 'relative',
                    overflow: 'hidden',
                    paddingBottom: '16px',
                }}
            >
                {/* Frosting top */}
                <div
                    style={{
                        height: '24px',
                        background: 'linear-gradient(180deg, rgba(168,212,255,0.9) 0%, rgba(100,160,255,0.6) 100%)',
                        borderRadius: '10px 10px 0 0',
                        position: 'relative',
                    }}
                >
                    {/* Frosting drips */}
                    {[15, 35, 55, 75, 90].map((left, j) => (
                        <div
                            key={j}
                            style={{
                                position: 'absolute',
                                top: '12px',
                                left: `${left}%`,
                                width: '10px',
                                height: '14px',
                                background: 'rgba(168,212,255,0.8)',
                                borderRadius: '0 0 6px 6px',
                            }}
                        />
                    ))}
                </div>

                {/* Cake layers */}
                <div style={{ padding: '12px 16px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {/* Layer 1 */}
                    <motion.div
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                        style={{
                            height: '20px',
                            background: 'linear-gradient(90deg, rgba(74,158,255,0.3), rgba(109,179,248,0.2), rgba(74,158,255,0.3))',
                            borderRadius: '4px',
                            border: '1px solid rgba(74,158,255,0.2)',
                        }}
                    />
                    {/* Layer 2 */}
                    <motion.div
                        animate={{ opacity: [0.8, 1, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        style={{
                            height: '20px',
                            background: 'linear-gradient(90deg, rgba(255,107,157,0.25), rgba(255,150,180,0.15), rgba(255,107,157,0.25))',
                            borderRadius: '4px',
                            border: '1px solid rgba(255,107,157,0.2)',
                        }}
                    />
                    {/* Hearts decoration */}
                    <div style={{ textAlign: 'center', fontSize: '1rem', letterSpacing: '6px', marginTop: '2px' }}>
                        💙💙💙
                    </div>
                </div>

                {/* "Happy Birthday" text on cake */}
                <motion.p
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="font-dancing"
                    style={{
                        textAlign: 'center',
                        fontSize: 'clamp(0.7rem, 2.5vw, 0.9rem)',
                        color: 'rgba(168,212,255,0.8)',
                        marginTop: '6px',
                        letterSpacing: '1px',
                    }}
                >
                    Happy Birthday Bubu ✨
                </motion.p>
            </div>

            {/* Glow under cake */}
            <motion.div
                animate={{ opacity: blown ? 0 : [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: '20px',
                    background: 'radial-gradient(ellipse, rgba(74,158,255,0.4) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
}
