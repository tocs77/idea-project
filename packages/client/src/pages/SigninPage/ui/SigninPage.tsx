import { trpc } from '@/shared/lib';
import type { z } from 'zod';

import { signinSchema } from '@idea/backend/src/types';
import { Segment } from '@/shared/ui/Segment';
import { FormItems } from '@/shared/ui/FormItems';
import { Input } from '@/shared/ui/Input';

import { Button } from '@/shared/ui/Button';
import { useForm } from '@/features/UseForm';
import { withPageWrapper } from '@/features/PageWrapper';

export type SigninState = z.infer<typeof signinSchema>;

const SigninPageInner = () => {
  const signin = trpc.signIn.useMutation();
  const trpcUtils = trpc.useUtils();
  const { alertElement, formik } = useForm<typeof signinSchema>({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: signinSchema,
    onSubmit: async (values) => {
      await signin.mutateAsync(values);
      trpcUtils.invalidate();
    },
    successMessage: 'Signed in successfully',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await formik.handleSubmit();
    console.log('result', result);
  };

  console.log('formik', formik.errors);

  return (
    <Segment title='Sign In'>
      <form onSubmit={handleSubmit}>
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

export const SigninPage = withPageWrapper({ redirectAuthorized: true, title: 'Sign in' })(SigninPageInner);
