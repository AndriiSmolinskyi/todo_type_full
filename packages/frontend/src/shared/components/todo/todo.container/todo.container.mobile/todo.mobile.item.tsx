import React from 'react';
import { Todo, TodoItemProps } from '~shared/interface/todo.interface';
import ToggleButton from '~shared/components/toggle.button/toggle.button';
import { todoButtons } from '../../todo.buttons.style';
import * as styles from './todo.mobile.style'

const TodoMobileItem: React.FC<TodoItemProps> = ({ todo, onAction }) => {
	return (
		<div className={styles.ItemMobileStyles}>
			<h3>{todo.title}</h3>
			<p className={styles.ItemMobileBody}>{todo.body}</p>
			<div className={styles.ItemMobileBtnBlock}>
				<div className={styles.ItemMobileBtn}>
					<button className={todoButtons} onClick={() => onAction(todo.id, 'view')}>
						View
					</button>
					<button className={todoButtons} onClick={() => onAction(todo.id, 'delete')}>
						Delete
					</button>
				</div>
				<ToggleButton
					checked={todo.completed!}
					onChange={() => onAction(todo.id, 'toggle', todo.completed)}
				/>
			</div>
		</div>
	);
};

export default TodoMobileItem;
