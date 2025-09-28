import { guessAgent } from "../service/quizService";
import { FaArrowLeft, FaArrowRight, FaArrowUp } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function guessAgentForm() {
  const navigate = useNavigate();
  const [agentName, setAgentName] = useState("");
  const [guessResult, setGuessResult] = useState([]);
  const [hasWinner, setHasWinner] = useState(false);

  async function handleGuessAgent() {
    try {
      const response = await guessAgent({ agentName });
      const newResponse = {
        agent: agentName,
        correct: response.data.guessResult.correct,
        gender: response.data.guessResult.gender,
        role: response.data.guessResult.role,
        year: response.data.guessResult.year,
      };
      if (response) {
        setGuessResult([newResponse, ...guessResult]);
      }
      if (newResponse.correct) {
        setHasWinner(true);
      }
    } catch (error) {
      if (error.response) {
        console.error("Erro no Palpite:", error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.error("Erro desconhecido:", error.message);
        alert(
          "Erro interno no servidor. Por favor, tente novamente mais tarde."
        );
      }
    }
  }

  return (
    <div>
      <div
        className="absolute inset-0 bg-cover bg-center brightness-40 contrast-125"
        style={{ backgroundImage: "url(img/guesstheAgent.jpg)" }}
      ></div>

      <div>
        <h1
          className="flex flex-col items-center mt-5 text-2xl font-bold drop-shadow-lg"
          style={{ fontFamily: "Valorant, sans-serif" }}
        >
          Meu Projeto
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center mt-10">
        <div className="bg-white/30 backdrop-blur-md rounded-xl shadow-custom sm:w-[420px] flex items-center justify-center mb-2">
          <div>
            <h1
              className="flex flex-col items-center mt-4 text-3xl font-bold drop-shadow-lg"
              style={{ fontFamily: "Valorant, sans-serif" }}
            >
              Adivinhe o Agente!
            </h1>
            <h1 className="text-1xl font-bold drop-shadow-lg text-center">
              ______________________________________
            </h1>

            <div>
              <h1 className="text-1xl font-bold drop-shadow-lg text-center text-red-600 mt-5">
                DIGA UM PALPITE PARA COMEÇAR!
              </h1>
            </div>

            <div className="relative flex items-center justify-center mb-2 mt-5">
              <input
                type="text"
                id="agentName"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder=" "
                disabled={hasWinner}
                className="peer bg-white/10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-500 mb-1"
              />
              <label
                htmlFor="agentName"
                className="font-bold absolute left-3 transform -translate-y-1/2 scale-100 text-gray-400 transition-all duration-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:scale-60 peer-focus:text-red-500 peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:scale-60"
              >
                Procurar Agente
              </label>

              <button
                type="button"
                onClick={handleGuessAgent}
                disabled={hasWinner}
                className="bg-gray-200 hover:bg-gray-300 transition-all duration-300 ml-2 mb-1"
              >
                <FaArrowRight className="text-black text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center relative"
        style={{ fontFamily: "Valorant, sans-serif" }}
      >
        {guessResult.map((palpite, index) => (
          <div
            key={index}
            className={`w-[90%] max-w-md p-4 rounded-xl shadow-lg text-white transition-all duration-300 ${
              palpite.correct ? "bg-green-700" : "bg-red-700"
            }`}
          >
            <h2 className="text-xl font-bold mb-3 text-center">
              {palpite.agent}
            </h2>

            <div className="flex justify-around">
              <div
                className={`px-4 py-2 rounded text-sm font-semibold ${
                  palpite.gender === "✅" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                Gender: {palpite.gender}
              </div>
              <div
                className={`px-4 py-2 rounded text-sm font-semibold ${
                  palpite.role === "✅" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                Role: {palpite.role}
              </div>
              <div
                className={`px-4 py-2 rounded text-sm font-semibold ${
                  palpite.year === "✅" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                Year: {palpite.year}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute flex top-1">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-gray-500 hover:bg-gray-300 transition-all duration-300 ml-2"
        >
          <FaArrowLeft className="text-black text-lg" />
        </button>
      </div>
    </div>
  );
}

export default guessAgentForm;
