import { Link, useParams } from 'react-router';
import { format } from 'date-fns';

import { trpc } from '@/shared/lib';
import { routes, ViewIdeaRouteParams } from '@/shared/lib/routes';
import { Segment } from '@/shared/ui/Segment';

import classes from './ViewIdeaPage.module.scss';
import { Button } from '@/shared/ui/Button';

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;
  const { data: idea, isLoading, isError, error } = trpc.getIdea.useQuery({ ideaNick });
  const { data: me } = trpc.getMe.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;
  if (!idea) return <div>Not found</div>;
  return (
    <Segment title={`Idea: ${idea.name}`} description={idea.description}>
      <div className={classes.createdAt}>{`Created at: ${format(idea.createdAt, 'dd.MM.yyyy')}`}</div>
      <div className={classes.author}>{`Author: ${idea.author.nick}`}</div>
      <p className={classes.ideaText}>{idea.text}</p>
      {me?.id === idea.authorId && (
        <Link to={routes.getEditIdeaRoute({ ideaNick: idea.nick })} className={classes.edit}>
          <Button>Edit</Button>
        </Link>
      )}
    </Segment>
  );
};
