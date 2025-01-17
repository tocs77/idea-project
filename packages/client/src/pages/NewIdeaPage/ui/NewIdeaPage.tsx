import { useState } from 'react';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';

import { Segment } from '@/shared/ui/Segment';
import { ideaSchema } from '@idea/backend/src/types';

import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/TextArea';
import { trpc } from '@/shared/lib';
import { Alert } from '@/shared/ui/Alert';
import { Button } from '@/shared/ui/Button';
import { FormItems } from '@/shared/ui/FormItems';

export type IdeaState = z.infer<typeof ideaSchema>;
export const NewIdeaPage = () => {
  const createIdea = trpc.createIdea.useMutation();
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const formik = useFormik<IdeaState>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },

    validationSchema: toFormikValidationSchema(ideaSchema),
    onSubmit: async (values) => {
      try {
        const res = await createIdea.mutateAsync(values);
        console.log(res);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          console.error('Unknown error:', error);
        }
        return;
      }

      formik.resetForm();
      setSuccessMessageVisible(true);
      setErrorMessage('');
      setTimeout(() => setSuccessMessageVisible(false), 3000);
    },
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
          {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Form is invalid</div>}
          {successMessageVisible && <Alert color='green'>Idea created</Alert>}
          {errorMessage && <Alert color='red'>{errorMessage}</Alert>}
          <Button loading={formik.isSubmitting}>Create idea</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
