import React from 'react';
import { Todo, TodoItemProps } from '~shared/interface/todo.interface';

const TodoItem: React.FC<TodoItemProps> = ({ todo, onAction }) => {
  return (
    <div>
      <h3>{todo.title}</h3>
      <p>{todo.body}</p>
      <label>
        Completed:
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onAction(todo.id, 'toggle', todo.completed)}
        />
      </label>
      <button onClick={() => onAction(todo.id, 'view')}>View</button>
      <button onClick={() => onAction(todo.id, 'delete')}>Delete</button>
    </div>
  );
};

export default TodoItem;