import React, { useState } from 'react';
import * as styles from './todo.sort.style';
import { FILTER_OPTIONS } from './todo.sort.options';

interface TodoSortProps {
	onFilterChange: (status: string) => void;
	selectedFilter: string;
}

const TodoSort: React.FC<TodoSortProps> = ({
	onFilterChange,
	selectedFilter,
}) => {
	const handleFilterClick = (filter: string) => {
		onFilterChange(filter);
	};

	return (
		<div className={styles.TodoSortBlock}>
			{FILTER_OPTIONS.map((filter) => (
				<button
					key={filter}
					className={`${styles.TodoSortBtn} ${selectedFilter === filter ? styles.TodoSortBtnSelected : ''}`}
					onClick={() => handleFilterClick(filter)}
				>
					{filter}
				</button>
			))}
		</div>
	);
};

export default TodoSort;

