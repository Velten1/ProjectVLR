import { checkGuess } from "../services/quiz.service.js";
import { getDailyAgent as getDailyAgentRepo } from "../repositories/quiz.repository.js";

export const guessAgent = async (req, res) => {
  try {
    const { agentName } = req.body;

    if (!agentName) {
      return res.status(400).json({ message: "O nome de um agente é obrigatório!" });
    }

    const response = await checkGuess(agentName);
    return res.status(response.status).json(response);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getDailyAgent = async (req, res) => {
  try {
    const dailyAgent = await getDailyAgentRepo();
    
    if (!dailyAgent) {
      return res.status(404).json({ message: "Nenhum agente definido para hoje." });
    }

    return res.status(200).json({ data: dailyAgent });
  } catch (error) {
    console.error('Erro ao buscar agente do dia:', error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
