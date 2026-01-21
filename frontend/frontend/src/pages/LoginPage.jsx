import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/authService';
import { Background } from '../components/layout/Background';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

/**
 * Página de Login
 */
export const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await login({ email, password });

      if (response && response.data) {
        // Tokens já são salvos automaticamente pelo authService
        console.log('Login bem-sucedido!');
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
      setError(errorMessage);
      console.error('Erro no login:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <Background image="img/banner.png" brightness={50} contrast={105} />
      
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />
        
        <main className="flex-grow flex items-center justify-center px-4 py-8">
          <Card variant="elevated" className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
              Bem Vindo!
            </h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                id="email"
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                error={!!error}
              />

              <Input
                id="password"
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                error={!!error}
              />

              {error && (
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-3">
                  <p className="text-red-300 text-sm text-center">{error}</p>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/reset-password')}
                  className="text-white text-sm font-bold hover:text-red-500 transition-colors"
                >
                  Esqueceu a Senha?
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Login'}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-white text-sm">
                Não tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="text-red-500 font-bold hover:text-red-400 transition-colors"
                >
                  Cadastrar-se!
                </button>
              </p>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-white text-sm font-bold hover:text-red-500 transition-colors"
              >
                Continuar sem Login
              </button>
            </div>
          </Card>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};










