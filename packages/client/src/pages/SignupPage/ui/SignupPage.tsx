import { useState } from 'react';
import { routes, trpc } from '@/shared/lib';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';

import { Segment } from '@/shared/ui/Segment';
import { FormItems } from '@/shared/ui/FormItems';
import { Input } from '@/shared/ui/Input';
import { Alert } from '@/shared/ui/Alert';
import { Button } from '@/shared/ui/Button';

import { SignupState, signUpSchema } from '../model/types/SignupState';

export const SignupPage = () => {
  const [submittingError, setSubmittingError] = useState('');
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();
  const signup = trpc.signUp.useMutation();
  const formik = useFormik<SignupState>({
    initialValues: {
      nick: '',
      password: '',
      passwordAgain: '',
    },
    validationSchema: toFormikValidationSchema(signUpSchema),

    onSubmit: async (values) => {
      try {
        setSubmittingError('');
        await signup.mutateAsync(values);
        trpcUtils.invalidate();
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
    <Segment title='Sign up'>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label='Nick' name={'nick'} formik={formik} />
          <Input label='Password' name={'password'} formik={formik} type='password' />
          <Input label='Password again' name={'passwordAgain'} formik={formik} type='password' />
          {!formik.isValid && !!formik.submitCount && <Alert color='red'>Some fields are invalid</Alert>}
          {submittingError && <Alert color='red'>{submittingError}</Alert>}
          <Button type='submit' loading={formik.isSubmitting}>
            Sign up
          </Button>
        </FormItems>
      </form>
    </Segment>
  );
};
