import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { routes, trpc } from '@/shared/lib';
import { TrpcRouterOutput } from '@idea/backend/src/router/router';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { updateIdeaSchema } from '@idea/backend/src/types';
import { z } from 'zod';
import { Segment } from '@/shared/ui/Segment';
import { FormItems } from '@/shared/ui/FormItems';
import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/TextArea';
import { Alert } from '@/shared/ui/Alert';
import { Button } from '@/shared/ui/Button';

export type IdeaUpdateState = z.infer<typeof updateIdeaSchema>;
export const EditIdeaComponent = ({ idea }: { idea: NonNullable<TrpcRouterOutput['getIdea']> }) => {
  const navigate = useNavigate();
  const [submittingError, setSubmittingError] = useState('');
  const updateIdea = trpc.updateIdea.useMutation();

  const formik = useFormik<IdeaUpdateState>({
    initialValues: {
      name: idea.name,
      nick: idea.nick,
      description: idea.description,
      text: idea.text,
      ideaId: idea.id,
    },
    validationSchema: toFormikValidationSchema(updateIdeaSchema.omit({ ideaId: true })),
    onSubmit: async (values) => {
      try {
        const res = await updateIdea.mutateAsync(values);
        console.log(res);
      } catch (error) {
        if (error instanceof Error) {
          setSubmittingError(error.message);
        } else {
          console.error('Unknown error:', error);
        }
        return;
      }
      navigate(routes.getViewIdeaRoute({ ideaNick: values.nick }));
    },
  });

  return (
    <Segment title={`Edit idea: ${idea.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label='Name' name='name' formik={formik} />
          <Input label='Nick' name='nick' formik={formik} />
          <Input label='Description' name='description' formik={formik} />
          <Textarea label='Text' name='text' formik={formik} />
          {!formik.isValid && !!formik.submitCount && <Alert color='red'>Some fileds are invalid</Alert>}
          {submittingError && <Alert color='red'>{submittingError}</Alert>}
          <Button loading={formik.isSubmitting}>Update Idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
