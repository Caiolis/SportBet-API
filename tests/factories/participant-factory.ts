import { faker } from '@faker-js/faker';

export function generateParticipantName(participantName?: string) {
  return participantName || faker.person.firstName();
}

export function generateParticipant(participantName?: string) {
  return {
    id: faker.number.int(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    name: generateParticipantName(participantName),
    balance: faker.number.int({ max: 999 }),
  };
}

export function generateFunctionalParticipant(participantName?: string) {
  return {
    id: faker.number.int(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    name: generateParticipantName(participantName),
    balance: faker.number.int({ min: 1000 }),
  };
}
