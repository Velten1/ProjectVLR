import prisma from '../config/prisma.js'

export const getAgentByName = async (name) => {
    return await prisma.agent.findUnique({
      where: { name },
    });
  };
  
export const getDailyQuote = async () => {
  const today = new Date();
  const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0));
  const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));

  let dailyQuote = await prisma.dailyQuote.findFirst({
    where: {
      date: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
    include: {
      quote: {
        include: {
          agent: true,
        },
      },
    },
  });

  if (!dailyQuote) {
    const randomQuote = await prisma.quote.findFirst({
      orderBy: {
        id: 'asc',
      },
      skip: Math.floor(Math.random() * 135), // Total de frases
      include: {
        agent: true,
      },
    });

    if (!randomQuote) {
      return null;
    }

    dailyQuote = await prisma.dailyQuote.create({
      data: {
        quoteId: randomQuote.id,
        date: startOfDay,
      },
      include: {
        quote: {
          include: {
            agent: true,
          },
        },
      },
    });
  }

  return dailyQuote.quote;
};

export const deleteDayQuote = async () => {
  await prisma.dailyQuote.deleteMany({});
};

export const getQuoteByName = async (agentName) => {
  return await prisma.agent.findUnique({
    where: { name: agentName }
  });
};
