import * as Yup from 'yup';

export const PasswordChangeSchema = Yup.object().shape({
	oldPassword: Yup.string()
		.required('Old password is required')
		.min(6, 'Password is too short - should be 6 chars minimum.'),
	newPassword: Yup.string()
		.required('New password is required')
		.min(6, 'Password is too short - should be 6 chars minimum.'),
});
