import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTodoStore } from '~store/todo.store';
import { TodoCreate } from '~shared/interface/todo.interface';

const TodoSchema = Yup.object().shape({
	title: Yup.string()
		.required('Title is required')
		.min(5, 'Min 5 characters')
		.max(50, 'Max 20 characters'),
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
		<div className="modal">
			<h2>Create Todo</h2>
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
						<button type="submit">Create</button>
						<button type="button" onClick={onClose}>Close</button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default TodoModal