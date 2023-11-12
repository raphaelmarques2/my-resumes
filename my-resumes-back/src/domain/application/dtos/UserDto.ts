import { User } from '@prisma/client';

export type UserDto = {
  id: string;
  name: string;
  email: string;
};

export function convertToUserDto(user: User): UserDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}
