import { CronJob } from 'cron';
import { AppContext } from './ctx';
import { notifyMostLikesIdeas } from '@/scripts/notifyMostLikesIdeas';

export const applyCron = (ctx: AppContext) => {
  new CronJob(
    '*/1 * * * *',
    () => {
      notifyMostLikesIdeas(ctx).catch(console.error);
    },
    null,
    true,
  );
};
