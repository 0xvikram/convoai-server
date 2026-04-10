'use client';
import React, { useEffect, useRef } from 'react';

export default function CurvedLoop({
  marqueeText = "Welcome to React Bits ✦ ",
  speed = 2,
  curveAmount = 200,
  direction = "right",
  interactive = false,
  className = "",
}) {
  const textPathRef = useRef(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(null);
  const isHovered = useRef(false);

  // Repeat text heavily to ensure it always spans the screen
  const repeatedText = Array(20).fill(marqueeText).join('\u00A0\u00A0\u00A0\u00A0');

  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time) => {
      if (!interactive || !isHovered.current) {
        // Delta time makes it smooth regardless of framerate
        const delta = (time - lastTime) / 16;
        const velocity = direction === 'right' ? speed * 0.5 : speed * -0.5;
        offsetRef.current += velocity * delta;

        // Arbitrary reset boundary to prevent float overflow. 
        // 5000 is usually wide enough to be invisible resetting
        if (offsetRef.current > 0) offsetRef.current -= 5000;
        if (offsetRef.current < -5000) offsetRef.current += 5000;
      }

      if (textPathRef.current) {
        textPathRef.current.setAttribute('startOffset', `${offsetRef.current}px`);
      }

      lastTime = time;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, direction, interactive]);

  // Center the arch in a 0-2000 by 0-300 viewBox.
  // Start slightly off-screen left, peak near the top middle (y ~ 50), end off-screen right.
  const pathD = `M -200 250 Q 1000 -150 2200 250`;

  return (
    <div
      className={`w-full h-full flex items-center justify-center overflow-hidden ${className}`}
      onMouseEnter={() => { if (interactive) isHovered.current = true; }}
      onMouseLeave={() => { if (interactive) isHovered.current = false; }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 2000 140"
        preserveAspectRatio="xMidYMid meet"
        className="text-white/40 hover:text-white transition-colors duration-500"
      >
        <path id="curve" d={pathD} fill="transparent" />
        <text
          className="uppercase tracking-[0.2em] font-black"
          style={{ fill: 'currentColor', fontSize: '50px', fontFamily: 'sans-serif' }}
        >
          <textPath ref={textPathRef} href="#curve" startOffset="0px">
            {repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
