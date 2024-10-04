import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTodoStore } from '~store/todo.store';
import { TodoCreate } from '~shared/interface/todo.interface';
import * as styles from './todo.modal.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const TodoSchema = Yup.object().shape({
	title: Yup.string()
		.required('Title is required')
		.min(5, 'Min 5 characters')
		.max(20, 'Max 20 characters'),
	body: Yup.string()
		.required('Body is required')
		.min(10, 'Min 10 characters')
		.max(200, 'Max 200 characters'),
});

interface TodoModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ isOpen, onClose }) => {
	const { addTodo } = useTodoStore();

	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlayStyle}>
			<div className={styles.modalContentStyle}>
				<h2 className={styles.modalTitle}>Create Todo</h2>
				<FontAwesomeIcon icon={faXmark} onClick={onClose} className={styles.modalExit}/>
				<Formik
					initialValues={{ title: '', body: '' }}
					validationSchema={TodoSchema}
					onSubmit={async (values: TodoCreate, { resetForm }) => {
						await addTodo(values);
						resetForm();
						onClose();
					}}
				>
					{({ errors, touched }) => (
						<Form className={styles.formBlock}>
							<div className={styles.formBlockItem}>
								<label
									htmlFor="title"
									className={styles.modalFormLabel}
								>
									Title
								</label>
								<Field
									name="title"
									id="title"
									className={styles.modalFormInput}
								/>
								{errors.title && touched.title ? (
									<div className={styles.modalFormError}>{errors.title}</div>
								) : null}
							</div>
							<div className={styles.formBlockItem}>
								<label className={styles.modalFormLabel}>
									Body
								</label>
								<Field
									name="body"
									className={styles.modalFormInput}
								/>
								{errors.body && touched.body ? (
									<div className={styles.modalFormError}>{errors.body}</div>
								) : null}
							</div>
							<button type="submit" className={styles.modalFormSubmit}>Create</button>
							
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default TodoModal;
