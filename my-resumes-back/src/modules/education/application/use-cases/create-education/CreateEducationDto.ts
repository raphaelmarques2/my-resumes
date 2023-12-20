import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createEducationDtoSchema = z
  .object({
    userId: z.string().uuid(),
    title: z.string().min(1).optional(),
    institution: z.string().min(1).optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
  })
  .strict();
export class CreateEducationDto extends createZodDto(
  createEducationDtoSchema,
) {}
