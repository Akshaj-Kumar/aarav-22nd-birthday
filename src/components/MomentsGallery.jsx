import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Heart, Camera } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { weddingAudio } from '../utils/weddingAudio';

export default function MomentsGallery() {
  const { gallery } = WEDDING_DATA;
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (item) => {
    weddingAudio.playRoyalChime();
    setSelectedPhoto(item);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    weddingAudio.playRoyalChime();
    const curIdx = gallery.findIndex(p => p.id === selectedPhoto.id);
    const nextIdx = (curIdx + 1) % gallery.length;
    setSelectedPhoto(gallery[nextIdx]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    weddingAudio.playRoyalChime();
    const curIdx = gallery.findIndex(p => p.id === selectedPhoto.id);
    const prevIdx = (curIdx - 1 + gallery.length) % gallery.length;
    setSelectedPhoto(gallery[prevIdx]);
  };

  return (
    <section id="gallery" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-ivory text-neutral-800">
      
      {/* Background Lighting Accent */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header (Matches Screenshot 5) */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-cinzel tracking-[0.3em] text-[#A66E68] uppercase mb-4"
          >
            MOMENTS TO REMEMBER
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-heading text-burgundy tracking-tight mb-6"
          >
            A glimpse of the magic
          </motion.h2>

          {/* Golden Divider Line */}
          <div className="w-24 h-[1.5px] bg-[#C5A059] mx-auto mb-6" />

          <p className="text-base sm:text-lg font-montserrat text-neutral-600 max-w-xl mx-auto">
            Glimpses of cherished memories, sacred vows, and the laughter that led us here.
          </p>
        </div>

        {/* Gallery Grid (Replaces broken images with beautiful working high-res assets) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => handlePhotoClick(item)}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-[#EFE7DC] hover:border-gold/60"
            >
              {/* Photo Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  onError={(e) => {
                    // Graceful fallback to rich local SVG
                    if (e.target.src !== item.fallback) {
                      e.target.src = item.fallback;
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white" />

                {/* Top Tag Pill */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-gold/40 text-[10px] font-cinzel tracking-wider text-burgundy uppercase shadow-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded-full bg-black/60 text-white backdrop-blur-sm">
                  <Maximize2 className="w-4 h-4 text-gold-light" />
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                  <p className="text-base font-heading font-semibold text-gold-light">
                    {item.caption}
                  </p>
                </div>
              </div>

              {/* Bottom Card Title for Mobile / Normal view */}
              <div className="p-4 bg-white border-t border-[#F4EFEA] flex items-center justify-between">
                <span className="text-sm font-heading font-semibold text-burgundy">
                  {item.caption}
                </span>
                <Heart className="w-4 h-4 text-rose-400 group-hover:fill-rose-400 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full bg-burgundy-deep rounded-2xl border border-gold/50 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-gold-light hover:text-white border border-gold/30 transition-all"
                aria-label="Close Preview"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Previous / Next Navigation */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 text-gold-light hover:text-white border border-gold/30 hover:scale-110 transition-all"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 text-gold-light hover:text-white border border-gold/30 hover:scale-110 transition-all"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Full Image */}
              <div className="relative max-h-[70vh] w-full flex items-center justify-center bg-black/50 overflow-hidden">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  onError={(e) => {
                    e.target.src = selectedPhoto.fallback;
                  }}
                  className="max-h-[70vh] w-auto object-contain mx-auto"
                />
              </div>

              {/* Details Bottom Bar */}
              <div className="p-6 bg-burgundy-dark border-t border-gold/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-cinzel text-gold-light uppercase tracking-widest block mb-1">
                    {selectedPhoto.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading text-white">
                    {selectedPhoto.caption}
                  </h3>
                </div>

                <div className="text-xs font-montserrat text-gold-light/70">
                  {gallery.findIndex(p => p.id === selectedPhoto.id) + 1} of {gallery.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
