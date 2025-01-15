/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export class ScheduleSchema {
  constructor() {
    this.scheduleSchema = z.object({
      scheduleStartTime: z.string({
        invalid_type_error: 'scheduleStartTime must be a string',
        required_error: 'scheduleStartTime is required'
      }).time({ message: 'scheduleStartTime must be valid time string ' }),
      scheduleEndTime: z.string({
        invalid_type_error: 'scheduleEndTime must be a string',
        required_error: 'scheduleEndTime is required'
      }).time({ message: 'scheduleEndTime must be valid time string ' }),
      scheduleCount: z.number({
        invalid_type_error: 'scheduleCount must be a number',
        required_error: 'scheduleCount is required'
      }).nonnegative().lte(3),
      idDate: z.number({
        invalid_type_error: 'idDate must be a number',
        required_error: 'idDate is required'
      })
    });
  }

  validate(input) {
    return this.scheduleSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.scheduleSchema.partial().safeParse(input);
  }
}
