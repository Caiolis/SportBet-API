import { insuficientBalanceError } from '@/errors';
import { participantRepository } from '@/repositories';

async function createParticipant(name: string, balance: number) {
  if (balance < 1000) throw insuficientBalanceError();

  return await participantRepository.post(name, balance);
}

export const participantService = {
  createParticipant,
};
