import React from 'react';
import { Formik, Form } from 'formik';
import { LoginSchema } from '../auth.validation';
import TodoInput from '../../todo/todo.modal/todo.input';
import { useAuthStore } from '~store/auth.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~router/router.keys';
import { handleSubmitWithErrors } from '~shared/utils/handel.submit';

const LoginForm: React.FC = () => {
	const { login } = useAuthStore();
	const navigate = useNavigate();

	const handleLoginSubmit = (values: { email: string; password: string }) => {
		handleSubmitWithErrors(
			() => login(values.email, values.password),
			() => navigate(ROUTER_KEYS.HOME),
			'Login',
		);
	};

	return (
		<Formik
			initialValues={{ email: '', password: '' }}
			validationSchema={LoginSchema}
			onSubmit={handleLoginSubmit}
		>
			{({ errors, touched }) => (
				<Form>
					<TodoInput
						name="email"
						label="Email"
						errors={errors.email}
						touched={touched.email}
					/>
					<TodoInput
						name="password"
						label="Password"
						type="password"
						errors={errors.password}
						touched={touched.password}
					/>
					<button type="submit">Login</button>
					<button onClick={() => navigate(ROUTER_KEYS.RESET_PASS)}>
						Forgot pass
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;
