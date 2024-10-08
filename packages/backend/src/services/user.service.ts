import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { addMinutes } from 'date-fns';
import { sendVerificationEmail, sendResetPasswordEmail } from '@/config/email';

const prisma = new PrismaClient();

interface UserPublic {
	id: number;
	username: string;
	email: string;
	verified: boolean;
}

class UserService {
	async register(
		username: string,
		email: string,
		password: string,
	): Promise<User> {
		const existingUser = await prisma.user.findUnique({ where: { email } });

		if (existingUser) {
			throw new Error('Email already in use');
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});
		return user;
	}

	async sendVerificationCode(email: string): Promise<void> {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			throw new Error('User not found');
		}

		if (user.verified) {
			throw new Error('User already verified');
		}

		const verificationCode = crypto.randomInt(100000, 1000000).toString();

		await prisma.user.update({
			where: { email },
			data: {
				verificationCode,
			},
		});

		await sendVerificationEmail(email, verificationCode);
	}

	async verifyEmail(email: string, code: string): Promise<boolean> {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user || user.verificationCode !== code) {
			return false;
		}

		await prisma.user.update({
			where: { email },
			data: {
				verified: true,
				verificationCode: null,
			},
		});

		return true;
	}

	async login(email: string, password: string): Promise<string | null> {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user || !user.verified) {
			return null;
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return null;
		}

		const newSessionToken = crypto.randomBytes(32).toString('hex');
		await prisma.user.update({
			where: { email },
			data: { sessionToken: newSessionToken },
		});

		return newSessionToken;
	}

	async logout(userId: number): Promise<void> {
		await prisma.user.update({
			where: { id: userId },
			data: {
				sessionToken: null,
			},
		});
	}

	async initiateResetPassword(email: string): Promise<boolean> {
		const user = await prisma.user.findUnique({ where: { email } });

		if (!user) {
			return false;
		}

		const resetPasswordCode = crypto.randomInt(100000, 1000000).toString();
		const resetPasswordExpires = addMinutes(new Date(), 15);

		await prisma.user.update({
			where: { email },
			data: {
				resetPasswordCode,
				resetPasswordExpires,
			},
		});

		await sendResetPasswordEmail(email, resetPasswordCode);

		return true;
	}

	async resetPassword(
		email: string,
		code: string,
		newPassword: string,
	): Promise<boolean> {
		const user = await prisma.user.findUnique({ where: { email } });

		if (
			!user ||
			user.resetPasswordCode !== code ||
			!user.resetPasswordExpires ||
			user.resetPasswordExpires < new Date()
		) {
			return false;
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await prisma.user.update({
			where: { email },
			data: {
				password: hashedPassword,
				resetPasswordCode: null,
				resetPasswordExpires: null,
			},
		});

		return true;
	}

	async updateUser(
		id: number,
		data: { username?: string; password?: string },
	): Promise<User | null> {
		const updateData: Partial<User> = {};

		if (data.username !== undefined) {
			updateData.username = data.username;
		}

		if (data.password !== undefined) {
			const hashedPassword = await bcrypt.hash(data.password, 10);
			updateData.password = hashedPassword;
		}

		if (Object.keys(updateData).length === 0) {
			return null;
		}

		return prisma.user.update({
			where: { id },
			data: updateData,
		});
	}

	async deleteUser(id: number): Promise<void> {
		await prisma.user.delete({
			where: { id },
		});
	}

	async getUserById(id: number): Promise<UserPublic | null> {
		return prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				username: true,
				email: true,
				verified: true,
			},
		}) as Promise<UserPublic | null>;
	}

	async getAllUsers(): Promise<UserPublic[]> {
		return prisma.user.findMany({
			select: {
				id: true,
				username: true,
				email: true,
				verified: true,
			},
		}) as Promise<UserPublic[]>;
	}

	async updatePassword(
		id: number,
		newPassword: string,
	): Promise<User | null> {
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		return prisma.user.update({
			where: { id },
			data: { password: hashedPassword },
		});
	}

	async updateUserName(id: number, username: string): Promise<User | null> {
		return prisma.user.update({
			where: { id },
			data: { username },
		});
	}
}

export default UserService;
