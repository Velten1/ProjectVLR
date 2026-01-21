import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../service/authService';
import { Background } from '../components/layout/Background';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

/**
 * Página de Registro
 */
export const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await register({ name, email, password });

      if (response) {
        console.log('Cadastro bem-sucedido!');
        navigate('/login');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao criar conta. Tente novamente.';
      setError(errorMessage);
      console.error('Erro no cadastro:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <Background image="img/split.png" brightness={50} contrast={105} />
      
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />
        
        <main className="flex-grow flex items-center justify-center px-4 py-8">
          <Card variant="elevated" className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
              Cadastre-se
            </h1>

            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                id="name"
                label="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                error={!!error}
              />

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

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Criando conta...' : 'Criar Conta'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white text-sm">
                Já tem uma conta?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-red-500 font-bold hover:text-red-400 transition-colors"
                >
                  Logue!
                </button>
              </p>
            </div>
          </Card>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};









