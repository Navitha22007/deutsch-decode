import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Sparkles, 
  User, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import PlayerRegistration from './PlayerRegistration';
import BeginnerGameView from './BeginnerGameView';
import CompletionScreen from './CompletionScreen';
import LeaderboardModal from './LeaderboardModal';
import { GAME_LEVELS } from '../data/challenges';
import { soundManager } from '../utils/audio';

export default function GameHub({ 
  totalScore, 
  setTotalScore, 
  onNavigateHome, 
  onExploreVocab 
}) {
  // Player session info
  const [playerInfo, setPlayerInfo] = useState(() => {
    try {
      const savedName = localStorage.getItem('deutsch_decode_player_name');
      return savedName ? { playerName: savedName, playerAvatar: '🇩🇪' } : null;
    } catch {
      return null;
    }
  });

  // Current view in GameHub: 'register' | 'playing' | 'completion'
  const [gameState, setGameState] = useState('register');
  const [activeLevelId, setActiveLevelId] = useState('level1');
  const [completionData, setCompletionData] = useState(null);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  const selectedLevel = GAME_LEVELS.find(lvl => lvl.id === activeLevelId) || GAME_LEVELS[0];

  // Called when visitor submits name on registration screen
  const handleStartGame = ({ playerName, playerAvatar, levelId }) => {
    setPlayerInfo({ playerName, playerAvatar });
    setActiveLevelId(levelId);
    setCompletionData(null);
    setGameState('playing');
  };

  // Called when all 5 questions are answered
  const handleGameComplete = (data) => {
    soundManager.playVictory();
    setCompletionData(data);
    setGameState('completion');
    setTotalScore(prev => prev + (data.totalScore || 100));
  };

  const handlePlayAgain = () => {
    soundManager.playClick();
    // Advance to next level automatically or loop back
    const currentIndex = GAME_LEVELS.findIndex(l => l.id === activeLevelId);
    const nextIndex = (currentIndex + 1) % GAME_LEVELS.length;
    setActiveLevelId(GAME_LEVELS[nextIndex].id);
    setCompletionData(null);
    setGameState('playing');
  };

  const handleChangePlayer = () => {
    soundManager.playClick();
    setGameState('register');
    setCompletionData(null);
  };

  // 1. Completion Screen with automatic live Leaderboard
  if (gameState === 'completion' && completionData) {
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

  // 2. Active 5-Question Game Screen
  if (gameState === 'playing' && selectedLevel) {
    return (
      <BeginnerGameView
        levelData={selectedLevel}
        playerInfo={playerInfo}
        onNavigateHome={onNavigateHome}
        onGameComplete={handleGameComplete}
      />
    );
  }

  // 3. Player Registration / Check-In Screen
  return (
    <section className="py-8 sm:py-12 bg-deCream min-h-screen">
      <PlayerRegistration
        defaultLevel={activeLevelId}
        onStartGame={handleStartGame}
        onViewLeaderboard={() => setIsLeaderboardOpen(true)}
      />

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />
    </section>
  );
}
