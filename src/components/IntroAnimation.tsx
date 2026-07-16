'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgTextRef = useRef<SVGTextElement>(null);
  const sRef = useRef<SVGTSpanElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!svgTextRef.current || !sRef.current || !containerRef.current) return;

    // Set initial dash offset for drawing
    anime.set(svgTextRef.current, {
      strokeDasharray: 1000,
      strokeDashoffset: 1000,
      fill: 'rgba(13, 14, 16, 0)',
    });

    const tl = anime.timeline({
      easing: 'easeInOutSine',
    });

    // 1. Draw the stroke of the text
    tl.add({
      targets: svgTextRef.current,
      strokeDashoffset: [1000, 0],
      duration: 1500, // 1.5s
      delay: 0,
    })
      // 2. Fill the text with solid color (obsidian)
      .add({
        targets: svgTextRef.current,
        fill: 'rgba(13, 14, 16, 1)',
        stroke: 'rgba(13, 14, 16, 0)',
        duration: 500, // 0.5s -> total 2s
        easing: 'easeOutQuad',
      })
      // 3. Pause for 1 second
      .add({
        targets: containerRef.current,
        duration: 1000, // wait 1s
      })
      // 4. Zoom in dramatically centered on 'S'
      .add(
        {
          targets: sRef.current,
          scale: 150,
          opacity: 0,
          duration: 800,
          easing: 'easeInExpo',
          // We scale the container to create the zoom through effect
        },
        '-=1000',
      );

    tl.add(
      {
        targets: containerRef.current,
        scale: 20,
        opacity: 0,
        duration: 1000,
        easing: 'easeInExpo',
        complete: () => {
          setIsVisible(false);
          onComplete();
        },
      },
      '-=1000',
    );
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="bg-paper fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ transformOrigin: 'center center' }}
    >
      <svg
        className="h-auto w-1/2 max-w-3xl"
        viewBox="0 0 800 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          ref={svgTextRef}
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="font-hand text-9xl font-bold"
          stroke="#71717A"
          strokeWidth="2"
          fill="none"
        >
          hi, i am{' '}
          <tspan ref={sRef} style={{ transformOrigin: 'center center' }}>
            S
          </tspan>
          onny
        </text>
      </svg>
    </div>
  );
}
