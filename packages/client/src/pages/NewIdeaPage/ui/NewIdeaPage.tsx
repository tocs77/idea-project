import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';

import { Segment } from '@/shared/ui/Segment';

import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/TextArea';

const ideaSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  nick: z
    .string({ required_error: 'Nick is required' })
    .min(1, 'Nick is required')
    .regex(/^[a-zA-Z0-9-]+$/, 'Nick can only contain letters, numbers and hyphens'),
  description: z.string({ required_error: 'Description is required' }).min(1, 'Description is required'),
  text: z
    .string({ required_error: 'Text is required' })
    .min(100, 'Text must be at least 100 characters')
    .min(1, 'Text is required'),
});

export type IdeaState = z.infer<typeof ideaSchema>;
export const NewIdeaPage = () => {
  const formik = useFormik<IdeaState>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },

    validationSchema: toFormikValidationSchema(ideaSchema),
    onSubmit: (values) => {
      console.log(values);
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
        <button type='submit'>Create idea</button>
      </form>
    </Segment>
  );
};
