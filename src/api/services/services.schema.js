/* eslint-disable space-before-function-paren */
import { z } from 'zod';

export class ServiceSchema {
  constructor() {
    const numberOrString = z.union([
      z.number(),
      z.string().refine((val) => !isNaN(Number(val)), {
        message: "Must be a valid number or a numeric string",
      }).transform((val) => Number(val))
    ]);

    this.serviceSchema = z.object({
      nameService: z.string({
        invalid_type_error: "nameService must be a string",
        required_error: "nameService is required",
      }),
      valueService: numberOrString.refine((val) => !isNaN(val), {
        message: "valueService must be a valid number",
      }),
      categoryId: numberOrString.refine((val) => !isNaN(val), {
        message: "categoryId must be a valid number",
      }),
      stateId: numberOrString.refine((val) => !isNaN(val), {
        message: "stateId must be a valid number",
      }),
      descriptionService: z.string({
        invalid_type_error: "descriptionService must be a string",
        required_error: "descriptionService is required",
      }),
    });
  }

  validate(input) {
    return this.serviceSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.serviceSchema.partial().safeParse(input);
  }
}
