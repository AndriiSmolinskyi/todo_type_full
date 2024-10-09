import { PrismaClient, Prisma, Todo } from '@prisma/client';
import {
	CreateTodoInput,
	UpdateTodoInput,
	TodoFilter,
} from '@/interface/todo.interface';

const prisma = new PrismaClient();

export default class TodoService {
	async findAll(userId?: number): Promise<Todo[]> {
		return prisma.todo.findMany({
			where: {
				OR: [{ private: false }, { userId }],
			},
		});
	}

	async findById(id: number, userId?: number): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({
			where: { id },
		});

		if (!todo) {
			return null;
		}

		if (todo.private && todo.userId !== userId) {
			return null;
		}

		return todo;
	}

	async createTodo(data: CreateTodoInput): Promise<Todo> {
		return prisma.todo.create({ data });
	}

	async updateTodo(
		id: number,
		data: UpdateTodoInput,
		userId: number,
	): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({ where: { id } });

		if (!todo || todo.userId !== userId) {
			return null;
		}

		return prisma.todo.update({
			where: { id },
			data,
		});
	}

	async deleteTodo(id: number, userId: number): Promise<boolean> {
		const todo = await prisma.todo.findUnique({ where: { id } });

		if (!todo || todo.userId !== userId) {
			return false;
		}

		await prisma.todo.delete({
			where: { id },
		});
		return true;
	}

	async findFilteredTodos(userId?: number, filters?: TodoFilter): Promise<Todo[]> {
		const { search, status } = filters || {};

		const whereConditions: any = {
			OR: [
				{ private: false },
				{ userId },         
			],
			AND: []
		};

		if (search) {
			whereConditions.AND.push({
				OR: [
					{ title: { contains: search, mode: 'insensitive' } },
					{ body: { contains: search, mode: 'insensitive' } },
				],
			});
		}

		if (status === 'completed') {
			whereConditions.AND.push({ completed: true });
		} else if (status === 'private') {
			whereConditions.AND.push({ private: true });
		} else if (status === 'public') {
			whereConditions.AND.push({ private: false });
		}

		if (whereConditions.AND.length === 0) {
			delete whereConditions.AND;
		}

		return prisma.todo.findMany({
			where: whereConditions,
		});
	}
}
