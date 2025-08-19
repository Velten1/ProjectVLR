import prisma from '../config/prisma.js';

export const getDailyAgent = async () => {
  const today = new Date();
  const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));
  const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));

  const dailyAgent = await prisma.dailyAgent.findFirst({
    where: {
      date: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
    include: {
      agent: true,
    },
  });

  if (!dailyAgent) {
    const randomAgent = await prisma.agent.findFirst({
      orderBy: {
        id: 'asc',
      },
      skip: Math.floor(Math.random() * 27),
    });

    if (!randomAgent) {
      return null;
    }

    dailyAgent = await prisma.dailyAgent.create({
      data: {
        agentId: randomAgent.id,
        date: startOfDay,
      },
      include: {
        agent: true,
      },
    });
  }

  return dailyAgent.agent;
};

export const getAgentByName = async (name) => {
  return await prisma.agent.findUnique({
    where: { name },
  });
};

export const deleteDayAgent = async () => {
  await prisma.dailyAgent.deleteMany({});
};
