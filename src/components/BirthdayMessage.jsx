import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Flame, Heart, Sparkles, Send, Check } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayConfig';
import { soundEngine } from '../utils/audioSynth';

export default function BirthdayMessage({ onTriggerConfetti }) {
  const { mainMessage, person, personalityTraits } = BIRTHDAY_DATA;
  const [toasted, setToasted] = useState(false);
  const [cheerCount, setCheerCount] = useState(22);

  const handleToast = () => {
    soundEngine.playFanfare();
    setToasted(true);
    setCheerCount(prev => prev + 1);
    onTriggerConfetti();
  };

  return (
    <section id="wishes" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      
      {/* Background Lighting Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neon-purple/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-electric-blue/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight/80 border border-neon-purple/40 text-neon-purple text-xs font-orbitron tracking-widest uppercase mb-4 shadow-neon-purple backdrop-blur-md"
        >
          <Quote className="w-3.5 h-3.5" />
          <span>Heartfelt Brotherhood Chronicle</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bebas tracking-wide text-white text-glow-purple mb-4"
        >
          {mainMessage.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 font-montserrat text-sm sm:text-base max-w-xl mx-auto"
        >
          From the squad to the main character. No filters, no holding back — just pure respect and love for the legend.
        </motion.p>
      </div>

      {/* Main Glassmorphic Message Showcase Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl p-8 sm:p-14 glass-panel border-2 border-electric-blue/40 shadow-neon-blue neon-border-animated"
      >
        {/* Floating Decorative Quotes */}
        <Quote className="absolute top-6 left-6 sm:top-10 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 text-electric-blue/20 -scale-x-100 pointer-events-none" />
        <Quote className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-12 h-12 sm:w-16 sm:h-16 text-neon-purple/20 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          
          {/* Greeting */}
          <div className="text-xl sm:text-2xl font-orbitron font-bold text-neon-blue mb-6 flex items-center gap-2">
            <span>{mainMessage.greeting}</span>
          </div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-6 text-base sm:text-xl font-montserrat font-normal text-gray-200 leading-relaxed">
            {mainMessage.body.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={i === mainMessage.body.length - 1 ? "text-2xl sm:text-3xl font-orbitron font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple pt-4 text-glow-blue" : ""}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Signoff */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-electric-blue to-neon-purple p-[2px]">
                <div className="w-full h-full bg-jet rounded-[10px] flex items-center justify-center font-orbitron font-black text-white">
                  AS
                </div>
              </div>
              <div>
                <div className="font-orbitron font-bold text-white text-base">
                  {person.fullName}
                </div>
                <div className="text-xs font-montserrat text-neon-blue">
                  {mainMessage.signoff}
                </div>
              </div>
            </div>

            {/* Interactive Toast / Cheer Action */}
            <button
              onClick={handleToast}
              className={`px-6 py-3 rounded-xl font-orbitron text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-2 transition-all duration-300 ${
                toasted 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' 
                  : 'bg-midnight hover:bg-electric-blue/20 border border-electric-blue/50 text-white hover:border-electric-blue shadow-neon-blue'
              }`}
            >
              {toasted ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>TOAST DELIVERED! ({cheerCount}) 🥂</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-neon-blue animate-spin" />
                  <span>RAISE A TOAST TO AARU 🥂 ({cheerCount})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Personality Traits Showcase Grid */}
      <div className="mt-20">
        <div className="text-center mb-10">
          <h3 className="text-2xl sm:text-3xl font-orbitron font-bold text-white tracking-wide">
            THE DNA OF A TRUE LEGEND
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 font-montserrat mt-1">
            Core attributes that make Aarav completely irreplaceable
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {personalityTraits.map((trait, idx) => (
            <motion.div
              key={trait.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="p-5 rounded-2xl glass-card border border-white/10 hover:border-electric-blue/60 transition-all hover:scale-105 group"
            >
              <div className="text-[10px] font-mono text-neon-blue uppercase tracking-widest mb-1">
                {trait.label}
              </div>
              <div className="text-lg font-orbitron font-bold text-white group-hover:text-neon-purple transition-colors mb-2">
                {trait.value}
              </div>
              <p className="text-xs text-gray-300 font-montserrat leading-relaxed">
                {trait.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
