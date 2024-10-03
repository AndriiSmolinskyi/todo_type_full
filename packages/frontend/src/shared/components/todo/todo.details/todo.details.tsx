import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodoStore } from '~store/todo.store';
import TodoEditModal from './todo.detail.edit/todo.detail.edit';

const TodoDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { todos, updateTodo, deleteTodo } = useTodoStore();
	const [selectedTodo, setSelectedTodo] = useState(() =>
		todos.find((t) => t.id === Number(id)),
	);
	const [isEditOpen, setEditOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const todo = todos.find((t) => t.id === Number(id));
		if (todo) setSelectedTodo(todo);
	}, [todos, id]);

	const toggleCompleted = () =>
		selectedTodo &&
		updateTodo(selectedTodo.id, { completed: !selectedTodo.completed });

	const openEditModal = () => setEditOpen(true);

	const deleteCurrentTodo = async () => {
		if (selectedTodo) {
			await deleteTodo(selectedTodo.id);
			navigate('/');
		}
	};

	if (!selectedTodo) return <p>Todo not found!</p>;

	return (
		<div>
			<h1>{selectedTodo.title}</h1>
			<p>{selectedTodo.body}</p>
			<label>
				Completed:
				<input
					type="checkbox"
					checked={selectedTodo.completed}
					onChange={toggleCompleted}
				/>
			</label>
			<button onClick={openEditModal}>Edit</button>
			<button onClick={deleteCurrentTodo}>Delete</button>
			<button onClick={() => navigate('/')}>Back</button>

			{isEditOpen && (
				<TodoEditModal
					isOpen={isEditOpen}
					onClose={() => setEditOpen(false)}
					todoId={selectedTodo.id}
				/>
			)}
		</div>
	);
};

export default TodoDetails;
