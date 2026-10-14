import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  BookOpen, 
  Award, 
  Sparkles, 
  Timer, 
  Zap, 
  CheckCircle2, 
  UserPlus, 
  Medal,
  ArrowRight
} from 'lucide-react';
import { soundManager } from '../utils/audio';

// Default initial expo hall leaderboard entries
const INITIAL_LEADERBOARD = [
  { id: 'lb-1', name: 'Lukas S. (Visitor #12)', score: 650, time: 22, level: 'Level 1', date: 'Expo Day 1' },
  { id: 'lb-2', name: 'Ananya R. (CSE Dept)', score: 600, time: 28, level: 'Level 2', date: 'Expo Day 1' },
  { id: 'lb-3', name: 'David K. (Visitor #34)', score: 580, time: 31, level: 'Level 1', date: 'Expo Day 1' },
  { id: 'lb-4', name: 'Priya M. (Lang Club)', score: 550, time: 38, level: 'Level 4', date: 'Expo Day 1' },
  { id: 'lb-5', name: 'Marco B. (Visitor #08)', score: 500, time: 44, level: 'Level 3', date: 'Expo Day 1' }
];

export default function CompletionScreen({ 
  completionData, 
  totalScore, 
  onPlayAgain, 
  onNavigateHome, 
  onExploreVocab 
}) {
  const { 
    levelName = 'Beginner Challenge', 
    totalQuestions = 5, 
    correctCount = 5, 
    baseScore = 500, 
    speedBonus = 100, 
    totalScore: runTotalScore = 600, 
    timeSeconds = 28 
  } = completionData;

  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [hasSavedName, setHasSavedName] = useState(false);
  const [userRank, setUserRank] = useState(null);

  // Load leaderboard from localStorage or initialize with defaults
  useEffect(() => {
    try {
      const stored = localStorage.getItem('deutsch_decode_expo_leaderboard');
      if (stored) {
        setLeaderboard(JSON.parse(stored));
      } else {
        setLeaderboard(INITIAL_LEADERBOARD);
        localStorage.setItem('deutsch_decode_expo_leaderboard', JSON.stringify(INITIAL_LEADERBOARD));
      }
    } catch {
      setLeaderboard(INITIAL_LEADERBOARD);
    }
  }, []);

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

  // Handle saving name to leaderboard
  const handleSaveToLeaderboard = (e) => {
    e.preventDefault();
    if (!playerName.trim() || hasSavedName) return;

    soundManager.playSuccess();
    const newEntry = {
      id: `user-${Date.now()}`,
      name: playerName.trim(),
      score: runTotalScore,
      time: timeSeconds,
      level: levelName,
      date: 'Just now',
      isCurrentUser: true
    };

    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score || a.time - b.time);

    setLeaderboard(updated);
    setHasSavedName(true);

    const rankIdx = updated.findIndex(item => item.id === newEntry.id);
    setUserRank(rankIdx + 1);

    try {
      localStorage.setItem('deutsch_decode_expo_leaderboard', JSON.stringify(updated.slice(0, 10)));
    } catch {
      // ignore
    }
  };

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="bg-white rounded-3xl border-2 border-deBlack/15 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
        
        {/* German Flag Tri-Color Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 flex h-2 w-full">
          <div className="w-1/3 bg-deBlack"></div>
          <div className="w-1/3 bg-deRed"></div>
          <div className="w-1/3 bg-deGold"></div>
        </div>

        {/* Top Header */}
        <div className="text-center mt-2 mb-6">
          <div className="relative inline-block mb-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-200 border-4 border-white shadow-xl flex items-center justify-center mx-auto text-deBlack">
              <Trophy className="w-10 h-10 text-deBlack fill-deBlack/10" />
            </div>
            <span className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-deRed text-white shadow-md">
              <Sparkles className="w-3.5 h-3.5 fill-white" />
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-black text-deBlack tracking-tight">
            DU HAST ES GESCHAFFT!
          </h1>
          <p className="text-base sm:text-lg font-bold text-deRed mt-0.5">
            You did it! • {levelName} Completed
          </p>

          {/* Badge */}
          <div className="mt-3 inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-deBlack text-deGold border border-deGold/40 shadow-sm">
            <Award className="w-4 h-4 text-deGold" />
            <span className="font-display font-black tracking-wider text-xs sm:text-sm">
              DEUTSCH DECODE CHAMPION
            </span>
          </div>
        </div>

        {/* Performance & Speed Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
          
          <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Final Score
            </span>
            <div className="text-2xl font-black text-deBlack font-display">
              {runTotalScore}
            </div>
            <span className="text-[10px] text-gray-500 font-semibold">points</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Time Taken
            </span>
            <div className="text-2xl font-black text-blue-600 font-display flex items-center justify-center gap-1">
              <Timer className="w-5 h-5 text-blue-500" />
              <span>{timeSeconds}s</span>
            </div>
            <span className="text-[10px] text-gray-500 font-semibold">
              {timeSeconds <= 30 ? '⚡ Ultra Fast' : '⏱️ Great Pace'}
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Speed Bonus
            </span>
            <div className="text-2xl font-black text-amber-500 font-display flex items-center justify-center gap-1">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>+{speedBonus}</span>
            </div>
            <span className="text-[10px] text-gray-500 font-semibold">speed boost</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Accuracy
            </span>
            <div className="text-2xl font-black text-green-600 font-display">
              {correctCount}/{totalQuestions}
            </div>
            <span className="text-[10px] text-gray-500 font-semibold">{percentage}% correct</span>
          </div>

        </div>

        {/* ========================================================
            EXPO HALL LEADERBOARD SECTION
           ======================================================== */}
        <div className="my-8 p-5 bg-gradient-to-b from-gray-50 to-amber-50/30 rounded-2xl border-2 border-gray-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-deGold-dark" />
              <h3 className="text-base font-extrabold text-deBlack font-display">
                College Expo Hall Leaderboard (Top 5)
              </h3>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              Ranked by Score + Fast Completion
            </span>
          </div>

          {/* Name Input Form for Visitor */}
          {!hasSavedName ? (
            <form onSubmit={handleSaveToLeaderboard} className="mb-5 p-3.5 bg-white rounded-xl border border-deGold/50 shadow-sm">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                🎉 Put your name on our Expo Display Stand Leaderboard:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter your name or team (e.g. Alex, Team Alpha)"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="flex-1 px-3.5 py-2 text-xs sm:text-sm font-semibold border border-gray-300 rounded-xl focus:border-deRed focus:ring-1 focus:ring-deRed"
                  maxLength={24}
                />
                <button
                  type="submit"
                  disabled={!playerName.trim()}
                  className="px-4 py-2 rounded-xl bg-deRed hover:bg-deRed-dark text-white font-bold text-xs sm:text-sm shadow-sm transition-all disabled:opacity-40 flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Join Board</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="mb-4 p-3 bg-green-50 border border-green-300 rounded-xl text-xs font-bold text-green-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                Score saved! You are currently ranked #{userRank} on the Expo Leaderboard!
              </span>
            </div>
          )}

          {/* Leaderboard Table */}
          <div className="space-y-2">
            {leaderboard.slice(0, 5).map((entry, idx) => {
              const isUser = entry.isCurrentUser;
              let medal = null;
              if (idx === 0) medal = '🥇';
              else if (idx === 1) medal = '🥈';
              else if (idx === 2) medal = '🥉';
              else medal = `#${idx + 1}`;

              return (
                <div
                  key={entry.id || idx}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                    isUser 
                      ? 'bg-amber-100/80 border-2 border-deGold text-deBlack font-bold shadow-sm' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 text-center font-display font-black text-sm">
                      {medal}
                    </span>
                    <div>
                      <div className="text-sm font-bold flex items-center gap-1.5">
                        <span>{entry.name}</span>
                        {isUser && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-black uppercase bg-deRed text-white">
                            You
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {entry.level}
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <Timer className="w-3 h-3 text-gray-400" /> {entry.time}s
                    </span>
                    <span className="text-base font-black text-deBlack font-display">
                      {entry.score} <span className="text-[10px] font-normal text-gray-500">pts</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Action Buttons: Play Again, Return Home, Explore Vocab */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              soundManager.playClick();
              onPlayAgain();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-deRed hover:bg-deRed-dark text-white font-black text-sm shadow-pocket-red transition-all active:translate-y-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Next Level</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onExploreVocab();
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-deGold hover:bg-deGold-dark text-deBlack font-black text-sm shadow-pocket-gold transition-all active:translate-y-1"
          >
            <BookOpen className="w-4 h-4" />
            <span>Review Vocabulary</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onNavigateHome();
            }}
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
