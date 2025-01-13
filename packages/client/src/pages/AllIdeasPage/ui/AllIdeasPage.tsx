import { Link } from 'react-router';

import { routes, trpc } from '@/shared/lib';
import classes from './AllIdeasPage.module.scss';
import { Segment } from '@/shared/ui/Segment';

export const AllIdeasPage = () => {
  const { data, isLoading, isError, error } = trpc.getIdeas.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error.message}</div>;

  return (
    <Segment title='All Ideas'>
      <div className={classes.ideas}>
        {data?.map((idea) => (
          <div key={idea.nick} className={classes.idea}>
            <Segment
              size={2}
              title={
                <Link to={routes.getViewIdeaRoute({ ideaNick: idea.nick })} className={classes.ideaLink}>
                  {idea.name}
                </Link>
              }
              description={idea.description}
            />
          </div>
        ))}
      </div>
    </Segment>
  );
};
