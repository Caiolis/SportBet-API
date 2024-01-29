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

async function getById(id: number) {
  return await prisma.participant.findUnique({
    where: {
      id,
    },
  });
}

async function updateAmmount(id: number, amount: number) {
  await prisma.participant.update({
    where: {
      id,
    },
    data: {
      balance: amount,
    },
  });
}

async function changeUpdatedAt(id: number) {
  await prisma.participant.update({
    where: {
      id,
    },
    data: {
      updatedAt: new Date().toISOString(),
    },
  });
}

export const participantRepository = {
  post,
  getAll,
  getById,
  updateAmmount,
  changeUpdatedAt,
};
