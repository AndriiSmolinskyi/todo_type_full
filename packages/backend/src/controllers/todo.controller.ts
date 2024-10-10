import { Request, Response } from 'express';
import TodoService from '@/services/todo.service';
import { TodoFilter } from '@/interface/todo.interface';

export class TodoController {
	constructor(public todoService: TodoService) {}

	async getAllTodos(req: Request, res: Response): Promise<void> {
		const userId = req.currentUser?.id;
		const todos = await this.todoService.findAll(userId);
		res.json(todos);
	}

	async getTodoById(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		const userId = req.currentUser?.id;
		const todo = await this.todoService.findById(id, userId);

		if (!todo) {
			res.status(404).json({
				message: 'Todo not found or access denied',
			});
			return;
		}

		res.json(todo);
	}

	async makeTodo(req: Request, res: Response): Promise<void> {
		const userId = req.currentUser?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const { title, body, private: isPrivate } = req.body;
		const newTodo = await this.todoService.createTodo({
			userId,
			title,
			body,
			private: isPrivate,
		});
		res.status(201).json(newTodo);
	}

	async updatesTodo(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		const userId = req.currentUser?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const { title, body, completed, private: isPrivate } = req.body;
		const updatedTodo = await this.todoService.updateTodo(
			id,
			{
				title,
				body,
				completed,
				private: isPrivate,
			},
			userId,
		);

		if (!updatedTodo) {
			res.status(403).json({ message: 'Forbidden' });
			return;
		}

		res.json(updatedTodo);
	}

	async deleteTodo(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
		const userId = req.currentUser?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const isDeleted = await this.todoService.deleteTodo(id, userId);

		if (!isDeleted) {
			res.status(403).json({ message: 'Forbidden' });
			return;
		}

		res.status(204).send();
	}

	async getFilteredTodos(req: Request, res: Response): Promise<void> {
		const userId = req.currentUser?.id;
		const { search, status } = req.query;

		const validStatuses: TodoFilter['status'][] = [
			'completed',
			'private',
			'public',
		];

		const filterStatus =
			typeof status === 'string' &&
			validStatuses.includes(status as TodoFilter['status'])
				? (status as TodoFilter['status'])
				: undefined;

	
		const todos = await this.todoService.findFilteredTodos(userId, {
			search: search ? String(search) : '', 
			status: filterStatus, 
		});

		res.json(todos);
	}
}

const todoController = new TodoController(new TodoService());
export default todoController;
