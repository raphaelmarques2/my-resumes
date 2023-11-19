import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import { userDtoSchema } from './UserDto';

export const authOutputDtoSchema = z
  .object({
    token: z.string(),
    user: userDtoSchema,
  })
  .strict();

export class AuthOutputDto extends createZodDto(authOutputDtoSchema) {}
