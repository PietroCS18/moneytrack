import prisma from "../config/prisma.js";

export async function createTransaction(data, userId) {
  const { title, amount, type } = data;

  if (!title || !amount || !type) {
    throw new Error("Campos obrigatórios não preenchidos");
  }

  return await prisma.transaction.create({
    data: {
      title,
      amount,
      type,
      userId,
    },
  });
}

export async function getTransactions(userId) {
  return await prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateTransaction(id, data, userId) {
  const transaction = await prisma.transaction.findUnique({
    where: { id },
  });

  if (!transaction || transaction.userId !== userId) {
    throw new Error("Transação não encontrada");
  }

  return await prisma.transaction.update({
    where: { id },
    data,
  });
}

export async function deleteTransaction(id, userId) {
  const transaction = await prisma.transaction.findUnique({
    where: { id },
  });

  if (!transaction || transaction.userId !== userId) {
    throw new Error("Transação não encontrada");
  }

  await prisma.transaction.delete({
    where: { id },
  });

  return { message: "Transação deletada" };
}