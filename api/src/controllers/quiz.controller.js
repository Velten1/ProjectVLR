import { checkGuess } from "../services/quiz.service.js";
import { getDailyAgent } from "../repositories/quiz.repository.js";

export const guessAgent = async (req, res) => {
  try {
    const rawName = req.body?.agentName;
    const agentName = typeof rawName === "string" ? rawName.trim() : "";

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

export const getCurrentDailyAgent = async (_req, res) => {
  try {
    const dailyAgent = await getDailyAgent();
    if (!dailyAgent) {
      return res.status(404).json({ message: "Nenhum agente definido para hoje." });
    }
    return res.status(200).json({ id: dailyAgent.id, name: dailyAgent.name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
