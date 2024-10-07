import { Router } from 'express';
import userController from '@/controllers/user.controller';
import { validatorMiddleware } from '@/middlewares/validate';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { tryCatchMiddleware } from '@/middlewares/trycatch';
import * as userValidationSchema from '@/validation/validation.user'; 

const usersRouter: Router = Router();

usersRouter.post(
  '/register',
  validatorMiddleware(userValidationSchema.registerSchema),
  tryCatchMiddleware(userController.register.bind(userController))
);

usersRouter.post(
  '/send-verification-code',
  validatorMiddleware(userValidationSchema.sendVerificationCodeSchema),
  tryCatchMiddleware(userController.sendVerificationCode.bind(userController))
);

usersRouter.post(
  '/verify-email',
  validatorMiddleware(userValidationSchema.verifyEmailSchema),
  tryCatchMiddleware(userController.verifyEmail.bind(userController))
);

usersRouter.post(
  '/login',
  validatorMiddleware(userValidationSchema.loginSchema),
  tryCatchMiddleware(userController.login.bind(userController))
);

usersRouter.post(
  '/logout',
  authMiddleware,
  tryCatchMiddleware(userController.logout.bind(userController))
);

usersRouter.post(
  '/initiate-reset-password',
  validatorMiddleware(userValidationSchema.initiateResetPasswordSchema),
  tryCatchMiddleware(userController.initiateResetPassword.bind(userController))
);

usersRouter.post(
  '/reset-password',
  validatorMiddleware(userValidationSchema.resetPasswordSchema),
  tryCatchMiddleware(userController.resetPassword.bind(userController))
);

usersRouter.put(
  '/update',
  authMiddleware,
  validatorMiddleware(userValidationSchema.updateUserSchema),
  tryCatchMiddleware(userController.updateUser.bind(userController))
);

usersRouter.delete(
  '/delete',
  authMiddleware,
  tryCatchMiddleware(userController.deleteUser.bind(userController))
);

usersRouter.get(
  '/:id',
  authMiddleware,
  tryCatchMiddleware(userController.getUser.bind(userController))
);

usersRouter.get(
  '/',
  authMiddleware,
  tryCatchMiddleware(userController.getAllUsers.bind(userController))
);

export default usersRouter;