/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export class DateSchema {
  constructor() {
    this.dateSchema = z.object({
      dateString: z.string({
        invalid_type_error: 'dateString must be a valid string',
        required_error: 'dateString is required'
      }).date({ message: 'dateString must be a date format string' }),
      isActive: z.boolean({
        invalid_type_error: 'isActive must be a valid boolean',
        required_error: 'isActive is required'
      }),
    });
  }

  validate(input) {
    return this.dateSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.dateSchema.partial().safeParse(input);
  }
}
