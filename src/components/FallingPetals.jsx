import React, { useEffect, useRef } from 'react';

export default function FallingPetals({ enabled = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Petal configuration: Rose and Marigold petals
    const petalColors = [
      'rgba(225, 29, 72, 0.75)',   // Crimson rose
      'rgba(244, 63, 94, 0.65)',   // Deep rose pink
      'rgba(251, 113, 133, 0.6)',  // Soft blush petal
      'rgba(234, 179, 8, 0.75)',   // Golden marigold
      'rgba(245, 158, 11, 0.7)',   // Amber marigold
      'rgba(212, 175, 55, 0.65)'   // Shimmering gold leaf
    ];

    const petalCount = width < 768 ? 20 : 38;
    const petals = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 8 + 6,
        d: Math.random() * petalCount,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        tilt: Math.random() * 10 - 10,
        tiltAngleIncremental: Math.random() * 0.05 + 0.02,
        tiltAngle: 0,
        speedX: Math.random() * 1.5 - 0.75,
        speedY: Math.random() * 1.2 + 0.8
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += p.speedY;
        p.x += Math.sin(p.d) + p.speedX;
        p.tilt = Math.sin(p.tiltAngle) * 12;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.tiltAngle * Math.PI) / 180);

        // Draw curved organic petal shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.r / 2, -p.r, p.r, -p.r / 2, p.r, 0);
        ctx.bezierCurveTo(p.r, p.r / 2, p.r / 2, p.r, 0, p.r * 1.2);
        ctx.bezierCurveTo(-p.r / 2, p.r, -p.r, p.r / 2, -p.r, 0);
        ctx.bezierCurveTo(-p.r, -p.r / 2, -p.r / 2, -p.r, 0, 0);

        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();

        // Reset petal when it leaves screen
        if (p.y > height + 20) {
          p.x = Math.random() * width;
          p.y = -20;
          p.speedY = Math.random() * 1.2 + 0.8;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 opacity-80"
    />
  );
}
