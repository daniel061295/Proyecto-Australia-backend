import { Router } from 'express';
import { ProfileController } from '../controllers/profiles.js';
import { ProfileSchema } from '../schemas/profiles.js';

export const createProfileRouter = ({ profileModel }) => {
  const profileRouter = Router();

  const profileSchema = new ProfileSchema();
  const profileController = new ProfileController({ baseModel: profileModel, baseSchema: profileSchema });

  profileRouter.get('/', profileController.getAll);
  profileRouter.post('/', profileController.create);

  profileRouter.get('/:id', profileController.getById);
  profileRouter.delete('/:id', profileController.delete);
  profileRouter.put('/:id', profileController.update);

  return profileRouter;
};
