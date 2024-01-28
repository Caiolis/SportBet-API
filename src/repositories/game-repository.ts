import prisma from '@/database/database';

async function post(homeTeamName: string, awayTeamName: string) {
  return await prisma.game.create({
    data: {
      homeTeamName,
      awayTeamName,
    },
  });
}

export const gameRepository = {
  post,
};
