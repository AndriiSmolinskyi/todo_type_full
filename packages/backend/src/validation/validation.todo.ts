import Joi from 'joi';

export const createTodoSchema = Joi.object({
	title: Joi.string().required(),
	body: Joi.string().required(),
	private: Joi.boolean().optional(),
});

export const updateTodoSchema = Joi.object({
	title: Joi.string().optional(),
	body: Joi.string().optional(),
	completed: Joi.boolean().optional(),
	private: Joi.boolean().optional(),
}).or('title', 'body', 'completed', 'private');

export const getAllTodosSchema = Joi.object({
	page: Joi.number().integer().min(1).optional(),
	limit: Joi.number().integer().min(1).max(100).optional(),
	status: Joi.string().valid('completed', 'private', 'public').optional(),
	search: Joi.string().optional(),
	completed: Joi.boolean().optional(),
});