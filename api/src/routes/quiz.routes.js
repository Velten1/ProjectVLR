import express from "express";
import { guessAgent, getDailyAgent} from '../controllers/quiz.controller.js';
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router()

// Rotas que precisam de autenticação
router.post('/guessAgent', authMiddleware, guessAgent)
router.get('/daily', getDailyAgent) // Esta pode ficar pública se quiser

export default router
