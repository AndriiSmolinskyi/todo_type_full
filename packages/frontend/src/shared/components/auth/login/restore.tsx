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
import { initialValues } from '../auth.initial';

const RestorePassword: React.FC = () => {
	const { resetPassword } = useAuthStore();
	const navigate = useNavigate();

	const handleResetSubmit = (values: {
		email: string;
		code: string;
		newPassword: string;
	}) => {
		handleSubmitWithErrors(
			() => resetPassword(values.email, values.code, values.newPassword),
			() => navigate(ROUTER_KEYS.LOGIN),
			'Reset password',
		);
	};

	return (
		<Formik
			initialValues={initialValues.restorePassword}
			onSubmit={handleResetSubmit}
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
					<button type="submit" className={styles.authBtn}>
						Reset Password
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

export default RestorePassword;
