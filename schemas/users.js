import { z } from 'zod';

export const userSchema = z.object({
  name_user: z.string({
    invalid_type_error: 'name_user must be a string',
    required_error: 'name_user is required'
  }),
  email_user: z.string({
    invalid_type_error: 'email_user must be a string',
    required_error: 'email_user is required'
  }).email({ message: 'email_user must be a a valid email address' }),
  password_user: z.string({
    invalid_type_error: 'password_user must be a string',
    required_error: 'password_user is required'
  }),
  token_user: z.string({
    invalid_type_error: 'token_user must be a string',
    required_error: 'token_user is required'
  }),
  profile_id: z.number({
    invalid_type_error: 'profile_id must be a number',
    required_error: 'profile_id is required'
  })
});
