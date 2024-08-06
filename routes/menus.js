import { Router } from 'express';
import { MenuController } from '../controllers/menus.js';
import { MenuSchema } from '../schemas/menus.js';

export const createMenuRouter = ({ menuModel }) => {
  const menuRouter = Router();

  const menuSchema = new MenuSchema();
  const menuController = new MenuController({ baseModel: menuModel, baseSchema: menuSchema });

  menuRouter.get('/', menuController.getAll);
  menuRouter.post('/', menuController.create);

  menuRouter.get('/:id', menuController.getById);
  menuRouter.delete('/:id', menuController.delete);
  menuRouter.put('/:id', menuController.update);

  return menuRouter;
};
