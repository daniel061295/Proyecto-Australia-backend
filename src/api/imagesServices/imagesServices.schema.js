import { z } from 'zod';

export class ImagesServiceSchema {
  constructor() {
    const numberOrString = z.union([
      z.number(),
      z.string().refine((val) => !isNaN(Number(val)), {
        message: "Must be a valid number or a numeric string",
      }).transform((val) => Number(val))
    ]);
    this.imagesServiceSchema = z.object({
      serviceId: numberOrString.refine((val) => !isNaN(val), {
        message: "serviceId must be a valid number",
        required_error: "serviceId is required"
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
