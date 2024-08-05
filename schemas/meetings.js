/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export const meetingSchema = z.object({
  dateTimeMeeting: z.string({
    invalid_type_error: 'dateTimeMeeting must be a string',
    required_error: 'nameCategory is required'
  }).datetime({ message: 'dateTimeMeeting must be a valid date time format: YYYY-MM-DDTHH:mm:ssZ' }),
  stateId: z.number({
    invalid_type_error: 'stateId must be a number',
    required_error: 'stateId is required'
  }),
  clientId: z.number({
    invalid_type_error: 'clientId must be a number',
    required_error: 'clientId is required'
  }),
  serviceId: z.number({
    invalid_type_error: 'serviceId must be a number',
    required_error: 'serviceId is required'
  })
});

export function validateMeeting(input) {
  return meetingSchema.safeParse(input);
}

export function validatePartialMeeting(input) {
  return meetingSchema.partial().safeParse(input);
}
