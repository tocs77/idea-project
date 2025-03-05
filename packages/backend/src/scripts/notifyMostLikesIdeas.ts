import { Idea } from '@prisma/client';
import { AppContext } from '../lib/ctx';

export const notifyMostLikesIdeas = async (ctx: AppContext) => {
  const mostLikedIdea = await ctx.prisma.$queryRaw<Array<Pick<Idea, 'id' | 'nick' | 'name'> & { thisMonthLikesCount: number }>>`
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
  console.log(mostLikedIdea);
};
