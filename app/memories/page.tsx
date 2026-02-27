'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import StarBackground from '@/components/StarBackground';
import { playWhoosh, playSoftClick, playSparkle } from '@/lib/sounds';

interface Memory {
    image: string;
    caption: string;
    subtitle: string;
    type: 'sweet' | 'troll';
    tilt: number; // degrees
    side: 'left' | 'right';
}

const memories: Memory[] = [
    {
        image: '/images/firstkiss.jpg',
        caption: '💋 Our First Kiss',
        subtitle: 'The moment my heart stopped… and started beating only for you.',
        type: 'sweet',
        tilt: -4,
        side: 'left',
    },
    {
        image: '/images/together.jpg',
        caption: '💙 Us. Together.',
        subtitle: 'No fancy place needed. Just you beside me is enough.',
        type: 'sweet',
        tilt: 3,
        side: 'right',
    },
    {
        image: '/images/together1.jpg',
        caption: '👫 Matching Hearts',
        subtitle: 'When we match without planning… that\'s how connected we are.',
        type: 'sweet',
        tilt: -5,
        side: 'left',
    },
    {
        image: '/images/together2.jpg',
        caption: '🤝 Walking Side by Side',
        subtitle: 'I don\'t care where we\'re going… as long as I\'m holding your hand.',
        type: 'sweet',
        tilt: 4,
        side: 'right',
    },
    {
        image: '/images/together3.jpg',
        caption: '💑 Just the Two of Us',
        subtitle: 'Every moment with you feels like home.',
        type: 'sweet',
        tilt: -3,
        side: 'left',
    },
    {
        image: '/images/firstdance.jpg',
        caption: '💃 Our First Dance',
        subtitle: 'Two hearts, one rhythm. I\'d dance with you forever.',
        type: 'sweet',
        tilt: 5,
        side: 'right',
    },
    {
        image: '/images/myfav.jpg',
        caption: '💫 My Favourite',
        subtitle: 'My absolute favourite person in the whole world.',
        type: 'sweet',
        tilt: -4,
        side: 'left',
    },
    {
        image: '/images/beautyqueen1.jpg',
        caption: '✨ My Beauty Queen',
        subtitle: 'How can someone look this perfect without even trying?',
        type: 'sweet',
        tilt: 3,
        side: 'right',
    },
    {
        image: '/images/beautyqueen2.jpg',
        caption: '🌸 Simply Gorgeous',
        subtitle: 'You make every place look beautiful just by standing there.',
        type: 'sweet',
        tilt: -5,
        side: 'left',
    },
    {
        image: '/images/beautyqueen3.jpg',
        caption: '👑 My Queen',
        subtitle: 'Effortlessly stunning. That\'s just who you are.',
        type: 'sweet',
        tilt: 4,
        side: 'right',
    },
    {
        image: '/images/beautyqueen4.jpg',
        caption: '🌺 Pure Elegance',
        subtitle: 'I could stare at you forever and never get tired.',
        type: 'sweet',
        tilt: -3,
        side: 'left',
    },
    {
        image: '/images/chubby1.jpg',
        caption: '🐻 Chubby Bubu Vol.1',
        subtitle: 'Don\'t kill me… but this is too cute not to include 🤭',
        type: 'troll',
        tilt: 5,
        side: 'right',
    },
    {
        image: '/images/chubby2.jpg',
        caption: '🍮 Chubby Bubu Vol.2',
        subtitle: 'Still adorable. Always adorable. I love every version of you! 😂',
        type: 'troll',
        tilt: -6,
        side: 'left',
    },
];

