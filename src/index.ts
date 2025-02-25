import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL 연결
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Render 보안 연결
});

// 기본 라우터
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Render + TypeScript + PostgreSQL!');
});

// DB 연결 테스트
app.get('/db', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('DB Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
