"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.get('/', bookController_1.getAllBooks); // 전체 도서 조회
router.get('/:id', bookController_1.getBookById); // 특정 도서 조회
router.post('/', authMiddleware_1.authenticateJWT, authMiddleware_1.isAdmin, bookController_1.addBook); // 도서 추가 (관리자만)
router.put('/:id', authMiddleware_1.authenticateJWT, authMiddleware_1.isAdmin, bookController_1.updateBook); // 도서 수정 (관리자만)
router.delete('/:id', authMiddleware_1.authenticateJWT, authMiddleware_1.isAdmin, bookController_1.deleteBook); // 도서 삭제 (관리자만)
exports.default = router;
