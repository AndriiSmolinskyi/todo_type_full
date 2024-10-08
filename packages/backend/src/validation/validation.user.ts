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
