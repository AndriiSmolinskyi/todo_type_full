import React from 'react';
import { Formik, Form } from 'formik';
import TodoInput from '~shared/components/todo/todo.modal/todo.input';
import { useAuthStore } from '~store/auth.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~router/router.keys';

const ResetPassword: React.FC = () => {
	const { initiateResetPassword } = useAuthStore();
	const navigate = useNavigate();

	const handleEmailSubmit = async (values: { email: string }) => {
		await initiateResetPassword(values.email);
        navigate(ROUTER_KEYS.RESTORE_PASS)
	};

	return (
		<Formik initialValues={{ email: '' }} onSubmit={handleEmailSubmit}>
			{({ errors, touched }) => (
				<Form>
					<TodoInput
						name="email"
						label="Email"
						errors={errors.email}
						touched={touched.email}
					/>
					<button type="submit">Send Reset Code</button>
				</Form>
			)}
		</Formik>
	);
};

export default ResetPassword;
