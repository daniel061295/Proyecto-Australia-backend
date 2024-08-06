import { Router } from 'express';
import { ClientController } from '../controllers/clients.js';
import { ClientSchema } from '../schemas/clients.js';

export const createClientRouter = ({ clientModel }) => {
  const clientRouter = Router();

  const clientSchema = new ClientSchema();
  const clientController = new ClientController({ baseModel: clientModel, baseSchema: clientSchema });

  clientRouter.get('/', clientController.getAll);
  clientRouter.post('/', clientController.create);

  clientRouter.get('/:id', clientController.getById);
  clientRouter.delete('/:id', clientController.delete);
  clientRouter.put('/:id', clientController.update);

  return clientRouter;
};
