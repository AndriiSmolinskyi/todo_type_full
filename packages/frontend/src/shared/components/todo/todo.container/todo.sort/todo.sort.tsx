import React from 'react';
import * as styles from './todo.sort.style'

const TodoSort: React.FC = () => {
	return (
		<div className={styles.TodoSortBlock}>
			<button className={styles.TodoSortBtn}>All</button>
			<button className={styles.TodoSortBtn}>Private</button>
			<button className={styles.TodoSortBtn}>Public</button>
			<button className={styles.TodoSortBtn}>Completed</button>
		</div>
	);
};

export default TodoSort
