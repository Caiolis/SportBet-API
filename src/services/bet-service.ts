import { betRepository, participantRepository, gameRepository } from '@/repositories';
import { InputBetBody } from '@/protocols';
import { betGreaterThanAmmountError, gameDoesNotExistError, participantDoesNotExistError } from '@/errors';
import { gameAlreadyFinishedError } from '@/errors/game-already-finished-error';

async function createBet(betObject: InputBetBody) {
  const game = await gameRepository.getById(betObject.gameId);
  if (!game) throw gameDoesNotExistError();

  const participant = await participantRepository.getById(betObject.participantId);
  if (!participant) throw participantDoesNotExistError();

  if (participant.balance < betObject.amountBet) throw betGreaterThanAmmountError();
  if (game.isFinished) throw gameAlreadyFinishedError();

  const info = await betRepository.post(betObject);

  const newAmmount = participant.balance - betObject.amountBet;
  await participantRepository.updateAmmount(participant.id, newAmmount);

  await participantRepository.changeUpdatedAt(participant.id);
  await gameRepository.changeUpdatedAt(game.id);

  return info;
}

async function finishBet(gameId: number) {
  const game = await gameRepository.getById(gameId);
  await gameRepository.changeUpdatedAt(game.id);
  const info = await betRepository.getAllBetsById(game.id);

  let sumOfWonAmmounts = 0;
  let sumOfAllBets = 0;

  for (let i = 0; i < info.length; i++) {
    sumOfAllBets += info[i].amountBet;
    if (info[i].homeTeamScore === game.homeTeamScore && info[i].awayTeamScore === game.awayTeamScore) {
      sumOfWonAmmounts += info[i].amountBet;
      betRepository.wonBet(info[i].id);
    } else {
      betRepository.lostBet(info[i].id);
    }
  }

  for (let i = 0; i < info.length; i++) {
    const ammountBetWon = (info[i].amountBet / sumOfWonAmmounts) * sumOfAllBets * (1 - 0.3);

    if (info[i].homeTeamScore === game.homeTeamScore && info[i].awayTeamScore === game.awayTeamScore)
      betRepository.updateAmmount(info[i].id, ammountBetWon);
  }
}

export const betService = {
  createBet,
  finishBet,
};
