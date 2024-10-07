import React from 'react';
import { Formik, Form } from 'formik';
import { useTodoStore } from '~store/todo.store';
import { TodoUpdate } from '~shared/interface/todo.interface';
import * as styles from './todo.modal.style/todo.modal.style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { TodoEditSchema } from './todo.schemes/todo.edit.schema';
import TodoInput from './todo.input';

interface TodoEditModalProps {
	isOpen: boolean;
	onClose: () => void;
	todoId: number;
}


const TodoEditModal: React.FC<TodoEditModalProps> = ({
	isOpen,
	onClose,
	todoId,
}) => {
	const { todos, updateTodo } = useTodoStore();
	const todo = todos.find((t) => t.id === todoId);

	const handleSubmit = async (
		values: TodoUpdate,
		{ resetForm }: { resetForm: () => void },
	) => {
		await updateTodo(todoId, values);
		resetForm();
		onClose();
	};

	const INITIAL_VALUES = { title: todo.title, body: todo.body };

	if (!todo || !isOpen) return null;

	return (
		<div className={styles.modalOverlayStyle}>
			<div className={styles.modalContentStyle}>
				<h2 className={styles.modalTitle}>Edit Todo</h2>
				<FontAwesomeIcon
					icon={faXmark}
					onClick={onClose}
					className={styles.modalExit}
				/>
				<Formik
					initialValues={INITIAL_VALUES}
					validationSchema={TodoEditSchema}
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

							<button
								type="submit"
								className={styles.modalFormSubmit}
							>
								Change
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default TodoEditModal;
