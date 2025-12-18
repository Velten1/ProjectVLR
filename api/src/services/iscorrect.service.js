import { 
  getDailyUserProgress, 
  createDailyUserProgress, 
  checkIfUserAlreadyCompleted,
  updateDailyUserProgress 
} from '../repositories/iscorrest.repository.js';

//get daily user progress
export const getDailyUserProgressService = async (userId, gameType) => {
  const progress = await getDailyUserProgress(userId, gameType);
  return {
    status: 200,
    data: progress || null,
    completed: progress?.completed || false,
  };
};

//check if the user already completed the game today
export const checkIfUserAlreadyCompletedService = async (userId, gameType) => {
  const isCompleted = await checkIfUserAlreadyCompleted(userId, gameType);
  
  if (isCompleted) {
    return { 
      status: 400, 
      message: "Você já completou este jogo hoje! Tente novamente amanhã.",
      completed: true 
    };
  }
  
  return { 
    status: 200, 
    message: "Você ainda não completou este jogo hoje.",
    completed: false 
  };
};

//mark user progress as completed (when user guesses correctly)
export const markUserProgressAsCompleted = async (userId, gameType) => {
  try {
    await updateDailyUserProgress(userId, gameType, true);
    return {
      status: 200,
      message: "Progresso salvo com sucesso!",
    };
  } catch (error) {
    console.error('Erro ao salvar progresso:', error);
    return {
      status: 500,
      message: "Erro ao salvar progresso do usuário",
    };
  }
};

