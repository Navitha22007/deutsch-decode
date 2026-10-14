import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Check, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Lightbulb, 
  Volume2, 
  AlertCircle, 
  CheckCircle2, 
  Trophy,
  Flame,
  HelpCircle,
  Undo2
} from 'lucide-react';
import { SENTENCE_CHALLENGES } from '../data/challenges';
import { soundManager } from '../utils/audio';

export default function SentenceDecoder({ onUpdateScore, totalScore, onGameComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedTokens, setSelectedTokens] = useState([]); // array of { id, text }
  const [shuffledBank, setShuffledBank] = useState([]); // array of { id, text }
  const [submissionState, setSubmissionState] = useState(null); // 'correct' | 'incorrect' | null
  const [awardedChallenges, setAwardedChallenges] = useState(new Set()); // IDs of challenges that already gave points
  const [showHint, setShowHint] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);

  const currentChallenge = SENTENCE_CHALLENGES[currentIndex];

  // Helper to shuffle array
  const shuffle = (array) => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Prepare word bank when current challenge changes
  useEffect(() => {
    if (!currentChallenge) return;

    const allWords = [
      ...currentChallenge.germanTokens.map((t, idx) => ({ id: `token-${idx}`, text: t, isToken: true })),
      ...currentChallenge.distractors.map((d, idx) => ({ id: `distractor-${idx}`, text: d, isDistractor: true }))
    ];

    setShuffledBank(shuffle(allWords));
    setSelectedTokens([]);
    setSubmissionState(null);
    setShowHint(false);
  }, [currentIndex]);

  // Click a word from the available word bank to add it to the answer builder
  const handleSelectWord = (wordObj) => {
    soundManager.playClick();
    if (submissionState === 'correct') return; // locked once correct

    // Add to answer area
    setSelectedTokens(prev => [...prev, wordObj]);
    // Remove from available bank
    setShuffledBank(prev => prev.filter(w => w.id !== wordObj.id));

    // Clear previous incorrect warning if user modifies answer
    if (submissionState === 'incorrect') {
      setSubmissionState(null);
    }
  };

  // Click a selected word in the answer area to return it to the bank
  const handleRemoveWord = (wordObj) => {
    soundManager.playClick();
    if (submissionState === 'correct') return;

    setSelectedTokens(prev => prev.filter(w => w.id !== wordObj.id));
    setShuffledBank(prev => [...prev, wordObj]);

    if (submissionState === 'incorrect') {
      setSubmissionState(null);
    }
  };

  // Reset current challenge selection
  const handleReset = () => {
    soundManager.playClick();
    if (submissionState === 'correct') return;

    const allWords = [
      ...currentChallenge.germanTokens.map((t, idx) => ({ id: `token-${idx}`, text: t })),
      ...currentChallenge.distractors.map((d, idx) => ({ id: `distractor-${idx}`, text: d }))
    ];
    setShuffledBank(shuffle(allWords));
    setSelectedTokens([]);
    setSubmissionState(null);
  };

  // Check the submitted answer
  const handleCheckAnswer = () => {
    const builtSentence = selectedTokens.map(w => w.text).join(' ');
    const targetSentence = currentChallenge.germanTokens.join(' ');

    if (builtSentence === targetSentence) {
      soundManager.playSuccess();
      setSubmissionState('correct');
      setCurrentStreak(prev => prev + 1);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#111111', '#E63946', '#FFC857']
      });

      // Award points only once per challenge to prevent repeated submission exploits
      if (!awardedChallenges.has(currentChallenge.id)) {
        onUpdateScore(100);
        setAwardedChallenges(prev => new Set(prev).add(currentChallenge.id));
      }

      // Automatically pronounce the correct German sentence
      soundManager.speakGerman(targetSentence);
    } else {
      soundManager.playError();
      setSubmissionState('incorrect');
      setCurrentStreak(0);
    }
  };

  // Go to next challenge
  const handleNextChallenge = () => {
    soundManager.playClick();
    if (currentIndex + 1 < SENTENCE_CHALLENGES.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed all 15 challenges!
      if (onGameComplete) {
        onGameComplete({
          modeName: 'Sentence Decoder',
          totalChallenges: SENTENCE_CHALLENGES.length,
          correctCount: awardedChallenges.size + (submissionState === 'correct' ? 1 : 0),
          earnedPoints: (awardedChallenges.size + (submissionState === 'correct' ? 1 : 0)) * 100
        });
      }
    }
  };

  const handleSpeakSentence = () => {
    soundManager.speakGerman(currentChallenge.germanTokens.join(' '));
  };

  const isComplete = submissionState === 'correct';
  const progressPercent = Math.round(((currentIndex + 1) / SENTENCE_CHALLENGES.length) * 100);

  return (
    <div className="bg-white rounded-3xl border-2 border-deBlack/10 shadow-card-elevated overflow-hidden p-6 sm:p-8 max-w-4xl mx-auto">
      
      {/* Top Header Row: Level Tracker, Difficulty, Streak, Score */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-deRed">
              Mode B: Sentence Decoder
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">
              {currentChallenge.difficulty}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-deBlack mt-0.5">
            Challenge {currentIndex + 1} of {SENTENCE_CHALLENGES.length}
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Current Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold">
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span>{currentStreak} Streak</span>
          </div>

          {/* Current Score */}
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

      {/* Prompt Card: English sentence to decode */}
      <div className="mt-8 bg-gradient-to-br from-gray-50 to-amber-50/40 p-6 rounded-2xl border border-gray-200">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5 mb-1">
          <HelpCircle className="w-3.5 h-3.5" />
          Translate into German:
        </span>
        <div className="text-2xl sm:text-3xl font-extrabold text-deBlack font-display tracking-tight">
          "{currentChallenge.english}"
        </div>
      </div>

      {/* Answer Construction Area */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Your German Sentence:
          </span>
          <span className="text-[11px] text-gray-400">
            {selectedTokens.length > 0 ? "Click any word to remove it" : "Click words from the pocket below"}
          </span>
        </div>

        <div className={`min-h-[76px] p-4 rounded-2xl border-2 transition-all flex flex-wrap items-center gap-2.5 ${
          submissionState === 'correct'
            ? 'border-green-500 bg-green-50/70 shadow-sm'
            : submissionState === 'incorrect'
              ? 'border-deRed bg-red-50/40'
              : 'border-dashed border-gray-300 bg-gray-50/60'
        }`}>
          {selectedTokens.length === 0 ? (
            <p className="text-gray-400 text-sm italic w-full text-center py-2">
              (Select words from the cards below to build your sentence)
            </p>
          ) : (
            selectedTokens.map((token, idx) => (
              <button
                key={token.id}
                onClick={() => handleRemoveWord(token)}
                disabled={isComplete}
                className="group relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-deBlack text-white font-bold text-base shadow-pocket hover:bg-gray-800 transition-all active:scale-95 animate-pop"
                title="Click to remove word"
              >
                <span>{token.text}</span>
                {!isComplete && (
                  <span className="text-xs text-gray-400 group-hover:text-deRed ml-0.5">✕</span>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Available Word Bank (Shuffled German word cards + distractors) */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Word Cards Bank (Red & Gold Pockets):
          </span>
          {selectedTokens.length > 0 && !isComplete && (
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-gray-500 hover:text-deRed flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Cards
            </button>
          )}
        </div>

        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-wrap items-center justify-center sm:justify-start gap-3 min-h-[80px]">
          {shuffledBank.length === 0 && selectedTokens.length > 0 && !isComplete ? (
            <span className="text-xs text-gray-400 italic">
              All word cards placed! Click "Check Answer" below.
            </span>
          ) : (
            shuffledBank.map((word) => (
              <button
                key={word.id}
                onClick={() => handleSelectWord(word)}
                disabled={isComplete}
                className="px-4 py-2.5 rounded-xl font-extrabold text-base transition-all bg-white text-deBlack border-2 border-gray-300 shadow-pocket hover:-translate-y-1 hover:border-deBlack active:translate-y-0.5 active:shadow-none hover:bg-amber-50"
              >
                {word.text}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Feedback Messages */}
      {submissionState === 'correct' && (
        <div className="mt-6 p-5 rounded-2xl bg-green-50 border-2 border-green-400 animate-fadeIn">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-extrabold text-green-800">
                  Richtig! (Correct!) +100 Points Awarded
                </h4>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xl font-bold text-deBlack">
                    {currentChallenge.germanTokens.join(' ')}
                  </span>
                  <button
                    onClick={handleSpeakSentence}
                    className="p-1.5 rounded-lg bg-green-200 hover:bg-green-300 text-green-800 transition-colors"
                    title="Listen to sentence pronunciation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-green-700 mt-0.5 font-medium">
                  English: "{currentChallenge.english}"
                </p>

                {/* Grammar Breakdown & Clue */}
                {currentChallenge.grammarTip && (
                  <div className="mt-3 p-3 bg-white/80 rounded-xl border border-green-200 text-xs text-gray-700">
                    <span className="font-bold text-green-900 block mb-1">
                      💡 Grammar & Decoder Note:
                    </span>
                    {currentChallenge.grammarTip}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {submissionState === 'incorrect' && (
        <div className="mt-6 p-4 rounded-2xl bg-red-50 border-2 border-deRed/40 animate-fadeIn">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-deRed flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-extrabold text-deRed">
                Nicht ganz! (Not quite!)
              </h4>
              <p className="text-xs text-gray-700 mt-0.5">
                The words are not in the correct German order or an extra distractor word was selected. Click any word in your answer to remove it, or use the hint below!
              </p>
              <button
                onClick={() => setShowHint(true)}
                className="mt-2 text-xs font-bold text-deRed hover:underline flex items-center gap-1"
              >
                <Lightbulb className="w-3.5 h-3.5" /> Need a hint? Show clue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Optional Hint display */}
      {showHint && !isComplete && (
        <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Clue:</span> {currentChallenge.grammarTip}
          </div>
        </div>
      )}

      {/* Action Buttons Bar */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Hint & Reset */}
        <div className="flex items-center gap-2">
          {!showHint && !isComplete && (
            <button
              onClick={() => {
                soundManager.playClick();
                setShowHint(true);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Hint</span>
            </button>
          )}

          <button
            onClick={handleReset}
            disabled={isComplete || selectedTokens.length === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* Right: Submit or Next Challenge */}
        <div>
          {isComplete ? (
            <button
              onClick={handleNextChallenge}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-sm shadow-md transition-all active:scale-95"
            >
              <span>{currentIndex + 1 < SENTENCE_CHALLENGES.length ? 'Next Challenge' : 'Complete Game'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCheckAnswer}
              disabled={selectedTokens.length === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-deRed hover:bg-deRed-dark text-white font-extrabold text-sm shadow-pocket-red disabled:opacity-50 disabled:shadow-none hover:shadow-none hover:translate-y-1 transition-all active:translate-y-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Check Answer</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
