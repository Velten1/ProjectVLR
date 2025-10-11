import { guessQuote, getDailyQuote } from "../service/quotesService.js";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GuessQuote() {
    const navigate = useNavigate();
    
    const [quote, setQuote] = useState(null);
    const [userGuess, setUserGuess] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchQuote() {
            try {
                setLoading(true);
                const response = await getDailyQuote();
                setQuote(response.data.data);
            } catch (error) {
                console.error('Erro ao buscar frase:', error);
            } finally {
                setLoading(false);
            }
        }
        
        fetchQuote();
    }, []);

    async function handleGuessAgent() {
        try {
            setLoading(true);
            const response = await guessQuote({ quoteGuess: userGuess });
            setResult(response.data);
        } catch (error) {
            console.error('Erro ao adivinhar:', error);
        } finally {
            setLoading(false);
        }
    }

    function goBack() {
        navigate("/");
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
  
              {/* Loading ou Conteúdo do Jogo */}
              {loading && !quote ? (
                <div className="text-center mt-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-white font-bold">Carregando frase do dia...</p>
                </div>
              ) : (
                <div>
                  {/* Frase do Dia */}
                  <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4 text-white text-center">
                      Frase do Dia:
                    </h2>
                    <div className="bg-white/20 rounded-lg p-4 text-center">
                      <p className="text-lg font-medium italic text-white">
                        "{quote?.text || 'Carregando frase...'}"
                      </p>
                    </div>
                  </div>

                  <div>
                    <h1 className="text-1xl font-bold drop-shadow-lg text-center text-red-600 mt-5">
                      QUAL AGENTE DISSE ESSA FRASE?
                    </h1>
                  </div>
                </div>
              )}
  
              <div className="relative flex items-center justify-center mb-2 mt-5">
                <input
                  type="text"
                  id="agentName"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  placeholder=" "
                  disabled={loading}
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
                  disabled={loading || !userGuess.trim()}
                  className="bg-gray-200 hover:bg-gray-300 transition-all duration-300 ml-2 mb-1"
                >
                  <FaArrowRight className="text-black text-lg" />
                </button>
              </div>

              {/* Resultado */}
              {result && (
                <div className={`p-4 rounded-lg text-center mt-4 ${
                  result.correct 
                    ? 'bg-green-500/20 border border-green-500' 
                    : 'bg-red-500/20 border border-red-500'
                }`}>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {result.correct ? "🎉 Parabéns!" : "❌ Tente novamente!"}
                  </h3>
                  <p className="text-lg text-white">{result.message}</p>
                  {!result.correct && result.correctAgent && (
                    <p className="text-sm mt-2 opacity-80 text-white">
                      Era o agente: <strong>{result.correctAgent}</strong>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
    );
}

export default GuessQuote;