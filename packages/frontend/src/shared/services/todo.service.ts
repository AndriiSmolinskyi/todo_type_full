import HttpService from './http.services';
import { Todo, TodoCreate, TodoUpdate } from '../interface/todo.interface';

class TodoService extends HttpService {
	constructor() {
		super();
	}

	// public async getTodos(
	// 	search: string = '',
	// 	status: string = '',
	// ): Promise<Todo[]> {
	// 	return this.get<Todo[]>(
	// 		`todos/getAllTodos?search=${search}&status=${status}`,
	// 		true,
	// 	);
	// }

	public async getTodos(
		search: string = '',
		status: string = '',
		page: number = 1 
	): Promise<Todo[]> {
		const limit = 8; 
		return this.get<Todo[]>(
			`todos/getAllTodos?page=${page}&limit=${limit}&status=${encodeURIComponent(status)}&search=${encodeURIComponent(search)}`,
			true
		);
	}

	public async getTodoById(id: number): Promise<Todo> {
		return this.get<Todo>(`todos/getTodo/${id}`, true);
	}

	public async createTodo(data: TodoCreate): Promise<Todo> {
		return this.post<Todo, TodoCreate>('todos/createTodo', data, true);
	}

	public async updateTodo(id: number, data: TodoUpdate): Promise<Todo> {
		return this.put<Todo, TodoUpdate>(`todos/updateTodo/${id}`, data, true);
	}

	public async deleteTodo(id: number): Promise<void> {
		return this.delete<void>(`todos/deleteTodo/${id}`, true);
	}
}

export default new TodoService();

