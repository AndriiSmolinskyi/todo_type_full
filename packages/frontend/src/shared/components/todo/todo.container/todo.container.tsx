import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTodoStore } from '~store/todo.store';
import { useNavigate } from 'react-router-dom';
import TodoContainerDesktop from './todo.container.desktop/todo.container.desktop';
import TodoContainerTablet from './todo.container.tablet/todo.container.tablet';
import TodoContainerMobile from './todo.container.mobile/todo.container.mobile';
import TodoModal from '../todo.modal/todo.modal';
import TodoSearch from './todo.search/todo.search';
import TodoSort from './todo.sort/todo.sort';
import * as styles from './todo.container.style';

const TodoContainer: React.FC = () => {
	const { todos, fetchTodos, deleteTodo, updateTodo } = useTodoStore();
	const [isModalOpen, setModalOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		fetchTodos();
	}, [fetchTodos]);

	const toggleModal = () => setModalOpen(!isModalOpen);

	const handleAction = (
		id: number,
		action: 'toggle' | 'delete' | 'view',
		completed?: boolean,
	) => {
		if (action === 'toggle') updateTodo(id, { completed: !completed });
		if (action === 'delete') deleteTodo(id);
		if (action === 'view') navigate(`/todos/${id}`);
	};

	const isDesktop = useMediaQuery({ minWidth: 1024 });
	const isTablet = useMediaQuery({ minWidth: 581, maxWidth: 1023 });
	const isMobile = useMediaQuery({ maxWidth: 580 });

	let TodoListComponent;

	if (isDesktop) {
		TodoListComponent = (
			<TodoContainerDesktop todos={todos} handleAction={handleAction} />
		);
	} else if (isTablet) {
		TodoListComponent = (
			<TodoContainerTablet todos={todos} handleAction={handleAction} />
		);
	} else {
		TodoListComponent = (
			<TodoContainerMobile todos={todos} handleAction={handleAction} />
		);
	}

	return (
		<div className={styles.ContrainerStyle}>
			<div className={styles.ContainerBtnBlock}>
				<TodoSort></TodoSort>
				<TodoSearch></TodoSearch>
			</div>

			<button
				className={styles.ContainerCreateTodo}
				onClick={toggleModal}
			>
				Create Todo
			</button>

			{todos.length === 0 ? (
				<p>Create your first task</p>
			) : (
				TodoListComponent
			)}

			{isModalOpen && (
				<TodoModal isOpen={isModalOpen} onClose={toggleModal} />
			)}
		</div>
	);
};

export default TodoContainer;
