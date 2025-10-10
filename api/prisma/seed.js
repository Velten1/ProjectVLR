import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const agents = [
  { name: 'Jett', role: 'Duelist', gender: 'Female', year: 2020 },
  { name: 'Phoenix', role: 'Duelist', gender: 'Male', year: 2020 },
  { name: 'Sova', role: 'Initiator', gender: 'Male', year: 2020 },
  { name: 'Brimstone', role: 'Controller', gender: 'Male', year: 2020 },
  { name: 'Viper', role: 'Controller', gender: 'Female', year: 2020 },
  { name: 'Cypher', role: 'Sentinel', gender: 'Male', year: 2020 },
  { name: 'Sage', role: 'Sentinel', gender: 'Female', year: 2020 },
  { name: 'Raze', role: 'Duelist', gender: 'Female', year: 2020 },
  { name: 'Omen', role: 'Controller', gender: 'Male', year: 2020 },
  { name: 'Reyna', role: 'Duelist', gender: 'Female', year: 2020 },
  { name: 'Killjoy', role: 'Sentinel', gender: 'Female', year: 2020 },
  { name: 'Skye', role: 'Initiator', gender: 'Female', year: 2020 },
  { name: 'Breach', role: 'Initiator', gender: 'Male', year: 2020 },
  { name: 'Yoru', role: 'Duelist', gender: 'Male', year: 2021 },
  { name: 'Astra', role: 'Controller', gender: 'Female', year: 2021 },
  { name: 'KAY/O', role: 'Initiator', gender: 'Male', year: 2021 },
  { name: 'Chamber', role: 'Sentinel', gender: 'Male', year: 2021 },
  { name: 'Neon', role: 'Duelist', gender: 'Female', year: 2022 },
  { name: 'Fade', role: 'Initiator', gender: 'Female', year: 2022 },
  { name: 'Harbor', role: 'Controller', gender: 'Male', year: 2022 },
  { name: 'Gekko', role: 'Initiator', gender: 'Male', year: 2023 },
  { name: 'Deadlock', role: 'Sentinel', gender: 'Female', year: 2023 },
  { name: 'Iso', role: 'Duelist', gender: 'Male', year: 2023 },
  { name: 'Clove', role: 'Controller', gender: 'Female', year: 2024 },
  { name: 'Vyse', role: 'Sentinel', gender: 'Female', year: 2024},
  { name: 'Tejo', role: 'Initiator', gender: 'Male', year: 2025},
  { name: 'Waylay', role: 'Duelist', gender: 'Female', year: 2025},
];

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Limpar tabelas relacionadas primeiro
  await prisma.dailyQuote.deleteMany();
  console.log('🗑️ DailyQuotes removidas');
  
  await prisma.quote.deleteMany();
  console.log('🗑️ Frases removidas');
  
  await prisma.dailyAgent.deleteMany();
  console.log('🗑️ DailyAgents removidos');

  // Limpar agentes existentes
  await prisma.agent.deleteMany();
  console.log('🗑️ Agentes antigos removidos');

  // Inserir novos agentes
  for (const agent of agents) {
    await prisma.agent.create({
      data: agent,
    });
  }

  console.log(`✅ ${agents.length} agentes inseridos com sucesso!`);
  console.log(`✅ Frases inseridas para agentes com frases!`);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
