import express from "express";
import { guessQuote, getDailyQuote } from '../controllers/quotes.controller.js';
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router()

router.post('/guessQuote', guessQuote)
router.get('/dailyquote', getDailyQuote)

export default router