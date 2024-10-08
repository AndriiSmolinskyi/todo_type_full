import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodoStore } from '~store/todo.store';
import TodoEditModal from '../todo.modal/todo.detail.edit';
import ToggleButton from '~shared/components/toggle.button/toggle.button';
import * as styles from './todo.details.style'
import { ROUTER_KEYS } from '~router/router.keys';

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
			navigate(ROUTER_KEYS.HOME);
		}
	};

	if (!selectedTodo) return <p>Todo not found!</p>;

	return (
		<div className={styles.todoDetails}>
			<h2 className={styles.todoDetailsTitle}>{selectedTodo.title}</h2>

			<div className={styles.todoDetailsDesc}>
				<h3>Description</h3>
				<p>{selectedTodo.body}</p>
			</div>

			<div className={styles.todoDetailsComp}>
				<h3>Completed</h3>
				<ToggleButton
					checked={selectedTodo.completed}
					onChange={toggleCompleted}
				/>
			</div>

			<div className={styles.todoDetailsButtonsBlock}>
				<button className={styles.todoDetailsButtons} onClick={openEditModal}>Edit</button>
				<button className={styles.todoDetailsButtons} onClick={deleteCurrentTodo}>Delete</button>
				<button className={styles.todoDetailsButtons} onClick={() => navigate(ROUTER_KEYS.HOME)}>Back</button>
			</div>

			

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
