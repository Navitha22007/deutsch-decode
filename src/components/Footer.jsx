import React from 'react';
import { Sparkles, Heart, QrCode, BookOpen, Gamepad2, ArrowUp } from 'lucide-react';
import { soundManager } from '../utils/audio';

export default function Footer({ onNavigate, onOpenQr }) {
  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-deBlack text-white border-t border-deBlack-border relative">
      {/* German Flag Tri-Color Top Accent Line */}
      <div className="flex h-1.5 w-full">
        <div className="w-1/3 bg-deBlack"></div>
        <div className="w-1/3 bg-deRed"></div>
        <div className="w-1/3 bg-deGold"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Project Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex flex-col border border-white/20">
                <div className="h-1/3 bg-deBlack"></div>
                <div className="h-1/3 bg-deRed"></div>
                <div className="h-1/3 bg-deGold"></div>
              </div>
              <span className="font-display font-black text-2xl text-white">
                DEUTSCH<span className="text-deRed ml-1">DECODE</span>
              </span>
            </div>

            <p className="text-deGold text-xs font-semibold tracking-wider uppercase">
              Learn • Decode • Discover
            </p>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              An interactive educational game created for our College German Language Expo. 
              Designed to connect hands-on physical vocabulary paper pockets with fun digital sentence decoding.
            </p>

            <div className="pt-2 text-xs text-gray-500 italic">
              "Übung macht den Meister" — Practice makes perfect.
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-300">
              Expo Navigation
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-gray-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-deGold transition-colors text-left"
                >
                  Home & Live Preview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('vocabulary')}
                  className="hover:text-deGold transition-colors text-left flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-deRed" />
                  <span>Vocabulary Explorer (91 Words)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('game')}
                  className="hover:text-deGold transition-colors text-left flex items-center gap-1.5"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-deGold" />
                  <span>Sentence Decoder Game (3 Modes)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-to-play')}
                  className="hover:text-deGold transition-colors text-left"
                >
                  How to Play Instructions
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQr}
                  className="hover:text-deGold transition-colors text-left flex items-center gap-1.5 text-deRed font-bold"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Expo QR Code & Host Guide</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Flag Colors & Physical Board Reference */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gray-300">
              Color Code Scheme
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-deBlack border border-white/20"></span>
                <span className="text-gray-300"><strong>#111111</strong> Display Board / Base</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-deRed"></span>
                <span className="text-gray-300"><strong>#E63946</strong> Verbs & People Pockets</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-deGold"></span>
                <span className="text-gray-300"><strong>#FFC857</strong> Food & Adjective Pockets</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Scroll to top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright and Credit */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© DEUTSCH DECODE — College German Language Expo Showcase</p>
          <p className="flex items-center gap-1">
            Built with React, Vite & Tailwind CSS • German pronunciation via Web Speech API
          </p>
        </div>

      </div>
    </footer>
  );
}
