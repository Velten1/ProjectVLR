import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative w-screen bg-gray-900 text-white py-2 text-center ">
      <div className="mx-auto">
        <h2 className="text-lg font-bold mb-1">Meu Projeto</h2>
        <p className="text-gray-400 text-xs">Criando algo único para a comunidade!</p>

        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="https://github.com/Velten1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out hover:brightness-125 text-2xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/caio-velten-1351b22b7/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-all duration-300 ease-in-out hover:brightness-125 text-2xl"
          >
            <FaLinkedin />
          </a>
        </div>

        <p className="text-xs text-gray-500 mt-1">
          © 2025 Meu Projeto. Todos os direitos reservados.
        </p>
        <p className="text-xs text-gray-500">
          Este é um projeto de fã. A Riot Games não endossa ou patrocina este projeto.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
