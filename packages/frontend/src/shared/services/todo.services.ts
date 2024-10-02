import HttpService from './http.services';
import { Todo, TodoCreate, TodoUpdate } from '../interface/todo.interface';

class TodoService extends HttpService {
	constructor() {
		super();
	}

    getTodos() {
        return this.get('todos/getAllTodos');
    }

    getTodoById(id: number) {
        return this.get(`todos/getTodo/${id}`);
    }

    createTodo(data: TodoCreate) {
        return this.post('todos/createTodo', data);
    }

    updateTodo(id: number, data: TodoUpdate) {
        return this.put(`todos/updateTodo/${id}`, data);
    }

    deleteTodo(id: number){
        return this.delete(`todos/deleteTodo${id}`)
    }
}

export default new TodoService()