export default function MemoriesPage() {
    const router = useRouter();
    const [expanded, setExpanded] = useState<number | null>(null);

    const handleTap = (i: number) => {
        if (expanded === i) {
            setExpanded(null);
            playSoftClick();
        } else {
            setExpanded(i);
            playSparkle();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
                minHeight: '100vh',
                position: 'relative',
                padding: '60px 20px 120px',
                overflow: 'hidden',
            }}
        >
            <StarBackground />

            {/* Page header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', marginBottom: '48px', position: 'relative', zIndex: 2 }}
            >
                <p style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📸</p>
                <h1
                    className="font-playfair text-glow"
                    style={{ fontSize: 'clamp(1.6rem, 6vw, 2.5rem)', marginBottom: '8px' }}
                >
                    Our Moments
                </h1>
                <p
                    className="font-dancing"
                    style={{ fontSize: 'clamp(1rem, 3.5vw, 1.3rem)', color: 'rgba(168,212,255,0.5)' }}
                >
                    Tap a photo to feel the moment…
                </p>
            </motion.div>

            {/* Photo wall — staggered */}
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '480px', margin: '0 auto' }}>
                {memories.map((mem, i) => {
                    const isLeft = mem.side === 'left';
                    const isTroll = mem.type === 'troll';
                    const isExpanded = expanded === i;
                    const accentColor = isTroll ? 'rgba(255,180,50,0.85)' : 'rgba(168,212,255,0.85)';
                    const bgColor = isTroll ? 'rgba(40,20,5,0.9)' : 'rgba(8,18,35,0.9)';
                    const borderColor = isTroll ? 'rgba(255,180,50,0.25)' : 'rgba(74,158,255,0.2)';

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.12, duration: 0.6 }}
                            style={{
                                display: 'flex',
                                flexDirection: isLeft ? 'row' : 'row-reverse',
                                alignItems: 'center',
                                gap: '10px',
                                marginBottom: '32px',
                                // Offset so photos alternate sides
                                paddingLeft: isLeft ? '0' : '8%',
                                paddingRight: isLeft ? '8%' : '0',
                            }}
                        >
                            {/* Polaroid photo */}
                            <motion.div
                                animate={{
                                    rotate: isExpanded ? 0 : mem.tilt,
                                    scale: isExpanded ? 1.04 : 1,
                                }}
                                whileTap={{ scale: 0.97 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                onClick={() => handleTap(i)}
                                style={{
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                    width: 'clamp(140px, 42vw, 175px)',
                                    background: isTroll
                                        ? 'linear-gradient(145deg, #2a1a0a, #1a1005)'
                                        : 'linear-gradient(145deg, #0d1b2e, #0a1520)',
                                    border: `2px solid ${isTroll ? 'rgba(255,180,50,0.35)' : 'rgba(74,158,255,0.3)'}`,
                                    borderRadius: '4px',
                                    padding: '8px 8px 32px',
                                    boxShadow: isExpanded
                                        ? `0 16px 50px ${isTroll ? 'rgba(255,150,50,0.35)' : 'rgba(74,158,255,0.35)'}`
                                        : `0 8px 30px rgba(0,0,0,0.5)`,
                                    position: 'relative',
                                    WebkitTapHighlightColor: 'transparent',
                                    userSelect: 'none',
                                }}
                            >
                                {/* Photo */}
                                <div style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden', borderRadius: '2px', background: 'rgba(255,255,255,0.03)' }}>
                                    <img
                                        src={mem.image}
                                        alt={mem.caption}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                    />
                                </div>

                                {/* Polaroid caption strip */}
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6px' }}>
                                    <p className="font-dancing" style={{ fontSize: 'clamp(0.7rem, 2.2vw, 0.85rem)', color: isTroll ? '#ffb840' : '#a8d4ff', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {mem.caption}
                                    </p>
                                </div>

                                {/* Thumbtack pin */}
                                <div style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)', width: '13px', height: '13px', borderRadius: '50%', background: isTroll ? 'radial-gradient(circle at 35% 35%, #ffd580, #d4900a)' : 'radial-gradient(circle at 35% 35%, #a8d4ff, #2a6ab0)', boxShadow: '0 2px 6px rgba(0,0,0,0.5)' }} />
                            </motion.div>

                            {/* Subtitle — pops up BESIDE the photo */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        key={`sub-${i}`}
                                        initial={{ opacity: 0, x: isLeft ? -16 : 16, scale: 0.85 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: isLeft ? -16 : 16, scale: 0.85 }}
                                        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                                        style={{
                                            flex: 1,
                                            padding: '12px 14px',
                                            background: bgColor,
                                            borderRadius: '12px',
                                            border: `1px solid ${borderColor}`,
                                            backdropFilter: 'blur(12px)',
                                            // Subtle speech bubble triangle pointing toward the photo
                                            position: 'relative',
                                        }}
                                    >
                                        {/* Triangle pointer */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            [isLeft ? 'left' : 'right']: '-7px',
                                            width: 0,
                                            height: 0,
                                            borderTop: '7px solid transparent',
                                            borderBottom: '7px solid transparent',
                                            [isLeft ? 'borderRight' : 'borderLeft']: `7px solid ${borderColor}`,
                                        }} />
                                        <p className="font-dancing" style={{ fontSize: 'clamp(0.8rem, 2.8vw, 0.95rem)', color: accentColor, lineHeight: 1.5, textAlign: 'center' }}>
                                            {mem.subtitle}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>

            {/* Continue button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: memories.length * 0.12 + 0.5, duration: 0.6 }}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2,
                    marginTop: '40px',
                }}
            >
                <button
                    className="btn-glow"
                    onClick={() => { playWhoosh(); router.push('/birthday'); }}
                >
                    🎂 One Last Surprise…
                </button>
            </motion.div>
        </motion.div>
    );
}
