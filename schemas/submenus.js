import { z } from 'zod';

export const submenuSchema = z.object({
  name_submenu: z.string({
    invalid_type_error: 'name_submenu must be a string',
    required_error: 'name_submenu is required'
  }),
  menu_id: z.number({
    invalid_type_error: 'menu_id must be a number',
    required_error: 'menu_id is required'
  })
});
