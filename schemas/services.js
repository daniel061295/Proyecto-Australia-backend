/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export const serviceSchema = z.object({
  nameService: z.string({
    invalid_type_error: 'nameService must be a string',
    required_error: 'name_service is required'
  }),
  imageUrlService: z.string({
    invalid_type_error: 'imageUrlService must be a string',
    required_error: 'imageUrlService is required'
  }).url({ message: 'imageUrlService must be a a valid url address' }),
  valueService: z.number({
    invalid_type_error: 'valueService must be a number',
    required_error: 'valueService is required'
  }),
  categoryId: z.number({
    invalid_type_error: 'categoryId must be a number',
    required_error: 'categoryId is required'
  }),
  stateId: z.number({
    invalid_type_error: 'stateId must be a number',
    required_error: 'stateId is required'
  }),
  descriptionService: z.string({
    invalid_type_error: 'descriptionService must be a string',
    required_error: 'descriptionService is required'
  })
});

export function validateService(input) {
  return serviceSchema.safeParse(input);
}

export function validatePartialService(input) {
  return serviceSchema.partial().safeParse(input);
}
