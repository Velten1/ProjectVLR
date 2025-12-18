import { 
  getDailyUserProgressService, 
  checkIfUserAlreadyCompletedService,
  markUserProgressAsCompleted 
} from '../services/iscorrect.service.js';

// Get user's daily progress for a specific game
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const { gameType } = req.params; // 'agent' ou 'quote'

    if (!gameType || !['agent', 'quote'].includes(gameType)) {
      return res.status(400).json({ 
        message: "gameType deve ser 'agent' ou 'quote'" 
      });
    }

    const response = await getDailyUserProgressService(userId, gameType);
    return res.status(response.status).json(response);
  } catch (error) {
    console.error('Erro ao buscar progresso:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// Check if user already completed the game today
export const checkUserCompleted = async (req, res) => {
  try {
    const userId = req.userId;
    const { gameType } = req.params; // 'agent' ou 'quote'

    if (!gameType || !['agent', 'quote'].includes(gameType)) {
      return res.status(400).json({ 
        message: "gameType deve ser 'agent' ou 'quote'" 
      });
    }

    const response = await checkIfUserAlreadyCompletedService(userId, gameType);
    return res.status(response.status).json(response);
  } catch (error) {
    console.error('Erro ao verificar progresso:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// Mark user progress as completed (called when user guesses correctly)
export const markCompleted = async (req, res) => {
  try {
    const userId = req.userId;
    const { gameType } = req.body; // 'agent' ou 'quote'

    if (!gameType || !['agent', 'quote'].includes(gameType)) {
      return res.status(400).json({ 
        message: "gameType deve ser 'agent' ou 'quote'" 
      });
    }

    const response = await markUserProgressAsCompleted(userId, gameType);
    return res.status(response.status).json(response);
  } catch (error) {
    console.error('Erro ao marcar progresso:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};


