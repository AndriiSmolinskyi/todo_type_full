import React, { useEffect, useState } from 'react';
import { useTodoStore } from '~store/todo.store';
import TodoModal from '../todo.modal/todo.modal';
import { useNavigate } from 'react-router-dom';
import TodoItem from '../todo.item/todo.item';

const TodoContainer: React.FC = () => {
  const { todos, fetchTodos, deleteTodo, updateTodo } = useTodoStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleAction = (id: number, action: 'toggle' | 'delete' | 'view', completed?: boolean) => {
    if (action === 'toggle') updateTodo(id, { completed: !completed });
    if (action === 'delete') deleteTodo(id);
    if (action === 'view') navigate(`/todos/${id}`);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={toggleModal}>Create Todo</button>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onAction={handleAction}
          />
        ))}
      </ul>

      {isModalOpen && <TodoModal isOpen={isModalOpen} onClose={toggleModal} />}
    </div>
  );
};

export default TodoContainer;