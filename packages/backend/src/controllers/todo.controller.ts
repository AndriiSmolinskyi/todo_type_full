import { Request, Response } from "express";
import TodoService from "@/services/todo.service";

export class TodoController{
	constructor(private todoService: TodoService){}

	async getAllTodos(_: Request, res: Response): Promise<void>{
		try {
			const todos = await this.todoService.findAll()
			res.json(todos)
		} catch (error) {
			res.status(500).json({message: 'Error fetch todo'})
		}
	}


	async getTodoById(req: Request, res: Response): Promise<void>{
		const id = Number(req.params.id)
		if(isNaN(id)){
			res.status(400).json({message: 'Invalid ID'})
			return
		}

		try {
			const todo = await this.todoService.findById(id)
			if(!todo){
				res.status(404).json({message: 'Todo not found'})
			} else{
				res.json(todo)
			}
		} catch (error) {
			res.status(500).json({ message: 'Error fetch todo' })
		}
	}

	async makeTodo(req: Request, res: Response): Promise<void>{
		const {title, body} = req.body
		
		if(!title && !body){
			res.status(400).json({message: "Title and body is required"})
			return
		}

		try {
			const newTodo = await this.todoService.createTodo({title, body})
			res.status(201).json(newTodo)
		} catch (error) {
			res.status(500).json({ message: 'Error creating todo' })
		}
	}

	async updatesTodo(req: Request, res: Response): Promise<void>{
		const id = Number(req.params.id)
		const {title, body, completed} = req.body

		if(isNaN(id)){
			res.status(400).json({ message: 'Invalid ID' })
		}

		try {
			const updatedTodo = await this.todoService.updateTodo(id, {title, body, completed})
			if(!updatedTodo){
				res.status(404).json({message: 'Todo not found'})
			} else{
				res.json(updatedTodo)
			}
		} catch (error) {
			res.status(500).json({message: 'Error updating todo'})
		}
	}

	async deleteTodo(req: Request, res: Response): Promise<void> {
		const id = Number(req.params.id);
	
		if (isNaN(id)) {
		  res.status(400).json({ message: 'Invalid ID' });
		  return;
		}
	
		try {
		  await this.todoService.deleteTodo(id);
		  res.status(204).send(); 
		} catch (error) {
		  res.status(500).json({ message: 'Error deleting todo' });
		}
	}

}

const todoConroller = new TodoController(new TodoService())
export default todoConroller