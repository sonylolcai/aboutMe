'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // We use slightly looser springs for the paw so it follows with a bit of organic delay
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 20); // Center the 40x40 paw
      cursorY.set(e.clientY - 20);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Detect text hover for the invert effect
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const computedStyle = window.getComputedStyle(target);

      // If hovering over text elements, buttons, or links, apply hover effect
      const isText = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'A', 'BUTTON'].includes(
        target.tagName,
      );
      // Or if the cursor is pointer
      const isPointer = computedStyle.cursor === 'pointer';

      if (isText || isPointer) {
        setIsHoveringText(true);
      } else {
        setIsHoveringText(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted) return null;

  // Clench animation values
  const toeScale = isMouseDown ? 0.9 : 1;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <motion.div
        animate={{
          scale: isHoveringText ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative flex h-10 w-10 items-center justify-center text-white"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full" fill="currentColor">
          {/* Main Pad (Perfectly rounded composite shape) */}
          <g>
            {/* Upper body */}
            <ellipse cx="50" cy="60" rx="24" ry="16" />
            {/* Left bottom lobe */}
            <circle cx="32" cy="72" r="12" />
            {/* Right bottom lobe */}
            <circle cx="68" cy="72" r="12" />
            {/* Center bottom lobe */}
            <circle cx="50" cy="76" r="14" />
          </g>
          {/* 4 Toes without claws */}
          <motion.ellipse
            cx="22"
            cy="38"
            rx="8"
            ry="12"
            transform="rotate(-30 22 38)"
            animate={{ scale: toeScale, y: isMouseDown ? 4 : 0, x: isMouseDown ? 4 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
          <motion.ellipse
            cx="38"
            cy="18"
            rx="8"
            ry="12"
            transform="rotate(-10 38 18)"
            animate={{ scale: toeScale, y: isMouseDown ? 6 : 2, x: isMouseDown ? 2 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
          <motion.ellipse
            cx="62"
            cy="18"
            rx="8"
            ry="12"
            transform="rotate(10 62 18)"
            animate={{ scale: toeScale, y: isMouseDown ? 6 : 2, x: isMouseDown ? -2 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
          <motion.ellipse
            cx="78"
            cy="38"
            rx="8"
            ry="12"
            transform="rotate(30 78 38)"
            animate={{ scale: toeScale, y: isMouseDown ? 4 : 0, x: isMouseDown ? -4 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
