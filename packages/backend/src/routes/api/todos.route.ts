import { Router } from 'express';
import todoController from '@/controllers/todo.controller';
import { validatorMiddleware } from '@/middlewares/validate';
import { isExist } from '@/middlewares/isexist';
import { tryCatchMiddleware } from '@/middlewares/trycatch';
import {
	createTodoSchema,
	updateTodoSchema,
	getAllTodosSchema
} from '@/validation/validation.todo';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { paginationMiddleware } from '@/middlewares/pagination.middleware';

const todosRouter: Router = Router();

todosRouter.get(
	'/getAllTodos',
	authMiddleware,
	paginationMiddleware,
	tryCatchMiddleware(todoController.getFilteredTodos.bind(todoController)),
);


todosRouter.get(
	'/getTodo/:id',
	authMiddleware,
	tryCatchMiddleware(todoController.getTodoById.bind(todoController)),
);

todosRouter.post(
	'/createTodo',
	authMiddleware,
	validatorMiddleware(createTodoSchema),
	tryCatchMiddleware(todoController.makeTodo.bind(todoController)),
);

todosRouter.put(
    '/updateTodo/:id',
    authMiddleware,
    validatorMiddleware(updateTodoSchema),
    tryCatchMiddleware(todoController.updatesTodo.bind(todoController)),
);

todosRouter.delete(
    '/deleteTodo/:id',
    authMiddleware,
    tryCatchMiddleware(todoController.deleteTodo.bind(todoController)),
);

export default todosRouter;
