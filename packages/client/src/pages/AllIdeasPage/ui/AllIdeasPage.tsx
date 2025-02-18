import { Link } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import { Segment } from '@/shared/ui/Segment';
import { routes, trpc } from '@/shared/lib';

import classes from './AllIdeasPage.module.scss';
import { Alert } from '@/shared/ui/Alert';
import { useRef } from 'react';

export const AllIdeasPage = () => {
  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery({ limit: 3 }, { getNextPageParam: (lastPage) => lastPage.nextCursor });
  const contentRef = useRef<HTMLDivElement>(null);

  if (isError) return <Alert color='red'> {error.message}</Alert>;

  return (
    <Segment title='All Ideas'>
      {isLoading || isRefetching ? <div>Loading...</div> : null}

      <div className={classes.ideas} ref={contentRef}>
        <InfiniteScroll
          getScrollParent={() => contentRef.current}
          useWindow={false}
          threshold={250}
          loadMore={() => {
            if (!isFetchingNextPage && hasNextPage) fetchNextPage();
          }}
          hasMore={hasNextPage}
          loader={<div key='loader'>Loading...</div>}>
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
                  description={idea.description}>{`Likes: ${idea.likesCount}`}</Segment>
              </div>
            ))}
        </InfiniteScroll>
      </div>
    </Segment>
  );
};
