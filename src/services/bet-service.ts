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

export const betService = {
  createBet,
};
