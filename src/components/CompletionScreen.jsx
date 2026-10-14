import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  BookOpen, 
  Award, 
  Sparkles, 
  CheckCircle,
  Share2
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function CompletionScreen({ 
  completionData, 
  totalScore, 
  onPlayAgain, 
  onNavigateHome, 
  onExploreVocab 
}) {
  const { modeName, totalChallenges, correctCount, earnedPoints } = completionData;
  const percentage = Math.round((correctCount / totalChallenges) * 100);

  // Trigger continuous festive confetti on mount
  useEffect(() => {
    const end = Date.now() + 2.5 * 1000;
    const colors = ['#111111', '#E63946', '#FFC857'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 animate-fadeIn">
      <div className="bg-white rounded-3xl border-2 border-deBlack/15 shadow-2xl p-8 sm:p-10 text-center relative overflow-hidden">
        
        {/* German Flag Tri-Color Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 flex h-2 w-full">
          <div className="w-1/3 bg-deBlack"></div>
          <div className="w-1/3 bg-deRed"></div>
          <div className="w-1/3 bg-deGold"></div>
        </div>

        {/* Celebratory Icon & German Ribbon */}
        <div className="relative inline-block mt-4 mb-4">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-200 border-4 border-white shadow-xl flex items-center justify-center mx-auto text-deBlack">
            <Trophy className="w-12 h-12 text-deBlack fill-deBlack/10" />
          </div>
          <span className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-deRed text-white shadow-md">
            <Sparkles className="w-4 h-4 fill-white" />
          </span>
        </div>

        {/* Big German Victory Heading */}
        <div className="space-y-1 mb-6">
          <h2 className="text-3xl sm:text-4xl font-display font-black text-deBlack tracking-tight">
            DU HAST ES GESCHAFFT!
          </h2>
          <p className="text-lg font-bold text-deRed">
            You did it! • Challenge Completed
          </p>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">
            {modeName} Completed
          </p>
        </div>

        {/* DEUTSCH DECODE CHAMPION Badge */}
        <div className="my-6 inline-flex items-center gap-2.5 px-6 py-2.5 rounded-2xl bg-gradient-to-r from-deBlack to-gray-800 text-deGold border-2 border-deGold shadow-lg">
          <Award className="w-5 h-5 text-deGold flex-shrink-0" />
          <span className="font-display font-black tracking-wider text-sm sm:text-base">
            DEUTSCH DECODE CHAMPION
          </span>
        </div>

        {/* Score & Statistics Breakdown Grid */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 my-8 p-4 bg-gray-50 rounded-2xl border border-gray-200">
          <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Final Score
            </span>
            <div className="text-2xl sm:text-3xl font-black text-deBlack font-display">
              {totalScore}
            </div>
            <span className="text-[10px] text-gray-500 font-semibold">total points</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Accuracy
            </span>
            <div className="text-2xl sm:text-3xl font-black text-deRed font-display">
              {percentage}%
            </div>
            <span className="text-[10px] text-gray-500 font-semibold">
              {percentage >= 80 ? 'Ausgezeichnet!' : 'Gut gemacht!'}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Correct
            </span>
            <div className="text-2xl sm:text-3xl font-black text-green-600 font-display">
              {correctCount} / {totalChallenges}
            </div>
            <span className="text-[10px] text-gray-500 font-semibold">challenges</span>
          </div>
        </div>

        {/* Encouraging German Result Message */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium mb-8">
          {percentage === 100 ? (
            <p>
              🌟 <strong>Perfekt!</strong> You decoded every single challenge with 100% accuracy! You have a fantastic natural intuition for German sentence structures!
            </p>
          ) : percentage >= 70 ? (
            <p>
              🎉 <strong>Sehr gut!</strong> You solved the German puzzles like a pro. Visit our physical expo chart to explore even more vocabulary pockets!
            </p>
          ) : (
            <p>
              💪 <strong>Toller Versuch!</strong> (Great attempt!) Learning a new language takes practice. Review the vocabulary explorer and try again to boost your score!
            </p>
          )}
        </div>

        {/* Action Buttons: Play Again, Return Home, Explore Vocab */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onPlayAgain}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-deRed hover:bg-deRed-dark text-white font-extrabold text-sm shadow-pocket-red transition-all active:translate-y-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>

          <button
            onClick={onExploreVocab}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-deGold hover:bg-deGold-dark text-deBlack font-extrabold text-sm shadow-pocket-gold transition-all active:translate-y-1"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Vocabulary</span>
          </button>

          <button
            onClick={onNavigateHome}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm border border-gray-300 transition-colors"
          >
            <Home className="w-4 h-4 text-gray-600" />
            <span>Back to Home</span>
          </button>
        </div>

      </div>
    </div>
  );
}
