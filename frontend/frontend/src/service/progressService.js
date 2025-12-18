import api from "../api/api.js";

/**
 * Serviço para gerenciar o progresso diário do usuário
 */

// Obter progresso do usuário para um jogo específico
export const getUserProgress = async (gameType) => {
  return await api.get(`progress/${gameType}`);
};

// Verificar se o usuário já completou o jogo hoje
export const checkUserCompleted = async (gameType) => {
  return await api.get(`progress/${gameType}/check`);
};

// Marcar como completado (chamado quando o usuário acerta)
export const markCompleted = async (gameType) => {
  return await api.post("progress/mark", { gameType });
};


