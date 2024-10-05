import { PrismaClient, Todo } from '@prisma/client';

const prisma = new PrismaClient(); //взаємодія з бд

interface CreateTodoInput {
	title: string; 
	body: string;  
}

interface UpdateTodoInput {
	title?: string;
	body?: string;
	completed?: boolean;
}

export default class TodoService {

	async findAll(): Promise<Todo[]> {
		return prisma.todo.findMany()
	}

	async findById(id: number): Promise<Todo | null>{
		return prisma.todo.findUnique({
			where: { id }
		})
	}

	async createTodo(data: CreateTodoInput): Promise<Todo>{
		return prisma.todo.create({data})
	}

	async updateTodo(id: number, data: UpdateTodoInput): Promise<Todo | null> {
		return prisma.todo.update({
		  where: { id },
		  data, 
		});
	}

	async deleteTodo(id: number): Promise<void>{
		await prisma.todo.delete({
			where: {id}
		})
	} 
}
