import { gameRepository } from '@/repositories';

async function createGame(homeTeamName: string, awayTeamName: string) {
  return await gameRepository.post(homeTeamName, awayTeamName);
}

async function getAllGames() {
  return await gameRepository.getAll();
}

export const gameService = {
  createGame,
  getAllGames,
};
