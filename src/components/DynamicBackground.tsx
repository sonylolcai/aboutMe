'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';

export default function DynamicBackground() {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out mouse movement for the spotlight mask
  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const maskImageTemplate = useMotionTemplate`radial-gradient(350px circle at ${springX}px ${springY}px, black 0%, transparent 100%)`;

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-paper">
      
      {/* 1. Ambient glowing orbs to add depth without distraction */}
      <motion.div
        className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply opacity-30 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #E0F2FE 0%, transparent 70%)' }}
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] rounded-full mix-blend-multiply opacity-30 blur-[100px]"
        style={{ background: 'radial-gradient(circle, #F3E8FF 0%, transparent 70%)' }}
        animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* 2. Base subtle dot matrix (low opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(13, 14, 16, 0.2) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* 3. Interactive Highlight dot matrix (revealed by mouse hover) */}
      <motion.div 
        className="absolute inset-0 opacity-[0.85]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(13, 14, 16, 0.4) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          WebkitMaskImage: maskImageTemplate,
          maskImage: maskImageTemplate,
        }}
      />

      {/* 4. Subtle slow moving scanline (technical vibe) */}
      <motion.div 
        className="absolute left-0 right-0 h-40 opacity-10 mix-blend-multiply"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(13, 14, 16, 0.2), transparent)'
        }}
        animate={{ y: ['-100vh', '100vh'] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
      />
      
    </div>
  );
}
