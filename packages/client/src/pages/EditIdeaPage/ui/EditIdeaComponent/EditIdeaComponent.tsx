import { useNavigate } from 'react-router';
import { z } from 'zod';

import { routes, trpc } from '@/shared/lib';
import { TrpcRouterOutput } from '@idea/backend/src/router/router';
import { updateIdeaSchema } from '@idea/backend/src/types';
import { Segment } from '@/shared/ui/Segment';
import { FormItems } from '@/shared/ui/FormItems';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/TextArea';
import { Button } from '@/shared/ui/Button';
import { useForm } from '@/features/UseForm';

export type IdeaUpdateState = z.infer<typeof updateIdeaSchema>;
export const EditIdeaComponent = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']> }) => {
  const navigate = useNavigate();

  const updateIdea = trpc.updateIdea.useMutation();
  const { alertElement, formik } = useForm<typeof updateIdeaSchema>({
    initialValues: {
      name: idea.name,
      nick: idea.nick,
      description: idea.description,
      text: idea.text,
      ideaId: idea.id,
    },
    validationSchema: updateIdeaSchema.pick({ name: true, nick: true, description: true, text: true }),
    onSubmit: async (values) => {
      await updateIdea.mutateAsync(values);
      navigate(routes.getViewIdeaRoute({ ideaNick: values.nick }));
    },
    successMessage: 'Idea updated',
  });

  return (
    <Segment title={`Edit idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label='Name' name='name' formik={formik} />
          <Input label='Nick' name='nick' formik={formik} />
          <Input label='Description' name='description' formik={formik} />
          <Textarea label='Text' name='text' formik={formik} />
          {alertElement}
          <Button loading={formik.isSubmitting}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
