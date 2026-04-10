'use client';
import { useRef, useEffect } from 'react';

export default function LightRays({
  raysOrigin = 'top-center',
  raysColor = '#ffffff',
  raysSpeed = 1,
  lightSpread = 0.5,
  rayLength = 3,
  followMouse = true,
  mouseInfluence = 0.1,
  className = '',
  fadeDistance = 1,
  saturation = 1,
  style = {}
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    let targetMouseX = width / 2;
    let mouseX = width / 2;
    let animationFrameId;
    let time = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
    };

    if (followMouse) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const rays = [];
    for (let i = 0; i < 25; i++) {
      rays.push({
        angle: (Math.random() - 0.5) * Math.PI * lightSpread,
        width: Math.random() * 100 + 30,
        speed: (Math.random() * 0.005 + 0.002) * raysSpeed,
        offset: Math.random() * 100,
        opacity: Math.random() * 0.1 + 0.02
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * mouseInfluence;
      time += 1;

      const originX = width / 2;
      const originY = 0; 
      
      const sway = (mouseX - width / 2) * 0.0005;

      for (const ray of rays) {
        ctx.save();
        ctx.beginPath();
        
        ctx.translate(originX, originY);
        
        const animatedAngle = ray.angle + Math.sin(time * ray.speed + ray.offset) * 0.15 + sway;
        ctx.rotate(animatedAngle);

        const rLength = height * rayLength;

        const grad = ctx.createLinearGradient(0, 0, 0, rLength * fadeDistance);
        grad.addColorStop(0, `${raysColor}${Math.floor(ray.opacity * 255 * saturation).toString(16).padStart(2, '0')}`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = grad;
        ctx.moveTo(-ray.width / 2, 0);
        ctx.lineTo(ray.width * 1.5, rLength);
        ctx.lineTo(-ray.width * 1.5, rLength);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      const glowGrad = ctx.createRadialGradient(originX, 0, 0, originX, 0, 300 * saturation);
      glowGrad.addColorStop(0, `${raysColor}20`);
      glowGrad.addColorStop(1, 'rgba(255,255,255,0)');
      
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (followMouse) window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [raysColor, raysSpeed, lightSpread, rayLength, followMouse, mouseInfluence, fadeDistance, saturation]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
        filter: 'blur(15px)',
        ...style
      }}
    />
  );
}
