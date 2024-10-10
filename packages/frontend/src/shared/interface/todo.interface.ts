export interface Todo {
	id?: number;
	title?: string;
	body?: string;
	completed?: boolean;
	private?: boolean; 
}

export interface TodoCreate {
	title: string;
	body: string;
	private?: boolean; 
}

export interface TodoUpdate {
	title?: string;
	body?: string;
	completed?: boolean;
	private?: boolean; 
}

export interface TodoStore {
	todos: Todo[];
	isLoading: boolean;
	error: string | null;
	fetchTodos: (search: string, status: string, page: number) => Promise<void>; 
	fetchTodoById: (id: number) => Promise<void>; // Додано
	addTodo: (todo: Omit<Todo, 'id'>) => Promise<void>;
	updateTodo: (id: number, todo: Omit<Todo, 'id'>) => Promise<void>;
	deleteTodo: (id: number) => Promise<void>;
  }

export interface TodoItemProps {
	todo: Todo;
	onAction: (
		id: number,
		action: 'toggle' | 'delete' | 'view',
		completed?: boolean,
	) => void;
}

