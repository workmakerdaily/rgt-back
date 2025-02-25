const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL 연결 설정
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Render의 PostgreSQL 보안 연결을 위해 필요
});

// 기본 라우트
app.get('/', (req, res) => {
    res.send('Hello, Render + Node.js + PostgreSQL!');
});

// DB 연결 테스트 라우트
app.get('/db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.send('Error: ' + err);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
