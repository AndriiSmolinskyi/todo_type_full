import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password is too short').required('Password is required'),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password is too short').required('Password is required'),
});

export const VerifySchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
  code: Yup.string().required('Verification code is required'),
});

export const UpdatePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().min(6, 'Password is too short').required('Old password is required'),
  newPassword: Yup.string().min(6, 'Password is too short').required('New password is required'),
});