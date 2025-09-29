# 🎮 Valorant Quiz - Projeto Full Stack

Um jogo interativo "Adivinhe o Agente" baseado no universo de Valorant, desenvolvido com Node.js, React e MySQL.

![Valorant Quiz](https://img.shields.io/badge/Valorant-Quiz-red?style=for-the-badge&logo=valorant)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

## 📋 Sobre o Projeto

Este é um projeto full stack que combina autenticação segura com um mini-jogo divertido. Os jogadores podem se cadastrar, fazer login e testar seus conhecimentos sobre os agentes do Valorant tentando adivinhar qual é o "Agente do Dia".

### ✨ Funcionalidades

- 🔐 **Sistema de Autenticação Completo**
  - Registro de usuários
  - Login com cookies HttpOnly (seguro)
  - Perfil do usuário
  - Redefinição de senha
  - Logout seguro

- 🎯 **Mini-Jogo "Adivinhe o Agente"**
  - Agente do dia escolhido aleatoriamente
  - Feedback visual para acertos/erros
  - Dicas sobre gênero, função e ano de lançamento
  - Troca automática do agente à meia-noite

- 🎨 **Interface Moderna**
  - Design responsivo com Tailwind CSS
  - Fonte personalizada do Valorant
  - Animações suaves
  - Backgrounds temáticos

## 🛠️ Stack Tecnológica

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação com tokens
- **bcryptjs** - Criptografia de senhas
- **node-cron** - Agendamento de tarefas
- **Joi** - Validação de dados

### Frontend
- **React 19** - Biblioteca de interface
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **Tailwind CSS** - Framework CSS
- **Axios** - Cliente HTTP
- **React Icons** - Ícones

### Banco de Dados
- **MySQL 8.0** - Banco de dados principal
- **Docker** - Containerização do MySQL

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js 18+ 
- MySQL 8+ (ou Docker)
- Yarn (gerenciador de pacotes)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/valorant-quiz.git
cd valorant-quiz
```

### 2. Configure o Backend

```bash
cd api

# Instale as dependências
yarn install

# Configure as variáveis de ambiente
# Crie um arquivo .env na pasta api/ com:
DATABASE_URL="mysql://root:sua_senha@localhost:3306/valorant_quiz"
JWT_SECRET="sua_chave_secreta_super_segura_aqui"
PORT=3002

# Configure o banco de dados
yarn db:push

# Popule com os agentes
yarn seed

# Inicie o servidor
yarn dev
```

### 3. Configure o Frontend

```bash
cd frontend/frontend

# Instale as dependências
yarn install

# Inicie o servidor de desenvolvimento
yarn dev
```

### 4. Acesse a aplicação

- **Frontend:** http://localhost:5173
- **API:** http://localhost:3002
- **Prisma Studio:** `yarn studio` (na pasta api/)

## 🐳 Usando Docker (MySQL)

Se preferir usar Docker para o MySQL:

```bash
# Execute o MySQL em container
docker run --name mysql-valorant \
  -e MYSQL_ROOT_PASSWORD=sua_senha \
  -e MYSQL_DATABASE=valorant_quiz \
  -p 3306:3306 \
  -d mysql:8.0

# Configure o .env com:
DATABASE_URL="mysql://root:sua_senha@localhost:3306/valorant_quiz"
```

## 📚 Estrutura do Projeto

```
valorant-quiz/
├── api/                    # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/         # Configurações (Prisma, DB)
│   │   ├── controllers/    # Controllers (auth, quiz)
│   │   ├── middleware/     # Middleware de autenticação
│   │   ├── repositories/   # Camada de acesso a dados
│   │   ├── routes/         # Rotas da API
│   │   ├── services/       # Lógica de negócio
│   │   ├── scheduler.js    # Tarefa diária (node-cron)
│   │   └── index.js        # Ponto de entrada
│   ├── prisma/
│   │   ├── schema.prisma   # Schema do banco
│   │   └── seed.js         # Dados iniciais
│   └── package.json
├── frontend/frontend/      # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── api/           # Configuração Axios
│   │   ├── service/       # Serviços (auth, quiz)
│   │   └── App.jsx        # Componente principal
│   └── package.json
└── README.md
```

## 🔧 Scripts Disponíveis

### Backend (api/)
```bash
yarn dev          # Servidor de desenvolvimento
yarn start        # Servidor de produção
yarn db:push      # Aplica schema ao banco
yarn migrate      # Executa migrações
yarn seed         # Popula banco com agentes
yarn studio       # Interface visual do Prisma
```

### Frontend (frontend/frontend/)
```bash
yarn dev          # Servidor de desenvolvimento
yarn build        # Build de produção
yarn preview      # Preview do build
yarn lint         # Verificação de código
```

## 🌐 Endpoints da API

Base URL: `http://localhost:3002/api`

### Autenticação (`/auth`)
- `GET /auth/me` - Informações do usuário (autenticado)
- `POST /auth/register` - Registro de usuário
- `POST /auth/login` - Login (define cookie HttpOnly)
- `POST /auth/logout` - Logout (remove cookie)
- `POST /auth/reset-password` - Redefinir senha

### Quiz (`/quiz`)
- `GET /quiz/daily` - Agente do dia atual
- `POST /quiz/guessAgent` - Tentar adivinhar o agente

## 🎮 Como Jogar

1. **Acesse** http://localhost:5173
2. **Cadastre-se** ou faça login
3. **Clique** em "Adivinhe o Agente!"
4. **Digite** o nome de um agente
5. **Receba dicas** sobre gênero, função e ano
6. **Continue tentando** até acertar!

## 🔒 Segurança

- **Cookies HttpOnly** para tokens JWT
- **Senhas criptografadas** com bcrypt
- **Validação de dados** com Joi
- **CORS configurado** adequadamente
- **Variáveis de ambiente** para dados sensíveis

## 🎨 Customização

### Cores e Temas
O projeto usa Tailwind CSS com cores personalizadas do Valorant.

### Fonte
Fonte personalizada "Valorant" disponível em `public/fonts/ValorantFont.ttf`.

### Imagens
Backgrounds e assets em `src/img/`.

## 🐛 Solução de Problemas

### Erro de Porta Ocupada
```bash
# Mate processos Node.js
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force
```

### Erro de Conexão com Banco
- Verifique se o MySQL está rodando
- Confirme as credenciais no `.env`
- Teste a conexão: `yarn studio`

### Erro de Variáveis de Ambiente
- Certifique-se de que o `.env` está na pasta `api/`
- Reinicie o servidor após mudanças

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Próximas Funcionalidades

- 🎵 **Adivinhe pela voz** - Reconhecimento de áudio das armas
- 🗺️ **Mini-game de mapas** - Identificar locais do jogo
- 📊 **Sistema de ranking** - Leaderboard global
- 🔧 **Painel administrativo** - Gerenciar agentes
- 🏆 **Sistema de conquistas** - Badges e recompensas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ⚠️ Aviso Legal

Este é um projeto de fã não oficial. A Riot Games não endossa ou patrocina este projeto. Valorant é uma marca registrada da Riot Games.

## 👨‍💻 Autor

**Caio Velten**
- GitHub: [@Velten1](https://github.com/Velten1)
- LinkedIn: [Caio Velten](https://www.linkedin.com/in/caio-velten-1351b22b7/)

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!** ⭐