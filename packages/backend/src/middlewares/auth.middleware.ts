import { Request, Response, NextFunction } from 'express';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
	currentUser?: User;
}

export const authMiddleware = async (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
): Promise<Response | void> => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res
			.status(401)
			.json({ message: 'Authorization header is missing or invalid' });
	}

	const sessionToken = authHeader.split(' ')[1];

	try {
		const user = await prisma.user.findFirst({
			where: { sessionToken },
		});

		if (!user) {
			return res.status(401).json({ message: 'Invalid session token' });
		}

		req.currentUser = user;
		next();
	} catch (error) {
		return res.status(500).json({ message: 'Internal server error' });
	}
};
