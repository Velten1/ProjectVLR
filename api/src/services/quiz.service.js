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
    correct: guessedAgent.name === dailyAgent.name,
    role: {
      value: guessedAgent.role,
      correct: guessedAgent.role === dailyAgent.role
    },
    gender: {
      value: guessedAgent.gender,
      correct: guessedAgent.gender === dailyAgent.gender
    },
    year: {
      value: guessedAgent.year,
      correct: guessedAgent.year === dailyAgent.year,
      hint: guessedAgent.year === dailyAgent.year 
        ? null 
        : guessedAgent.year < dailyAgent.year 
          ? "Mais recente" 
          : "Mais antigo"
    },
  };

  return {
    status: 200,
    message: result.correct ? "🎉 Parabéns! Você acertou!" : "🔎 Continue tentando!",
    guessResult: result,
  };
};
