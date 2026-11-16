import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2, Sparkles, Send, Heart, Download, X } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';
import { weddingAudio } from '../utils/weddingAudio';

export default function RSVP() {
  const { couple } = WEDDING_DATA;
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    attending: 'attending',
    guestCount: '1 guest',
    note: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [savedData, setSavedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    weddingAudio.playRoyalChime();

    // Trigger golden and rose celebration confetti
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#E5C378', '#461927', '#E11D48', '#FAF7F2']
    });

    const submission = {
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toLocaleDateString()
    };

    // Save to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existing.push(submission);
      localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
    } catch {}

    setSavedData(submission);
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-ivory text-neutral-800">
      
      {/* Background Subtle Floral Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-rose-900/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl mx-auto">
        
        {/* Section Header (Matches Screenshot 11) */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm font-cinzel tracking-[0.3em] text-[#A66E68] uppercase mb-4"
          >
            KINDLY REPLY
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-heading text-burgundy tracking-tight mb-4"
          >
            Will you join us?
          </motion.h2>

          {/* Golden Divider Line */}
          <div className="w-24 h-[1.5px] bg-[#C5A059] mx-auto mb-6" />

          <p className="text-base sm:text-lg font-montserrat text-neutral-600">
            Please let us know if you'll be celebrating with us. We look forward to seeing you!
          </p>
        </div>

        {/* White RSVP Form Card (Matches Screenshot 12 & 14) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl p-6 sm:p-10 shadow-lg border border-[#EFE7DC]"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* 1. Full Name */}
            <div>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3.5 rounded-lg border border-neutral-300 focus:border-burgundy focus:ring-1 focus:ring-burgundy outline-none font-montserrat text-sm placeholder:text-neutral-400 bg-white"
              />
            </div>

            {/* 2. Email Address (Optional) */}
            <div>
              <input
                type="email"
                placeholder="Email address (optional)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3.5 rounded-lg border border-neutral-300 focus:border-burgundy focus:ring-1 focus:ring-burgundy outline-none font-montserrat text-sm placeholder:text-neutral-400 bg-white"
              />
            </div>

            {/* 3. Will you be attending? */}
            <div>
              <select
                value={formData.attending}
                onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                className="w-full px-4 py-3.5 rounded-lg border border-neutral-300 focus:border-burgundy focus:ring-1 focus:ring-burgundy outline-none font-montserrat text-sm text-neutral-700 bg-white"
              >
                <option value="attending">Yes! Attending with joy &amp; excitement 🥂</option>
                <option value="declining">Regretfully decline with heartfelt love ❤️</option>
              </select>
            </div>

            {/* 4. Number of Guests */}
            <div>
              <select
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                className="w-full px-4 py-3.5 rounded-lg border border-neutral-300 focus:border-burgundy focus:ring-1 focus:ring-burgundy outline-none font-montserrat text-sm text-neutral-700 bg-white"
              >
                <option value="1 guest">1 guest</option>
                <option value="2 guests">2 guests</option>
                <option value="3 guests">3 guests</option>
                <option value="4+ family members">4+ family members</option>
              </select>
            </div>

            {/* 5. Leave a note for the couple (optional) */}
            <div>
              <textarea
                rows={4}
                placeholder="Leave a note for the couple (optional)"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="w-full px-4 py-3.5 rounded-lg border border-neutral-300 focus:border-burgundy focus:ring-1 focus:ring-burgundy outline-none font-montserrat text-sm placeholder:text-neutral-400 bg-white resize-none"
              />
            </div>

            {/* 6. SEND RSVP BUTTON (Matches exact burgundy button in Screenshot 12 & 14) */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-lg bg-burgundy hover:bg-burgundy-light text-white font-cinzel font-semibold text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.99]"
              >
                SEND RSVP
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Confirmation Royal Pass Modal */}
      <AnimatePresence>
        {submitted && savedData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setSubmitted(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-md w-full bg-burgundy-dark rounded-3xl border-2 border-gold p-8 text-center text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSubmitted(false)}
                className="absolute top-4 right-4 p-2 text-gold-light hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-gold/20 border border-gold flex items-center justify-center mx-auto mb-4 text-gold-light">
                <CheckCircle2 className="w-8 h-8 text-gold-light" />
              </div>

              <span className="text-xs font-cinzel tracking-[0.25em] text-gold-light uppercase">
                RSVP CONFIRMED
              </span>

              <h3 className="text-3xl font-heading text-white mt-1 mb-2">
                Thank You, {savedData.fullName}!
              </h3>

              <p className="text-xs sm:text-sm font-montserrat text-neutral-300 mb-6 leading-relaxed">
                {savedData.attending === 'attending'
                  ? `Your presence (${savedData.guestCount}) will add joy to our auspicious celebration in Jaipur!`
                  : `Thank you for your warm thoughts. You will be missed in Jaipur!`}
              </p>

              {/* Royal Entry Badge */}
              <div className="bg-black/40 border border-gold/30 rounded-xl p-4 text-left font-mono text-xs text-gold-light mb-6 space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Guest:</span>
                  <span className="font-bold">{savedData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Celebration:</span>
                  <span>12–14 Feb 2027</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Destination:</span>
                  <span>Jaipur, Rajasthan</span>
                </div>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="w-full py-3 rounded-xl bg-gold hover:bg-gold-light text-burgundy-dark font-cinzel font-bold text-xs tracking-wider uppercase transition-colors"
              >
                Back to Wedding Invitation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
