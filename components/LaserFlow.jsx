'use client';
import React from 'react';

export default function LaserFlow({
  color = "#CF9EFF",
  horizontalSizing = 0.5,
  verticalSizing = 2,
  className = "",
  style = {},
  ...props
}) {
  return (
    <div
      className={`absolute mix-blend-screen pointer-events-none z-10 ${className}`}
      style={{
        width: '400px',
        height: '500px',
        '--laser-color': color,
        ...style
      }}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-end">
        {/* Deep ambient fog wide */}
        <div
          className="absolute bottom-[-20px] w-[350px] h-[120px] rounded-[100%] blur-[40px] opacity-40"
          style={{ backgroundColor: color }}
        />

        {/* Core impact fog */}
        <div
          className="absolute bottom-[-10px] w-[150px] h-[40px] rounded-[100%] blur-[20px] opacity-70"
          style={{ backgroundColor: color }}
        />
        <div
          className="absolute bottom-[-5px] w-[80px] h-[20px] rounded-[100%] bg-white blur-[10px] opacity-80"
        />

        {/* Laser broad outer beam */}
        <div
          className="absolute bottom-0 w-[50px] h-[95%] blur-[25px] opacity-70"
          style={{
            background: `linear-gradient(to top, ${color} 0%, transparent 100%)`
          }}
        />

        {/* Laser focused inner glow */}
        <div
          className="absolute bottom-0 w-[12px] h-[85%] blur-[6px] opacity-100"
          style={{
            background: `linear-gradient(to top, ${color} 0%, transparent 100%)`
          }}
        />

        {/* Laser core intense white beam */}
        <div
          className="absolute bottom-0 w-[2px] h-[70%] bg-white blur-[1px] shadow-[0_0_10px_#fff]"
          style={{
            background: `linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0) 100%)`,
            boxShadow: `0 0 20px ${color}`
          }}
        />
      </div>
    </div>
  );
}
