import { Link } from 'react-router';

import { routes, trpc } from '@/shared/lib';
import classes from './AllIdeasPage.module.scss';

export const AllIdeasPage = () => {
  const { data, isLoading, isError, error } = trpc.getIdeas.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      <h1 className={classes.title}>All Ideas Page</h1>
      <div className={classes.ideas}>
        {data?.map((idea) => (
          <div key={idea.nick} className={classes.idea}>
            <h2 className={classes.ideaName}>
              <Link to={routes.getViewIdeaRoute({ ideaNick: idea.nick })} className={classes.ideaLink}>
                {idea.nick}
              </Link>
            </h2>
            <p className={classes.ideaDescription}>{idea.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
