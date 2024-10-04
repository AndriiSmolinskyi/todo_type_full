import React from 'react';
import TodoItem from '../../todo.item/todo.item';
import { TodoItemProps } from '~shared/interface/todo.interface'; 

const TodoContainerTablet: React.FC<{ 
  todos: TodoItemProps['todo'][]; 
  handleAction: TodoItemProps['onAction']; 
}> = ({ todos, handleAction }) => {
  return (
    <div style={{ display: 'flex', overflowX: 'scroll' }}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onAction={handleAction} />
      ))}
    </div>
  );
};

export default TodoContainerTablet;