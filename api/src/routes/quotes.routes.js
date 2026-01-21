import express from "express";
import { guessQuote, getDailyQuote, revealAnswer } from '../controllers/quotes.controller.js';
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router()

// Rotas que precisam de autenticação
router.post('/guessQuote', authMiddleware, guessQuote)
router.get('/dailyquote', getDailyQuote) // Esta pode ficar pública se quiser
router.get('/reveal', authMiddleware, revealAnswer)

export default router