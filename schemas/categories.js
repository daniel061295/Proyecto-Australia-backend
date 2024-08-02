/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export const categorySchema = z.object({
  name_category: z.string({
    invalid_type_error: 'name_category must be a string',
    required_error: 'name_category is required'
  })
});

export function validateCategory(input) {
  return categorySchema.safeParse(input);
}

export function validatePartialCategory(input) {
  return categorySchema.partial().safeParse(input);
}
