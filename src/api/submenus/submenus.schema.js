/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export class SubmenuSchema {
  constructor() {
    this.submenuSchema = z.object({
      nameSubmenu: z.string({
        invalid_type_error: 'nameSubmenu must be a string',
        required_error: 'nameSubmenu is required'
      }),
      menuId: z.number({
        invalid_type_error: 'menuId must be a number',
        required_error: 'menuId is required'
      })
    });
  }

  validate(input) {
    return this.submenuSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.submenuSchema.partial().safeParse(input);
  }
}
