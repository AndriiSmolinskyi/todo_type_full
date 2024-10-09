import { create } from 'zustand';
import todoService from '~shared/services/todo.service';
import { Todo, TodoStore } from '~shared/interface/todo.interface';
import { TodoCreate } from '~shared/interface/todo.interface';
import { AxiosError } from 'axios';

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  isLoading: false,
  error: null,

  fetchTodos: async () => {
    set({ isLoading: true, error: null });
    try {
      const todos = await todoService.getTodos();
      set({ todos, isLoading: false });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Error fetching todos';
      set({ error: errorMessage, isLoading: false });
      alert(errorMessage);
    }
  },

  addTodo: async (todo: TodoCreate) => {
    set({ isLoading: true, error: null });
    try {
      const newTodo = await todoService.createTodo(todo);
      set((state) => ({
        todos: [...state.todos, newTodo],
        isLoading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Error creating todo';
      set({ error: errorMessage, isLoading: false });
      alert(errorMessage);
    }
  },

  updateTodo: async (id, todo) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTodo = await todoService.updateTodo(id, todo);
      set((state) => ({
        todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
        isLoading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Error updating todo';
      set({ error: errorMessage, isLoading: false });

      if (axiosError.response?.status === 403) {
        alert('You cannot edit other users\' todos');
      } else {
        alert(errorMessage);
      }
    }
  },

  deleteTodo: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await todoService.deleteTodo(id);
      set((state) => ({
        todos: state.todos.filter((t) => t.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Error deleting todo';
      set({ error: errorMessage, isLoading: false });

      if (axiosError.response?.status === 403) {
        alert('You cannot delete other users\' todos');
      } else {
        alert(errorMessage);
      }
    }
  },
}));