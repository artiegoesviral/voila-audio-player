import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.get('/api/playlists', async (req, res) => {
    const [rows] = await pool.query(`
    SELECT 
      m.name AS mood,
      s.title,
      s.audio_path AS path,
      s.artwork_path AS artwork
    FROM moods m
    JOIN songs s ON s.mood_id = m.id
    ORDER BY m.id, s.id
  `);

    const playlists = [];

    for (const row of rows) {
        let playlist = playlists.find(p => p.mood === row.mood);

        if (!playlist) {
            playlist = {
                mood: row.mood,
                songs: []
            };
            playlists.push(playlist);
        }

        playlist.songs.push({
            title: row.title,
            path: `${BASE_URL}${row.path}`,
            artwork: `${BASE_URL}${row.artwork}`
        });
    }

    res.json(playlists);
});

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});