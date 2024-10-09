import React, { useState } from 'react';
import * as styles from './todo.sort.style';

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
			{['All', 'Private', 'Public', 'Completed'].map((filter) => (
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
