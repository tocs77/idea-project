import { routes, trpc } from '@/shared/lib';
import { Link } from 'react-router';
export const AllIdeasPage = () => {
  const { data, isLoading, isError, error } = trpc.getIdeas.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      <h1>All Ideas Page</h1>
      {data?.map((idea) => (
        <div key={idea.nick}>
          <h2>
            <Link to={routes.getViewIdeaRoute({ ideaNick: idea.nick })}>{idea.nick}</Link>
          </h2>
          <p>{idea.description}</p>
        </div>
      ))}
    </div>
  );
};
