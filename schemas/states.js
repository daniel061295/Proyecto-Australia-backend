/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export const stateSchema = z.object({
  nameState: z.string({
    invalid_type_error: 'nameState must be a string',
    required_error: 'nameState is required'
  }),
  applyForState: z.number({
    invalid_type_error: 'applyForState must be a number',
    required_error: 'applyForState is required'
  })
});

export function validateState(input) {
  return stateSchema.safeParse(input);
}

export function validatePartialState(input) {
  return stateSchema.partial().safeParse(input);
}
