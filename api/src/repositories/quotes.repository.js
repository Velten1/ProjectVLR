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

/**
 * Busca outras frases do mesmo agente, excluindo as já mostradas
 * @param {string} agentId - ID do agente
 * @param {string[]} excludedQuoteIds - IDs das frases já mostradas
 * @returns {Promise<Object|null>} Nova frase do mesmo agente ou null se não houver mais
 */
export const getAnotherQuoteFromAgent = async (agentId, excludedQuoteIds = []) => {
  const quotes = await prisma.quote.findMany({
    where: {
      agentId: agentId,
      id: {
        notIn: excludedQuoteIds.length > 0 ? excludedQuoteIds : undefined,
      },
    },
    include: {
      agent: true,
    },
    take: 1,
  });

  return quotes.length > 0 ? quotes[0] : null;
};
