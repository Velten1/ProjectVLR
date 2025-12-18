import express from "express";
import { 
  getUserProgress, 
  checkUserCompleted, 
  markCompleted 
} from '../controllers/iscorrect.controllers.js';
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Todas as rotas precisam de autenticação
router.use(authMiddleware);

// GET /api/progress/:gameType - Obter progresso do usuário para um jogo específico
router.get('/:gameType', getUserProgress);

// GET /api/progress/:gameType/check - Verificar se já completou hoje
router.get('/:gameType/check', checkUserCompleted);

// POST /api/progress/mark - Marcar como completado (quando acertar)
router.post('/mark', markCompleted);

export default router;


