import prisma from '../config/prisma.js';

// Helper function to get start and end of day in UTC
const getTodayRange = () => {
  const today = new Date();
  const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));
  const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));
  return { startOfDay, endOfDay };
};

//get daily user progress
export const getDailyUserProgress = async (userId, gameType) => {
  const { startOfDay, endOfDay } = getTodayRange();
  
  return await prisma.userDailyProgress.findFirst({
    where: {
      userId: userId,
      gameType: gameType,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
};

//create daily user progress
export const createDailyUserProgress = async (userId, gameType) => {
  const { startOfDay } = getTodayRange();
  
  return await prisma.userDailyProgress.create({
    data: {
      userId: userId,
      gameType: gameType,
      date: startOfDay,
      completed: false,
    },
  });
};

//check if the user already completed the game today
export const checkIfUserAlreadyCompleted = async (userId, gameType) => {
  const { startOfDay, endOfDay } = getTodayRange();
  
  const progress = await prisma.userDailyProgress.findFirst({
    where: {
      userId: userId,
      gameType: gameType,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      completed: true,
    },
  });
  
  return !!progress; // Retorna true se encontrou, false se não
};

//update daily user progress (marcar como completed)
export const updateDailyUserProgress = async (userId, gameType, completed = true) => {
  const { startOfDay, endOfDay } = getTodayRange();
  
  // Primeiro tenta encontrar um registro existente
  const existing = await prisma.userDailyProgress.findFirst({
    where: {
      userId: userId,
      gameType: gameType,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  if (existing) {
    // Se existe, atualiza
    return await prisma.userDailyProgress.update({
      where: { id: existing.id },
      data: { completed: completed },
    });
  } else {
    // Se não existe, cria novo
    return await prisma.userDailyProgress.create({
      data: {
        userId: userId,
        gameType: gameType,
        date: startOfDay,
        completed: completed,
      },
    });
  }
};