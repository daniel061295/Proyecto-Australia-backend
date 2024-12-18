import { z } from 'zod';

export class ImagesServiceSchema {
  constructor() {
    this.imagesServiceSchema = z.object({
      serviceId: z.number({
        invalid_type_error: 'serviceId must be a number',
        required_error: 'serviceId is required'
      })
    });
  }

  validate(input) {
    return this.imagesServiceSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.imagesServiceSchema.partial().safeParse(input);
  }
}
