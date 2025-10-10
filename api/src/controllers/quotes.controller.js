import { checkGuessQuote } from "../services/quotes.service.js";
import { getDailyQuote as getDailyQuoteRepo } from "../repositories/quotes.repository.js";

export const guessQuote = async (req, res) => {
    try {
        const { quoteGuess } = req.body;

        if (!quoteGuess) {
            return res.status(400).json({ message: "O nome do agente é obrigatório" })
        }

        const response = await checkGuessQuote(quoteGuess)
        return res.status(response.status).json(response)
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
          text: dailyQuote.text,
          // NÃO mostrar o nome do agente ainda!
        }
      });
    } catch (error) {
      console.error('Erro ao buscar frase:', error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };
