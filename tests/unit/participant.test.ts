import { generateFunctionalParticipant, generateParticipant } from '../factories/participant-factory';
import { insuficientBalanceError } from '@/errors';
import { participantRepository } from '@/repositories';
import { participantService } from '@/services';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('POST /participants', () => {
  it('should return an error when tries to create a new participant with less than 1000 funds', async () => {
    const mockParticipants = generateParticipant();
    const spyPostParticipant = jest.spyOn(participantRepository, 'post').mockResolvedValueOnce(mockParticipants);

    await expect(participantService.createParticipant(mockParticipants.name, mockParticipants.balance)).rejects.toEqual(
      insuficientBalanceError(),
    );
    expect(spyPostParticipant).toHaveBeenCalledTimes(0);

    spyPostParticipant.mockRestore();
  });

  it('should return the user when created successfully', async () => {
    const mockParticipants = generateFunctionalParticipant();
    const spyPostParticipant = jest.spyOn(participantRepository, 'post').mockResolvedValueOnce(mockParticipants);

    const createdParticipant = await participantService.createParticipant(
      mockParticipants.name,
      mockParticipants.balance,
    );
    expect(spyPostParticipant).toHaveBeenCalledWith(mockParticipants.name, mockParticipants.balance);
    expect(createdParticipant).toEqual(mockParticipants);

    spyPostParticipant.mockRestore();
  });
});
