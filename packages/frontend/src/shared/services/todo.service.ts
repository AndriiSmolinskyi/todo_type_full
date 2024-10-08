import HttpService from './http.services';
import { Todo, TodoCreate, TodoUpdate } from '../interface/todo.interface';

class TodoService extends HttpService {
  constructor() {
    super();
  }

  public async getTodos(): Promise<Todo[]> {
    return this.get<Todo[]>('todos/getAllTodos');
  }

  public async getTodoById(id: number): Promise<Todo> {
    return this.get<Todo>(`todos/getTodo/${id}`);
  }

  public async createTodo(data: TodoCreate): Promise<Todo> {
    return this.post<Todo, TodoCreate>('todos/createTodo', data);
  }

  public async updateTodo(id: number, data: TodoUpdate): Promise<Todo> {
    return this.put<Todo, TodoUpdate>(`todos/updateTodo/${id}`, data);
  }

  public async deleteTodo(id: number): Promise<void> {
    return this.delete<void>(`todos/deleteTodo/${id}`); 
  }
}

export default new TodoService();