/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export const menuSchema = z.object({
  nameMenu: z.string({
    invalid_type_error: 'nameMenu must be a string',
    required_error: 'nameMenu is required'
  })
});

export function validateMenu(input) {
  return menuSchema.safeParse(input);
}

export function validatePartialMenu(input) {
  return menuSchema.partial().safeParse(input);
}
