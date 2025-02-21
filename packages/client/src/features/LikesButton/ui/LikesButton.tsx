import { trpc } from '@/shared/lib';

import { Icon } from '@/shared/ui/Icon';
import { TrpcRouterOutput } from '@idea/backend/src/router/router';

import classes from './LikesButton.module.scss';

interface LikesButtonProps {
  idea: NonNullable<TrpcRouterOutput['getIdea']>;
}
export const LikesButton = (props: LikesButtonProps) => {
  const { idea } = props;
  const trpcUtils = trpc.useUtils();

  const setIdeaLike = trpc.setIdeaLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetIdeaData = trpcUtils.getIdea.getData({
        ideaNick: idea.nick,
      });
      if (oldGetIdeaData) {
        trpcUtils.getIdea.setData(
          {
            ideaNick: idea.nick,
          },
          {
            ...oldGetIdeaData,
            isLikedByMe,
            likesCount: isLikedByMe ? oldGetIdeaData.likesCount + 1 : oldGetIdeaData.likesCount - 1,
          },
        );
      }
    },
    onSuccess: () => {
      trpcUtils.getIdea.invalidate({
        ideaNick: idea.nick,
      });
    },
  });

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIdeaLike.mutateAsync({
      ideaId: idea.id,
      isLikedByMe: !idea.isLikedByMe,
    });
  };
  return (
    <Icon name={idea.isLikedByMe ? 'likeFilled' : 'likeEmpty'} onClick={clickHandler} size={32} className={classes.likeIcon} />
  );
};
