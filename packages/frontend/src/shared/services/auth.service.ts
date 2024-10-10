import HttpService from './http.services';
import {
	AuthLoginData,
	AuthRegisterData,
	AuthVerifyData,
	AuthResetPasswordData,
} from '~shared/interface/auth.interface';
import { STORAGE_KEYS } from '~/keys/storage.keys';

interface LoginResponse {
	sessionToken: string;
}

class AuthService extends HttpService {
	constructor() {
		super();
	}

	public async register(data: AuthRegisterData) {
		return this.post<null, AuthRegisterData>('users/register', data);
	}

	public async verifyEmail(data: AuthVerifyData) {
		return this.post<null, AuthVerifyData>('users/verify-email', data);
	}

	public async login(data: AuthLoginData) {
		const response = await this.post<LoginResponse, AuthLoginData>(
			'users/login',
			data,
		);
		const sessionToken = response?.sessionToken;
		if (sessionToken) {
			localStorage.setItem(STORAGE_KEYS.TOKEN, sessionToken);
		}
		return sessionToken;
	}

	public async initiateResetPassword(email: string) {
		return this.post<null, { email: string }>(
			'users/initiate-reset-password',
			{ email },
		);
	}

	public async resetPassword(data: AuthResetPasswordData) {
		return this.post<null, AuthResetPasswordData>(
			'users/reset-password',
			data,
		);
	}

	public async updatePassword(oldPassword: string, newPassword: string) {
		return this.put<null, { oldPassword: string; newPassword: string }>(
			'users/update-password',
			{ oldPassword, newPassword },
			true,
		);
	}

	public async logout() {
		localStorage.removeItem(STORAGE_KEYS.TOKEN);
		return this.post<null, {}>('users/logout', {});
	}
}

export default new AuthService();
