import { Router } from 'express';
import { ClientController } from '../controllers/clients.js';

export const createClientRouter = ({ clientModel }) => {
  const clientRouter = Router();

  const clientController = new ClientController({ clientModel });

  clientRouter.get('/', clientController.getAll);
  clientRouter.post('/', clientController.create);

  clientRouter.get('/:id', clientController.getById);
  clientRouter.delete('/:id', clientController.delete);
  clientRouter.put('/:id', clientController.update);

  return clientRouter;
};
