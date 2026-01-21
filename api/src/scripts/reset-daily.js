import { deleteDayAgent, getDailyAgent } from '../repositories/quiz.repository.js';
import { deleteDayQuote, getDailyQuote } from '../repositories/quotes.repository.js';
import prisma from '../config/prisma.js';

async function resetDaily() {
  try {
    console.log('🔄 Iniciando reset dos desafios diários...\n');

    // Reset DailyAgent
    console.log('🗑️  Removendo DailyAgent...');
    await deleteDayAgent();
    console.log('✅ DailyAgent removido\n');

    console.log('🎲 Criando novo DailyAgent...');
    const newAgent = await getDailyAgent();
    if (newAgent) {
      console.log(`✅ Novo agente do dia: ${newAgent.name}\n`);
    } else {
      console.log('⚠️  Nenhum agente encontrado\n');
    }

    // Reset DailyQuote
    console.log('🗑️  Removendo DailyQuote...');
    await deleteDayQuote();
    console.log('✅ DailyQuote removido\n');

    console.log('🎲 Criando nova DailyQuote...');
    const newQuote = await getDailyQuote();
    if (newQuote) {
      console.log(`✅ Nova frase do dia criada`);
      console.log(`   Agente: ${newQuote.agent.name}`);
      console.log(`   Frase: "${newQuote.text.substring(0, 50)}..."\n`);
    } else {
      console.log('⚠️  Nenhuma frase encontrada\n');
    }

    console.log('✅ Reset concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao resetar:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

resetDaily();





