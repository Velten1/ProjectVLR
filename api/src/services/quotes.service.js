import { getDailyQuote, getQuoteByName, getAgentByName} from "../repositories/quotes.repository.js"

export const checkGuessQuote = async (agentName) => {
    const dailyQuote = await getDailyQuote();
    if (!dailyQuote) {
      return { status: 404, message: "Nenhuma frase encontrada" };
    }
  
    const guessedAgent = await getAgentByName(agentName);
    if (!guessedAgent) {
      return { status: 404, message: "Agente não encontrado" };
    }
  
    // Comparar se acertou
    const isCorrect = guessedAgent.id === dailyQuote.agentId;
    
    return {
      status: 200,
      correct: isCorrect,
      message: isCorrect ? "Parabéns! Você acertou!" : "Tente novamente!",
      correctAgent: dailyQuote.agent.name
    };
  };