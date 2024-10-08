import React from 'react';
import { Formik, Form } from 'formik';
import TodoInput from '~shared/components/todo/todo.modal/todo.input';
import { useAuthStore } from '~store/auth.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~router/router.keys';
import { handleSubmitWithErrors } from '~shared/utils/handel.submit';
import * as styles from '../auth.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ResetPassword: React.FC = () => {
	const { initiateResetPassword } = useAuthStore();
	const navigate = useNavigate();

	const handleEmailSubmit = (values: { email: string }) => {
		handleSubmitWithErrors(
			() => initiateResetPassword(values.email),
			() => navigate(ROUTER_KEYS.RESTORE_PASS),
			'Reset password',
		);
	};

	return (
		<Formik initialValues={{ email: '' }} onSubmit={handleEmailSubmit}>
			{({ errors, touched }) => (
				<Form className={styles.starBlock}>
					<TodoInput
						name="email"
						label="Email"
						errors={errors.email}
						touched={touched.email}
					/>
					<button type="submit" className={styles.authBtn}>
						Send Reset Code
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

export default ResetPassword;
