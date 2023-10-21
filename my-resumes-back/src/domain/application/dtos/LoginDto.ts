import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ format: 'email' })
  email!: string;

  @ApiProperty({ minLength: 2 })
  password!: string;
}
