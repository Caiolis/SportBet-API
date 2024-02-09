import { unprocessableEntityError } from '@/errors';
import { gameRepository, betRepository } from '@/repositories';

async function createGame(homeTeamName: string, awayTeamName: string) {
  return await gameRepository.post(homeTeamName, awayTeamName);
}

async function getAllGames() {
  return await gameRepository.getAll();
}

async function getById(id: number) {
  const info = await gameRepository.getById(id);
  if (!info) throw unprocessableEntityError('This game does not exist, please try again.');

  const bets = await betRepository.getAllBetsById(id);

  return { ...info, bets };
}

async function finishGame(id: number, homeTeamScore: number, awayTeamScore: number) {
  const game = await getById(id);
  if (!game) throw unprocessableEntityError('This game does not exist, please try again.');
  if (game.isFinished)
    throw unprocessableEntityError('This game has already been finished, please try to bet on another game.');

  return await gameRepository.markGameAsFinished(game.id, homeTeamScore, awayTeamScore);
}

export const gameService = {
  createGame,
  getAllGames,
  getById,
  finishGame,
};
