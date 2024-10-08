import React from 'react';
import { Formik, Form } from 'formik';
import { RegisterSchema } from '../auth.validation';
import TodoInput from '~shared/components/todo/todo.modal/todo.input';
import { useAuthStore } from '~store/auth.store';
import { useNavigate } from 'react-router-dom';
import { ROUTER_KEYS } from '~router/router.keys';
import { handleSubmitWithErrors } from '~shared/utils/handel.submit';
import * as styles from '../auth.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const RegisterForm: React.FC = () => {
	const { register } = useAuthStore();
	const navigate = useNavigate();

	const handleRegisterSubmit = (values: {
		username: string;
		email: string;
		password: string;
	}) => {
		handleSubmitWithErrors(
			() => register(values.username, values.email, values.password),
			() => navigate(ROUTER_KEYS.VERIFY),
			'Registration',
		);
	};

	return (
		<Formik
			initialValues={{ username: '', email: '', password: '' }}
			validationSchema={RegisterSchema}
			onSubmit={handleRegisterSubmit}
		>
			{({ errors, touched }) => (
				<Form className={styles.starBlock}>
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
					<button type="submit" className={styles.authBtn}>
						Register
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

export default RegisterForm;
