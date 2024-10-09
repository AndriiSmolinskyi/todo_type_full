import React from 'react';
import { Formik, Form } from 'formik';
import { LoginSchema } from '../auth.validation';
import TodoInput from '../../todo/todo.modal/todo.input';
import { useAuthStore } from '~store/auth.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~router/router.keys';
import { handleSubmitWithErrors } from '~shared/utils/handel.submit';
import * as styles from '../auth.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { initialValues } from '../auth.initial';

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
			initialValues={initialValues.login}
			validationSchema={LoginSchema}
			onSubmit={handleLoginSubmit}
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
						name="password"
						label="Password"
						type="password"
						errors={errors.password}
						touched={touched.password}
					/>
					<div className={styles.startBtnBlock}>
						<button type="submit" className={styles.authBtn}>
							Login
						</button>
						<button
							onClick={() => navigate(ROUTER_KEYS.RESET_PASS)}
							className={styles.authBtn}
						>
							Forgot pass
						</button>
					</div>
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

export default LoginForm;
