import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @ApiProperty({ minLength: 1, required: false })
  name?: string;

  @ApiProperty({ format: 'email', required: false })
  email?: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ format: 'url', required: false })
  linkedin?: string;
}
