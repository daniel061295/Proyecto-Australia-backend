/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export class MeetingSchema {
  constructor() {
    this.meetingSchema = z.object({
      dateTimeMeeting: z.string({
        invalid_type_error: 'dateTimeMeeting must be a string',
        required_error: 'dateTimeMeeting is required'
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
  }

  validate(input) {
    return this.meetingSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.meetingSchema.partial().safeParse(input);
  }
}

export class MeetingWithClientSchema {
  constructor() {
    this.meetingWithClientSchema = z.object({
      dateTimeMeeting: z.string({
        invalid_type_error: 'dateTimeMeeting must be a string',
        required_error: 'dateTimeMeeting is required'
      }).datetime({ message: 'dateTimeMeeting must be a valid date time format: YYYY-MM-DDTHH:mm:ssZ' }),
      stateId: z.number({
        invalid_type_error: 'stateId must be a number',
        required_error: 'stateId is required'
      }),
      nameClient: z.string({
        invalid_type_error: 'nameClient must be a string',
        required_error: 'nameClient is required'
      }),
      emailClient: z.string({
        invalid_type_error: 'emailClient must be a string',
        required_error: 'emailClient is required'
      }).email({ message: 'emailClient must be a a valid email address' }),
      phoneNumberClient: z.number({
        invalid_type_error: 'phoneNumberClient must be a big integer',
        required_error: 'phoneNumberClient is required'
      }).int(),
      serviceId: z.number({
        invalid_type_error: 'serviceId must be a number',
        required_error: 'serviceId is required'
      })
    });
  }
  validate(input) {
    return this.meetingWithClientSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.meetingWithClientSchema.partial().safeParse(input);
  }
}