/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export class MenuSchema {
  constructor() {
    this.menuSchema = z.object({
      nameMenu: z.string({
        invalid_type_error: 'nameMenu must be a string',
        required_error: 'nameMenu is required'
      })
    });
  }

  validate(input) {
    return this.menuSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.menuSchema.partial().safeParse(input);
  }
}
