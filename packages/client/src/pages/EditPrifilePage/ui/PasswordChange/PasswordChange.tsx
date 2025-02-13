import { z } from 'zod';

import { useForm } from '@/features/UseForm';
import { trpc } from '@/shared/lib';
import { Button } from '@/shared/ui/Button';
import { FormItems } from '@/shared/ui/FormItems';
import { Input } from '@/shared/ui/Input';
import { updatePasswordSchema } from '@idea/backend/src/types';

export const PasswordChange = () => {
  const updatePassword = trpc.updatePassword.useMutation();
  const { alertElement, formik } = useForm({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordRepeat: '',
    },
    validationSchema: updatePasswordSchema
      .extend({
        newPasswordRepeat: updatePasswordSchema.shape.newPassword,
      })
      .superRefine(({ newPassword, newPasswordRepeat }, ctx) => {
        if (newPassword !== newPasswordRepeat) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['newPasswordRepeat'],
            message: 'Passwords do not match',
          });
        }
      }),
    onSubmit: async (values) => {
      await updatePassword.mutateAsync(values);
    },
    successMessage: 'Password updated',
    resetOnSuccess: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormItems>
        <Input label='Old Password' name='oldPassword' type='password' formik={formik} />
        <Input label='New Password' name='newPassword' type='password' formik={formik} />
        <Input label='Repeat New Password' name='newPasswordRepeat' type='password' formik={formik} />
        {alertElement}
        <Button loading={formik.isSubmitting}>Update Password</Button>
      </FormItems>
    </form>
  );
};
