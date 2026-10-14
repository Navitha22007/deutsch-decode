import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX, 
  QrCode, 
  BookOpen, 
  Gamepad2, 
  HelpCircle, 
  Sparkles, 
  Menu, 
  X,
  Trophy
} from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  totalScore, 
  onOpenQr,
  soundMuted,
  setSoundMuted 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tabId) => {
    soundManager.playClick();
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSound = () => {
    const isMuted = soundManager.toggleMute();
    setSoundMuted(isMuted);
    if (!isMuted) {
      soundManager.playClick();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-deBlack text-white border-b border-deBlack-border shadow-md">
      {/* German Flag Tri-Color Top Accent Line */}
      <div className="flex h-1.5 w-full">
        <div className="w-1/3 bg-deBlack"></div>
        <div className="w-1/3 bg-deRed"></div>
        <div className="w-1/3 bg-deGold"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          {/* Brand Logo & Tagline */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            title="DEUTSCH DECODE Home"
          >
            {/* German Shield Badge */}
            <div className="relative w-10 h-10 rounded-lg overflow-hidden flex flex-col border border-white/20 shadow-md group-hover:scale-105 transition-transform">
              <div className="h-1/3 bg-deBlack"></div>
              <div className="h-1/3 bg-deRed flex items-center justify-center">
                <span className="text-[9px] font-black tracking-widest text-white">DE</span>
              </div>
              <div className="h-1/3 bg-deGold"></div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white group-hover:text-deGold transition-colors">
                  DEUTSCH<span className="text-deRed ml-1">DECODE</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-deGold/20 text-deGold rounded border border-deGold/30">
                  Expo Edition
                </span>
              </div>
              <p className="text-[11px] font-medium text-gray-400 tracking-wider">
                Learn • Decode • Discover
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-white/10 text-deGold shadow-inner'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('vocabulary')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'vocabulary'
                  ? 'bg-deRed text-white shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Vocabulary</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-white/20 text-white">
                91
              </span>
            </button>

            <button
              onClick={() => handleNavClick('game')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'game'
                  ? 'bg-deGold text-deBlack font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Play Game</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-deBlack/20 text-deBlack">
                3 Modes
              </span>
            </button>

            <button
              onClick={() => handleNavClick('how-to-play')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'how-to-play'
                  ? 'bg-white/10 text-deGold shadow-inner'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>How to Play</span>
            </button>
          </nav>

          {/* Controls: Score Pill, Sound Toggle, QR Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Score Pill */}
            <div 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-deBlack-light border border-deGold/30 text-deGold text-xs sm:text-sm font-bold shadow-sm"
              title="Current Visitor Score"
            >
              <Trophy className="w-4 h-4 text-deGold animate-pulse" />
              <span>{totalScore} <span className="text-[10px] text-gray-400 font-normal">pts</span></span>
            </div>

            {/* Sound Mute Toggle */}
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-lg text-gray-300 hover:text-white transition-colors border ${
                soundMuted 
                  ? 'border-gray-700 bg-gray-800/50 text-gray-500' 
                  : 'border-deGold/40 bg-deGold/10 text-deGold'
              }`}
              title={soundMuted ? 'Unmute Audio (Speech & Sounds)' : 'Mute Audio'}
              aria-label={soundMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Expo QR Code Modal Launcher */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenQr();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-deRed hover:bg-deRed-dark text-white text-xs font-bold transition-all shadow-md active:translate-y-0.5"
              title="Show QR Code for Expo Visitors"
            >
              <QrCode className="w-4 h-4" />
              <span>Expo QR</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white bg-white/5"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-deBlack-card border-b border-deBlack-border px-4 py-4 space-y-2 animate-fadeIn">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'home' ? 'bg-white/10 text-deGold' : 'text-gray-300'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('vocabulary')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'vocabulary' ? 'bg-deRed text-white' : 'text-gray-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Vocabulary Explorer
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-white/20">91 words</span>
          </button>
          <button
            onClick={() => handleNavClick('game')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'game' ? 'bg-deGold text-deBlack font-bold' : 'text-gray-300'
            }`}
          >
            <span className="flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              Play Game (3 Modes)
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-deBlack/20">Play</span>
          </button>
          <button
            onClick={() => handleNavClick('how-to-play')}
            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium ${
              activeTab === 'how-to-play' ? 'bg-white/10 text-deGold' : 'text-gray-300'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            How to Play
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenQr();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-deRed text-white text-sm font-bold"
          >
            <QrCode className="w-4 h-4" />
            Display QR Code for Visitors
          </button>
        </div>
      )}
    </header>
  );
}
