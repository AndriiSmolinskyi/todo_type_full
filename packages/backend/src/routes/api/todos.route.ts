import { Router } from 'express';
import todoController from '@/controllers/todo.controller';
import { validatorMiddleware } from '@/middlewares/validate';
import { isExist } from '@/middlewares/isexist';
import { tryCatchMiddleware } from '@/middlewares/trycatch';
import { createTodoSchema,updateTodoSchema } from '@/validation/validation.todo';

const todosRouter: Router = Router();

todosRouter.get(
	'/getAllTodos',
	tryCatchMiddleware(todoController.getAllTodos.bind(todoController)),
);

todosRouter.get(
	'/getTodo/:id',
	isExist(todoController.todoService.findById.bind(todoController)),
	tryCatchMiddleware(todoController.getTodoById.bind(todoController)),
);

todosRouter.post(
	'/createTodo',
	validatorMiddleware(createTodoSchema),
	tryCatchMiddleware(todoController.makeTodo.bind(todoController)),
);

todosRouter.put(
	'/updateTodo/:id',
	isExist(todoController.todoService.findById.bind(todoController)),
	validatorMiddleware(updateTodoSchema),
	tryCatchMiddleware(todoController.updatesTodo.bind(todoController)),
);

todosRouter.delete(
	'/deleteTodo/:id',
	isExist(todoController.todoService.findById.bind(todoController)),
	tryCatchMiddleware(todoController.deleteTodo.bind(todoController)),
);

export default todosRouter;
