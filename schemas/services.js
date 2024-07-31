import { z } from 'zod';

export const serviceSchema = z.object({
  name_service: z.string({
    invalid_type_error: 'name_service must be a string',
    required_error: 'name_service is required'
  }),
  image_url_service: z.string({
    invalid_type_error: 'image_url_service must be a string',
    required_error: 'image_url_service is required'
  }).url({ message: 'image_url_service must be a a valid url address' }),
  value_service: z.number({
    invalid_type_error: 'value_service must be a number',
    required_error: 'value_service is required'
  }),
  category_id: z.number({
    invalid_type_error: 'category_id must be a number',
    required_error: 'category_id is required'
  }),
  state_id: z.number({
    invalid_type_error: 'state_id must be a number',
    required_error: 'state_id is required'
  }),
  description_service: z.string({
    invalid_type_error: 'description_service must be a string',
    required_error: 'description_service is required'
  })
});
