import React from 'react';
import { Formik, Form } from 'formik';
import { VerifySchema } from '../auth.validation';
import TodoInput from '~shared/components/todo/todo.modal/todo.input';
import { useAuthStore } from '~store/auth.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~router/router.keys';
import { handleSubmitWithErrors } from '~shared/utils/handel.submit';

const Verify: React.FC = () => {
	const { verifyEmail } = useAuthStore();
	const navigate = useNavigate();

	const handleVerifySubmit = (values: { email: string; code: string }) => {
		handleSubmitWithErrors(
			() => verifyEmail(values.email, values.code),
			() => navigate(ROUTER_KEYS.LOGIN),
			'Verification',
		);
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
