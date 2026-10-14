import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DIST_DIR = path.resolve(__dirname, 'dist');
const DB_PATH = path.resolve(__dirname, 'data/leaderboard.json');

// Ensure DB directory and file exist
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  fs.writeFileSync(DB_PATH, '[]', 'utf-8');
}

function readDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch {
    return [];
  }
}

function writeDB(data) {
  try {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Database write error:', err);
  }
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // Enable CORS for mobile phone access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  // API Endpoints
  if (pathname === '/api/leaderboard') {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET') {
      const db = readDB();
      res.statusCode = 200;
      res.end(JSON.stringify(db));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const entry = JSON.parse(body || '{}');
          const name = (entry.name || 'Visitor').trim();
          const avatar = entry.avatar || '🇩🇪';
          const score = Number(entry.score) || 0;
          const time = Number(entry.time) || 0;
          const level = entry.level || 'Beginner Challenge';

          const now = new Date();
          const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

          const db = readDB();
          const previousLeader = db.length > 0 ? db[0] : null;

          // Clear previous session flag
          db.forEach(p => { p.isCurrentSession = false; });

          // Deduplicate by student name (personal best)
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

          // Sort: 1st highest score, 2nd faster time
          db.sort((a, b) => b.score - a.score || a.time - b.time || a.rawTime - b.rawTime);

          writeDB(db);

          const rank = db.findIndex(p => p.name.trim().toLowerCase() === name.toLowerCase()) + 1;
          const isNewFirstPlace = rank === 1;

          res.statusCode = 200;
          res.end(JSON.stringify({
            success: true,
            leaderboard: db,
            rank,
            isNewFirstPlace,
            isPersonalBest,
            isNewParticipant,
            previousLeader,
            totalParticipants: db.length
          }));
        } catch {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      return;
    }

    if (req.method === 'DELETE') {
      writeDB([]);
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, leaderboard: [] }));
      return;
    }
  }

  // Serve static assets from dist/
  let filePath = path.join(DIST_DIR, pathname === '/' ? 'index.html' : pathname);
  
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    // SPA fallback
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  try {
    const content = fs.readFileSync(filePath);
    res.setHeader('Content-Type', contentType);
    res.statusCode = 200;
    res.end(content);
  } catch {
    res.statusCode = 404;
    res.end('File Not Found');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`DEUTSCH DECODE production server is live on http://localhost:${PORT}`);
});
