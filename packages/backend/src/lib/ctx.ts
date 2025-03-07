import { UserPermissions } from '@prisma/client';
import { Request, Response } from 'express';
import { createPrismaClient } from './prisma';

export const createAppContext = () => {
  const prisma = createPrismaClient();

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
  me?: { id: string; nick: string; name: string; permissions: UserPermissions[]; email: string };
};
