'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import StarBackground from '@/components/StarBackground';
import FloatingHearts from '@/components/FloatingHearts';
import Envelope from '@/components/Envelope';
import { playWhoosh } from '@/lib/sounds';

export default function LetterPage() {
    const router = useRouter();

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
                padding: '30px 16px',
            }}
        >
            <StarBackground />
            <FloatingHearts count={5} />

            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', width: '100%' }}>
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="font-playfair text-glow"
                    style={{
                        fontSize: 'clamp(1.3rem, 5vw, 2.5rem)',
                        marginBottom: '40px',
                    }}
                >
                    Oh!
                    <br />
                    A Letter In My Heart
                </motion.h2>

                <Envelope />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    style={{ marginTop: '40px' }}
                >
                    <button
                        className="btn-glow"
                        onClick={() => { playWhoosh(); router.push('/memories'); }}
                    >
                        🎀 Some thing in deeper
                    </button>
                </motion.div>
            </div>

            {/* Heartbeat ambient glow */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.03, 0.06, 0.03],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(74, 158, 255, 0.1) 0%, transparent 60%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                    borderRadius: '50%',
                }}
            />
        </motion.div>
    );
}
