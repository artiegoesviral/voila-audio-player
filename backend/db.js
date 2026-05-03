import mysql from 'mysql2/promise';
import 'dotenv/config';

const caCert = process.env.DB_CA_CERT?.replace(/\\n/g, '\n');

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: caCert,
        rejectUnauthorized: true
    }
});