import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const createResumeDtoSchema = z
  .object({
    userId: z.string().uuid(),
    name: z.string().min(1).optional(),
    title: z.string().min(1).optional(),
    description: z.string().optional(),
    experiences: z.array(z.string().uuid()).optional(),
  })
  .strict();

export class CreateResumeDto extends createZodDto(createResumeDtoSchema) {}
