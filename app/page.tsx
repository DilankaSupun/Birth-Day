'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarBackground from '@/components/StarBackground';
import FloatingHearts from '@/components/FloatingHearts';
import { useRouter } from 'next/navigation';
import { playSparkle, playError, playWhoosh } from '@/lib/sounds';

const CORRECT_PASSWORD = '20221005';

export default function LandingPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<'password' | 'intro'>('password');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePasswordSubmit = () => {
    if (password === CORRECT_PASSWORD) {
      playSparkle();
      setPhase('intro');
    } else {
      playError();
      setError('Hmmmm… think again, My girl 😌');
      setShake(true);
      setTimeout(() => setShake(false), 600);
      setPassword('');
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  const handleEnter = () => {
    playWhoosh();
    setIsExiting(true);
    setTimeout(() => {
      router.push('/journey');
    }, 800);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <StarBackground />
      <FloatingHearts count={8} />

      <AnimatePresence mode="wait">
        {/* PASSWORD PHASE */}
        {phase === 'password' && (
          <motion.div
            key="password"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 2,
              padding: '30px 20px',
            }}
          >
            <motion.div
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.5 }}
              style={{
                textAlign: 'center',
                maxWidth: '400px',
                width: '100%',
              }}
            >
              {/* Lock icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
                style={{
                  fontSize: '3rem',
                  marginBottom: '30px',
                  filter: 'drop-shadow(0 0 20px rgba(74, 158, 255, 0.5))',
                }}
              >
                💙
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="font-playfair text-glow"
                style={{
                  fontSize: 'clamp(1.3rem, 5vw, 2rem)',
                  marginBottom: '16px',
                  lineHeight: 1.4,
                }}
              >
                This is for someone special…
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="font-dancing"
                style={{
                  fontSize: 'clamp(1rem, 3.5vw, 1.3rem)',
                  color: 'rgba(168, 212, 255, 0.6)',
                  marginBottom: '40px',
                  lineHeight: 1.6,
                }}
              >
                &ldquo;The day you became mine is my favourite day in the life&rdquo;
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <input
                  ref={inputRef}
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter the date…"
                  autoFocus
                  style={{
                    width: '100%',
                    maxWidth: '280px',
                    padding: '16px 24px',
                    background: 'rgba(13, 27, 42, 0.8)',
                    border: `1px solid ${error ? 'rgba(255, 107, 157, 0.5)' : 'rgba(74, 158, 255, 0.3)'}`,
                    borderRadius: '50px',
                    color: '#e8f0ff',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    outline: 'none',
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '3px',
                    transition: 'border-color 0.3s ease',
                    WebkitAppearance: 'none',
                  }}
                  onFocus={(e) => {
                    if (!error) {
                      e.currentTarget.style.borderColor = 'rgba(74, 158, 255, 0.6)';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(74, 158, 255, 0.15)';
                    }
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = error ? 'rgba(255, 107, 157, 0.5)' : 'rgba(74, 158, 255, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        color: '#ff6b9d',
                        fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                        marginTop: '16px',
                      }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  className="btn-glow"
                  onClick={handlePasswordSubmit}
                  style={{
                    marginTop: '24px',
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                  }}
                >
                  ✨ Unlock
                </button>

                <p
                  style={{
                    fontSize: 'clamp(0.7rem, 2vw, 0.75rem)',
                    color: 'rgba(168, 212, 255, 0.25)',
                    marginTop: '24px',
                    letterSpacing: '1px',
                  }}
                >
                  Format: YYYYMMDD
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* INTRO PHASE */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.8 }}
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 2,
              padding: '20px',
              textAlign: 'center',
            }}
          >
            {/* Soft glow behind text */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(74,158,255,0.08) 0%, transparent 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
            }} />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-dancing"
              style={{
                fontSize: 'clamp(1rem, 4vw, 1.4rem)',
                color: 'rgba(168, 212, 255, 0.55)',
                letterSpacing: '1px',
                marginBottom: '16px',
              }}
            >
              Hey Bubu…
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="font-playfair text-glow"
              style={{
                fontSize: 'clamp(1.6rem, 6vw, 2.8rem)',
                lineHeight: 1.4,
                marginBottom: '16px',
              }}
            >
              Today is a very special day for you
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="font-dancing"
              style={{
                fontSize: 'clamp(1.1rem, 4.5vw, 1.8rem)',
                color: 'rgba(168, 212, 255, 0.7)',
                marginBottom: '48px',
              }}
            >
              So I have a surprise for you… 🎀
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <button className="btn-glow" onClick={handleEnter}>
                🌌 Enter Our World
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient light */}
      <div
        style={{
          position: 'fixed',
          bottom: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '400px',
          height: '200px',
          background: 'radial-gradient(ellipse, rgba(74, 158, 255, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </div>
  );
}
