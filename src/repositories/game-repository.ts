import prisma from '@/database/database';

async function post(homeTeamName: string, awayTeamName: string) {
  return await prisma.game.create({
    data: {
      homeTeamName,
      awayTeamName,
    },
  });
}

async function getAll() {
  return await prisma.game.findMany();
}

export const gameRepository = {
  post,
  getAll,
};
