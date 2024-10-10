import { Request, Response, NextFunction } from 'express';

export const paginationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const page = parseInt(req.query.page as string, 10) || 1; 
  const limit = parseInt(req.query.limit as string, 10) || 8; 

  req.pagination = {
    page,
    limit,
    skip: (page - 1) * limit, 
  };

  next();
};