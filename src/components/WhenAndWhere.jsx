import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Sparkles, Navigation } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { weddingAudio } from '../utils/weddingAudio';

export default function WhenAndWhere() {
  const { details } = WEDDING_DATA;

  const handleOpenMap = () => {
    weddingAudio.playRoyalChime();
    window.open(details.where.mapUrl, '_blank');
  };

  return (
    <section id="details" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-burgundy-dark text-white overflow-hidden">
      
      {/* Background Palace Illumination */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#230811] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Decorative Ornate Border Inset */}
      <div className="absolute inset-4 sm:inset-10 border border-gold/20 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        
        {/* Tag: "JOIN US" (Matches Screenshot 8) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs sm:text-sm font-cinzel tracking-[0.3em] text-gold-light uppercase mb-4"
        >
          {details.badge}
        </motion.p>

        {/* Heading: "The when & where" (Matches Screenshot 8) */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-heading text-gold-light tracking-tight mb-6"
        >
          {details.title}
        </motion.h2>

        {/* Subtitle (Matches Screenshot 8 & 13) */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg font-montserrat text-neutral-300 max-w-lg mx-auto mb-14"
        >
          {details.subtitle}
        </motion.p>

        {/* Divider 1 */}
        <div className="w-full h-[1px] bg-gold/25 mb-14" />

        {/* SECTION 1: WHEN (Matches Screenshot 13) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3 mb-14"
        >
          <h3 className="text-3xl sm:text-4xl font-heading text-gold-light tracking-wide">
            When
          </h3>
          <p className="text-base sm:text-xl font-montserrat text-neutral-200 font-medium">
            {details.when.dates}
          </p>
          <p className="text-xs sm:text-sm font-montserrat text-neutral-400">
            {details.when.note}
          </p>
        </motion.div>

        {/* Divider 2 */}
        <div className="w-full h-[1px] bg-gold/25 mb-14" />

        {/* SECTION 2: WHERE (Matches Screenshot 13) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3 mb-14"
        >
          <h3 className="text-3xl sm:text-4xl font-heading text-gold-light tracking-wide">
            Where
          </h3>
          <p className="text-base sm:text-xl font-montserrat text-neutral-200 font-medium">
            {details.where.venue}
          </p>
          <p className="text-xs sm:text-sm font-montserrat text-neutral-400">
            {details.where.location}
          </p>

          {/* Interactive Get Directions on Google Maps */}
          <div className="pt-4">
            <button
              onClick={handleOpenMap}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/40 hover:border-gold-light bg-black/30 hover:bg-gold/20 text-gold-light hover:text-white text-xs font-cinzel tracking-wider uppercase transition-all shadow-md group"
            >
              <Navigation className="w-3.5 h-3.5 text-gold-light group-hover:scale-110 transition-transform" />
              <span>Get Directions on Google Maps</span>
            </button>
          </div>
        </motion.div>

        {/* Divider 3 */}
        <div className="w-full h-[1px] bg-gold/25 mb-14" />

        {/* SECTION 3: DRESS CODE (Matches Screenshot 11 & 13) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3 mb-8"
        >
          <h3 className="text-3xl sm:text-4xl font-heading text-gold-light tracking-wide">
            Dress code
          </h3>
          <p className="text-base sm:text-xl font-montserrat text-neutral-200 font-medium">
            {details.dressCode.title}
          </p>
          <p className="text-xs sm:text-sm font-montserrat text-neutral-400">
            {details.dressCode.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
