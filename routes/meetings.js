import { Router } from 'express';
import { MeetingController } from '../controllers/meetings.js';
import { MeetingSchema } from '../schemas/meetings.js';

export const createMeetingRouter = ({ meetingModel }) => {
  const meetingRouter = Router();

  const meetingSchema = new MeetingSchema();
  const meetingController = new MeetingController({ baseModel: meetingModel, baseSchema: meetingSchema });

  meetingRouter.get('/', meetingController.getAll);
  meetingRouter.post('/', meetingController.create);

  meetingRouter.get('/:id', meetingController.getById);
  meetingRouter.delete('/:id', meetingController.delete);
  meetingRouter.put('/:id', meetingController.update);

  return meetingRouter;
};
