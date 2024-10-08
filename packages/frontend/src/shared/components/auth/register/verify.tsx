import React from 'react';
import { Formik, Form } from 'formik';
import { VerifySchema } from '../auth.validation';
import TodoInput from '~shared/components/todo/todo.modal/todo.input';
import { useAuthStore } from '~store/auth.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~router/router.keys';

const Verify: React.FC = () => {
	const { verifyEmail } = useAuthStore();
	const navigate = useNavigate();

	const handleVerifySubmit = async (values: {
		email: string;
		code: string;
	}) => {
		try {
			await verifyEmail(values.email, values.code);
			navigate(ROUTER_KEYS.LOGIN);
		} catch (error: any) {
			const errorMessage =
				error.response?.data?.message || 'Unknown error occurred';
			alert(`Verification error: ${errorMessage}`);
		}
	};

	return (
		<Formik
			initialValues={{ email: '', code: '' }}
			validationSchema={VerifySchema}
			onSubmit={handleVerifySubmit}
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
						label="Verification Code"
						errors={errors.code}
						touched={touched.code}
					/>
					<button type="submit">Verify</button>
				</Form>
			)}
		</Formik>
	);
};

export default Verify;
