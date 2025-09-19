import express from 'express';
import { userLogin, userLogout, userRegister, getCurrentUser } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/logout', userLogout);
router.get('/me', authMiddleware, getCurrentUser);
export default router;