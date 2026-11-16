import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { weddingAudio } from '../utils/weddingAudio';

export default function Footer() {
  const { couple } = WEDDING_DATA;

  const scrollToTop = () => {
    weddingAudio.playRoyalChime();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-burgundy-deep text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-gold/25 overflow-hidden">
      
      {/* Background Subtle Warmth */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        
        {/* Monogram Badge */}
        <div className="w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center font-cinzel text-gold-light text-sm mb-6">
          {couple.monogram}
        </div>

        {/* Names (Matches Screenshot 14) */}
        <h2 className="text-4xl sm:text-6xl font-heading text-white tracking-wide mb-3">
          {couple.groomFirst}{' '}
          <span className="font-script text-gold-light text-5xl sm:text-7xl font-normal">
            &amp;
          </span>{' '}
          {couple.brideFirst}
        </h2>

        {/* Subtitle (Matches Screenshot 14) */}
        <p className="text-xs sm:text-sm font-cinzel tracking-[0.25em] text-gold-light/90 uppercase mb-6">
          WITH LOVE, AND A LIFETIME TO GO · FEBRUARY 2027
        </p>

        {/* Wedding Hashtag */}
        <div className="inline-block px-5 py-1.5 rounded-full bg-black/30 border border-gold/30 text-xs font-montserrat text-gold-light mb-10">
          {couple.hashtag}
        </div>

        {/* Divider */}
        <div className="w-24 h-[1px] bg-gold/25 mx-auto mb-8" />

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/30 text-gold-light hover:text-white hover:border-gold hover:bg-gold/10 text-xs font-cinzel tracking-wider uppercase transition-all shadow-sm"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>Back to Top</span>
        </button>

        <p className="text-[11px] font-montserrat text-neutral-400 mt-8">
          The Royal Heritage Palace, Jaipur, Rajasthan, India
        </p>
      </div>
    </footer>
  );
}
