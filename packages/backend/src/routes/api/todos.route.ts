import { Router } from "express";
import todoController from "@/controllers/todo.controller";
import { validateTodo } from "@/middlewares/validate.todo";

const todosRouter: Router = Router()

todosRouter.get('/getAllTodos', todoController.getAllTodos.bind(todoController));
todosRouter.get('/getTodo/:id', todoController.getTodoById.bind(todoController));
todosRouter.post('/createTodo', validateTodo, todoController.makeTodo.bind(todoController));
todosRouter.put('/updateTodo/:id', validateTodo, todoController.updatesTodo.bind(todoController));
todosRouter.delete('deleteTodo/:id', todoController.deleteTodo.bind(todoController));

export default todosRouter