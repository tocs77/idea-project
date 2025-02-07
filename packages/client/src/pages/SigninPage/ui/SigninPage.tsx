import { trpc } from '@/shared/lib';
import type { z } from 'zod';

import { signUpSchema } from '@idea/backend/src/types';
import { Segment } from '@/shared/ui/Segment';
import { FormItems } from '@/shared/ui/FormItems';
import { Input } from '@/shared/ui/Input';

import { Button } from '@/shared/ui/Button';
import { useForm } from '@/features/UseForm';
import { withPageWrapper } from '@/features/PageWrapper';

export type SigninState = z.infer<typeof signUpSchema>;

const SigninPageInner = () => {
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

export const SigninPage = withPageWrapper({ redirectAuthorized: true })(SigninPageInner);
