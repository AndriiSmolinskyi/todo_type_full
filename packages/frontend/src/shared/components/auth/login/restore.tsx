import React from 'react';
import { Formik, Form } from 'formik';
import TodoInput from '~shared/components/todo/todo.modal/todo.input';
import { useAuthStore } from '~store/auth.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~router/router.keys';

const RestorePassword: React.FC = () => {
	const { resetPassword } = useAuthStore();
	const navigate = useNavigate();

	const handleResetSubmit = async (values: {
		email: string;
		code: string;
		newPassword: string;
	}) => {
		try {
			await resetPassword(values.email, values.code, values.newPassword);
			navigate(ROUTER_KEYS.LOGIN);
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.message || 'Unknown error occurred';
			alert(`Reset password error: ${errorMessage}`);
		}
	};

	return (
		<Formik
			initialValues={{ email: '', code: '', newPassword: '' }}
			onSubmit={handleResetSubmit}
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
						name="code"
						label="Reset Code"
						errors={errors.code}
						touched={touched.code}
					/>
					<TodoInput
						name="newPassword"
						label="New Password"
						type="password"
						errors={errors.newPassword}
						touched={touched.newPassword}
					/>
					<button type="submit">Reset Password</button>
				</Form>
			)}
		</Formik>
	);
};

export default RestorePassword;
