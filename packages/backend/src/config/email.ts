import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
	host: 'in-v3.mailjet.com',
	port: 587,
	secure: false,
	auth: {
		user: process.env.MJ_APIKEY_PUBLIC,
		pass: process.env.MJ_APIKEY_PRIVATE,
	},
});

export const sendVerificationEmail = async (to: string, code: string) => {
	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to,
		subject: 'Email Verification',
		text: `Your verification code: ${code}`,
		html: `<p>Your verification code: <strong>${code}</strong></p>`,
	};

	await transporter.sendMail(mailOptions);
};

export const sendResetPasswordEmail = async (to: string, code: string) => {
	const mailOptions = {
		from: process.env.EMAIL_FROM,
		to,
		subject: 'Password Reset',
		text: `Your password reset code: ${code}`,
    html: `<p>Your password reset code: <strong>${code}</strong></p>`,
	};

	await transporter.sendMail(mailOptions);
};
