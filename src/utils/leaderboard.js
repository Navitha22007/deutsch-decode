// Real-time Expo Hall Leaderboard Manager

const STORAGE_KEY = 'deutsch_decode_expo_leaderboard';

const DEFAULT_LEADERBOARD = [
  { id: 'lb-1', name: 'Lukas S.', avatar: '🇩🇪', score: 650, time: 22, level: 'Level 1: Look & Learn', date: 'Expo Day 1' },
  { id: 'lb-2', name: 'Ananya R.', avatar: '🌟', score: 600, time: 28, level: 'Level 2: Picture Match', date: 'Expo Day 1' },
  { id: 'lb-3', name: 'David K.', avatar: '🥨', score: 580, time: 31, level: 'Level 1: Look & Learn', date: 'Expo Day 1' },
  { id: 'lb-4', name: 'Priya M.', avatar: '🎓', score: 550, time: 38, level: 'Level 4: Sentence Builder', date: 'Expo Day 1' },
  { id: 'lb-5', name: 'Marco B.', avatar: '⚽', score: 500, time: 44, level: 'Level 3: Complete Word', date: 'Expo Day 1' }
];

export function getLeaderboard() {
  if (typeof window === 'undefined') return DEFAULT_LEADERBOARD;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LEADERBOARD));
      return DEFAULT_LEADERBOARD;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_LEADERBOARD;
  } catch {
    return DEFAULT_LEADERBOARD;
  }
}

export function addLeaderboardEntry(entry) {
  const current = getLeaderboard();
  const newEntry = {
    id: `entry-${Date.now()}`,
    name: entry.name || 'Anonymous Visitor',
    avatar: entry.avatar || '🇩🇪',
    score: Number(entry.score) || 0,
    time: Number(entry.time) || 0,
    level: entry.level || 'Beginner Challenge',
    date: 'Just now',
    isCurrentSession: true
  };

  // Remove previous session highlights
  const sanitized = current.map(item => ({ ...item, isCurrentSession: false }));

  // Insert and sort: highest score first, then lowest time (faster is better)
  const updated = [...sanitized, newEntry]
    .sort((a, b) => b.score - a.score || a.time - b.time);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 20)));
  } catch (err) {
    console.warn('LocalStorage error:', err);
  }

  const rank = updated.findIndex(item => item.id === newEntry.id) + 1;
  return { updatedLeaderboard: updated, rank, newEntryId: newEntry.id };
}

export function resetLeaderboard() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LEADERBOARD));
  } catch (err) {
    console.warn(err);
  }
  return DEFAULT_LEADERBOARD;
}
