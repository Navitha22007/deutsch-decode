import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VocabularyExplorer from './components/VocabularyExplorer';
import GameHub from './components/GameHub';
import HowToPlay from './components/HowToPlay';
import ExpoQrModal from './components/ExpoQrModal';
import Footer from './components/Footer';
import { 
  Puzzle, 
  Layers, 
  Compass, 
  BookOpen, 
  Sparkles, 
  Volume2, 
  ArrowRight,
  CheckCircle2,
  Trophy,
  QrCode
} from 'lucide-react';
import { VOCABULARY_ITEMS } from './data/vocabulary';
import { soundManager } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'vocabulary' | 'game' | 'how-to-play'
  const [totalScore, setTotalScore] = useState(0);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);

  // Restore saved score and sound preferences from localStorage if available
  useEffect(() => {
    try {
      const savedScore = localStorage.getItem('deutsch_decode_total_score');
      if (savedScore) {
        setTotalScore(parseInt(savedScore, 10) || 0);
      }
      setSoundMuted(soundManager.isMuted());
    } catch {
      // localStorage may not be available
    }
  }, []);

  // Update localStorage when totalScore changes
  useEffect(() => {
    try {
      localStorage.setItem('deutsch_decode_total_score', totalScore.toString());
    } catch {
      // ignore
    }
  }, [totalScore]);

  const handleNavigate = (tab) => {
    soundManager.playClick();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sample greetings for Home preview
  const featuredWords = VOCABULARY_ITEMS.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-deCream font-sans text-deBlack selection:bg-deGold selection:text-deBlack">
      
      {/* Top Sticky Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalScore={totalScore}
        onOpenQr={() => setIsQrModalOpen(true)}
        soundMuted={soundMuted}
        setSoundMuted={setSoundMuted}
      />

      {/* Main Content Area based on activeTab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              onStartGame={() => handleNavigate('game')}
              onExploreVocab={() => handleNavigate('vocabulary')}
              onHowToPlay={() => handleNavigate('how-to-play')}
            />

            {/* Section 1: The Three Game Modes Preview Cards */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-wider text-deRed block mb-2">
                  Choose Your German Quest
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-deBlack">
                  Three Engaging Ways to Play
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mt-2">
                  Crafted for all expo visitors — from complete beginners decoding their first word to advanced language detectives.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Mode B Card (Featured) */}
                <div className="bg-white rounded-3xl p-7 border-2 border-deRed shadow-card-elevated relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5 transition-all">
                  <div className="absolute top-0 right-0 bg-deRed text-white px-3 py-1 rounded-bl-xl text-[10px] font-black uppercase tracking-wider">
                    Flagship Game
                  </div>

                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-deRed/10 text-deRed flex items-center justify-center mb-4">
                      <Puzzle className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-deRed uppercase tracking-wider">
                      Mode B
                    </span>
                    <h3 className="text-xl font-display font-bold text-deBlack mt-0.5">
                      Sentence Decoder
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                      Given an English sentence, assemble scrambled German word cards in the exact correct order. Watch out for distractor words!
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-500">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span>15 Sentence Puzzles • +100 pts each</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavigate('game')}
                    className="mt-6 w-full py-3 rounded-xl bg-deRed hover:bg-deRed-dark text-white font-extrabold text-xs sm:text-sm shadow-pocket-red transition-all active:translate-y-1 flex items-center justify-center gap-2"
                  >
                    <span>Play Sentence Decoder</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Mode A Card */}
                <div className="bg-white rounded-3xl p-7 border-2 border-gray-200 shadow-card-elevated flex flex-col justify-between group hover:-translate-y-1.5 transition-all hover:border-deGold">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-deGold/20 text-deGold-dark flex items-center justify-center mb-4">
                      <Layers className="w-6 h-6 text-amber-600" />
                    </div>
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                      Mode A
                    </span>
                    <h3 className="text-xl font-display font-bold text-deBlack mt-0.5">
                      Word Match Blitz
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                      Rapid German-to-English vocabulary quiz. Listen to the German word and pick the correct meaning from four multiple-choice options.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-500">
                      <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                      <span>12 Quick Questions • +50 pts each</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavigate('game')}
                    className="mt-6 w-full py-3 rounded-xl bg-deBlack hover:bg-gray-800 text-deGold font-extrabold text-xs sm:text-sm shadow-pocket transition-all active:translate-y-1 flex items-center justify-center gap-2"
                  >
                    <span>Play Word Match</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Mode C Card */}
                <div className="bg-white rounded-3xl p-7 border-2 border-gray-200 shadow-card-elevated flex flex-col justify-between group hover:-translate-y-1.5 transition-all hover:border-gray-800">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 text-deBlack flex items-center justify-center mb-4">
                      <Compass className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Mode C
                    </span>
                    <h3 className="text-xl font-display font-bold text-deBlack mt-0.5">
                      Final Challenge
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                      Put your German into action with real-life scenarios! Order water, greet professors, ask for directions, and introduce yourself.
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-gray-500">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>Real Scenarios • +150 pts each</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavigate('game')}
                    className="mt-6 w-full py-3 rounded-xl bg-deGold hover:bg-deGold-dark text-deBlack font-extrabold text-xs sm:text-sm shadow-pocket-gold transition-all active:translate-y-1 flex items-center justify-center gap-2"
                  >
                    <span>Play Final Challenge</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </section>

            {/* Section 2: Physical Chart Pocket Concept Spotlight */}
            <section className="bg-deBlack py-16 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                <div className="lg:col-span-7 space-y-4">
                  <span className="px-3 py-1 rounded-full bg-deGold text-deBlack text-xs font-black uppercase tracking-wider">
                    Physical Display Board Homage
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-display font-black text-white leading-tight">
                    From Paper Pockets to Digital Decoder
                  </h2>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    Our college expo booth features a large black display board decorated with colourful paper pockets.
                    Each pocket represents a vocabulary category:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <span className="w-3.5 h-3.5 rounded-full bg-deRed mt-1 flex-shrink-0"></span>
                      <div>
                        <strong className="text-white text-sm block">Red Paper Pockets</strong>
                        <span className="text-xs text-gray-400">Actions, Verbs & Family Members</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                      <span className="w-3.5 h-3.5 rounded-full bg-deGold mt-1 flex-shrink-0"></span>
                      <div>
                        <strong className="text-white text-sm block">Gold Paper Pockets</strong>
                        <span className="text-xs text-gray-400">Food, Feelings, Colors & Numbers</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 pt-2">
                    Visitors pick up word cards from the pockets, learn the German vocabulary, and then scan the QR code to decode sentences on this web app!
                  </p>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      onClick={() => handleNavigate('vocabulary')}
                      className="px-5 py-2.5 rounded-xl bg-deGold hover:bg-deGold-dark text-deBlack font-bold text-xs sm:text-sm shadow-md transition-all"
                    >
                      Browse All 91 Pocket Words
                    </button>
                    <button
                      onClick={() => setIsQrModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-1.5"
                    >
                      <QrCode className="w-4 h-4 text-deGold" />
                      <span>Expo QR Code Stand</span>
                    </button>
                  </div>
                </div>

                {/* Pocket Visual Mockup */}
                <div className="lg:col-span-5">
                  <div className="bg-deBlack-light p-6 rounded-3xl border-2 border-white/15 shadow-expo-board space-y-4">
                    <div className="text-xs font-bold uppercase tracking-wider text-deGold flex items-center justify-between">
                      <span>Display Board Mockup</span>
                      <span className="text-[10px] text-gray-400 font-normal">Expo Pocket Preview</span>
                    </div>

                    {/* Pocket Sample 1: Red pocket */}
                    <div className="bg-white text-deBlack rounded-xl p-4 border-t-4 border-deRed shadow-md">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span className="font-bold text-deRed uppercase">Verb Pocket</span>
                        <span>Card #01</span>
                      </div>
                      <div className="text-xl font-black font-display">Lernen</div>
                      <div className="text-xs text-gray-600 font-medium">To learn • [LAIR-nen]</div>
                      <div className="text-[11px] text-gray-400 italic mt-1">"Ich lerne Deutsch."</div>
                    </div>

                    {/* Pocket Sample 2: Gold pocket */}
                    <div className="bg-white text-deBlack rounded-xl p-4 border-t-4 border-deGold shadow-md">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span className="font-bold text-amber-600 uppercase">Food Pocket</span>
                        <span>Card #02</span>
                      </div>
                      <div className="text-xl font-black font-display">das Wasser</div>
                      <div className="text-xs text-gray-600 font-medium">Water • [VAH-ser]</div>
                      <div className="text-[11px] text-gray-400 italic mt-1">"Ich trinke frisches Wasser."</div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Section 3: Popular Greetings Snapshot */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-deRed block mb-1">
                    Quick Vocabulary Taste
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-deBlack">
                    Essential German Greetings
                  </h2>
                </div>

                <button
                  onClick={() => handleNavigate('vocabulary')}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-deRed hover:underline self-start sm:self-auto"
                >
                  <span>Explore all 10 categories</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredWords.map(item => (
                  <div 
                    key={item.id}
                    className="pocket-card bg-white rounded-xl border border-gray-200 p-5 shadow-sm pocket-tab-gold flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                        <span>{item.type}</span>
                        <button
                          onClick={() => {
                            soundManager.playClick();
                            soundManager.speakGerman(item.german);
                          }}
                          className="p-1 text-gray-400 hover:text-deRed rounded transition-colors"
                          title="Listen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xl font-black text-deBlack font-display">
                        {item.german}
                      </div>
                      <div className="text-xs text-gray-500 font-medium mt-0.5">
                        {item.pronunciation}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 text-sm font-bold text-gray-800 bg-amber-50/70 p-2 rounded-lg">
                      {item.english}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {activeTab === 'vocabulary' && (
          <VocabularyExplorer />
        )}

        {activeTab === 'game' && (
          <GameHub
            totalScore={totalScore}
            setTotalScore={setTotalScore}
            onNavigateHome={() => handleNavigate('home')}
            onExploreVocab={() => handleNavigate('vocabulary')}
          />
        )}

        {activeTab === 'how-to-play' && (
          <HowToPlay
            onStartPlaying={() => handleNavigate('game')}
            onExploreVocab={() => handleNavigate('vocabulary')}
            onOpenQr={() => setIsQrModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQr={() => setIsQrModalOpen(true)}
      />

      {/* Real-time Scannable QR Code Modal */}
      <ExpoQrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
      />

    </div>
  );
}
