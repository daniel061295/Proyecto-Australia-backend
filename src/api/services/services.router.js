import { Router } from 'express';
import { ServiceController } from './services.controller.js';
import { ServiceSchema } from './services.schema.js';

export const createServiceRouter = ({ serviceModel }) => {
  const serviceRouter = Router();

  const serviceSchema = new ServiceSchema();
  const serviceController = new ServiceController({ Model: serviceModel, Schema: serviceSchema });

  serviceRouter.get('/filter', serviceController.getByCategory);

  serviceRouter.get('/', serviceController.getAll);
  serviceRouter.post('/', serviceController.create);

  serviceRouter.get('/:id', serviceController.getById);
  serviceRouter.delete('/:id', serviceController.delete);
  serviceRouter.put('/:id', serviceController.update);


  return serviceRouter;
};
