import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Flame, Wind, Trophy, Sparkles, RotateCcw } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayConfig';
import { soundEngine } from '../utils/audioSynth';

export default function BirthdayCake({ onTriggerConfetti }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [smokeActive, setSmokeActive] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const { cakeDetails } = BIRTHDAY_DATA;
  const candleCount = 22;

  const handleBlowCandles = () => {
    if (!candlesLit || isBlowing) return;
    setIsBlowing(true);

    // Play realistic blow + fanfare sound
    soundEngine.playBlowCandles();

    // Show smoke puffs and extinguish flames
    setCandlesLit(false);
    setSmokeActive(true);

    // Trigger big celebratory fireworks
    setTimeout(() => {
      setUnlocked(true);
      setIsBlowing(false);
      onTriggerConfetti();

      // Extra burst
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#007BFF', '#00d2ff', '#8B5CF6', '#ffffff', '#fbbf24']
      });
    }, 600);

    // Fade out smoke after 2 seconds
    setTimeout(() => {
      setSmokeActive(false);
    }, 2200);
  };

  const handleRelight = () => {
    soundEngine.playClick();
    setCandlesLit(true);
    setSmokeActive(false);
    setUnlocked(false);
  };

  return (
    <section id="cake" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      
      {/* Background Neon Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-electric-blue/10 rounded-full blur-[170px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight/90 border border-electric-blue/40 text-neon-blue text-xs font-orbitron tracking-widest uppercase mb-4 shadow-neon-blue"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Ritual</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-6xl font-bebas tracking-wide text-white text-glow-blue mb-3"
        >
          {cakeDetails.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-300 font-montserrat text-sm sm:text-base"
        >
          {cakeDetails.subtitle}
        </motion.p>
      </div>

      {/* Unlocked Level 22 Celebration Banner */}
      <AnimatePresence>
        {unlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-10 inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-midnight via-jet-card to-midnight border-2 border-yellow-400 shadow-[0_0_35px_rgba(251,191,36,0.4)]"
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400 animate-bounce" />
              <div className="text-left">
                <span className="text-2xl sm:text-3xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-amber-400">
                  {cakeDetails.unlockedMessage}
                </span>
                <p className="text-xs font-montserrat text-gray-300 mt-0.5">
                  All 22 wishes locked in. Your greatest year has officially commenced!
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D-Style Black and Electric-Blue 3-Layer Birthday Cake */}
      <div className="relative max-w-lg mx-auto py-10 flex flex-col items-center">
        
        {/* CANDLES ARRAY (22 CANDLES) */}
        <div className="relative z-20 flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-sm sm:max-w-md mx-auto mb-[-8px]">
          {[...Array(candleCount)].map((_, i) => (
            <div key={i} className="flex flex-col items-center relative group">
              
              {/* Flame or Smoke */}
              <div className="h-7 flex items-end justify-center mb-0.5">
                {candlesLit && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flame"
                    style={{ animationDelay: `${(i % 5) * 0.12}s` }}
                  />
                )}
                {smokeActive && (
                  <div 
                    className="smoke-puff"
                    style={{ animationDelay: `${(i % 7) * 0.08}s` }}
                  />
                )}
              </div>

              {/* Wick */}
              <div className="w-0.5 h-1.5 bg-gray-400" />

              {/* Candle Body */}
              <div 
                className="w-2.5 sm:w-3 h-9 rounded-t-sm shadow-sm"
                style={{
                  background: i % 2 === 0 
                    ? 'linear-gradient(180deg, #C0C0C0, #4b5563)' 
                    : 'linear-gradient(180deg, #00d2ff, #007BFF)',
                  boxShadow: candlesLit ? '0 0 6px rgba(0, 210, 255, 0.6)' : 'none'
                }}
              />
            </div>
          ))}
        </div>

        {/* CAKE LAYER 1 (TOP TIER - JET BLACK WITH NEON PIPING) */}
        <div className="relative z-10 w-48 sm:w-56 h-16 rounded-t-xl bg-gradient-to-b from-[#161c28] via-[#0d131f] to-[#070b12] border-t-2 border-x-2 border-electric-blue/80 shadow-[0_0_20px_rgba(0,123,255,0.3)] flex items-center justify-center overflow-hidden">
          {/* Neon Frosting Drips */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-electric-blue via-neon-purple to-neon-blue" />
          <div className="absolute top-2 w-full flex justify-around opacity-40">
            <span className="w-2 h-3 rounded-full bg-neon-blue" />
            <span className="w-2 h-4 rounded-full bg-neon-purple" />
            <span className="w-2 h-2 rounded-full bg-neon-blue" />
            <span className="w-2 h-4 rounded-full bg-neon-purple" />
          </div>

          <span className="font-orbitron font-extrabold text-xs sm:text-sm tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-metallic-silver to-neon-blue">
            AARU • 22
          </span>
        </div>

        {/* CAKE LAYER 2 (MIDDLE TIER - METALLIC EMBOSSED ACCENTS) */}
        <div className="relative z-0 w-64 sm:w-72 h-20 bg-gradient-to-b from-[#111622] via-[#090e17] to-[#05070c] border-x-2 border-t border-neon-purple/80 shadow-[0_0_25px_rgba(139,92,246,0.25)] flex items-center justify-center overflow-hidden mt-[-2px]">
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-neon-purple via-electric-blue to-neon-purple" />
          
          {/* Metallic Silver Ribbon Strip */}
          <div className="w-full py-1.5 px-4 bg-white/5 border-y border-white/10 flex items-center justify-around">
            <span className="w-1.5 h-1.5 rounded-full bg-metallic-silver shadow-[0_0_5px_#fff]" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-metallic-silver uppercase">
              ★ NO LIMITS ★
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-metallic-silver shadow-[0_0_5px_#fff]" />
          </div>
        </div>

        {/* CAKE LAYER 3 (BASE TIER - JET BLACK WITH GLOWING LED BEVEL) */}
        <div className="relative z-0 w-80 sm:w-96 h-24 rounded-b-2xl bg-gradient-to-b from-[#0e121a] via-[#07090e] to-[#020306] border-x-2 border-b-2 border-electric-blue shadow-neon-blue flex flex-col items-center justify-center overflow-hidden mt-[-2px]">
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-electric-blue via-neon-blue to-electric-blue" />
          
          {/* Futuristic Circuit Grid Pattern */}
          <div className="text-center px-4">
            <span className="text-xs sm:text-sm font-orbitron font-black tracking-widest text-neon-blue text-glow-blue uppercase">
              CHAPTER 22 • UNSTOPPABLE
            </span>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-[10px] font-mono text-gray-400">15.11.2004 — ETERNAL LEGEND</span>
            </div>
          </div>
        </div>

        {/* LUXURY PLATTER / STAND */}
        <div className="relative z-0 w-[340px] sm:w-[420px] h-6 rounded-[50%] bg-gradient-to-r from-[#1f293d] via-[#374151] to-[#1f293d] border border-electric-blue/50 shadow-[0_15px_30px_rgba(0,0,0,0.8)] mt-[-6px]" />
      </div>

      {/* Action Controls */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        {candlesLit ? (
          <button
            onClick={handleBlowCandles}
            disabled={isBlowing}
            className="group relative px-9 py-4 rounded-xl font-orbitron font-bold text-sm sm:text-base text-white tracking-widest uppercase overflow-hidden shadow-neon-blue transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-electric-blue via-neon-purple to-neon-blue animate-gradient" />
            <div className="absolute inset-[1px] rounded-[11px] bg-jet/60 group-hover:bg-jet/30 transition-colors" />

            <span className="relative z-10 flex items-center gap-3 text-glow-blue">
              <Wind className="w-5 h-5 text-neon-blue animate-pulse" />
              {isBlowing ? "BLOWING CANDLES..." : cakeDetails.buttonBlow}
            </span>
          </button>
        ) : (
          <button
            onClick={handleRelight}
            className="group flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-midnight/90 border border-yellow-400/50 hover:border-yellow-400 text-yellow-300 text-sm font-orbitron tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:scale-105"
          >
            <RotateCcw className="w-4 h-4 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
            <span>{cakeDetails.buttonRelight}</span>
          </button>
        )}
      </div>

      {/* Floating Wish Pills */}
      <div className="mt-14 max-w-3xl mx-auto">
        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest block mb-3">
          Wishes Dispatched for the Year Ahead:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {cakeDetails.wishes.map((wish, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1.5 rounded-full bg-jet-card border border-white/10 text-xs font-montserrat text-gray-300"
            >
              {wish}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
