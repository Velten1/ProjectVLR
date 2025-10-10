import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const agentsWithQuotes = [
  { 
    name: 'Jett', 
    role: 'Duelist', 
    gender: 'Female', 
    year: 2020,
    quotes: [
      "Olha essa!",
      "Não se mete comigo!",
      "Bloqueando a visão.",
      "Vento, me mostra aonde ir.",
      "Morrer aqui seria um saco."
    ]
  },
  { 
    name: 'Phoenix', 
    role: 'Duelist', 
    gender: 'Male', 
    year: 2020,
    quotes: [
      "Cuidado com os olhos!",
      "Até parece que a gente ia perder.",
      "Manda uma entreguinha ae!",
      "Namoral, cê morreu!",
      "Não vão se acomodando não, ainda tem muito chão."
    ]
  },
  { 
    name: 'Sova', 
    role: 'Initiator', 
    gender: 'Male', 
    year: 2020,
    quotes: [
      "Eu sou o caçador.",
      "Somos fortes porque estamos juntos.",
      "Se hoje a sua mira estiver ruim, não se preocupe, tem outros jeitos de ajudar.",
      "Aonde quer que forem, vou encontrá-los.",
      "Na natureza, fogo é vida."
    ]
  },
  { 
    name: 'Breach', 
    role: 'Initiator', 
    gender: 'Male', 
    year: 2020,
    quotes: [
      "Hora de quebrar tudo!",
      "Paredão caiu!",
      "Tremendo na base!",
      "Acho que machuquei alguém!",
      "Não tem como parar isso!"
    ]
  },
  { 
    name: 'Brimstone', 
    role: 'Controller', 
    gender: 'Male', 
    year: 2020,
    quotes: [
      "Mais barato que isso só eu com uma garrafa de whisky.",
      "Humano ou não, o Omen pode ser morto.",
      "Abram os céus.",
      "Cachorro velho, não só aprende truque novo como domina todos!",
      "Quem é o cachorro velho agora?"
    ]
  },
  { 
    name: 'Viper', 
    role: 'Controller', 
    gender: 'Female', 
    year: 2020,
    quotes: [
      "Não entra no caminho.",
      "Esse é o meu mundo!",
      "Será que vão implorar? sempre imploram depois de um tempo.",
      "Orbe de veneno ativo.",
      "Isolar e exterminar."
    ]
  },
  { 
    name: 'Cypher', 
    role: 'Sentinel', 
    gender: 'Male', 
    year: 2020,
    quotes: [
      "Sei exatamente onde você está.",
      "Cuidado.",
      "Ah, um bom lugar.",
      "Isso vai aqui.",
      "Aquilo vai ali."
    ]
  },
  { 
    name: 'Sage', 
    role: 'Sentinel', 
    gender: 'Female', 
    year: 2020,
    quotes: [
      "Pra você.",
      "Sua missão não acabou!",
      "Me dá um minuto.",
      "Nós podemos revidar, somos imbatíveis.",
      "Foi pra isso que treinei."
    ]
  },
  { 
    name: 'Raze', 
    role: 'Duelist', 
    gender: 'Female', 
    year: 2020,
    quotes: [
      "Vou brocar.",
      "Chegou o reggae.",
      "Ae, tu brocou.",
      "Quer poder de fogo? Xá comigo!!",
      "Vam' botá eles pá correr!"
    ]
  },
  { 
    name: 'Omen', 
    role: 'Controller', 
    gender: 'Male', 
    year: 2020,
    quotes: [
      "Sou o princípio e o fim.",
      "Roubando visão.",
      "Ali não.",
      "Sombras viajando.",
      "Eles vão fugir!"
    ]
  },
  { 
    name: 'Reyna', 
    role: 'Duelist', 
    gender: 'Female', 
    year: 2020,
    quotes: [
      "Acharam mesmo que ia dar certo?",
      "Pobres criaturas miseráveis.",
      "Parasita.",
      "Tolos cegos.",
      "Cortando a visão."
    ]
  },
  { 
    name: 'Killjoy', 
    role: 'Sentinel', 
    gender: 'Female', 
    year: 2020,
    quotes: [
      "Foco nos abates.",
      "Foram torretados.",
      "Como previsto.",
      "Mataram meu robô.",
      "Eu pego esse fantasminha camarada."
    ]
  },
  { 
    name: 'Skye', 
    role: 'Initiator', 
    gender: 'Female', 
    year: 2020,
    quotes: [
      "Té' mais parça.",
      "Mais um.",
      "Olha a cura!",
      "Lá vai Falcão.",
      "Hora da caçada."
    ]
  },
  { 
    name: 'Yoru', 
    role: 'Duelist', 
    gender: 'Male', 
    year: 2021,
    quotes: [
      "Isca destruída.",
      "Eu resolvo.",
      "Hora de saltar.",
      "Volto já.",
      "Quem é o próximo?"
    ]
  },
  { 
    name: 'Astra', 
    role: 'Controller', 
    gender: 'Female', 
    year: 2021,
    quotes: [
      "Sem estrela não dá!",
      "Desse jeito.",
      "Essa é a sua glória.",
      "Precisamos ser melhores.",
      "Avante por glória."
    ]
  },
  { 
    name: 'KAY/O', 
    role: 'Initiator', 
    gender: 'Male', 
    year: 2021,
    quotes: [
      "Vamos nessa.",
      "Lá vai granada.",
      "Ninguém pode fugir.",
      "Você está vulnerável!",
      "Ataquem quando eu os suprimir."
    ]
  },
  { 
    name: 'Chamber', 
    role: 'Sentinel', 
    gender: 'Male', 
    year: 2021,
    quotes: [
      "Eles estão muito mortos.",
      "Foco, não se distraiam comigo.",
      "Eu nunca erro.",
      "Esse é o melhor deles? Vergonha da profissão.",
      "Um passo adiante."
    ]
  },
  { 
    name: 'Neon', 
    role: 'Duelist', 
    gender: 'Female', 
    year: 2022,
    quotes: [
      "Seis podem ficar vivo faz favor?",
      "Salamat, valeu.",
      "Tô puta.",
      "Estão vieram até aqui? Que idiotice!",
      "Tá em choque?"
    ]
  },
  { 
    name: 'Fade', 
    role: 'Initiator', 
    gender: 'Female', 
    year: 2022,
    quotes: [
      "Todos tem medo de alguma coisa.",
      "Olho vivo.",
      "O pesadelo veio pro nosso lado.",
      "Quantas vezes temos que expulsá-los?",
      "Encare seu medo!"
    ]
  },
  { 
    name: 'Harbor', 
    role: 'Controller', 
    gender: 'Male', 
    year: 2022,
    quotes: [
      "Vou na frente.",
      "Ao meu sinal.",
      "A gente começou com o pé direito.",
      "Maré subindo.",
      "A maré vai virar!"
    ]
  },
  { 
    name: 'Gekko', 
    role: 'Initiator', 
    gender: 'Male', 
    year: 2023,
    quotes: [
      "Tubarão vai te pegar.",
      "Acima e avante.",
      "Atiraram nela.",
      "Corre maninho.",
      "Parcinha desarmando."
    ]
  },
  { 
    name: 'Deadlock', 
    role: 'Sentinel', 
    gender: 'Female', 
    year: 2023,
    quotes: [
      "Morrer não é uma opção.",
      "O melhor da tecnologia.",
      "A morte deles requer nossa atenção.",
      "Confiem em mim, cumpriremos essa missão.",
      "Meu território, minhas regras."
    ]
  },
  { 
    name: 'Iso', 
    role: 'Duelist', 
    gender: 'Male', 
    year: 2023,
    quotes: [
      "Só eu e você agora!",
      "Acabou o tempo, chegou a hora.",
      "Me mostra o alvo.",
      "Foco.",
      "Se a dor ensina, eu aprendi muito."
    ]
  },
  { 
    name: 'Clove', 
    role: 'Controller', 
    gender: 'Female', 
    year: 2024,
    quotes: [
      "Morte matada.",
      "Todo mundo tem dias ruins né?",
      "Eu não desisto.",
      "Acho que vou tirar um cochilo depois dessa.",
      "Voltei, parece que eu nem fui."
    ]
  },
  { 
    name: 'Vyse', 
    role: 'Sentinel', 
    gender: 'Female', 
    year: 2024,
    quotes: [
      "Todo o arsenal é meu!",
      "Não deixo pontas soltas!",
      "Espinhos acionados!",
      "Agora é só esperar.",
      "Pra que estudar se não aprendemos nada?"
    ]
  },
  { 
    name: 'Tejo', 
    role: 'Initiator', 
    gender: 'Male', 
    year: 2025,
    quotes: [
      "Novas armas, mesma guerra!",
      "No tenemos hermanos.",
      "Mísseis a caminho!",
      "Vá em frente, tenta reagir!",
      "É assim que acaba!!"
    ]
  },
  { 
    name: 'Waylay', 
    role: 'Duelist', 
    gender: 'Female', 
    year: 2025,
    quotes: [
      "Um por um.",
      "Faz a fila, vem com tudo!",
      "Eu não tento, eu faço.",
      "Xiu, as crianças estão dormindo...",
      "Ninguém te dá o que você quer de mão beijada."
    ]
  }
];

async function main() {
  console.log('🌱 Iniciando seed do banco de dados com frases...');

  // Limpar tabelas relacionadas primeiro
  await prisma.quote.deleteMany();
  console.log('🗑️ Frases removidas');
  
  await prisma.dailyAgent.deleteMany();
  console.log('🗑️ DailyAgents removidos');

  // Limpar agentes existentes
  await prisma.agent.deleteMany();
  console.log('🗑️ Agentes antigos removidos');

  // Inserir agentes com suas frases
  for (const agentData of agentsWithQuotes) {
    const { quotes, ...agentInfo } = agentData;
    
    const agent = await prisma.agent.create({
      data: agentInfo,
    });

    // Inserir frases do agente
    for (const quoteText of quotes) {
      await prisma.quote.create({
        data: {
          text: quoteText,
          agentId: agent.id,
        },
      });
    }
  }

  console.log(`✅ ${agentsWithQuotes.length} agentes inseridos com sucesso!`);
  console.log(`✅ Frases inseridas para cada agente!`);
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });