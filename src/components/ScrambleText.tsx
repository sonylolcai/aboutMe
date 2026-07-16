'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function ScrambleText({
  text,
  className = '',
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  // Start with empty string to avoid hydration mismatch
  const [displayText, setDisplayText] = useState('');
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Before animation starts, show random characters during the delay phase
    if (!hasAnimated && !isInView) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayText(
        text.replace(/[^\s]/g, () => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]),
      );
    }
  }, [text, hasAnimated, isInView]);

  useEffect(() => {
    if (!isInView || hasAnimated) return;

    const timeoutId = setTimeout(() => {
      let iteration = 0;
      const maxIterations = 15;
      const interval = setInterval(() => {
        setDisplayText((prev) =>
          prev
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration / (maxIterations / text.length)) {
                return text[index];
              }
              return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            })
            .join(''),
        );

        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
          setHasAnimated(true);
        }

        iteration += 1;
      }, 30);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isInView, text, hasAnimated, delay]);

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Invisible original text to reserve exact layout space and prevent height jumping */}
      <span className="invisible">{text}</span>
      {/* Absolute positioned animated text */}
      <span className="absolute top-0 left-0 h-full w-full whitespace-pre-wrap" aria-hidden="true">
        {hasAnimated ? text : displayText}
      </span>
    </span>
  );
}
