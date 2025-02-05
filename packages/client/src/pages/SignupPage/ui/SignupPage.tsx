import { routes, trpc } from '@/shared/lib';

import { useNavigate } from 'react-router';

import { Segment } from '@/shared/ui/Segment';
import { FormItems } from '@/shared/ui/FormItems';
import { Input } from '@/shared/ui/Input';

import { Button } from '@/shared/ui/Button';
import { useForm } from '@/features/UseForm';

import { signUpSchema } from '../model/types/SignupState';

export const SignupPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const signup = trpc.signUp.useMutation();
  const { alertElement, formik } = useForm<typeof signUpSchema>({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      await signup.mutateAsync(values);
      trpcUtils.invalidate();
      navigate(routes.getAllIdeasRoute());
    },
    showValidationAlert: true,
  });

  return (
    <Segment title='Sign up'>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label='Nick' name={'nick'} formik={formik} />
          <Input label='Password' name={'password'} formik={formik} type='password' />
          <Input label='Password again' name={'passwordAgain'} formik={formik} type='password' />
          {alertElement}
          <Button type='submit' loading={formik.isSubmitting}>
            Sign up
          </Button>
        </FormItems>
      </form>
    </Segment>
  );
};
