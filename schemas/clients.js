/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export const clientSchema = z.object({
  nameClient: z.string({
    invalid_type_error: 'nameClient must be a string',
    required_error: 'nameClient is required'
  }),
  emailClient: z.string({
    invalid_type_error: 'emailClient must be a string',
    required_error: 'emailClient is required'
  }).email({ message: 'emailClient must be a a valid email address' }),
  phoneNumberClient: z.number({
    invalid_type_error: 'phoneNumberClient must be a big integer',
    required_error: 'phoneNumberClient is required'
  }).int()
});

export function validateClient(input) {
  return clientSchema.safeParse(input);
}

export function validatePartialClient(input) {
  return clientSchema.partial().safeParse(input);
}
