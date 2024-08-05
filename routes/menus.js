import { Router } from 'express';
import { MenuController } from '../controllers/menus.js';

export const createMenuRouter = ({ menuModel }) => {
  const menuRouter = Router();

  const menuController = new MenuController({ menuModel });

  menuRouter.get('/', menuController.getAll);
  menuRouter.post('/', menuController.create);

  menuRouter.get('/:id', menuController.getById);
  menuRouter.delete('/:id', menuController.delete);
  menuRouter.put('/:id', menuController.update);

  return menuRouter;
};
