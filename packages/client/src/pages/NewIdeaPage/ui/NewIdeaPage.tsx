import { useFormik } from 'formik';

import { Segment } from '@/shared/ui/Segment';

import { Input } from '@/shared/ui/Input';
import { Textarea } from '@/shared/ui/TextArea';

interface IdeaState {
  name: string;
  nick: string;
  description: string;
  text: string;
}

export const NewIdeaPage = () => {
  const formik = useFormik<IdeaState>({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
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
        <button type='submit'>Create idea</button>
      </form>
    </Segment>
  );
};
