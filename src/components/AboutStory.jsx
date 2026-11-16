import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

export default function AboutStory() {
  const { story } = WEDDING_DATA;

  return (
    <section id="story" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-ivory text-neutral-800">
      
      {/* Background Subtle Floral Motif */}
      <div className="absolute top-10 right-4 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-4 w-72 h-72 bg-rose-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        
        {/* TOP PART (Replicates exact layout from Screenshot 1) */}
        <div className="text-center mb-16">
          
          {/* Badge: "A LITTLE ABOUT US" */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-cinzel tracking-[0.3em] text-[#A66E68] uppercase mb-4"
          >
            {story.badge}
          </motion.p>

          {/* Heading: "Two hearts, one beautiful journey" */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-heading text-burgundy tracking-tight leading-tight mb-6"
          >
            {story.title}
          </motion.h2>

          {/* Golden Divider Line (Matches Screenshot 1) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-24 h-[1.5px] bg-[#C5A059] mx-auto mb-8 origin-center"
          />

          {/* Text Paragraph 1 */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-base sm:text-xl font-montserrat font-normal text-neutral-700 leading-relaxed max-w-2xl mx-auto"
          >
            {story.p1}
          </motion.p>
        </div>

        {/* IMAGE WITH SAND-COLORED OFFSET RECTANGLE (Matches Screenshot 1 & 4) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-xl mx-auto mb-20 px-2"
        >
          {/* Offset Sand Tint Frame Accent on Right Side */}
          <div className="absolute top-6 -right-3 sm:-right-5 w-full h-full bg-[#EFE7DC] rounded-none z-0" />

          {/* Real Photo Card */}
          <div className="relative z-10 overflow-hidden shadow-xl bg-white">
            <img
              src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"
              alt="Aarav and Meera Wedding Bouquet"
              loading="lazy"
              onError={(e) => {
                e.target.src = '/images/wedding-flowers.svg';
              }}
              className="w-full aspect-[4/3] object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>

        {/* BOTTOM PART: "Our forever begins here" (Replicates exact layout from Screenshot 4) */}
        <div className="text-center max-w-2xl mx-auto space-y-6">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-heading text-burgundy tracking-tight"
          >
            {story.p2Header}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg font-montserrat text-neutral-700 leading-relaxed"
          >
            {story.p2}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="text-base sm:text-lg font-montserrat text-neutral-700 leading-relaxed font-medium"
          >
            {story.invitationNote}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
