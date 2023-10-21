import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({ minLength: 1 })
  name!: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ format: 'email' })
  email!: string;

  @IsString()
  @MinLength(3)
  @ApiProperty({ minLength: 2 })
  password!: string;
}
