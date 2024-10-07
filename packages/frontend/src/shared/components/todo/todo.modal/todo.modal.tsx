import React from 'react';
import { Formik, Form } from 'formik';
import { useTodoStore } from '~store/todo.store';
import { TodoCreate } from '~shared/interface/todo.interface';
import * as styles from './todo.modal.style/todo.modal.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { TodoCreateSchema } from './todo.schemes/todo.create.schema';
import TodoInput from './todo.input';

interface TodoModalProps {
	isOpen: boolean;
	onClose: () => void;
}



const TodoModal: React.FC<TodoModalProps> = ({ isOpen, onClose }) => {
	const { addTodo } = useTodoStore();

	const handleSubmit = async (values: TodoCreate, { resetForm }: { resetForm: () => void }) => {
		await addTodo(values);
		resetForm();
		onClose();
	};

	const INITIAL_VALUES = {
		title: '',
		body: ''
	};

	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlayStyle}>
			<div className={styles.modalContentStyle}>
				<h2 className={styles.modalTitle}>Create Todo</h2>
				<FontAwesomeIcon
					icon={faXmark}
					onClick={onClose}
					className={styles.modalExit}
				/>
				<Formik
					initialValues={INITIAL_VALUES}
					validationSchema={TodoCreateSchema}
					onSubmit={handleSubmit}
				>
					{({ errors, touched }) => (
						<Form className={styles.formBlock}>
						<TodoInput
							name="title"
							label="Title"
							errors={errors.title}
							touched={touched.title}
							id="title"
						/>
					
						<TodoInput
							name="body"
							label="Body"
							errors={errors.body}
							touched={touched.body}
							id="body"
						/>
					
						<button type="submit" className={styles.modalFormSubmit}>
							Create
						</button>
					</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default TodoModal;
