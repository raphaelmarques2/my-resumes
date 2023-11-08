import { ApiProperty } from '@nestjs/swagger';
import { Profile } from '@prisma/client';

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

  static fromEntity(profile: Profile): ProfileDto {
    return {
      id: profile.id,
      userId: profile.userId,
      name: profile.name,
      email: profile.email,
      address: profile.address ?? undefined,
      linkedin: profile.linkedin ?? undefined,
    };
  }
}
