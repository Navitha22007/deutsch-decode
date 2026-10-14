import React from 'react';
import { 
  BookOpen, 
  Puzzle, 
  CheckCircle2, 
  Trophy, 
  ArrowRight, 
  Sparkles,
  QrCode,
  Layers
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function HowToPlay({ onStartPlaying, onExploreVocab, onOpenQr }) {
  const steps = [
    {
      step: '1',
      title: 'LEARN',
      germanTitle: 'LERNEN',
      color: 'bg-deBlack text-white',
      badgeColor: 'bg-white/20 text-white',
      accentColor: 'border-deBlack',
      icon: BookOpen,
      desc: 'Explore the vocabulary cards on our physical expo display chart or website vocabulary explorer. Listen to the German pronunciation and review their English meanings.'
    },
    {
      step: '2',
      title: 'DECODE',
      germanTitle: 'DEKODIEREN',
      color: 'bg-deRed text-white',
      badgeColor: 'bg-white/20 text-white',
      accentColor: 'border-deRed',
      icon: Puzzle,
      desc: 'Read the English sentence and arrange the scrambled German word cards in the correct order. Click on words to place them into the sentence builder.'
    },
    {
      step: '3',
      title: 'CHECK',
      germanTitle: 'ÜBERPRÜFEN',
      color: 'bg-deGold text-deBlack',
      badgeColor: 'bg-deBlack/20 text-deBlack',
      accentColor: 'border-deGold',
      icon: CheckCircle2,
      desc: 'Submit your answer to check your sentence. Get instant celebratory feedback, audio pronunciation, and helpful grammar tips explaining German sentence structure.'
    },
    {
      step: '4',
      title: 'DISCOVER',
      germanTitle: 'ENTDECKEN',
      color: 'bg-gradient-to-r from-deBlack to-gray-800 text-white',
      badgeColor: 'bg-deGold text-deBlack font-bold',
      accentColor: 'border-gray-800',
      icon: Trophy,
      desc: 'Complete all challenges to crack the German code! Earn your DEUTSCH DECODE CHAMPION badge and see your final accuracy score.'
    }
  ];

  return (
    <section id="how-to-play-section" className="py-12 md:py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deRed/10 border border-deRed/20 text-deRed text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Expo Visitor Guide</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-deBlack tracking-tight">
            How to Play DEUTSCH DECODE
          </h2>
          <p className="mt-2 text-base sm:text-lg text-gray-600">
            Four simple steps to crack the German code — from physical paper pockets to digital victory!
          </p>
        </div>

        {/* 4 Interactive Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className={`bg-gray-50 rounded-2xl p-6 border-2 ${s.accentColor} shadow-card-elevated flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1.5 transition-all`}
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center font-display font-black text-lg shadow-sm`}>
                      {s.step}
                    </span>
                    <div className="p-2.5 rounded-xl bg-white border border-gray-200 shadow-sm text-gray-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="mb-2">
                    <h3 className="text-xl font-display font-black text-deBlack tracking-tight">
                      {s.title}
                    </h3>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {s.germanTitle}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {/* Bottom Step Indicator */}
                <div className="mt-6 pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs font-bold text-gray-400">
                  <span>Step 0{s.step}</span>
                  {idx < 3 && <ArrowRight className="w-4 h-4 text-gray-400 hidden lg:block" />}
                </div>

              </div>
            );
          })}
        </div>

        {/* Physical Board & QR Code Connection Box */}
        <div className="bg-deBlack rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl mb-12">
          {/* Subtle flag accent */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-deRed/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            <div className="md:col-span-8 space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-deGold text-deBlack text-xs font-black uppercase tracking-wider">
                Physical Display Chart Connection
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                Visiting our Expo Booth in Person?
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Take a look at our large black display board. Each colourful paper pocket holds German word cards categorized by themes (Red for Verbs & People, Gold for Food & Descriptors). 
                Scan the QR code on the board with your smartphone to play on your own device, or play right here on this expo laptop!
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenQr();
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-deRed hover:bg-deRed-dark text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View Expo QR Code</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onExploreVocab();
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Review 91 Pocket Words</span>
                </button>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-deGold/20 flex items-center justify-center text-deGold mb-3">
                <Layers className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-white text-base">Paper Pockets ➔ Web App</h4>
              <p className="text-xs text-gray-400 mt-1">
                Learn with physical hands-on cards, then decode digital sentences!
              </p>
            </div>
          </div>
        </div>

        {/* Start Game Big CTA Button */}
        <div className="text-center">
          <button
            onClick={() => {
              soundManager.playClick();
              onStartPlaying();
            }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-deRed hover:bg-deRed-dark text-white font-display font-extrabold text-lg shadow-pocket-red hover:shadow-none hover:translate-y-1 transition-all active:translate-y-1.5"
          >
            <span>Start Decoding Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
