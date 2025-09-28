<<<<<<< HEAD

## Projeto Full Stack – Quiz de Agentes (API + Frontend)

Aplicação full stack com autenticação via cookie HttpOnly e um mini‑jogo “Adivinhe o Agente do Dia”. Backend em Node.js/Express com Prisma/MySQL; frontend em React/Vite com Tailwind.

### Stack

- Backend: Node.js, Express, Prisma, MySQL/Docker, JWT, Joi, node-cron
- Frontend: React, Vite, Tailwind CSS, React Router, Axios

### Estrutura de Pastas

```
api/                # Backend (Express + Prisma)
  src/
    config/             # Prisma e DB
    controllers/        # Controllers (auth, quiz)
    middleware/         # Auth middleware
    repositories/       # Prisma repositories
    routes/             # Rotas Express
    services/           # Regras de negócio
    scheduler.js        # Tarefa diária do agente do dia
    index.js            # Bootstrap do servidor
  prisma/
    schema.prisma       # Schema Prisma (User, Agent, DailyAgent)
    seed.js             # Seed de agentes

frontend/frontend/       # Frontend (React + Vite)
  src/
    api/api.js          # Axios base (http://localhost:3001/api/)
    components/         # Telas/Componentes (Login, Register, Dashboard, GuessAgent)
    service/            # Serviços (authService, quizService)
```

## Requisitos

- Node.js 18+
- MySQL 8+

## Backend (api)

### Variáveis de Ambiente

Crie um arquivo `.env` dentro de `api/` com:

```env
DATABASE_URL="mysql://USER:PASS@localhost:3306/NOME_DO_BANCO"
JWT_SECRET="uma_chave_secreta_segura"
# Opcional
PORT=3001
```

Obs.: o CORS está configurado para `http://localhost:5173`. Ajuste em `src/index.js` se necessário.

### Instalação e Banco de Dados

```bash
cd api

# Instalar deps
yarn install

# Criar/atualizar schema no banco (use UMA das opções)
yarn db:push           # aplica o schema atual diretamente
# ou
yarn migrate           # gera/aplica migrações (ambiente dev)

# Popular tabela de agentes
yarn seed

# (Opcional) Inspecionar dados com Prisma Studio
yarn studio
```

### Rodar em desenvolvimento

```bash
cd api
yarn dev
# Servidor em: http://localhost:3001
```

### Endpoints

Base URL: `http://localhost:3001/api`

- Auth (`/auth`)

  - `GET /auth/me` (autenticado): informações do usuário
  - `POST /auth/register` { name, email, password }
  - `POST /auth/login` { email, password } → seta cookie `token` HttpOnly
  - `POST /auth/logout` (autenticado)
  - `POST /auth/reset-password` (autenticado) { email, password, newPassword }
  - `DELETE /auth/delete-user` (autenticado) { email, password, confirmPassword }
  - `PUT /auth/update-user` (autenticado) { email, newEmail, password }
  - `PUT /auth/update-name` (autenticado) { name }

- Quiz (`/quiz`)
  - `GET /quiz/daily` → agente do dia atual { id, name }
  - `POST /quiz/guessAgent` { agentName }
    - Response: `{ status, message, guessResult: { correct, role, gender, year } }`

### Agente do Dia (scheduler)

- `src/scheduler.js` executa diariamente (00:00) para limpar e definir um novo agente do dia.
- Em `repositories/quiz.repository.js`, `getDailyAgent()` garante que exista um agente do dia, criando se necessário.

## Frontend (frontend/frontend)

### Instalação e Desenvolvimento

```bash
cd frontend/frontend
yarn install
yarn dev
# App em: http://localhost:5173
```

API base está definida em `src/api/api.js` como `http://localhost:3001/api/`. Se o backend rodar em outra porta/host, ajuste este arquivo.

### Principais Telas/Fluxos

- `LoginForm.jsx` e `RegisterForm.jsx`: autenticação via cookie HttpOnly
- `Dashboard.jsx`: navegação principal
- `GuessAgent.jsx`: jogo “Adivinhe o Agente”
  - Ao acertar, o input é desabilitado e uma mensagem de sucesso é exibida

## Dicas e Solução de Problemas

- Se o CORS falhar, confirme a origem em `api/src/index.js`.
- Confirme `.env` e acesso ao MySQL (usuário, senha, schema).
- Se não houver agentes, rode `yarn seed` no backend.
- Para validar o “agente do dia”: `GET http://localhost:3001/api/quiz/daily`.

## Scripts úteis

Backend:

```bash
yarn dev          # roda servidor em desenvolvimento
yarn start        # roda servidor em produção (node)
yarn db:push      # aplica schema ao banco
yarn migrate      # migrações (dev)
yarn seed         # popula agentes
yarn studio       # Prisma Studio
```

Frontend:

```bash
yarn dev          # Vite dev server
yarn build        # build de produção
yarn preview      # pré-visualização do build
```

## Observações

Este é um projeto individual desenvolvido com o objetivo de estudar e aprimorar conhecimentos em programação.  
O código ainda pode conter bugs e pontos a melhorar, e novas funcionalidades serão adicionadas ao longo do tempo.

## Próximos Passos / Funcionalidades Futuras

- 🎯 **Acertar a skin pelo som da arma** — reprodução de áudio e escolha da skin correta.
- 🗺 **Mini-game de mapas** — recorte de uma parte do mapa para o jogador identificar.
- 🕹 **Mais modos de jogo** — ampliar variedade e desafios.
- 📊 **Sistema de ranking** — leaderboard para comparar pontuações entre usuários.
- 🔧 **Painel administrativo** - Área restrita (com token de admin) para gerenciamento do jogo, incluindo adição de novos personagens ao banco de dados.

## Licença

Este projeto está disponível sob a MIT License. Sinta-se livre para usar, estudar, modificar e distribuir, desde que mantenha os devidos créditos.

Obrigado por conferir! Qualquer dúvida ou sugestão, fique à vontade para abrir uma issue ou enviar um pull request. Bons estudos e boa codificação!
