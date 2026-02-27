'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import StarBackground from '@/components/StarBackground';
import { playHeartbeat, playWhoosh } from '@/lib/sounds';

export default function DistancePage() {
    const router = useRouter();
    const [isHolding, setIsHolding] = useState(false);
    const [hasHeld, setHasHeld] = useState(false);
    const [holdProgress, setHoldProgress] = useState(0);
    const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const heartbeatLoopRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressRef = useRef(0);

    // Continuous heartbeat loop after hold completes — plays until user leaves page
    useEffect(() => {
        if (hasHeld) {
            // Start continuous heartbeat
            playHeartbeat();
            heartbeatLoopRef.current = setInterval(() => {
                playHeartbeat();
            }, 1800); // heartbeat every 1.8s
        }

        return () => {
            if (heartbeatLoopRef.current) {
                clearInterval(heartbeatLoopRef.current);
            }
        };
    }, [hasHeld]);

    // Cleanup on unmount (page leave)
    useEffect(() => {
        return () => {
            if (holdTimerRef.current) clearInterval(holdTimerRef.current);
            if (heartbeatLoopRef.current) clearInterval(heartbeatLoopRef.current);
        };
    }, []);

    const startHold = useCallback(() => {
        setIsHolding(true);
        progressRef.current = 0;
        setHoldProgress(0);

        // Play initial heartbeat when hold starts
        playHeartbeat();

        holdTimerRef.current = setInterval(() => {
            progressRef.current += 2;
            setHoldProgress(progressRef.current);

            // Play heartbeat sound every ~25%
            if (progressRef.current % 25 === 0 && progressRef.current < 100) {
                playHeartbeat();
            }

            if (progressRef.current >= 100) {
                if (holdTimerRef.current) clearInterval(holdTimerRef.current);
                setHasHeld(true);
                setIsHolding(false);
            }
        }, 60);
    }, []);

    const stopHold = useCallback(() => {
        setIsHolding(false);
        if (holdTimerRef.current) {
            clearInterval(holdTimerRef.current);
        }
        if (!hasHeld) {
            setHoldProgress(0);
        }
    }, [hasHeld]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: '30px 20px',
                overflow: 'hidden',
            }}
        >
            <StarBackground />

            {/* Heartbeat glow that pulses when holding or after held */}
            <motion.div
                animate={isHolding ? {
                    scale: [1, 1.3, 1, 1.3, 1],
                    opacity: [0.05, 0.15, 0.05, 0.15, 0.05],
                } : hasHeld ? {
                    scale: [1, 1.15, 1, 1.15, 1],
                    opacity: [0.06, 0.12, 0.06, 0.12, 0.06],
                } : {
                    scale: 1,
                    opacity: 0.03,
                }}
                transition={isHolding ? {
                    duration: 1.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                } : hasHeld ? {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                } : {
                    duration: 0.5,
                }}
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120vw',
                    height: '120vh',
                    background: (isHolding || hasHeld)
                        ? 'radial-gradient(circle, rgba(74, 158, 255, 0.2) 0%, rgba(74, 158, 255, 0.05) 40%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(74, 158, 255, 0.06) 0%, transparent 60%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                    borderRadius: '50%',
                }}
            />

            <div
                style={{
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                    maxWidth: '500px',
                    textAlign: 'center',
                }}
            >
                {/* Pulsing heart */}
                <motion.div
                    animate={isHolding ? {
                        scale: [1, 1.2, 0.95, 1.2, 1],
                    } : hasHeld ? {
                        scale: [1, 1.15, 0.97, 1.15, 1],
                    } : {
                        scale: [1, 1.05, 1],
                    }}
                    transition={(isHolding || hasHeld) ? {
                        duration: isHolding ? 1.2 : 1.8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    } : {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{
                        fontSize: 'clamp(3rem, 15vw, 5rem)',
                        marginBottom: '20px',
                        filter: (isHolding || hasHeld)
                            ? 'drop-shadow(0 0 30px rgba(74, 158, 255, 0.8)) drop-shadow(0 0 60px rgba(74, 158, 255, 0.4))'
                            : 'drop-shadow(0 0 15px rgba(74, 158, 255, 0.4))',
                        transition: 'filter 0.3s ease',
                    }}
                >
                    💙
                </motion.div>

                {/* Main text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <h2
                        className="font-playfair text-glow"
                        style={{
                            fontSize: 'clamp(1.3rem, 5vw, 2.2rem)',
                            marginBottom: '20px',
                            lineHeight: 1.5,
                        }}
                    >
                        Even miles apart…
                        <br />
                        <span style={{ color: '#4a9eff' }}>My heart beats only for you.</span>
                    </h2>
                </motion.div>

                {/* Distance text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    style={{
                        padding: '24px 20px',
                        background: 'linear-gradient(145deg, rgba(26, 42, 74, 0.3), rgba(13, 27, 42, 0.2))',
                        borderRadius: '16px',
                        border: '1px solid rgba(74, 158, 255, 0.1)',
                        marginBottom: '30px',
                    }}
                >
                    <p
                        style={{
                            fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                            color: 'rgba(232, 240, 255, 0.8)',
                            lineHeight: 1.8,
                            fontWeight: 300,
                        }}
                    >
                        They say long distance is hard…
                        <br />
                        But loving you from miles away made us <strong style={{ color: '#4a9eff' }}>stronger</strong>.
                        <br /><br />
                        We don&apos;t share the same space…
                        <br />
                        But we share the <strong style={{ color: '#6db3f8' }}>same heart</strong>.
                    </p>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="font-dancing"
                    style={{
                        fontSize: 'clamp(1rem, 4vw, 1.4rem)',
                        color: 'rgba(168, 212, 255, 0.6)',
                        fontStyle: 'italic',
                        marginBottom: '30px',
                    }}
                >
                    &ldquo;We may sleep under different skies…
                    <br />
                    But we dream of the same future.&rdquo;
                </motion.p>

                {/* Hold to feel heartbeat button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.8 }}
                    style={{ marginBottom: '24px' }}
                >
                    <AnimatePresence mode="wait">
                        {!hasHeld ? (
                            <motion.div
                                key="hold-btn"
                                style={{ position: 'relative', display: 'inline-block' }}
                            >
                                <button
                                    onTouchStart={startHold}
                                    onTouchEnd={stopHold}
                                    onMouseDown={startHold}
                                    onMouseUp={stopHold}
                                    onMouseLeave={stopHold}
                                    className="btn-glow"
                                    style={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        padding: '18px 44px',
                                        minWidth: '280px',
                                        fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
                                        background: isHolding
                                            ? 'linear-gradient(135deg, rgba(74, 158, 255, 0.35) 0%, rgba(109, 179, 248, 0.2) 100%)'
                                            : 'linear-gradient(135deg, rgba(74, 158, 255, 0.2) 0%, rgba(109, 179, 248, 0.1) 100%)',
                                        borderColor: isHolding ? '#4a9eff' : 'rgba(74, 158, 255, 0.4)',
                                        boxShadow: isHolding ? '0 0 30px rgba(74, 158, 255, 0.3)' : 'none',
                                        transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                                        userSelect: 'none',
                                        WebkitUserSelect: 'none',
                                    }}
                                >
                                    {/* Progress fill */}
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            height: '100%',
                                            width: `${holdProgress}%`,
                                            background: 'linear-gradient(90deg, rgba(74, 158, 255, 0.2), rgba(74, 158, 255, 0.4))',
                                            transition: 'width 0.05s linear',
                                            borderRadius: '50px',
                                        }}
                                    />
                                    <span style={{ position: 'relative', zIndex: 1 }}>
                                        {isHolding ? '💗 Feel it…' : '🤍 Hold to feel my heartbeat'}
                                    </span>
                                </button>

                                {!isHolding && holdProgress === 0 && (
                                    <motion.p
                                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{
                                            fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
                                            color: 'rgba(168, 212, 255, 0.3)',
                                            marginTop: '12px',
                                        }}
                                    >
                                        (hold the button for 3 seconds)
                                    </motion.p>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="held-msg"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: 'spring' }}
                                style={{
                                    padding: '20px 30px',
                                    background: 'linear-gradient(145deg, rgba(74, 158, 255, 0.15), rgba(74, 158, 255, 0.05))',
                                    borderRadius: '20px',
                                    border: '1px solid rgba(74, 158, 255, 0.3)',
                                }}
                            >
                                <p
                                    className="font-dancing"
                                    style={{
                                        fontSize: 'clamp(1rem, 3.5vw, 1.4rem)',
                                        color: '#a8d4ff',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    That&apos;s my heart beating for you…
                                    <br />
                                    Every second. Every mile. Always. 💙
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Continue Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 3, duration: 0.8 }}
                >
                    <button
                        className="btn-glow"
                        onClick={() => { playWhoosh(); router.push('/letter'); }}
                    >
                        💝 Open My Heart
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}
