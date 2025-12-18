import { useState, useEffect } from 'react';
import { guessQuote, getDailyQuote, revealAnswer } from '../../service/quotesService';
import { checkUserCompleted } from '../../service/progressService';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { Loading } from '../ui/Loading';
import { FaArrowRight, FaEye } from 'react-icons/fa';

/**
 * Componente GuessQuote - Adivinhe a Frase
 * Componente exportável para ser usado nas páginas
 */
export const GuessQuote = () => {
  const [quote, setQuote] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [shownQuoteIds, setShownQuoteIds] = useState([]); // IDs das frases já mostradas
  const [attempts, setAttempts] = useState(0); // Contador de tentativas
  const [revealedAgent, setRevealedAgent] = useState(null); // Agente revelado
  const [revealing, setRevealing] = useState(false); // Estado de carregamento ao revelar
  const [lastGuess, setLastGuess] = useState(''); // Último palpite do usuário
  const [hasWinner, setHasWinner] = useState(false); // Indica se o usuário acertou
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);
  const [checkingProgress, setCheckingProgress] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      try {
        setLoading(true);
        setCheckingProgress(true);
        
        // Verificar progresso primeiro
        try {
          const progressResponse = await checkUserCompleted('quote');
          if (progressResponse.data.completed) {
            setAlreadyCompleted(true);
            setHasWinner(true); // Bloqueia novos palpites
          }
        } catch (err) {
          // Se der erro (ex: não autenticado), permite continuar
          // O backend vai verificar novamente quando fizer o palpite
          console.log('Erro ao verificar progresso:', err);
        }
        
        // Buscar frase do dia
        const response = await getDailyQuote();
        const quoteData = response.data.data;
        setQuote(quoteData);
        // Inicializa com o ID da primeira frase
        setShownQuoteIds([quoteData.id]);
        setAttempts(0);
        setResult(null);
        setRevealedAgent(null);
        setLastGuess(''); // Limpa o último palpite ao carregar nova frase
        // Não reseta hasWinner aqui, será controlado pelo alreadyCompleted
      } catch (err) {
        console.error('Erro ao buscar frase:', err);
        setError('Erro ao carregar frase do dia. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
        setCheckingProgress(false);
      }
    }

    fetchQuote();
  }, []);

  async function handleGuess() {
    if (!userGuess.trim() || !quote || hasWinner) return;

    try {
      setSubmitting(true);
      setError('');
      
      // Garante que a frase atual está na lista de IDs mostrados
      const currentQuoteIds = quote.id && !shownQuoteIds.includes(quote.id) 
        ? [...shownQuoteIds, quote.id] 
        : shownQuoteIds;
      
      const response = await guessQuote({ 
        quoteGuess: userGuess,
        shownQuoteIds: currentQuoteIds
      });
      
      const data = response.data;
      setResult(data);
      
      // Armazena o último palpite antes de limpar
      const currentGuess = userGuess.trim();
      
      if (data.correct) {
        // Se acertou, mostra o agente e bloqueia novas tentativas
        setRevealedAgent(data.correctAgent);
        setLastGuess(''); // Limpa o último palpite quando acerta
        setHasWinner(true); // Bloqueia novas tentativas
        setAlreadyCompleted(true); // Marca como completado no frontend também
      } else {
        // Se errou, armazena o palpite
        setLastGuess(currentGuess);
        
        if (data.newQuote) {
          // Se errou e há nova frase, atualiza a frase e adiciona ao histórico
          // A frase atual já está em currentQuoteIds, só precisamos adicionar a nova
          setShownQuoteIds([...currentQuoteIds, data.newQuote.id]);
          setQuote(data.newQuote);
          setAttempts(prev => prev + 1);
        } else {
          // Não há mais frases disponíveis
          setShownQuoteIds(currentQuoteIds);
          setAttempts(prev => prev + 1);
        }
      }
      
      setUserGuess('');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao processar palpite. Tente novamente.';
      setError(errorMessage);
      console.error('Erro ao adivinhar:', err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReveal() {
    try {
      setRevealing(true);
      const response = await revealAnswer();
      setRevealedAgent(response.data.data.correctAgent);
    } catch (err) {
      console.error('Erro ao revelar resposta:', err);
      setError('Erro ao revelar resposta. Tente novamente.');
    } finally {
      setRevealing(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !submitting && !hasWinner && userGuess.trim()) {
      handleGuess();
    }
  };

  if (loading && !quote) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading text="Carregando frase do dia..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      <Card variant="elevated" className="w-full mb-6 p-6">
        <div className="text-center mb-4">
          <h1
            className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg"
            style={{ fontFamily: 'Valorant, sans-serif' }}
          >
            Adivinhe a Frase!
          </h1>
          <div className="border-b border-white/20 w-24 mx-auto"></div>
        </div>

        {/* Frase do Dia - mais compacta */}
        <div className="mb-4">
          <div className="bg-black/40 rounded-lg p-3 border border-white/10">
            <h2 className="text-sm font-semibold mb-2 text-white/80 text-center flex items-center justify-center gap-2">
              <span className="text-red-500">📜</span>
              Frase do Dia:
            </h2>
            <div className="bg-white/20 rounded-lg p-4 text-center border border-white/20 backdrop-blur-sm">
              <p className="text-lg md:text-xl font-medium italic text-white leading-relaxed">
                "{quote?.text || 'Carregando frase...'}"
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-red-500/20 rounded-lg p-3 border border-red-500">
            <h2 className="text-lg font-bold text-center text-red-400">
              {checkingProgress 
                ? 'VERIFICANDO PROGRESSO...' 
                : alreadyCompleted 
                  ? '✅ VOCÊ JÁ COMPLETOU O DESAFIO DE HOJE!' 
                  : 'QUAL AGENTE DISSE ESSA FRASE?'}
            </h2>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <Input
              id="agentGuess"
              label="Nome do Agente"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              disabled={submitting || hasWinner || alreadyCompleted || checkingProgress}
              onKeyPress={handleKeyPress}
              error={!!error}
              className="py-2"
            />
          </div>
          <Button
            onClick={handleGuess}
            disabled={submitting || hasWinner || alreadyCompleted || checkingProgress || !userGuess.trim()}
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

        {/* Resultado - mais compacto */}
        {result && (
          <div
            className={`p-4 rounded-lg text-center border animate-fade-in ${
              result.correct
                ? 'bg-green-500/20 border-green-500'
                : 'bg-red-500/20 border-red-500'
            }`}
          >
            <h3 className="text-xl font-bold mb-2 text-white">
              {result.correct ? '🎉 Parabéns!' : '❌ Tente novamente!'}
            </h3>
            {!result.correct && lastGuess ? (
              <p className="text-base text-white mb-2">
                O agente digitado foi <strong className="text-red-300">{lastGuess}</strong>
              </p>
            ) : (
              <p className="text-base text-white mb-2">{result.message}</p>
            )}
            {result.correct && revealedAgent && (
              <div className="mt-2 p-2 bg-black/40 rounded-lg">
                <p className="text-sm text-white/80">
                  Era o agente: <strong className="text-green-400">{revealedAgent}</strong>
                </p>
                {alreadyCompleted && (
                  <p className="text-white/60 text-xs mt-2">
                    Você completou o desafio de hoje! Volte amanhã para um novo desafio.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Mensagem se já completou mas não tem resultado ainda */}
        {alreadyCompleted && !result && (
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center mb-4 animate-fade-in">
            <h3 className="text-xl font-bold text-green-400 mb-1">✅ Desafio Completo!</h3>
            <p className="text-white text-sm">
              Você já completou o desafio de hoje! Volte amanhã para um novo desafio.
            </p>
            <p className="text-white/60 text-xs mt-2">
              O desafio será resetado à meia-noite.
            </p>
          </div>
        )}


        {/* Botão para revelar resposta após 5 frases mostradas */}
        {shownQuoteIds.length >= 5 && !result?.correct && !revealedAgent && (
          <div className="mt-4 p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg animate-fade-in">
            <p className="text-yellow-300 text-center text-sm font-semibold mb-3">
              Você já viu todas as 5 frases! Deseja revelar a resposta?
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={handleReveal}
              disabled={revealing}
              className="w-full flex items-center justify-center gap-2"
            >
              <FaEye />
              <span>{revealing ? 'Revelando...' : 'Revelar Resposta'}</span>
            </Button>
          </div>
        )}

        {/* Mostra o agente revelado */}
        {revealedAgent && !result?.correct && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg animate-fade-in">
            <p className="text-white text-center">
              <span className="text-sm text-white/80">O agente era: </span>
              <strong className="text-red-400 text-lg">{revealedAgent}</strong>
            </p>
          </div>
        )}

        {/* Contador de frases mostradas */}
        {shownQuoteIds.length > 1 && shownQuoteIds.length < 5 && !result?.correct && (
          <div className="mt-2 text-center">
            <p className="text-white/60 text-sm">
              Frase {shownQuoteIds.length} de 5
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};






