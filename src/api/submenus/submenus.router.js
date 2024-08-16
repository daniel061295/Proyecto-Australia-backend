import { Router } from 'express';
import { SubmenuController } from './submenus.controller.js';
import { SubmenuSchema } from './submenus.schema.js';

export const createSubmenuRouter = ({ submenuModel }) => {
  const submenuRouter = Router();

  const submenuSchema = new SubmenuSchema();
  const submenuController = new SubmenuController({ Model: submenuModel, Schema: submenuSchema });

  submenuRouter.get('/', submenuController.getAll);
  submenuRouter.post('/', submenuController.create);

  submenuRouter.get('/:id', submenuController.getById);
  submenuRouter.delete('/:id', submenuController.delete);
  submenuRouter.put('/:id', submenuController.update);

  return submenuRouter;
};
