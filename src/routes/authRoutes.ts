import express from 'express';
import { signupUser, signinUser } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signupUser); // 회원가입
router.post('/signin', signinUser); // 로그인

export default router;
