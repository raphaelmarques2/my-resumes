import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsUUID()
  @ApiProperty()
  userId!: string;

  @ApiProperty({ minLength: 1 })
  name!: string;

  @ApiProperty({ format: 'email' })
  email!: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ format: 'url', required: false })
  linkedin?: string;
}
