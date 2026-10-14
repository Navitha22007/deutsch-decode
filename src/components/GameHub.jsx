import React, { useState } from 'react';
import { 
  Puzzle, 
  Gamepad2, 
  Sparkles, 
  CheckCircle2, 
  Trophy, 
  Layers, 
  Compass, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import SentenceDecoder from './SentenceDecoder';
import WordMatchGame from './WordMatchGame';
import FinalChallengeGame from './FinalChallengeGame';
import CompletionScreen from './CompletionScreen';
import { soundManager } from '../utils/audio';

export default function GameHub({ 
  totalScore, 
  setTotalScore, 
  onNavigateHome, 
  onExploreVocab 
}) {
  const [selectedMode, setSelectedMode] = useState('sentence'); // 'word-match' | 'sentence' | 'final'
  const [completionData, setCompletionData] = useState(null);

  const handleUpdateScore = (points) => {
    setTotalScore(prev => {
      const next = prev + points;
      try {
        localStorage.setItem('deutsch_decode_best_score', Math.max(next, parseInt(localStorage.getItem('deutsch_decode_best_score') || '0')));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleGameComplete = (data) => {
    soundManager.playVictory();
    setCompletionData(data);
  };

  const handlePlayAgain = () => {
    soundManager.playClick();
    setCompletionData(null);
  };

  // If a mode has finished, render the celebration completion screen
  if (completionData) {
    return (
      <section className="py-12 md:py-16 bg-deCream min-h-screen">
        <CompletionScreen
          completionData={completionData}
          totalScore={totalScore}
          onPlayAgain={handlePlayAgain}
          onNavigateHome={onNavigateHome}
          onExploreVocab={onExploreVocab}
        />
      </section>
    );
  }

  return (
    <section id="game-section" className="py-12 md:py-16 bg-deCream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Mode Switcher */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deGold/20 border border-deGold/40 text-deBlack text-xs font-bold uppercase tracking-wider mb-3">
            <Gamepad2 className="w-3.5 h-3.5 text-deRed" />
            <span>Interactive Game Modes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-deBlack tracking-tight">
            DEUTSCH DECODE Arena
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Choose your challenge level. Test your vocabulary memory, solve shuffled sentence puzzles, or master real-world German scenarios!
          </p>

          {/* Mode Selector Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedMode('sentence');
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all border-2 ${
                selectedMode === 'sentence'
                  ? 'bg-deBlack text-white border-deBlack shadow-pocket'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              <Puzzle className={`w-4 h-4 ${selectedMode === 'sentence' ? 'text-deGold' : 'text-deRed'}`} />
              <span>Mode B: Sentence Decoder</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-deRed text-white">
                Main Game
              </span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedMode('word-match');
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all border-2 ${
                selectedMode === 'word-match'
                  ? 'bg-deBlack text-white border-deBlack shadow-pocket'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              <Layers className={`w-4 h-4 ${selectedMode === 'word-match' ? 'text-deGold' : 'text-gray-500'}`} />
              <span>Mode A: Word Match</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedMode('final');
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all border-2 ${
                selectedMode === 'final'
                  ? 'bg-deBlack text-white border-deBlack shadow-pocket'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              <Compass className={`w-4 h-4 ${selectedMode === 'final' ? 'text-deGold' : 'text-amber-500'}`} />
              <span>Mode C: Final Challenge</span>
            </button>

          </div>
        </div>

        {/* Active Mode Render */}
        <div className="mt-6">
          {selectedMode === 'sentence' && (
            <SentenceDecoder
              onUpdateScore={handleUpdateScore}
              totalScore={totalScore}
              onGameComplete={handleGameComplete}
            />
          )}

          {selectedMode === 'word-match' && (
            <WordMatchGame
              onUpdateScore={handleUpdateScore}
              totalScore={totalScore}
              onGameComplete={handleGameComplete}
            />
          )}

          {selectedMode === 'final' && (
            <FinalChallengeGame
              onUpdateScore={handleUpdateScore}
              totalScore={totalScore}
              onGameComplete={handleGameComplete}
            />
          )}
        </div>

      </div>
    </section>
  );
}
