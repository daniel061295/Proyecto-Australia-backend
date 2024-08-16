import { Router } from 'express';
import { MeetingController } from './meetings.controller.js';
import { MeetingSchema } from './meetings.schema.js';

export const createMeetingRouter = ({ meetingModel }) => {
  const meetingRouter = Router();

  const meetingSchema = new MeetingSchema();
  const meetingController = new MeetingController({ Model: meetingModel, Schema: meetingSchema });

  meetingRouter.get('/', meetingController.getAll);
  meetingRouter.post('/', meetingController.create);

  meetingRouter.get('/:id', meetingController.getById);
  meetingRouter.delete('/:id', meetingController.delete);
  meetingRouter.put('/:id', meetingController.update);

  return meetingRouter;
};
