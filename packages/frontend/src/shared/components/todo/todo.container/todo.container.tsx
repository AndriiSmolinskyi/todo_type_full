import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTodoStore } from '~store/todo.store';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TodoContainerDesktop from './todo.container.desktop/todo.container.desktop';
import TodoContainerTablet from './todo.container.tablet/todo.container.tablet';
import TodoContainerMobile from './todo.container.mobile/todo.container.mobile';
import TodoModal from '../todo.modal/todo.modal';
import TodoSearch from './todo.search/todo.search';
import TodoSort from './todo.sort/todo.sort';
import * as styles from './todo.container.style';
import { ROUTER_KEYS } from '~router/router.keys';

const TodoContainer: React.FC = () => {
	const {
		todos,
		fetchTodos,
		deleteTodo,
		updateTodo,
		totalPages,
		currentPage,
	} = useTodoStore();
	const [searchParams, setSearchParams] = useSearchParams();

	const capitalizeFirstLetter = (str: string): string => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const initialSearch = searchParams.get('search') || '';
	const initialStatus = searchParams.get('status')
		? capitalizeFirstLetter(searchParams.get('status')!)
		: 'All';
	const initialPage = parseInt(searchParams.get('page') || '1', 10);

	const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
	const [statusFilter, setStatusFilter] = useState<string>(initialStatus);
	const [page, setPage] = useState<number>(initialPage);
	const [isModalOpen, setModalOpen] = useState<boolean>(false);
	const navigate = useNavigate();

	const fetchFilteredTodos = (newPage: number) => {
		fetchTodos(
			searchQuery,
			statusFilter === 'All' ? '' : statusFilter.toLowerCase(),
			newPage,
		);
	};

	useEffect(() => {
		fetchFilteredTodos(page);
	}, [searchQuery, statusFilter, page]);

	useEffect(() => {
		const params: Record<string, string> = {};
		if (searchQuery) params.search = searchQuery;
		if (statusFilter !== 'All') params.status = statusFilter.toLowerCase();
		params.page = page.toString();
		setSearchParams(params);
	}, [searchQuery, statusFilter, page]);

	const handleSearchChange = (searchValue: string): void => {
		setSearchQuery(searchValue);
	};

	const handleFilterChange = (status: string): void => {
		setStatusFilter(status);
		setPage(1);
	};

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
	};

	const handleLoadMore = () => {
		if (currentPage < totalPages) {
			setPage((prevPage) => prevPage + 1);
		}
	};

	const toggleModal = (): void => {
		if (statusFilter !== 'All') {
			alert(
				'You cannot create a new todo while a status filter is active. Please select "All" to create a new todo.',
			);
			return;
		}
		setModalOpen(!isModalOpen);
	};

	const actionHandlers: Record<
		string,
		(id: number, completed?: boolean) => void
	> = {
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
	): void => {
		actionHandlers[action](id, completed);
	};

	const isDesktop = useMediaQuery({ minWidth: 1024 });
	const isTablet = useMediaQuery({ minWidth: 581, maxWidth: 1023 });
	const isMobile = useMediaQuery({ maxWidth: 580 });

	let TodoListComponent: JSX.Element;

	if (isDesktop) {
		TodoListComponent = (
			<TodoContainerDesktop
				todos={todos}
				handleAction={handleAction}
				currentPage={page}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		);
	} else if (isTablet) {
		TodoListComponent = (
			<TodoContainerTablet
				todos={todos}
				handleAction={handleAction}
				currentPage={page}
				totalPages={totalPages}
				onPageChange={handlePageChange}
			/>
		);
	} else {
		TodoListComponent = (
			<TodoContainerMobile todos={todos} handleAction={handleAction} />
		);
	}

	return (
		<div className={styles.ContrainerStyle}>
			<div className={styles.ContainerBtnBlock}>
				<TodoSort
					onFilterChange={handleFilterChange}
					selectedFilter={statusFilter}
				/>
				<TodoSearch
					onSearchChange={handleSearchChange}
					initialValue={searchQuery}
				/>
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
				<>{TodoListComponent}</>
			)}

			{isModalOpen && (
				<TodoModal
					isOpen={isModalOpen}
					onClose={toggleModal}
					searchQuery={searchQuery}
					statusFilter={statusFilter}
					page={page}
				/>
			)}
		</div>
	);
};

export default TodoContainer;
