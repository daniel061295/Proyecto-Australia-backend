import { Router } from 'express';
import { ServiceController } from '../controllers/services.js';
import { ServiceSchema } from '../schemas/services.js';

export const createServiceRouter = ({ serviceModel }) => {
  const serviceRouter = Router();

  const serviceSchema = new ServiceSchema();
  const serviceController = new ServiceController({ baseModel: serviceModel, baseSchema: serviceSchema });

  serviceRouter.get('/', serviceController.getAll);
  serviceRouter.post('/', serviceController.create);

  serviceRouter.get('/:id', serviceController.getById);
  serviceRouter.delete('/:id', serviceController.delete);
  serviceRouter.put('/:id', serviceController.update);

  return serviceRouter;
};
