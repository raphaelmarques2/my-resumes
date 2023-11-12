import { User } from '@prisma/client';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const userDtoSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(1),
    email: z.string().email(),
  })
  .strict();

export class UserDto extends createZodDto(userDtoSchema) {}

export function convertToUserDto(user: User): UserDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
