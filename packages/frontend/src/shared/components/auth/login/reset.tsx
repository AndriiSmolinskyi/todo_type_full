import React from 'react';
import { Formik, Form } from 'formik';
import TodoInput from '~shared/components/todo/todo.modal/todo.input';
import { useAuthStore } from '~store/auth.store';

const ResetPassword: React.FC = () => {
  const { initiateResetPassword } = useAuthStore();

  const handleEmailSubmit = async (values: { email: string }) => {
    await initiateResetPassword(values.email);
  };

  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={handleEmailSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <TodoInput name="email" label="Email" errors={errors.email} touched={touched.email} />
          <button type="submit">Send Reset Code</button>
        </Form>
      )}
    </Formik>
  );
};

export default ResetPassword;