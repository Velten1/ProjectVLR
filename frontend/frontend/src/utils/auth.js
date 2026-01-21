import { useState, useEffect } from 'react';

/**
 * Utilitários para verificação de autenticação
 */

/**
 * Verifica se o usuário está autenticado verificando token no localStorage e cookies
 */
export const isAuthenticated = () => {
  // Verifica token no localStorage (prioridade)
  try {
    const tokenLocalStorage = localStorage.getItem('token');
    if (tokenLocalStorage && 
        tokenLocalStorage.trim() !== '' && 
        tokenLocalStorage !== 'null' && 
        tokenLocalStorage !== 'undefined' &&
        tokenLocalStorage.length > 10) { // Token deve ter um tamanho mínimo
      return true;
    }
  } catch {
    // localStorage pode não estar disponível
  }

  // Verifica token nos cookies (cookies httpOnly não são acessíveis via JS, mas verificamos se houver)
  try {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const trimmed = cookie.trim();
      if (trimmed.startsWith('token=')) {
        const tokenValue = trimmed.substring(6); // Remove 'token='
        if (tokenValue && 
            tokenValue.trim() !== '' && 
            tokenValue !== 'null' && 
            tokenValue !== 'undefined' &&
            tokenValue.length > 10) {
          return true;
        }
      }
    }
  } catch {
    // Cookies podem não estar disponíveis
  }
  
  return false;
};

/**
 * Hook personalizado para verificar autenticação (pode ser usado em componentes)
 */
export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  useEffect(() => {
    // Verifica autenticação periodicamente
    const checkAuth = () => {
      setAuthenticated(isAuthenticated());
    };

    // Verifica a cada 1 segundo
    const interval = setInterval(checkAuth, 1000);

    return () => clearInterval(interval);
  }, []);

  return authenticated;
};









