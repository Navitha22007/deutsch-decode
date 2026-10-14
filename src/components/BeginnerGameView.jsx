import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Volume2, 
  Lightbulb, 
  Home, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  Sparkles, 
  Timer,
  Undo2
} from 'lucide-react';
import ThreeDIllustration from './ThreeDIllustration';
import { soundManager } from '../utils/audio';

export default function BeginnerGameView({ 
  levelData, 
  onNavigateHome, 
  onGameComplete 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // for Level 1, 2, 3
  const [selectedTokens, setSelectedTokens] = useState([]); // for Level 4 sentence builder
  const [availableBank, setAvailableBank] = useState([]); // for Level 4 sentence builder
  const [status, setStatus] = useState('idle'); // 'idle' | 'correct' | 'incorrect'
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  const questions = levelData.questions;
  const currentQ = questions[currentIndex];
  const timerRef = useRef(null);

  // Live Timer for speed bonus & leaderboard
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  // Reset question state whenever currentIndex changes
  useEffect(() => {
    if (!currentQ) return;
    setSelectedOption(null);
    setStatus('idle');
    setShowHint(false);

    if (currentQ.level === 4) {
      setSelectedTokens([]);
      // Shuffle bank tokens
      const shuffled = [...currentQ.bankTokens].sort(() => Math.random() - 0.5);
      setAvailableBank(shuffled.map((text, idx) => ({ id: `token-${idx}-${text}`, text })));
    }
  }, [currentIndex, currentQ]);

  // Audio pronunciation
  const handleSpeak = (text) => {
    soundManager.playClick();
    soundManager.speakGerman(text);
  };

  // Option selection for Level 1, 2, 3
  const handleSelectOption = (opt) => {
    if (status === 'correct') return;
    soundManager.playClick();
    setSelectedOption(opt);
    if (status === 'incorrect') {
      setStatus('idle');
    }
  };

  // Level 4: Add word to sentence
  const handleAddSentenceToken = (tokenObj) => {
    if (status === 'correct') return;
    soundManager.playClick();
    setSelectedTokens(prev => [...prev, tokenObj]);
    setAvailableBank(prev => prev.filter(t => t.id !== tokenObj.id));
    if (status === 'incorrect') {
      setStatus('idle');
    }
  };

  // Level 4: Remove word from sentence
  const handleRemoveSentenceToken = (tokenObj) => {
    if (status === 'correct') return;
    soundManager.playClick();
    setSelectedTokens(prev => prev.filter(t => t.id !== tokenObj.id));
    setAvailableBank(prev => [...prev, tokenObj]);
    if (status === 'incorrect') {
      setStatus('idle');
    }
  };

  // Check Answer Button Logic
  const handleCheckAnswer = () => {
    let isCorrect = false;

    if (currentQ.level === 4) {
      const built = selectedTokens.map(t => t.text).join(' ');
      isCorrect = built === currentQ.correctSentence;
    } else {
      isCorrect = selectedOption === currentQ.correctAnswer;
    }

    if (isCorrect) {
      soundManager.playSuccess();
      setStatus('correct');
      setCorrectCount(prev => prev + 1);
      setScore(prev => prev + 100);

      // Pronounce the correct German word/sentence
      const spoken = currentQ.germanSpoken || currentQ.correctAnswer || currentQ.correctSentence || '';
      if (spoken) {
        soundManager.speakGerman(spoken);
      }

      // Small confetti pop
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#111111', '#E63946', '#FFC857']
      });
    } else {
      soundManager.playError();
      setStatus('incorrect');
    }
  };

  // Next Question / Complete Game
  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed all 5 questions!
      setTimerActive(false);
      
      // Calculate speed bonus: under 30s = +150, under 45s = +100, under 60s = +50
      let speedBonus = 0;
      if (seconds <= 30) speedBonus = 150;
      else if (seconds <= 45) speedBonus = 100;
      else if (seconds <= 60) speedBonus = 50;

      const finalTotalScore = score + (status === 'correct' ? 0 : 0) + speedBonus;

      onGameComplete({
        levelName: levelData.title,
        levelNum: levelData.levelNum,
        totalQuestions: questions.length,
        correctCount: correctCount,
        baseScore: score,
        speedBonus: speedBonus,
        totalScore: finalTotalScore,
        timeSeconds: seconds
      });
    }
  };

  // Format time (0:24)
  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}s`;
  };

  const isAnswerSelected = currentQ.level === 4 
    ? selectedTokens.length > 0 
    : selectedOption !== null;

  return (
    <div className="min-h-screen bg-deCream flex flex-col justify-between py-4 sm:py-6 px-4">
      
      {/* ========================================================
          1. TOP BAR: Logo, Progress ("Question 2 of 5"), Score, Home
         ======================================================== */}
      <header className="max-w-2xl w-full mx-auto flex items-center justify-between pb-4 border-b border-deCream-border">
        {/* Left: DEUTSCH DECODE brand logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex flex-col border border-deBlack/20 shadow-sm">
            <div className="h-1/3 bg-deBlack"></div>
            <div className="h-1/3 bg-deRed"></div>
            <div className="h-1/3 bg-deGold"></div>
          </div>
          <div>
            <span className="font-display font-black text-lg text-deBlack tracking-tight">
              DEUTSCH<span className="text-deRed ml-0.5">DECODE</span>
            </span>
            <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              {levelData.title}
            </span>
          </div>
        </div>

        {/* Center: Small Progress Indicator (Question 2 of 5) */}
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-deRed animate-pulse"></span>
            <span>Question {currentIndex + 1} of {questions.length}</span>
          </div>
        </div>

        {/* Right: Score Display + Home Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Timer & Score Pill */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-deBlack text-deGold text-xs font-bold shadow-sm">
            <Timer className="w-3.5 h-3.5 text-deGold" />
            <span>{formatTime(seconds)}</span>
            <span className="text-gray-500">|</span>
            <span>{score} pts</span>
          </div>

          {/* Clear Home Button */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 text-xs font-bold transition-colors shadow-sm"
            title="Return to Home Screen"
          >
            <Home className="w-3.5 h-3.5 text-gray-500" />
            <span className="hidden sm:inline">Home</span>
          </button>
        </div>
      </header>

      {/* Progress Line */}
      <div className="max-w-2xl w-full mx-auto my-2 bg-gray-200 h-1.5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-deRed to-deGold transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* ========================================================
          2. CENTRE: One Large Question Card
         ======================================================== */}
      <main className="max-w-2xl w-full mx-auto my-auto py-2">
        <div className="bg-white rounded-3xl border-2 border-deBlack/10 shadow-card-elevated p-6 sm:p-8 relative">
          
          {/* Top of Card: Small Hint Button */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-deRed">
              Step {currentIndex + 1}
            </span>
            <button
              onClick={() => {
                soundManager.playClick();
                setShowHint(!showHint);
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
              title="Show hint"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Hint</span>
            </button>
          </div>

          {/* Hint Dropdown if open */}
          {showHint && (
            <div className="mb-4 p-3 rounded-xl bg-amber-50/90 border border-amber-200 text-xs text-amber-900 animate-fadeIn">
              <strong>💡 Clue:</strong> {currentQ.hint}
            </div>
          )}

          {/* 3D Image & Look-and-Learn Header Area */}
          <div className="text-center">
            
            {/* 3D Illustration (Main Focus) */}
            <div className="flex justify-center mb-2">
              <ThreeDIllustration type={currentQ.illustration} size={150} />
            </div>

            {/* LEVEL 1: LOOK & LEARN Teaching Box */}
            {currentQ.level === 1 && (
              <div className="mb-4 p-3.5 rounded-2xl bg-gradient-to-b from-gray-50 to-amber-50/40 border border-amber-200 max-w-md mx-auto">
                <span className="text-[10px] font-black uppercase tracking-widest text-deRed block mb-0.5">
                  LOOK & LEARN
                </span>
                <div className="text-2xl font-black text-deBlack font-display tracking-tight">
                  {currentQ.englishName}
                </div>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <span className="text-base font-extrabold text-deRed">
                    German: {currentQ.germanDisplay}
                  </span>
                  <button
                    onClick={() => handleSpeak(currentQ.germanSpoken)}
                    className="p-1.5 rounded-lg bg-deRed text-white hover:bg-deRed-dark transition-all active:scale-95 shadow-sm"
                    title="Hear German Pronunciation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">
                  Pronunciation: <span className="text-gray-800 font-bold">"{currentQ.pronunciation}"</span>
                </div>
              </div>
            )}

            {/* Large, Readable English Question Prompt */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-deBlack font-display tracking-tight max-w-lg mx-auto">
              {currentQ.prompt}
            </h2>

            {/* LEVEL 3: Fill-in-the-blank text line */}
            {currentQ.level === 3 && (
              <div className="my-4 text-2xl sm:text-3xl font-black text-deBlack font-display tracking-tight">
                {currentQ.prefix}{' '}
                <span className="inline-block min-w-[120px] px-3 py-1 mx-1 border-b-4 border-deRed bg-gray-50 text-deRed rounded">
                  {selectedOption || '______'}
                </span>
              </div>
            )}

            {/* LEVEL 4: Sentence Builder Construction Slot */}
            {currentQ.level === 4 && (
              <div className="my-4">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Meaning: <span className="text-deGold-dark font-extrabold">"{currentQ.englishMeaning}"</span>
                </div>

                <div className="min-h-[64px] p-3 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/80 flex flex-wrap items-center justify-center gap-2">
                  {selectedTokens.length === 0 ? (
                    <span className="text-gray-400 text-xs italic">
                      Tap the German words below to build this sentence
                    </span>
                  ) : (
                    selectedTokens.map(token => (
                      <button
                        key={token.id}
                        onClick={() => handleRemoveSentenceToken(token)}
                        disabled={status === 'correct'}
                        className="px-4 py-2 rounded-xl bg-deBlack text-white font-black text-sm shadow-pocket hover:bg-gray-800 transition-all active:scale-95 animate-pop flex items-center gap-1.5"
                        title="Tap to remove"
                      >
                        <span>{token.text}</span>
                        {status !== 'correct' && (
                          <span className="text-xs text-deRed font-bold">✕</span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Answer Choices / Word Cards */}
          <div className="mt-5">
            {/* LEVEL 1, 2, 3: Multiple Choice Cards */}
            {currentQ.level !== 4 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  let cardStyle = "bg-white text-gray-800 border-2 border-gray-200 hover:border-deGold hover:bg-amber-50/30";

                  if (status === 'correct') {
                    if (opt === currentQ.correctAnswer) {
                      cardStyle = "bg-green-100 border-2 border-green-500 text-green-950 font-black shadow-md";
                    } else {
                      cardStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
                    }
                  } else if (status === 'incorrect' && isSelected) {
                    cardStyle = "bg-red-50 border-2 border-deRed text-deRed font-bold";
                  } else if (isSelected) {
                    cardStyle = "bg-deBlack text-deGold border-2 border-deBlack shadow-pocket font-bold scale-[1.02]";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt)}
                      disabled={status === 'correct'}
                      className={`p-4 rounded-2xl text-center font-bold text-base transition-all active:scale-95 ${cardStyle}`}
                    >
                      <div className="text-lg font-display">{opt}</div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* LEVEL 4: Clickable Word Bank */}
            {currentQ.level === 4 && (
              <div className="flex flex-wrap items-center justify-center gap-2.5 p-3 rounded-2xl bg-gray-50 border border-gray-200 min-h-[64px]">
                {availableBank.length === 0 && selectedTokens.length > 0 ? (
                  <span className="text-xs text-gray-400 italic">
                    All words placed! Check your answer below.
                  </span>
                ) : (
                  availableBank.map(token => (
                    <button
                      key={token.id}
                      onClick={() => handleAddSentenceToken(token)}
                      disabled={status === 'correct'}
                      className="px-4 py-2.5 rounded-xl font-black text-sm bg-white text-deBlack border-2 border-gray-300 shadow-pocket hover:border-deBlack active:translate-y-0.5 hover:bg-amber-50 transition-all"
                    >
                      {token.text}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Friendly Feedback Alert Box */}
          {status === 'correct' && (
            <div className="mt-5 p-4 rounded-2xl bg-green-50 border-2 border-green-400 animate-fadeIn flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-black text-green-900">
                  Richtig! (Correct!) +100 Points
                </h4>
                <p className="text-xs text-green-800 mt-0.5">
                  {currentQ.explanation}
                </p>
              </div>
            </div>
          )}

          {status === 'incorrect' && (
            <div className="mt-5 p-4 rounded-2xl bg-red-50 border-2 border-deRed/30 animate-fadeIn flex items-start gap-3">
              <XCircle className="w-5 h-5 text-deRed flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-black text-deRed">
                  Nicht ganz! (Not quite!)
                </h4>
                <p className="text-xs text-gray-700 mt-0.5">
                  Try another option or use the hint at the top!
                </p>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ========================================================
          3. BOTTOM: One Clear Primary Button ("Check Answer" / "Next Question")
         ======================================================== */}
      <footer className="max-w-2xl w-full mx-auto pt-2 pb-4">
        {status === 'correct' ? (
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-display font-black text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'View Expo Results & Leaderboard'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleCheckAnswer}
            disabled={!isAnswerSelected}
            className="w-full py-4 rounded-2xl bg-deRed hover:bg-deRed-dark text-white font-display font-black text-lg shadow-pocket-red disabled:opacity-40 disabled:shadow-none hover:shadow-none hover:translate-y-1 transition-all active:translate-y-1.5 flex items-center justify-center gap-2"
          >
            <span>Check Answer</span>
          </button>
        )}
      </footer>

    </div>
  );
}
