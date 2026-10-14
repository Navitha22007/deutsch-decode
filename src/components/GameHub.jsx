import React, { useState } from 'react';
import { 
  Eye, 
  Image as ImageIcon, 
  Edit3, 
  Puzzle, 
  ArrowRight, 
  Trophy, 
  Sparkles, 
  Flame,
  CheckCircle2,
  Gamepad2
} from 'lucide-react';
import BeginnerGameView from './BeginnerGameView';
import CompletionScreen from './CompletionScreen';
import SentenceDecoder from './SentenceDecoder';
import WordMatchGame from './WordMatchGame';
import FinalChallengeGame from './FinalChallengeGame';
import { GAME_LEVELS } from '../data/challenges';
import { soundManager } from '../utils/audio';

export default function GameHub({ 
  totalScore, 
  setTotalScore, 
  onNavigateHome, 
  onExploreVocab 
}) {
  // Active game mode/level: null (level select) | 'level1' | 'level2' | 'level3' | 'level4' | 'legacy-sentences'
  const [activeLevelId, setActiveLevelId] = useState('level1');
  const [completionData, setCompletionData] = useState(null);

  const selectedLevel = GAME_LEVELS.find(lvl => lvl.id === activeLevelId);

  const handleLevelSelect = (lvlId) => {
    soundManager.playClick();
    setActiveLevelId(lvlId);
    setCompletionData(null);
  };

  const handleGameComplete = (data) => {
    soundManager.playVictory();
    setCompletionData(data);
    setTotalScore(prev => prev + (data.totalScore || 100));
  };

  const handlePlayAgain = () => {
    soundManager.playClick();
    setCompletionData(null);
  };

  // If a round was completed, show the victory + leaderboard screen
  if (completionData) {
    return (
      <section className="py-6 sm:py-10 bg-deCream min-h-screen">
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

  // If a beginner level (1 to 4) is currently being played, render the clean BeginnerGameView
  if (selectedLevel) {
    return (
      <BeginnerGameView
        levelData={selectedLevel}
        onNavigateHome={onNavigateHome}
        onGameComplete={handleGameComplete}
      />
    );
  }

  // Otherwise, render the Level Selector Hub
  return (
    <section className="py-12 sm:py-16 bg-deCream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deRed/10 border border-deRed/20 text-deRed text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Beginner-Friendly Progression</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-black text-deBlack tracking-tight">
            Choose Your Level
          </h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            5 quick questions per game. Master the basics step-by-step with 3D illustrations, then race to the top of the Expo Leaderboard!
          </p>
        </div>

        {/* 4 Gradual Beginner Levels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {GAME_LEVELS.map((lvl) => {
            return (
              <div
                key={lvl.id}
                onClick={() => handleLevelSelect(lvl.id)}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-deRed shadow-card-elevated cursor-pointer group hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-9 h-9 rounded-xl bg-deBlack text-deGold font-display font-black text-sm flex items-center justify-center shadow-sm">
                      L{lvl.levelNum}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                      {lvl.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-black text-deBlack group-hover:text-deRed transition-colors">
                    {lvl.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                    {lvl.deTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                    {lvl.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-deRed">
                  <span>5 Questions • Fast Pace</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Start Level</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advanced Modes Accordion / Option */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 text-center">
          <p className="text-xs text-gray-500 mb-3">
            Looking for more challenges? You can also play the extended 15-sentence puzzle deck.
          </p>
          <button
            onClick={() => handleLevelSelect('level4')}
            className="px-5 py-2.5 rounded-xl bg-deBlack hover:bg-gray-800 text-deGold text-xs font-bold transition-all inline-flex items-center gap-2"
          >
            <Puzzle className="w-4 h-4" />
            <span>Play Sentence Builder (Level 4)</span>
          </button>
        </div>

      </div>
    </section>
  );
}
