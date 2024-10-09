import React from 'react';
import { TodoItemProps } from '~shared/interface/todo.interface';
import * as styles from './todo.desktop.style';
import TodoItemDesktop from './todo.item.desktop';

const TodoContainerDesktop: React.FC<{
	todos: TodoItemProps['todo'][];
	handleAction: TodoItemProps['onAction'];
}> = ({ todos, handleAction }) => {
	return (
		<div className={styles.todoDesktop}>
			<h3>Todo Title</h3>
			<h3>Todo description</h3>
			<h3>Actions</h3>
			{todos.map((todo) => (
				<TodoItemDesktop
					key={todo.id}
					todo={todo}
					onAction={handleAction}
				/>
			))}
		</div>
	);
};

export default TodoContainerDesktop;
