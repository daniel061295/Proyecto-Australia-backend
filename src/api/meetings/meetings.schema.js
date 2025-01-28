/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export class MeetingSchema {
  constructor() {
    const numberOrString = z.union([
      z.number(),
      z.string().refine((val) => !isNaN(Number(val)), {
        message: "Must be a valid number or a numeric string",
      }).transform((val) => Number(val))
    ]);
    this.meetingSchema = z.object({
      scheduleId: numberOrString.refine((val) => !isNaN(val), {
        message: "scheduleId must be a valid number",
        required_error: "scheduleId is required"
      }),
      stateId: numberOrString.refine((val) => !isNaN(val), {
        message: "stateId must be a valid number",
        required_error: "stateId is required"
      }),
      clientId: numberOrString.refine((val) => !isNaN(val), {
        message: "clientId must be a valid number",
        required_error: "clientId is required"
      }),
      serviceId: numberOrString.refine((val) => !isNaN(val), {
        message: "serviceId must be a valid number",
        required_error: "serviceId is required"
      }),
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
    const numberOrString = z.union([
      z.number(),
      z.string()
    ]).refine((val) => !isNaN(Number(val)), {
      message: "Must be a valid number or a numeric string",
    }).transform((val) => Number(val));
    this.meetingWithClientSchema = z.object({
      scheduleId: numberOrString.refine((val) => !isNaN(val), {
        message: "scheduleId must be a valid number"
      }),
      stateId: numberOrString.refine((val) => !isNaN(val), {
        message: "stateId must be a valid number"
      }),
      nameClient: z.string({
        invalid_type_error: 'nameClient must be a string'
      }),
      emailClient: z.string({
        invalid_type_error: 'emailClient must be a string'
      }).email({ message: 'emailClient must be a a valid email address' }),
      phoneNumberClient: numberOrString.refine((val) => !isNaN(val), {
        message: "phoneNumberClient must be a valid number",
        required_error: "phoneNumberClient is required"
      }),
      serviceId: numberOrString.refine((val) => !isNaN(val), {
        message: "serviceId must be a valid number"
      }),
    });
  }
  validate(input) {
    return this.meetingWithClientSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.meetingWithClientSchema.partial().safeParse(input);
  }
}