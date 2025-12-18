import { useState, useEffect } from 'react';
import { guessAgent } from '../../service/quizService';
import { checkUserCompleted } from '../../service/progressService';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { FaArrowRight } from 'react-icons/fa';

/**
 * Componente GuessAgent - Adivinhe o Agente
 * Componente exportável para ser usado nas páginas
 */
export const GuessAgent = () => {
  const [agentName, setAgentName] = useState('');
  const [guessResult, setGuessResult] = useState([]);
  const [hasWinner, setHasWinner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [checkingProgress, setCheckingProgress] = useState(true);

  // Verificar progresso ao carregar o componente
  useEffect(() => {
    async function checkProgress() {
      try {
        setCheckingProgress(true);
        const response = await checkUserCompleted('agent');
        if (response.data.completed) {
          setAlreadyCompleted(true);
          setHasWinner(true); // Bloqueia novos palpites
        }
      } catch (err) {
        // Se der erro (ex: não autenticado), permite continuar
        // O backend vai verificar novamente quando fizer o palpite
        console.log('Erro ao verificar progresso:', err);
      } finally {
        setCheckingProgress(false);
      }
    }
    checkProgress();
  }, []);

  async function handleGuessAgent() {
    if (!agentName.trim()) return;
    
    try {
      setLoading(true);
      setError('');
      const response = await guessAgent({ agentName });
      
      if (!response.data || !response.data.guessResult) {
        throw new Error('Resposta inválida do servidor');
      }
      
      const newResponse = {
        agent: agentName,
        correct: response.data.guessResult.correct,
        gender: response.data.guessResult.gender,
        role: response.data.guessResult.role,
        year: response.data.guessResult.year,
      };
      
      setGuessResult([newResponse, ...guessResult]);
      setAgentName('');
      
      if (newResponse.correct) {
        setHasWinner(true);
        setAlreadyCompleted(true); // Marca como completado no frontend também
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao processar palpite. Tente novamente.';
      setError(errorMessage);
      console.error('Erro no Palpite:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !hasWinner && !loading) {
      handleGuessAgent();
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {/* Card principal - mais compacto e no topo */}
      <Card variant="elevated" className="w-full mb-6 p-6">
        <div className="text-center mb-4">
          <h1
            className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg"
            style={{ fontFamily: 'Valorant, sans-serif' }}
          >
            Adivinhe o Agente!
          </h1>
          <div className="border-b border-white/20 w-24 mx-auto"></div>
        </div>

        <div className="mb-4">
          <div className="bg-black/40 rounded-lg p-3 border border-white/10">
            <h2 className="text-lg font-bold text-center text-red-500">
              {checkingProgress 
                ? 'VERIFICANDO PROGRESSO...' 
                : alreadyCompleted 
                  ? '✅ VOCÊ JÁ COMPLETOU O DESAFIO DE HOJE!' 
                  : guessResult.length === 0 
                    ? 'DIGA UM PALPITE PARA COMEÇAR!' 
                    : `CONTINUE TENTANDO! (${guessResult.length})`}
            </h2>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <Input
              id="agentName"
              label="Nome do Agente"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              disabled={hasWinner || loading || alreadyCompleted || checkingProgress}
              onKeyPress={handleKeyPress}
              error={!!error}
              className="py-2"
            />
          </div>
          <Button
            onClick={handleGuessAgent}
            disabled={hasWinner || loading || alreadyCompleted || checkingProgress || !agentName.trim()}
            size="md"
            className="px-4"
          >
            <FaArrowRight />
          </Button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4 animate-fade-in">
            <p className="text-red-300 text-center text-sm font-semibold">{error}</p>
          </div>
        )}

        {hasWinner && (
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center mb-4 animate-fade-in">
            <h3 className="text-xl font-bold text-green-400 mb-1">🎉 Parabéns!</h3>
            <p className="text-white text-sm">
              {alreadyCompleted && guessResult.length === 0
                ? 'Você já completou o desafio de hoje! Volte amanhã para um novo desafio.'
                : `Você acertou em ${guessResult.length} tentativa${guessResult.length > 1 ? 's' : ''}!`}
            </p>
            {alreadyCompleted && guessResult.length === 0 && (
              <p className="text-white/60 text-xs mt-2">
                O desafio será resetado à meia-noite.
              </p>
            )}
          </div>
        )}
      </Card>

      {/* Tabela de resultados - estilo Valdle compacto */}
      {guessResult.length > 0 && (
        <Card variant="elevated" className="w-full p-4">
          {/* Cabeçalho da tabela */}
          <div className="grid grid-cols-4 gap-2 mb-2 pb-2 border-b border-white/20">
            <div className="text-xs font-bold text-white/80 uppercase tracking-wider">Agente</div>
            <div className="text-xs font-bold text-white/80 uppercase tracking-wider">Gênero</div>
            <div className="text-xs font-bold text-white/80 uppercase tracking-wider">Função</div>
            <div className="text-xs font-bold text-white/80 uppercase tracking-wider">Ano</div>
          </div>

          {/* Área scrollável para resultados */}
          <div className="max-h-96 overflow-y-auto space-y-1 pr-2 custom-scrollbar">
            {guessResult.map((palpite, index) => (
              <div
                key={index}
                className={`grid grid-cols-4 gap-2 py-2 px-2 rounded transition-all duration-200 ${
                  palpite.correct 
                    ? 'bg-green-500/20 border border-green-500/50' 
                    : 'hover:bg-white/5'
                }`}
              >
                {/* Agente */}
                <div className={`px-2 py-1.5 rounded text-xs font-bold text-center text-white ${
                  palpite.correct ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {palpite.agent.toUpperCase()}
                </div>

                {/* Gênero */}
                <div className={`px-2 py-1.5 rounded text-xs font-bold text-center text-white ${
                  (typeof palpite.gender === 'object' ? palpite.gender.correct : palpite.gender === '✅') ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {typeof palpite.gender === 'object' && palpite.gender.value
                    ? (palpite.gender.value === 'Male' ? 'Masculino' : palpite.gender.value === 'Female' ? 'Feminino' : palpite.gender.value)
                    : palpite.gender === '✅' ? '✅' : palpite.gender === '❌' ? '❌' : palpite.gender}
                </div>

                {/* Função */}
                <div className={`px-2 py-1.5 rounded text-xs font-bold text-center text-white ${
                  (typeof palpite.role === 'object' ? palpite.role.correct : palpite.role === '✅') ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {typeof palpite.role === 'object' && palpite.role.value
                    ? (palpite.role.value === 'Duelist' ? 'Duelista' : 
                       palpite.role.value === 'Sentinel' ? 'Sentinela' : 
                       palpite.role.value === 'Controller' ? 'Controlador' : 
                       palpite.role.value === 'Initiator' ? 'Iniciador' : 
                       palpite.role.value)
                    : palpite.role === '✅' ? '✅' : palpite.role === '❌' ? '❌' : palpite.role}
                </div>

                {/* Ano */}
                <div className={`px-2 py-1.5 rounded text-xs font-bold text-center text-white ${
                  (typeof palpite.year === 'object' ? palpite.year.correct : palpite.year === '✅') ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {typeof palpite.year === 'object' && palpite.year.value !== undefined
                    ? palpite.year.value
                    : palpite.year === '✅' ? '✅' : palpite.year === '❌' ? '❌' : palpite.year}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};






