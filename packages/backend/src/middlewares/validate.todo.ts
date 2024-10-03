import { Request, Response, NextFunction } from 'express';

export const validateTodo = (isUpdate = false) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { title, body, completed } = req.body;

		if (isUpdate) {
			if (!title && !body && completed === undefined) {
				return res.status(400).json({
					message:
						'Select min one field to update',
				});
			}
		} else {
			if (!title || !body) {
				return res.status(400).json({
					message: 'Title and Body are required.',
				});
			}
		}

		next();
	};
};
