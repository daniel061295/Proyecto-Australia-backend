import { z } from 'zod';

export const profileSchema = z.object({
  name_profile: z.string({
    invalid_type_error: 'name_profile must be a string',
    required_error: 'name_profile is required'
  })
});
