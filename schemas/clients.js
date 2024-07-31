import { z } from 'zod';

export const clientSchema = z.object({
  name_client: z.string({
    invalid_type_error: 'name_client must be a string',
    required_error: 'name_client is required'
  }),
  email_client: z.string({
    invalid_type_error: 'email_client must be a string',
    required_error: 'email_client is required'
  }).email({ message: 'email_client must be a a valid email address' }),
  phone_number_client: z.number({
    invalid_type_error: 'phone_number_client must be a big integer',
    required_error: 'phone_number_client is required'
  }).int()
});
