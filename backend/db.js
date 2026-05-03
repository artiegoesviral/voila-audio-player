import mysql from 'mysql2/promise';
import fs from 'fs';
import 'dotenv/config';

const caPath = process.env.NODE_ENV === 'production'
    ? '/etc/secrets/ca.pem'
    : './ca.pem';

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: fs.readFileSync(caPath)
    }
});