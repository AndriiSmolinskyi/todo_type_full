import { Request, Response, NextFunction } from 'express';

export const isExist = <T>(findEntity: (id: number) => Promise<T | null>) => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const id = Number(req.params.id);

		if (isNaN(id)) {
			res.status(400).json({ message: 'Invalid ID' });
			return;
		}

		try {
			const entity = await findEntity(id);
			if (!entity) {
				res.status(404).json({ message: 'Entity not found' });
				return;
			}

			(req as Request & { entity: T }).entity = entity;
			next();
		} catch (error) {
			res.status(500).json({ message: 'Error fetch entity' });
		}
	};
};
