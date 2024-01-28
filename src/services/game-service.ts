import { gameRepository } from '@/repositories';

async function createGame(homeTeamName: string, awayTeamName: string) {
  return await gameRepository.post(homeTeamName, awayTeamName);
}

export const gameService = {
  createGame,
};
