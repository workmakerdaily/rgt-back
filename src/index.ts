import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import bookRoutes from './routes/bookRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 라우터 등록
app.use('/api/auth', authRoutes);  // 로그인, 회원가입
app.use('/api/books', bookRoutes); // 책 관련 API

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
