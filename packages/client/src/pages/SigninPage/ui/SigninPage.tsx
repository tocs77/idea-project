import { routes, trpc } from '@/shared/lib';
import type { z } from 'zod';

import { useNavigate } from 'react-router';

import { signUpSchema } from '@idea/backend/src/types';
import { Segment } from '@/shared/ui/Segment';
import { FormItems } from '@/shared/ui/FormItems';
import { Input } from '@/shared/ui/Input';

import { Button } from '@/shared/ui/Button';
import { useForm } from '@/features/UseForm';

export type SigninState = z.infer<typeof signUpSchema>;

export const SigninPage = () => {
  const navigate = useNavigate();
  const signin = trpc.signIn.useMutation();
  const trpcUtils = trpc.useUtils();
  const { alertElement, formik } = useForm<typeof signUpSchema>({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      await signin.mutateAsync(values);
      trpcUtils.invalidate();
      navigate(routes.getAllIdeasRoute());
    },
    successMessage: 'Signed in successfully',
  });

  return (
    <Segment title='Sign In'>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label='Nick' name={'nick'} formik={formik} />
          <Input label='Password' name={'password'} formik={formik} type='password' />
          {alertElement}
          <Button type='submit' loading={formik.isSubmitting}>
            Sign In
          </Button>
        </FormItems>
      </form>
    </Segment>
  );
};
