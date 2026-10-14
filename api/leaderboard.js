import fs from 'node:fs';
import path from 'node:path';

// In serverless environments (like Vercel), /tmp is the writable scratch space
const DB_PATH = process.env.VERCEL ? '/tmp/leaderboard.json' : path.resolve(process.cwd(), 'data/leaderboard.json');

// Memory cache fallback for ultra-fast serverless execution
let memoryDB = [];

function readDB() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf-8');
      const parsed = JSON.parse(data || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryDB = parsed;
        return parsed;
      }
    }
  } catch (err) {
    // fallback to memoryDB
  }
  return memoryDB;
}

function writeDB(data) {
  memoryDB = data;
  try {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    // memoryDB still holds it
  }
}

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method === 'GET') {
    const list = readDB();
    return res.status(200).json(list);
  }

  if (req.method === 'POST') {
    try {
      const entry = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const name = (entry.name || 'Visitor').trim();
      const avatar = entry.avatar || '🇩🇪';
      const score = Number(entry.score) || 0;
      const time = Number(entry.time) || 0;
      const level = entry.level || 'Beginner Challenge';

      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

      const db = readDB();
      const previousLeader = db.length > 0 ? db[0] : null;

      db.forEach(p => { p.isCurrentSession = false; });

      const existingIndex = db.findIndex(
        p => p.name.trim().toLowerCase() === name.toLowerCase()
      );

      let isPersonalBest = false;
      let isNewParticipant = false;

      if (existingIndex !== -1) {
        const existing = db[existingIndex];
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
        db.push({
          id: `v-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
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

      db.sort((a, b) => b.score - a.score || a.time - b.time || a.rawTime - b.rawTime);
      writeDB(db);

      const rank = db.findIndex(p => p.name.trim().toLowerCase() === name.toLowerCase()) + 1;
      const isNewFirstPlace = rank === 1;

      return res.status(200).json({
        success: true,
        leaderboard: db,
        rank,
        isNewFirstPlace,
        isPersonalBest,
        isNewParticipant,
        previousLeader,
        totalParticipants: db.length
      });
    } catch (err) {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }
  }

  if (req.method === 'DELETE') {
    writeDB([]);
    return res.status(200).json({ success: true, leaderboard: [] });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
