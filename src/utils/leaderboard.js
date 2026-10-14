// 100% REAL-TIME EXPO HALL LEADERBOARD
// No fake or pre-populated names. Starts completely fresh.
// Every actual booth visitor is compared against previous visitors in real time!

const STORAGE_KEY = 'deutsch_decode_realtime_leaderboard';

export function getLeaderboard() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Adds an actual visitor's run, compares against all previous visitors,
 * and sorts dynamically:
 * 1. Highest Score first
 * 2. Fastest Time (seconds) on tie-breaker
 * 3. Earlier timestamp if exact tie
 */
export function addLeaderboardEntry(entry) {
  const current = getLeaderboard();
  
  // Format real-time timestamp (e.g. "8:05 AM" or "10:32 AM")
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

  const previousLeader = current.length > 0 ? current[0] : null;

  const newEntry = {
    id: `visitor-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: entry.name || 'Visitor',
    avatar: entry.avatar || '🇩🇪',
    score: Number(entry.score) || 0,
    time: Number(entry.time) || 0,
    level: entry.level || 'Beginner Challenge',
    timestamp: timeString,
    rawTime: Date.now(),
    isCurrentSession: true
  };

  // Remove current session tag from older entries
  const sanitized = current.map(item => ({ ...item, isCurrentSession: false }));

  // Compare & Sort:
  // 1st: Higher score wins
  // 2nd: Faster time wins (lower seconds)
  // 3rd: Earlier submission wins
  const updated = [...sanitized, newEntry].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (a.time !== b.time) {
      return a.time - b.time;
    }
    return a.rawTime - b.rawTime;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('LocalStorage error:', err);
  }

  const rank = updated.findIndex(item => item.id === newEntry.id) + 1;
  const isNewFirstPlace = rank === 1;
  const totalParticipants = updated.length;

  return {
    updatedLeaderboard: updated,
    rank,
    newEntryId: newEntry.id,
    isNewFirstPlace,
    previousLeader,
    totalParticipants
  };
}

/**
 * Clear the leaderboard (useful for expo organizers starting a fresh morning session)
 */
export function clearLeaderboard() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn(err);
  }
  return [];
}

/**
 * Export results as CSV file for college records / expo certificates
 */
export function exportLeaderboardCSV() {
  const entries = getLeaderboard();
  if (entries.length === 0) return false;

  const header = ['Rank', 'Name', 'Score', 'Time (s)', 'Level', 'Time Recorded'];
  const rows = entries.map((e, idx) => [
    idx + 1,
    `"${e.name.replace(/"/g, '""')}"`,
    e.score,
    e.time,
    `"${e.level}"`,
    `"${e.timestamp}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [header.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `deutsch_decode_expo_results_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  return true;
}
