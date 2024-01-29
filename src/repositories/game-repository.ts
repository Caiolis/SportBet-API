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

async function getById(id: number) {
  return await prisma.game.findUnique({
    where: {
      id,
    },
  });
}

export const gameRepository = {
  post,
  getAll,
  getById,
};
