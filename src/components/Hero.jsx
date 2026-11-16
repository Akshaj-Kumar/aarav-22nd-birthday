import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Flame, ChevronDown, Gamepad2, Car, Compass, Heart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayConfig';
import { soundEngine } from '../utils/audioSynth';

export default function Hero({ onTriggerConfetti }) {
  const { person, personalityTraits } = BIRTHDAY_DATA;

  const handleMakeNoise = () => {
    soundEngine.playFanfare();
    onTriggerConfetti();
    const target = document.querySelector('#cake') || document.querySelector('#gallery');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Lighting & Cosmic Ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-electric-blue/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-neon-purple/15 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-80 h-80 bg-neon-blue/10 rounded-full blur-[130px]" />
        
        {/* Floating Cyber Rings & Metallic Geometry */}
        <div className="absolute top-28 left-8 sm:left-24 w-32 h-32 border border-electric-blue/20 rounded-full animate-float opacity-40 pointer-events-none" />
        <div className="absolute bottom-28 right-8 sm:right-24 w-44 h-44 border border-neon-purple/20 rounded-full animate-float opacity-40 pointer-events-none" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-midnight/80 border border-electric-blue/50 text-neon-blue text-xs sm:text-sm font-orbitron tracking-widest uppercase mb-6 shadow-neon-blue backdrop-blur-md"
        >
          <Trophy className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span>OFFICIAL 22ND BIRTHDAY EDITION • 15 NOVEMBER</span>
        </motion.div>

        {/* Small Pre-Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-sm sm:text-base md:text-lg font-orbitron tracking-[0.3em] uppercase text-gray-400 mb-2"
        >
          HAPPY BIRTHDAY
        </motion.div>

        {/* Main Name Heading with Neon Metallic Gradient */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-6xl sm:text-8xl md:text-9xl font-bebas tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-metallic-silver to-neon-blue drop-shadow-[0_0_35px_rgba(0,123,255,0.4)] leading-none select-none mb-3"
        >
          {person.fullName.toUpperCase()}
        </motion.h1>

        {/* 22 Years Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-2xl sm:text-4xl md:text-5xl font-orbitron font-bold text-white text-glow-blue tracking-wide mb-4"
        >
          22 YEARS OF LEGENDARY VIBES.
        </motion.div>

        {/* Cinematic Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-base sm:text-xl text-gray-300 font-montserrat font-light leading-relaxed mb-8"
        >
          "{person.tagline}"
        </motion.p>

        {/* Personality Attribute Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-2.5 max-w-3xl mb-10"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jet-card/80 border border-electric-blue/30 text-xs font-montserrat text-gray-300">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            Nickname: <strong className="text-white">{person.nickname}</strong>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jet-card/80 border border-neon-purple/30 text-xs font-montserrat text-gray-300">
            <Gamepad2 className="w-3.5 h-3.5 text-neon-purple" />
            Gaming Prodigy
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jet-card/80 border border-neon-blue/30 text-xs font-montserrat text-gray-300">
            <Car className="w-3.5 h-3.5 text-neon-blue" />
            Car Aficionado
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jet-card/80 border border-pink-500/30 text-xs font-montserrat text-gray-300">
            <Heart className="w-3.5 h-3.5 text-pink-400" />
            Brother For Life
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-jet-card/80 border border-yellow-400/30 text-xs font-montserrat text-gray-300">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            100% Unhinged Humor
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Main CTA */}
          <button
            onClick={handleMakeNoise}
            className="relative group px-9 py-4 rounded-xl font-orbitron font-bold text-sm sm:text-base text-white tracking-widest uppercase overflow-hidden shadow-neon-blue transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {/* Pulsing neon background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-electric-blue via-neon-purple to-neon-blue opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-[1px] rounded-[11px] bg-jet/60 group-hover:bg-jet/30 transition-colors" />

            <span className="relative z-10 flex items-center gap-3 text-glow-blue">
              <Flame className="w-5 h-5 text-orange-400 animate-bounce" />
              LET'S MAKE SOME NOISE! 🔥
            </span>
          </button>

          {/* Secondary CTA */}
          <a
            href="#reasons"
            onClick={(e) => {
              e.preventDefault();
              soundEngine.playClick();
              document.querySelector('#reasons')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-7 py-4 rounded-xl bg-midnight/80 border border-white/10 hover:border-neon-purple text-xs sm:text-sm font-orbitron text-gray-300 hover:text-white transition-all backdrop-blur-md"
          >
            EXPLORE 22 REASONS →
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-14 flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => {
            soundEngine.playClick();
            document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] font-orbitron tracking-widest text-gray-400 uppercase">
            Scroll to Celebrate
          </span>
          <ChevronDown className="w-4 h-4 text-neon-blue animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}
