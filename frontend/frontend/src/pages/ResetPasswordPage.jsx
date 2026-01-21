import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../service/authService';
import { Background } from '../components/layout/Background';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

/**
 * Página de Reset de Senha
 */
export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleResetPassword(e) {
    e.preventDefault();
    
    if (!email.trim() || !password.trim() || !newPassword.trim()) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password === newPassword) {
      setError('A nova senha deve ser diferente da senha atual.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const response = await resetPassword({ email, password, newPassword });

      if (response) {
        console.log('Troca de senha efetuada!');
        setSuccess(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Erro ao alterar senha. Tente novamente.';
      setError(errorMessage);
      console.error('Erro na troca de senha:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <Background image="img/resetpasswordimg.jpg" brightness={50} contrast={105} />
      
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />
        
        <main className="flex-grow flex items-center justify-center px-4 py-8">
          <Card variant="elevated" className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
              Alterar Senha
            </h1>

            {success ? (
              <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
                <p className="text-green-300 font-semibold">
                  Senha alterada com sucesso! Redirecionando...
                </p>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
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
                  label="Senha Atual"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  error={!!error}
                />

                <Input
                  id="newPassword"
                  label="Nova Senha"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                  {loading ? 'Alterando...' : 'Alterar Senha'}
                </Button>
              </form>
            )}
          </Card>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};









