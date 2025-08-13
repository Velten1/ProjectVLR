import express from "express";
import { guessAgent, getCurrentDailyAgent } from '../controllers/quiz.controller.js';
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router()

router.post('/guessAgent', guessAgent)
router.get('/daily', getCurrentDailyAgent)

export default router
