import { FormikProps } from 'formik';

interface TextareaProps<T extends Record<keyof T, string>>
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'name' | 'value'> {
  name: keyof T;
  formik: FormikProps<T>;
  label: string;
}

export const Textarea = <T extends Record<keyof T, string>>(props: TextareaProps<T>) => {
  const { name, formik, label, ...rest } = props;
  const value = formik.values[name];
  const stringName = String(name);
  return (
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor={stringName}>{label}</label>
      <br />
      <textarea
        id={stringName}
        name={stringName}
        value={value}
        onChange={(e) => formik.setFieldValue(stringName, e.target.value)}
        {...rest}
      />
    </div>
  );
};
