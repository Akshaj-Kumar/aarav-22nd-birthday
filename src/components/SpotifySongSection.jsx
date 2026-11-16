import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, ExternalLink, Heart, Sparkles, Disc, Play, Volume2 } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { weddingAudio } from '../utils/weddingAudio';

export default function SpotifySongSection() {
  const { spotifySong, lyricsTumMile } = WEDDING_DATA;
  const [isPlayingSynth, setIsPlayingSynth] = useState(false);

  const handlePlayMelody = () => {
    weddingAudio.playRoyalChime();
    weddingAudio.toggle();
  };

  return (
    <section id="our-song" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#F4EFEA] text-neutral-800 overflow-hidden">
      
      {/* Background Subtle Golden Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gold/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-gold/40 text-[#A66E68] text-xs font-cinzel tracking-[0.3em] uppercase mb-4 shadow-sm"
          >
            <Music className="w-3.5 h-3.5 text-gold" />
            <span>ROMANTIC SOUNDTRACK</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-heading text-burgundy tracking-tight mb-4"
          >
            Our Love Anthem
          </motion.h2>

          <div className="w-24 h-[1.5px] bg-[#C5A059] mx-auto mb-4" />

          <p className="text-base sm:text-lg font-montserrat text-neutral-600 max-w-xl mx-auto">
            Every great love story has a melody that defines it. This is the soundtrack to our forever.
          </p>
        </div>

        {/* Main Luxury Music Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-[#3D1421] via-burgundy to-[#260B14] rounded-3xl p-6 sm:p-10 border-2 border-gold/40 shadow-2xl text-white overflow-hidden"
        >
          {/* Ornate corner lines */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold/60" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold/60" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold/60" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold/60" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side: Spinning Vinyl & Cover Art */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-6 group">
                
                {/* Glowing Aura */}
                <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl animate-pulse" />

                {/* Vinyl Record */}
                <div 
                  className="relative w-full h-full rounded-full bg-black border-4 border-gold shadow-2xl flex items-center justify-center animate-spin"
                  style={{ animationDuration: '10s' }}
                >
                  {/* Vinyl Grooves */}
                  <div className="absolute inset-3 rounded-full border border-neutral-700/60" />
                  <div className="absolute inset-6 rounded-full border border-neutral-700/60" />
                  <div className="absolute inset-9 rounded-full border border-neutral-700/60" />

                  {/* Center Cover Art */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gold">
                    <img
                      src={spotifySong.cover}
                      alt={spotifySong.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating Heart Badge */}
                <div className="absolute -bottom-2 -right-2 p-2.5 rounded-full bg-rose-600 text-white shadow-lg border border-white/20">
                  <Heart className="w-4 h-4 fill-white" />
                </div>
              </div>

              <span className="text-[10px] font-cinzel tracking-[0.25em] text-gold-light uppercase">
                SPOTIFY EXCLUSIVE SELECTION
              </span>
              <h3 className="text-2xl font-heading text-white font-bold mt-1">
                {spotifySong.title}
              </h3>
              <p className="text-xs font-montserrat text-gold-light/80 mt-0.5">
                {spotifySong.artist}
              </p>
            </div>

            {/* Right side: Spotify Official Interactive Embed + Lyrics */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              
              {/* Official Spotify Interactive Player Iframe */}
              <div className="w-full rounded-2xl overflow-hidden bg-black/40 border border-gold/30 shadow-lg p-1">
                <iframe
                  style={{ borderRadius: '14px' }}
                  src={spotifySong.embedUrl}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Embed: Tum Mile - Love Reprise"
                />
              </div>

              {/* Romantic Lyric Snippets */}
              <div className="p-4 rounded-xl bg-black/25 border border-gold/20">
                <span className="text-[10px] font-cinzel tracking-widest text-gold uppercase block mb-1.5">
                  Romantic Lyric Stanza
                </span>
                <p className="text-sm sm:text-base font-montserrat italic text-neutral-200 leading-relaxed">
                  "Tu hi dua meri, aakhri aas tu... Tum mile toh jadoo chha gaya, tum mile toh jeena aa gaya..."
                </p>
              </div>

              {/* Actions & Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={spotifySong.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-cinzel font-bold text-xs tracking-wider uppercase transition-all shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Track on Spotify</span>
                </a>

                <button
                  onClick={handlePlayMelody}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold/20 hover:bg-gold/30 border border-gold/50 text-gold-light text-xs font-cinzel tracking-wider uppercase transition-all"
                >
                  <Volume2 className="w-3.5 h-3.5 text-gold-light" />
                  <span>Toggle Background Music</span>
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
