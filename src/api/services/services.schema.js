/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export class ServiceSchema {
  constructor() {
    this.serviceSchema = z.object({
      nameService: z.string({
        invalid_type_error: 'nameService must be a string',
        required_error: 'name_service is required'
      }),
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
  }

  validate(input) {
    return this.serviceSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.serviceSchema.partial().safeParse(input);
  }
}
