import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaTimes, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { Button } from '../ui/Button';
import { isAuthenticated } from '../../utils/auth';

/**
 * Componente Header com menu de usuário e lógica de autenticação
 */
export const Header = ({ 
  title = 'Meu Projeto',
  showUserMenu = true,
  className = '' 
}) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica autenticação ao montar e quando a página recebe foco
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setAuthenticated(authStatus);
    };

    // Verifica imediatamente
    checkAuth();
    
    // Verifica quando a janela recebe foco (útil após login em outra aba)
    const handleFocus = () => checkAuth();
    window.addEventListener('focus', handleFocus);
    
    // Verifica periodicamente (a cada 2 segundos)
    const interval = setInterval(checkAuth, 2000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <header className={`relative z-10 ${className}`}>
      <div className="flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <h1
          className="text-2xl md:text-3xl font-bold drop-shadow-lg cursor-pointer hover:text-red-500 transition-colors"
          style={{ fontFamily: 'Valorant, sans-serif' }}
          onClick={() => navigate('/')}
        >
          {title}
        </h1>
        
        {showUserMenu && (
          <div className="relative">
            {authenticated ? (
              // Menu para usuário autenticado
              <>
                <button
                  type="button"
                  onClick={() => setOpenMenu(!openMenu)}
                  className="bg-red-500/80 hover:bg-red-600 transition-all duration-300 p-3 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-red-500/50"
                >
                  <FaUser className="text-white text-lg" />
                  <span className="text-white font-semibold hidden sm:inline">Perfil</span>
                  {openMenu ? (
                    <FaTimes className="text-white text-sm" />
                  ) : null}
                </button>

                {openMenu && (
                  <div className="absolute right-0 mt-2 bg-gray-900/95 backdrop-blur-md text-white rounded-lg shadow-xl py-2 w-48 z-50 border border-gray-700 animate-fade-in">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setOpenMenu(false);
                      }}
                      className="block w-full text-left px-4 py-3 hover:bg-red-500/20 transition-colors flex items-center gap-2"
                    >
                      <FaUser className="text-sm" />
                      <span>Meu Perfil</span>
                    </button>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button
                      onClick={() => {
                        navigate('/');
                        setOpenMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors text-sm text-gray-400"
                    >
                      Voltar ao Dashboard
                    </button>
                  </div>
                )}
              </>
            ) : (
              // Botões para usuário não autenticado
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2"
                >
                  <FaSignInAlt />
                  <span className="hidden sm:inline">Login</span>
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="flex items-center gap-2"
                >
                  <FaUserPlus />
                  <span className="hidden sm:inline">Registrar</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};









