import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTodoStore } from '~store/todo.store';
import { TodoUpdate } from '~shared/interface/todo.interface';

interface TodoEditModalProps {
	isOpen: boolean;
	onClose: () => void;
	todoId: number;
}

const TodoEditSchema = Yup.object().shape({
	title: Yup.string()
		.required('Title is required')
		.min(5, 'Min 5 characters')
		.max(20, 'Max 20 characters'),
	body: Yup.string()
		.required('Body is required')
		.min(10, 'Min 10 characters')
		.max(200, 'Max 200 characters'),
});

const TodoEditModal: React.FC<TodoEditModalProps> = ({
	isOpen,
	onClose,
	todoId,
}) => {
	const { todos, updateTodo } = useTodoStore();
	const todo = todos.find((t) => t.id === todoId);

	if (!todo || !isOpen) return null;

	return (
		<div className="modal">
			<h2>Edit Todo</h2>
			<Formik
				initialValues={{ title: todo.title, body: todo.body }}
				validationSchema={TodoEditSchema}
				onSubmit={async (values: TodoUpdate, { resetForm }) => {
					await updateTodo(todoId, values);
					resetForm();
					onClose();
				}}
			>
				{({ errors, touched }) => (
					<Form>
						<div>
							<label>Title</label>
							<Field name="title" />
							{errors.title && touched.title ? (
								<div>{errors.title}</div>
							) : null}
						</div>
						<div>
							<label>Body</label>
							<Field name="body" />
							{errors.body && touched.body ? (
								<div>{errors.body}</div>
							) : null}
						</div>
						<button type="submit">Save Changes</button>
						<button type="button" onClick={onClose}>
							Cancel
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default TodoEditModal;
