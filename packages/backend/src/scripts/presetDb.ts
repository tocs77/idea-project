import { AppContext } from '@/lib/ctx';
import { createHash } from 'crypto';
import { env } from 'process';

export const presetDb = async (ctx: AppContext) => {
  await ctx.prisma.user.upsert({
    where: {
      nick: 'admin',
    },
    create: {
      nick: 'admin',
      name: 'admin',
      password: createHash('sha256').update(`${env.PASSWORD_SALT}${env.ADMIN_PASSWORD}`).digest('hex'),
      permissions: ['ALL'],
    },
    update: {
      permissions: ['ALL'],
    },
  });
};
