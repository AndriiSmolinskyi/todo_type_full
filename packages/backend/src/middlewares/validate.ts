// import { RequestHandler, Request, Response, NextFunction } from 'express';
// import { ObjectSchema } from 'joi';

// export const validatorMiddleware = (schema: ObjectSchema): RequestHandler => {
// 	return (
// 		req: Request,
// 		res: Response,
// 		next: NextFunction,
// 	): void | Response => {
// 		const { error } = schema.validate(req.body, { abortEarly: false });

// 		if (error) {
// 			const message = error.details
// 				.map((detail) => detail.message)
// 				.join(', ');
// 			return res.status(400).json({ error: message });
// 		}

// 		next();
// 	};
// };


import { RequestHandler, Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validatorMiddleware = (
  schema: ObjectSchema,
  property: 'body' | 'query' | 'params' = 'body'
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void | Response => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ');
      return res.status(400).json({ error: message });
    }

    next();
  };
};
