/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export const userSchema = z.object({
  nameUser: z.string({
    invalid_type_error: 'nameUser must be a string',
    required_error: 'nameUser is required'
  }),
  emailUser: z.string({
    invalid_type_error: 'emailUser must be a string',
    required_error: 'emailUser is required'
  }).email({ message: 'emailUser must be a a valid email address' }),
  passwordUser: z.string({
    invalid_type_error: 'passwordUser must be a string',
    required_error: 'passwordUser is required'
  }),
  tokenUser: z.string({
    invalid_type_error: 'tokenUser must be a string',
    required_error: 'tokenUser is required'
  }),
  profileId: z.number({
    invalid_type_error: 'profileId must be a number',
    required_error: 'profileId is required'
  })
});

export function validateUser(input) {
  return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
  return userSchema.partial().safeParse(input);
}
