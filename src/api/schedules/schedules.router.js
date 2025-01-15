import { Router } from 'express';
import { ScheduleController } from './schedules.controller.js';
import { ScheduleSchema } from './schedules.schema.js';

export const createScheduleRouter = ({ scheduleModel }) => {
  const scheduleRouter = Router();

  const scheduleSchema = new ScheduleSchema();
  const scheduleController = new ScheduleController({ Model: scheduleModel, Schema: scheduleSchema });

  scheduleRouter.get('/filter', scheduleController.getByDate);
  scheduleRouter.get('/', scheduleController.getAll);
  scheduleRouter.post('/', scheduleController.create);

  scheduleRouter.get('/:id', scheduleController.getById);
  scheduleRouter.delete('/:id', scheduleController.delete);
  scheduleRouter.put('/:id', scheduleController.update);

  return scheduleRouter;
};
