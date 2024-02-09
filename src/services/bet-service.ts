import { betRepository, participantRepository, gameRepository } from '@/repositories';
import { InputBetBody } from '@/protocols';
import { unprocessableEntityError } from '@/errors';
import { calculateBetResults, processBetResults, updateBetAmounts } from '@/utils';

async function createBet(betObject: InputBetBody) {
  const game = await gameRepository.getById(betObject.gameId);
  if (!game) throw unprocessableEntityError('This game does not exist, please try to bet on another game');

  const participant = await participantRepository.getById(betObject.participantId);
  if (!participant) throw unprocessableEntityError('This participant does not exist.');

  if (participant.balance < betObject.amountBet)
    throw unprocessableEntityError(
      'Your bet is greater than the ammount this participant has, please try to bet a lower ammount.',
    );
  if (game.isFinished)
    throw unprocessableEntityError('This game has already been finished, please try to bet on another game.');

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
  const { sumOfAllBets, houseFee, results } = calculateBetResults(allBetsInfo, game);
  const sumOfWonAmounts = processBetResults(results);

  updateBetAmounts(results, sumOfWonAmounts, sumOfAllBets, houseFee);
}

export const betService = {
  createBet,
  finishBet,
};
