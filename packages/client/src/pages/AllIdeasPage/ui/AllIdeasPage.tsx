import { Link } from 'react-router';

import { Segment } from '@/shared/ui/Segment';
import { routes, trpc } from '@/shared/lib';

import classes from './AllIdeasPage.module.scss';
import { Alert } from '@/shared/ui/Alert';
import { Button } from '@/shared/ui/Button';

export const AllIdeasPage = () => {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery({ limit: 3 }, { getNextPageParam: (lastPage) => lastPage.nextCursor });

  if (isError) return <Alert color='red'> {error.message}</Alert>;
  console.log(data);

  return (
    <Segment title='All Ideas'>
      {isLoading || isRefetching ? <div>Loading...</div> : null}
      <div className={classes.ideas}>
        {data?.pages
          .flatMap((page) => page.ideas)
          .map((idea) => (
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
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage} className={classes.more}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </Button>
      )}
    </Segment>
  );
};
