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

async function changeUpdatedAt(id: number) {
  await prisma.game.update({
    where: {
      id,
    },
    data: {
      updatedAt: new Date().toISOString(),
    },
  });
}

async function markGameAsFinished(id: number, homeTeamScore: number, awayTeamScore: number) {
  return await prisma.game.update({
    where: {
      id,
    },
    data: {
      isFinished: true,
      homeTeamScore,
      awayTeamScore,
    },
  });
}

export const gameRepository = {
  post,
  getAll,
  getById,
  changeUpdatedAt,
  markGameAsFinished,
};
