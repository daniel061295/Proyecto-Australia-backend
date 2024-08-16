import { Router } from 'express';
import { ClientController } from './clients.controller.js';
import { ClientSchema } from './clients.schema.js';

export const createClientRouter = ({ clientModel }) => {
  const clientRouter = Router();

  const clientSchema = new ClientSchema();
  const clientController = new ClientController({ Model: clientModel, Schema: clientSchema });

  clientRouter.get('/', clientController.getAll);
  clientRouter.post('/', clientController.create);

  clientRouter.get('/:id', clientController.getById);
  clientRouter.delete('/:id', clientController.delete);
  clientRouter.put('/:id', clientController.update);

  return clientRouter;
};
