import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Lock, Unlock, Sparkles, Heart, RotateCcw, Share2, Flame, Award } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayConfig';
import { soundEngine } from '../utils/audioSynth';

export default function FinalSurprise({ onReplayIntro, onTriggerConfetti }) {
  const [unlocked, setUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const { finalSurprise, person } = BIRTHDAY_DATA;

  const handleUnlock = () => {
    soundEngine.playBoxUnlock();
    setUnlocked(true);
    onTriggerConfetti();

    // Massive cinematic fireworks volley
    const duration = 3000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        return clearInterval(interval);
      }
      confetti({
        startVelocity: 35,
        spread: 360,
        ticks: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2
        },
        colors: ['#007BFF', '#00d2ff', '#8B5CF6', '#ec4899', '#ffffff', '#fbbf24', '#C0C0C0']
      });
    }, 250);
  };

  const handleShare = () => {
    soundEngine.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="surprise" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      
      {/* Background Deep Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/15 rounded-full blur-[180px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!unlocked ? (
          /* Locked State */
          <motion.div
            key="locked"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            viewport={{ once: true }}
            className="relative rounded-3xl p-10 sm:p-16 glass-panel border border-electric-blue/40 shadow-neon-blue max-w-2xl mx-auto"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-midnight border border-electric-blue/50 flex items-center justify-center text-neon-blue mb-6 shadow-neon-blue">
              <Lock className="w-8 h-8 animate-pulse" />
            </div>

            <h3 className="text-3xl sm:text-5xl font-bebas tracking-wide text-white text-glow-blue mb-4">
              {finalSurprise.teaser}
            </h3>

            <p className="text-gray-300 font-montserrat text-sm sm:text-base max-w-md mx-auto mb-8">
              A private, high-security brotherhood message has been sealed in this digital vault for Aarav.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUnlock}
              className="relative group px-9 py-4 rounded-xl font-orbitron font-bold text-sm sm:text-base text-white tracking-widest uppercase overflow-hidden shadow-neon-purple transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-electric-blue to-neon-purple bg-[length:200%_auto] animate-gradient" />
              <div className="absolute inset-[1.5px] rounded-[10px] bg-jet/70 group-hover:bg-jet/40 transition-colors" />

              <span className="relative z-10 flex items-center justify-center gap-3 text-glow-purple">
                <Unlock className="w-4 h-4 text-neon-purple animate-bounce" />
                {finalSurprise.buttonText}
              </span>
            </motion.button>
          </motion.div>
        ) : (
          /* Unlocked Message State */
          <motion.div
            key="unlocked"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-3xl p-8 sm:p-14 glass-panel border-2 border-neon-purple/50 shadow-neon-purple neon-border-animated text-left"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-electric-blue/20 border border-electric-blue/40 text-neon-blue text-xs font-orbitron tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CONFIDENTIAL • LEVEL 22 FINALE</span>
              </div>
              <span className="text-xs font-mono text-gray-400">
                15 NOVEMBER 2026
              </span>
            </div>

            {/* Letter Salutation */}
            <h4 className="text-2xl sm:text-3xl font-orbitron font-extrabold text-white text-glow-blue mb-6">
              {finalSurprise.salutation}
            </h4>

            {/* Letter Content */}
            <div className="space-y-5 text-base sm:text-lg font-montserrat text-gray-200 leading-relaxed mb-8">
              {finalSurprise.paragraphs.map((p, idx) => (
                <p key={idx} className="opacity-95">
                  {p}
                </p>
              ))}
            </div>

            {/* Final Cheering Banner */}
            <div className="my-8 p-6 rounded-2xl bg-midnight/90 border border-electric-blue/40 text-center shadow-neon-blue">
              <div className="text-3xl sm:text-5xl font-bebas tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-white to-neon-purple mb-2">
                {finalSurprise.birthdayCheer}
              </div>
              <div className="text-lg sm:text-2xl font-orbitron font-black text-neon-purple tracking-widest text-glow-purple uppercase">
                {finalSurprise.motto}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => {
                  soundEngine.playFanfare();
                  onReplayIntro();
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-midnight border border-white/20 hover:border-neon-blue text-gray-200 hover:text-white font-orbitron text-xs tracking-wider uppercase transition-all shadow-md"
              >
                <RotateCcw className="w-4 h-4 text-neon-blue" />
                <span>REPLAY INTRO EXPERIENCE</span>
              </button>

              <button
                onClick={handleShare}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-jet-card border border-electric-blue/40 hover:border-electric-blue text-xs font-orbitron text-neon-blue hover:text-white transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? "LINK COPIED TO CLIPBOARD! ✨" : "SHARE BIRTHDAY LINK"}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
