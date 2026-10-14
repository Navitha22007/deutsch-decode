import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Volume2, 
  Eye, 
  EyeOff, 
  X, 
  Sparkles, 
  Tag, 
  BookOpen,
  HelpCircle,
  Filter,
  Check
} from 'lucide-react';
import { VOCABULARY_CATEGORIES, VOCABULARY_ITEMS } from '../data/vocabulary';
import { soundManager } from '../utils/audio';

export default function VocabularyExplorer() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hideAllEnglish, setHideAllEnglish] = useState(false);
  const [revealedCardIds, setRevealedCardIds] = useState(new Set());
  const [playingWordId, setPlayingWordId] = useState(null);

  // Filtered vocabulary items
  const filteredWords = useMemo(() => {
    return VOCABULARY_ITEMS.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.german.toLowerCase().includes(q) ||
        (item.displayGerman && item.displayGerman.toLowerCase().includes(q)) ||
        item.english.toLowerCase().includes(q) ||
        (item.type && item.type.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Handle German text-to-speech
  const handleSpeak = (item) => {
    soundManager.playClick();
    setPlayingWordId(item.id);
    const spokenText = item.displayGerman || item.german;
    soundManager.speakGerman(spokenText);
    setTimeout(() => {
      setPlayingWordId(null);
    }, 1200);
  };

  // Toggle single card reveal in Flashcard Mode
  const toggleSingleReveal = (id) => {
    soundManager.playClick();
    setRevealedCardIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleHideAll = () => {
    soundManager.playClick();
    setHideAllEnglish(!hideAllEnglish);
    setRevealedCardIds(new Set());
  };

  return (
    <section id="vocabulary-section" className="py-12 md:py-16 bg-deCream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-deRed/10 border border-deRed/20 text-deRed text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Physical Pocket Vocabulary Bank</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-deBlack tracking-tight">
            Vocabulary Explorer
          </h2>
          <p className="mt-2 text-base sm:text-lg text-gray-600">
            Browse words from our physical expo chart pockets. Listen to correct German pronunciation, test your recall with flashcard mode, and prepare for the challenges!
          </p>

          {/* Word Count Indicator Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-semibold text-gray-800">
            <span className="w-2.5 h-2.5 rounded-full bg-deGold animate-pulse"></span>
            <span>Total Available Words:</span>
            <span className="px-2 py-0.5 rounded-md bg-deBlack text-white text-xs font-bold">
              {VOCABULARY_ITEMS.length} Words
            </span>
          </div>
        </div>

        {/* Search Bar & Global Flashcard Mode Toggle */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-card-elevated border border-deCream-border mb-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search German words, English meanings, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 focus:border-deRed focus:ring-2 focus:ring-deRed/20 text-sm font-medium bg-gray-50 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Flashcard / Study Mode Toggle */}
            <button
              onClick={toggleHideAll}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all border ${
                hideAllEnglish
                  ? 'bg-deBlack text-deGold border-deBlack shadow-md'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
              }`}
              title="Toggle English visibility for memory recall practice"
            >
              {hideAllEnglish ? (
                <>
                  <EyeOff className="w-4 h-4 text-deGold" />
                  <span>Study Mode: English Hidden</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 text-gray-500" />
                  <span>Hide English (Study Mode)</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              Categories ({VOCABULARY_CATEGORIES.length - 1} Expo Pockets)
            </span>
            <span className="text-xs font-semibold text-gray-500">
              Showing {filteredWords.length} of {VOCABULARY_ITEMS.length} words
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin">
            {VOCABULARY_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? VOCABULARY_ITEMS.length 
                : VOCABULARY_ITEMS.filter(w => w.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedCategory(cat.id);
                  }}
                  className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border ${
                    isActive
                      ? 'bg-deBlack text-white border-deBlack shadow-pocket'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-deGold text-deBlack' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Word Cards Grid styled like Physical Pocket Cards */}
        {filteredWords.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm max-w-md mx-auto">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-800">No words found</h3>
            <p className="text-sm text-gray-500 mt-1">
              Try a different search term or select another category pocket.
            </p>
            <button
              onClick={() => {
                soundManager.playClick();
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-deBlack text-white rounded-lg text-xs font-bold hover:bg-gray-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredWords.map((item) => {
              const isEnglishHidden = hideAllEnglish && !revealedCardIds.has(item.id);
              const isPlaying = playingWordId === item.id;
              const tabColorClass = 
                item.pocketColor === 'red' ? 'pocket-tab-red' :
                item.pocketColor === 'gold' ? 'pocket-tab-gold' : 'pocket-tab-black';

              return (
                <div
                  key={item.id}
                  className={`pocket-card bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between ${tabColorClass}`}
                >
                  {/* Top metadata row: Part of Speech & Audio Button */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 border border-gray-200">
                      {item.type}
                    </span>

                    {/* German Audio Pronunciation Speaker Button */}
                    <button
                      onClick={() => handleSpeak(item)}
                      className={`p-2 rounded-lg transition-all ${
                        isPlaying 
                          ? 'bg-deRed text-white scale-110 shadow-sm' 
                          : 'bg-gray-100 hover:bg-deRed hover:text-white text-gray-700'
                      }`}
                      title={`Listen to pronunciation for "${item.german}"`}
                      aria-label={`Pronounce ${item.german}`}
                    >
                      <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
                    </button>
                  </div>

                  {/* German Word (Prominent) with Umlauts */}
                  <div className="mb-3">
                    <div className="text-xl sm:text-2xl font-extrabold text-deBlack tracking-tight font-display">
                      {item.german}
                    </div>
                    {item.pronunciation && (
                      <div className="text-xs text-gray-500 font-medium tracking-wide mt-0.5">
                        <span className="text-[10px] uppercase font-bold text-gray-400 mr-1">Say:</span>
                        {item.pronunciation}
                      </div>
                    )}
                  </div>

                  {/* English Meaning Section (with Flashcard Reveal functionality) */}
                  <div className="pt-3 border-t border-gray-100 mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Meaning:
                      </span>
                      {hideAllEnglish && (
                        <button
                          onClick={() => toggleSingleReveal(item.id)}
                          className="text-[11px] font-bold text-deRed hover:underline flex items-center gap-1"
                        >
                          {isEnglishHidden ? 'Click to Reveal' : 'Hide'}
                        </button>
                      )}
                    </div>

                    {isEnglishHidden ? (
                      <button
                        onClick={() => toggleSingleReveal(item.id)}
                        className="w-full py-2 bg-gray-50 hover:bg-gray-100 rounded-lg border border-dashed border-gray-300 text-center text-xs text-gray-500 font-semibold transition-colors"
                      >
                        ❓ Click to reveal English
                      </button>
                    ) : (
                      <div className="text-sm font-bold text-gray-800 bg-amber-50/60 p-2 rounded-lg border border-amber-200/50">
                        {item.english}
                      </div>
                    )}
                  </div>

                  {/* Example Context / Physical Board pocket link */}
                  {item.example && (
                    <div className="mt-3 pt-2 text-[11px] text-gray-500 border-t border-gray-100 flex items-start gap-1.5">
                      <span className="font-bold text-deRed">•</span>
                      <div>
                        <span className="font-medium text-gray-700 italic">"{item.example}"</span>
                        <span className="block text-gray-400 text-[10px]">({item.exampleEn})</span>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
