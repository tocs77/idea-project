import { CronJob } from 'cron';
import { AppContext } from './ctx';
import { notifyMostLikesIdeas } from '@/scripts/notifyMostLikesIdeas';
import { logger } from './logger';

export const applyCron = (ctx: AppContext) => {
  new CronJob(
    '0 10 * * *',
    () => {
      notifyMostLikesIdeas(ctx).catch((error) => {
        logger.error('Cron', error);
      });
    },
    null,
    true,
  );
};
