import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Send, MessageCircle } from 'lucide-react';
import { weddingAudio } from '../utils/weddingAudio';

export default function BlessingsWall() {
  const [blessings, setBlessings] = useState([
    {
      id: 1,
      sender: "Rohan & Ananya Sharma",
      relation: "Cousins",
      message: "May your sacred pheras in Jaipur ignite a lifetime of boundless laughter, adventurous road trips, and eternal romance. Can't wait for Sangeet!",
      likes: 24,
      liked: false,
    },
    {
      id: 2,
      sender: "Kabir Malhotra",
      relation: "College Squad",
      message: "From Aarav secretly planning college surprises for Meera to witnessing you two tie the knot — dreams truly came full circle. Ready to tear up the dance floor!",
      likes: 18,
      liked: false,
    },
    {
      id: 3,
      sender: "Dadi & Dadu Kapoor",
      relation: "Grandparents",
      message: "Sada sukhi raho mere bachho. May Lord Ganesha bestow good health, prosperous harmony, and deep understanding upon your sweet home.",
      likes: 42,
      liked: false,
    }
  ]);

  const [authorName, setAuthorName] = useState('');
  const [relationText, setRelationText] = useState('');
  const [newBlessing, setNewBlessing] = useState('');

  const handleAddBlessing = (e) => {
    e.preventDefault();
    if (!authorName.trim() || !newBlessing.trim()) return;

    weddingAudio.playRoyalChime();

    const created = {
      id: Date.now(),
      sender: authorName.trim(),
      relation: relationText.trim() || 'Well Wisher',
      message: newBlessing.trim(),
      likes: 1,
      liked: true,
    };

    setBlessings([created, ...blessings]);
    setAuthorName('');
    setRelationText('');
    setNewBlessing('');
  };

  const handleLike = (id) => {
    weddingAudio.playRoyalChime();
    setBlessings(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          likes: item.liked ? item.likes - 1 : item.likes + 1,
          liked: !item.liked
        };
      }
      return item;
    }));
  };

  return (
    <section id="blessings" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#F4EFEA] text-neutral-800">
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs sm:text-sm font-cinzel tracking-[0.3em] text-[#A66E68] uppercase mb-4">
            SACRED WISHES
          </p>

          <h2 className="text-4xl sm:text-6xl font-heading text-burgundy tracking-tight mb-4">
            Bless the couple
          </h2>

          <div className="w-24 h-[1.5px] bg-[#C5A059] mx-auto mb-6" />

          <p className="text-base sm:text-lg font-montserrat text-neutral-600 max-w-xl mx-auto">
            Leave a cherished memory, joyful prayer, or blessing for Aarav &amp; Meera as they begin their sacred journey.
          </p>
        </div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EFE7DC] shadow-sm mb-14"
        >
          <form onSubmit={handleAddBlessing} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Your Name (e.g. Priya uncle & aunt)"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-burgundy focus:ring-1 focus:ring-burgundy outline-none font-montserrat text-sm"
              />

              <input
                type="text"
                placeholder="Relationship (e.g. Friends, Family, Colleague)"
                value={relationText}
                onChange={(e) => setRelationText(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-burgundy focus:ring-1 focus:ring-burgundy outline-none font-montserrat text-sm"
              />
            </div>

            <textarea
              rows={3}
              required
              placeholder="Write your heartfelt blessing or memory for Aarav & Meera..."
              value={newBlessing}
              onChange={(e) => setNewBlessing(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-burgundy focus:ring-1 focus:ring-burgundy outline-none font-montserrat text-sm resize-none"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-burgundy hover:bg-burgundy-light text-white font-cinzel text-xs tracking-wider uppercase transition-all shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Your Blessing</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Blessings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blessings.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-6 border border-[#EFE7DC] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-base font-heading font-semibold text-burgundy">
                      {item.sender}
                    </h4>
                    <span className="text-[11px] font-montserrat text-neutral-400">
                      {item.relation}
                    </span>
                  </div>
                  <Sparkles className="w-4 h-4 text-gold" />
                </div>

                <p className="text-sm font-montserrat text-neutral-700 leading-relaxed italic">
                  "{item.message}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
                <span>Jaipur Vivah 2027</span>
                <button
                  onClick={() => handleLike(item.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    item.liked ? 'text-rose-600 font-semibold' : 'text-neutral-400 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${item.liked ? 'fill-rose-600' : ''}`} />
                  <span>{item.likes}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
