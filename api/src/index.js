import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import quizRoutes from './routes/quiz.routes.js';
import quotesRoutes from './routes/quotes.routes.js'
import './scheduler.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/quotes', quotesRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
