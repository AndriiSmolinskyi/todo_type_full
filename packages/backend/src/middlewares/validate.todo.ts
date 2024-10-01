import { Request, Response, NextFunction } from "express";

export const validateTodo = (req: Request, res: Response, next: NextFunction) =>{
    const { title } = req.body
    if(!title){
        return res.status(400).json({message: 'Title is requierd'})
    }
    next()
}