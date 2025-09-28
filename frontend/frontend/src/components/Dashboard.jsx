import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div>
      <div
        className="absolute inset-0 bg-cover bg-center brightness-40 contrast-105 z-0"
        style={{ backgroundImage: "url(img/sova.jpg)" }}
      ></div>

      <div>
        <h1
          className="flex flex-col items-center mt-5 text-2xl font-bold drop-shadow-lg"
          style={{ fontFamily: "Valorant, sans-serif" }}
        >
          Meu Projeto
        </h1>
        <h1
          className="text-2xl font-bold drop-shadow-lg text-center mt-5"
          style={{ fontFamily: "Valorant, sans-serif" }}
        >
          Teste seu conhecimento Valoristicos!
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center mt-2">
        <div className="bg-white/20 backdrop-blur-md rounded-xl shadow-custom sm:w-[350px] flex items-center justify-center">
          <button
            type="button"
            onClick={() => navigate("/guessAgent")}
            className="relative overflow-hidden bg-black text-white font-bold mt-1 mb-1 rounded-lg sm:w-[340px] sm:h-[110px] transition-all duration-500 flex items-center justify-center border-2 border-gray-500 hover:border-red-500 before:absolute before:top-0 before:right-0 before:w-0 before:h-full before:bg-red-500 before:transition-all before:duration-500 hover:before:w-full hover:before:left-0 before:z-0 hover:shadow-[0_0_25px_rgba(255,0,0,1)]"
            style={{ fontFamily: "Valorant, sans-serif" }}
          >
            <span className="relative z-10">Adivinhe o Agente!</span>
          </button>
        </div>

        <div className="absolute flex mb-60 left-20">
          <button
            type="button"
            onClick={() => setOpenMenu(!openMenu)}
            className="bg-gray-500 hover:bg-gray-300 transition-all duration-300 ml-1"
          >
            <FaUser className="text-black text-lg" />
          </button>

          {openMenu && (
            <div className="absolute mt-10 left-15 bg-gray-800 text-white rounded shadow-lg py-2 w-40 z-50">
              <button
                onClick={() => navigate("/login")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Register
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              >
                Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
