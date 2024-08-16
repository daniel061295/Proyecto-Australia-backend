import { Router } from 'express';
import { StateController } from './states.controller.js';
import { StateSchema } from './states.schema.js';

export const createStateRouter = ({ stateModel }) => {
  const stateRouter = Router();

  const stateSchema = new StateSchema();
  const stateController = new StateController({ Model: stateModel, Schema: stateSchema });

  stateRouter.get('/', stateController.getAll);
  stateRouter.post('/', stateController.create);

  stateRouter.get('/:id', stateController.getById);
  stateRouter.delete('/:id', stateController.delete);
  stateRouter.put('/:id', stateController.update);

  return stateRouter;
};
