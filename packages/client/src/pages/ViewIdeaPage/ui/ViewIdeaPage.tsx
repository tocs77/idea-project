import { Link } from 'react-router';
import { format } from 'date-fns';

import { trpc } from '@/shared/lib';
import { routes } from '@/shared/lib/routes';
import { Segment } from '@/shared/ui/Segment';

import classes from './ViewIdeaPage.module.scss';
import { Button } from '@/shared/ui/Button';

import { withPageWrapper } from '@/features/PageWrapper';
import { LikesButton } from '@/features/LikesButton';
import { canBlockIdeas, canEditEdea } from '@idea/backend/src/utils/permissons';
import { BlockIdea } from '@/features/BlockIdea';

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = routes.getViewIdeaRoute.useParams();
    return trpc.getIdea.useQuery({ ideaNick });
  },
  checkExists: ({ queryResult }) => !!queryResult.data,
  checkAccessMessage: 'Idea not found',
  showLOaderOnFetching: false,
  setProps: ({ queryResult, ctx, checkExists }) => {
    const idea = checkExists(queryResult.data, 'Idea not found');
    return { idea, ctx };
  },
  title: ({ idea }) => `Idea: ${idea.name}`,
})(({ idea, ctx }) => (
  <Segment title={`Idea: ${idea.name}`} description={idea.description}>
    <div className={classes.createdAt}>{`Created at: ${format(idea.createdAt, 'dd.MM.yyyy')}`}</div>
    <div className={classes.author}>{`Author: ${idea.author.nick} - ${idea.author.name}`}</div>
    <p className={classes.ideaText}>{idea.text}</p>
    <div className={classes.likes}>
      Likes: {idea.likesCount}
      {ctx.me && (
        <>
          <br /> <LikesButton idea={idea} />
        </>
      )}
    </div>
    {canEditEdea(ctx.me, idea) && (
      <Link to={routes.getEditIdeaRoute({ ideaNick: idea.nick })} className={classes.edit}>
        <Button>Edit</Button>
      </Link>
    )}
    {canBlockIdeas(ctx.me) && (
      <div className={classes.block}>
        <BlockIdea idea={idea} />
      </div>
    )}
  </Segment>
));
