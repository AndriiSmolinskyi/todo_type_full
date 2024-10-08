import React from 'react';
import { Todo, TodoItemProps } from '~shared/interface/todo.interface';
import ToggleButton from '~shared/components/toggle.button/toggle.button';
import * as styles from './todo.tablet.style'
import { todoButtons } from '../../todo.buttons.style';

const TodoItemTablet: React.FC<TodoItemProps> = ({ todo, onAction }) => {
	return (
		<div className={styles.ItemTabletStyles}>
			<h3>{todo.title}</h3>
			<p className={styles.ItemTabletBody}>{todo.body}</p>
			<div className={styles.ItemTabletBtnBlock}>
				<div className={styles.ItemTabletBtn}>
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

export default TodoItemTablet;
