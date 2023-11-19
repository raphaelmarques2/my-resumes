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

export class UserDto extends createZodDto(userDtoSchema) {
  static createFrom(user: User): UserDto {
    return UserDto.create({
      id: user.id,
      name: user.name,
      email: user.email,
    } satisfies UserDto);
  }
}
