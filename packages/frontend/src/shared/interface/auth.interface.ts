export interface AuthLoginData {
	email: string;
	password: string;
}

export interface AuthRegisterData {
	username: string;
	email: string;
	password: string;
}

export interface AuthVerifyData {
	email: string;
	code: string;
}

export interface AuthResetPasswordData {
	email: string;
	code: string;
	newPassword: string;
}

export interface PasswordChangeModalProps {
	isOpen: boolean;
	onClose: () => void;
}
