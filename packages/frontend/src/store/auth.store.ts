import { create } from 'zustand';
import AuthService from '~shared/services/auth.service';

interface AuthState {
	token: string | null;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (
		username: string,
		email: string,
		password: string,
	) => Promise<void>;
	verifyEmail: (email: string, code: string) => Promise<void>;
	initiateResetPassword: (email: string) => Promise<void>;
	resetPassword: (
		email: string,
		code: string,
		newPassword: string,
	) => Promise<void>;
	updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	token: localStorage.getItem('auth_token'),
	isAuthenticated: !!localStorage.getItem('auth_token'),

	login: async (email, password) => {
		const sessionToken = await AuthService.login({ email, password });
		if (sessionToken) {
			localStorage.setItem('auth_token', sessionToken);
			set({ token: sessionToken, isAuthenticated: true });
		}
	},

	register: async (username, email, password) => {
		await AuthService.register({ username, email, password });
	},

	verifyEmail: async (email, code) => {
		await AuthService.verifyEmail({ email, code });
	},

	initiateResetPassword: async (email) => {
		await AuthService.initiateResetPassword(email);
	},

	resetPassword: async (email, code, newPassword) => {
		await AuthService.resetPassword({ email, code, newPassword });
	},

	updatePassword: async (oldPassword, newPassword) => {
		await AuthService.updatePassword(oldPassword, newPassword);
	},

	logout: () => {
		AuthService.logout();
		localStorage.removeItem('auth_token');
		set({ token: null, isAuthenticated: false });
	},
}));
