import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, logout } from '../service/authService';
import { Background } from '../components/layout/Background';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Loading } from '../components/ui/Loading';

/**
 * Página de Perfil do Usuário
 */
export const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const response = await getUserProfile();
        setUser(response.data.data);
      } catch (err) {
        console.error('Erro ao buscar perfil:', err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [navigate]);

  function handleLogout() {
    logout();
    navigate('/');
  }

  if (loading || !user) {
    return (
      <div className="relative min-h-screen flex flex-col">
        <Background image="img/banner.png" brightness={50} contrast={105} />
        <div className="relative z-10 flex flex-col flex-grow">
          <div className="flex items-center justify-center flex-grow">
            <Loading text="Carregando perfil..." />
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      <Background image="img/banner.png" brightness={50} contrast={105} />
      
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />
        
        <main className="flex-grow flex items-center justify-center px-4 py-8">
          <Card variant="elevated" className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
              Meu Perfil
            </h1>

            <div className="space-y-4 mb-6">
              <div className="border-b border-white/20 pb-3">
                <p className="text-gray-400 text-sm mb-1">Nome</p>
                <p className="text-white font-semibold text-lg">{user.name}</p>
              </div>

              <div className="border-b border-white/20 pb-3">
                <p className="text-gray-400 text-sm mb-1">E-mail</p>
                <p className="text-white font-semibold text-lg">{user.email}</p>
              </div>

              <div className="pb-3">
                <p className="text-gray-400 text-sm mb-1">Conta criada em</p>
                <p className="text-white font-semibold text-lg">{user.status}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleLogout}
              >
                Fazer Logout
              </Button>

              <button
                type="button"
                onClick={() => navigate('/reset-password')}
                className="text-white text-sm font-bold hover:text-red-500 transition-colors w-full text-center"
              >
                Alterar minha senha
              </button>
            </div>
          </Card>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};









