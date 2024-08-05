import { Router } from 'express';
import { MeetingController } from '../controllers/meetings.js';

export const createMeetingRouter = ({ meetingModel }) => {
  const meetingRouter = Router();

  const meetingController = new MeetingController({ meetingModel });

  meetingRouter.get('/', meetingController.getAll);
  meetingRouter.post('/', meetingController.create);

  meetingRouter.get('/:id', meetingController.getById);
  meetingRouter.delete('/:id', meetingController.delete);
  meetingRouter.put('/:id', meetingController.update);

  return meetingRouter;
};
