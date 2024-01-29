import prisma from '@/database/database';
import { InputBetBody } from '@/protocols';

async function post(betObject: InputBetBody) {
  return await prisma.bet.create({
    data: {
      homeTeamScore: betObject.homeTeamScore,
      awayTeamScore: betObject.awayTeamScore,
      amountBet: betObject.amountBet,
      gameId: betObject.gameId,
      participantId: betObject.participantId,
    },
  });
}

async function getAllBetsById(gameId: number) {
  return await prisma.bet.findMany({
    where: {
      gameId,
    },
  });
}

export const betRepository = {
  post,
  getAllBetsById,
};
