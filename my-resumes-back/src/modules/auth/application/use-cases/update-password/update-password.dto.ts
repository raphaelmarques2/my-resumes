import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { passwordSchema } from '../signup/signup.dto';

export const updatePasswordDtoSchema = z
  .object({
    userId: z.string().uuid(),
    password: passwordSchema,
  })
  .strict();

export class UpdatePasswordDto extends createZodDto(updatePasswordDtoSchema) {}
