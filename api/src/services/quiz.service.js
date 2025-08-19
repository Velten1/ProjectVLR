import { getDailyAgent, getAgentByName } from "../repositories/quiz.repository.js";

export const checkGuess = async (agentName) => {
  const dailyAgent = await getDailyAgent();
  if (!dailyAgent) {
    return { status: 404, message: "Nenhum agente definido para hoje." };
  }

  const guessedAgent = await getAgentByName(agentName);
  if (!guessedAgent) {
    return { status: 404, message: "Esse agente não existe!" }; 
  }

  const result = {
    correct: guessedAgent.id === dailyAgent.id,
    role: guessedAgent.role === dailyAgent.role ? "✅" : "❌",
    gender: guessedAgent.gender === dailyAgent.gender ? "✅" : "❌",
    year: guessedAgent.year === dailyAgent.year 
      ? "✅" 
      : guessedAgent.year < dailyAgent.year 
        ? "⬆️ Mais recente" 
        : "⬇️ Mais antigo",
  };

  return {
    status: 200,
    message: result.correct ? "🎉 Parabéns! Você acertou!" : "🔎 Continue tentando!",
    guessResult: result,
  };
};
