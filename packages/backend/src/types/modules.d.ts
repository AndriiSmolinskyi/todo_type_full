import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User; 
      pagination?: {
        page: number;
        limit: number;
        skip: number;
      };
    }
  }
}