import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

function leaderboardDatabasePlugin() {
  const dbPath = path.resolve(process.cwd(), 'data/leaderboard.json');

  const readDB = () => {
    try {
      if (!fs.existsSync(dbPath)) {
        fs.mkdirSync(path.dirname(dbPath), { recursive: true });
        fs.writeFileSync(dbPath, '[]', 'utf-8');
        return [];
      }
      const data = fs.readFileSync(dbPath, 'utf-8');
      return JSON.parse(data || '[]');
    } catch {
      return [];
    }
  };

  const writeDB = (data) => {
    try {
      fs.mkdirSync(path.dirname(dbPath), { recursive: true });
      fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Database write error:', err);
    }
  };

  return {
    name: 'leaderboard-database-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url, 'http://localhost');

        if (url.pathname === '/api/leaderboard') {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

          if (req.method === 'OPTIONS') {
            res.statusCode = 204;
            res.end();
            return;
          }

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

                // Remove previous session highlight
                db.forEach(p => { p.isCurrentSession = false; });

                // Check if this student already participated (one official entry per student)
                const existingIndex = db.findIndex(
                  p => p.name.trim().toLowerCase() === name.toLowerCase()
                );

                let isPersonalBest = false;
                let isNewParticipant = false;

                if (existingIndex !== -1) {
                  const existing = db[existingIndex];
                  // If new run is better (higher score, or same score with faster time)
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

                // Sort: 1st highest score, 2nd lowest time (faster is better)
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
              } catch (err) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
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

        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), leaderboardDatabasePlugin()],
  server: {
    port: 3000,
    host: true, // Listen on all local IP addresses for phone QR code access
    open: true
  }
});

