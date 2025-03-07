import { Idea } from '@prisma/client';
import { AppContext } from '../lib/ctx';
import { sendMostLikedIdeasEmail } from '@/lib/emails';

export const notifyMostLikesIdeas = async (ctx: AppContext) => {
  const mostLikedIdeas = await ctx.prisma.$queryRaw<Array<Pick<Idea, 'id' | 'nick' | 'name'> & { thisMonthLikesCount: number }>>`
    with "topIdeas" as (
      select id, nick, name, (
        select count(*)::int
        from "IdeaLike" il
        where il."ideaId"=i.id
        and il."createdAt" >= CURRENT_DATE - INTERVAL '1 month'
      ) as "thisMonthLikesCount"
      from "Idea" i
      where i."blockedAt" is null
      order by "thisMonthLikesCount" desc
      limit 10
    )
      select * from "topIdeas"
      where "thisMonthLikesCount" > 0
  `;
  if (mostLikedIdeas.length === 0) {
    return;
  }

  const users = await ctx.prisma.user.findMany({
    select: {
      id: true,
      nick: true,
      email: true,
    },
  });

  for (const user of users) {
    console.log(`Sending email to ${user.email}`);
    sendMostLikedIdeasEmail(user, mostLikedIdeas);
  }
};
