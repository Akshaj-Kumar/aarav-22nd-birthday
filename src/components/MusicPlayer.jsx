import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Music, Volume2, VolumeX, BookOpen, X, Sparkles, ExternalLink } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { weddingAudio } from '../utils/weddingAudio';

export default function MusicPlayer({ isPlaying, onToggle }) {
  const [showLyricsModal, setShowLyricsModal] = useState(false);
  const { couple, spotifySong, lyricsTumMile } = WEDDING_DATA;

  return (
    <>
      {/* Floating Bottom Music Bar */}
      <div className="fixed bottom-5 left-5 z-40 max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-2.5 sm:p-3 rounded-full bg-burgundy-dark/95 border border-gold/40 shadow-2xl backdrop-blur-md text-white"
        >
          {/* Rotating Vinyl Disc */}
          <div 
            onClick={onToggle}
            className={`relative w-11 h-11 rounded-full bg-black border-2 border-gold flex items-center justify-center cursor-pointer transition-transform ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
            title={isPlaying ? "Pause Tum Mile" : "Play Tum Mile - Love Reprise"}
          >
            {/* Center Label */}
            <div className="w-5 h-5 rounded-full overflow-hidden border border-gold">
              <img
                src={spotifySong.cover}
                alt="Track Cover"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Track Info */}
          <div className="flex flex-col pr-2 cursor-pointer" onClick={() => setShowLyricsModal(true)}>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-cinzel font-semibold text-gold-light tracking-wide truncate max-w-[130px] sm:max-w-[160px]">
                {spotifySong.title}
              </span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 bg-gold-light eq-bar" />
                  <span className="w-0.5 bg-gold eq-bar" />
                  <span className="w-0.5 bg-gold-light eq-bar" />
                </div>
              )}
            </div>
            <span className="text-[10px] font-montserrat text-neutral-400">
              Spotify Track • Pritam &amp; Javed Ali
            </span>
          </div>

          {/* Action Buttons: Play/Pause & Lyrics */}
          <div className="flex items-center gap-1">
            <button
              onClick={onToggle}
              className="p-2 rounded-full bg-gold hover:bg-gold-light text-burgundy-dark transition-colors shadow-sm"
              aria-label={isPlaying ? "Pause Music" : "Play Music"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-burgundy-dark" /> : <Play className="w-3.5 h-3.5 fill-burgundy-dark ml-0.5" />}
            </button>

            <button
              onClick={() => setShowLyricsModal(true)}
              className="p-2 rounded-full text-gold-light hover:text-white hover:bg-white/10 transition-colors"
              title="View Song Lyrics & Spotify Embed"
            >
              <BookOpen className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Tum Mile Song & Lyrics Modal */}
      <AnimatePresence>
        {showLyricsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setShowLyricsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-lg w-full bg-burgundy-dark rounded-3xl border border-gold p-6 sm:p-8 text-center text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLyricsModal(false)}
                className="absolute top-4 right-4 p-2 text-gold-light hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold flex items-center justify-center mx-auto mb-3 text-gold-light">
                <Music className="w-6 h-6" />
              </div>

              <span className="text-xs font-cinzel tracking-[0.25em] text-gold-light uppercase">
                AARAV &amp; MEERA'S WEDDING SONG
              </span>

              <h3 className="text-2xl sm:text-3xl font-heading text-white mt-1 mb-1">
                Tum Mile - Love Reprise
              </h3>
              <p className="text-xs font-montserrat text-gold-light/80 mb-5">
                Pritam, Javed Ali • Signature Romance
              </p>

              {/* Spotify Player Embed */}
              <div className="rounded-xl overflow-hidden mb-6 border border-gold/30">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={spotifySong.embedUrl}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Embed: Tum Mile - Love Reprise"
                />
              </div>

              {/* Romantic Lyrics */}
              <div className="space-y-3 text-sm font-montserrat text-neutral-200 italic leading-relaxed py-4 border-y border-gold/20">
                {lyricsTumMile.map((l, i) => (
                  <p key={i} className={i === lyricsTumMile.length - 1 ? "text-gold-light font-semibold not-italic" : ""}>
                    {l.text}
                  </p>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-center gap-3">
                <a
                  href={spotifySong.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1DB954] text-black font-cinzel font-bold text-xs uppercase tracking-wider hover:bg-[#1ed760] transition-colors shadow-md"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Track on Spotify</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
