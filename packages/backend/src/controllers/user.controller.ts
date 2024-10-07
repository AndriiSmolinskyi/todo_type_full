import { Request, Response } from 'express';
import UserService from '@/services/user.service';
import { AuthRequest } from '@/middlewares/auth.middleware';

class UserController {
	constructor(private userService: UserService) {}

	async register(req: Request, res: Response): Promise<void> {
		const { username, email, password } = req.body;

		try {
			await this.userService.register(username, email, password);
			res.status(201).json({
				message:
					'User registered successfully. Please request verification code.',
			});
		} catch (error) {
			const errorMessage = (error as Error).message;

			if (errorMessage === 'Email already in use') {
				res.status(400).json({ message: 'Email already in use' });
			} else {
				res.status(500).json({
					message: 'Registration failed',
					error: errorMessage,
				});
			}
		}
	}

	async sendVerificationCode(req: Request, res: Response): Promise<void> {
		const { email } = req.body;

		try {
			await this.userService.sendVerificationCode(email);
			res.json({ message: 'Verification code sent to email' });
		} catch (error) {
			const errorMessage = (error as Error).message;

			if (errorMessage === 'User not found') {
				res.status(404).json({ message: 'User not found' });
			} else if (errorMessage === 'User already verified') {
				res.status(400).json({ message: 'User already verified' });
			} else {
				res.status(500).json({
					message: 'Failed to send verification code',
					error: errorMessage,
				});
			}
		}
	}

	async verifyEmail(req: Request, res: Response): Promise<void> {
		const { email, code } = req.body;

		const isVerified = await this.userService.verifyEmail(email, code);

		if (isVerified) {
			res.json({ message: 'Email verified successfully' });
		} else {
			res.status(400).json({ message: 'Invalid verification code' });
		}
	}

	async login(req: Request, res: Response): Promise<void> {
		const { email, password } = req.body;

		try {
			const sessionToken = await this.userService.login(email, password);

			if (!sessionToken) {
				res.status(400).json({
					message: 'Invalid credentials or email not verified',
				});
				return;
			}

			res.json({ sessionToken });
		} catch (error) {
			res.status(500).json({
				message: 'Login failed',
				error: (error as Error).message,
			});
		}
	}

	async logout(req: AuthRequest, res: Response): Promise<void> {
		const userId = req.currentUser?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		await this.userService.logout(userId);

		res.json({ message: 'Logged out successfully' });
	}

	async initiateResetPassword(req: Request, res: Response): Promise<void> {
		const { email } = req.body;

		const isInitiated = await this.userService.initiateResetPassword(email);

		if (!isInitiated) {
			res.status(400).json({ message: 'Email not found' });
			return;
		}

		res.json({ message: 'Reset password code sent to email' });
	}

	async resetPassword(req: Request, res: Response): Promise<void> {
		const { email, code, newPassword } = req.body;

		const isReset = await this.userService.resetPassword(
			email,
			code,
			newPassword,
		);

		if (!isReset) {
			res.status(400).json({ message: 'Invalid code or code expired' });
			return;
		}

		res.json({ message: 'Password reset successfully' });
	}

	async updateUser(req: AuthRequest, res: Response): Promise<void> {
		const { username, password } = req.body;
		const userId = req.currentUser?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		const updatedUser = await this.userService.updateUser(userId, {
			username,
			password,
		});

		if (!updatedUser) {
			res.status(400).json({ message: 'Nothing to update' });
			return;
		}

		res.json({ message: 'User updated successfully', user: updatedUser });
	}

	async deleteUser(req: AuthRequest, res: Response): Promise<void> {
		const userId = req.currentUser?.id;

		if (!userId) {
			res.status(401).json({ message: 'Unauthorized' });
			return;
		}

		await this.userService.deleteUser(userId);

		res.json({ message: 'User deleted successfully' });
	}

	async getUser(req: Request, res: Response): Promise<void> {
		const userId = Number(req.params.id);

		const user = await this.userService.getUserById(userId);

		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}

		res.json(user);
	}

	async getAllUsers(req: Request, res: Response): Promise<void> {
		const users = await this.userService.getAllUsers();
		res.json(users);
	}
}

const userController = new UserController(new UserService());
export default userController;
