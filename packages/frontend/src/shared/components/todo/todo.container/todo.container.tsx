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
import { ROUTER_KEYS } from '~router/router.keys';

const TodoContainer: React.FC = () => {
	const { todos, fetchTodos, deleteTodo, updateTodo } = useTodoStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('All');
	const [isModalOpen, setModalOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		fetchTodos(searchQuery, statusFilter === 'All' ? '' : statusFilter.toLowerCase());
	}, [searchQuery, statusFilter]);

	const handleSearchChange = (searchValue: string) => {
		setSearchQuery(searchValue);
	};

	const handleFilterChange = (status: string) => {
		setStatusFilter(status);
	};

	const toggleModal = () => setModalOpen(!isModalOpen);

	const actionHandlers = {
		toggle: (id: number, completed?: boolean) =>
			updateTodo(id, { completed: !completed }),
		delete: (id: number) => deleteTodo(id),
		view: (id: number) =>
			navigate(ROUTER_KEYS.TODOS.replace(':id', id.toString())),
	};

	const handleAction = (
		id: number,
		action: 'toggle' | 'delete' | 'view',
		completed?: boolean,
	) => {
		actionHandlers[action](id, completed);
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
				<TodoSort onFilterChange={handleFilterChange} selectedFilter={statusFilter} />
				<TodoSearch onSearchChange={handleSearchChange} />
			</div>

			<button className={styles.ContainerCreateTodo} onClick={toggleModal}>
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

