import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, Sparkles, RotateCcw } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayConfig';
import { soundEngine } from '../utils/audioSynth';

export default function Navbar({ isMusicPlaying, onToggleMusic, onReplayIntro, onTriggerConfetti }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = BIRTHDAY_DATA.navLinks;

  const handleNavClick = (href) => {
    setIsOpen(false);
    soundEngine.playClick();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'py-3 bg-jet/80 backdrop-blur-md border-b border-electric-blue/20 shadow-lg shadow-black/50' : 'py-5 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <a 
          href="#hero" 
          onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-electric-blue to-neon-purple p-[1.5px] shadow-neon-blue">
            <div className="w-full h-full bg-jet rounded-[7px] flex items-center justify-center font-orbitron font-extrabold text-sm text-neon-blue group-hover:text-white transition-colors">
              22
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron font-bold text-sm tracking-wider text-white text-glow-blue flex items-center gap-1.5">
              {BIRTHDAY_DATA.person.nickname.toUpperCase()}
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-electric-blue/20 text-neon-blue border border-electric-blue/40 font-mono">
                LEGEND
              </span>
            </span>
            <span className="text-[10px] font-montserrat tracking-widest text-gray-400">
              15 NOV • CELEBRATION
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-midnight/60 border border-white/10 backdrop-blur-md shadow-glass">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="px-3 py-1 text-xs font-montserrat font-medium text-gray-300 hover:text-neon-blue hover:bg-white/5 rounded-full transition-all duration-200"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Confetti Quick Blast */}
          <button
            onClick={() => {
              soundEngine.playFanfare();
              onTriggerConfetti();
            }}
            title="Pop Confetti"
            className="p-2 rounded-lg bg-midnight/70 border border-electric-blue/30 text-neon-blue hover:text-white hover:border-electric-blue hover:bg-electric-blue/20 transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-neon-blue" />
          </button>

          {/* Music Toggle with Visual Equalizer */}
          <button
            onClick={onToggleMusic}
            title={isMusicPlaying ? "Pause Audio" : "Play Birthday Beats"}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-orbitron transition-all ${isMusicPlaying ? 'bg-electric-blue/20 border-electric-blue text-neon-blue shadow-neon-blue' : 'bg-midnight/70 border-white/10 text-gray-400 hover:text-white'}`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-neon-blue animate-pulse" />
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-neon-blue eq-bar" />
                  <span className="w-0.5 bg-neon-purple eq-bar" />
                  <span className="w-0.5 bg-neon-blue eq-bar" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-gray-400" />
                <span className="hidden sm:inline text-[11px]">AUDIO OFF</span>
              </>
            )}
          </button>

          {/* Replay Intro Screen */}
          <button
            onClick={onReplayIntro}
            title="Replay Cinematic Intro"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-midnight/70 border border-white/10 text-xs font-montserrat text-gray-300 hover:text-white hover:border-neon-purple/50 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-neon-purple" />
            <span className="text-[11px]">REPLAY</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg bg-midnight border border-white/10 text-gray-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-5 h-5 text-neon-blue" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-jet-card/95 border-b border-electric-blue/30 backdrop-blur-xl px-6 py-5 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="flex items-center justify-between text-left py-2 px-3 text-sm font-orbitron tracking-wide text-gray-200 hover:text-neon-blue hover:bg-midnight/60 rounded-lg transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-electric-blue">→</span>
                </button>
              ))}

              <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onReplayIntro();
                  }}
                  className="flex items-center gap-2 text-xs font-montserrat text-gray-300 hover:text-neon-purple"
                >
                  <RotateCcw className="w-4 h-4 text-neon-purple" />
                  <span>Replay Opening Surprise</span>
                </button>

                <button
                  onClick={() => {
                    soundEngine.playFanfare();
                    onTriggerConfetti();
                  }}
                  className="px-3 py-1 rounded bg-electric-blue/20 text-neon-blue text-xs font-orbitron border border-electric-blue/40"
                >
                  Party Blast 🎉
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
