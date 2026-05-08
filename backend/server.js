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
        const [rows] = await pool.query('SELECT * FROM moods');
        res.json(rows);
    } catch (error) {
        console.error('Failed to fetch playlists:', error);

        res.status(500).json({
            message: 'Failed to load playlists',
            error: error.message,
            code: error.code
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at ${BASE_URL}`);
});