import { Router } from 'express';
import { StateController } from '../controllers/states.js';
import { StateSchema } from '../schemas/states.js';

export const createStateRouter = ({ stateModel }) => {
  const stateRouter = Router();

  const stateSchema = new StateSchema();
  const stateController = new StateController({ baseModel: stateModel, baseSchema: stateSchema });

  stateRouter.get('/', stateController.getAll);
  stateRouter.post('/', stateController.create);

  stateRouter.get('/:id', stateController.getById);
  stateRouter.delete('/:id', stateController.delete);
  stateRouter.put('/:id', stateController.update);

  return stateRouter;
};
