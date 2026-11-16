import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Camera, Eye } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayConfig';
import { soundEngine } from '../utils/audioSynth';

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const galleryItems = BIRTHDAY_DATA.gallery;

  const categories = ['All', 'Celebration', 'Cars', 'Gaming', 'Squad', 'Vibes'];

  const filteredItems = activeFilter === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const handleNext = () => {
    if (!selectedImage) return;
    soundEngine.playCardFlip();
    const currentIndex = galleryItems.findIndex(i => i.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setSelectedImage(galleryItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    soundEngine.playCardFlip();
    const currentIndex = galleryItems.findIndex(i => i.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setSelectedImage(galleryItems[prevIndex]);
  };

  return (
    <section id="gallery" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Background Section Lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-electric-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-neon-purple/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight border border-electric-blue/40 text-neon-blue text-xs font-orbitron tracking-widest uppercase mb-4"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Cinematic Visual Chronicle</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bebas tracking-wide text-white text-glow-blue mb-4"
        >
          THE LEGEND IN ACTION
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 font-montserrat text-sm sm:text-base max-w-xl mx-auto"
        >
          A tribute to Aarav's adrenaline-fueled passions, brotherhood milestones, and the unstoppable 22-year journey.
        </motion.p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundEngine.playClick();
                setActiveFilter(cat);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-orbitron tracking-wider transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-electric-blue to-neon-purple text-white shadow-neon-blue'
                  : 'bg-jet-card/80 border border-white/10 text-gray-400 hover:text-white hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry-Style Interactive Gallery Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => {
                soundEngine.playCardFlip();
                setSelectedImage(item);
              }}
              className="group relative rounded-2xl overflow-hidden glass-card cursor-pointer border border-white/10 hover:border-electric-blue/70 transition-all duration-500 shadow-xl hover:shadow-neon-blue"
            >
              {/* Aspect Ratio Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-midnight-deep">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => {
                    // Seamless automatic fallback to local high-res SVG
                    if (e.target.src !== item.fallback) {
                      e.target.src = item.fallback;
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-jet via-jet/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-md bg-jet/80 border border-electric-blue/40 text-[10px] font-orbitron tracking-wider text-neon-blue uppercase backdrop-blur-md">
                    {item.tag}
                  </span>
                </div>

                {/* Hover Expand Icon */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full bg-jet/80 text-white backdrop-blur-md">
                  <Maximize2 className="w-4 h-4 text-neon-blue" />
                </div>

                {/* Bottom Information */}
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 transform transition-transform duration-300">
                  <span className="text-[11px] font-mono text-neon-purple uppercase tracking-widest block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-orbitron font-bold text-white group-hover:text-neon-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-montserrat mt-1 line-clamp-2 opacity-90">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            {/* Modal Dialog Content */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full bg-jet-card rounded-2xl border border-electric-blue/50 overflow-hidden shadow-2xl shadow-electric-blue/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-jet/80 border border-white/20 text-gray-300 hover:text-white hover:border-electric-blue transition-all"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5 text-neon-blue" />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-jet/80 border border-white/20 text-white hover:border-electric-blue hover:scale-110 transition-all"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6 text-neon-blue" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-jet/80 border border-white/20 text-white hover:border-electric-blue hover:scale-110 transition-all"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6 text-neon-blue" />
              </button>

              {/* Lightbox Media */}
              <div className="relative max-h-[65vh] w-full flex items-center justify-center bg-black/60 overflow-hidden">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  onError={(e) => {
                    if (e.target.src !== selectedImage.fallback) {
                      e.target.src = selectedImage.fallback;
                    }
                  }}
                  className="max-h-[65vh] w-auto object-contain mx-auto"
                />
              </div>

              {/* Lightbox Details Bar */}
              <div className="p-6 bg-gradient-to-t from-jet via-jet-card to-midnight/80 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-neon-purple uppercase">
                      {selectedImage.category}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-xs font-orbitron text-neon-blue uppercase">
                      {selectedImage.tag}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-orbitron font-bold text-white">
                    {selectedImage.title}
                  </h3>
                  <p className="text-sm text-gray-300 font-montserrat mt-1 max-w-2xl">
                    {selectedImage.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                  <span>Photo {galleryItems.findIndex(i => i.id === selectedImage.id) + 1} of {galleryItems.length}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
