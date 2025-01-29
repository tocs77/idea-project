import { useState } from 'react';
import { routes, trpc } from '@/shared/lib';
import type { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';

import { signUpSchema } from '@idea/backend/src/types';
import { Segment } from '@/shared/ui/Segment';
import { FormItems } from '@/shared/ui/FormItems';
import { Input } from '@/shared/ui/Input';
import { Alert } from '@/shared/ui/Alert';
import { Button } from '@/shared/ui/Button';

export type SigninState = z.infer<typeof signUpSchema>;

export const SigninPage = () => {
  const [submittingError, setSubmittingError] = useState('');
  const navigate = useNavigate();
  const signin = trpc.signIn.useMutation();
  const formik = useFormik<SigninState>({
    initialValues: {
      nick: '',
      password: '',
    },
    validationSchema: toFormikValidationSchema(signUpSchema),

    onSubmit: async (values) => {
      try {
        setSubmittingError('');
        await signin.mutateAsync(values);
        navigate(routes.getAllIdeasRoute());
      } catch (error) {
        if (error instanceof Error) {
          setSubmittingError(error.message);
        } else {
          console.error('Unknown error:', error);
        }
      }
    },
  });

  return (
    <Segment title='Sign In'>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label='Nick' name={'nick'} formik={formik} />
          <Input label='Password' name={'password'} formik={formik} type='password' />
          {!formik.isValid && !!formik.submitCount && <Alert color='red'>Some fields are invalid</Alert>}
          {submittingError && <Alert color='red'>{submittingError}</Alert>}
          <Button type='submit' loading={formik.isSubmitting}>
            Sign In
          </Button>
        </FormItems>
      </form>
    </Segment>
  );
};
