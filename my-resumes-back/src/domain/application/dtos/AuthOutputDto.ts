import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from './UserDto';

export class AuthOutputDto {
  @ApiProperty()
  token!: string;

  @ApiProperty()
  user!: UserDto;
}
