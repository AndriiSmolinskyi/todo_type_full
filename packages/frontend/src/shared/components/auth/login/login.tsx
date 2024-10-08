import React from 'react';
import { Formik, Form } from 'formik';
import { LoginSchema } from '../auth.validation';
import TodoInput from '../../todo/todo.modal/todo.input';
import { useAuthStore } from '~store/auth.store';

const LoginForm: React.FC = () => {
  const { login } = useAuthStore();

  const handleLoginSubmit = async (values: { email: string; password: string }) => {
    await login(values.email, values.password);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleLoginSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <TodoInput name="email" label="Email" errors={errors.email} touched={touched.email} />
          <TodoInput name="password" label="Password" type="password" errors={errors.password} touched={touched.password} />
          <button type="submit">Login</button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;