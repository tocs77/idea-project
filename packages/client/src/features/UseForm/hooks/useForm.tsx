import { Alert } from '@/shared/ui/Alert';
import { FormikHelpers, useFormik } from 'formik';
import { useMemo, useState } from 'react';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

type PartialExcept<T, K extends keyof T> = Partial<Omit<T, K>> & // Make all fields optional except K
  Pick<T, K>;

interface UseFormProps<TZodSchema extends z.ZodTypeAny> {
  successMessage?: string | boolean;
  resetOnSuccess?: boolean;
  showValidationAlert?: boolean;
  validationSchema: PartialExcept<TZodSchema, keyof z.ZodTypeAny>;
  initialValues?: z.infer<TZodSchema>;
  onSubmit?: (values: z.infer<TZodSchema>, actions: FormikHelpers<z.infer<TZodSchema>>) => Promise<any>;
}
export const useForm = <TZodSchema extends z.ZodTypeAny>(props: UseFormProps<TZodSchema>) => {
  const {
    initialValues = {},
    onSubmit,
    validationSchema,
    resetOnSuccess = true,
    successMessage = false,
    showValidationAlert = false,
  } = props;
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<Error | null>(null);

  const formik = useFormik<z.infer<TZodSchema>>({
    initialValues: initialValues,
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: async (values, formikHelpers) => {
      setSubmittingError(null);
      try {
        await onSubmit?.(values, formikHelpers);
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
        if (resetOnSuccess) {
          formik.resetForm();
        }
      } catch (error) {
        if (error instanceof Error) {
          setSubmittingError(error);
        } else {
          console.error('Unknown error:', error);
        }
      }
    },
  });

  const alertElement = useMemo(() => {
    if (submittingError) {
      return <Alert color='red'>{submittingError.message}</Alert>;
    }
    if (showValidationAlert && !formik.isValid && !!formik.submitCount) {
      return <Alert color='red'>Some fields are invalid</Alert>;
    }
    if (successMessageVisible && successMessage) {
      return <Alert color='green'>{successMessage}</Alert>;
    }
    return null;
  }, [showValidationAlert, submittingError, formik.isValid, formik.submitCount, successMessageVisible, successMessage]);

  return {
    formik,
    alertElement,
  };
};
