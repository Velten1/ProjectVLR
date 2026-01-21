import { getDailyQuote, getQuoteByName, getAgentByName, getAnotherQuoteFromAgent} from "../repositories/quotes.repository.js"

export const checkGuessQuote = async (agentName, shownQuoteIds = []) => {
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
    
    // Se errou, buscar uma nova frase do mesmo agente
    let newQuote = null;
    if (!isCorrect) {
      // Usa todas as frases já mostradas para buscar uma nova
      // O frontend já envia a frase atual incluída em shownQuoteIds
      newQuote = await getAnotherQuoteFromAgent(dailyQuote.agentId, shownQuoteIds);
    }
    
    return {
      status: 200,
      correct: isCorrect,
      message: isCorrect ? "Parabéns! Você acertou!" : "Tente novamente!",
      correctAgent: isCorrect ? dailyQuote.agent.name : null, // Só revela se acertou
      newQuote: newQuote ? {
        id: newQuote.id,
        text: newQuote.text,
      } : null,
      attemptsRemaining: newQuote ? 5 - (shownQuoteIds.length + 1) : 0, // +1 porque já mostrou a primeira
    };
  };