import { Router } from 'express';
import { MenuController } from './menus.controller.js';
import { MenuSchema } from './menus.schema.js';

export const createMenuRouter = ({ menuModel }) => {
  const menuRouter = Router();

  const menuSchema = new MenuSchema();
  const menuController = new MenuController({ Model: menuModel, Schema: menuSchema });

  menuRouter.get('/', menuController.getAll);
  menuRouter.post('/', menuController.create);

  menuRouter.get('/:id', menuController.getById);
  menuRouter.delete('/:id', menuController.delete);
  menuRouter.put('/:id', menuController.update);

  return menuRouter;
};
