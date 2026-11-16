import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Flame, Rocket, Star } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';

export default function Fireworks({ onTriggerConfetti }) {
  const canvasRef = useRef(null);
  const [salvoCount, setSalvoCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 650);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 650;
    };
    window.addEventListener('resize', handleResize);

    // Particle system
    const particles = [];
    const colors = ['#007BFF', '#00d2ff', '#8B5CF6', '#ec4899', '#ffffff', '#fbbf24', '#C0C0C0'];

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.018 + 0.012;
        this.size = Math.random() * 2.5 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.04; // gravity
        this.alpha -= this.decay;
      }

      draw(context) {
        context.save();
        context.globalAlpha = Math.max(0, this.alpha);
        context.fillStyle = this.color;
        context.shadowBlur = 10;
        context.shadowColor = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.restore();
      }
    }

    const explode = (x, y) => {
      const pCount = 45;
      const baseColor = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < pCount; i++) {
        const c = Math.random() > 0.3 ? baseColor : colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, c));
      }
    };

    // Auto bursts periodically
    let lastAutoBurst = 0;
    const loop = (timestamp) => {
      ctx.clearRect(0, 0, width, height);

      // Auto burst every 1.4s
      if (timestamp - lastAutoBurst > 1400) {
        const randX = Math.random() * (width * 0.7) + width * 0.15;
        const randY = Math.random() * (height * 0.45) + height * 0.1;
        explode(randX, randY);
        lastAutoBurst = timestamp;
      }

      // Update & render particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          p.draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCanvasClick = (e) => {
    soundEngine.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Trigger canvas explosion via custom event or canvas-confetti
    confetti({
      particleCount: 50,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      },
      colors: ['#007BFF', '#00d2ff', '#8B5CF6', '#ffffff']
    });

    setSalvoCount(prev => prev + 1);
  };

  const handleLaunchSalvo = () => {
    soundEngine.playFanfare();
    onTriggerConfetti();
    setSalvoCount(prev => prev + 5);

    // Multi-angle volley
    const count = 180;
    confetti({
      particleCount: count,
      spread: 120,
      origin: { y: 0.6 },
      colors: ['#007BFF', '#8B5CF6', '#00d2ff', '#ffffff', '#fbbf24']
    });
  };

  return (
    <section id="fireworks" className="relative min-h-[650px] py-24 flex items-center justify-center overflow-hidden bg-gradient-to-b from-jet via-midnight-deep to-jet border-y border-electric-blue/20">
      
      {/* Background Star Canvas */}
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute inset-0 z-0 w-full h-full cursor-crosshair"
      />

      {/* Cyber Grid Subtle Texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#007BFF_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Center Cinematic Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pointer-events-auto">
        
        {/* Glow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-midnight/90 border border-neon-purple/50 text-neon-purple text-xs font-orbitron tracking-widest uppercase mb-6 shadow-neon-purple backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-neon-purple animate-spin" style={{ animationDuration: '4s' }} />
          <span>CELESTIAL TRIBUTE SALVO</span>
        </motion.div>

        {/* Main Display Title */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-7xl md:text-8xl font-bebas tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-blue to-neon-purple drop-shadow-[0_0_35px_rgba(0,123,255,0.5)] leading-tight mb-6"
        >
          THE WORLD NEEDS MORE LEGENDS LIKE YOU.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 font-montserrat text-sm sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Click anywhere in the midnight sky above to ignite neon bursts, or hit the trigger below to unleash an all-out fireworks finale!
        </motion.p>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleLaunchSalvo}
            className="group relative px-8 py-4 rounded-xl font-orbitron font-bold text-xs sm:text-sm text-white tracking-widest uppercase overflow-hidden shadow-neon-blue hover:scale-105 active:scale-95 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-electric-blue to-neon-blue" />
            <div className="absolute inset-[1.5px] rounded-[10px] bg-jet/70 group-hover:bg-jet/40 transition-colors" />

            <span className="relative z-10 flex items-center gap-2.5 text-glow-blue">
              <Rocket className="w-4 h-4 text-neon-blue animate-bounce" />
              LAUNCH FIREWORK SALVO 🎆
            </span>
          </button>

          <div className="text-xs font-mono text-gray-400 bg-midnight/80 px-4 py-3 rounded-xl border border-white/10 backdrop-blur-md">
            Rockets Detonated: <span className="text-neon-blue font-bold font-orbitron">{salvoCount}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
