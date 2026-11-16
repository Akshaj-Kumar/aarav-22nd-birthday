import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import InvitationEnvelope from './components/InvitationEnvelope';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutStory from './components/AboutStory';
import SpotifySongSection from './components/SpotifySongSection';
import Festivities from './components/Festivities';
import WhenAndWhere from './components/WhenAndWhere';
import MomentsGallery from './components/MomentsGallery';
import RSVP from './components/RSVP';
import BlessingsWall from './components/BlessingsWall';
import MusicPlayer from './components/MusicPlayer';
import FallingPetals from './components/FallingPetals';
import Footer from './components/Footer';
import { weddingAudio } from './utils/weddingAudio';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [petalsEnabled, setPetalsEnabled] = useState(true);

  // Sync with audio engine state changes and auto-start on first gesture
  useEffect(() => {
    weddingAudio.autoStartOnFirstGesture();
    const unsubscribe = weddingAudio.subscribe(({ isPlaying }) => {
      setIsMusicPlaying(isPlaying);
    });
    return unsubscribe;
  }, []);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    weddingAudio.play();
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpen(false);
  };

  const handleToggleMusic = () => {
    weddingAudio.toggle();
  };

  const handleTogglePetals = () => {
    setPetalsEnabled(!petalsEnabled);
  };

  return (
    <div className="relative min-h-screen bg-ivory text-neutral-800 font-montserrat selection:bg-gold/30 selection:text-burgundy">
      
      {/* 1. Interactive Royal Wax Seal Envelope Opening (Unveils wedding on click) */}
      <AnimatePresence>
        {!isEnvelopeOpen && (
          <InvitationEnvelope onOpen={handleOpenEnvelope} />
        )}
      </AnimatePresence>

      {/* 2. Ambient Falling Rose and Marigold Petals */}
      <FallingPetals enabled={petalsEnabled} />

      {/* 3. Luxury Navigation Bar */}
      <Navbar
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onReopenEnvelope={handleReopenEnvelope}
        petalsEnabled={petalsEnabled}
        onTogglePetals={handleTogglePetals}
      />

      {/* 4. Main Royal Hero Section */}
      <Hero onExplore={() => {
        document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* 5. A Little About Us / Two Hearts One Beautiful Journey */}
      <AboutStory />

      {/* 5.5. Official Spotify Love Song Section ("Tum Mile - Love Reprise") */}
      <SpotifySongSection />

      {/* 6. Wedding Festivities (Haldi, Mehendi, Sangeet, The Wedding) */}
      <Festivities />

      {/* 7. The When & Where / Royal Heritage Palace, Jaipur */}
      <WhenAndWhere />

      {/* 8. Moments to Remember / A Glimpse of the Magic (Gallery) */}
      <MomentsGallery />

      {/* 9. Kindly Reply / RSVP Form */}
      <RSVP />

      {/* 10. Sacred Blessings & Love Guestbook */}
      <BlessingsWall />

      {/* 11. Luxury Floating "Din Shagna Da" Player */}
      <MusicPlayer
        isPlaying={isMusicPlaying}
        onToggle={handleToggleMusic}
      />

      {/* 12. Royal Wedding Footer */}
      <Footer />
    </div>
  );
}
