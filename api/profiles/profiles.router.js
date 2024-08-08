import { Router } from 'express';
import { ProfileController } from './profiles.controller.js';
import { ProfileSchema } from './profiles.schema.js';

export const createProfileRouter = ({ profileModel }) => {
  const profileRouter = Router();

  const profileSchema = new ProfileSchema();
  const profileController = new ProfileController({ Model: profileModel, Schema: profileSchema });

  profileRouter.get('/', profileController.getAll);
  profileRouter.post('/', profileController.create);

  profileRouter.get('/:id', profileController.getById);
  profileRouter.delete('/:id', profileController.delete);
  profileRouter.put('/:id', profileController.update);

  return profileRouter;
};
