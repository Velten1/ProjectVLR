import { checkGuess } from "../services/quiz.service.js";

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
