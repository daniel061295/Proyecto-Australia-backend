import { Router } from 'express';
import { ServiceController } from '../controllers/services.js';

export const createServiceRouter = ({ serviceModel }) => {
  const serviceRouter = Router();

  const serviceController = new ServiceController({ serviceModel });

  serviceRouter.get('/', serviceController.getAll);
  serviceRouter.post('/', serviceController.create);

  serviceRouter.get('/:id', serviceController.getById);
  serviceRouter.delete('/:id', serviceController.delete);
  serviceRouter.put('/:id', serviceController.update);

  return serviceRouter;
};
