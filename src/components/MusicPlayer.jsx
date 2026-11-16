import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, Disc3, Info, X, ChevronUp, ChevronDown } from 'lucide-react';
import { soundEngine } from '../utils/audioSynth';

export default function MusicPlayer({ isPlaying, onTogglePlay }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [audioSource, setAudioSource] = useState('synth'); // 'file' or 'synth'
  const [showHelper, setShowHelper] = useState(false);
  const [audioError, setAudioError] = useState(false);
  
  const audioRef = useRef(null);

  // Sync internal state with external toggle
  const togglePlayback = () => {
    soundEngine.playClick();
    onTogglePlay();
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    soundEngine.playClick();
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume || 0.8;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  return (
    <>
      {/* Hidden audio element for optional local MP3 file */}
      <audio
        ref={audioRef}
        src="/audio/birthday-beats.mp3"
        loop
        preload="none"
        onError={() => {
          // File not found or unsupported; seamlessly fallback to synth
          setAudioSource('synth');
          setAudioError(true);
        }}
        onPlay={() => setAudioSource('file')}
      />

      {/* Floating Futuristic Music Player (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="mb-3 w-80 glass-panel rounded-2xl p-5 border border-electric-blue/40 shadow-2xl shadow-black/80 backdrop-blur-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Disc3 className={`w-4 h-4 text-neon-blue ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                  <span className="font-orbitron text-xs font-bold text-white tracking-wider">
                    CYBER BEATS ENGINE
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setShowHelper(!showHelper)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    title="Audio file instructions"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Helper Notice Popup */}
              {showHelper && (
                <div className="p-3 mb-3 rounded-lg bg-midnight-deep/90 border border-electric-blue/30 text-[11px] font-montserrat text-gray-300">
                  <p className="font-semibold text-neon-blue mb-1">Custom MP3 Audio Support:</p>
                  <p>
                    Drop your favorite song into <code className="text-white bg-jet px-1 rounded">public/audio/birthday-beats.mp3</code>. 
                    If no file is present, our built-in <strong>Sci-Fi Web Audio Synthesizer</strong> plays seamlessly!
                  </p>
                </div>
              )}

              {/* Track Info */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-electric-blue to-neon-purple p-[1.5px] shrink-0 shadow-neon-blue">
                  <div className="w-full h-full bg-jet rounded-[10px] flex items-center justify-center">
                    <Music className={`w-5 h-5 ${isPlaying ? 'text-neon-blue animate-bounce' : 'text-gray-400'}`} />
                  </div>
                </div>

                <div className="overflow-hidden">
                  <h4 className="font-orbitron text-xs font-bold text-white truncate text-glow-blue">
                    Aarav's 22nd Birthday Anthem
                  </h4>
                  <p className="text-[11px] font-montserrat text-gray-400 truncate mt-0.5">
                    {isPlaying 
                      ? (audioSource === 'file' ? 'Playing from MP3' : 'Live Synthwave Engine • 124 BPM')
                      : 'Audio paused • Ready to celebrate'}
                  </p>
                </div>
              </div>

              {/* Animated Equalizer Visualizer */}
              <div className="flex items-center justify-center gap-1 h-6 bg-jet/60 rounded-lg px-4 mb-4 border border-white/5">
                {[...Array(16)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-1 rounded-full transition-all duration-150 ${isPlaying ? 'bg-gradient-to-t from-electric-blue to-neon-purple' : 'bg-white/10'}`}
                    style={{
                      height: isPlaying ? `${Math.max(4, ((i * 7 + 13) % 18) + 4)}px` : '4px',
                      animation: isPlaying ? `eqBounce 0.8s infinite alternate ease-in-out ${i * 0.06}s` : 'none'
                    }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between pt-1">
                {/* Play/Pause Main Button */}
                <button
                  onClick={togglePlayback}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-electric-blue to-neon-purple text-white font-orbitron text-xs font-bold tracking-wider uppercase shadow-neon-blue hover:scale-105 active:scale-95 transition-all"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>PLAY BEATS</span>
                    </>
                  )}
                </button>

                {/* Volume & Mute */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-red-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-neon-blue" />
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-neon-blue"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Pill Trigger */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center rounded-full glass-panel border border-electric-blue/40 shadow-neon-blue p-1.5 pr-4 cursor-pointer gap-3 group"
          onClick={() => {
            soundEngine.playClick();
            setIsExpanded(!isExpanded);
          }}
        >
          {/* Circular Play / Music Disc Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlayback();
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              isPlaying
                ? 'bg-gradient-to-tr from-electric-blue to-neon-purple text-white shadow-neon-blue'
                : 'bg-midnight text-gray-300 group-hover:text-neon-blue'
            }`}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Equalizer Wave / Text */}
          <div className="flex flex-col">
            <span className="font-orbitron font-semibold text-[11px] text-white flex items-center gap-1.5">
              <span>{isPlaying ? 'PARTY BEATS ACTIVE' : 'MUSIC PLAYER'}</span>
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 bg-neon-blue eq-bar" />
                  <span className="w-0.5 bg-neon-purple eq-bar" />
                  <span className="w-0.5 bg-neon-blue eq-bar" />
                </div>
              )}
            </span>
            <span className="text-[9px] font-montserrat text-gray-400">
              {isPlaying ? 'Tap to view controls' : 'Click to start anthem'}
            </span>
          </div>

          <div className="text-gray-400 group-hover:text-white transition-colors">
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </div>
        </motion.div>
      </div>
    </>
  );
}
