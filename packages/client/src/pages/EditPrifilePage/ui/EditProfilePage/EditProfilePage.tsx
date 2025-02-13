import { withPageWrapper } from '@/features/PageWrapper';
import { useForm } from '@/features/UseForm';
import { trpc } from '@/shared/lib';
import { Button } from '@/shared/ui/Button';
import { FormItems } from '@/shared/ui/FormItems';
import { Input } from '@/shared/ui/Input';
import { Segment } from '@/shared/ui/Segment';
import { TrpcRouterOutput } from '@idea/backend/src/router/router';
import { updateProfileSchema } from '@idea/backend/src/types';
import { PasswordChange } from '../PasswordChange/PasswordChange';

const EditProfilePageContent = ({ me }: { me: NonNullable<TrpcRouterOutput['getMe']> }) => {
  const trpcUtils = trpc.useUtils();
  const updateProfile = trpc.updateProfile.useMutation();
  const { formik, alertElement } = useForm<typeof updateProfileSchema>({
    initialValues: {
      nick: me.nick,
      name: me.name,
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      const updatedMe = await updateProfile.mutateAsync(values);
      trpcUtils.getMe.setData(undefined, updatedMe);
    },
  });

  return (
    <Segment title='Edit Profile'>
      <Segment size={2} title='Profile'>
        <form onSubmit={formik.handleSubmit}>
          <FormItems>
            <Input label='Nick' name='nick' formik={formik} />
            <Input label='Name' name='name' formik={formik} />
            {alertElement}
            <Button loading={formik.isSubmitting}>Update Profile</Button>
          </FormItems>
        </form>
      </Segment>
      <Segment size={2} title='Password'>
        <PasswordChange />
      </Segment>
    </Segment>
  );
};

export const EditProfilePage = withPageWrapper({
  authorizedOnly: true,
  setProps: ({ getAuthorized }) => {
    return { me: getAuthorized() };
  },
})(({ me }) => <EditProfilePageContent me={me} />);
