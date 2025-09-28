import { useState } from "react";
import { register } from "../service/authService";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function registerSubmit() {
    try {
      const response = await register({ name, email, password });
      if (response) {
        console.log("Cadastro bem-sucedido!");
        navigate("/login")
      }
    } catch (error) {
      if (error.response) {
        console.error("Erro no cadastro:", error.response.data.message);
        alert(error.response.data.message);
      } else {
        console.error("Erro desconhecido no cadastro:", error.message);
        alert("Erro interno no servidor. Tente novamente mais tarde.");
      }
    }
  }

  return (
    <div>
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50 contrast-105"
        style={{ backgroundImage: "url(img/split.png)" }}
      ></div>

      <div className="flex flex-col items-center justify-center mt-1">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-custom max-w-sm sm:w-[390px]">
          <h1 className=" text-2xl font-bold mb-6 drop-shadow-lg text-center">
            Cadastre-se
          </h1>
          <div className="relative">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              className="peer w-full bg-white/10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-500 mb-1"
            />
            <label
              htmlFor="name"
              className="font-bold absolute left-4 transform -translate-y-1/2 scale-100 text-gray-400 transition-all duration-100 peer-placeholder-shown:top-1/2 peer-placeholder-shown:translate-y-[-50%] peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:scale-60 peer-focus:text-red-500 peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:scale-60"
            >
              Username
            </label>
          </div>
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
          <div className="relative w-full mb-10">
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
          <div className="">
            <button
              type="button"
              onClick={registerSubmit}
              className="bg-red-500 hover:bg-red-900 text-white font-bold rounded-lg w-full transition-all duration-300 ease-in-out mb-2"
            >
              Criar
            </button>

            <div className="text-center">
              Ja tem uma conta?
              <div>
                <a
                  className="text-white font-bold cursor-pointer hover:underline hover:text-red-500"
                  onClick={() => navigate("/login")}
                >
                  Logue!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
