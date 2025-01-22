import { useParams } from 'react-router';
import { format } from 'date-fns';

import { trpc } from '@/shared/lib';
import { ViewIdeaRouteParams } from '@/shared/lib/routes';

import classes from './ViewIdeaPage.module.scss';
import { Segment } from '@/shared/ui/Segment';

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;
  const { data: idea, isLoading, isError, error } = trpc.getIdea.useQuery({ ideaNick });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;
  if (!idea) return <div>Not found</div>;
  return (
    <Segment title={`Idea: ${idea.name}`} description={idea.description}>
      <div className={classes.createdAt}>{`Created at: ${format(idea.createdAt, 'dd.MM.yyyy')}`}</div>
      <p className={classes.ideaText}>{idea.text}</p>
    </Segment>
  );
};
