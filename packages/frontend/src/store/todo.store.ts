import { create } from 'zustand';
import todoService from '~shared/services/todo.service';
import { Todo, TodoStore } from '~shared/interface/todo.interface';

export const useTodoStore = create<TodoStore>((set) => ({
	todos: [],
	isLoading: false,
	error: null,

	fetchTodos: async () => {
		set({ isLoading: true, error: null });
		const todos = await todoService.getTodos();
		set({ todos, isLoading: false });
	},

	addTodo: async (todo) => {
		set({ isLoading: true, error: null });
		const newTodo = await todoService.createTodo(todo);
		set((state) => ({
			todos: [...state.todos, newTodo],
			isLoading: false,
		}));
	},

	updateTodo: async (id, todo) => {
		set({ isLoading: true, error: null });
		const updatedTodo = await todoService.updateTodo(id, todo);
		set((state) => ({
			todos: state.todos.map((t) => (t.id === id ? updatedTodo : t)),
			isLoading: false,
		}));
	},

	deleteTodo: async (id) => {
		set({ isLoading: true, error: null });
		await todoService.deleteTodo(id);
		set((state) => ({
			todos: state.todos.filter((t) => t.id !== id),
			isLoading: false,
		}));
	},
}));
