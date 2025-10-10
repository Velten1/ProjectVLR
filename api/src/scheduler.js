import cron from 'node-cron';
import { deleteDayAgent, getDailyAgent } from '../src/repositories/quiz.repository.js';
import { deleteDayQuote, getDailyQuote } from '../src/repositories/quotes.repository.js';

cron.schedule('0 0 * * *', async () => {
  // Limpar e criar novo agente do dia
  await deleteDayAgent();
  await getDailyAgent();
  
  // Limpar e criar nova frase do dia
  await deleteDayQuote();
  await getDailyQuote();
});
