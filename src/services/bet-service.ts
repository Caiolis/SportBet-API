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
  const allBetsInfo = await betRepository.getAllBetsById(game.id);

  let sumOfWonAmmounts = 0;
  let sumOfAllBets = 0;
  const houseFee = 0.3;

  for (let i = 0; i < allBetsInfo.length; i++) {
    sumOfAllBets += allBetsInfo[i].amountBet;
    if (allBetsInfo[i].homeTeamScore === game.homeTeamScore && allBetsInfo[i].awayTeamScore === game.awayTeamScore) {
      sumOfWonAmmounts += allBetsInfo[i].amountBet;
      betRepository.wonBet(allBetsInfo[i].id);
    } else {
      betRepository.lostBet(allBetsInfo[i].id);
    }
  }

  for (let i = 0; i < allBetsInfo.length; i++) {
    const ammountBetWon = (allBetsInfo[i].amountBet / sumOfWonAmmounts) * sumOfAllBets * (1 - houseFee);

    if (allBetsInfo[i].homeTeamScore === game.homeTeamScore && allBetsInfo[i].awayTeamScore === game.awayTeamScore)
      betRepository.updateAmmount(allBetsInfo[i].id, ammountBetWon);
  }
}

export const betService = {
  createBet,
  finishBet,
};
