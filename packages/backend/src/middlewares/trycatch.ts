import { RequestHandler, Request, Response, NextFunction } from 'express';

export const tryCatchMiddleware = (
	controller: RequestHandler,
): RequestHandler => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			await controller(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};
