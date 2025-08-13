import cron from 'node-cron';
import { deleteDayAgent } from '../src/repositories/quiz.repository.js';
import { getDailyAgent } from '../src/repositories/quiz.repository.js';

cron.schedule('0 0 * * *', async () => {
  await deleteDayAgent();

  await getDailyAgent();
});
