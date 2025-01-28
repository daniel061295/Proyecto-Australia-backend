import { Router } from 'express';
import { MeetingController } from './meetings.controller.js';
import { MeetingSchema } from './meetings.schema.js';
import { uploadDocumentMiddleware } from '../../middlewares/upload.js';
import { uploadDocumentOnMemoryMiddleware } from '../../middlewares/uploadOnMemory.js';

export const createMeetingRouter = ({ meetingModel }) => {
  const meetingRouter = Router();

  const meetingSchema = new MeetingSchema();
  const meetingController = new MeetingController({ Model: meetingModel, Schema: meetingSchema });


  meetingRouter.get('/getdocument/:id', meetingController.getDocumentFromGoogleApi);
  meetingRouter.get('/filter/client', meetingController.getByClientFilter);
  meetingRouter.get('/filter', meetingController.getByFilter);
  meetingRouter.post('/withclient', uploadDocumentOnMemoryMiddleware, meetingController.createMeetingWithClient);
  meetingRouter.get('/', meetingController.getAll);
  meetingRouter.post('/', uploadDocumentMiddleware, meetingController.create);

  meetingRouter.get('/:id', meetingController.getById);
  meetingRouter.delete('/:id', meetingController.delete);
  meetingRouter.put('/:id', uploadDocumentMiddleware, meetingController.update);

  return meetingRouter;
};
