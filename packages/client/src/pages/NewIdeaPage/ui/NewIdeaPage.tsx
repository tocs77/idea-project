import { useState } from 'react';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';

import { Segment } from '@/shared/ui/Segment';
import { ideaSchema } from '@idea/backend/src/types';

import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/TextArea';
import { trpc } from '@/shared/lib';

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
        <Input formik={formik} label='Name' name='name' />
        <Input formik={formik} name='nick' label='Nick' />
        <Input formik={formik} name='description' label='Description' />
        <Textarea formik={formik} label='Text' name={'text'} />
        {!formik.isValid && !!formik.submitCount && <div style={{ color: 'red' }}>Form is invalid</div>}
        {successMessageVisible && <div style={{ color: 'green' }}>Idea created successfully</div>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        <button type='submit' disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Creating...' : 'Create idea'}
        </button>
      </form>
    </Segment>
  );
};
