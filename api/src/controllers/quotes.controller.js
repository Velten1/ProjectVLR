import { checkGuessQuote } from "../services/quotes.service.js";
import { getDailyQuote as getDailyQuoteRepo } from "../repositories/quotes.repository.js";
import { checkIfUserAlreadyCompletedService, markUserProgressAsCompleted } from "../services/iscorrect.service.js";

export const guessQuote = async (req, res) => {
    try {
        const userId = req.userId; // Vem do authMiddleware
        const { quoteGuess, shownQuoteIds } = req.body;

        if (!quoteGuess) {
            return res.status(400).json({ message: "O nome do agente é obrigatório" })
        }

        // Verificar se o usuário já completou o jogo hoje
        const progressCheck = await checkIfUserAlreadyCompletedService(userId, 'quote');
        if (progressCheck.completed) {
            return res.status(progressCheck.status).json(progressCheck);
        }

        // Processar o palpite
        const response = await checkGuessQuote(quoteGuess, shownQuoteIds || []);
        
        // Se acertou, marcar como completado
        if (response.status === 200 && response.correct) {
            await markUserProgressAsCompleted(userId, 'quote');
            response.message = "🎉 Parabéns! Você acertou e completou o desafio de hoje!";
        }

        return res.status(response.status).json(response);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro interno no servidor" })
    }
}
export const getDailyQuote = async (req, res) => {
    try {
      const dailyQuote = await getDailyQuoteRepo();
      
      if (!dailyQuote) {
        return res.status(404).json({ message: "Nenhuma frase encontrada" });
      }
  
      return res.status(200).json({ 
        data: {
          id: dailyQuote.id,
          text: dailyQuote.text,
          // NÃO mostrar o nome do agente ainda!
        }
      });
    } catch (error) {
      console.error('Erro ao buscar frase:', error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

export const revealAnswer = async (req, res) => {
    try {
      const dailyQuote = await getDailyQuoteRepo();
      
      if (!dailyQuote) {
        return res.status(404).json({ message: "Nenhuma frase encontrada" });
      }
  
      return res.status(200).json({ 
        data: {
          correctAgent: dailyQuote.agent.name,
        }
      });
    } catch (error) {
      console.error('Erro ao revelar resposta:', error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };
