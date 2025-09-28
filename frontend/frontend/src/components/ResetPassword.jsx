import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../service/authService";

function resetPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  async function resetPasswordSubmit() {
    try {
      const response = await resetPassword({ email, password, newPassword });

      if (response) {
        console.log("Troca de senha efetuada!");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        console.error("Erro na troca de senha", error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.error("Erro desconhecido na troca", error.message);
      }
      alert("Erro interno no servidor. Tente novamente mais tarde.");
    }
  }

  return (
    <div>
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50 contrast-105 z-0"
        style={{ backgroundImage: "url(img/resetpasswordimg.jpg)" }}
      ></div>

      <div className="flex flex-col items-center justify-center gap-y-6 mt-22">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-custom max-w-sm w-full sm:w-[290px]">
          <h1 className="text-2xl font-bold mb-6 ml-13 drop-shadow-lg">
            Bem Vindo!
          </h1>
          <div className="relative">
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="peer w-full bg-white/10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-500 mb-1"
            />
            <label
              htmlFor="email"
              className="font-bold absolute left-4 transform -translate-y-1/2 scale-100 text-gray-400 transition-all duration-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:scale-60 peer-focus:text-red-500 peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:scale-60"
            >
              E-mail
            </label>
          </div>
          <div className="relative w-full">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="peer w-full bg-white/10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-500 mb-1"
            />
            <label
              htmlFor="password"
              className="font-bold absolute left-4 transform -translate-y-1/2 scale-100 text-gray-400 transition-all duration-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:scale-60 peer-focus:text-red-500 peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:scale-60"
            >
              Senha
            </label>
          </div>
          <div className="relative w-full">
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder=" "
              className="peer w-full bg-white/10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-500 mb-1"
            />
            <label
              htmlFor="newPassword"
              className="font-bold absolute left-4 transform -translate-y-1/2 scale-100 text-gray-400 transition-all duration-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:scale-60 peer-focus:text-red-500 peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:scale-60"
            >
              Nova Senha
            </label>
          </div>
          <div>
            <button
              type="button"
              onClick={resetPasswordSubmit}
              className="bg-red-500 hover:bg-red-900 text-white font-bold py-3 px-6 rounded-lg w-full max-w-xs transition-all duration-300 ease-in-out mb-2"
            >
              Alterar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default resetPasswordForm;
