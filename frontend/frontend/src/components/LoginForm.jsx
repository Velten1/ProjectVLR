import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../service/authService";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginSubmit() {
    try {
      const response = await login({ email, password });

      if (response) {
        console.log("Login bem-sucedido!");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        console.error("Erro no login:", error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.error("Erro desconhecido no login:", error.message);
        alert("Erro interno no servidor. Tente novamente mais tarde.");
      }
    }
  }

  return (
    <div>
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50 contrast-105 z-0"
        style={{ backgroundImage: "url(img/banner.png)" }}
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

          <div className="mb-14">
            <label
              htmlFor="forgetPassword"
              className="block text-white font-bold py-3 absolute left-7"
              type="forgetPassword"
            >
              <p
                className="text-white font-bold cursor-pointer hover:underline hover:text-red-500"
                onClick={() => navigate("/reset-password")}
              >
                Esqueceu a Senha?
              </p>
            </label>
          </div>
          <div>
            <button
              type="button"
              onClick={loginSubmit}
              className="bg-red-500 hover:bg-red-900 text-white font-bold py-3 px-6 rounded-lg w-full max-w-xs transition-all duration-300 ease-in-out mb-2"
            >
              Login
            </button>
          </div>
          <div>
            <label htmlFor="register" className="" type="register">
              <a
                className="text-white font-bold text-center ml-18 cursor-pointer hover:underline hover:text-red-500"
                onClick={() => navigate("/register")}
              >
                Cadastrar-se!
              </a>
            </label>
            <div>
              <label
                htmlFor="register"
                className="block text-white"
                type="register"
              >
                <p
                  className="text-white font-bold cursor-pointer flex flex-col items-center hover:underline hover:text-red-500"
                  onClick={() => navigate("/")}
                >
                  Continuar sem Login
                </p>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default LoginForm;
