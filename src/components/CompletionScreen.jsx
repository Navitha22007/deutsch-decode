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
  Download,
  Users
} from 'lucide-react';
import { addLeaderboardEntry, exportLeaderboardCSV } from '../utils/leaderboard';
import { soundManager } from '../utils/audio';

export default function CompletionScreen({ 
  completionData, 
  totalScore, 
  onPlayAgain, 
  onNavigateHome, 
  onExploreVocab 
}) {
  const { 
    playerName = 'Visitor',
    playerAvatar = '🇩🇪',
    levelName = 'Beginner Challenge', 
    totalQuestions = 5, 
    correctCount = 5, 
    baseScore = 500, 
    speedBonus = 100, 
    totalScore: runTotalScore = 600, 
    timeSeconds = 28 
  } = completionData;

  const [leaderboard, setLeaderboard] = useState([]);
  const [metaInfo, setMetaInfo] = useState(null);

  // AUTOMATIC REAL-TIME INSERTION INTO LEADERBOARD ON MOUNT!
  useEffect(() => {
    const res = addLeaderboardEntry({
      name: playerName,
      avatar: playerAvatar,
      score: runTotalScore,
      time: timeSeconds,
      level: levelName
    });

    setLeaderboard(res.updatedLeaderboard);
    setMetaInfo(res);

    // Continuous festive confetti
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
            Well done, {playerName}! • {levelName} Completed
          </p>

          {/* Badge */}
          <div className="mt-3 inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-deBlack text-deGold border border-deGold/40 shadow-sm">
            <Award className="w-4 h-4 text-deGold" />
            <span className="font-display font-black tracking-wider text-xs sm:text-sm">
              DEUTSCH DECODE CHAMPION
            </span>
          </div>
        </div>

        {/* Real-time Dynamic Comparison Banner */}
        {metaInfo && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-amber-300 text-center shadow-sm">
            <div className="flex items-center justify-center gap-2 text-amber-950 font-black text-base sm:text-lg">
              <span>⚡ Live Expo Ranking:</span>
              <span className="px-3 py-0.5 rounded-lg bg-deBlack text-deGold text-base font-black">
                Rank #{metaInfo.rank} of {metaInfo.totalParticipants} Participants
              </span>
            </div>
            
            <p className="text-xs text-amber-900 font-semibold mt-1.5">
              {metaInfo.totalParticipants === 1 ? (
                <span>🌟 <strong>First Participant of the Day!</strong> You are currently holding the #1 position on the expo leaderboard!</span>
              ) : metaInfo.isNewFirstPlace ? (
                <span>🏆 <strong>NEW BOOTH RECORD!</strong> You just took 1st Place from {metaInfo.previousLeader?.name || 'the previous leader'} ({metaInfo.previousLeader?.score} pts)!</span>
              ) : (
                <span>👏 Great run! You are ranked #{metaInfo.rank}. {metaInfo.previousLeader?.name} is currently leading with {metaInfo.previousLeader?.score} pts.</span>
              )}
            </p>
          </div>
        )}

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
            REAL-TIME EXPO HALL LEADERBOARD TABLE
           ======================================================== */}
        <div className="my-8 p-5 bg-gradient-to-b from-gray-50 to-amber-50/30 rounded-2xl border-2 border-gray-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-deGold-dark" />
              <h3 className="text-base font-extrabold text-deBlack font-display">
                Real-Time Expo Hall Leaderboard ({leaderboard.length} Total Visitors)
              </h3>
            </div>
            <button
              onClick={() => {
                soundManager.playClick();
                exportLeaderboardCSV();
              }}
              className="text-xs font-bold text-deRed hover:underline flex items-center gap-1 self-start sm:self-auto"
              title="Download results to Excel / CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          {/* Leaderboard Table */}
          <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
            {leaderboard.map((entry, idx) => {
              const isUser = entry.isCurrentSession;
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
                      ? 'bg-amber-200/90 border-2 border-deGold text-deBlack font-bold shadow-md scale-[1.01]' 
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 text-center font-display font-black text-sm">
                      {medal}
                    </span>
                    <span className="text-2xl">{entry.avatar || '👤'}</span>
                    <div>
                      <div className="text-sm font-bold flex items-center gap-1.5 text-deBlack">
                        <span>{entry.name}</span>
                        {isUser && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-deRed text-white shadow-sm">
                            YOU (JUST NOW)
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium">
                        {entry.level} • <span className="italic">{entry.timestamp}</span>
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
