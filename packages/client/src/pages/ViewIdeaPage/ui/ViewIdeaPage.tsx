import { useParams } from 'react-router';

import { trpc } from '@/shared/lib';
import { ViewIdeaRouteParams } from '@/shared/lib/routes';

import classes from './ViewIdeaPage.module.scss';

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;
  const { data: idea, isLoading, isError, error } = trpc.getIdea.useQuery({ ideaNick });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;
  if (!idea) return <div>Not found</div>;
  return (
    <div>
      <h1 className={classes.title}>View Idea Page {idea.name}</h1>
      <p className={classes.ideaDescription}>{idea.description}</p>
      <p className={classes.ideaText}>{idea.text}</p>
    </div>
  );
};
