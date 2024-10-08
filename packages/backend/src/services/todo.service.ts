import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient();

interface CreateTodoInput {
	title: string;
	body: string;
	userId: number;
	private?: boolean;
}

interface UpdateTodoInput {
	title?: string;
	body?: string;
	completed?: boolean;
	private?: boolean;
}

export default class TodoService {
	// Отримати всі тудушки: публічні та приватні користувача
	async findAll(userId?: number): Promise<Todo[]> {
		return prisma.todo.findMany({
			where: {
				OR: [
					{ private: false }, // Публічні тудушки
					{ userId }, // Приватні тудушки користувача
				],
			},
		});
	}

	// Знайти тудушку за ID з врахуванням приватності
	async findById(id: number, userId?: number): Promise<Todo | null> {
		const todo = await prisma.todo.findUnique({
			where: { id },
		});

		if (!todo) {
			return null;
		}

		if (todo.private && todo.userId !== userId) {
			// Приватна тудушка, яка не належить користувачу
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
		// Перевірка права доступу
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
		// Перевірка права доступу
		const todo = await prisma.todo.findUnique({ where: { id } });

		if (!todo || todo.userId !== userId) {
			return false;
		}

		await prisma.todo.delete({
			where: { id },
		});
		return true;
	}
}
