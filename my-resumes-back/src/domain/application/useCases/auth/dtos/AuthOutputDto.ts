import { UserDto } from '../../user/dtos/UserDto';

export type AuthOutputDto = {
  token: string;
  user: UserDto;
};
