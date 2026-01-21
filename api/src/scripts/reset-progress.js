import prisma from '../config/prisma.js';

async function resetProgress() {
  try {
    console.log('🔄 Iniciando reset do progresso dos usuários...\n');

    // Contar quantos registros estão com completed = true
    const countBefore = await prisma.userDailyProgress.count({
      where: {
        completed: true,
      },
    });

    console.log(`📊 Registros com completed = true: ${countBefore}\n`);

    if (countBefore === 0) {
      console.log('ℹ️  Nenhum registro encontrado para resetar.');
      return;
    }

    // Resetar todos os registros de completed = true para false
    console.log('🔄 Resetando completed de true para false...');
    const result = await prisma.userDailyProgress.updateMany({
      where: {
        completed: true,
      },
      data: {
        completed: false,
      },
    });

    console.log(`✅ ${result.count} registro(s) resetado(s) com sucesso!\n`);

    // Verificar se ainda há registros com completed = true
    const countAfter = await prisma.userDailyProgress.count({
      where: {
        completed: true,
      },
    });

    console.log(`📊 Registros com completed = true após reset: ${countAfter}`);
    console.log('✅ Reset do progresso concluído!');
  } catch (error) {
    console.error('❌ Erro ao resetar progresso:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

resetProgress();




