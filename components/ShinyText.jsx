'use client';

import React from 'react';
import './ShinyText.css';

export default function ShinyText({
  text = "✨ Shiny Text Effect",
  speed = 2,
  delay = 0,
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120, // Not explicitly used if we force a fixed width gradient, but we can interpolate it.
  direction = "left",
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
  className = "",
  style = {}
}) {
  const gradientDir = direction === "left" ? "to left" : "to right";
  
  if (disabled) {
    return <span className={className} style={{...style, color}}>{text}</span>;
  }

  return (
    <span
      className={`shiny-text ${pauseOnHover ? 'shiny-paused' : ''} ${className}`}
      style={{
        backgroundImage: `linear-gradient(${gradientDir}, ${color} 30%, ${shineColor} 50%, ${color} 70%)`,
        '--shine-speed': `${speed}s`,
        '--shine-delay': `${delay}s`,
        animationDirection: yoyo ? 'alternate' : 'normal',
        ...style
      }}
    >
      {text}
    </span>
  );
}
