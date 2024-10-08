import React from 'react';
import { Formik, Form } from 'formik';
import { VerifySchema } from '../auth.validation';
import TodoInput from '~shared/components/todo/todo.modal/todo.input';
import { useAuthStore } from '~store/auth.store';

const Verify: React.FC = () => {
  const { verifyEmail } = useAuthStore();

  const handleVerifySubmit = async (values: { email: string; code: string }) => {
    await verifyEmail(values.email, values.code);
  };

  return (
    <Formik
      initialValues={{ email: '', code: '' }}
      validationSchema={VerifySchema}
      onSubmit={handleVerifySubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <TodoInput name="email" label="Email" errors={errors.email} touched={touched.email} />
          <TodoInput name="code" label="Verification Code" errors={errors.code} touched={touched.code} />
          <button type="submit">Verify</button>
        </Form>
      )}
    </Formik>
  );
};

export default Verify;