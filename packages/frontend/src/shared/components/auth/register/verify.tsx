import React from 'react';
import { Formik, Form } from 'formik';
import { VerifySchema } from '../auth.validation';
import TodoInput from '~shared/components/todo/todo.modal/todo.input';
import { useAuthStore } from '~store/auth.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~router/router.keys';
import { handleSubmitWithErrors } from '~shared/utils/handel.submit';
import * as styles from '../auth.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { initialValues } from '../auth.initial';

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
			initialValues={initialValues.verify}
			validationSchema={VerifySchema}
			onSubmit={handleVerifySubmit}
		>
			{({ errors, touched }) => (
				<Form className={styles.starBlock}>
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
					<button type="submit" className={styles.authBtn}>
						Verify
					</button>
					<FontAwesomeIcon
						icon={faXmark}
						onClick={() => navigate(ROUTER_KEYS.HOME)}
						className={styles.authExit}
					/>
				</Form>
			)}
		</Formik>
	);
};

export default Verify;
