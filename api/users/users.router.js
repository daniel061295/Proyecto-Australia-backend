import { Router } from 'express';
import { UserController } from './users.controller.js';
import { UserSchema } from './users.schema.js';

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router();

  const userSchema = new UserSchema();
  const userController = new UserController({ Model: userModel, Schema: userSchema });

  userRouter.get('/', userController.getAll);
  userRouter.post('/', userController.create);

  userRouter.get('/:id', userController.getById);
  userRouter.delete('/:id', userController.delete);
  userRouter.put('/:id', userController.update);

  return userRouter;
};
