import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Music, Heart } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { weddingAudio } from '../utils/weddingAudio';

export default function InvitationEnvelope({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const { couple, spotifySong } = WEDDING_DATA;

  const handleBreakSeal = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Play royal temple bell / chime sound
    weddingAudio.playRoyalChime();

    // Start "Tum Mile - Love Reprise" immediately!
    setTimeout(() => {
      weddingAudio.play();
    }, 300);

    // Rose and gold confetti petal explosion
    setTimeout(() => {
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E5C378', '#E11D48', '#FDA4AF', '#FDFBF7', '#EAB308']
      });
    }, 450);

    // Unveil website smoothly
    setTimeout(() => {
      onOpen();
    }, 1800);
  };

  const handleSkip = () => {
    weddingAudio.play();
    onOpen();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-burgundy-deep overflow-hidden px-4"
    >
      {/* Background Palace Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      {/* Ambient Lighting Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-900/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Rose Petals in Envelope Screen */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-tr from-rose-600 to-pink-300 opacity-60"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 12 + 8}px`,
              height: `${Math.random() * 16 + 10}px`,
              borderRadius: '60% 40% 60% 40%',
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `floatSlow ${5 + (i % 4)}s ease-in-out infinite alternate ${i * 0.3}s`
            }}
          />
        ))}
      </div>

      {/* Center Royal Envelope Container */}
      <div className="relative z-10 max-w-lg w-full text-center">
        
        {/* Top Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-burgundy/80 border border-gold/40 text-gold-light text-xs font-cinzel tracking-[0.25em] uppercase mb-8 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-metallic" />
          <span>Shubh Vivah • Royal Invitation</span>
        </motion.div>

        {/* 3D Royal Invitation Envelope Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          className="relative bg-gradient-to-b from-[#3D1421] via-burgundy to-[#260B14] p-8 sm:p-12 rounded-3xl border-2 border-gold/50 shadow-2xl shadow-black/80 overflow-hidden cursor-pointer group"
          onClick={handleBreakSeal}
        >
          {/* Ornate Gold Filigree Corners */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-gold/60" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-gold/60" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-gold/60" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-gold/60" />

          {/* Golden Ribbon across middle */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none" />

          {/* Subtitle */}
          <p className="text-xs sm:text-sm font-cinzel tracking-[0.3em] text-gold-light/90 uppercase mb-3">
            {couple.subtitle}
          </p>

          {/* Names */}
          <h1 className="text-4xl sm:text-6xl font-heading text-white tracking-wide mb-3">
            {couple.groomFirst} <span className="font-script text-gold-light text-5xl sm:text-7xl font-normal">&amp;</span> {couple.brideFirst}
          </h1>

          <p className="text-xs sm:text-sm font-montserrat tracking-[0.25em] text-gold-light/80 uppercase mb-8">
            {couple.weddingDatesShort} <span className="text-gold mx-1">•</span> {couple.weddingLocationShort}
          </p>

          {/* Wax Seal Centerpiece */}
          <motion.div
            animate={isOpening ? { scale: [1, 1.3, 0], rotate: 45, opacity: 0 } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto my-4 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center"
          >
            {/* Outer Golden Glow Pulse */}
            <div className="absolute inset-0 rounded-full bg-gold/20 animate-ping opacity-60 pointer-events-none" />

            {/* Wax Seal Circle */}
            <div className="w-full h-full rounded-full wax-seal border-4 border-gold-metallic/80 flex flex-col items-center justify-center text-center shadow-2xl transition-transform duration-300 group-hover:scale-105">
              <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-widest text-gold-light drop-shadow-md">
                {couple.monogram}
              </span>
              <span className="text-[9px] font-cinzel tracking-[0.2em] text-gold/90 uppercase mt-0.5">
                VIVAH
              </span>
            </div>
          </motion.div>

          {/* Call to action label */}
          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isOpening}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light text-burgundy-dark font-cinzel font-bold text-xs sm:text-sm tracking-[0.18em] uppercase shadow-lg shadow-gold/20 transition-all"
            >
              <Music className="w-4 h-4 text-burgundy-dark animate-pulse" />
              <span>{isOpening ? "Opening Royal Invitation..." : "Break Seal & Play Tum Mile 🎵"}</span>
            </motion.button>

            <p className="text-[11px] font-montserrat text-gold-light/70 mt-3">
              Plays our signature love anthem: <em>"Tum Mile - Love Reprise"</em>
            </p>
          </div>
        </motion.div>

        {/* Quick Skip Button */}
        <button
          onClick={handleSkip}
          className="mt-6 text-xs font-montserrat text-gold-light/60 hover:text-gold-light underline tracking-wider transition-colors"
        >
          Skip envelope &amp; play song directly →
        </button>
      </div>
    </motion.div>
  );
}
