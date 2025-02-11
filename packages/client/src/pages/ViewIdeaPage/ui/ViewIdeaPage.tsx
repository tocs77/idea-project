import { Link, useParams } from 'react-router';
import { format } from 'date-fns';

import { trpc } from '@/shared/lib';
import { routes, ViewIdeaRouteParams } from '@/shared/lib/routes';
import { Segment } from '@/shared/ui/Segment';

import classes from './ViewIdeaPage.module.scss';
import { Button } from '@/shared/ui/Button';

import { withPageWrapper } from '@/features/PageWrapper';

export const ViewIdeaPage = withPageWrapper({
  useQuery: () => {
    const { ideaNick } = useParams() as ViewIdeaRouteParams;
    return trpc.getIdea.useQuery({ ideaNick });
  },
  checkExists: ({ queryResult }) => !!queryResult.data,
  checkAccessMessage: 'Idea not found',
  setProps: ({ queryResult, ctx, checkExists }) => {
    const idea = checkExists(queryResult.data, 'Idea not found');
    return { idea, ctx };
  },
})(({ idea, ctx }) => (
  <Segment title={`Idea: ${idea.name}`} description={idea.description}>
    <div className={classes.createdAt}>{`Created at: ${format(idea.createdAt, 'dd.MM.yyyy')}`}</div>
    <div className={classes.author}>{`Author: ${idea.author.nick} - ${idea.author.name}`}</div>
    <p className={classes.ideaText}>{idea.text}</p>
    {ctx.me?.id === idea.authorId && (
      <Link to={routes.getEditIdeaRoute({ ideaNick: idea.nick })} className={classes.edit}>
        <Button>Edit</Button>
      </Link>
    )}
  </Segment>
));
