/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export const profileSchema = z.object({
  nameProfile: z.string({
    invalid_type_error: 'nameProfile must be a string',
    required_error: 'nameProfile is required'
  })
});

export function validateProfile(input) {
  return profileSchema.safeParse(input);
}

export function validatePartialProfile(input) {
  return profileSchema.partial().safeParse(input);
}
