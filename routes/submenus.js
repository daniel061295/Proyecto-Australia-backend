import { Router } from 'express';
import { SubmenuController } from '../controllers/submenus.js';

export const createSubmenuRouter = ({ submenuModel }) => {
  const submenuRouter = Router();

  const submenuController = new SubmenuController({ submenuModel });

  submenuRouter.get('/', submenuController.getAll);
  submenuRouter.post('/', submenuController.create);

  submenuRouter.get('/:id', submenuController.getById);
  submenuRouter.delete('/:id', submenuController.delete);
  submenuRouter.put('/:id', submenuController.update);

  return submenuRouter;
};
