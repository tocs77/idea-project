import { useForm } from '@/features/UseForm';
import { trpc } from '@/shared/lib';
import { Button } from '@/shared/ui/Button';
import { FormItems } from '@/shared/ui/FormItems';
import { TrpcRouterOutput } from '@idea/backend/src/router/router';
import { z } from 'zod';

interface BlockIdeaProps {
  idea: NonNullable<TrpcRouterOutput['getIdea']>;
}

export const BlockIdea = (props: BlockIdeaProps) => {
  const { idea } = props;
  const blockIdea = trpc.blockIdea.useMutation();
  const trpcUtils = trpc.useUtils();
  const { formik, alertElement } = useForm({
    validationSchema: z.object({}),
    onSubmit: async () => {
      await blockIdea.mutateAsync({
        ideaId: idea.id,
      });
      await trpcUtils.getIdea.refetch({
        ideaNick: idea.nick,
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        {alertElement}
        <Button type='submit' disabled={formik.isSubmitting} color='red'>
          Block
        </Button>
      </FormItems>
    </form>
  );
};
