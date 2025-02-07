import { z } from 'zod';

import { Segment } from '@/shared/ui/Segment';
import { ideaSchema } from '@idea/backend/src/types';

import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/TextArea';
import { trpc } from '@/shared/lib';

import { Button } from '@/shared/ui/Button';
import { FormItems } from '@/shared/ui/FormItems';
import { useForm } from '@/features/UseForm';
import { withPageWrapper } from '@/features/PageWrapper';

export type IdeaState = z.infer<typeof ideaSchema>;

const NewIdeaPageInner = () => {
  const createIdea = trpc.createIdea.useMutation();
  const { alertElement, formik } = useForm<typeof ideaSchema>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: ideaSchema,
    onSubmit: async (values) => {
      await createIdea.mutateAsync(values);
    },
    successMessage: 'Idea created',
    resetOnSuccess: true,
  });

  return (
    <Segment title='New Idea'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.submitForm();
        }}>
        <FormItems>
          <Input formik={formik} label='Name' name='name' />
          <Input formik={formik} name='nick' label='Nick' />
          <Input formik={formik} name='description' label='Description' maxWidth={500} />
          <Textarea formik={formik} label='Text' name={'text'} />
          {alertElement}
          <Button loading={formik.isSubmitting}>Create idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

export const NewIdeaPage = withPageWrapper({
  authorizedOnly: true,
})(NewIdeaPageInner);
