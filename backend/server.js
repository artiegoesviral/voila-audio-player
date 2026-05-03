import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express(); // ← THIS is missing in your file

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
            path: `http://localhost:3000${row.path}`,
            artwork: `http://localhost:3000${row.artwork}`
        });
    }

    res.json(playlists);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});