import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

export const createAppContext = () => {
  const prisma = new PrismaClient();

  return {
    prisma,
    stop: async () => {
      await prisma.$disconnect();
    },
  };
};

export type AppContext = ReturnType<typeof createAppContext> & {
  req: Request;
  res: Response;
  me?: { id: string; nick: string };
};
