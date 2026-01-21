import { FaGithub, FaLinkedin } from 'react-icons/fa';

/**
 * Componente Footer moderno integrado com o background das páginas
 */
export const Footer = ({ className = '' }) => {
  return (
    <footer className={`relative w-full mt-auto ${className}`}>
      {/* Gradiente sutil no topo para transição suave */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      
      {/* Overlay com glassmorphism mais sutil para mostrar o background */}
      <div className="absolute inset-0 backdrop-blur-sm border-t border-white/10"></div>
      
      {/* Conteúdo do footer */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center">
          {/* Título com tipografia Valorant */}
          <h2 
            className="text-2xl md:text-3xl font-bold mb-3 text-white drop-shadow-lg hover:text-red-500 transition-colors duration-300" 
            style={{ fontFamily: 'Valorant, sans-serif' }}
          >
            Meu Projeto
          </h2>
          
          {/* Tagline */}
          <p className="text-white/90 text-sm md:text-base mb-6 font-medium drop-shadow-md">
            Teste seu conhecimento Valorístico!
          </p>

          {/* Ícones sociais com efeitos modernos */}
          <div className="flex justify-center gap-6 mb-6">
            <a
              href="https://github.com/Velten1"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:border-red-500/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              aria-label="GitHub"
            >
              <FaGithub className="text-white/80 group-hover:text-red-500 text-xl transition-colors duration-300" />
              <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 rounded-lg transition-all duration-300"></div>
            </a>
            
            <a
              href="https://www.linkedin.com/in/caio-velten-1351b22b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:border-red-500/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-white/80 group-hover:text-red-500 text-xl transition-colors duration-300" />
              <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 rounded-lg transition-all duration-300"></div>
            </a>
          </div>

          {/* Linha divisória */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mb-6"></div>

          {/* Textos de copyright e disclaimer */}
          <div className="text-center space-y-2">
            <p className="text-white/70 text-xs md:text-sm drop-shadow-md">
              © 2025 Meu Projeto. Todos os direitos reservados.
            </p>
            <p className="text-white/60 text-xs md:text-sm max-w-2xl drop-shadow-md">
              Este é um projeto de fã. A Riot Games não endossa ou patrocina este projeto.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};









