/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export class StateSchema {
  constructor() {
    this.stateSchema = z.object({
      nameState: z.string({
        invalid_type_error: 'nameState must be a string',
        required_error: 'nameState is required'
      }),
      applyForService: z.number({
        invalid_type_error: 'applyForState must be a number',
        required_error: 'applyForState is required'
      })
    });
  }

  validate(input) {
    return this.stateSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.stateSchema.partial().safeParse(input);
  }
}
