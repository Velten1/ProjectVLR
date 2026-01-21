import { useNavigate } from 'react-router-dom';
import { Background } from '../components/layout/Background';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Card } from '../components/ui/Card';
import { FaGamepad, FaQuoteLeft, FaTrophy, FaInfoCircle } from 'react-icons/fa';

/**
 * Página Dashboard - Página inicial com seleção de modos de jogo
 */
export const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col">
      <Background image="img/sova.jpg" brightness={40} contrast={105} />
      
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />
        
        <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12 max-w-4xl">
            <h1
              className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg"
              style={{ fontFamily: 'Valorant, sans-serif' }}
            >
              Teste seu conhecimento Valorístico!
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8">
              Desafie-se com nossos jogos diários e prove que você é um verdadeiro especialista em Valorant
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-red-500">2</div>
                <div className="text-sm text-white/70">Modos de Jogo</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-red-500">∞</div>
                <div className="text-sm text-white/70">Desafios Diários</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-3 border border-white/20">
                <div className="text-2xl font-bold text-red-500">24/7</div>
                <div className="text-sm text-white/70">Disponível</div>
              </div>
            </div>
          </div>

          {/* Game Modes */}
          <div className="w-full max-w-5xl space-y-6 mb-12">
            <Card variant="elevated" className="p-0 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <button
                type="button"
                onClick={() => navigate('/guess-agent')}
                className="relative overflow-hidden bg-gradient-to-r from-black/90 to-gray-900/90 text-white font-bold w-full py-8 px-8 transition-all duration-500 flex flex-col items-center justify-center border-2 border-gray-500 hover:border-red-500 hover:shadow-[0_0_30px_rgba(255,0,0,0.6)]"
                style={{ fontFamily: 'Valorant, sans-serif' }}
              >
                <FaGamepad className="text-5xl mb-4 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="relative z-10 text-2xl md:text-3xl mb-2">Adivinhe o Agente!</span>
                <span className="relative z-10 text-sm text-white/70">Teste seus conhecimentos sobre os agentes de Valorant</span>
                <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/30 transition-all duration-500"></div>
              </button>
            </Card>

            <Card variant="elevated" className="p-0 overflow-hidden group hover:scale-105 transition-transform duration-300">
              <button
                type="button"
                onClick={() => navigate('/guess-quote')}
                className="relative overflow-hidden bg-gradient-to-r from-black/90 to-gray-900/90 text-white font-bold w-full py-8 px-8 transition-all duration-500 flex flex-col items-center justify-center border-2 border-gray-500 hover:border-red-500 hover:shadow-[0_0_30px_rgba(255,0,0,0.6)]"
                style={{ fontFamily: 'Valorant, sans-serif' }}
              >
                <FaQuoteLeft className="text-5xl mb-4 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="relative z-10 text-2xl md:text-3xl mb-2">Adivinhe a Frase!</span>
                <span className="relative z-10 text-sm text-white/70">Descubra qual agente disse cada frase icônica</span>
                <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/30 transition-all duration-500"></div>
              </button>
            </Card>
          </div>

          {/* Info Section */}
          <div className="w-full max-w-5xl">
            <Card variant="elevated" className="p-6">
              <div className="flex items-start gap-4">
                <FaInfoCircle className="text-3xl text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Sobre o Jogo</h3>
                  <p className="text-white/80 leading-relaxed mb-4">
                    Este é um projeto de fã criado para testar seu conhecimento sobre Valorant. 
                    Desafie-se diariamente com novos agentes e frases, e veja quantos você consegue acertar!
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <FaTrophy className="text-red-500" />
                        Desafios Diários
                      </h4>
                      <p className="text-white/70 text-sm">
                        Novos desafios todos os dias para manter você sempre testando seus conhecimentos.
                      </p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                        <FaGamepad className="text-red-500" />
                        Múltiplos Modos
                      </h4>
                      <p className="text-white/70 text-sm">
                        Diferentes formas de jogar e testar seu conhecimento sobre o universo de Valorant.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};









