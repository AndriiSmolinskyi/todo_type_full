import React from 'react';
import { TodoItemProps } from '~shared/interface/todo.interface'; 
import TodoMobileItem from './todo.mobile.item';
import * as styles from './todo.mobile.style'

const TodoContainerMobile: React.FC<{ 
  todos: TodoItemProps['todo'][]; 
  handleAction: TodoItemProps['onAction']; 
}> = ({ todos, handleAction }) => {
  return (
    <div className={styles.ContaineMobileStyles}>
      {todos.map((todo) => (
        <TodoMobileItem key={todo.id} todo={todo} onAction={handleAction} />
      ))}
    </div>
  );
};

export default TodoContainerMobile;