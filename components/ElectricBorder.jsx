'use client';
import React from 'react';
import './ElectricBorder.css';

export default function ElectricBorder({
  children,
  color = "#a855f7",
  speed = 0.5,
  thickness = 2,
  className = "",
  style = {}
}) {
  return (
    <div
      className={`relative inline-flex overflow-hidden rounded-full group p-[2px] ${className}`}
      style={{
        '--eb-color': color,
        '--eb-speed': `${2 / speed}s`,
        '--eb-thickness': `${thickness}px`,
        ...style
      }}
    >
      <div className="absolute inset-0 z-0">
        <div className="electric-spinner absolute left-[-25%] top-[-25%] w-[150%] h-[150%] opacity-80" />
      </div>

      {/* Inner Mask hiding the middle of the conic gradient, leaving just the glowing border */}
      <div className="relative z-10 flex w-full h-full rounded-full bg-black/80 backdrop-blur-md">
        {children}
      </div>
    </div>
  );
}
