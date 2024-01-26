import { insuficientBalanceError } from '@/errors';
import { participantRepository } from '@/repositories';

async function createParticipant(name: string, balance: number) {
  if (balance < 1000) throw insuficientBalanceError();

  return await participantRepository.post(name, balance);
}

async function getParticipants() {
  return await participantRepository.getAll();
}

export const participantService = {
  createParticipant,
  getParticipants,
};
