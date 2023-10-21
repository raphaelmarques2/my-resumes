import { ApiProperty } from '@nestjs/swagger';
import { Profile } from 'src/domain/core/entities/Profile';

export class ProfileDto {
  @ApiProperty()
  public id!: string;

  @ApiProperty()
  public userId!: string;

  @ApiProperty()
  public name!: string;

  @ApiProperty()
  public email!: string;

  @ApiProperty({ required: false })
  public address?: string;

  @ApiProperty({ required: false })
  public linkedin?: string;

  static fromEntity(entity: Profile): ProfileDto {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      name: entity.name.value,
      email: entity.email.value,
      address: entity.address?.value,
      linkedin: entity.linkedin?.value,
    };
  }
}
