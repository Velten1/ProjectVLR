import express from "express";
import { guessAgent } from '../controllers/quiz.controller.js';
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router()

router.post('/guessAgent', guessAgent)

export default router
