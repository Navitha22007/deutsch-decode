import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Trophy, 
  Sparkles, 
  Volume2, 
  Compass,
  MessageSquare
} from 'lucide-react';
import { FINAL_CHALLENGES } from '../data/challenges';
import { soundManager } from '../utils/audio';

export default function FinalChallengeGame({ onUpdateScore, totalScore, onGameComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentScenario = FINAL_CHALLENGES[currentIndex];

  const handleSelectOption = (option) => {
    if (isAnswered) return;
    soundManager.playClick();
    setSelectedOption(option);
    setIsAnswered(true);

    if (option.isCorrect) {
      soundManager.playSuccess();
      setCorrectCount(prev => prev + 1);
      onUpdateScore(150); // 150 points for scenario mastery

      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#111111', '#E63946', '#FFC857']
      });

      // Pronounce the correct German phrase
      soundManager.speakGerman(option.text);
    } else {
      soundManager.playError();
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex + 1 < FINAL_CHALLENGES.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Completed Mode C!
      if (onGameComplete) {
        onGameComplete({
          modeName: 'Final Challenge Scenarios',
          totalChallenges: FINAL_CHALLENGES.length,
          correctCount: correctCount + (selectedOption && selectedOption.isCorrect ? 1 : 0),
          earnedPoints: (correctCount + (selectedOption && selectedOption.isCorrect ? 1 : 0)) * 150
        });
      }
    }
  };

  const progressPercent = Math.round(((currentIndex + 1) / FINAL_CHALLENGES.length) * 100);

  return (
    <div className="bg-white rounded-3xl border-2 border-deBlack/10 shadow-card-elevated overflow-hidden p-6 sm:p-8 max-w-3xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-deRed">
            Mode C: Final Challenge
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-deBlack mt-0.5">
            Scenario {currentIndex + 1} of {FINAL_CHALLENGES.length}
          </h3>
        </div>

        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-deBlack text-deGold text-xs sm:text-sm font-bold shadow-sm">
          <Trophy className="w-4 h-4 text-deGold" />
          <span>{totalScore} pts</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-2.5 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-deRed to-deGold transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Scenario Card */}
      <div className="mt-8 p-6 rounded-2xl bg-amber-50/70 border border-amber-200">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
          <Compass className="w-4 h-4 text-amber-700" />
          <span>{currentScenario.scenario}</span>
        </div>

        <p className="text-xs text-gray-500 italic mb-3">
          Context: {currentScenario.context}
        </p>

        <div className="text-xl sm:text-2xl font-extrabold text-deBlack font-display tracking-tight">
          "{currentScenario.prompt}"
        </div>
      </div>

      {/* Options Grid */}
      <div className="mt-6 space-y-3">
        {currentScenario.options.map((opt, idx) => {
          let btnStyle = "bg-white text-gray-800 border-2 border-gray-200 hover:border-deGold hover:bg-amber-50/40 shadow-sm";

          if (isAnswered) {
            if (opt.isCorrect) {
              btnStyle = "bg-green-100 border-2 border-green-500 text-green-950 font-extrabold shadow-sm";
            } else if (selectedOption === opt) {
              btnStyle = "bg-red-100 border-2 border-deRed text-red-950 font-extrabold";
            } else {
              btnStyle = "bg-gray-50 border-2 border-gray-200 text-gray-400 opacity-60";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt)}
              disabled={isAnswered}
              className={`w-full p-4 rounded-xl text-left font-bold text-base transition-all flex items-center justify-between ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="text-lg">{opt.text}</span>
              </div>

              {isAnswered && opt.isCorrect && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <span className="text-xs text-green-800 font-bold hidden sm:inline">Correct</span>
                </div>
              )}
              {isAnswered && selectedOption === opt && !opt.isCorrect && (
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-deRed" />
                  <span className="text-xs text-deRed font-bold hidden sm:inline">Incorrect</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner */}
      {isAnswered && (
        <div className={`mt-6 p-4 rounded-2xl animate-fadeIn ${
          selectedOption && selectedOption.isCorrect 
            ? 'bg-green-50 border border-green-300' 
            : 'bg-red-50 border border-deRed/30'
        }`}>
          <div className="flex items-start gap-2.5">
            {selectedOption && selectedOption.isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-deRed flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`text-sm font-bold ${
                selectedOption && selectedOption.isCorrect ? 'text-green-800' : 'text-deRed'
              }`}>
                {selectedOption && selectedOption.isCorrect 
                  ? 'Klasse! (Great!) +150 Points' 
                  : 'Schade! (Too bad!) Review the scenario explanation:'}
              </p>
              <p className="text-xs text-gray-700 mt-1">
                {currentScenario.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next Challenge Action */}
      {isAnswered && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-deBlack hover:bg-gray-800 text-deGold font-extrabold text-sm shadow-md transition-all active:scale-95"
          >
            <span>{currentIndex + 1 < FINAL_CHALLENGES.length ? 'Next Scenario' : 'View Results'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
