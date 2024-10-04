import React from 'react';
import { TodoItemProps } from '~shared/interface/todo.interface';
import * as styles from './todo.container.desktop.style';
import { todoButtons } from '../../todo.buttons.style';
import ToggleButton from '~shared/components/toggle.button/toggle.button';

const TodoItemDesktop: React.FC<TodoItemProps> = ({ todo, onAction }) => {
  return (
    <>
      <div>{todo.title}</div>
      <div>{todo.body}</div>
      <div className={styles.todoDesktopBtns}>
        <button className={todoButtons} onClick={() => onAction(todo.id, 'view')}>View</button>
        <button className={todoButtons} onClick={() => onAction(todo.id, 'delete')}>Delete</button>
        <ToggleButton
          checked={todo.completed!}
          onChange={() => onAction(todo.id, 'toggle', todo.completed)}
        />
      </div>
    </>
  );
};

export default TodoItemDesktop;