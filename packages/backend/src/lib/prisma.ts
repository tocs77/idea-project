import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

export const createPrismaClient = () => {
  const prisma = new PrismaClient({
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'event', level: 'info' },
    ],
  });

  prisma.$on('query', (event) => {
    logger.info('prisma:low:query', 'Successfully query', {
      query: event.query,
      params: event.params,
      duration: event.duration,
    });
  });

  prisma.$on('info', (event) => {
    logger.info('prisma:low:info', event.message);
  });

  const extendedPrisma = prisma.$extends({
    client: {},
    query: {
      $allModels: {
        findFirst: async ({ args, operation, model, query }) => {
          const start = Date.now();
          try {
            const result = await query(args);
            const duration = Date.now() - start;
            logger.info('prisma:high:query', 'Successfully query', {
              model,
              operation,
              duration,
              args,
            });
            return result;
          } catch (error) {
            const duration = Date.now() - start;
            logger.error('prisma:high:query', 'Error query', {
              model,
              operation,
              duration,
              args,
            });
            throw error;
          }
        },
      },
    },
  });

  return extendedPrisma;
};
