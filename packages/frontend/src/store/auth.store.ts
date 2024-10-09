import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AuthService from '~shared/services/auth.service';
import { STORAGE_KEYS } from '~/keys/storage.keys'; 

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

export const useAuthStore = create(
	persist<AuthState>(
		(set) => ({
			token: null,
			isAuthenticated: false,

			login: async (email, password) => {
				const sessionToken = await AuthService.login({ email, password });
				if (sessionToken) {
					// Використовуємо існуючий ключ для збереження токена
					localStorage.setItem(STORAGE_KEYS.TOKEN, sessionToken);
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
				localStorage.removeItem(STORAGE_KEYS.TOKEN);
				set({ token: null, isAuthenticated: false });
			},
		}),
		{
			name: 'auth-storage', 
			getStorage: () => localStorage, 
		},
	),
);