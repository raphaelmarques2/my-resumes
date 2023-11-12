import { UserDto } from './UserDto';

export type AuthOutputDto = {
  token: string;
  user: UserDto;
};
