import { useNavigate } from 'react-router-dom';
import { Background } from '../components/layout/Background';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { GuessAgent } from '../components/game/GuessAgent';
import { Button } from '../components/ui/Button';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

/**
 * Página do Jogo Adivinhe o Agente
 */
export const GuessAgentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      <Background image="img/guesstheAgent.jpg" brightness={40} contrast={125} />
      
      {/* Overlay gradiente para melhor legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 z-0"></div>
      
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />
        
        <div className="absolute top-20 left-4 z-20 flex gap-2">
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 backdrop-blur-sm bg-gray-900/80 hover:bg-gray-800"
          >
            <FaArrowLeft />
            <span>Voltar</span>
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 backdrop-blur-sm bg-white/10 hover:bg-white/20"
          >
            <FaHome />
            <span>Home</span>
          </Button>
        </div>

        <main className="flex-grow flex items-start justify-center px-4 pt-8 pb-8 min-h-screen">
          <div className="w-full max-w-6xl">
            <GuessAgent />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};









