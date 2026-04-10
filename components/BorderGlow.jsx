'use client';
import React, { useRef, useState, useEffect } from 'react';
import './BorderGlow.css';

export default function BorderGlow({
  children,
  edgeSensitivity = 30, // Optional tracking limit
  glowColor = "40 80 80",
  backgroundColor = "#060010",
  borderRadius = 28,
  glowRadius = 300,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  className = '',
  ...rest
}) {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
      setMousePosition({ x: -1000, y: -1000 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`border-glow-container ${animated ? 'animated' : ''} ${className}`}
      style={{
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
        '--glow-color': glowColor,
        '--glow-radius': `${glowRadius}px`,
        '--glow-intensity': glowIntensity,
        '--border-radius': `${borderRadius}px`,
        '--bg-color': backgroundColor,
        '--color-1': colors[0] || glowColor,
        '--color-2': colors[1] || glowColor,
        '--color-3': colors[2] || glowColor,
        '--cone-spread': `${coneSpread}deg`
      }}
      {...rest}
    >
      <div className="border-glow-content">
        {children}
      </div>
    </div>
  );
}
