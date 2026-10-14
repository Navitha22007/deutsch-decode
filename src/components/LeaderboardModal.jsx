import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  X, 
  Timer, 
  RotateCcw, 
  Sparkles, 
  Award,
  Trash2,
  Check
} from 'lucide-react';
import { getLeaderboard, resetLeaderboard } from '../utils/leaderboard';
import { soundManager } from '../utils/audio';

export default function LeaderboardModal({ isOpen, onClose }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setLeaderboard(getLeaderboard());
      setShowConfirmReset(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleReset = () => {
    soundManager.playClick();
    const defaults = resetLeaderboard();
    setLeaderboard(defaults);
    setShowConfirmReset(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border-2 border-deBlack/20 relative my-8">
        
        {/* German Flag Tri-Color Top Accent Line */}
        <div className="flex h-2 w-full">
          <div className="w-1/3 bg-deBlack"></div>
          <div className="w-1/3 bg-deRed"></div>
          <div className="w-1/3 bg-deGold"></div>
        </div>

        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-gray-50/60">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-deGold-dark" />
            <h3 className="text-lg font-display font-black text-deBlack">
              Expo Hall of Fame • Live Leaderboard
            </h3>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Ranked in real-time by Total Score + Fast Time</span>
            <span className="font-bold text-deRed">Top Decoders</span>
          </div>

          {/* Leaderboard Entries List */}
          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {leaderboard.map((entry, idx) => {
              const isCurrent = entry.isCurrentSession;
              let medal = null;
              if (idx === 0) medal = '🥇';
              else if (idx === 1) medal = '🥈';
              else if (idx === 2) medal = '🥉';
              else medal = `#${idx + 1}`;

              return (
                <div
                  key={entry.id || idx}
                  className={`flex items-center justify-between p-3.5 rounded-2xl transition-all ${
                    isCurrent
                      ? 'bg-amber-100 border-2 border-deGold text-deBlack font-bold shadow-md'
                      : idx === 0
                        ? 'bg-yellow-50/70 border border-yellow-200'
                        : 'bg-gray-50 border border-gray-200 text-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 text-center font-display font-black text-base">
                      {medal}
                    </span>
                    <span className="text-2xl">{entry.avatar || '👤'}</span>
                    <div>
                      <div className="text-sm font-extrabold flex items-center gap-1.5 text-deBlack">
                        <span>{entry.name}</span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-deRed text-white">
                            YOU
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-gray-500 font-medium">
                        {entry.level} • <span className="italic">{entry.date}</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-black text-deBlack font-display">
                      {entry.score} <span className="text-[10px] font-normal text-gray-500">pts</span>
                    </div>
                    <div className="text-xs text-gray-500 font-semibold flex items-center justify-end gap-1">
                      <Timer className="w-3 h-3 text-gray-400" />
                      <span>{entry.time}s</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset Leaderboard Controls for Presenters */}
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
            {showConfirmReset ? (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-deRed font-bold">Reset to defaults?</span>
                <button
                  onClick={handleReset}
                  className="px-2.5 py-1 bg-deRed text-white rounded-lg font-bold"
                >
                  Yes, Reset
                </button>
                <button
                  onClick={() => setShowConfirmReset(false)}
                  className="px-2.5 py-1 bg-gray-200 text-gray-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirmReset(true)}
                className="text-[11px] text-gray-400 hover:text-deRed flex items-center gap-1 transition-colors"
                title="Reset leaderboard for a new session"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Demo Scores</span>
              </button>
            )}

            <button
              onClick={() => {
                soundManager.playClick();
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-deBlack text-white text-xs font-bold hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
