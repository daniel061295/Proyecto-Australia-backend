import { Router } from 'express';
import { StateController } from '../controllers/states.js';

export const createStateRouter = ({ stateModel }) => {
  const stateRouter = Router();

  const stateController = new StateController({ stateModel });

  stateRouter.get('/', stateController.getAll);
  stateRouter.post('/', stateController.create);

  stateRouter.get('/:id', stateController.getById);
  stateRouter.delete('/:id', stateController.delete);
  stateRouter.put('/:id', stateController.update);

  return stateRouter;
};
