import prisma from '@/database/database';

async function post(name: string, balance: number) {
  return await prisma.participant.create({
    data: {
      name,
      balance,
    },
  });
}

export const participantRepository = {
  post,
};
