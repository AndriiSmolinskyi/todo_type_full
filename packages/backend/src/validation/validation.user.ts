import Joi from 'joi';

export const registerSchema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const sendVerificationCodeSchema = Joi.object({
	email: Joi.string().email().required(),
});

export const verifyEmailSchema = Joi.object({
	email: Joi.string().email().required(),
	code: Joi.string().length(6).required(),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const updateUserSchema = Joi.object({
	username: Joi.string().optional(),
	password: Joi.string().min(6).optional(),
}).or('username', 'password');

export const initiateResetPasswordSchema = Joi.object({
	email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
	email: Joi.string().email().required(),
	code: Joi.string().required(),
	newPassword: Joi.string().min(6).required(),
});

export const updatePasswordSchema = Joi.object({
	password: Joi.string().min(6).required().messages({
		'string.base': 'Password should be a type of text',
		'string.empty': 'Password cannot be empty',
		'string.min': 'Password must be at least 6 characters long',
		'any.required': 'Password is required',
	}),
});

export const updateUserNameSchema = Joi.object({
	username: Joi.string().min(3).required().messages({
		'string.base': 'Username should be a type of text',
		'string.empty': 'Username cannot be empty',
		'string.min': 'Username must be at least 3 characters long',
		'any.required': 'Username is required',
	}),
});
