import { trpc } from '@/shared/lib';
import { ViewIdeaRouteParams } from '@/shared/lib/routes';
import { useParams } from 'react-router';

export const ViewIdeaPage = () => {
  const { ideaNick } = useParams() as ViewIdeaRouteParams;
  const { data: idea, isLoading, isError, error } = trpc.getIdea.useQuery({ ideaNick });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;
  if (!idea) return <div>Not found</div>;
  return (
    <div>
      <h1>View Idea Page {idea.name}</h1>
      <p>{idea.description}</p>
      <p>{idea.text}</p>
    </div>
  );
};
