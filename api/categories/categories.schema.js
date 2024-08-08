/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export class CategorySchema {
  constructor() {
    this.categorySchema = z.object({
      nameCategory: z.string({
        invalid_type_error: 'nameCategory must be a string',
        required_error: 'nameCategory is required'
      }),
      imageUrlCategory: z.string({
        invalid_type_error: 'imageUrlCategory must be a string',
        required_error: 'imageUrlCategory is required'
      }).url({ message: 'imageUrlCategory must be a a valid url address' })
    });
  }

  validate(input) {
    return this.categorySchema.safeParse(input);
  }

  validatePartial(input) {
    return this.categorySchema.partial().safeParse(input);
  }
}
