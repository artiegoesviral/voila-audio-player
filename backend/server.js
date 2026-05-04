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

app.get('/health', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({
            status: 'ok',
            database: 'connected',
            baseUrl: BASE_URL
        });
    } catch (error) {
        console.error('DB health check failed:', error.message);
        res.status(503).json({
            status: 'error',
            database: 'unavailable'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at ${BASE_URL}`);
});