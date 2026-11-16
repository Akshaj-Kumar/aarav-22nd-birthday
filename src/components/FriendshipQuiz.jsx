import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles, Award } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayConfig';
import { soundEngine } from '../utils/audioSynth';

export default function FriendshipQuiz({ onTriggerConfetti }) {
  const questions = BIRTHDAY_DATA.quiz;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (optionIndex, isCorrect) => {
    if (showFeedback || isCompleted) return;

    soundEngine.playClick();
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optionIndex
    }));
    setShowFeedback(true);

    if (isCorrect) {
      soundEngine.playQuizSuccess();
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    soundEngine.playClick();
    setShowFeedback(false);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsCompleted(true);
      soundEngine.playFanfare();
      onTriggerConfetti();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#007BFF', '#00d2ff', '#8B5CF6', '#ffffff']
      });
    }
  };

  const handleRestart = () => {
    soundEngine.playClick();
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setIsCompleted(false);
    setScore(0);
  };

  return (
    <section id="quiz" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[450px] bg-electric-blue/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-neon-purple/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-midnight/90 border border-electric-blue/40 text-neon-blue text-xs font-orbitron tracking-widest uppercase mb-4 shadow-neon-blue"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Interactive Brotherhood Trivia</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-bebas tracking-wide text-white text-glow-blue mb-3"
        >
          HOW WELL DO YOU KNOW THIS LEGEND? 😂
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-gray-300 font-montserrat text-sm sm:text-base"
        >
          Put your friendship to the ultimate test. Answer 6 classified questions about Aarav's iconic habits!
        </motion.p>
      </div>

      {/* Main Quiz Box */}
      <motion.div
        layout
        className="relative rounded-3xl glass-panel p-6 sm:p-10 border border-electric-blue/30 shadow-2xl backdrop-blur-xl"
      >
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
            >
              {/* Progress and Question Counter */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-electric-blue/20 text-neon-blue font-orbitron text-xs font-semibold">
                    QUESTION {currentIdx + 1} OF {questions.length}
                  </span>
                </div>
                <div className="text-xs font-mono text-gray-400">
                  Current Score: <span className="text-neon-purple font-bold font-orbitron">{score}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-jet-card rounded-full overflow-hidden mb-8">
                <motion.div
                  className="h-full bg-gradient-to-r from-electric-blue to-neon-purple"
                  initial={{ width: `${(currentIdx / questions.length) * 100}%` }}
                  animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-xl sm:text-2xl font-orbitron font-semibold text-white mb-8">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3.5 mb-8">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx;
                  let cardStyle = "bg-jet-card/80 border-white/10 hover:border-electric-blue/50 hover:bg-midnight/70";

                  if (showFeedback) {
                    if (option.correct) {
                      cardStyle = "bg-green-500/20 border-green-500/80 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
                    } else if (isSelected && !option.correct) {
                      cardStyle = "bg-red-500/20 border-red-500/80";
                    } else {
                      cardStyle = "bg-jet-card/40 border-white/5 opacity-50";
                    }
                  }

                  return (
                    <motion.button
                      key={optIdx}
                      whileHover={!showFeedback ? { scale: 1.01 } : {}}
                      whileTap={!showFeedback ? { scale: 0.99 } : {}}
                      onClick={() => handleSelectOption(optIdx, option.correct)}
                      disabled={showFeedback}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-orbitron text-xs font-bold text-gray-300 shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="font-montserrat text-sm sm:text-base text-gray-200">
                          {option.text}
                        </span>
                      </div>

                      {showFeedback && (
                        <div className="shrink-0">
                          {option.correct ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-red-400" />
                          ) : null}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Feedback Message */}
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-midnight border border-electric-blue/40 mb-6 text-sm font-montserrat text-neon-blue flex items-center gap-3 shadow-neon-blue"
                >
                  <Sparkles className="w-5 h-5 shrink-0 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>
                    {currentQ.options[selectedAnswers[currentIdx]]?.feedback || "Legendary answer!"}
                  </span>
                </motion.div>
              )}

              {/* Next Question Action Button */}
              {showFeedback && (
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-electric-blue to-neon-purple text-white font-orbitron font-semibold text-xs tracking-wider uppercase hover:shadow-neon-blue transition-all"
                  >
                    {currentIdx < questions.length - 1 ? "NEXT QUESTION →" : "SEE FINAL RESULTS 🏆"}
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* Results Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-6"
            >
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-electric-blue via-neon-purple to-yellow-400 p-[2px] mb-6 shadow-neon-glow">
                <div className="w-full h-full bg-jet rounded-[22px] flex items-center justify-center">
                  <Award className="w-10 h-10 text-yellow-400 animate-pulse" />
                </div>
              </div>

              <h3 className="text-3xl sm:text-5xl font-bebas tracking-wide text-white text-glow-blue mb-3">
                CONGRATULATIONS! YOU KNOW THE LEGEND! 😂
              </h3>

              <div className="inline-block px-5 py-2 rounded-full bg-midnight/90 border border-yellow-400/50 text-yellow-400 font-orbitron text-sm sm:text-base font-bold mb-6 shadow-neon-blue">
                OFFICIAL SCORE: {score} / {questions.length} PERFECT BROTHERHOOD RATING
              </div>

              <p className="max-w-lg mx-auto text-gray-300 font-montserrat text-sm sm:text-base leading-relaxed mb-8">
                {score >= 5
                  ? "You have successfully passed the Aaru Encyclopedia test with flying colors! You are officially verified as his ride-or-die brother."
                  : "Close enough! Even if Aarav disputed your answers, he'd still force you to buy him a victory burger anyway!"}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-midnight border border-white/20 hover:border-neon-purple text-gray-200 hover:text-white font-orbitron text-xs sm:text-sm tracking-wider uppercase transition-all shadow-md"
                >
                  <RotateCcw className="w-4 h-4 text-neon-purple" />
                  <span>RETAKE QUIZ</span>
                </button>

                <a
                  href="#cake"
                  onClick={(e) => {
                    e.preventDefault();
                    soundEngine.playClick();
                    document.querySelector('#cake')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-electric-blue to-neon-purple text-white font-orbitron text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-neon-blue hover:scale-105 transition-all"
                >
                  BLOW CANDLES ON CAKE 🎂
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
