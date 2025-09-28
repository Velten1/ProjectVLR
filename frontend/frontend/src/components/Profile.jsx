import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, logout } from "../service/authService";

function Profile() {
  const navigate = useNavigate();

  // Estado para armazenar os dados do usuário retornados pela API
  const [user, setUser] = useState(null);

  // useEffect roda uma vez quando o componente é montado
  useEffect(() => {
    async function fetchUser() {
      try {
        // Faz a requisição GET /auth/me
        const response = await getUserProfile();

        // Salva os dados no estado (um data do axios, outro da API)
        setUser(response.data.data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);

        // Se o token for inválido ou expirado, volta pro login
        navigate("/");
      }
    }

    fetchUser();
  }, [navigate]);

  // Função para encerrar sessão
  function handleLogout() {
    logout(); // remove o token do localStorage
    navigate("/"); // redireciona para login
  }

  // Enquanto os dados ainda não chegaram, mostra um loading simples
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-white font-bold">
        Carregando perfil...
      </div>
    );
  }

  // Quando o user já estiver carregado, exibe normalmente
  return (
    <div>
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50 contrast-105 z-0"
        style={{ backgroundImage: "url(img/banner.png)" }}
      ></div>

      <div className="flex flex-col items-center justify-center gap-y-6 mt-22">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-custom max-w-sm w-full sm:w-[290px]">
          <h1 className="text-2xl font-bold mb-6 text-center text-white drop-shadow-lg">
            Meu Perfil
          </h1>

          <div className="mb-4 space-y-2">
            <p className="text-white font-bold">
              Nome:{" "}
              <span className="font-normal text-gray-200">{user.name}</span>
            </p>
            <p className="text-white font-bold">
              E-mail:{" "}
              <span className="font-normal text-gray-200">{user.email}</span>
            </p>
            <p className="text-white font-bold">
              Criado em:{" "}
              <span className="font-normal text-gray-200">{user.status}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-900 text-white font-bold py-2 px-6 rounded-lg w-full max-w-xs transition-all duration-300 ease-in-out mb-2"
          >
            Fazer Logout
          </button>

          <p
            className="text-white font-bold cursor-pointer hover:underline hover:text-red-500"
            onClick={() => navigate("/reset-password")}
          >
            Alterar minha senha
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
