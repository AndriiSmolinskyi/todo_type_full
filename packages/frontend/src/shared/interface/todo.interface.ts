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

export interface TodosResponse {
	todos: Todo[];        
	totalPages: number;   
}

export interface TodoStore {
	todos: Todo[];
	isLoading: boolean;
	error: string | null;
	totalPages: number;    
	currentPage: number;  
	fetchTodos: (search: string, status: string, page: number) => Promise<void>; 
	fetchTodoById: (id: number) => Promise<void>; 
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


export interface TodoModalProps {
    isOpen: boolean;
    onClose: () => void;
    searchQuery: string; 
    statusFilter: string;
    page: number;
}