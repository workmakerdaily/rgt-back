import express from 'express';
import { getAllBooks, getBookById, addBook, updateBook, deleteBook } from '../controllers/bookController';
import { authenticateJWT, isAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', getAllBooks);                      // 전체 도서 조회
router.get('/:id', getBookById);                   // 특정 도서 조회
router.post('/', authenticateJWT, isAdmin, addBook);    // 도서 추가 (관리자만)
router.put('/:id', authenticateJWT, isAdmin, updateBook); // 도서 수정 (관리자만)
router.delete('/:id', authenticateJWT, isAdmin, deleteBook); // 도서 삭제 (관리자만)

export default router;
