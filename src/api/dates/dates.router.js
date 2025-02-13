import { Router } from 'express';
import { DateController } from './dates.controller.js';
import { DateSchema } from './dates.schema.js';

export const createDateRouter = ({ dateModel }) => {
  const dateRouter = Router();

  const dateSchema = new DateSchema();
  const dateController = new DateController({ Model: dateModel, Schema: dateSchema });

  dateRouter.get('/', dateController.getAll);
  dateRouter.get('/newDate', dateController.createNewDate);

  dateRouter.post('/', dateController.create);

  dateRouter.get('/:id', dateController.getById);
  dateRouter.delete('/:id', dateController.delete);
  dateRouter.put('/:id', dateController.update);

  return dateRouter;
};
