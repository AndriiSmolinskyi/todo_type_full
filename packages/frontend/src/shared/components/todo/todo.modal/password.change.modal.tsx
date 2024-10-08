import React from 'react';
import { Formik, Form } from 'formik';
import { useAuthStore } from '~store/auth.store';
import * as styles from './todo.modal.style/todo.modal.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import TodoInput from './todo.input';
import { PasswordChangeSchema } from './todo.schemes/password.change.schema';
import { PasswordChangeModalProps } from '~shared/interface/auth.interface';

const PasswordChangeModal: React.FC<PasswordChangeModalProps> = ({
	isOpen,
	onClose,
}) => {
	const { updatePassword } = useAuthStore();

	const handleSubmit = async (
		values: { oldPassword: string; newPassword: string },
		{ resetForm }: { resetForm: () => void },
	) => {
		await updatePassword(values.oldPassword, values.newPassword);
		resetForm();
		onClose();
	};

	const INITIAL_VALUES = { oldPassword: '', newPassword: '' };

	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlayStyle}>
			<div className={styles.modalContentStyle}>
				<h2 className={styles.modalTitle}>Change Password</h2>
				<FontAwesomeIcon
					icon={faXmark}
					onClick={onClose}
					className={styles.modalExit}
				/>
				<Formik
					initialValues={INITIAL_VALUES}
					validationSchema={PasswordChangeSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched }) => (
						<Form className={styles.formBlock}>
							<TodoInput
								name="oldPassword"
								label="Old Password"
								type="password"
								errors={errors.oldPassword}
								touched={touched.oldPassword}
							/>
							<TodoInput
								name="newPassword"
								label="New Password"
								type="password"
								errors={errors.newPassword}
								touched={touched.newPassword}
							/>
							<button
								type="submit"
								className={styles.modalFormSubmit}
							>
								Change Password
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default PasswordChangeModal;
