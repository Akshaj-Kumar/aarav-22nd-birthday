import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Gift, Zap } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';

export default function IntroScreen({ onUnlock }) {
  const [isOpening, setIsOpening] = useState(false);
  const [boxOpened, setBoxOpened] = useState(false);

  const handleUnlock = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Play sci-fi unlock sound effect
    soundEngine.playBoxUnlock();

    // Trigger explosive blue and purple confetti fireworks
    setTimeout(() => {
      setBoxOpened(true);

      const count = 200;
      const defaults = {
        origin: { y: 0.6 },
        colors: ['#007BFF', '#00d2ff', '#8B5CF6', '#ec4899', '#ffffff', '#C0C0C0']
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }, 600);

    // Smooth transition to homepage
    setTimeout(() => {
      onUnlock();
    }, 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-jet overflow-hidden"
    >
      {/* Background Starfield and Light Streaks */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030b15] via-[#050505] to-[#071629]" />
      
      {/* Radial Glow Pods */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/15 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/15 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Floating Star Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
              boxShadow: '0 0 8px rgba(0, 210, 255, 0.8)',
              animation: `float ${4 + (i % 4)}s ease-in-out infinite alternate ${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Center Interactive Content */}
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight/80 border border-electric-blue/40 text-neon-blue text-xs tracking-widest uppercase mb-6 shadow-neon-blue backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-neon-blue animate-spin" style={{ animationDuration: '4s' }} />
          <span>Classified Birthday Protocol • Level 22</span>
        </motion.div>

        {/* Main Headings */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl font-bebas tracking-wider text-white text-glow-blue mb-2"
        >
          YO AARU! <span className="text-orange-500">🔥</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl font-orbitron text-gray-300 tracking-wide mb-10"
        >
          READY FOR SOMETHING EPIC?
        </motion.p>

        {/* 3D-Style Futuristic Gift Box */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
          className="relative my-6 cursor-pointer group"
          onClick={handleUnlock}
        >
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
            {/* Outer Cyber Glow Ring */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-electric-blue to-neon-purple opacity-30 blur-xl transition-all duration-700 ${isOpening ? 'scale-150 opacity-80' : 'group-hover:opacity-60'}`} />

            {/* Gift Box Base */}
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-midnight to-jet border-2 border-electric-blue/60 shadow-neon-blue flex items-center justify-center backdrop-blur-md overflow-hidden transition-transform duration-500 group-hover:scale-105">
              
              {/* Futuristic Circuit Grid Lines */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00d2ff_1px,transparent_1px)] [background-size:12px_12px]" />

              {/* Glowing Ribbons */}
              <div className="absolute inset-x-0 h-4 bg-gradient-to-r from-neon-purple via-electric-blue to-neon-purple opacity-80 shadow-neon-purple" />
              <div className="absolute inset-y-0 w-4 bg-gradient-to-b from-neon-purple via-electric-blue to-neon-purple opacity-80 shadow-neon-purple" />

              {/* Box Lid Animation */}
              <motion.div
                animate={isOpening ? { y: -70, rotate: -15, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute top-2 w-32 sm:w-36 h-10 rounded-lg bg-midnight-deep border border-electric-blue/80 shadow-md flex items-center justify-center z-10"
              >
                <div className="w-8 h-4 rounded-full bg-electric-blue/40 border border-neon-blue blur-[1px]" />
              </motion.div>

              {/* Icon / Core Glow */}
              <motion.div
                animate={boxOpened ? { scale: [1, 1.4, 1.2], opacity: 1 } : { scale: 1, opacity: 0.9 }}
                className="z-20 flex flex-col items-center"
              >
                <Gift className={`w-14 h-14 ${boxOpened ? 'text-neon-blue animate-bounce' : 'text-metallic-silver group-hover:text-neon-blue'} transition-colors duration-300 drop-shadow-[0_0_12px_rgba(0,123,255,0.8)]`} />
                <span className="text-[10px] font-orbitron tracking-widest text-neon-blue/80 uppercase mt-2">
                  {boxOpened ? "UNLEASHED!" : "TAP TO OPEN"}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Unlock Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUnlock}
          disabled={isOpening}
          className="relative group mt-6 px-8 py-4 rounded-xl font-orbitron font-semibold text-sm sm:text-base text-white tracking-widest uppercase overflow-hidden shadow-neon-blue transition-all duration-300"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-electric-blue via-neon-purple to-electric-blue bg-[length:200%_auto] animate-gradient" />
          
          {/* Inner glass overlay */}
          <div className="absolute inset-[1px] rounded-[11px] bg-jet/80 group-hover:bg-jet/60 transition-colors" />

          {/* Button Text */}
          <span className="relative z-10 flex items-center gap-3 text-glow-blue">
            <Zap className="w-4 h-4 text-neon-blue animate-pulse" />
            {isOpening ? "INITIALIZING EXPERIENCE..." : "UNLOCK YOUR BIRTHDAY SURPRISE ⚡"}
          </span>
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
          className="text-xs text-gray-400 font-montserrat mt-4"
        >
          Designed exclusively for Aarav Sharma's 22nd Milestone
        </motion.p>
      </div>
    </motion.div>
  );
}
