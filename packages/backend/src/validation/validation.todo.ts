import Joi from 'joi';

export const createTodoSchema = Joi.object({
	title: Joi.string().required(),
	body: Joi.string().required(),
});

export const updateTodoSchema = Joi.object({
	title: Joi.string().optional(),
	body: Joi.string().optional(),
	completed: Joi.boolean().optional(),
}).or('title', 'body', 'completed');
