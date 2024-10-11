import React from 'react';
import { TodoItemProps } from '~shared/interface/todo.interface';
import * as styles from './todo.desktop.style';
import { todoButtons } from '../../todo.buttons.style';
import ToggleButton from '~shared/components/toggle.button/toggle.button';

const TodoItemDesktop: React.FC<TodoItemProps> = ({ todo, onAction }) => {
  const isEmpty = todo.id === 0; 
  
  return (
    <>
      <div>{isEmpty ? '' : todo.title}</div>
      <div>{isEmpty ? '' : todo.body}</div>
      <div className={styles.todoDesktopBtns}>
        {!isEmpty && (
          <>
            <button className={todoButtons} onClick={() => onAction(todo.id, 'view')}>View</button>
            <button className={todoButtons} onClick={() => onAction(todo.id, 'delete')}>Delete</button>
            <ToggleButton
              checked={todo.completed!}
              onChange={() => onAction(todo.id, 'toggle', todo.completed)}
            />
          </>
        )}
      </div>
    </>
  );
};

export default TodoItemDesktop;