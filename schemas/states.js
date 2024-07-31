import { z } from 'zod';

export const stateSchema = z.object({
  name_state: z.string({
    invalid_type_error: 'name_state must be a string',
    required_error: 'name_state is required'
  }),
  apply_for_service: z.number({
    invalid_type_error: 'apply_for_service must be a number',
    required_error: 'apply_for_service is required'
  })
});
