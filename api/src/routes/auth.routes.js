import express from 'express';
import {
  login,
  register,
  getUserInfo,
  resetPassword,
  deleteUser,
  updateUser,
  updateName,
  logout,
} from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/me', authMiddleware, getUserInfo);
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/reset-password', authMiddleware, resetPassword);
router.delete('/delete-user', authMiddleware, deleteUser);
router.put('/update-user', authMiddleware, updateUser);
router.put('/update-name', authMiddleware, updateName);

export default router;
