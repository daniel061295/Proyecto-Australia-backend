/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export class ProfileSchema {
  constructor() {
    this.profileSchema = z.object({
      nameProfile: z.string({
        invalid_type_error: 'nameProfile must be a string',
        required_error: 'nameProfile is required'
      })
    });
  }

  validate(input) {
    return this.profileSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.profileSchema.partial().safeParse(input);
  }
}
