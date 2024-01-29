import { nonExistentGameError } from '@/errors';
import { gameRepository } from '@/repositories';

async function createGame(homeTeamName: string, awayTeamName: string) {
  return await gameRepository.post(homeTeamName, awayTeamName);
}

async function getAllGames() {
  return await gameRepository.getAll();
}

async function getById(id: number) {
  const info = await gameRepository.getById(id);
  if (!info) throw nonExistentGameError();

  return info;
}

export const gameService = {
  createGame,
  getAllGames,
  getById,
};
