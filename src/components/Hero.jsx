import React, { useState } from 'react';
import { 
  Play, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  ArrowRight,
  Puzzle,
  RotateCcw
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function Hero({ onStartGame, onExploreVocab, onHowToPlay }) {
  // Interactive live sentence preview state: ICH + LERNE + DEUTSCH
  const [selectedWords, setSelectedWords] = useState([]);
  const previewWords = [
    { id: 'p1', text: 'ICH', de: 'Ich', color: 'red' },
    { id: 'p2', text: 'LERNE', de: 'lerne', color: 'gold' },
    { id: 'p3', text: 'DEUTSCH', de: 'Deutsch', color: 'black' },
  ];

  const handlePreviewCardClick = (word) => {
    soundManager.playClick();
    if (selectedWords.find(w => w.id === word.id)) {
      setSelectedWords(selectedWords.filter(w => w.id !== word.id));
    } else {
      const nextWords = [...selectedWords, word];
      setSelectedWords(nextWords);
      if (nextWords.length === 3) {
        soundManager.playSuccess();
        soundManager.speakGerman('Ich lerne Deutsch.');
      }
    }
  };

  const handleResetPreview = () => {
    soundManager.playClick();
    setSelectedWords([]);
  };

  const handleSpeakPreview = () => {
    soundManager.speakGerman('Ich lerne Deutsch.');
  };

  const isComplete = selectedWords.length === 3;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-deBlack to-[#1a1a1a] text-white py-12 md:py-20 border-b border-deBlack-border">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-deRed/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-deGold/10 blur-3xl pointer-events-none"></div>
      
      {/* Subtle Pattern Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Physical Display Board Homage Banner */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm text-gray-200 backdrop-blur-sm shadow-sm">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-deGold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-deGold"></span>
            </span>
            <span>College German Expo Showcase • Based on Physical Vocabulary Pockets</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Tagline, Description & CTA Buttons */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2">
                {/* German Flag Badge */}
                <div className="flex h-5 w-8 rounded overflow-hidden shadow-sm border border-white/20">
                  <div className="w-1/3 bg-deBlack"></div>
                  <div className="w-1/3 bg-deRed"></div>
                  <div className="w-1/3 bg-deGold"></div>
                </div>
                <span className="text-deGold font-bold text-xs uppercase tracking-widest">
                  German Language Expo Interactive Game
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-tight leading-none text-white">
                DEUTSCH <span className="text-deRed">DECODE</span>
              </h1>

              <p className="text-lg sm:text-xl font-semibold text-deGold tracking-wide">
                Learn • Decode • Discover
              </p>
            </div>

            <div className="space-y-2 max-w-2xl mx-auto lg:mx-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-100">
                Ready to crack the German code?
              </h2>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Learn new words, arrange sentences, and discover how German works — one puzzle at a time! 
                Pick words from our colourful vocabulary pockets and assemble them like puzzle pieces.
              </p>
            </div>

            {/* 3 Main Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onStartGame();
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-deRed hover:bg-deRed-dark text-white font-bold text-base shadow-pocket-red hover:shadow-none hover:translate-y-1 transition-all active:translate-y-1.5"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>Start the Game</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onExploreVocab();
                }}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-deGold hover:bg-deGold-dark text-deBlack font-bold text-base shadow-pocket-gold hover:shadow-none hover:translate-y-1 transition-all active:translate-y-1.5"
              >
                <BookOpen className="w-5 h-5" />
                <span>Explore Vocabulary</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onHowToPlay();
                }}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 transition-all hover:border-white/40"
              >
                <HelpCircle className="w-5 h-5 text-gray-300" />
                <span>How to Play</span>
              </button>
            </div>

            {/* Quick Stats Banner */}
            <div className="pt-4 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-deRed"></span>
                <span><strong>91</strong> Curated Words</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-deGold"></span>
                <span><strong>15+</strong> Sentence Challenges</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span><strong>3</strong> Interactive Modes</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Word Cards Arrangement Demonstration */}
          <div className="lg:col-span-5">
            <div className="bg-deBlack-card rounded-2xl border-2 border-deBlack-border p-6 shadow-expo-board relative">
              
              {/* Header representing the physical display board */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-deBlack-border">
                <div className="flex items-center gap-2">
                  <Puzzle className="w-5 h-5 text-deGold" />
                  <span className="text-xs uppercase font-bold tracking-wider text-gray-300">
                    Live Sentence Decoder Demo
                  </span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-deRed/20 text-deRed-light font-bold">
                  Try Clicking Words!
                </span>
              </div>

              {/* Instructions */}
              <p className="text-xs text-gray-400 mb-3 text-center sm:text-left">
                Click the German word cards below to assemble the sentence:
              </p>

              {/* Word Cards Bank (Red and Gold Pocket theme) */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5 p-3 rounded-xl bg-deBlack/60 border border-white/5 min-h-[64px]">
                {previewWords.map((word) => {
                  const isSelected = selectedWords.some(w => w.id === word.id);
                  return (
                    <button
                      key={word.id}
                      onClick={() => handlePreviewCardClick(word)}
                      disabled={isSelected}
                      className={`px-4 py-2.5 rounded-lg font-bold text-sm tracking-wide transition-all ${
                        isSelected 
                          ? 'opacity-30 scale-95 cursor-not-allowed bg-gray-800 text-gray-500 border border-transparent' 
                          : word.color === 'red'
                            ? 'bg-deRed text-white shadow-pocket-red hover:-translate-y-1 active:translate-y-0.5'
                            : word.color === 'gold'
                              ? 'bg-deGold text-deBlack shadow-pocket-gold hover:-translate-y-1 active:translate-y-0.5'
                              : 'bg-white text-deBlack border border-gray-300 shadow-md hover:-translate-y-1 active:translate-y-0.5'
                      }`}
                    >
                      {word.text}
                    </button>
                  );
                })}

                {selectedWords.length > 0 && (
                  <button
                    onClick={handleResetPreview}
                    className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                    title="Reset cards"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sentence Decoder Assembly Slot */}
              <div className={`p-4 rounded-xl border-2 transition-all ${
                isComplete 
                  ? 'border-green-500 bg-green-950/20 shadow-lg' 
                  : 'border-dashed border-gray-700 bg-deBlack/40'
              }`}>
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center justify-between">
                  <span>Decoded German Sentence</span>
                  {isComplete && (
                    <span className="flex items-center gap-1 text-green-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Solved!
                    </span>
                  )}
                </div>

                <div className="min-h-[44px] flex items-center gap-2 flex-wrap mb-2">
                  {selectedWords.length === 0 ? (
                    <span className="text-gray-500 text-xs italic">
                      (Slot cards: ICH + LERNE + DEUTSCH)
                    </span>
                  ) : (
                    selectedWords.map((word, idx) => (
                      <span 
                        key={word.id}
                        className="inline-flex items-center px-3 py-1 rounded bg-white text-deBlack font-bold text-sm shadow-sm"
                      >
                        {idx === 0 ? 'Ich' : idx === 1 ? 'lerne' : 'Deutsch.'}
                      </span>
                    ))
                  )}
                </div>

                {/* English Decoded Meaning Card */}
                <div className="pt-3 border-t border-white/10 mt-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 block">
                        English Meaning:
                      </span>
                      <p className="text-sm font-semibold text-deGold">
                        {isComplete ? "I am learning German." : "Arrange the cards above to reveal..."}
                      </p>
                    </div>

                    {isComplete && (
                      <button
                        onClick={handleSpeakPreview}
                        className="p-2 rounded-lg bg-deRed/20 hover:bg-deRed text-deRed-light hover:text-white transition-colors"
                        title="Pronounce in German"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Physical Pocket Board Visual Accent */}
              <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-gray-400 border-t border-deBlack-border">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded bg-deRed inline-block"></span> Red Pockets = Verbs & People
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded bg-deGold inline-block"></span> Gold Pockets = Food & Adjectives
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* German Tricolor bottom stripe */}
      <div className="absolute bottom-0 left-0 right-0 flex h-1.5 w-full">
        <div className="w-1/3 bg-deBlack"></div>
        <div className="w-1/3 bg-deRed"></div>
        <div className="w-1/3 bg-deGold"></div>
      </div>
    </section>
  );
}
