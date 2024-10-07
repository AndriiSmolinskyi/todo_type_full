import { Request, Response } from 'express';
import TodoService from '@/services/todo.service';

export class TodoController {
	constructor(public todoService: TodoService) {}

	async getAllTodos(_: Request, res: Response): Promise<void> {
		const todos = await this.todoService.findAll();
		res.json(todos);
	}

	async getTodoById(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		const todo = await this.todoService.findById(id);
		res.json(todo);
	}

	async makeTodo(req: Request, res: Response): Promise<void> {
		const { userId, title, body } = req.body;
		const newTodo = await this.todoService.createTodo({ userId, title, body });
		res.status(201).json(newTodo);
	}

	async updatesTodo(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		const { title, body, completed } = req.body;
		const updatedTodo = await this.todoService.updateTodo(id, {
			title,
			body,
			completed,
		});
		res.json(updatedTodo);
	}

	async deleteTodo(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		await this.todoService.deleteTodo(id);
		res.status(204).send();
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
