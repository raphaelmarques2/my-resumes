import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const updatePasswordDtoSchema = z
  .object({
    userId: z.string().uuid(),
    password: z.string().min(3),
  })
  .strict();

export class UpdatePasswordDto extends createZodDto(updatePasswordDtoSchema) {}
