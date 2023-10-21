import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/domain/core/entities/User';

export class UserDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  email!: string;

  static fromEntity(entity: User): UserDto {
    return {
      id: entity.id.value,
      name: entity.name.value,
      email: entity.email.value,
    };
  }
}
