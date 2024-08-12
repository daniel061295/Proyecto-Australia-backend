import { Router } from 'express';
import { UserController } from './users.controller.js';
import { UserSchema } from './users.schema.js';
import { protectedEndPoint } from '../../middlewares/auth.js';

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router();

  const userSchema = new UserSchema();
  const userController = new UserController({ Model: userModel, Schema: userSchema });

  userRouter.post('/register', userController.create);
  userRouter.post('/login', userController.login);
  userRouter.post('/logout', userController.logout);

  userRouter.get('/:id', protectedEndPoint, userController.getById);
  userRouter.delete('/:id', protectedEndPoint, userController.delete);

  return userRouter;
};
