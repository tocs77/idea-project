import { Link } from 'react-router';
import InfiniteScroll from 'react-infinite-scroller';
import { useDebounceValue } from 'usehooks-ts';
import { Segment } from '@/shared/ui/Segment';
import { routes, trpc } from '@/shared/lib';

import classes from './AllIdeasPage.module.scss';
import { Alert } from '@/shared/ui/Alert';
import { useRef } from 'react';
import { useForm } from '@/features/UseForm';
import { getIdeasSchema } from '@idea/backend/src/types';
import { Input } from '@/shared/ui/Input';

export const AllIdeasPage = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { formik } = useForm({
    initialValues: {
      search: '',
    },
    validationSchema: getIdeasSchema.pick({ search: true }),
  });
  const [search] = useDebounceValue(formik.values.search, 1000);

  const { data, isLoading, isError, error, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery({ limit: 3, search: search }, { getNextPageParam: (lastPage) => lastPage.nextCursor });

  if (isError) return <Alert color='red'> {error.message}</Alert>;

  return (
    <Segment title='All Ideas'>
      {isLoading || isRefetching ? <div>Loading...</div> : null}
      <div className={classes.filter}>
        <Input label='Search' name='search' formik={formik} maxWidth={600} />
      </div>
      {!isLoading && data?.pages[0].ideas.length === 0 ? <Alert color='brown'>No ideas found</Alert> : null}
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
