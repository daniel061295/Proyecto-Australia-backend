import { z } from 'zod';

export const meetingSchema = z.object({
  date_time_meeting: z.string({
    invalid_type_error: 'name_category must be a string',
    required_error: 'name_category is required'
  }).datetime({ message: 'date_time_meeting must be a valid date time format: YYYY-MM-DDTHH:mm:ssZ' }),
  state_id: z.number({
    invalid_type_error: 'state_id must be a number',
    required_error: 'state_id is required'
  }),
  client_id: z.number({
    invalid_type_error: 'client_id must be a number',
    required_error: 'client_id is required'
  }),
  service_id: z.number({
    invalid_type_error: 'service_id must be a number',
    required_error: 'service_id is required'
  })
});
