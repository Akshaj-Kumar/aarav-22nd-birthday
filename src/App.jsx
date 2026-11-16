import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Terminal, Shield, ArrowUp } from 'lucide-react';

import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PhotoGallery from './components/PhotoGallery';
import BirthdayMessage from './components/BirthdayMessage';
import ReasonsGrid from './components/ReasonsGrid';
import BirthdayCake from './components/BirthdayCake';
import FriendshipQuiz from './components/FriendshipQuiz';
import Fireworks from './components/Fireworks';
import FinalSurprise from './components/FinalSurprise';
import MusicPlayer from './components/MusicPlayer';

import { BIRTHDAY_DATA } from './data/birthdayConfig';
import { soundEngine } from './utils/audioSynth';

export default function App() {
  const [introUnlocked, setIntroUnlocked] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Check if intro was already seen in this session
  useEffect(() => {
    const seen = sessionStorage.getItem('aarav_intro_unlocked');
    if (seen === 'true') {
      setIntroUnlocked(true);
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUnlockIntro = () => {
    setIntroUnlocked(true);
    sessionStorage.setItem('aarav_intro_unlocked', 'true');
  };

  const handleReplayIntro = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIntroUnlocked(false);
  };

  const handleToggleMusic = () => {
    const active = soundEngine.toggleMusic();
    setIsMusicPlaying(active);
  };

  const handleTriggerConfetti = () => {
    const count = 150;
    const defaults = {
      origin: { y: 0.6 },
      colors: ['#007BFF', '#00d2ff', '#8B5CF6', '#ec4899', '#ffffff', '#fbbf24']
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
  };

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-jet text-white selection:bg-neon-purple selection:text-white font-poppins">
      
      {/* 1. Cinematic Opening Intro Screen */}
      <AnimatePresence>
        {!introUnlocked && (
          <IntroScreen onUnlock={handleUnlockIntro} />
        )}
      </AnimatePresence>

      {/* Main Experience (Shown once unlocked or during visit) */}
      <div className={`transition-opacity duration-1000 ${introUnlocked ? 'opacity-100' : 'opacity-0'}`}>
        {/* Navigation Bar */}
        <Navbar
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
          onReplayIntro={handleReplayIntro}
          onTriggerConfetti={handleTriggerConfetti}
        />

        {/* 4. Main Hero Section */}
        <Hero onTriggerConfetti={handleTriggerConfetti} />

        {/* 5. Cinematic Photo Gallery */}
        <PhotoGallery />

        {/* 6. Birthday Message Section */}
        <BirthdayMessage onTriggerConfetti={handleTriggerConfetti} />

        {/* 7. 22 Legendary Reasons (Interactive 3D Flip Cards) */}
        <ReasonsGrid />

        {/* 8. Interactive Birthday Cake with 22 Candles */}
        <BirthdayCake onTriggerConfetti={handleTriggerConfetti} />

        {/* 9. Funny Friendship Quiz */}
        <FriendshipQuiz onTriggerConfetti={handleTriggerConfetti} />

        {/* 11. Epic Fireworks Experience */}
        <Fireworks onTriggerConfetti={handleTriggerConfetti} />

        {/* 12. Final Secret Surprise */}
        <FinalSurprise
          onReplayIntro={handleReplayIntro}
          onTriggerConfetti={handleTriggerConfetti}
        />

        {/* 10. Floating Futuristic Music Player */}
        <MusicPlayer
          isPlaying={isMusicPlaying}
          onTogglePlay={handleToggleMusic}
        />

        {/* Back to Top Floating Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              title="Return to Top"
              className="fixed bottom-6 left-6 z-40 p-3 rounded-full glass-panel border border-electric-blue/40 text-neon-blue hover:text-white hover:bg-electric-blue/20 transition-all shadow-neon-blue"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-midnight-deep text-center text-xs font-montserrat text-gray-400">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-neon-blue font-orbitron font-bold text-sm tracking-wider">
              <span>AARAV SHARMA (AARU)</span>
              <span>•</span>
              <span className="text-neon-purple">LEVEL 22 UNLOCKED</span>
            </div>

            <p className="max-w-md text-gray-400 text-xs">
              Engineered with cinematic precision, dark glassmorphism, and brotherhood love.
              Happy Birthday, Bro! 🔥
            </p>

            <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-2">
              <span>All rights reserved © 2026</span>
              <span>•</span>
              <button
                onClick={handleReplayIntro}
                className="hover:text-neon-blue transition-colors underline decoration-dotted"
              >
                Replay Opening
              </button>
              <span>•</span>
              <span className="text-gray-400">15 November Celebration</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
