import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles, ChevronRight, Check } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { weddingAudio } from '../utils/weddingAudio';

export default function Festivities() {
  const { festivities } = WEDDING_DATA;
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addedCalendar, setAddedCalendar] = useState({});

  const handleCardClick = (item) => {
    weddingAudio.playRoyalChime();
    setSelectedEvent(selectedEvent?.id === item.id ? null : item);
  };

  const handleAddToCalendar = (e, item) => {
    e.stopPropagation();
    weddingAudio.playRoyalChime();
    
    // Construct Google Calendar link
    const title = encodeURIComponent(`Aarav & Meera Wedding - ${item.name}`);
    const details = encodeURIComponent(`${item.description}\nVenue: ${item.venue}, The Royal Heritage Palace, Jaipur\nAttire: ${item.attire}`);
    const location = encodeURIComponent(`${item.venue}, The Royal Heritage Palace, Jaipur, Rajasthan, India`);
    
    // Date formats (approximate ISO dates)
    let startDate = "20270212T043000Z";
    let endDate = "20270212T073000Z";
    if (item.id === "mehendi") {
      startDate = "20270212T103000Z";
      endDate = "20270212T143000Z";
    } else if (item.id === "sangeet") {
      startDate = "20270213T133000Z";
      endDate = "20270213T183000Z";
    } else if (item.id === "wedding") {
      startDate = "20270214T123000Z";
      endDate = "20270214T193000Z";
    }

    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDate}/${endDate}`;
    window.open(gCalUrl, '_blank');

    setAddedCalendar(prev => ({ ...prev, [item.id]: true }));
  };

  // Render the exact icons from screenshots
  const renderIcon = (id) => {
    switch (id) {
      case 'haldi':
        return (
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl shadow-inner mb-3">
            🌼
          </div>
        );
      case 'mehendi':
        return (
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl shadow-inner mb-3">
            🌿
          </div>
        );
      case 'sangeet':
        return (
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl shadow-inner mb-3">
            🎶
          </div>
        );
      case 'wedding':
        return (
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-2xl shadow-inner mb-3">
            💍
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="festivities" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#F4EFEA] text-neutral-800">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        
        {/* Section Header (Matches Screenshot 3) */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-cinzel tracking-[0.3em] text-[#A66E68] uppercase mb-4"
          >
            SAVE THE DATES
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-heading text-burgundy tracking-tight mb-4"
          >
            Wedding festivities
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg font-montserrat text-neutral-700 max-w-xl mx-auto"
          >
            A little celebration, a lot of love. Here's what we have planned.
          </motion.p>
        </div>

        {/* 4 Interactive Festivity Cards (Matches Screenshots 3, 5, 6) */}
        <div className="space-y-6">
          {festivities.map((item, index) => {
            const isExpanded = selectedEvent?.id === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleCardClick(item)}
                className={`bg-white rounded-2xl p-6 sm:p-8 transition-all duration-300 border cursor-pointer ${
                  isExpanded
                    ? 'border-gold shadow-xl scale-[1.01]'
                    : 'border-[#EFE7DC] hover:border-gold/50 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  
                  {/* Event Icon (Matches Screenshot 3 & 6) */}
                  {renderIcon(item.id)}

                  {/* Title (e.g., Haldi, Mehendi, Sangeet, The Wedding) */}
                  <h3 className="text-2xl sm:text-3xl font-heading text-burgundy font-semibold tracking-wide mb-2">
                    {item.name}
                  </h3>

                  {/* Date (e.g., 12 February 2027) */}
                  <p className="text-sm sm:text-base font-montserrat text-neutral-600 mb-1">
                    {item.date}
                  </p>

                  {/* Time & Venue (e.g., 10:00 AM · Garden Courtyard) */}
                  <p className="text-xs sm:text-sm font-montserrat text-neutral-500 tracking-wide">
                    {item.time} · {item.venue}
                  </p>

                  {/* Tap to expand prompt */}
                  <div className="mt-3 text-[11px] font-cinzel text-gold tracking-wider flex items-center gap-1">
                    <span>{isExpanded ? 'Hide Details ▲' : 'View Ceremony Details ▼'}</span>
                  </div>
                </div>

                {/* Expanded Details Panel */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 pt-6 border-t border-[#EFE7DC] overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                        <div>
                          <span className="text-[10px] font-cinzel tracking-widest uppercase text-burgundy block mb-1">
                            Ceremony Highlights
                          </span>
                          <p className="text-xs sm:text-sm font-montserrat text-neutral-700 leading-relaxed">
                            {item.description}
                          </p>
                        </div>

                        <div>
                          <span className="text-[10px] font-cinzel tracking-widest uppercase text-burgundy block mb-1">
                            Attire Suggestion
                          </span>
                          <p className="text-xs sm:text-sm font-montserrat text-neutral-700 leading-relaxed font-medium">
                            👗 {item.attire}
                          </p>
                        </div>
                      </div>

                      {/* Add to Calendar Action */}
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-100">
                        <span className="text-xs font-montserrat text-neutral-500">
                          📍 The Royal Heritage Palace, Jaipur
                        </span>

                        <button
                          onClick={(e) => handleAddToCalendar(e, item)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-burgundy hover:bg-burgundy-light text-white text-xs font-cinzel tracking-wider uppercase transition-colors"
                        >
                          {addedCalendar[item.id] ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-gold-light" />
                              <span>Added to Calendar</span>
                            </>
                          ) : (
                            <>
                              <Calendar className="w-3.5 h-3.5 text-gold-light" />
                              <span>Save to Google Calendar</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
