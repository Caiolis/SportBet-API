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

async function changeUpdatedAt(id: number) {
  await prisma.bet.update({
    where: {
      id,
    },
    data: {
      updatedAt: new Date().toISOString(),
    },
  });
}

async function wonBet(id: number) {
  await prisma.bet.update({
    where: {
      id,
    },
    data: {
      status: 'WON',
      updatedAt: new Date().toISOString(),
    },
  });
}

async function lostBet(id: number) {
  await prisma.bet.update({
    where: {
      id,
    },
    data: {
      status: 'LOST',
      amountWon: 0,
      updatedAt: new Date().toISOString(),
    },
  });
}

async function updateAmmount(id: number, newAmmount: number) {
  await prisma.bet.update({
    where: {
      id,
    },
    data: {
      amountWon: newAmmount,
    },
  });
}

export const betRepository = {
  post,
  getAllBetsById,
  changeUpdatedAt,
  wonBet,
  lostBet,
  updateAmmount,
};
