import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCw, Trophy, CheckCircle2 } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayConfig';
import { soundEngine } from '../utils/audioSynth';

export default function ReasonsGrid() {
  const reasons = BIRTHDAY_DATA.twentyTwoReasons;
  const [flippedCards, setFlippedCards] = useState({});

  const handleCardClick = (id) => {
    soundEngine.playCardFlip();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleFlipAll = () => {
    soundEngine.playFanfare();
    const allFlipped = Object.keys(flippedCards).length === reasons.length && Object.values(flippedCards).every(Boolean);
    if (allFlipped) {
      setFlippedCards({});
    } else {
      const newFlipped = {};
      reasons.forEach(r => { newFlipped[r.id] = true; });
      setFlippedCards(newFlipped);
    }
  };

  const flippedCount = Object.values(flippedCards).filter(Boolean).length;

  return (
    <section id="reasons" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Background Lighting Accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-electric-blue/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight/90 border border-electric-blue/40 text-neon-blue text-xs font-orbitron tracking-widest uppercase mb-4 shadow-neon-blue backdrop-blur-md"
        >
          <Trophy className="w-3.5 h-3.5 text-yellow-400" />
          <span>Interactive 3D Card Vault</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bebas tracking-wide text-white text-glow-blue mb-4"
        >
          22 REASONS WHY AARU IS A LEGEND.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 font-montserrat text-sm sm:text-base max-w-xl mx-auto mb-6"
        >
          22 years on this planet, 22 undeniable facts. Click or tap any card to reveal the classified brotherhood truth!
        </motion.p>

        {/* Global Action Bar */}
        <div className="flex items-center justify-center gap-4">
          <div className="px-4 py-1.5 rounded-lg bg-jet-card border border-white/10 text-xs font-mono text-gray-300">
            Unlocked: <span className="text-neon-blue font-bold font-orbitron">{flippedCount}</span> / 22
          </div>

          <button
            onClick={handleFlipAll}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-midnight border border-neon-purple/40 hover:border-neon-purple text-xs font-orbitron text-gray-200 hover:text-white transition-all shadow-sm"
          >
            <RotateCw className="w-3.5 h-3.5 text-neon-purple" />
            <span>{flippedCount === reasons.length ? "FLIP ALL TO FRONT" : "REVEAL ALL 22 CARDS ⚡"}</span>
          </button>
        </div>
      </div>

      {/* 22 Interactive 3D Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {reasons.map((item, index) => {
          const isFlipped = !!flippedCards[item.id];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
              className="h-64 cursor-pointer perspective-1000 group"
              onClick={() => handleCardClick(item.id)}
            >
              {/* Inner card containing front and back */}
              <div 
                className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
              >
                {/* FRONT FACE */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl p-6 glass-card border border-white/10 group-hover:border-electric-blue/70 transition-all flex flex-col justify-between overflow-hidden shadow-lg group-hover:shadow-neon-blue">
                  
                  {/* Decorative corner glow */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-electric-blue/15 rounded-full blur-xl pointer-events-none" />

                  {/* Top info */}
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-midnight border border-electric-blue/40 flex items-center justify-center font-orbitron font-extrabold text-sm text-neon-blue">
                      #{item.id < 10 ? `0${item.id}` : item.id}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 px-2 py-0.5 rounded bg-white/5 border border-white/5">
                      {item.category}
                    </span>
                  </div>

                  {/* Middle content */}
                  <div className="my-auto">
                    <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-neon-blue transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 font-montserrat">
                      {item.short}
                    </p>
                  </div>

                  {/* Bottom Tap Indicator */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[11px] font-orbitron text-electric-blue/80">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-neon-blue" />
                      TAP TO REVEAL
                    </span>
                    <span className="text-gray-500 text-xs">↻</span>
                  </div>
                </div>

                {/* BACK FACE */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl p-6 bg-gradient-to-br from-midnight via-jet-card to-midnight-deep border-2 border-neon-purple shadow-neon-purple flex flex-col justify-between overflow-hidden">
                  
                  {/* Decorative background aura */}
                  <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-neon-purple/20 rounded-full blur-xl pointer-events-none" />

                  {/* Top info */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-orbitron font-bold text-neon-purple tracking-widest uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      UNLOCKED #{item.id}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 uppercase">
                      {item.category}
                    </span>
                  </div>

                  {/* Middle content: Revealed joke or compliment */}
                  <div className="my-auto">
                    <div className="text-xs font-orbitron font-semibold text-gray-400 mb-1">
                      {item.title}
                    </div>
                    <p className="text-sm sm:text-base font-montserrat font-medium text-white leading-relaxed text-glow-silver">
                      "{item.reveal}"
                    </p>
                  </div>

                  {/* Bottom flip-back hint */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] font-mono text-gray-400">
                    <span>Aarav Certified Fact</span>
                    <span className="text-neon-purple font-orbitron">TAP TO FLIP ↺</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
