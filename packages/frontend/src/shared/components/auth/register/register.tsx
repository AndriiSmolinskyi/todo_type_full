import React from 'react';
import { Formik, Form } from 'formik';
import { RegisterSchema } from '../auth.validation';
import TodoInput from '~shared/components/todo/todo.modal/todo.input';
import { useAuthStore } from '~store/auth.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~router/router.keys';

const RegisterForm: React.FC = () => {
	const { register } = useAuthStore();
	const navigate = useNavigate();

	const handleRegisterSubmit = async (values: {
		username: string;
		email: string;
		password: string;
	}) => {
		await register(values.username, values.email, values.password);
		navigate(ROUTER_KEYS.VERIFY);
	};

	return (
		<Formik
			initialValues={{ username: '', email: '', password: '' }}
			validationSchema={RegisterSchema}
			onSubmit={handleRegisterSubmit}
		>
			{({ errors, touched }) => (
				<Form>
					<TodoInput
						name="username"
						label="Username"
						errors={errors.username}
						touched={touched.username}
					/>
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
					<button type="submit">Register</button>
				</Form>
			)}
		</Formik>
	);
};

export default RegisterForm;
