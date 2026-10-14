// 100% REAL-TIME EXPO HALL LEADERBOARD & CENTRALIZED DATABASE
// No fake or pre-populated names. Starts completely fresh.
// Every actual booth visitor is stored in data/leaderboard.json and compared in real time!

const STORAGE_KEY = 'deutsch_decode_realtime_leaderboard';

/**
 * Synchronous read from local storage / cache for instant UI rendering
 */
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
 * Fetch the latest live leaderboard from the central server database (/api/leaderboard)
 * Syncs response to localStorage cache so mobile devices and host laptop stay in sync.
 */
export async function fetchLeaderboard() {
  try {
    const res = await fetch('/api/leaderboard', { cache: 'no-cache' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch {
          // ignore localStorage quotas
        }
        return data;
      }
    }
  } catch (err) {
    console.warn('Backend fetch failed, using local storage cache:', err);
  }
  return getLeaderboard();
}

/**
 * Submits an actual visitor's run to the centralized database (/api/leaderboard).
 * 
 * Rules:
 * 1. ONE official entry per student name (deduplicates & updates personal best).
 * 2. 1st comparison: Highest Score wins.
 * 3. 2nd comparison: Fastest Time (seconds) on tie-breaker.
 * 4. 3rd comparison: Earlier registration timestamp.
 * 
 * Falls back seamlessly to LocalStorage if offline.
 */
export async function addLeaderboardEntry(entry) {
  const name = (entry.name || 'Visitor').trim();
  const avatar = entry.avatar || '🇩🇪';
  const score = Number(entry.score) || 0;
  const time = Number(entry.time) || 0;
  const level = entry.level || 'Beginner Challenge';

  // Format real-time timestamp (e.g. "8:05 AM" or "10:32 AM")
  const now = new Date();
  const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

  // 1. Try sending to centralized backend API
  try {
    const response = await fetch('/api/leaderboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        avatar,
        score,
        time,
        level
      })
    });

    if (response.ok) {
      const result = await response.json();
      if (result && result.leaderboard) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(result.leaderboard));
        } catch {
          // ignore
        }
        return {
          updatedLeaderboard: result.leaderboard,
          rank: result.rank,
          isNewFirstPlace: result.isNewFirstPlace,
          isPersonalBest: result.isPersonalBest,
          isNewParticipant: result.isNewParticipant,
          previousLeader: result.previousLeader,
          totalParticipants: result.totalParticipants
        };
      }
    }
  } catch (apiErr) {
    console.warn('API submission failed, falling back to local database engine:', apiErr);
  }

  // 2. Offline / LocalStorage fallback with identical deduplication & ranking logic
  const current = getLeaderboard();
  const previousLeader = current.length > 0 ? current[0] : null;

  // Unset isCurrentSession on older records
  const sanitized = current.map(item => ({ ...item, isCurrentSession: false }));

  // Check if student already participated
  const existingIndex = sanitized.findIndex(
    p => p.name.trim().toLowerCase() === name.toLowerCase()
  );

  let isPersonalBest = false;
  let isNewParticipant = false;

  if (existingIndex !== -1) {
    const existing = sanitized[existingIndex];
    if (score > existing.score || (score === existing.score && time < existing.time)) {
      existing.score = score;
      existing.time = time;
      existing.level = level;
      existing.timestamp = timeString;
      existing.avatar = avatar;
      existing.rawTime = Date.now();
      existing.isCurrentSession = true;
      isPersonalBest = true;
    } else {
      existing.isCurrentSession = true;
    }
  } else {
    isNewParticipant = true;
    sanitized.push({
      id: `visitor-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name,
      avatar,
      score,
      time,
      level,
      timestamp: timeString,
      rawTime: Date.now(),
      isCurrentSession: true
    });
  }

  // Sort: 1st highest score, 2nd faster time, 3rd earlier timestamp
  sanitized.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.time !== b.time) return a.time - b.time;
    return a.rawTime - b.rawTime;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
  } catch (err) {
    console.warn('LocalStorage error:', err);
  }

  const rank = sanitized.findIndex(p => p.name.trim().toLowerCase() === name.toLowerCase()) + 1;
  const isNewFirstPlace = rank === 1;

  return {
    updatedLeaderboard: sanitized,
    rank,
    isNewFirstPlace,
    isPersonalBest,
    isNewParticipant,
    previousLeader,
    totalParticipants: sanitized.length
  };
}

/**
 * Clear the leaderboard (useful for expo organizers starting a fresh morning session)
 */
export async function clearLeaderboard() {
  try {
    await fetch('/api/leaderboard', { method: 'DELETE' });
  } catch (err) {
    console.warn('Clear API failed:', err);
  }
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
    `"${(e.name || '').replace(/"/g, '""')}"`,
    e.score,
    e.time,
    `"${e.level || ''}"`,
    `"${e.timestamp || ''}"`
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
