import prisma from '@/database/database';

async function post(name: string, balance: number) {
  return await prisma.participant.create({
    data: {
      name,
      balance,
    },
  });
}

async function getAll() {
  return await prisma.participant.findMany();
}

export const participantRepository = {
  post,
  getAll,
};
