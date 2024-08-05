import { Router } from 'express';
import { ProfileController } from '../controllers/profiles.js';

export const createProfileRouter = ({ profileModel }) => {
  const profileRouter = Router();

  const profileController = new ProfileController({ profileModel });

  profileRouter.get('/', profileController.getAll);
  profileRouter.post('/', profileController.create);

  profileRouter.get('/:id', profileController.getById);
  profileRouter.delete('/:id', profileController.delete);
  profileRouter.put('/:id', profileController.update);

  return profileRouter;
};
