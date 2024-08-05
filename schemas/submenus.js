/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export const submenuSchema = z.object({
  nameSubmenu: z.string({
    invalid_type_error: 'nameSubmenu must be a string',
    required_error: 'nameSubmenu is required'
  }),
  menuId: z.number({
    invalid_type_error: 'menuId must be a number',
    required_error: 'menuId is required'
  })
});

export function validateSubmenu(input) {
  return submenuSchema.safeParse(input);
}

export function validatePartialSubmenu(input) {
  return submenuSchema.partial().safeParse(input);
}
