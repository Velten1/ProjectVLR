import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const agents = [
    { name: 'Waylay', role: 'Duelist', gender: 'Female', year: 2025 },
    { name: 'Vyse', role: 'Sentinel', gender: 'Female', year: 2024 },
    { name: 'Clove', role: 'Controller', gender: 'Female', year: 2024 },
    { name: 'Iso', role: 'Duelist', gender: 'Male', year: 2023 },
    { name: 'Deadlock', role: 'Sentinel', gender: 'Female', year: 2023 },
    { name: 'Gekko', role: 'Initiator', gender: 'Male', year: 2023 },
    { name: 'Harbor', role: 'Controller', gender: 'Male', year: 2022 },
    { name: 'Fade', role: 'Initiator', gender: 'Female', year: 2022 },
    { name: 'Neon', role: 'Duelist', gender: 'Female', year: 2022 },
    { name: 'Chamber', role: 'Sentinel', gender: 'Male', year: 2021 },
    { name: 'KAY/O', role: 'Initiator', gender: 'Male', year: 2021 },
    { name: 'Astra', role: 'Controller', gender: 'Female', year: 2021 },
    { name: 'Yoru', role: 'Duelist', gender: 'Male', year: 2021 },
    { name: 'Skye', role: 'Initiator', gender: 'Female', year: 2020 },
    { name: 'Killjoy', role: 'Sentinel', gender: 'Female', year: 2020 },
    { name: 'Reyna', role: 'Duelist', gender: 'Female', year: 2020 },
    { name: 'Brimstone', role: 'Controller', gender: 'Male', year: 2020 },
    { name: 'Viper', role: 'Controller', gender: 'Female', year: 2020 },
    { name: 'Omen', role: 'Controller', gender: 'Male', year: 2020 },
    { name: 'Cypher', role: 'Sentinel', gender: 'Male', year: 2020 },
    { name: 'Sova', role: 'Initiator', gender: 'Male', year: 2020 },
    { name: 'Sage', role: 'Sentinel', gender: 'Female', year: 2020 },
    { name: 'Phoenix', role: 'Duelist', gender: 'Male', year: 2020 },
    { name: 'Raze', role: 'Duelist', gender: 'Female', year: 2020 },
    { name: 'Jett', role: 'Duelist', gender: 'Female', year: 2020 },
    { name: 'Breach', role: 'Initiator', gender: 'Male', year: 2020 },
    { name: 'Tejo', role: 'Initiator', gender: 'Male', year: 2025 },
  ];

  for (const agent of agents) {
    await prisma.agent.upsert({
      where: { name: agent.name },
      update: {},
      create: {
        name: agent.name,
        role: agent.role,
        gender: agent.gender,
        year: agent.year,
      },
    });
  }

  console.log('✅ Agentes inseridos/atualizados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
