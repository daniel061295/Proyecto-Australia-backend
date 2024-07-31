import { z } from 'zod';

export const menuSchema = z.object({
  name_menu: z.string({
    invalid_type_error: 'name_menu must be a string',
    required_error: 'name_menu is required'
  })
});
