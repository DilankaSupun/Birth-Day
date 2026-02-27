'use client';

import { useState, useEffect } from 'react';

interface TypingTextProps {
    lines: string[];
    speed?: number;
    lineDelay?: number;
    onComplete?: () => void;
    className?: string;
    lineClassName?: string;
}

export default function TypingText({
    lines,
    speed = 50,
    lineDelay = 800,
    onComplete,
    className = '',
    lineClassName = '',
}: TypingTextProps) {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (currentLineIndex >= lines.length) {
            setIsComplete(true);
            onComplete?.();
            return;
        }

        const currentLine = lines[currentLineIndex];

        if (currentCharIndex <= currentLine.length) {
            const timer = setTimeout(() => {
                setDisplayedLines((prev) => {
                    const newLines = [...prev];
                    newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex);
                    return newLines;
                });

                if (currentCharIndex === currentLine.length) {
                    // Line complete, move to next
                    setTimeout(() => {
                        setCurrentLineIndex((prev) => prev + 1);
                        setCurrentCharIndex(0);
                    }, lineDelay);
                } else {
                    setCurrentCharIndex((prev) => prev + 1);
                }
            }, speed);

            return () => clearTimeout(timer);
        }
    }, [currentLineIndex, currentCharIndex, lines, speed, lineDelay, onComplete]);

    return (
        <div className={className}>
            {displayedLines.map((line, index) => (
                <div key={index} className={lineClassName}>
                    {line}
                    {index === currentLineIndex && !isComplete && (
                        <span
                            style={{
                                display: 'inline-block',
                                width: '2px',
                                height: '1em',
                                backgroundColor: '#4a9eff',
                                marginLeft: '2px',
                                animation: 'blink 1s infinite',
                                verticalAlign: 'text-bottom',
                            }}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
