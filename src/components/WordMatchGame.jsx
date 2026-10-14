import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Trophy, 
  Flame, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { WORD_MATCH_QUESTIONS } from '../data/challenges';
import { soundManager } from '../utils/audio';

export default function WordMatchGame({ onUpdateScore, totalScore, onGameComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasChecked, setHasChecked] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQ = WORD_MATCH_QUESTIONS[currentIndex];

  const handleSelectOption = (option) => {
    if (hasChecked) return;
    soundManager.playClick();
    setSelectedAnswer(option);
    setHasChecked(true);

    if (option === currentQ.correctAnswer) {
      soundManager.playSuccess();
      setCurrentStreak(prev => prev + 1);
      setCorrectCount(prev => prev + 1);
      onUpdateScore(50); // 50 pts for word match

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#111111', '#E63946', '#FFC857']
      });
    } else {
      soundManager.playError();
      setCurrentStreak(0);
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex + 1 < WORD_MATCH_QUESTIONS.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setHasChecked(false);
    } else {
      // Complete!
      if (onGameComplete) {
        onGameComplete({
          modeName: 'Word Match',
          totalChallenges: WORD_MATCH_QUESTIONS.length,
          correctCount: correctCount + (selectedAnswer === currentQ.correctAnswer ? 1 : 0),
          earnedPoints: correctCount * 50
        });
      }
    }
  };

  const handleSpeakWord = () => {
    soundManager.speakGerman(currentQ.germanWord);
  };

  const progressPercent = Math.round(((currentIndex + 1) / WORD_MATCH_QUESTIONS.length) * 100);

  return (
    <div className="bg-white rounded-3xl border-2 border-deBlack/10 shadow-card-elevated overflow-hidden p-6 sm:p-8 max-w-3xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-deRed">
            Mode A: Word Match
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-deBlack mt-0.5">
            Question {currentIndex + 1} of {WORD_MATCH_QUESTIONS.length}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span>{currentStreak} Streak</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-deBlack text-deGold text-xs sm:text-sm font-bold shadow-sm">
            <Trophy className="w-4 h-4 text-deGold" />
            <span>{totalScore} pts</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 h-2.5 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-deRed to-deGold transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* German Word Flashcard */}
      <div className="mt-8 p-8 rounded-2xl bg-gradient-to-b from-deBlack to-gray-900 text-white text-center shadow-md relative overflow-hidden">
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/10 text-deGold">
            {currentQ.category}
          </span>
        </div>

        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-2">
          What is the English meaning of:
        </span>

        <div className="flex items-center justify-center gap-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            {currentQ.germanWord}
          </h2>
          <button
            onClick={handleSpeakWord}
            className="p-2 rounded-xl bg-deRed hover:bg-deRed-dark text-white transition-transform active:scale-90"
            title="Listen to pronunciation"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {currentQ.pronunciation && (
          <p className="text-xs text-gray-400 mt-2 font-medium">
            Say: <span className="text-deGold">{currentQ.pronunciation}</span>
          </p>
        )}
      </div>

      {/* 4 Options Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {currentQ.options.map((option, idx) => {
          let btnStyle = "bg-white text-gray-800 border-2 border-gray-200 hover:border-deGold hover:bg-amber-50/50 shadow-sm";

          if (hasChecked) {
            if (option === currentQ.correctAnswer) {
              btnStyle = "bg-green-100 border-2 border-green-500 text-green-900 font-extrabold shadow-sm";
            } else if (selectedAnswer === option) {
              btnStyle = "bg-red-100 border-2 border-deRed text-red-900 font-extrabold";
            } else {
              btnStyle = "bg-gray-50 border-2 border-gray-200 text-gray-400 opacity-60";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(option)}
              disabled={hasChecked}
              className={`p-4 rounded-xl text-left font-bold text-base transition-all flex items-center justify-between ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-bold">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>

              {hasChecked && option === currentQ.correctAnswer && (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              )}
              {hasChecked && selectedAnswer === option && option !== currentQ.correctAnswer && (
                <XCircle className="w-5 h-5 text-deRed flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback & Explanation */}
      {hasChecked && (
        <div className={`mt-6 p-4 rounded-2xl animate-fadeIn ${
          selectedAnswer === currentQ.correctAnswer 
            ? 'bg-green-50 border border-green-300' 
            : 'bg-red-50 border border-deRed/30'
        }`}>
          <div className="flex items-start gap-2.5">
            {selectedAnswer === currentQ.correctAnswer ? (
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-deRed flex-shrink-0 mt-0.5" />
            )}
            <div>
              <p className={`text-sm font-bold ${
                selectedAnswer === currentQ.correctAnswer ? 'text-green-800' : 'text-deRed'
              }`}>
                {selectedAnswer === currentQ.correctAnswer ? 'Wunderbar! (Wonderful!) +50 Points' : 'Nicht ganz! Correct meaning: ' + currentQ.correctAnswer}
              </p>
              <p className="text-xs text-gray-700 mt-1">
                {currentQ.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next Question Button */}
      {hasChecked && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-deBlack hover:bg-gray-800 text-deGold font-extrabold text-sm shadow-md transition-all active:scale-95"
          >
            <span>{currentIndex + 1 < WORD_MATCH_QUESTIONS.length ? 'Next Question' : 'Finish Mode'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}
