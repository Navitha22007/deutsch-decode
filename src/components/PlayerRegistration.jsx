import React, { useState } from 'react';
import { 
  Sparkles, 
  Trophy, 
  ArrowRight, 
  User, 
  Layers, 
  CheckCircle2, 
  HelpCircle,
  Timer
} from 'lucide-react';
import { GAME_LEVELS } from '../data/challenges';
import { getLeaderboard } from '../utils/leaderboard';
import { soundManager } from '../utils/audio';

const AVATARS = [
  { id: 'de', emoji: '🇩🇪', label: 'Detective' },
  { id: 'pretzel', emoji: '🥨', label: 'Brezel' },
  { id: 'eagle', emoji: '🦅', label: 'Eagle' },
  { id: 'ball', emoji: '⚽', label: 'Footballer' },
  { id: 'student', emoji: '🎓', label: 'Scholar' },
  { id: 'star', emoji: '🌟', label: 'Star' }
];

export default function PlayerRegistration({ 
  onStartGame, 
  defaultLevel = 'level1',
  onViewLeaderboard 
}) {
  const [name, setName] = useState(() => {
    try {
      return localStorage.getItem('deutsch_decode_player_name') || '';
    } catch {
      return '';
    }
  });
  const [selectedAvatar, setSelectedAvatar] = useState('🇩🇪');
  const [selectedLevelId, setSelectedLevelId] = useState(defaultLevel);

  // Get current #1 top score from leaderboard
  const leaderboard = getLeaderboard();
  const topPlayer = leaderboard[0] || null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalName = name.trim() || 'Visitor ' + Math.floor(100 + Math.random() * 900);
    
    try {
      localStorage.setItem('deutsch_decode_player_name', finalName);
    } catch {
      // ignore
    }

    soundManager.playSuccess();
    onStartGame({
      playerName: finalName,
      playerAvatar: selectedAvatar,
      levelId: selectedLevelId
    });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="bg-white rounded-3xl border-2 border-deBlack/15 shadow-2xl p-6 sm:p-8 relative overflow-hidden">
        
        {/* German Flag Tri-Color Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 flex h-2 w-full">
          <div className="w-1/3 bg-deBlack"></div>
          <div className="w-1/3 bg-deRed"></div>
          <div className="w-1/3 bg-deGold"></div>
        </div>

        {/* Header */}
        <div className="text-center mt-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-deRed/10 border border-deRed/20 text-deRed text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Expo Visitor Check-In</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-deBlack tracking-tight">
            Willkommen bei DEUTSCH DECODE!
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Enter your name to track your score live on our Expo Hall Leaderboard.
          </p>
        </div>

        {/* Current #1 Champion Banner */}
        {topPlayer && (
          <div className="mb-6 p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <span className="text-xl">{topPlayer.avatar || '🏆'}</span>
              <div>
                <span className="font-bold text-deBlack">Current Hall Leader:</span>{' '}
                <span className="font-extrabold text-deRed">{topPlayer.name}</span>
                <span className="block text-[10px] text-gray-500">
                  {topPlayer.score} pts in {topPlayer.time}s ({topPlayer.level})
                </span>
              </div>
            </div>
            {onViewLeaderboard && (
              <button
                type="button"
                onClick={onViewLeaderboard}
                className="text-xs font-bold text-deRed hover:underline flex items-center gap-1"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>View All</span>
              </button>
            )}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Your Name or Team Name:
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                maxLength={25}
                placeholder="e.g. Alex, Team Alpha, Priya (CSE)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border-2 border-gray-300 focus:border-deRed focus:ring-2 focus:ring-deRed/20 text-sm font-bold bg-gray-50 focus:bg-white transition-all placeholder:font-normal placeholder:text-gray-400"
                autoFocus
              />
            </div>
          </div>

          {/* Choose Avatar */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Choose Your Expo Badge Icon:
            </label>
            <div className="grid grid-cols-6 gap-2">
              {AVATARS.map((av) => {
                const isSelected = selectedAvatar === av.emoji;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedAvatar(av.emoji);
                    }}
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      isSelected 
                        ? 'border-deRed bg-deRed/10 scale-105 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                    title={av.label}
                  >
                    <span className="text-2xl block">{av.emoji}</span>
                    <span className="text-[9px] font-bold text-gray-500 block truncate mt-0.5">
                      {av.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Choose Starting Level */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Select Your Challenge Level (5 Questions):
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {GAME_LEVELS.map((lvl) => {
                const isSelected = selectedLevelId === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedLevelId(lvl.id);
                    }}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      isSelected 
                        ? 'border-deBlack bg-deBlack text-white shadow-pocket' 
                        : 'border-gray-200 hover:border-gray-400 bg-white text-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-extrabold mb-0.5">
                      <span>Level {lvl.levelNum}</span>
                      {isSelected && <span className="text-deGold text-[10px]">SELECTED</span>}
                    </div>
                    <div className="text-xs font-bold truncate">
                      {lvl.title}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                      {lvl.badge}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Big Start Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-deRed hover:bg-deRed-dark text-white font-display font-black text-lg shadow-pocket-red transition-all active:translate-y-1.5 flex items-center justify-center gap-2 mt-4"
          >
            <span>START GAME NOW (5 QUESTIONS)</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-center text-[11px] text-gray-400 font-medium">
            ⏱️ Fast answers earn up to +150 Speed Bonus points on the Leaderboard!
          </p>

        </form>

      </div>
    </div>
  );
}
