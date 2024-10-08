import React from 'react';
import { Formik, Form } from 'formik';
import { LoginSchema } from '../auth.validation';
import TodoInput from '../../todo/todo.modal/todo.input';
import { useAuthStore } from '~store/auth.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~router/router.keys';

const LoginForm: React.FC = () => {
	const { login } = useAuthStore();
	const navigate = useNavigate();

	const handleLoginSubmit = async (values: {
		email: string;
		password: string;
	}) => {
		try {
			await login(values.email, values.password);
			navigate(ROUTER_KEYS.HOME);
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.message || 'Unknown error occurred';
			alert(`Login error: ${errorMessage}`);
		}
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
