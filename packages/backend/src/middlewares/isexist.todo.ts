import { Request, Response, NextFunction } from "express";
import TodoService from "@/services/todo.service";

const todoService = new TodoService()

export const isExist = async (req: Request, res: Response, next: NextFunction) =>{
    const id = Number(req.params.id)

    if (isNaN(id)){
        return res.status(400).json({message: 'Invalid ID'})
    }

    const todo = await todoService.findById(id)

    if(!todo){
        return res.status(404).json({message: 'Todo not found'})
    }

    next()
}
