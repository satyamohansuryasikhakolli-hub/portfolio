import React, { useEffect, useState, useRef } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#abcdef0123456789';

export default function ScrambleText({ text, className = '', speed = 35, delay = 0 }) {
  const [displayText, setDisplayText] = useState(text);
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const maxIterations = text.length * 2;

    timeoutRef.current = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration / 2) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }

        iteration += 1;
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [text, speed, delay, isReducedMotion]);

  return <span className={className}>{displayText}</span>;
}
