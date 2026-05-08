import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'running'
    });
});

app.get('/db-health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({
            status: 'ok',
            database: 'connected'
        });
    } catch (error) {
        console.error('DB health check failed:', error.message);
        res.status(503).json({
            status: 'error',
            database: 'unavailable'
        });
    }
});

app.get('/api/playlists', async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT
        moods.id AS mood_id,
        moods.name AS mood_name,
        songs.id AS song_id,
        mood_id,
        songs.title,
        songs.audio_path,
        songs.artwork_path
      FROM moods
      LEFT JOIN songs ON songs.mood_id = moods.id
      ORDER BY moods.id, songs.id
    `);

        const playlists = new Map();

        rows.forEach(row => {
            if (!playlists.has(row.mood_id)) {
                playlists.set(row.mood_id, {
                    id: row.mood_id,
                    name: row.mood_name,
                    songs: []
                });
            }

            if (row.song_id) {
                playlists.get(row.mood_id).songs.push({
                    id: row.song_id,
                    title: row.title,
                    artist: row.artist,
                    file_url: row.file_url
                });
            }
        });

        res.json([...playlists.values()]);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to load playlists',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at ${BASE_URL}`);
});