import { trpc } from '@/shared/lib';
import { Button } from '@/shared/ui/Button';
import { TrpcRouterOutput } from '@idea/backend/src/router/router';

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
  return <Button onClick={clickHandler}>{idea.isLikedByMe ? 'Unlike' : 'Like'}</Button>;
};
